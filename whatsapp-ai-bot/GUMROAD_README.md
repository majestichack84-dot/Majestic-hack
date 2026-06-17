# 🤖 AI WhatsApp Customer Bot Template

**Plug-and-play WhatsApp bot powered by OpenAI that replies like a human sales agent. Get your first customer message answered in 2 minutes.**

---

## ✨ What's Included

- **🧠 AI-Powered Replies** - GPT-4o-mini generates natural, human-like responses in WhatsApp style (2-3 sentences)
- **📋 Auto FAQ Handling** - Answers about prices, hours, location, bookings automatically from your business data
- **💰 Auto Lead Capture** - Collects customer names, phone numbers, locations for booking inquiries
- **24/7 Availability** - Bot runs continuously, replies to messages even while you sleep
- **💬 M-Pesa Integration** - Automatically includes payment instructions in replies
- **🎯 Menu Command** - Type `/menu` to display all services and prices
- **⚡ Pairing Code + QR Login** - Two login methods: pairing code (recommended) or scan QR
- **0️⃣ No Database** - Everything stored in simple JSON files, no setup needed
- **🔧 Easy Customization** - Edit `business.json` to change services, prices, owner name
- **🚀 Production Ready** - Clean code, error handling, auto-reconnect

---

## 🎯 Perfect For

✅ Salons & Barbershops  
✅ Restaurants & Cafes  
✅ Beauty Services  
✅ Repair Shops  
✅ Tutoring Centers  
✅ Event Planning  
✅ Real Estate  
✅ **Any service business that gets WhatsApp inquiries**

---

## 🚀 Quick Start (5 Minutes)

### Step 1: Install
```bash
npm install
```

### Step 2: Get OpenAI API Key
1. Go to https://platform.openai.com/api-keys
2. Click "Create new secret key"
3. Copy the key starting with `sk-...`

### Step 3: Configure
```bash
cp .env.example .env
```

Edit `.env` and add:
```env
OPENAI_API_KEY=sk-your-key-here
OWNER_PHONE=+254712345678
SESSION_ID=your-business-name
```

### Step 4: Customize Business
Edit `business.json`:
```json
{
  "BUSINESS_NAME": "Your Salon Name",
  "OWNER_NAME": "Your Name",
  "PHONE": "+254712345678",
  "MPESA_TILL": "654321",
  "BUSINESS_DETAILS": "Premium salon services",
  "LOCATION": "Westlands, Nairobi",
  "HOURS": "Mon-Sat: 9AM-6PM | Sun: 10AM-4PM",
  "products": [
    {
      "name": "Haircut",
      "price": "KES 500",
      "description": "Professional haircut"
    }
  ]
}
```

### Step 5: Start Bot
```bash
npm start
```

### Step 6: Link to WhatsApp

**Option A: Pairing Code (Recommended)**
```
📱 PAIRING CODE METHOD
==================================================
Your Pairing Code: ABC-DEFG-HIJK
==================================================
```
- Open WhatsApp on your phone
- Settings → Linked Devices → Link with Phone Number
- Type the pairing code
- Bot connects instantly ✅

**Option B: QR Code (Fallback)**
- Scan the QR code with your phone's WhatsApp
- Confirm linking
- Bot ready to go 🎊

---

## 💬 How It Works

### Example Conversation

```
Customer: "What's your haircut price?"
Bot: "We offer professional haircuts for KES 500! 💇‍♀️ 
      Pay via M-Pesa: 654321. Want to book? Send your name & preferred time."

Customer: "/menu"
Bot: "📋 *Salon La Mode MENU*
      
      1. Haircut - KES 500
         Professional haircut for all hair types
      
      2. Braids - KES 1,500-3,000
         Box braids, cornrows, or custom styles"
```

---

## 📁 File Structure

```
whatsapp-ai-bot/
├── index.js              # Main bot engine
├── ai.js                 # OpenAI integration
├── business.json         # Your business data
├── package.json          # Dependencies
├── .env.example          # Environment template
├── .env                  # Your credentials (create from .env.example)
├── auth_info_*/          # Auto-created WhatsApp auth (don't touch)
└── README.md             # This file
```

---

## 🛠️ Setup: Buyer Guide

### Get Your Own OpenAI API Key (Takes 2 Minutes)

**Why?** You need your own key to run the bot. Each buyer gets their own account.

