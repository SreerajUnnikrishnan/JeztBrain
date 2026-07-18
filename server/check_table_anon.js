import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const anonKey = "sb_publishable_A9CCRqbEFlddPEagCvXimg_Q_sqXOza";

async function checkTable() {
  const supabase = createClient(supabaseUrl, anonKey);
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
