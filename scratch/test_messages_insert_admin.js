import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '../server/.env') });

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function testInsert() {
  console.log('Testing insert into messages (as Admin)...');
  const { data, error } = await supabase.from('messages').insert([{
    chatid: '00000000-0000-0000-0000-000000000000',
    text: 'test_admin',
    senderid: '00000000-0000-0000-0000-000000000000',
    senderrole: 'user',
    sendername: 'tester'
  }]).select();
  
  if (error) {
    console.error('Insert Error:', error);
  } else {
    console.log('Insert Success:', data[0]);
    console.log('All Columns:', Object.keys(data[0]));
  }
}

testInsert();
