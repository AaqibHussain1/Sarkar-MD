import { allFonts, stylize } from '../../lib/fonts.js';
import config from '../../config.js';
import moment from 'moment-timezone';

const testCmd = async (m, sock) => {
  try {
    const prefix = config.PREFIX;
    const owner = config.OWNER_NAME;
    const name = config.BOT_NAME;
    const menuimg = config.MENU_IMAGE;
    const realTime = moment().tz("Asia/Karachi").format("HH:mm:ss");
    const mode = config.MODE || "public";
    const pushName = m.pushName || "Sarkar";
    const pushwish = "HAPPY TO SEE YOU";
    
const uptimeSeconds = process.uptime();
    const days = Math.floor(uptimeSeconds / (24 * 3600));
    const hours = Math.floor((uptimeSeconds % (24 * 3600)) / 3600);
    const minutes = Math.floor((uptimeSeconds % 3600) / 60);
    const seconds = Math.floor(uptimeSeconds % 60);
    
    const cmd = m.body.startsWith(prefix)
      ? m.body.slice(prefix.length).split(' ')[0].toLowerCase()
      : '';
      
    const sendCommandMessage = async (messageCaption) => {
      return sock.sendMessage(
        m.from,
        {
          image: {
            url: menuimg || 'https://raw.githubusercontent.com/Sarkar-Bandaheali/BALOCH-MD_DATABASE/refs/heads/main/Pairing/1733805817658.webp',
          },
          caption: messageCaption,
          contextInfo: {
            isForwarded: true,
            forwardingScore: 999,
            forwardedNewsletterMessageInfo: {
              newsletterJid: '120363315182578784@newsletter',
              newsletterName: "SARKAR-MD",
              serverMessageId: -1,
            },
          },
        },
        { quoted: m }
      );
    };

    if (cmd === 'menu' || cmd === 'islamicmenu' || cmd === 'downloadmenu' || cmd === 'aimenu' || cmd === 'groupmenu' || cmd === 'logomenu' || cmd === 'ownermenu' || 'toolsmenu' || cmd === 'searchmenu' || cmd === 'reactionmenu' || 'othermenu') {
      const fonts = Object.keys(allFonts);
      const randomFont = fonts[Math.floor(Math.random() * fonts.length)];

      
  let menu = `╭───❍「 *✨${name}✨* 」
│ 🧑‍💻 *USER:* ${pushName} ${pushwish}
│ 🌐 *MODE:* ${mode}
│ ⏰ *TIME:* ${realTime}
│ 😇 *Owner:* ${owner}
│ 🪄 *Prefix:* ${prefix}
│ 🇵🇰 *CREATER:* *_BANDAHEALI_*
│ 🚀 *Uptime:* ${days}d ${hours}h ${minutes}m ${seconds}s
╰───────────❍
╭───────◇◆◇───────╮
│ 🕌 ${prefix}IslamicMenu
│ 📥 ${prefix}DownloadMenu
│ 🤖 ${prefix}AiMenu
│ 🫂 ${prefix}GroupMenu
│ 🎨 ${prefix}LogoMenu
│ 👑 ${prefix}OwnerMenu
│ 🧩 ${prefix}OtherMenu
│ ✨ ${prefix}ToolsMenu
│ 🔍 ${prefix}SearchMenu
│ 🔍 *${prefix}ReactionMenu*
╰──────◇◆◇──────╯
╭───❍「 *ISLAMIC MENU* 」
*│* 💙 *${prefix}SurahAudio*
*│* 💙 *${prefix}SurahUrdu*
*│* 💙 *${prefix}SurahArabic*
*│* 💙 *${prefix}SurahEng*
*│* 💙 *${prefix}PrayerTime*
*│* 💙 *${prefix}PTime*
*│* 💙 *${prefix}SBukhari*  
╰───────────❍
╭───❍「 *DOWNLOAD MENU* 」
*│* 💙 *${prefix}Play*
*│* 💙 *${prefix}Song*
*│* 💙 *${prefix}Song2*
*│* 💙 *${prefix}Song3*
*│* 💙 *${prefix}Ytmp3*
*│* 💙 *${prefix}Video*
*│* 💙 *${prefix}Video2*
*│* 💙 *${prefix}Video3*
*│* 💙 *${prefix}Ytmp4*
*│* 💙 *${prefix}FB*
*│* 💙 *${prefix}FB2*
*│* 💙 *${prefix}Insta*
*│* 💙 *${prefix}TikTok*
*│* 💙 *${prefix}TikTok2*
*│* 💙 *${prefix}Tiks*
*│* 💙 *${prefix}Snack*
*│* 💙 *${prefix}Tweet*
*│* 💙 *${prefix}Apk*
*│* 💙 *${prefix}MediaFire*
╰───────────❍
╭───❍「 *AI MENU* 」
*│* 💙 *${prefix}AI*
*│* 💙 *${prefix}GPT*
*│* 💙 *${prefix}BlackBox*
*│* 💙 *${prefix}Imagine*
*│* 💙 *${prefix}Imagine2*
*│* 💙 *${prefix}Imagine3*
╰───────────❍
╭───❍「 *GROUP MENU* 」
*│* 💙 *${prefix}AntiLink*
*│* 💙 *${prefix}AntiMedia*
*│* 💙 *${prefix}AntiVoice*
*│* 💙 *${prefix}TagAll*
*│* 💙 *${prefix}HideTag*
*│* 💙 *${prefix}Open*
*│* 💙 *${prefix}Close*
*│* 💙 *${prefix}Add*
*│* 💙 *${prefix}Invite*
*│* 💙 *${prefix}Kick*
*│* 💙 *${prefix}Dis*
*│* 💙 *${prefix}ResetLink*
*│* 💙 *${prefix}GcLink* 
*│* 💙 *${prefix}Out*
╰───────────❍
╭───❍「 *LOGO MENU* 」
*┋* © *${prefix}Logo*
*┋* ©️ *${prefix}Logo1*
*┋* ©️ *${prefix}Logo2*
*┋* ©️ *${prefix}Logo3*
*┋* ©️ *${prefix}Logo4*
*┋* ©️ *${prefix}Logo5*
*┋* ©️ *${prefix}Logo6*
*┋* ©️ *${prefix}Logo7*
*┋* ©️ *${prefix}Logo8*
*┋* ©️ *${prefix}Logo9*
*┋* ©️ *${prefix}Logo10*
*┋* ©️ *${prefix}Logo11*
*┋* ©️ *${prefix}Logo12*
*┋* ©️ *${prefix}Logo13*
*┋* ©️ *${prefix}Logo14*
*┋* ©️ *${prefix}Logo15*
*┋* ©️ *${prefix}Logo16*
*┋* ©️ *${prefix}Logo17*
*┋* ©️ *${prefix}Logo18*
*┋* ©️ *${prefix}Logo19*
*┋* ©️ *${prefix}Logo20*
╰───────────❍
╭───❍「 *OWNER MENU* 」
*│* 💙 *${prefix}setprefix*
*│* 💙 *${prefix}mode*
*│* 💙 *${prefix}settings*
*│* 💙 *${prefix}Restart*
*│* 💙 *${prefix}Join*
*│* 💙 *${prefix}Left*
*│* 💙 *${prefix}Block*
*│* 💙 *${prefix}Unblock*
*│* 💙 *${prefix}AlwaysOnline*
*│* 💙 *${prefix}Typing*
*│* 💙 *${prefix}Recording*
*│* 💙 *${prefix}AntiCall*
*│* 💙 *${prefix}AutoRead*
*│* 💙 *${prefix}Autoreact*
*│* 💙 *${prefix}ChatBot*
*│* 💙 *${prefix}PmBlock*
*│* 💙 *${prefix}Antidelete*
*│* 💙 *${prefix}Editowner*
*│* 💙 *${prefix}Editnum*
*│* 💙 *${prefix}botname*
*│* 💙 *${prefix}menuimg*
*│* 💙 *${prefix}Vv*
*│* 💙 *${prefix}Vv2*
*│* 💙 *${prefix}Vv3*
*│* 💙 *${prefix}Forward*
*│* 💙 *${prefix}Lush*
*│* 💙 *${prefix}Nice*
*│* 💙 *${prefix}Salute*
╰───────────❍
╭───❍「 *OTHER MENU* 」
*│* 🗿 *${prefix}Ping*
*│* 🗿 *${prefix}About*
*│* 🗿 *${prefix}repo*
*│* 🗿 *${prefix}Alive*
*│* 🗿 *${prefix}Url*
*│* 🗿 *${prefix}dev*
*│* 🗿 *${prefix}owner*
*│* 🗿 *${prefix}Sendme*
╰───────────❍ 
╭───❍「 *TOOLS MENU* 」
*│* 💙 *${prefix}Fetch*
*│* 💙 *${prefix}Shorten*
*│* 💙 *${prefix}Bitly*
*│* 💙 *${prefix}Tts*
*│* 💙 *${prefix}Tstalk*
*│* 💙 *${prefix}Npm*
*│* 💙 *${prefix}GitStalk*
*│* 💙 *${prefix}Fancy*
╰───────────❍
╭───❍「 *SEARCH MENU* 」
*│* 💙 *${prefix}YTS*
*│* 💙 *${prefix}Spotify*
*│* 💙 *${prefix}Lyrics*
*│* 💙 *${prefix}Playstore*
*│* 💙 *${prefix}HappyMod*
*│* 💙 *${prefix}Movie*
╰───────────❍
╭───❍「 *REACTION MENU* 」
*│* 💙 *${prefix}Cry*
*│* 💙 *${prefix}Kiss*
*│* 💙 *${prefix}Kill*
*│* 💙 *${prefix}Kick*
*│* 💙 *${prefix}Hug*
*│* 💙 *${prefix}Pat*
*│* 💙 *${prefix}Lick*
*│* 💙 *${prefix}Bite*
*│* 💙 *${prefix}Yeet*
*│* 💙 *${prefix}Bully*
*│* 💙 *${prefix}Bonk*
*│* 💙 *${prefix}Wink*
*│* 💙 *${prefix}Poke*
*│* 💙 *${prefix}Nom*
*│* 💙 *${prefix}Slap*
*│* 💙 *${prefix}Smile*
*│* 💙 *${prefix}Wave*
*│* 💙 *${prefix}Awoo*
*│* 💙 *${prefix}Blush*
*│* 💙 *${prefix}Smug*
*│* 💙 *${prefix}Dance*
*│* 💙 *${prefix}Happy*
*│* 💙 *${prefix}Sad*
*│* 💙 *${prefix}Cringe*
*│* 💙 *${prefix}Cuddle*
*│* 💙 *${prefix}Shinobu*
*│* 💙 *${prefix}Handhold*
*│* 💙 *${prefix}Glomp*
*│* 💙 *${prefix}Highfive*
╰───────────❍
> POWERED BY ${name}`;

let islamicmenu = `
╭───❍「 *✨${name}✨* 」
│ 🧑‍💻 *𝚄𝚜𝚎𝚛:* ${pushName} ${pushwish}
│ 🌐 *𝙼𝚘𝚍𝚎:* ${mode}
│ ⏰ *𝚃𝚒𝚖𝚎:* ${realTime}
│ 😇 *Owner:* ${owner}
│ 🪄 *Prefix:* ${prefix}
│ 🇵🇰 *Creater:* *_BANDAHEALI_*

│ 🚀 *Uptime:* ${days}d ${hours}h ${minutes}m ${seconds}s
╰───────────❍
╭───❍「 *ISLAMIC MENU* 」
*│* 💙 *${prefix}SurahAudio*
*│* 💙 *${prefix}SurahUrdu*
*│* 💙 *${prefix}SurahArabic*
*│* 💙 *${prefix}SurahEng*
*│* 💙 *${prefix}PrayerTime*
*│* 💙 *${prefix}PTime*
*│* 💙 *${prefix}SBukhari*  
╰───────────❍
`;

let downloadmenu = `╭───❍「 *✨${name}✨* 」
│ 🧑‍💻 *𝚄𝚜𝚎𝚛:* ${pushName} ${pushwish}
│ 🌐 *𝙼𝚘𝚍𝚎:* ${mode}
│ ⏰ *𝚃𝚒𝚖𝚎:* ${realTime}
│ 😇 *Owner:* ${owner}
│ 🪄 *Prefix:* ${prefix}
│ 🇵🇰 *Creater:* *_BANDAHEALI_*

│ 🚀 *Uptime:* ${days}d ${hours}h ${minutes}m ${seconds}s
╰───────────❍
╭───❍「 *DOWNLOAD MENU* 」
*│* 💙 *${prefix}Play*
*│* 💙 *${prefix}Song*
*│* 💙 *${prefix}Song2*
*│* 💙 *${prefix}Song3*
*│* 💙 *${prefix}Ytmp3*
*│* 💙 *${prefix}Video*
*│* 💙 *${prefix}Video2*
*│* 💙 *${prefix}Video3*
*│* 💙 *${prefix}Ytmp4*
*│* 💙 *${prefix}FB*
*│* 💙 *${prefix}FB2*
*│* 💙 *${prefix}Insta*
*│* 💙 *${prefix}TikTok*
*│* 💙 *${prefix}TikTok2*
*│* 💙 *${prefix}Tiks*
*│* 💙 *${prefix}Snack*
*│* 💙 *${prefix}Tweet*
*│* 💙 *${prefix}Apk*
*│* 💙 *${prefix}MediaFire*
╰───────────❍
`;

let aimenu = `╭───❍「 *✨${name}✨* 」
│ 🧑‍💻 *𝚄𝚜𝚎𝚛:* ${pushName} ${pushwish}
│ 🌐 *𝙼𝚘𝚍𝚎:* ${mode}
│ ⏰ *𝚃𝚒𝚖𝚎:* ${realTime}
│ 😇 *Owner:* ${owner}
│ 🪄 *Prefix:* ${prefix}
│ 🇵🇰 *Creater:* *_BANDAHEALI_*
│ 🚀 *Uptime:* ${days}d ${hours}h ${minutes}m ${seconds}s
╰───────────❍
╭───❍「 *AI MENU* 」
*│* 💙 *${prefix}AI*
*│* 💙 *${prefix}GPT*
*│* 💙 *${prefix}BlackBox*
*│* 💙 *${prefix}Imagine*
*│* 💙 *${prefix}Imagine2*
*│* 💙 *${prefix}Imagine3*
╰───────────❍
`;

const groupmenu = `
╭───❍「 *✨${name}✨* 」
│ 🧑‍💻 *𝚄𝚜𝚎𝚛:* ${pushName} ${pushwish}
│ 🌐 *𝙼𝚘𝚍𝚎:* ${mode}
│ ⏰ *𝚃𝚒𝚖𝚎:* ${realTime}
│ 😇 *Owner:* ${owner}
│ 🪄 *Prefix:* ${prefix}
│ 🇵🇰 *Creater:* *_BANDAHEALI_*
│ 🚀 *Uptime:* ${days}d ${hours}h ${minutes}m ${seconds}s
╰───────────❍
╭───❍「 *GROUP MENU* 」
*│* 💙 *${prefix}AntiLink*
*│* 💙 *${prefix}AntiMedia*
*│* 💙 *${prefix}AntiVoice*
*│* 💙 *${prefix}TagAll*
*│* 💙 *${prefix}HideTag*
*│* 💙 *${prefix}Open*
*│* 💙 *${prefix}Close*
*│* 💙 *${prefix}Add*
*│* 💙 *${prefix}Invite*
*│* 💙 *${prefix}Kick*
*│* 💙 *${prefix}Dis*
*│* 💙 *${prefix}ResetLink*
*│* 💙 *${prefix}GcLink* 
*│* 💙 *${prefix}Out*
╰───────────❍
`;

const logomenu = `╭───❍「 *✨${name}✨* 」
│ 🧑‍💻 *𝚄𝚜𝚎𝚛:* ${pushName} ${pushwish}
│ 🌐 *𝙼𝚘𝚍𝚎:* ${mode}
│ ⏰ *𝚃𝚒𝚖𝚎:* ${realTime}
│ 😇 *Owner:* ${owner}
│ 🪄 *Prefix:* ${prefix}
│ 🇵🇰 *Creater:* *_BANDAHEALI_*
│ 🚀 *Uptime:* ${days}d ${hours}h ${minutes}m ${seconds}s
╰───────────❍
╭───❍「 *LOGO MENU* 」
*┋* © *${prefix}Logo*
*┋* ©️ *${prefix}Logo1*
*┋* ©️ *${prefix}Logo2*
*┋* ©️ *${prefix}Logo3*
*┋* ©️ *${prefix}Logo4*
*┋* ©️ *${prefix}Logo5*
*┋* ©️ *${prefix}Logo6*
*┋* ©️ *${prefix}Logo7*
*┋* ©️ *${prefix}Logo8*
*┋* ©️ *${prefix}Logo9*
*┋* ©️ *${prefix}Logo10*
*┋* ©️ *${prefix}Logo11*
*┋* ©️ *${prefix}Logo12*
*┋* ©️ *${prefix}Logo13*
*┋* ©️ *${prefix}Logo14*
*┋* ©️ *${prefix}Logo15*
*┋* ©️ *${prefix}Logo16*
*┋* ©️ *${prefix}Logo17*
*┋* ©️ *${prefix}Logo18*
*┋* ©️ *${prefix}Logo19*
*┋* ©️ *${prefix}Logo20*
╰───────────❍
`;


let ownermenu = `╭───❍「 *✨${name}✨* 」
│ 🧑‍💻 *𝚄𝚜𝚎𝚛:* ${pushName} ${pushwish}
│ 🌐 *𝙼𝚘𝚍𝚎:* ${mode}
│ ⏰ *𝚃𝚒𝚖𝚎:* ${realTime}
│ 😇 *Owner:* ${owner}
│ 🪄 *Prefix:* ${prefix}
│ 🇵🇰 *Creater:* *_BANDAHEALI_*
│ 🚀 *Uptime:* ${days}d ${hours}h ${minutes}m ${seconds}s
╰───────────❍
╭───❍「 *OWNER MENU* 」
*│* 💙 *${prefix}setprefix*
*│* 💙 *${prefix}mode*
*│* 💙 *${prefix}settings*
*│* 💙 *${prefix}Restart*
*│* 💙 *${prefix}Join*
*│* 💙 *${prefix}Left*
*│* 💙 *${prefix}Block*
*│* 💙 *${prefix}Unblock*
*│* 💙 *${prefix}AlwaysOnline*
*│* 💙 *${prefix}Typing*
*│* 💙 *${prefix}Recording*
*│* 💙 *${prefix}AntiCall*
*│* 💙 *${prefix}AutoRead*
*│* 💙 *${prefix}Autoreact*
*│* 💙 *${prefix}ChatBot*
*│* 💙 *${prefix}PmBlock*
*│* 💙 *${prefix}Antidelete*
*│* 💙 *${prefix}Editowner*
*│* 💙 *${prefix}Editnum*
*│* 💙 *${prefix}botname*
*│* 💙 *${prefix}menuimg*
*│* 💙 *${prefix}Vv*
*│* 💙 *${prefix}Vv2*
*│* 💙 *${prefix}Vv3*
*│* 💙 *${prefix}Forward*
*│* 💙 *Lush*
*│* 💙 *Nice*
*│* 💙 *🫡*
╰───────────❍
`;

const othermenu = `╭───❍「 *✨${name}✨* 」
│ 🧑‍💻 *𝚄𝚜𝚎𝚛:* ${pushName} ${pushwish}
│ 🌐 *𝙼𝚘𝚍𝚎:* ${mode}
│ ⏰ *𝚃𝚒𝚖𝚎:* ${realTime}
│ 😇 *Owner:* ${owner}
│ 🪄 *Prefix:* ${prefix}
│ 🇵🇰 *Creater:* *_BANDAHEALI_*
│ 🚀 *Uptime:* ${days}d ${hours}h ${minutes}m ${seconds}s
╰───────────❍
╭───❍「 *OTHER MENU* 」
*│* 🗿 *${prefix}Ping*
*│* 🗿 *${prefix}About*
*│* 🗿 *${prefix}repo*
*│* 🗿 *${prefix}Alive*
*│* 🗿 *${prefix}Url*
*│* 🗿 *${prefix}dev*
*│* 🗿 *${prefix}owner*
*│* 🗿 *${prefix}Sendme*
╰───────────❍ 
`;


const toolsmenu = `╭───❍「 *✨${name}✨* 」
│ 🧑‍💻 *𝚄𝚜𝚎𝚛:* ${pushName} ${pushwish}
│ 🌐 *𝙼𝚘𝚍𝚎:* ${mode}
│ ⏰ *𝚃𝚒𝚖𝚎:* ${realTime}
│ 😇 *Owner:* ${owner}
│ 🪄 *Prefix:* ${prefix}
│ 🇵🇰 *Creater:* *_BANDAHEALI_*
│ 🚀 *Uptime:* ${days}d ${hours}h ${minutes}m ${seconds}s
╰───────────❍
╭───❍「 *TOOLS MENU* 」
*│* 💙 *${prefix}Fetch*
*│* 💙 *${prefix}Shorten*
*│* 💙 *${prefix}Bitly*
*│* 💙 *${prefix}Tts*
*│* 💙 *${prefix}Tstalk*
*│* 💙 *${prefix}Npm*
*│* 💙 *${prefix}GitStalk*
*│* 💙 *${prefix}Fancy*
╰───────────❍
 `;


let searchmenu = `╭───❍「 *✨${name}✨* 」
│ 🧑‍💻 *𝚄𝚜𝚎𝚛:* ${pushName} ${pushwish}
│ 🌐 *𝙼𝚘𝚍𝚎:* ${mode}
│ ⏰ *𝚃𝚒𝚖𝚎:* ${realTime}
│ 😇 *Owner:* ${owner}
│ 🪄 *Prefix:* ${prefix}
│ 🇵🇰 *Creater:* *_BANDAHEALI_*
│ 🚀 *Uptime:* ${days}d ${hours}h ${minutes}m ${seconds}s
╰───────────❍
╭───❍「 *SEARCH MENU* 」
*│* 💙 *${prefix}YTS*
*│* 💙 *${prefix}Spotify*
*│* 💙 *${prefix}Lyrics*
*│* 💙 *${prefix}Playstore*
*│* 💙 *${prefix}HappyMod*
*│* 💙 *${prefix}Movie*
╰───────────❍`;

let reactionmenu = `╭───❍「 *✨${name}✨* 」
│ 🧑‍💻 *𝚄𝚜𝚎𝚛:* ${pushName} ${pushwish}
│ 🌐 *𝙼𝚘𝚍𝚎:* ${mode}
│ ⏰ *𝚃𝚒𝚖𝚎:* ${realTime}
│ 😇 *Owner:* ${owner}
│ 🪄 *Prefix:* ${prefix}
│ 🇵🇰 *Creater:* *_BANDAHEALI_*
│ 🚀 *Uptime:* ${days}d ${hours}h ${minutes}m ${seconds}s
╰───────────❍
╭───❍「 *REACTION MENU* 」
*│* 💙 *${prefix}Cry*
*│* 💙 *${prefix}Kiss*
*│* 💙 *${prefix}Kill*
*│* 💙 *${prefix}Kick*
*│* 💙 *${prefix}Hug*
*│* 💙 *${prefix}Pat*
*│* 💙 *${prefix}Lick*
*│* 💙 *${prefix}Bite*
*│* 💙 *${prefix}Yeet*
*│* 💙 *${prefix}Bully*
*│* 💙 *${prefix}Bonk*
*│* 💙 *${prefix}Wink*
*│* 💙 *${prefix}Poke*
*│* 💙 *${prefix}Nom*
*│* 💙 *${prefix}Slap*
*│* 💙 *${prefix}Smile*
*│* 💙 *${prefix}Wave*
*│* 💙 *${prefix}Awoo*
*│* 💙 *${prefix}Blush*
*│* 💙 *${prefix}Smug*
*│* 💙 *${prefix}Dance*
*│* 💙 *${prefix}Happy*
*│* 💙 *${prefix}Sad*
*│* 💙 *${prefix}Cringe*
*│* 💙 *${prefix}Cuddle*
*│* 💙 *${prefix}Shinobu*
*│* 💙 *${prefix}Handhold*
*│* 💙 *${prefix}Glomp*
*│* 💙 *${prefix}Highfive*
╰───────────❍
> POWERED BY ${name}`;

const styled = stylize(cmd, randomFont) || menuMsg;
      await sendCommandMessage(styled);
    }
  } catch (err) {
    console.error("Test command error:", err);
  }
  };

export default testCmd;
