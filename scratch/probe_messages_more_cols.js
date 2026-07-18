import { createClient } from '@supabase/supabase-js';

const supabase = createClient("https://tkqidkmrlsrglhlfcwvz.supabase.co", "sb_publishable_A9CCRqbEFlddPEagCvXimg_Q_sqXOza");

async function probe() {
  const cols = ['createdat', 'sentat', 'time_sent', 'timestamp'];
  for (const col of cols) {
    const { error } = await supabase.from('messages').select(col).limit(1);
    if (!error) console.log(`Column ${col}: EXISTS`);
    else console.log(`Column ${col}: MISSING`);
  }
}

probe();
