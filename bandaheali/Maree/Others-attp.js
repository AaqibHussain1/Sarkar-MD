import config from '../../config.cjs';

const attp = async (m, sock) => {
  const prefix = config.PREFIX;
  const cmd = m.body.startsWith(prefix)
    ? m.body.slice(prefix.length).split(' ')[0].toLowerCase()
    : '';

  if (cmd === "attp") {
    try {
      const args = m.body.slice(prefix.length + cmd.length).trim();
      if (!args) {
        await sock.sendMessage(
          m.from,
          { text: "*Please provide text!*" },
          { quoted: m }
        );
        return;
      }

      await m.React('🪀'); // React with yo-yo emoji

  
      const gifBuffer = await fetchGif(`https://api.nexoracle.com/image-creating/attp?apikey=2f9b02060a600d6c88&text=${encodeURIComponent(args)}`);
      const stickerBuffer = await gifToSticker(gifBuffer);

      await sock.sendMessage(
        m.from,
        { sticker: stickerBuffer },
        { quoted: m }
      );

      await m.React('✅'); // Success reaction
    } catch (error) {
      await sock.sendMessage(
        m.from,
        { text: `❌ ${error.message}` },
        { quoted: m }
      );
      await m.React('❌'); // Error reaction
    }
  }
};

export default attp;
