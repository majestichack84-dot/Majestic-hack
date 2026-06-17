import dotenv from 'dotenv';
import {
  default: makeWASocket,
  useMultiFileAuthState,
  DisconnectReason,
} from '@whiskeysockets/baileys';
import { Boom } from '@hapi/boom';
import { getAIReply, getMenuReply } from './ai.js';

// Load environment variables
dotenv.config();

// Check for required environment variables
if (!process.env.OPENAI_API_KEY) {
  console.error('❌ OPENAI_API_KEY is not set in .env file');
  process.exit(1);
}

const SESSION_ID = process.env.SESSION_ID || 'bot_session';
const AUTH_DIR = `./auth_info_${SESSION_ID}`;

/**
 * Main bot function
 */
async function startBot() {
  try {
    // Load or create authentication state
    const { state, saveCreds } = await useMultiFileAuthState(AUTH_DIR);

    // Create WhatsApp socket connection
    const sock = makeWASocket({
      auth: state,
      printQRInTerminal: true,
      browser: ['Chrome (Linux)', '', ''],
      syncFullHistory: false,
    });

    // Handle connection updates
    sock.ev.on('connection.update', async (update) => {
      const { connection, lastDisconnect, qr } = update;

      // Handle QR code
      if (qr) {
        console.log('📱 Scan this QR code with WhatsApp:');
        console.log('(QR code appears above in terminal)');
      }

      // Handle connection state
      if (connection === 'open') {
        console.log('✅ Bot connected successfully!');
        console.log('🤖 Listening for messages...\n');
      }

      // Handle disconnection
      if (connection === 'close') {
        const shouldReconnect =
          new Boom(lastDisconnect?.error).output?.statusCode !==
          DisconnectReason.loggedOut;

        if (shouldReconnect) {
          console.log('⚠️  Connection closed. Reconnecting...');
          setTimeout(() => startBot(), 3000);
        } else {
          console.log('❌ Logged out. Please delete auth folder and restart.');
          process.exit(0);
        }
      }
    });

    // Handle credentials update
    sock.ev.on('creds.update', saveCreds);

    // Handle incoming messages
    sock.ev.on('messages.upsert', async (m) => {
      const message = m.messages[0];

      // Ignore if no message, outgoing, or group
      if (!message.message || message.key.fromMe || message.key.remoteJid?.endsWith('@g.us')) {
        return;
      }

      const sender = message.key.remoteJid;
      const text = message.message?.conversation || message.message?.extendedTextMessage?.text || '';

      if (!text) return;

      console.log(`📨 Message from ${sender}: "${text}"`);

      try {
        let reply;

        // Check for /menu command
        if (text.toLowerCase().trim() === '/menu') {
          reply = getMenuReply();
          console.log('📋 Sending menu...');
        } else {
          // Get AI reply
          console.log('🤖 AI is thinking...');
          reply = await getAIReply(text);
        }

        // Send reply
        await sock.sendMessage(sender, { text: reply });
        console.log(`✅ Reply sent: "${reply}"\n`);
      } catch (error) {
        console.error('❌ Error processing message:', error.message);
        // Send error fallback
        await sock.sendMessage(sender, {
          text: "Sorry, something went wrong. Please try again or contact our team.",
        });
      }
    });
  } catch (error) {
    console.error('❌ Fatal error:', error.message);
    process.exit(1);
  }
}

// Start the bot
console.log('🚀 Starting AI WhatsApp Bot...\n');
startBot();

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n👋 Shutting down bot...');
  process.exit(0);
});
