import { createClient } from '@supabase/supabase-js';

const supabase = createClient("https://tkqidkmrlsrglhlfcwvz.supabase.co", "sb_publishable_A9CCRqbEFlddPEagCvXimg_Q_sqXOza");

async function checkSchema() {
  const { data, error } = await supabase.from('notifications').insert([{ title: 'Test', message: 'Test' }]).select();
  if (error) {
    console.error('Insert Error:', error.message);
  } else {
    console.log('Insert Success. Columns:', Object.keys(data[0]));
  }
}

checkSchema();
