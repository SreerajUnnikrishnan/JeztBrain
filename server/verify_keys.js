import OpenAI from 'openai';
import { GoogleGenerativeAI } from '@google/generative-ai';
import Groq from 'groq-sdk';
import dotenv from 'dotenv';
dotenv.config();

const GROQ_KEY = process.env.GROQ_API_KEY;
const OPENAI_KEY = process.env.OPENAI_API_KEY;
const GEMINI_KEY = process.env.GEMINI_API_KEY;

async function testGroq() {
  console.log('\n--- Testing Groq ---');
  console.log('Key prefix:', GROQ_KEY?.substring(0, 15) + '...');
  try {
    const groq = new Groq({ apiKey: GROQ_KEY });
    const response = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [{ role: 'user', content: 'Reply with exactly: GROQ_CONNECTED' }],
      max_tokens: 10,
    });
    const reply = response.choices[0].message.content.trim();
    console.log('✅ Groq Response:', reply);
    console.log('✅ Model: llama-3.3-70b-versatile');
    return true;
  } catch (err) {
    console.error('❌ Groq FAILED:', err.message);
    return false;
  }
}

async function testOpenAI() {
  console.log('\n--- Testing OpenAI ---');
  console.log('Key prefix:', OPENAI_KEY?.substring(0, 15) + '...');
  try {
    const openai = new OpenAI({ apiKey: OPENAI_KEY });
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: 'Reply with exactly: OPENAI_CONNECTED' }],
      max_tokens: 10,
    });
    const reply = response.choices[0].message.content.trim();
    console.log('✅ OpenAI Response:', reply);
    console.log('✅ Model:', response.model);
    return true;
  } catch (err) {
    if (err.status === 429) {
      console.error('❌ OpenAI QUOTA EXCEEDED — Billing not set up or free tier exhausted.');
      console.error('   → Fix: https://platform.openai.com/account/billing');
    } else if (err.status === 401) {
      console.error('❌ OpenAI INVALID KEY — Check your API key.');
    } else {
      console.error('❌ OpenAI FAILED:', err.message);
    }
    return false;
  }
}

async function testGemini() {
  console.log('\n--- Testing Gemini ---');
  console.log('Key prefix:', GEMINI_KEY?.substring(0, 15) + '...');
  try {
    const genAI = new GoogleGenerativeAI(GEMINI_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
    const result = await model.generateContent('Reply with exactly: GEMINI_CONNECTED');
    const reply = result.response.text().trim();
    console.log('✅ Gemini Response:', reply);
    console.log('✅ Model: gemini-2.0-flash');
    return true;
  } catch (err) {
    console.error('❌ Gemini FAILED:', err.message);
    return false;
  }
}

async function main() {
  console.log('=== JeztBrain SOC AI — Key Verification ===');
  const groqOk = await testGroq();
  const openaiOk = await testOpenAI();
  const geminiOk = await testGemini();

  console.log('\n=== FINAL STATUS ===');
  console.log('Groq (Primary):', groqOk ? '✅ LIVE' : '❌ OFFLINE');
  console.log('OpenAI (Secondary):', openaiOk ? '✅ LIVE' : '❌ OFFLINE');
  console.log('Gemini (Tertiary):', geminiOk ? '✅ LIVE' : '❌ OFFLINE');

  if (groqOk) {
    console.log('\n🟢 OPERATIONAL — Groq (Primary) active.');
  } else if (openaiOk) {
    console.log('\n🟡 FALLBACK MODE — OpenAI active. Groq offline.');
  } else if (geminiOk) {
    console.log('\n🟡 FALLBACK MODE — Gemini active. Groq & OpenAI offline.');
  } else {
    console.log('\n🔴 ALL OFFLINE — Chat will use built-in SOC responses.');
  }
}

main();
