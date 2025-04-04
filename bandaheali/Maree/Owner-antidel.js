import pkg from '@whiskeysockets/baileys';
const { proto, downloadContentFromMessage } = pkg;
import config from '../../config.cjs';

class AntiDeleteSystem {
    constructor() {
        this.enabled = false;
        this.messageCache = new Map();
        this.cacheExpiry = 5 * 60 * 1000; // 5 minutes
        this.cleanupInterval = null;
        this.cacheSizeLimit = 300; // Reduced from 500 to lower memory usage
    }

    async startCleanup() {
        if (this.cleanupInterval) {
            clearInterval(this.cleanupInterval);
        }
        
        // Use setTimeout with recursion instead of setInterval
        const cleanup = async () => {
            if (!this.enabled) return;
            
            try {
                const now = Date.now();
                let count = 0;
                
                for (const [key, msg] of this.messageCache.entries()) {
                    if (now - msg.timestamp > this.cacheExpiry) {
                        this.messageCache.delete(key);
                        count++;
                        
                        // Add small delay every 50 items to prevent blocking
                        if (count % 50 === 0) {
                            await new Promise(resolve => setTimeout(resolve, 100));
                        }
                    }
                }
                
                // Clear media buffers to free memory
                if (count > 0) {
                    if (typeof global.gc === 'function') {
                        global.gc(); // Manually trigger garbage collection if available
                    }
                }
            } catch (error) {
                console.error('Cleanup error:', error);
            } finally {
                if (this.enabled) {
                    this.cleanupInterval = setTimeout(cleanup, this.cacheExpiry / 2);
                    if (typeof this.cleanupInterval.unref === 'function') {
                        this.cleanupInterval.unref();
                    }
                }
            }
        };
        
        await cleanup();
    }

    formatTime(timestamp) {
        const options = {
            timeZone: 'Asia/Karachi',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        };
        return new Date(timestamp).toLocaleString('en-PK', options) + ' (PKT)';
    }

    destroy() {
        this.enabled = false;
        if (this.cleanupInterval) {
            clearTimeout(this.cleanupInterval);
            this.cleanupInterval = null;
        }
        
        // Properly clean up media buffers
        for (const [key, msg] of this.messageCache.entries()) {
            if (msg.media) {
                msg.media = null; // Release buffer reference
            }
            this.messageCache.delete(key);
        }
        
        // Force garbage collection if available
        if (typeof global.gc === 'function') {
            global.gc();
        }
    }
}

const antiDelete = new AntiDeleteSystem();

