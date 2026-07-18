import { createClient } from '@supabase/supabase-js';

const supabase = createClient("https://tkqidkmrlsrglhlfcwvz.supabase.co", "sb_publishable_A9CCRqbEFlddPEagCvXimg_Q_sqXOza");

async function probeMessages() {
  console.log('Probing messages table columns...');
  const cols = [
    'id', 'chatid', 'incident_id', 'incidentid', 
    'message', 'text', 'content',
    'sender_id', 'senderid', 
    'sender_role', 'senderrole',
    'receiver_id', 'receiverid',
    'sender_name', 'sendername',
    'created_at', 'updated_at'
  ];
  
  for (const col of cols) {
    const { error: colErr } = await supabase.from('messages').select(col).limit(1);
    if (colErr) {
      if (colErr.message.includes('column') && colErr.message.includes('does not exist')) {
        console.log(`Column ${col}: MISSING`);
      } else {
        console.log(`Column ${col}: ERROR (${colErr.message})`);
      }
    } else {
      console.log(`Column ${col}: EXISTS`);
    }
  }
}

probeMessages();