**Step 1: Create OpenAI Account**
1. Go to https://platform.openai.com/api-keys
2. Sign up or login
3. Click "Create new secret key"
4. Copy the full key (starts with `sk-...`)

**Step 2: Add to Bot**
1. Open `.env` file in a text editor
2. Find the line: `OPENAI_API_KEY=sk-your-key-here`
3. Replace with your actual key: `OPENAI_API_KEY=sk-abc123xyz...`
4. Save the file

**Step 3: Add $5 Credit (Optional but Recommended)**
1. Go to https://platform.openai.com/account/billing
2. Click "Add payment method"
3. Add a valid debit/credit card
4. Add $5 credit
5. Your bot can now send ~30,000 messages! 🎉

**Pricing:**
- $5 = approximately 30,000 customer messages
- Most small businesses spend $1-2 per month
- Example: 100 customer messages per day = ~$0.30/month

**What if I run out of credits?**
- Bot will show an error when replying
- Customer sees: "Sorry, something went wrong. Please try again."
- Just add more credit and bot works instantly

**Is my key safe?**
- ✅ Keep it in `.env` file only (never share or commit to git)
- ✅ The `.gitignore` file protects your `.env`
- ✅ If leaked, regenerate a new key at platform.openai.com
- ✅ Never put your key in public repos

---

## 🎮 Customization

### Change Bot Personality
Edit `ai.js`, find the system prompt (~line 37):
```javascript
// FROM: "You are a WhatsApp customer service agent"
// TO: "You are a witty, fast-paced sales agent"
```

### Add More Services
Edit `business.json`:
```json
"products": [
  {
    "name": "Deep Conditioning",
    "price": "KES 800",
    "description": "Hair repair treatment"
  }
]
```

### Change Reply Length
Edit `ai.js`, find max_tokens (~line 63):
```javascript
max_tokens: 150  // Increase to 200 for longer replies
```

### Deploy to Cloud (24/7)
- **Railway**: Free tier available
- **Render**: Free tier available
- **AWS/GCP**: Paid options

---

## 🐛 Troubleshooting

### "No Pairing Code or QR Code Appearing?"
**Problem:** Console is blank when I run `npm start`

**Solutions:**
1. Make sure `OWNER_PHONE` is set in `.env`
   ```env
   OWNER_PHONE=+254712345678
   ```

2. Delete the `auth_info_*` folder and restart
   ```bash
   rm -rf auth_info_*
   npm start
   ```

3. Check Node.js version (need 18+)
   ```bash
   node --version
   ```

4. If still failing, use QR code fallback instead

---

### "INSUFFICIENT_QUOTA" Error

**Problem:** Bot replies "Sorry, something went wrong"

**Cause:** OpenAI account has no credits

**Solution:**
1. Go to https://platform.openai.com/account/billing
2. Check your usage and balance
3. Add $5+ credit
4. Bot will work again instantly

---

### "API Key Error" or "Invalid API Key"

**Problem:** "OPENAI_API_KEY is not set"

**Solution:**
1. Check `.env` file exists in root folder
2. Verify the line exists: `OPENAI_API_KEY=sk-...`
3. Make sure there are NO spaces around the `=`
   ```env
   ✅ OPENAI_API_KEY=sk-abc123
   ❌ OPENAI_API_KEY = sk-abc123
   ❌ OPENAI_API_KEY= sk-abc123
   ```
4. Save and restart: `npm start`

---

### "WhatsApp Says Device Not Recognized"

**Problem:** WhatsApp shows error when linking

**Solution:**
1. Delete `auth_info_*` folder
   ```bash
   rm -rf auth_info_*
   ```
2. Restart bot: `npm start`
3. Use pairing code or rescan QR code within 30 seconds
4. Don't use WhatsApp on web/desktop during linking

---

### Bot Connected but Not Replying to Messages

**Problem:** I send messages but bot doesn't respond

**Checklist:**
1. ✅ Check bot says "✅ Bot connected successfully!"
2. ✅ Try `/menu` command first (to test the bot works)
3. ✅ Check console for error messages
4. ✅ Verify `business.json` is valid JSON (use jsonlint.com)
5. ✅ Check OpenAI account has credits
6. ✅ Verify internet connection

---

### Messages Sending Very Slowly

**Problem:** Bot takes 5+ seconds to reply

**Causes:**
- OpenAI API is slow (normal during peak hours)
- Weak internet connection
- Your computer is low on RAM

