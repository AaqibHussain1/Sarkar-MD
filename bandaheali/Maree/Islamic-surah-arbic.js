import config from '../../config.cjs'; // Ensure this matches your project setup
import axios from 'axios'; // Install axios if not already installed: npm install axios

const islsarbic = async (m, sock) => {
  const prefix = config.PREFIX;
  const cmd = m.body.startsWith(prefix)
    ? m.body.slice(prefix.length).split(' ')[0].toLowerCase()
    : '';
  const query = m.body.slice(prefix.length + cmd.length).trim();
  if (cmd === "suraharbic") {
    if (!query || isNaN(query) || query < 1 || query > 114) {
      return sock.sendMessage(
        m.from,
        { text: "⚠️ Please enter a number between 1 and 114.\nExample: `!suraharbic 1`" },
        { quoted: m }
      );
    }

    await m.React("⏳");
    try {
      const response = await axios.get(`https://api.nexoracle.com/islamic/quran-surah?q=${query}/ar`);
      const data = response.data?.result;
      if (!data || !data.surah_details || !data.data?.chapter) throw new Error("Invalid API response");

      const { title_en, title_ar, verses } = data.surah_details;
      const chapterText = data.data.chapter.map(v => `📖 *آیت ${v.verse}:* ${v.text}`).join("\n\n");
      const messageText = `📖 *${title_en}* (${title_ar})\n🔢 *Verses:* ${verses}\n\n${chapterText}\n\n🚀 *_POWERED BY SARKAR-MD_*`;

      await sock.sendMessage(
        m.from,
        {
          text: messageText,
          contextInfo: {
            isForwarded: true,
            forwardingScore: 999,
            forwardedNewsletterMessageInfo: {
              newsletterJid: "120363315182578784@newsletter",
              newsletterName: "Sarkar-MD",
              serverMessageId: -1,
            },
            externalAdReply: {
              title: "✨ Sarkar-MD ✨",
              body: "Read Surah with Urdu Translation",
              thumbnailUrl: "https://raw.githubusercontent.com/Sarkar-Bandaheali/BALOCH-MD_DATABASE/refs/heads/main/Pairing/1733805817658.webp",
              sourceUrl: "https://github.com/Sarkar-Bandaheali/Sarkar-MD",
              mediaType: 1,
              renderLargerThumbnail: true,
            },
          },
        },
        { quoted: m }
      );
      await m.React("✅");
    } catch (error) {
      console.error(error);
      await m.React("❌");
      sock.sendMessage(
        m.from,
        { text: "⚠️ Sorry, there was an issue fetching the Arabic Surah. Please try again." },
        { quoted: m }
      );
    }
  }
};

export default islsarbic;
