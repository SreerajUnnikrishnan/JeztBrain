import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: 'server/.env' });

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

console.log("URL:", supabaseUrl);
console.log("KEY LENGTH:", supabaseServiceRoleKey ? supabaseServiceRoleKey.length : 0);

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function test() {
  // Try to get a user with a dummy token just to see the error type
  const { data, error } = await supabaseAdmin.auth.getUser("dummy_token");
  console.log("Error:", error);
}

test();