**Solutions:**
- Wait 5-10 seconds (it's processing with AI)
- Check your internet speed
- Close other applications

---

### "ENOENT: no such file" Error

**Problem:** `business.json` not found

**Solution:**
- Make sure `business.json` is in the root folder
- Check the filename is exactly: `business.json` (lowercase)
- Verify it's not in a subfolder

---

## 💰 Costs Breakdown

### OpenAI GPT-4o-mini Pricing
- **Input:** $0.00015 per 1K tokens
- **Output:** $0.0006 per 1K tokens
- **Real-world:** ~$0.01 per customer message
- **Monthly estimate:** 100 messages/day = $30/month (rough)

### WhatsApp Cost
- **Free** to use WhatsApp
- **Note:** This uses personal WhatsApp, not Business API
- Bot will eventually get flagged if sending 1000+ messages/day

---

## 📚 Technology Stack

- **Node.js 18+** - JavaScript runtime
- **@whiskeysockets/baileys** - WhatsApp client library
- **OpenAI API** - GPT-4o-mini AI model
- **dotenv** - Environment variables
- **ES Modules** - Modern JavaScript imports

---

## 🔒 Security & Privacy

- **API Key Protection:** Never commit `.env` to git (protected by `.gitignore`)
- **WhatsApp Auth:** Session tokens stored locally in `auth_info_*` folder
- **Data:** Business info stored in `business.json` (local file only)
- **No Cloud Backup:** All data stays on your computer (unless you deploy)
- **Regenerate Keys:** If API key is leaked, create a new one at OpenAI

---

## 📊 Example: Complete Setup for a Salon

### 1. `.env` File
```env
OPENAI_API_KEY=sk-proj-abc123xyz...
SESSION_ID=salon-la-mode
OWNER_PHONE=+254712345678
PORT=3000
```

### 2. `business.json` File
```json
{
  "BUSINESS_NAME": "Salon La Mode",
  "OWNER_NAME": "Grace",
  "PHONE": "+254712345678",
  "MPESA_TILL": "654321",
  "BUSINESS_DETAILS": "Premium salon offering haircuts, braids, treatments, and beauty consultations",
  "LOCATION": "Westlands, Nairobi",
  "HOURS": "Mon-Sat: 9AM-6PM | Sun: 10AM-4PM",
  "products": [
    {
      "name": "Haircut",
      "price": "KES 500",
      "description": "Professional haircut for all hair types"
    },
    {
      "name": "Braids",
      "price": "KES 1,500-3,000",
      "description": "Box braids, cornrows, or custom styles"
    },
    {
      "name": "Hair Treatment",
      "price": "KES 800",
      "description": "Deep conditioning and repair treatment"
    },
    {
      "name": "Makeup",
      "price": "KES 1,200",
      "description": "Professional makeup for events"
    }
  ]
}
```

### 3. Start Bot
```bash
npm start
```

### 4. Result
Bot now:
- ✅ Replies to price questions automatically
- ✅ Sends menu when customer types `/menu`
- ✅ Captures booking inquiries with name + phone + time
- ✅ Includes M-Pesa payment info in every reply
- ✅ Runs 24/7 without your intervention

---

## 🎯 Next Steps

1. ✅ Run `npm install`
2. ✅ Get OpenAI API key
3. ✅ Edit `.env` with your credentials
4. ✅ Edit `business.json` with your business info
5. ✅ Run `npm start`
6. ✅ Link WhatsApp using pairing code or QR
7. ✅ Test with `/menu` command
8. ✅ Start getting customer messages! 🎊

---

## 📞 Support & Resources

- **OpenAI Docs:** https://platform.openai.com/docs
- **Baileys Library:** https://github.com/WhiskeySockets/Baileys
- **Node.js Guide:** https://nodejs.org/

---

## ⚠️ Important Notes

- **Commercial Use:** ✅ Allowed - Use this bot for your business
- **Reselling:** ❌ **Do NOT resell this source code as-is** - You must add significant value and customization
- **Modifications:** ✅ Allowed - Customize the code for your needs
- **Attribution:** Not required but appreciated

---

## 📄 License

MIT License with commercial use restrictions. See LICENSE file for details.

---

**Ready to automate your WhatsApp customer service? Start now! 🚀**

Built with ❤️ using Node.js, OpenAI, and Baileys
