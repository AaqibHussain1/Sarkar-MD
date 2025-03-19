import fetch from 'node-fetch';
import config from '../../config.cjs';

const praytime = async (m, sock) => {
  const prefix = config.PREFIX;
  const cmd = m.body.startsWith(prefix)
    ? m.body.slice(prefix.length).split(' ')[0].toLowerCase()
    : '';

  if (["praytime", "prayertimes", "prayertime", "ptime"].includes(cmd)) {
    await m.React('⏳'); // React with a loading icon

    const city = m.body.split(" ").slice(1).join(" ").trim() || "Nawabshah"; // Default city
    const apiUrl = `https://api.nexoracle.com/islamic/prayer-times?city=${encodeURIComponent(city)}`;

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        await sock.sendMessage(m.from, { text: '*Error fetching prayer times!*' }, { quoted: m });
        return;
      }

      const data = await response.json();
      if (data.status !== 200 || !data.result || !data.result.items || data.result.items.length === 0) {
        await sock.sendMessage(m.from, { text: '*Failed to get prayer times. Try again later.*' }, { quoted: m });
        return;
      }

      const prayerTimes = data.result.items[0];
      const weather = data.result.today_weather;
      const location = data.result.city;

      // Random emojis
      const reactionEmojis = ['🕌', '📿', '🙏', '🌅', '☪️', '🕋'];
      const textEmojis = ['🌙', '⭐', '📖', '🕌', '🕋', '🔭'];

      const reactionEmoji = reactionEmojis[Math.floor(Math.random() * reactionEmojis.length)];
      let textEmoji = textEmojis[Math.floor(Math.random() * textEmojis.length)];

      while (textEmoji === reactionEmoji) {
        textEmoji = textEmojis[Math.floor(Math.random() * textEmojis.length)];
      }

      await m.React(reactionEmoji); // Send a random reaction emoji

      let msg = `*🕌 Prayer Times for ${location}, ${data.result.state}*\n\n`;
      msg += `📍 *Location*: ${location}, ${data.result.state}, ${data.result.country}\n`;
      msg += `🕌 *Method*: ${data.result.prayer_method_name}\n\n`;

      msg += `🌅 *Fajr*: ${prayerTimes.fajr}\n`;
      msg += `🌄 *Shurooq*: ${prayerTimes.shurooq}\n`;
      msg += `☀️ *Dhuhr*: ${prayerTimes.dhuhr}\n`;
      msg += `🌇 *Asr*: ${prayerTimes.asr}\n`;
      msg += `🌆 *Maghrib*: ${prayerTimes.maghrib}\n`;
      msg += `🌃 *Isha*: ${prayerTimes.isha}\n\n`;

      msg += `🧭 *Qibla Direction*: ${data.result.qibla_direction}°\n`;
      msg += `🌡️ *Temperature*: ${weather.temperature !== null ? `${weather.temperature}°C` : 'Data not available'}\n`;

      await sock.sendMessage(
        m.from,
        {
          image: { url: 'https://i.imgur.com/Xo1S2AQ.jpeg' }, // Image URL
          caption: msg,
          contextInfo: {
            mentionedJid: [m.sender],
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
              newsletterJid: '120363354023106228@newsletter',
              newsletterName: "Sarkar-MD",
              serverMessageId: -1,
            },
            forwardingScore: 999,
            externalAdReply: {
              title: "✨ Sarkar-MD ✨",
              body: "Prayer Times Information",
              thumbnailUrl: 'https://raw.githubusercontent.com/Sarkar-Bandaheali/BALOCH-MD_DATABASE/refs/heads/main/Pairing/1733805817658.webp',
              sourceUrl: 'https://github.com/Sarkar-Bandaheali/Sarkar-MD',
              mediaType: 1,
              renderLargerThumbnail: false,
            },
          },
        },
        { quoted: m }
      );

      // Send Islamic Audio with error handling
      const audioUrl = 'https://github.com/MRSHABAN40/SHABAN-MD_DATABASE/raw/refs/heads/main/autovoice/sarkar-tum%20pay%20karudon.mp3';
      try {
        await sock.sendMessage(m.from, {
          audio: { url: audioUrl },
          mimetype: 'audio/mp4',
          ptt: false
        }, { quoted: m });
      } catch (error) {
        console.error("Audio failed to send:", error);
        await sock.sendMessage(m.from, { text: "*⚠️ Audio could not be sent.*" }, { quoted: m });
      }

      await m.React('✅'); // React with success emoji
    } catch (e) {
      console.error(e);
      await sock.sendMessage(m.from, { text: '*Error fetching prayer times. Please try again later.*' }, { quoted: m });
    }
  }
};

export default praytime;
