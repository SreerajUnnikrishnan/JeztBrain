import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import axios from 'axios';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envPath = path.resolve(__dirname, '../.env');
const envFile = fs.readFileSync(envPath, 'utf8');
const env = {};
envFile.split('\n').forEach(line => {
  const match = line.match(/^([^=]+)=(.*)$/);
  if (match) env[match[1]] = match[2].trim().replace(/['"]/g, '');
});

const supabase = createClient(env.VITE_SUPABASE_URL, env.VITE_SUPABASE_ANON_KEY);
async function run() {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: 'expert@jeztbrain.com',
      password: 'password123'
    });
    if (error) throw error;
    
    const res = await axios.get('http://localhost:5000/api/incidents?status=pending', {
      headers: { Authorization: 'Bearer ' + data.session.access_token }
    });
    console.log('Queue Success:', res.data);
  } catch (err) {
    console.log('Error details:', err.response ? err.response.data : err.message);
  }
}
run();
