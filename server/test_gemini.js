import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function testGemini() {
  console.log('Testing Gemini gemini-2.0-flash...');
  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
  const result = await model.generateContent(
    'You are a SOC AI. Say "JeztBrain SOC AI is ONLINE and operational." in exactly those words.'
  );
  return result.response.text().trim();
}

testGemini()
  .then(r => {
    console.log('✅ GEMINI LIVE:', r);
    console.log('\n🟢 Gemini fallback is confirmed working. Chat is operational.');
  })
  .catch(err => {
    console.error('❌ Gemini:', err.message.substring(0, 200));
  });
