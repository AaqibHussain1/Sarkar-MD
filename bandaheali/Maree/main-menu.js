import config from '../../config.cjs';
import moment from 'moment-timezone';

const menu = async (m, sock) => {
  const prefix = config.PREFIX;
  const mode = config.MODE;
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
  const pushName = m.pushName || 'User';

  // Get current time and date
  const realTime = moment().tz("Asia/Karachi").format("HH:mm:ss");
  const realDate = moment().tz("Asia/Karachi").format("DD MM YYYY");

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
            title: "✨ 𝚂𝚊𝚛𝚔𝚊𝚛-𝙼𝙳✨",
            body: pushName,
            thumbnailUrl: 'https://raw.githubusercontent.com/Sarkar-Bandaheali/BALOCH-MD_DATABASE/refs/heads/main/Pairing/1733805817658.webp',
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
│ 👤 𝚄𝚜𝚎𝚛: *${pushName}* \n│ ${pushwish}  
│ 🌐 𝙼𝚘𝚍𝚎: *${mode}*  
│ ⏰ 𝚃𝚒𝚖𝚎: *${realTime}*  
│ 📅 𝙳𝚊𝚝𝚎: *${realDate}*  
╰───────────────❍  

*📌 𝙼𝙴𝙽𝚄 𝙾𝙿𝚃𝙸𝙾𝙽𝚂:*  
1️⃣ 🕌 𝐈𝐬𝐥𝐚𝐦𝐢𝐜 𝐌𝐞𝐧𝐮
2️⃣ ⬇️ 𝐃𝐨𝐰𝐧𝐥𝐨𝐚𝐝 𝐌𝐞𝐧𝐮
3️⃣ 🤖 𝐀𝐢 𝐌𝐞𝐧𝐮
4️⃣ 👥 𝐆𝐫𝐨𝐮𝐩 𝐌𝐞𝐧𝐮
5️⃣ 🎨 𝐋𝐨𝐠𝐨 𝐌𝐞𝐧𝐮
6️⃣ 🛠️ 𝐎𝐰𝐧𝐞𝐫 𝐌𝐞𝐧𝐮
7️⃣ ⚡ 𝐎𝐭𝐡𝐞𝐫 𝐌𝐞𝐧𝐮
8️⃣ 🎁 𝐄𝐱𝐭𝐫𝐚 𝐌𝐞𝐧𝐮 

➤ *Reply with a number (1-8) to select a menu.*  

*⚡ POWERED BY BANDAHEALI ⚡*`;

    const sentMessage = await sock.sendMessage(m.from, { text: responseText }, { quoted: m });

    sock.ev.on('messages.upsert', async (event) => {
      const receivedMessage = event.messages[0];
      if (!receivedMessage?.message?.extendedTextMessage) return;

      const receivedText = receivedMessage.message.extendedTextMessage.text.trim();
      if (receivedMessage.message.extendedTextMessage.contextInfo?.stanzaId !== sentMessage.key.id) return;

      let menuResponse = `╭───❍「 *✨ 𝚂𝚊𝚛𝚔𝚊𝚛-𝙼𝙳✨* 」
│ 🧑‍💻 *𝚄𝚜𝚎𝚛:* ${pushName} ${pushwish}
│ 🌐 *𝙼𝚘𝚍𝚎:* ${mode}
│ ⏰ *𝚃𝚒𝚖𝚎:* ${realTime}
│ 📅 𝙳𝚊𝚝𝚎: *${realDate}*  
╰───────────❍
`;
      switch (receivedText) {
        case "1":
          menuResponse = `╭───❍「 *✨ 𝚂𝚊𝚛𝚔𝚊𝚛-𝙼𝙳✨* 」
│ 🧑‍💻 *𝚄𝚜𝚎𝚛:* ${pushName} ${pushwish}
│ 🌐 *𝙼𝚘𝚍𝚎:* ${mode}
│ ⏰ *𝚃𝚒𝚖𝚎:* ${realTime}
│ 📅 𝙳𝚊𝚝𝚎: *${realDate}*  
╰───────────❍
╭───❍「 *𝐈𝐒𝐋𝐀𝐌𝐈𝐂 𝐌𝐄𝐍𝐔* 」
*│* 💙 *${prefix}𝚂𝚞𝚛𝚊𝚑𝚊𝚞𝚍𝚒𝚘*
*│* 💙 *${prefix}𝚂𝚞𝚛𝚊𝚑𝚞𝚛𝚍𝚞*
*│* 💙 *${prefix}𝙰𝚜𝚖𝚊𝚞𝚕𝚑𝚞𝚜𝚗𝚊*
*│* 💙 *${prefix}𝙿𝚛𝚘𝚙𝚑𝚎𝚝𝚗𝚊𝚖𝚎*
╰───────────❍\n\n*_POWERED BY SARKAR-MD_*`;
          break;
        case "2":
          menuResponse = `╭───❍「 *✨ 𝚂𝚊𝚛𝚔𝚊𝚛-𝙼𝙳✨* 」
│ 🧑‍💻 *𝐔𝐒𝐄𝐑:* *${pushName}* *${pushwish}*
│ 🌐 *𝐌𝐎𝐃𝐄:* *${mode}*
│ ⏰ *𝐓𝐈𝐌𝐄:* *${realTime}*
│ 📅 *𝐃𝐀𝐓𝐄*: *${realDate}* 
╰───────────❍
 ╭───❍「 𝐃𝐎𝐖𝐍𝐋𝐎𝐀𝐃 𝐌𝐄𝐍𝐔 」
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
*│*glossysilx}𝐓𝐢𝐤𝐓𝐨𝐤2*
*│* 💙 *${prefix}𝐒𝐧𝐚𝐜𝐤*
*│* 💙 *${prefix}𝐓𝐰𝐞𝐞𝐓*
*│* 💙 *${prefix}𝐀𝐩𝐤*
╰───────────❍\n\n*_𝐏𝐎𝐖𝐄𝐑𝐄𝐃 𝐁𝐘 𝐒𝐀𝐑𝐊𝐀𝐑-𝐌𝐃_*`;
          break;
        case "3":
          menuResponse = `╭───❍「 *✨ 𝚂𝚊𝚛𝚔𝚊𝚛-𝙼𝙳✨* 」
