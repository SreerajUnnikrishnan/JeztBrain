import { createClient } from '@supabase/supabase-js';

const supabase = createClient("https://tkqidkmrlsrglhlfcwvz.supabase.co", "sb_publishable_A9CCRqbEFlddPEagCvXimg_Q_sqXOza");

async function probeMessages() {
  // Try common chat table names if 'messages' is empty or doesn't match
  const tables = ['messages', 'chat_messages', 'ai_messages', 'notifications'];
  for (const table of tables) {
    const { data, error } = await supabase.from(table).select('*').limit(1);
    if (!error && data.length > 0) {
      console.log(`Table ${table} exists and has data.`);
      console.log('Columns:', Object.keys(data[0]));
      return;
    }
  }

  // If no data, try to see if 'messages' exists but is empty
  const { error } = await supabase.from('messages').select('id').limit(1);
  if (error) {
    console.log('Table messages does NOT exist or is not accessible:', error.message);
  } else {
    console.log('Table messages exists but is empty.');
    // Check common columns
    const cols = ['chatid', 'chat_id', 'text', 'message', 'senderid', 'sender_id', 'senderrole', 'role', 'sendername', 'name'];
    for (const col of cols) {
        const { error: colErr } = await supabase.from('messages').select(col).limit(1);
        if (!colErr) console.log(`Column ${col}: EXISTS`);
    }
  }
}

probeMessages();
