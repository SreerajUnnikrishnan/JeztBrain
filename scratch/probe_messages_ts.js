import { createClient } from '@supabase/supabase-js';

const supabase = createClient("https://tkqidkmrlsrglhlfcwvz.supabase.co", "sb_publishable_A9CCRqbEFlddPEagCvXimg_Q_sqXOza");

async function probeMessages() {
  console.log('Fetching one row from messages...');
  const { data, error } = await supabase.from('messages').select('*').limit(1);
  if (error) {
    console.error('Fetch Error:', error.message);
  } else if (data && data.length > 0) {
    console.log('Actual Columns:', Object.keys(data[0]));
  } else {
    console.log('No rows in messages table.');
  }

  console.log('Probing potential timestamp columns...');
  const tsCols = ['created_at', 'inserted_at', 'timestamp', 'time', 'ts', 'date'];
  for (const col of tsCols) {
    const { error: colErr } = await supabase.from('messages').select(col).limit(1);
    if (!colErr) console.log(`Column ${col}: EXISTS`);
    else console.log(`Column ${col}: MISSING (${colErr.message})`);
  }
}

probeMessages();
