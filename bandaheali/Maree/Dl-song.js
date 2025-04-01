import yts from 'yt-search';
import config from '../../config.cjs';

const dlSong2 = async (m, sock) => { 
  const prefix = config.PREFIX; 
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : ''; 
  const text = m.body.slice(prefix.length + cmd.length).trim();

  if (cmd === "song2" || cmd === "yta2") { 
    if (!text) { 
      return sock.sendMessage(m.from, { text: "🔎 Please provide a song name or YouTube link!" }, { quoted: m }); 
    }

    await m.React('⏳'); // React with a loading icon

    try {
      // Search for the video using yt-search
      const searchResults = await yts(text);
      if (!searchResults.videos.length) {
        return sock.sendMessage(m.from, { text: "❌ No results found!" }, { quoted: m });
      }

      const video = searchResults.videos[0]; // Get the first result
      const videoUrl = video.url;

      // Fetch audio download link from new API
      const apiUrl = `https://apis.giftedtech.web.id/api/download/dlmp3?apikey=gifted&url=${videoUrl}`;
      const response = await fetch(apiUrl);
      const result = await response.json();

      if (!result.success || !result.result || !result.result.download_url) {
        return sock.sendMessage(m.from, { text: "❌ Failed to fetch download link!" }, { quoted: m });
      }

      const { title, download_url, thumbnail, quality } = result.result;

      await m.React('✅'); // React with a success icon

      sock.sendMessage(
        m.from,
        {
          audio: { url: download_url },
          mimetype: "audio/mpeg",
          ptt: false,
          fileName: `${title}.mp3`,
          caption: `🎵 *Title:* ${title}\n🎚️ *Quality:* ${quality}\n📥 *Downloaded from:* Sarkar-MD\n\nPOWERED BY BANDAHEALI`,
          contextInfo: {
            isForwarded: false,
            forwardingScore: 999,
            externalAdReply: {
              title: "✨ Sarkar-MD ✨",
              body: "YouTube Audio Downloader",
              thumbnailUrl: thumbnail,
              sourceUrl: videoUrl,
              mediaType: 1,
              renderLargerThumbnail: true,
            },
          },
        },
        { quoted: m }
      );
    } catch (error) {
      console.error("Error in dlSong command:", error);
      sock.sendMessage(m.from, { text: "❌ An error occurred while processing your request!" }, { quoted: m });
      await m.React('❌'); // React with error icon if something fails
    }
  }
};

export default dlSong2;
