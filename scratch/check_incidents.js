import { createClient } from '@supabase/supabase-js';

const supabase = createClient("https://tkqidkmrlsrglhlfcwvz.supabase.co", "sb_publishable_A9CCRqbEFlddPEagCvXimg_Q_sqXOza");

async function checkIncidents() {
  const { data, error } = await supabase.from('incidents').select('*').limit(1);
  if (error) {
    console.error('Error:', error.message);
  } else if (data.length > 0) {
    console.log('Columns:', Object.keys(data[0]));
    console.log('First row:', data[0]);
  } else {
    console.log('No incidents found.');
  }
}

checkIncidents();
