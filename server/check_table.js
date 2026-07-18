import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkTable() {
  const { data, error } = await supabase.from('ai_messages').select('*').limit(1);
  if (error) {
    if (error.message.includes('does not exist')) {
      console.log('TABLE_MISSING');
    } else {
      console.log('ERROR:', error.message);
    }
  } else {
    console.log('TABLE_EXISTS');
  }
}

checkTable();
