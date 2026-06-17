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
const OWNER_PHONE = process.env.OWNER_PHONE;
const AUTH_DIR = `./auth_info_${SESSION_ID}`;

/**
 * Send a message to owner's WhatsApp when pairing code is generated
 */
async function sendPairingCodeToOwner(sock, code) {
  if (!OWNER_PHONE) return;

  try {
    const cleanPhone = OWNER_PHONE.replace(/\D/g, '');
    const jid = cleanPhone.endsWith('@s.whatsapp.net')
      ? cleanPhone
      : `${cleanPhone}@s.whatsapp.net`;

    await sock.sendMessage(jid, {
      text: `🤖 Your WhatsApp Bot Pairing Code:\n\n${code}\n\nEnter this in WhatsApp → Linked Devices → Link with Phone Number`,
    });
  } catch (error) {
    // Silently fail - phone might not be added yet
  }
}

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
      printQRInTerminal: false, // Disable QR, will use pairing code instead
      browser: ['Chrome (Linux)', '', ''],
      syncFullHistory: false,
    });

    // Handle connection updates
    sock.ev.on('connection.update', async (update) => {
      const { connection, lastDisconnect, qr } = update;

      // Handle pairing code login for new sessions
      if (
        update.connection === 'connecting' &&
        !sock.authState.creds.registered
      ) {
        await new Promise((resolve) => setTimeout(resolve, 3000));

        if (OWNER_PHONE) {
          try {
            const phoneNumber = OWNER_PHONE.replace(/\D/g, '');
            const code = await sock.requestPairingCode(phoneNumber);

            console.log('\n📱 PAIRING CODE METHOD');
            console.log('='.repeat(50));
            console.log('Your Pairing Code:', code);
            console.log('\nOn Your Phone:');
            console.log('1. Open WhatsApp');
            console.log('2. Go to Settings → Linked Devices');
            console.log('3. Select "Link with Phone Number"');
            console.log('4. Enter this code when prompted');
            console.log('='.repeat(50) + '\n');

            // Send code to owner's WhatsApp
            await sendPairingCodeToOwner(sock, code);
          } catch (error) {
            console.log(
              '⚠️  Pairing code request failed. You can still use QR code.'
            );
            console.log('Make sure OWNER_PHONE is set correctly in .env\n');
          }
        } else {
          console.log('⚠️  OWNER_PHONE not set. Using QR code fallback.\n');
        }
      }

      // Handle QR code as backup
      if (qr) {
        console.log('📱 SCAN QR CODE METHOD (Backup):');
        console.log('(QR code appears above in terminal)');
        console.log('Or use the pairing code method above.\n');
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
      if (
        !message.message ||
        message.key.fromMe ||
        message.key.remoteJid?.endsWith('@g.us')
      ) {
        return;
      }

      const sender = message.key.remoteJid;
      const text =
        message.message?.conversation ||
        message.message?.extendedTextMessage?.text ||
        '';

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
          text: 'Sorry, something went wrong. Please try again or contact our team.',
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