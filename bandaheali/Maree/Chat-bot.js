import config from '../../config.cjs';
import fetch from 'node-fetch';

const chatbotCommand = async (m, Matrix) => {
  const dev = "923253617422@s.whatsapp.net";
  const chatbot = config.CHAT_BOT || false;

  const text = m.message?.conversation
    || m.message?.extendedTextMessage?.text
    || m.message?.imageMessage?.caption
    || null;
  if (!text) return;

  const bot = await Matrix.decodeJid(Matrix.user.id);
  const owner = config.OWNER_NUMBER + '@s.whatsapp.net';
  const isAllowed = [bot, owner, dev];

  if (!chatbot) return;
  if (!m.sender || isAllowed.includes(m.sender)) return;
  if (m.key.remoteJid.endsWith("@g.us")) return;
  if (m.key.remoteJid.endsWith("@newsletter")) return;
  
const lowerText = text.toLowerCase();
if (
  ['who are you', 'which ai model you are', 'apko kisne bnaya', 'which ai you model you are?', 'ap kon ho'].includes(lowerText)
) {
  return await Matrix.sendMessage(
    m.sender,
    { text: 'I am Sarkar, an AI created by Bandaheali. How can I help you Sir?' },
    { quoted: m }
  );
}

  try {
    const response = await fetch(`https://apis-keith.vercel.app/ai/gpt?q=${encodeURIComponent(text)}`);

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const data = await response.json();
    
    if (!data.status) throw new Error('API returned false status');
    
    const botReply = data.result || '_*SOORY SIR MAIN SMJHA NAI*_';
    
    await Matrix.sendMessage(m.sender, { text: botReply }, { quoted: m });

  } catch (err) {
    console.error('Error fetching AI response:', err.message);
    await Matrix.sendMessage(m.sender, { text: '❌ Failed to fetch response from the server.' }, { quoted: m });
  }
};

export default chatbotCommand;
