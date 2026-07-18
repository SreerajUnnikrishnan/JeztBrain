import { supabaseAdmin } from './config/supabase.js';
import dotenv from 'dotenv';
dotenv.config();

console.log('URL:', process.env.SUPABASE_URL);
console.log('KEY LENGTH:', process.env.SUPABASE_SERVICE_ROLE_KEY?.length);

async function probe() {
  console.log('Probing incidents...');
  const { data: incidents, error: incError } = await supabaseAdmin.from('incidents').select('*').limit(1);
  if (incError) {
    console.error('Incidents error:', incError);
  } else {
    console.log('Incidents columns:', Object.keys(incidents[0] || {}));
    console.log('Incidents count:', incidents.length);
  }

  console.log('Probing messages...');
  const { data: messages, error: msgError } = await supabaseAdmin.from('messages').select('*').limit(1);
  if (msgError) {
    console.error('Messages error:', msgError);
  } else {
    console.log('Messages columns:', Object.keys(messages[0] || {}));
    console.log('Messages count:', messages.length);
  }
}

probe();
