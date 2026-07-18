import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

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
  const { data, error } = await supabaseAdmin.auth.getUser("dummy_token");
  console.log("Error:", error);
}

test();
