import { createClient } from '@supabase/supabase-js';
const supabase = createClient("https://tkqidkmrlsrglhlfcwvz.supabase.co", "sb_publishable_A9CCRqbEFlddPEagCvXimg_Q_sqXOza");

async function listUsers() {
  const { data: profiles, error } = await supabase
    .from('profiles')
    .select('id, email, role')
    .limit(10);

  if (error) {
    console.error('Error fetching profiles:', error.message);
    return;
  }

  console.log('Profiles:');
  profiles.forEach(p => {
    console.log(`- ${p.email} (${p.role}) [ID: ${p.id}]`);
  });
}

listUsers();
