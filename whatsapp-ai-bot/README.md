# 🤖 AI WhatsApp Customer Bot Template

A plug-and-play WhatsApp bot powered by OpenAI that replies like a human sales agent. Perfect for small businesses, salons, restaurants, and service providers.

## ✨ Features

- ✅ **AI-Powered Replies** - Responds like a real sales agent using GPT-4o-mini
- ✅ **No Database Needed** - All business data stored in `business.json`
- ✅ **FAQ Automation** - Handles prices, hours, locations, bookings
- ✅ **M-Pesa Integration** - Includes payment instructions automatically
- ✅ **Menu Command** - `/menu` displays all products/services
- ✅ **Error Handling** - Graceful fallbacks if AI fails
- ✅ **Easy Setup** - 5 minutes to get running
- ✅ **Hot Reload** - Optional `npm run dev` with auto-restart
- ✅ **Dual Login** - Pairing code OR QR scan (pairing code works better on desktop)

## 📋 Prerequisites

- Node.js 18+ ([Download](https://nodejs.org/))
- OpenAI API Key ([Get one free](https://platform.openai.com/api-keys))
- WhatsApp account
- ~50MB disk space for node_modules

## �� Quick Start

### Step 1: Install Dependencies

```bash
npm install
```

### Step 2: Set Up Environment Variables

Copy `.env.example` to `.env` and add your OpenAI API key:

```bash
cp .env.example .env
```

Then edit `.env`:

```env
OPENAI_API_KEY=sk-your-actual-key-here
SESSION_ID=bot_session
OWNER_PHONE=+254712345678
```

**Get your OpenAI key:**
1. Go to https://platform.openai.com/api-keys
2. Click "Create new secret key"
3. Copy and paste into `.env`

### Step 3: Customize Business Info

Edit `business.json` with your business details:

```json
{
  "BUSINESS_NAME": "Your Business Name",
  "OWNER_NAME": "Your Name",
  "PHONE": "+254712345678",
  "MPESA_TILL": "654321",
  "BUSINESS_DETAILS": "What your business does",
  "LOCATION": "Where you're located",
  "HOURS": "Mon-Sat: 9AM-6PM",
  "products": [
    {
      "name": "Service Name",
      "price": "KES 500",
      "description": "Service description"
    }
  ]
}
```

### Step 4: Start the Bot

```bash
npm start
```

You'll see one of two login methods:

**Option A: Pairing Code** (Recommended for desktop)
```
📱 PAIRING CODE METHOD
==================================================
Your Pairing Code: ABC-DEFG-HIJK

On Your Phone:
1. Open WhatsApp
2. Go to Settings → Linked Devices
3. Select "Link with Phone Number"
4. Enter this code when prompted
==================================================
```

**Option B: QR Code** (Fallback if pairing code fails)
```
📱 SCAN QR CODE METHOD (Backup):
(QR code appears above in terminal)
```

### Step 5: Link to WhatsApp

**Using Pairing Code (Recommended):**
1. Open **WhatsApp** on your phone
2. Go to **Settings → Linked Devices → Link with Phone Number**
3. **Type the pairing code** from terminal or WhatsApp message
4. Bot connects automatically ✅

**Using QR Code (Backup):**
1. Open **WhatsApp** on your phone
2. Go to **Settings → Linked Devices → Link a Device**
3. **Point your phone camera** at the QR code in terminal
4. Wait for "✅ Bot connected successfully!" message

## 💬 How It Works

### Customer sends message:
```
Hi, what's your haircut price?
```

### Bot replies (within 2-3 seconds):
```
We offer professional haircuts for KES 500! 💇‍♀️ 
Pay via M-Pesa: 654321. Want to book? Send your name & preferred time.
```

### Special Commands

Send `/menu` to show all services:
```
/menu
```

Bot responds with:
```
📋 *Salon La Mode MENU*

1. Haircut
   Price: KES 500
   Professional haircut for all hair types

2. Braids
   Price: KES 1,500-3,000
   ...
```

## 📁 File Structure

```
whatsapp-ai-bot/
├── package.json           # Dependencies and scripts
├── .env.example          # Environment variables template
├── .env                  # Your actual credentials (create this)
├── business.json         # Business info & products
├── ai.js                 # OpenAI integration
├── index.js              # Main bot logic
├── auth_info_*/          # Auto-created WhatsApp auth (don't touch)
└── README.md             # This file
```

## 🎯 Bot Behavior

The bot:

1. **Reads customer message** → Sends to OpenAI with business context
2. **AI generates reply** → Natural 2-3 sentence response (not robotic)
3. **Sends reply back** → Immediate response to customer

### What the bot can do:

✅ Answer product/service questions
✅ Quote prices (includes M-Pesa info)
✅ Ask for booking details (name, phone, location)
✅ Provide business hours & location
✅ Handle FAQs automatically
✅ Redirect unknown questions to owner

### What it won't do:

❌ Process payments (just gives M-Pesa till)
❌ Access external websites
❌ Send media/images
❌ Join groups or handle group chats
❌ Remember conversation history (stateless)

## 🔧 Development Mode

For development with auto-reload:

```bash
npm run dev
```

This uses `--watch` flag to restart bot when you edit files.

## 📊 Example Conversations

### Scenario 1: Price Inquiry

```
Customer: How much for braids?
Bot: We offer beautiful braids for KES 1,500-3,000 depending on style! 
Book now by sending your name, phone, and preferred style. 
M-Pesa: 654321 💇‍♀️
```

### Scenario 2: Booking Request

```
Customer: I want to book a haircut tomorrow at 2PM
Bot: Perfect! Please provide your:
1. Full name
2. Phone number
3. Preferred location

We'll confirm your booking right away!
```

### Scenario 3: Unknown Question

```
Customer: Do you offer wigs?
Bot: Let me connect you to Grace. 
What's your phone number so she can reach you?
```

## 🐛 Troubleshooting

### "No pairing code appearing?"
- Make sure `OWNER_PHONE` is set in `.env` (format: +254712345678)
- Try removing `auth_info_*` folder and restarting
- If still failing, use QR code method instead

### "Pairing code not sent to WhatsApp?"
- Code will send to your WhatsApp only after first connection
- The console will always show the code regardless
- You can manually type it in WhatsApp → Linked Devices

### "No QR code appearing?"
- Make sure terminal is wide enough (at least 80 chars)
- Delete `auth_info_*` folder and restart
- Check Node.js version: `node --version` (need 18+)

### "API key error?"
- Check `.env` file exists and has `OPENAI_API_KEY=sk-...`
- Verify key is valid: https://platform.openai.com/account/api-keys
- Ensure no spaces around `=` in `.env`

### "Bot not replying?"
- Check OpenAI API has credits/quota
- Verify business.json is valid JSON (use jsonlint.com)
- Check internet connection
- Look for error messages in terminal

### "Getting rate-limited?"
- OpenAI free tier has rate limits
- Upgrade to paid account or add delays between messages
- Switch to a faster model if needed

### "WhatsApp shows 'device not recognized'?"
- Delete the `auth_info_*` folder
- Restart the bot: `npm start`
- Use pairing code or scan QR code again within 30 seconds
- Don't use the account on web/desktop during setup

## 💰 Costs

### OpenAI API:
- **Free tier**: 5 USD credits (expires after 3 months)
- **Paid**: ~$0.01-0.02 per message (GPT-4o-mini is cheapest)
- **Estimate**: 1000 messages ≈ $0.30

### WhatsApp:
- **Free** to use, but don't spam (you'll get banned)
- **Note**: This uses personal WhatsApp, not Business API

## 🔐 Security Notes

- **Never commit `.env` to git** (add to `.gitignore`)
- **Keep API key private** (visible in `.env` only)
- **Don't share auth_info folder** (contains session tokens)
- **Rotate API key regularly** if exposed
- **Pairing code expires** - It's only valid for ~60 seconds, get a new one if it expires

## 🚀 Deployment

To run on a server 24/7:

### Option 1: PM2 (Recommended)
```bash
npm install -g pm2
pm2 start index.js --name "whatsapp-bot"
pm2 save
pm2 startup
```

### Option 2: Docker
```dockerfile
FROM node:18
WORKDIR /app
COPY . .
RUN npm install
CMD ["npm", "start"]
```

```bash
docker build -t whatsapp-bot .
docker run -d --name bot whatsapp-bot
```

### Option 3: Railway/Render (Free)
1. Push to GitHub
2. Connect repo to Railway/Render
3. Add `OPENAI_API_KEY` and `OWNER_PHONE` environment variables
4. Deploy

## 📝 Customization

### Change bot personality:
Edit `ai.js` line 37 in the system prompt. Example:
```javascript
// From: "You are a WhatsApp customer service agent"
// To: "You are a funny, sarcastic sales assistant"
```

### Change response length:
Edit `ai.js` line 63:
```javascript
max_tokens: 150,  // Increase to 200 for longer responses
```

### Add business hours validation:
Modify `ai.js` to check if it's business hours before replying

### Integrate with spreadsheet:
Load business data from Google Sheets API instead of JSON

## 📞 Support

- **OpenAI Docs**: https://platform.openai.com/docs
- **Baileys Docs**: https://github.com/WhiskeySockets/Baileys
- **WhatsApp Bot Tips**: Search "WhatsApp bot best practices"

### Buyer Setup: Add Your Own OpenAI API Key

Each buyer needs their own OpenAI key. Takes 2 mins + you get $5 free credit.

**Step 1: Get API Key**
1. Go to https://platform.openai.com/api-keys
2. Sign up/Login → Click "Create new secret key" 
3. Copy the key starting with `sk-...`

**Step 2: Add to Bot**
1. Rename `.env.example` to `.env`
2. Paste your key: `OPENAI_API_KEY=sk-your-key-here`
3. Add your phone: `OWNER_PHONE=+254712345678`
4. Change `SESSION_ID=bot_session` to your business name

**Step 3: Add $5 Credit**
1. Go to https://platform.openai.com/account/billing
2. Click "Add payment method" → Add $5
3. $5 = ~30,000 customer chats on `gpt-4o-mini`. Most small biz spend <$2/month.

**Step 4: Login Methods**

You have two options:

**Option A: Pairing Code (Recommended for Desktop)**
- Run `npm start`
- Copy the 12-character code from console
- On WhatsApp phone: Settings → Linked Devices → Link with Phone Number → Paste code
- Bot connects instantly ✅

**Option B: QR Code (Scan with Phone)**
- Run `npm start`
- Scan QR code with WhatsApp on your phone
- Settings → Linked Devices → Link a Device
- Bot connects within seconds ✅

**Important:** 
- Don't share your key. If leaked, someone else can use your credits.
- Model used: `gpt-4o-mini` = cheapest + fastest for WhatsApp bots.
- Out of credit? Bot will reply with error. Just top up at OpenAI.
- Pairing code expires after ~60 seconds, request a new one by restarting.

Need help? DM me after purchase and I'll set it up for you +$10 

## 📄 License

MIT License - Feel free to use and modify

## 🎉 Next Steps

1. ✅ Get it running locally
2. ✅ Test with your phone
3. ✅ Deploy to a server
4. ✅ Add more business features
5. ✅ Scale to handle multiple customers

---

**Happy botting! 🚀**

Built with ❤️ using Node.js, OpenAI, and Baileys
