// Test using direct HTTP call to verify Gemini key without SDK
import https from 'https';
import dotenv from 'dotenv';
dotenv.config();

const GEMINI_KEY = process.env.GEMINI_API_KEY;

function httpsGet(url) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try { resolve({ status: res.statusCode, body: JSON.parse(data) }); }
        catch { resolve({ status: res.statusCode, body: data }); }
      });
    });
    req.on('error', reject);
    req.setTimeout(10000, () => { req.destroy(); reject(new Error('TIMEOUT')); });
  });
}

async function listModels() {
  console.log('Listing available Gemini models...');
  const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${GEMINI_KEY}`;
  const result = await httpsGet(url);
  
  if (result.status !== 200) {
    console.error('❌ Failed to list models:', result.status, JSON.stringify(result.body).substring(0, 200));
    return;
  }

  const models = result.body.models || [];
  const chatModels = models.filter(m => 
    m.supportedGenerationMethods?.includes('generateContent')
  );
  
  console.log(`\n✅ Gemini key is VALID — ${models.length} models available`);
  console.log(`\n📋 Models supporting generateContent:`);
  chatModels.forEach(m => console.log(`  - ${m.name}`));
}

listModels();