const AntiDelete = async (m, Matrix) => {
    const prefix = config.PREFIX;
    const ownerJid = config.OWNER_NUMBER + '@s.whatsapp.net';
    const text = m.body?.slice(prefix.length).trim().split(' ') || [];
    const cmd = text[0]?.toLowerCase();
    const subCmd = text[1]?.toLowerCase();

    const formatJid = (jid) => jid ? jid.replace(/@s\.whatsapp\.net|@g\.us/g, '') : 'Unknown';
    
    const getChatInfo = async (jid) => {
        if (!jid) return { name: 'Unknown Chat', isGroup: false };
        
        if (jid.includes('@g.us')) {
            try {
                const groupMetadata = await Matrix.groupMetadata(jid);
                return {
                    name: groupMetadata?.subject || 'Unknown Group',
                    isGroup: true
                };
            } catch {
                return { name: 'Unknown Group', isGroup: true };
            }
        }
        return { name: 'Private Chat', isGroup: false };
    };

    // Command handler
    if (cmd === 'antidelete') {
        if (m.sender !== ownerJid) {
            await m.reply('🚫 *You are not authorized to use this command!*');
            return;
        }
        
        try {
            const mode = config.DELETE_PATH === "same" ? "Same Chat" : "Owner PM";
            const responses = {
                on: `🛡️ *ANTI-DELETE ENABLED* 🛡️\n\n🔹 Protection: *ACTIVE*\n🔹 Scope: *All Chats*\n🔹 Cache: *5 minutes*\n🔹 Mode: *${mode}*\n\n✅ Deleted messages will be recovered!`,
                off: `⚠️ *ANTI-DELETE DISABLED* ⚠️\n\n🔸 Protection: *OFF*\n🔸 Cache cleared\n🔸 Deleted messages will not be recovered.`,
                help: `⚙️ *ANTI-DELETE SETTINGS* ⚙️\n\n🔹 *${prefix}antidelete on* - Enable\n🔸 *${prefix}antidelete off* - Disable\n\nCurrent Status: ${antiDelete.enabled ? '✅ ACTIVE' : '❌ INACTIVE'}\nCurrent Mode: ${mode}`
            };

            if (subCmd === 'on') {
                antiDelete.enabled = true;
                await antiDelete.startCleanup();
                await m.reply(responses.on);
            } 
            else if (subCmd === 'off') {
                antiDelete.destroy();
                await m.reply(responses.off);
            }
            else {
                await m.reply(responses.help);
            }
            await m.React('✅');
            return;
        } catch (error) {
            console.error('AntiDelete Command Error:', error);
            await m.React('❌');
        }
    }

    // Message caching - Modified to use weak references for media
    Matrix.ev.on('messages.upsert', async ({ messages }) => {
        if (!antiDelete.enabled || !messages?.length) return;
        
        for (const msg of messages) {
            if (msg.key.fromMe || !msg.message || msg.key.remoteJid === 'status@broadcast') continue;
            
            try {
                const content = msg.message.conversation || 
                              msg.message.extendedTextMessage?.text ||
                              msg.message.imageMessage?.caption ||
                              msg.message.videoMessage?.caption ||
                              msg.message.documentMessage?.caption;

                let mediaInfo = null;
                
                // Only store media info if needed
                const mediaTypes = ['image', 'video', 'audio', 'sticker', 'document'];
                for (const mediaType of mediaTypes) {
                    if (msg.message[`${mediaType}Message`]) {
                        const mediaMsg = msg.message[`${mediaType}Message`];
                        mediaInfo = {
                            type: mediaType,
                            mimetype: mediaMsg.mimetype,
                            url: mediaMsg.url, // Store URL instead of buffer
                            mediaKey: mediaMsg.mediaKey,
                            fileSha256: mediaMsg.fileSha256
                        };
                        break;
                    }
                }
                
                // Voice note handling
                if (msg.message.audioMessage?.ptt) {
                    const audioMsg = msg.message.audioMessage;
                    mediaInfo = {
                        type: 'voice',
                        mimetype: audioMsg.mimetype,
                        url: audioMsg.url,
                        mediaKey: audioMsg.mediaKey,
                        fileSha256: audioMsg.fileSha256
                    };
                }
                
                if (content || mediaInfo) {
                    // Check cache size before adding
                    if (antiDelete.messageCache.size >= antiDelete.cacheSizeLimit) {
                        const oldestKey = antiDelete.messageCache.keys().next().value;
                        antiDelete.messageCache.delete(oldestKey);
                    }
                    
                    antiDelete.messageCache.set(msg.key.id, {
                        content,
                        mediaInfo, // Store media info instead of buffer
                        sender: msg.key.participant || msg.key.remoteJid,
                        senderFormatted: `@${formatJid(msg.key.participant || msg.key.remoteJid)}`,
                        timestamp: Date.now(),
                        chatJid: msg.key.remoteJid
                    });
                }
            } catch (error) {
                console.error('Error caching message:', error);
            }
        }
    });

    // Deletion handler - Modified to download media only when needed
    Matrix.ev.on('messages.update', async (updates) => {
        if (!antiDelete.enabled || !updates?.length) return;

        for (const update of updates) {
            try {
                const { key, update: updateData } = update;
                
                const isDeleted = updateData?.messageStubType === proto.WebMessageInfo.StubType.REVOKE || 
                                 updateData?.status === proto.WebMessageInfo.Status.DELETED;
                
                if (!isDeleted || key.fromMe || !antiDelete.messageCache.has(key.id)) {
                    continue;
                }

                const cachedMsg = antiDelete.messageCache.get(key.id);
                antiDelete.messageCache.delete(key.id);
                
                const destination = config.DELETE_PATH === "same" ? key.remoteJid : ownerJid;
                const chatInfo = await getChatInfo(cachedMsg.chatJid);
                
                const deletedBy = updateData?.participant ? 
                    `@${formatJid(updateData.participant)}` : 
                    (key.participant ? `@${formatJid(key.participant)}` : 'Unknown');

                const messageType = cachedMsg.mediaInfo?.type ? 
                    cachedMsg.mediaInfo.type.charAt(0).toUpperCase() + cachedMsg.mediaInfo.type.slice(1) : 
                    'Text';
                
                const baseInfo = `🚨 *Deleted ${messageType} Recovered!*\n\n` +
                               `📌 *Sender:* ${cachedMsg.senderFormatted}\n` +
                               `✂️ *Deleted By:* ${deletedBy}\n` +
                               `📍 *Chat:* ${chatInfo.name}${chatInfo.isGroup ? ' (Group)' : ''}\n` +
                               `🕒 *Sent At:* ${antiDelete.formatTime(cachedMsg.timestamp)}\n` +
                               `⏱️ *Deleted At:* ${antiDelete.formatTime(Date.now())}`;

                if (cachedMsg.mediaInfo) {
                    try {
                        // Download media only when needed
                        const message = cachedMsg.chatJid.includes('@g.us') ? 
                            await Matrix.groupGetMessage(cachedMsg.chatJid, key.id) : 
                            await Matrix.loadMessage(key.id);
                        
                        if (message) {
                            const mediaType = cachedMsg.mediaInfo.type === 'voice' ? 'audio' : cachedMsg.mediaInfo.type;
                            const mediaMsg = message.message[`${mediaType}Message`] || message.message.audioMessage;
                            
                            if (mediaMsg) {
                                const stream = await downloadContentFromMessage(mediaMsg, mediaType);
                                let buffer = Buffer.from([]);
                                for await (const chunk of stream) {
                                    buffer = Buffer.concat([buffer, chunk]);
                                }
                                
                                const messageOptions = {
                                    [mediaType]: buffer,
                                    mimetype: cachedMsg.mediaInfo.mimetype,
                                    caption: baseInfo
                                };

                                if (cachedMsg.mediaInfo.type === 'voice') {
                                    messageOptions.ptt = true;
                                }

                                await Matrix.sendMessage(destination, messageOptions);
                            }
                        }
                    } catch (error) {
                        console.error('Error downloading media:', error);
                        await Matrix.sendMessage(destination, {
                            text: `${baseInfo}\n\n⚠️ *Media could not be recovered*`
                        });
                    }
                } 
                else if (cachedMsg.content) {
                    await Matrix.sendMessage(destination, {
                        text: `${baseInfo}\n\n💬 *Content:* \n${cachedMsg.content}`
                    });
                }
            } catch (error) {
                console.error('Error handling deleted message:', error);
            }
        }
    });
};

export default AntiDelete;
