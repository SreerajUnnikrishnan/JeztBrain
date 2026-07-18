import { createClient } from '@supabase/supabase-js';

const supabase = createClient("https://tkqidkmrlsrglhlfcwvz.supabase.co", "sb_publishable_A9CCRqbEFlddPEagCvXimg_Q_sqXOza");

async function probe() {
  // Try to select a non-existent column to see if the error message is helpful
  const { error } = await supabase.from('messages').select('this_column_definitely_does_not_exist').limit(1);
  console.log('Error message:', error?.message);
}

probe();
