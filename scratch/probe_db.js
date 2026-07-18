import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function probe() {
  console.log('Probing incidents...');
  const { data: incidents, error: incError } = await supabase.from('incidents').select('*').limit(1);
  if (incError) {
    console.error('Incidents error:', incError);
  } else {
    console.log('Incidents columns:', Object.keys(incidents[0] || {}));
  }

  console.log('Probing messages...');
  const { data: messages, error: msgError } = await supabase.from('messages').select('*').limit(1);
  if (msgError) {
    console.error('Messages error:', msgError);
  } else {
    console.log('Messages columns:', Object.keys(messages[0] || {}));
  }
}

probe();
