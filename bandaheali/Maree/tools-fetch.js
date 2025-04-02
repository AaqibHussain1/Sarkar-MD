import axios from "axios";
import config from "../../config.cjs";
import fetch from "node-fetch";
import fs from "fs";
import os from "os";
import path from "path";

const IMGUR_CLIENT_ID = "51c547f88a81855"; // Your Imgur Client ID

const toolsCommand = async (m, sock) => {
  const prefix = config.PREFIX;
  const pushName = m.pushName || "User";

  const cmd = m.body.startsWith(prefix)
    ? m.body.slice(prefix.length).split(" ")[0].toLowerCase()
    : "";
  const args = m.body.slice(prefix.length).trim().split(" ").slice(1);
  const query = args.join(" "); // Fixed query for TTS

  const sendCommandMessage = async (messageContent) => {
    await sock.sendMessage(
      m.from,
      {
        text: messageContent,
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
            body: pushName,
            thumbnailUrl:
              "https://raw.githubusercontent.com/Sarkar-Bandaheali/BALOCH-MD_DATABASE/refs/heads/main/Pairing/1733805817658.webp",
            sourceUrl: "https://github.com/Sarkar-Bandaheali/Sarkar-MD",
            mediaType: 1,
            renderLargerThumbnail: false,
          },
        },
      },
      { quoted: m }
    );
  };

  // ✅ Fetch API Command ✅
  if (cmd === "fetch" || cmd === "get") {
    if (!args[0]) {
      await sendCommandMessage("❌ *Usage:* .fetch <API URL>");
      return;
    }

    await m.React("⏳");
    try {
      const response = await fetch(args[0]);
      const data = await response.json();
      const formattedData = JSON.stringify(data, null, 2).slice(0, 4000); // Limit message size
      await m.React("✅");
      await sendCommandMessage(`📌 *API Response:*  \n\`\`\`${formattedData}\`\`\``);
    } catch (error) {
      await m.React("❌");
      await sendCommandMessage("❌ *Invalid API or Network Error!*");
    }
  }

  // ✅ TTS (Text-to-Speech) Command ✅
  if (cmd === "tts") {
    await m.React("⏳");
    try {
      if (!query) {
        return await sendCommandMessage("براہ کرم، کوئی متن فراہم کریں! 📝");
      }

      const apiUrl = `https://bk9.fun/tools/tts?q=${encodeURIComponent(query)}&lang=`;

      await sock.sendMessage(
        m.from,
        {
          audio: { url: apiUrl },
          mimetype: "audio/mp4",
          ptt: true,
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
              body: "Listen to TTS Audio",
              thumbnailUrl:
                "https://raw.githubusercontent.com/Sarkar-Bandaheali/BALOCH-MD_DATABASE/refs/heads/main/Pairing/1733805817658.webp",
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
      await m.React("❌");
      await sendCommandMessage("⚠️ معاف کیجیے، TTS آڈیو حاصل کرنے میں مسئلہ ہوا۔ دوبارہ کوشش کریں۔");
    }
  }

// ✅ URL Shortener ✅
if (cmd === "shorten") {
  await m.React("⏳");

  if (!args[0]) {
    return await sendCommandMessage("❌ *Usage:* .shorten <URL>");
  }

  const userUrl = args[0]; // User-provided URL
  const apiUrl = `https://apis.giftedtech.web.id/api/tools/tinyurl?apikey=gifted-md&url=${encodeURIComponent(userUrl)}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (!data.success || !data.result) {
      throw new Error("Invalid response from API");
    }

    const shortUrl = data.result;

    const messageText = `🔗 *URL Shortened Successfully!*\n\n📌 *Original:* ${userUrl}\n🔖 *Shortened:* ${shortUrl}\n\n🚀 *_Sarkar-MD Powered by BANDAHEALI_*`;

    await sendCommandMessage(messageText);
    await m.React("✅");
  } catch (error) {
    console.error(error);
    await m.React("❌");
    await sendCommandMessage("⚠️ *Failed to shorten the URL. Please try again!*");
  }
}

};

export default toolsCommand;
