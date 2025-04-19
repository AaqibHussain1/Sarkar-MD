import config from '../../config.cjs';
import moment from 'moment-timezone';

const menu = async (m, sock) => {
  const prefix = config.PREFIX;
  const mode = config.MODE;
  const img = config.MENU_IMAGE || 'https://raw.githubusercontent.com/Sarkar-Bandaheali/BALOCH-MD_DATABASE/refs/heads/main/Pairing/1733805817658.webp';
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
  const pushName = m.pushName || '𝐔𝐒𝐄𝐑';

  // Get current time and date
  const realTime = moment().tz("Asia/Karachi").format("HH:mm:ss");
  const realDate = moment().tz("Asia/Karachi").format("DD/MM/YYYY");

  let pushwish = "";
  if (realTime < "05:00:00") {
    pushwish = `𝙶𝙾𝙾𝙳 𝙽𝙸𝙶𝙷𝚃 🌌`;
  } else if (realTime < "12:00:00") {
    pushwish = `𝙶𝙾𝙾𝙳 𝙼𝙾𝚁𝙽𝙸𝙽𝙶 🌄`;
  } else if (realTime < "17:00:00") {
    pushwish = `𝙶𝙾𝙾𝙳 𝙰𝙵𝚃𝙴𝚁𝙽𝙾𝙾𝙽 🌅`;
  } else if (realTime < "20:00:00") {
    pushwish = `𝙶𝙾𝙾𝙳 𝙴𝚅𝙴𝙽𝙸𝙽𝙶 🌃`;
  } else {
    pushwish = `𝙶𝙾𝙾𝙳 𝙽𝙸𝙶𝙷𝚃 🌌`;
  }

  const sendCommandMessage = async (messageContent, quotedMsg = m) => {
    await sock.sendMessage(
      m.from,
      {
        text: messageContent,
        contextInfo: {
          isForwarded: true,
          forwardingScore: 999,
          forwardedNewsletterMessageInfo: {
            newsletterJid: '120363315182578784@newsletter',
            newsletterName: "𝚂𝙰𝚁𝙺𝙰𝚁-𝙼𝙳",
            serverMessageId: -1,
          },
          externalAdReply: {
            title: "✨𝚂𝚊𝚛𝚔𝚊𝚛-𝙼𝙳✨",
            body: pushName,
            thumbnailUrl: img,
            sourceUrl: 'https://github.com/Sarkar-Bandaheali/Sarkar-MD',
            mediaType: 1,
            renderLargerThumbnail: true,
          },
        },
      },
      { quoted: quotedMsg }
    );
  };

  if (cmd === "menu") {
    const responseText = `╭───❍ *✨ 𝚂𝙰𝚁𝙺𝙰𝚁-𝙼𝙳 ✨* ❍───╮  
│ 👤 𝐔𝐒𝐄𝐑 : *${pushName}* \n│ ${pushwish}  
│ 🌐 𝐌𝐎𝐃𝐄 : *${mode}*  
│ ⏰ 𝐓𝐈𝐌𝐄 : *${realTime}*  
│ 📅 𝐃𝐀𝐓𝐄 : *${realDate}*  
╰───────────────❍  

*📌 𝐌𝐄𝐍𝐔 𝐎𝐏𝐓𝐈𝐎𝐍𝐒:*  
1️⃣ 🕌 *𝐈𝐬𝐥𝐚𝐦𝐢𝐜 𝐌𝐞𝐧𝐮*
2️⃣ ⬇️ *𝐃𝐨𝐰𝐧𝐥𝐨𝐚𝐝 𝐌𝐞𝐧𝐮*
3️⃣ 🤖 *𝐀𝐢 𝐌𝐞𝐧𝐮*
4️⃣ 👥 *𝐆𝐫𝐨𝐮𝐩 𝐌𝐞𝐧𝐮*
5️⃣ 🎨 *𝐋𝐨𝐠𝐨 𝐌𝐞𝐧𝐮*
6️⃣ 🛠️ *𝐎𝐰𝐧𝐞𝐫 𝐌𝐞𝐧𝐮*
7️⃣ ⚡ *𝐎𝐭𝐡𝐞𝐫 𝐌𝐞𝐧𝐮*
8️⃣ 🎁 *𝐄𝐱𝐭𝐫𝐚 𝐌𝐞𝐧𝐮* 
9️⃣ 🔍 *𝗦𝗲𝗮𝗿𝗰𝗵 𝗠𝗲𝗻𝘂*
🔟 🔁 *𝗖𝗼𝗻𝘃𝗲𝗿𝘁𝗲𝗿 𝗠𝗲𝗻𝘂

➤ *Reply with a number (1-10) to select a menu.*  

*⚡ 𝐏𝐎𝐖𝐄𝐑𝐄𝐃 𝐁𝐘 𝐒𝐀𝐑𝐊𝐀𝐑-𝐌𝐃⚡*`;

    const sentMessage = await sock.sendMessage(m.from, { text: responseText }, { quoted: m });

    sock.ev.on('messages.upsert', async (event) => {
      const receivedMessage = event.messages[0];
      if (!receivedMessage?.message?.extendedTextMessage) return;

      const receivedText = receivedMessage.message.extendedTextMessage.text.trim();
      if (receivedMessage.message.extendedTextMessage.contextInfo?.stanzaId !== sentMessage.key.id) return;

      let menuResponse = `╭───❍「 *✨ 𝚂𝚊𝚛𝚔𝚊𝚛-𝙼𝙳✨* 」
│ 🧑‍💻 *𝐔𝐒𝐄𝐑:* *${pushName} ${pushwish}*
│ 🌐 *𝐌𝐎𝐃𝐄:* *${mode}*
│ ⏰ *𝐓𝐈𝐌𝐄:* *${realTime}*
│ 📅 *𝐃𝐀𝐓𝐄:* *${realDate}*  
╰───────────❍
`;
      switch (receivedText) {
        case "1":
          menuResponse = `╭───❍「 *✨ 𝚂𝚊𝚛𝚔𝚊𝚛-𝙼𝙳✨* 」
│ 🧑‍💻 *𝐔𝐒𝐄𝐑:* ${pushName} ${pushwish}
│ 🌐 *𝐌𝐎𝐃𝐄:* *${mode}*
│ ⏰ *𝐓𝐈𝐌𝐄:* *${realTime}*
│ 📅 *𝐃𝐀𝐓𝐄:* *${realDate}*  
╰───────────❍
 ╭───❍「 *𝐈𝐒𝐋𝐀𝐌𝐈𝐂 𝐌𝐄𝐍𝐔* 」
*│* 💙 *${prefix}𝐒𝐮𝐫𝐚𝐡𝐀𝐮𝐝𝐢𝐨*
*│* 💙 *${prefix}𝐒𝐮𝐫𝐚𝐡𝐔𝐫𝐝𝐮*
*│* 💙 *${prefix}𝐒𝐮𝐫𝐚𝐡𝐀𝐫𝐛𝐢𝐜*
*│* 💙 *${prefix}𝐒𝐮𝐫𝐚𝐡𝐄𝐧𝐠*
*│* 💙 *${prefix}𝐏𝐫𝐚𝐲𝐞𝐫𝐓𝐢𝐦𝐞*
*│* 💙 *${prefix}𝐏𝐓𝐢𝐦𝐞*
*│* 💙 *${prefix}𝐒𝐁𝐮𝐤𝐡𝐚𝐫𝐢*
 ╰───────────❍\n\n*_𝐏𝐎𝐖𝐄𝐑𝐄𝐃 𝐁𝐘 𝐒𝐀𝐑𝐊𝐀𝐑-𝐌𝐃_*`;
          break;
        case "2":
          menuResponse = `╭───❍「 *✨ 𝚂𝚊𝚛𝚔𝚊𝚛-𝙼𝙳✨* 」
│ 🧑‍💻 *𝐔𝐒𝐄𝐑:* *${pushName}* *${pushwish}*
│ 🌐 *𝐌𝐎𝐃𝐄:* *${mode}*
│ ⏰ *𝐓𝐈𝐌𝐄:* *${realTime}*
│ 📅 *𝐃𝐀𝐓𝐄*: *${realDate}* 
╰───────────❍
 ╭───❍「 𝐃𝐎𝐖𝐍𝐋𝐎𝐀𝐃 𝐌𝐄𝐍𝐔 」
 *│* 💙 *${prefix}𝐏𝐥𝐚𝐲*
*│* 💙 *${prefix}𝐒𝐨𝐧𝐠*
*│* 💙 *${prefix}𝐒𝐨𝐧𝐠2*
*│* 💙 *${prefix}𝐒𝐨𝐧𝐠3*
*│* 💙 *${prefix}𝐕𝐢𝐝𝐞𝐨*
*│* 💙 *${prefix}𝐕𝐢𝐝𝐞𝐨2*
*│* 💙 *${prefix}𝐕𝐢𝐝𝐞𝐨3*
*│* 💙 *${prefix}𝐅𝐁*
*│* 💙 *${prefix}𝐅𝐁2*
*│* 💙 *${prefix}𝐈𝐧𝐬𝐭𝐚*
*│* 💙 *${prefix}𝐈𝐧𝐬𝐭𝐚*
*│* 💙 *${prefix}𝐓𝐢𝐤𝐓𝐨𝐤*
*│* 💙 *${prefix}𝐓𝐢𝐤𝐓𝐨𝐤2*
*│* 💙 *${prefix}𝐓𝐢𝐤𝐬*
*│* 💙 *${prefix}𝐒𝐧𝐚𝐜𝐤*
*│* 💙 *${prefix}𝐓𝐰𝐞𝐞𝐓*
*│* 💙 *${prefix}𝐀𝐩𝐤*
╰───────────❍\n\n*_𝐏𝐎𝐖𝐄𝐑𝐄𝐃 𝐁𝐘 𝐒𝐀𝐑𝐊𝐀𝐑-𝐌𝐃_*`;
          break;
        case "3":
          menuResponse = `╭───❍「 *✨ 𝚂𝚊𝚛𝚔𝚊𝚛-𝙼𝙳✨* 」
│ 🧑‍💻 *𝐔𝐒𝐄𝐑:* *${pushName} ${pushwish}*
│ 🌐 *𝐌𝐎𝐃𝐄:* *${mode}*
│ ⏰ *𝐓𝐈𝐌𝐄:* *${realTime}*
│ 📅 *𝐃𝐀𝐓𝐄: *${realDate}*  
╰───────────❍
 ╭───❍「 *𝐀𝐈 𝐌𝐄𝐍𝐔* 」
*│* 💙 *${prefix}𝐀𝐈*
*│* 💙 *${prefix}𝐆𝐏𝐓*
*│* 💙 *${prefix}𝐁𝐥𝐚𝐜𝐤𝐁𝐨𝐱*
*│* 💙 *${prefix}𝐈𝐦𝐚𝐠𝐢𝐧𝐞*
*│* 💙 *${prefix}𝐈𝐦𝐚𝐠𝐢𝐧𝐞2*
*│* 💙 *${prefix}𝐈𝐦𝐚𝐠𝐢𝐧𝐞3*
 ╰───────────❍\n\n*_𝐏𝐎𝐖𝐄𝐑𝐄𝐃 𝐁𝐘 𝐒𝐀𝐑𝐊𝐀𝐑-𝐌𝐃_*
`;
          break;
        case "4":
          menuResponse = `╭───❍「 *✨ 𝚂𝚊𝚛𝚔𝚊𝚛-𝙼𝙳✨* 」
│ 🧑‍💻 *𝐔𝐒𝐄𝐑:* *${pushName} ${pushwish}*
│ 🌐 *𝐌𝐎𝐃𝐄:* *${mode}*
│ ⏰ *𝐓𝐈𝐌𝐄:* *${realTime}*
│ 📅 *𝐃𝐀𝐓𝐄:* *${realDate}*  
╰───────────❍
 ╭───❍「 *𝐆𝐑𝐎𝐔𝐏 𝐌𝐄𝐍𝐔* 」
*│* 💙 *${prefix}𝐀𝐧𝐭𝐢𝐋𝐢𝐧𝐤*
*│* 💙 *${prefix}𝐀𝐧𝐭𝐢𝐌𝐞𝐝𝐢𝐚*
*│* 💙 *${prefix}𝐀𝐧𝐭𝐢𝐕𝐨𝐢𝐜𝐞*
*│* 💙 *${prefix}𝐓𝐚𝐠𝐀𝐥𝐥*
*│* 💙 *${prefix}𝐇𝐢𝐝𝐞𝐓𝐚𝐠*
*│* 💙 *${prefix}𝐎𝐩𝐞𝐧*
*│* 💙 *${prefix}𝐂𝐥𝐨𝐬𝐞*
*│* 💙 *${prefix}𝐀𝐝𝐝*
*│* 💙 *${prefix}𝐈𝐧𝐯𝐢𝐭𝐞*
*│* 💙 *${prefix}𝐊𝐢𝐜𝐤*
*│* 💙 *${prefix}𝐃𝐢𝐬*
*│* 💙 *${prefix}𝐑𝐞𝐬𝐞𝐭𝐋𝐢𝐧𝐤*
*│* 💙 *${prefix}𝐆𝐜𝐋𝐢𝐧𝐤* 
*│* 💙 *${prefix}𝐎𝐮𝐓*
 ╰───────────❍\n\n*_𝐏𝐎𝐖𝐄𝐑𝐄𝐃 𝐁𝐘 𝐒𝐀𝐑𝐊𝐀𝐑-𝐌𝐃_*`;
          break;
        case "5":
          menuResponse = `╭───❍「 *✨ 𝚂𝚊𝚛𝚔𝚊𝚛-𝙼𝙳✨* 」
│ 🧑‍💻 *𝐔𝐒𝐄𝐑:* *${pushName} ${pushwish}*
│ 🌐 *𝐌𝐎𝐃𝐄:* *${mode}*
│ ⏰ *𝐓𝐈𝐌𝐄:* *${realTime}*
│ 📅 *𝐃𝐀𝐓𝐄:* *${realDate}*  
╰───────────❍
 ╭───❍「 *𝐋𝐎𝐆𝐎 𝐌𝐄𝐍𝐔* 」
*│* 💙 *${prefix}𝐋𝐨𝐆𝐨*
*│* 💙 *${prefix}𝐆𝐥𝐨𝐬𝐬𝐲𝐒𝐢𝐥𝐯𝐞𝐫*
*│* 💙 *${prefix}𝐖𝐫𝐢𝐭𝐞𝐓𝐞𝐱𝐭*
*│* 💙 *${prefix}𝐁𝐥𝐚𝐜𝐤𝐏𝐢𝐧𝐤𝐋𝐨𝐠𝐨*
*│* 💙 *${prefix}𝐆𝐥𝐢𝐭𝐜𝐡𝐓𝐞𝐱𝐭*
*│* 💙 *${prefix}𝐀𝐝𝐯𝐚𝐧𝐜𝐞𝐝𝐆𝐥𝐨𝐰*
*│* 💙 *${prefix}𝐓𝐲𝐩𝐨𝐆𝐫𝐚𝐩𝐡𝐲𝐓𝐞𝐱𝐭*
*│* 💙 *${prefix}𝐏𝐢𝐱𝐞𝐥𝐆𝐥𝐢𝐭𝐜𝐡*
*│* 💙 *${prefix}𝐍𝐞𝐨𝐧𝐆𝐥𝐢𝐭𝐜𝐡*
*│* 💙 *${prefix}𝐃𝐞𝐥𝐞𝐭𝐢𝐧𝐠𝐓𝐞𝐱𝐭*
*│* 💙 *${prefix}𝐁𝐥𝐚𝐜𝐤𝐏𝐢𝐧𝐤𝐒𝐭𝐲𝐥𝐞*
*│* 💙 *${prefix}𝐆𝐥𝐨𝐰𝐢𝐧𝐠𝐓𝐞𝐱𝐭*
*│* 💙 *${prefix}𝐔𝐧𝐝𝐞𝐫𝐖𝐚𝐭𝐞𝐫*
*│* 💙 *${prefix}𝐋𝐨𝐠𝐨𝐌𝐚𝐤𝐞𝐫*
*│* 💙 *${prefix}𝐂𝐚𝐫𝐭𝐨𝐨𝐧𝐒𝐭𝐲𝐥𝐞*
*│* 💙 *${prefix}𝐏𝐚𝐩𝐞𝐫𝐂𝐮𝐭*
*│* 💙 *${prefix}𝐌𝐮𝐥𝐭𝐢𝐂𝐨𝐥𝐨𝐫𝐞𝐝*
*│* 💙 *${prefix}𝐄𝐟𝐟𝐞𝐜𝐭𝐂𝐥𝐨𝐮𝐝𝐬*
*│* 💙 *${prefix}𝐆𝐫𝐚𝐝𝐢𝐞𝐧𝐭𝐓𝐞𝐱𝐭*
 ╰───────────❍\n\n*_𝐏𝐎𝐖𝐄𝐑𝐄𝐃 𝐁𝐘 𝐒𝐀𝐑𝐊𝐀𝐑-𝐌𝐃_*`;
          break;
        case "6":
          menuResponse = `╭───❍「 *✨ 𝚂𝚊𝚛𝚔𝚊𝚛-𝙼𝙳✨* 」
│ 🧑‍💻 *𝐔𝐒𝐄𝐑:* *${pushName} ${pushwish}*
│ 🌐 *𝐌𝐎𝐃𝐄:* *${mode}*
│ ⏰ *𝐓𝐈𝐌𝐄:* *${realTime}*
│ 📅 *𝐃𝐀𝐓𝐄:* *${realDate}*  
╰───────────❍
 ╭───❍「 *𝐎𝐖𝐍𝐄𝐑 𝐌𝐄𝐍𝐔* 」
*│* 💙 *${prefix}𝐀𝐥𝐥𝐯𝐚𝐫*
*│* 💙 *${prefix}𝐀𝐝𝐝𝐕𝐚𝐫*
*│* 💙 *${prefix}𝐄𝐝𝐢𝐭𝐕𝐚𝐫*
*│* 💙 *${prefix}𝐑𝐞𝐬𝐭𝐚𝐫𝐭*
*│* 💙 *${prefix}𝗝𝗼𝗶𝗻*
*│* 💙 *${prefix}𝗟𝗲𝗳𝘁*
*│* 💙 *${prefix}𝗕𝗹𝗼𝗰𝗸*
*│* 💙 *${prefix}𝗨𝗻𝗯𝗹𝗼𝗰𝗸*
*│* 💙 *${prefix}𝗔𝗹𝘄𝗮𝘆𝘀𝗢𝗻𝗹𝗶𝗻𝗲*
*│* 💙 *${prefix}𝗧𝘆𝗽𝗶𝗻𝗴*
*│* 💙 *${prefix}𝗥𝗲𝗰𝗼𝗱𝗶𝗻𝗴*
*│* 💙 *${prefix}𝗔𝗻𝘁𝗶𝗖𝗮𝗹𝗹*
*│* 💙 *${prefix}𝗔𝘂𝘁𝗼𝗥𝗲𝗮𝗱*
*│* 💙 *${prefix}𝗔𝘂𝘁𝗼𝗿𝗲𝗮𝗰𝘁*
*│* 💙 *${prefix}𝗖𝗵𝗮𝘁𝗕𝗼𝘁*
*│* 💙 *${prefix}𝗣𝗺𝗕𝗹𝗼𝗰𝗸*
*│* 💙 *${prefix}𝗔𝗻𝘁𝗶𝗱𝗲𝗹𝗲𝘁𝗲*
*│* 💙 *${prefix}𝗔𝗻𝘁𝗶𝗱𝗲𝗹𝗲𝘁𝗲 𝘀𝘁𝗮𝘁𝘀*
 ╰───────────❍\n\n*_𝐏𝐎𝐖𝐄𝐑𝐄𝐃 𝐁𝐘 𝐒𝐀𝐑𝐊𝐀𝐑-𝐌𝐃_*`;
          break;
        case "7":
          menuResponse = `╭───❍「 *✨ 𝚂𝚊𝚛𝚔𝚊𝚛-𝙼𝙳✨* 」
│ 🧑‍💻 *𝐔𝐒𝐄𝐑:* *${pushName} ${pushwish}*
│ 🌐 *𝐌𝐎𝐃𝐄:* *${mode}*
│ ⏰ *𝐓𝐈𝐌𝐄:* *${realTime}*
│ 📅 *𝐃𝐀𝐓𝐄:* *${realDate}*  
╰───────────❍
 ╭───❍「 *𝐎𝐓𝐇𝐄𝐑 𝐌𝐄𝐍𝐔* 」
*│* 💙 *${prefix}𝐏𝐢𝐧𝐠*
*│* 💙 *${prefix}𝐀𝐥𝐢𝐯𝐞*
*│* 💙 *${prefix}𝐔𝐩𝐓𝐢𝐦𝐞*
*│* 💙 *${prefix}𝐑𝐞𝐩𝐨*
*│* 💙 *${prefix}𝐀𝐛𝐨𝐮𝐭*
 ╰───────────❍\n\n*_𝐏𝐎𝐖𝐄𝐑𝐄𝐃 𝐁𝐘 𝐒𝐀𝐑𝐊𝐀𝐑-𝐌𝐃_*`;
          break;
        case "8":
          menuResponse = `╭───❍「 *✨ 𝚂𝚊𝚛𝚔𝚊𝚛-𝙼𝙳✨* 」
│ 🧑‍💻 *𝐔𝐒𝐄𝐑:* *${pushName} ${pushwish}*
│ 🌐 *𝐌𝐎𝐃𝐄:* *${mode}*
│ ⏰ *𝐓𝐈𝐌𝐄:* *${realTime}*
│ 📅 *𝐃𝐀𝐓𝐄:* *${realDate}*  
╰───────────❍
 ╭───❍「 *𝐓𝐎𝐎𝐋𝐒 𝐌𝐄𝐍𝐔* 」
*│* 💙 *${prefix}𝐅𝐞𝐭𝐜𝐡*
*│* 💙 *${prefix}𝐒𝐡𝐨𝐫𝐭𝐞𝐧*
*│* 💙 *${prefix}𝐓𝐭𝐬*
*│* 💙 *${prefix}𝐓𝐬𝐭𝐚𝐥𝐤*
*│* 💙 *${prefix}𝐍𝐩𝐦*
*│* 💙 *${prefix}𝐆𝐢𝐭𝐒𝐭𝐚𝐥𝐤*
 ╰───────────❍\n\n*_𝐏𝐎𝐖𝐄𝐑𝐄𝐃 𝐁𝐘 𝐒𝐀𝐑𝐊𝐀𝐑-𝐌𝐃_*`;
          break;
        case "9":
          menuResponse = `╭───❍「 *✨ 𝚂𝚊𝚛𝚔𝚊𝚛-𝙼𝙳✨* 」
│ 🧑‍💻 *𝐔𝐒𝐄𝐑:* *${pushName} ${pushwish}*
│ 🌐 *𝐌𝐎𝐃𝐄:* *${mode}*
│ ⏰ *𝐓𝐈𝐌𝐄:* *${realTime}*
│ 📅 *𝐃𝐀𝐓𝐄:* *${realDate}*  
╰───────────❍
 ╭───❍「 *𝐒𝐄𝐀𝐑𝐂𝐇 𝐌𝐄𝐍𝐔* 」
*│* 💙 *${prefix}𝐘𝐓𝐒*
*│* 💙 *${prefix}𝐒𝐬𝐩𝐨𝐭𝐢𝐟𝐲*
*│* 💙 *${prefix}𝐋𝐲𝐫𝐢𝐜𝐬*
*│* 💙 *${prefix}𝐏𝐥𝐚𝐲𝐬𝐭𝐨𝐫𝐞*
 ╰───────────❍\n\n*_𝐏𝐎𝐖𝐄𝐑𝐄𝐃 𝐁𝐘 𝐒𝐀𝐑𝐊𝐀𝐑-𝐌𝐃_*`;
          break;
case "10":
          menuResponse = `╭───❍「 *✨ 𝚂𝚊𝚛𝚔𝚊𝚛-𝙼𝙳✨* 」
│ 🧑‍💻 *𝐔𝐒𝐄𝐑:* *${pushName} ${pushwish}*
│ 🌐 *𝐌𝐎𝐃𝐄:* *${mode}*
│ ⏰ *𝐓𝐈𝐌𝐄:* *${realTime}*
│ 📅 *𝐃𝐀𝐓𝐄:* *${realDate}*  
╰───────────❍
 ╭───❍「 *𝗖𝗢𝗡𝗩𝗘𝗥𝗧𝗘𝗥 𝐌𝐄𝐍𝐔* 」
*│* 💙 *${prefix}𝗕𝗮𝘀𝘀*
*│* 💙 *${prefix}𝗕𝗹𝗼𝘄𝗻*
*│* 💙 *${prefix}𝗗𝗲𝗲𝗽*
*│* 💙 *${prefix}𝗙𝗮𝘀𝘁*
*│* 💙 *${prefix}𝗙𝗮𝘁*
*│* 💙 *${prefix}𝗡𝗶𝗴𝗵𝘁𝗖𝗼𝗿𝗲*
*│* 💙 *${prefix}𝗥𝗲𝘃𝗲𝗿𝘀𝗲*
*│* 💙 *${prefix}𝗥𝗼𝗯𝗼𝘁*
*│* 💙 *${prefix}𝗦𝗹𝗼𝘄*
*│* 💙 *${prefix}𝗦𝗺𝗼𝗼𝘁𝗵*
 ╰───────────❍\n\n*_𝐏𝐎𝐖𝐄𝐑𝐄𝐃 𝐁𝐘 𝐒𝐀𝐑𝐊𝐀𝐑-𝐌𝐃_*`;
          break;

        default:
          menuResponse = "*❌ 𝐈𝐍𝐕𝐀𝐋𝐈𝐃 𝐂𝐇𝐎𝐈𝐂𝐄. 𝐏𝐋𝐄𝐀𝐒𝐄 𝐑𝐄𝐏𝐋𝐘 𝐖𝐈𝐓𝐇 1 𝐓𝐎 9.*";
      }

      await sendCommandMessage(menuResponse, receivedMessage);
    });
  }
};

export default menu;
