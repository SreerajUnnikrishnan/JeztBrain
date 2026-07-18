import { createClient } from '@supabase/supabase-js';

const supabase = createClient("https://tkqidkmrlsrglhlfcwvz.supabase.co", "sb_publishable_A9CCRqbEFlddPEagCvXimg_Q_sqXOza");

async function probeIncidents() {
  const testData = {
    user_id: '00000000-0000-0000-0000-000000000000',
    incidenttype: 'Probe',
    severitylevel: 'low',
    description: 'Probe',
    affectedsystems: 'Probe',
    status: 'open',
    ticket_number: 'PROBE-001'
  };

  const { error } = await supabase.from('incidents').insert([testData]);
  if (error) {
    console.log('Insert failed:', error.message);
    // Try to guess columns
    const cols = ['user_id', 'userid', 'incident_type', 'type', 'severity_level', 'severity', 'description', 'affected_systems', 'systems', 'status', 'ticket_number', 'ticket'];
    for (const col of cols) {
        const { error: colErr } = await supabase.from('incidents').select(col).limit(1);
        if (colErr) {
            console.log(`Column ${col}: MISSING`);
        } else {
            console.log(`Column ${col}: EXISTS`);
        }
    }
  } else {
    console.log('Insert successful!');
    const { data } = await supabase.from('incidents').select('*').limit(1);
    console.log('Columns:', Object.keys(data[0]));
  }
}

probeIncidents();
