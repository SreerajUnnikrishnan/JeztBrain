import { createClient } from '@supabase/supabase-js';

const supabase = createClient("https://tkqidkmrlsrglhlfcwvz.supabase.co", "sb_publishable_A9CCRqbEFlddPEagCvXimg_Q_sqXOza");

async function checkSpecificColumns() {
  const cols = ['incidenttype', 'severitylevel', 'affectedsystems'];
  for (const col of cols) {
    const { error } = await supabase.from('incidents').select(col).limit(1);
    if (error) {
      console.log(`Column ${col}: MISSING (${error.message})`);
    } else {
      console.log(`Column ${col}: EXISTS`);
    }
  }
}

checkSpecificColumns();
