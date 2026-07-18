import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envPath = path.resolve(__dirname, '../.env');
if (!fs.existsSync(envPath)) { console.log('no env file'); process.exit(1); }
const envFile = fs.readFileSync(envPath, 'utf8');
const env = {};
envFile.split('\n').forEach(line => {
  const match = line.match(/^([^=]+)=(.*)$/);
  if (match) env[match[1]] = match[2].trim().replace(/['"]/g, '');
});

const supabase = createClient(env.VITE_SUPABASE_URL, env.VITE_SUPABASE_ANON_KEY);
async function run() {
  const { data, error } = await supabase.from('incidents').insert([{
    user_id: '123e4567-e89b-12d3-a456-426614174000', // Dummy UUID
    incidenttype: 'phishing',
    severitylevel: 'high',
    description: 'test',
    affectedsystems: 'test',
    ticket_number: 'INC-1234',
    room_id: 'room_123',
    status: 'pending'
  }]).select();
  console.log('Incidents Result:', data);
  console.log('Incidents Error:', error);
}
run();
