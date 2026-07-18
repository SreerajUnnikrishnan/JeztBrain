import { createClient } from '@supabase/supabase-js';

const supabase = createClient("https://tkqidkmrlsrglhlfcwvz.supabase.co", "sb_publishable_A9CCRqbEFlddPEagCvXimg_Q_sqXOza");

async function probeProfiles() {
  const { data, error } = await supabase.from('expert_profiles').select('*').limit(1);
  if (error) {
    console.error('Fetch Error:', error.message);
  } else if (data && data.length > 0) {
    console.log('expert_profiles Columns:', Object.keys(data[0]));
  } else {
    console.log('expert_profiles table is empty. Probing common columns...');
    const cols = ['id', 'full_name', 'bio', 'avatar_url', 'specialization', 'skills', 'availability', 'updated_at'];
    for (const col of cols) {
      const { error: colErr } = await supabase.from('expert_profiles').select(col).limit(1);
      if (colErr) {
        console.log(`Column ${col}: MISSING (${colErr.message})`);
      } else {
        console.log(`Column ${col}: EXISTS`);
      }
    }
  }
}

probeProfiles();
