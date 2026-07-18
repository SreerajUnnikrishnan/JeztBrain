import { createClient } from '@supabase/supabase-js';

const supabase = createClient("https://tkqidkmrlsrglhlfcwvz.supabase.co", "sb_publishable_A9CCRqbEFlddPEagCvXimg_Q_sqXOza");

async function checkSchema() {
  // Use a query that shouldn't fail if the table exists
  const { data, error } = await supabase.from('notifications').select('*').limit(1);
  
  if (error) {
    console.error('Fetch Error:', error.message);
  } else {
    // If it's empty, we still don't know columns. 
    // Let's try to get schema info via postgrest if possible (usually not allowed for anon)
    // So let's just try common column names
    console.log('Fetch success (rows: ' + data.length + ')');
    if (data.length > 0) {
      console.log('Columns found:', Object.keys(data[0]));
    } else {
      console.log('Table empty. Trying to guess by inserting with specific columns...');
      const cols = ['expert_id', 'user_id', 'userid', 'title', 'message', 'read', 'is_read', 'created_at'];
      for (const col of cols) {
        const { error: colErr } = await supabase.from('notifications').select(col).limit(1);
        if (colErr) {
          console.log(`Column ${col}: MISSING (${colErr.message})`);
        } else {
          console.log(`Column ${col}: EXISTS`);
        }
      }
    }
  }
}

checkSchema();
