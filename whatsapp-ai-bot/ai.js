import { readFileSync } from 'fs';
import OpenAI from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Load business data from JSON
function loadBusinessData() {
  const data = readFileSync('./business.json', 'utf-8');
  return JSON.parse(data);
}

/**
 * Generate an AI response for a WhatsApp customer message
 * @param {string} userMessage - The customer's message
 * @returns {Promise<string>} - The AI bot's reply
 */
export async function getAIReply(userMessage) {
  try {
    // Load business data
    const business = loadBusinessData();

    // Format products list for context
    const productsList = business.products
      .map((p) => `• ${p.name}: ${p.price} - ${p.description}`)
      .join('\n');

    // Build system prompt
    const systemPrompt = `You are a WhatsApp customer service agent for ${business.BUSINESS_NAME}, owned by ${business.OWNER_NAME}.

BUSINESS INFORMATION:
- Business: ${business.BUSINESS_NAME}
- Location: ${business.LOCATION}
- Hours: ${business.HOURS}
- Phone: ${business.PHONE}
- M-Pesa Till: ${business.MPESA_TILL}
- Details: ${business.BUSINESS_DETAILS}

SERVICES & PRICES:
${productsList}

IMPORTANT RULES:
1. Keep replies to 2-3 SHORT sentences max (WhatsApp style, not essays)
2. Be friendly, professional, and helpful
3. Use minimal emojis (max 1-2 per message)
4. If customer asks about PRICES, always include "M-Pesa: ${business.MPESA_TILL}"
5. If customer wants to ORDER or BOOK a service, ask for: Name, Phone Number, and Preferred Location/Time
6. If asked about HOURS/LOCATION, provide that info directly
7. If customer asks something you don't know, respond with: "Let me connect you to ${business.OWNER_NAME}. What's your phone number?"
8. For FAQ questions (hours, location, booking, payment), answer directly from the context above
9. NEVER make up prices or services not listed above
10. Keep it conversational and natural, like texting with a friend

RESPOND ONLY WITH THE MESSAGE TEXT, NO EXPLANATIONS.`;

    // Call OpenAI API
    const message = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: systemPrompt,
        },
        {
          role: 'user',
          content: userMessage,
        },
      ],
      max_tokens: 150,
      temperature: 0.7,
    });

    // Extract and return the reply
    const reply = message.choices[0]?.message?.content?.trim();

    if (!reply) {
      throw new Error('Empty response from OpenAI');
    }

    return reply;
  } catch (error) {
    console.error('❌ AI Error:', error.message);
    // Fallback response if AI fails
    return "Sorry, I couldn't process that right now. Let me connect you to our team. Please call +254712345678 or send your details.";
  }
}

/**
 * Generate a formatted menu from products
 * @returns {string} - Formatted menu text
 */
export function getMenuReply() {
  const business = loadBusinessData();
  const menuText = business.products
    .map((p, i) => `${i + 1}. ${p.name}\n   Price: ${p.price}\n   ${p.description}`)
    .join('\n\n');

  return `📋 *${business.BUSINESS_NAME} MENU*\n\n${menuText}\n\n💳 Payment: M-Pesa Till ${business.MPESA_TILL}\n📞 Questions? Reply or call ${business.PHONE}`;
}
