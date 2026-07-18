import { createClient } from '@supabase/supabase-js';

const supabase = createClient("https://tkqidkmrlsrglhlfcwvz.supabase.co", "sb_publishable_A9CCRqbEFlddPEagCvXimg_Q_sqXOza");

async function testInsert() {
  console.log('Testing insert into messages...');
  const { data, error } = await supabase.from('messages').insert([{
    chatid: '00000000-0000-0000-0000-000000000000',
    text: 'test',
    senderid: '00000000-0000-0000-0000-000000000000',
    senderrole: 'user',
    sendername: 'tester'
  }]).select();
  
  if (error) {
    console.error('Insert Error:', error);
  } else {
    console.log('Insert Success:', data);
  }
}

testInsert();
