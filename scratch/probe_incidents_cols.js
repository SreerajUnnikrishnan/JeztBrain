import { createClient } from '@supabase/supabase-js';

const supabase = createClient("https://tkqidkmrlsrglhlfcwvz.supabase.co", "sb_publishable_A9CCRqbEFlddPEagCvXimg_Q_sqXOza");

async function probeIncidents() {
  console.log('Probing incidents table columns...');
  const cols = [
    'id', 'user_id', 'expert_id', 'incidenttype', 'severitylevel', 
    'description', 'affectedsystems', 'ticket_number', 'status', 
    'created_at', 'updated_at'
  ];
  
  for (const col of cols) {
    const { error: colErr } = await supabase.from('incidents').select(col).limit(1);
    if (!colErr) console.log(`Column ${col}: EXISTS`);
    else console.log(`Column ${col}: MISSING (${colErr.message})`);
  }
}

probeIncidents();