│ 🧑‍💻 *𝚄𝚜𝚎𝚛:* ${pushName} ${pushwish}
│ 🌐 *𝙼𝚘𝚍𝚎:* ${mode}
│ ⏰ *𝚃𝚒𝚖𝚎:* ${realTime}
│ 📅 𝙳𝚊𝚝𝚎: *${realDate}*  
╰───────────❍
 ╭───❍「 *𝐀𝐈 𝐌𝐄𝐍𝐔* 」
*│* 💙 *${prefix}*
*│* 💙 *${prefix}*
 ╰───────────❍\n\n*_𝐏𝐎𝐖𝐄𝐑𝐄𝐃 𝐁𝐘 𝐒𝐀𝐑𝐊𝐀𝐑-𝐌𝐃_*
`;
          break;
        case "4":
          menuResponse = `╭───❍「 *✨ 𝚂𝚊𝚛𝚔𝚊𝚛-𝙼𝙳✨* 」
│ 🧑‍💻 *𝚄𝚜𝚎𝚛:* ${pushName} ${pushwish}
│ 🌐 *𝙼𝚘𝚍𝚎:* ${mode}
│ ⏰ *𝚃𝚒𝚖𝚎:* ${realTime}
│ 📅 𝙳𝚊𝚝𝚎: *${realDate}*  
╰───────────❍`;
          break;
        case "5":
          menuResponse = `╭───❍「 *✨ 𝚂𝚊𝚛𝚔𝚊𝚛-𝙼𝙳✨* 」
│ 🧑‍💻 *𝚄𝚜𝚎𝚛:* ${pushName} ${pushwish}
│ 🌐 *𝙼𝚘𝚍𝚎:* ${mode}
│ ⏰ *𝚃𝚒𝚖𝚎:* ${realTime}
│ 📅 𝙳𝚊𝚝𝚎: *${realDate}*  
╰───────────❍
 ╭───❍「 *𝐋𝐎𝐆𝐎 𝐌𝐄𝐍𝐔* 」
*│* 💙 *${prefix}LOGO*
*│* 💙 *${prefix}glossysilver*
*│* 💙 *${prefix}writetext*
*│* 💙 *${prefix}blackpinklogo*
*│* 💙 *${prefix}glitchtext*
*│* 💙 *${prefix}advancedglow*
*│* 💙 *${prefix}typographytext*
*│* 💙 *${prefix}pixelglitch*
*│* 💙 *${prefix}neonglitch*
*│* 💙 *${prefix}nigerianflag*
*│* 💙 *${prefix}americanflag*
*│* 💙 *${prefix}deletingtext*
*│* 💙 *${prefix}blackpinkstyle*
*│* 💙 *${prefix}glowingtext*
*│* 💙 *${prefix}underwater*
*│* 💙 *${prefix}logomaker*
*│* 💙 *${prefix}cartoonstyle*
*│* 💙 *${prefix}papercut*
*│* 💙 *${prefix}multicolored*
*│* 💙 *${prefix}effectclouds*
*│* 💙 *${prefix}gradienttext*
 ╰───────────❍\n\n*_POWERED BY SARKAR-MD_*`;
          break;
        case "6":
          menuResponse = `╭───❍「 *✨ 𝚂𝚊𝚛𝚔𝚊𝚛-𝙼𝙳✨* 」
│ 🧑‍💻 *𝚄𝚜𝚎𝚛:* ${pushName} ${pushwish}
│ 🌐 *𝙼𝚘𝚍𝚎:* ${mode}
│ ⏰ *𝚃𝚒𝚖𝚎:* ${realTime}
│ 📅 𝙳𝚊𝚝𝚎: *${realDate}*  
╰───────────❍`;
          break;
        case "7":
          menuResponse = `╭───❍「 *✨ 𝚂𝚊𝚛𝚔𝚊𝚛-𝙼𝙳✨* 」
│ 🧑‍💻 *𝚄𝚜𝚎𝚛:* ${pushName} ${pushwish}
│ 🌐 *𝙼𝚘𝚍𝚎:* ${mode}
│ ⏰ *𝚃𝚒𝚖𝚎:* ${realTime}
│ 📅 𝙳𝚊𝚝𝚎: *${realDate}*  
╰───────────❍`;
          break;
        case "8":
          menuResponse = `╭───❍「 *✨ 𝚂𝚊𝚛𝚔𝚊𝚛-𝙼𝙳✨* 」
│ 🧑‍💻 *𝚄𝚜𝚎𝚛:* ${pushName} ${pushwish}
│ 🌐 *𝙼𝚘𝚍𝚎:* ${mode}
│ ⏰ *𝚃𝚒𝚖𝚎:* ${realTime}
│ 📅 𝙳𝚊𝚝𝚎: *${realDate}*  
╰───────────❍`;
          break;
        default:
          menuResponse = "*❌ Invalid choice. Please reply with 1 to 8.*";
      }

      await sendCommandMessage(menuResponse, receivedMessage);
    });
  }
};

export default menu;
