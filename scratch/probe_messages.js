import { createClient } from '@supabase/supabase-js';

const supabase = createClient("https://tkqidkmrlsrglhlfcwvz.supabase.co", "sb_publishable_A9CCRqbEFlddPEagCvXimg_Q_sqXOza");

async function probeMessages() {
  const cols = ['id', 'incident_id', 'sender_id', 'receiver_id', 'message', 'created_at', 'senderid', 'text'];
  for (const col of cols) {
    const { error: colErr } = await supabase.from('messages').select(col).limit(1);
    if (colErr) {
      console.log(`Column ${col}: MISSING (${colErr.message})`);
    } else {
      console.log(`Column ${col}: EXISTS`);
    }
  }
}

probeMessages();
