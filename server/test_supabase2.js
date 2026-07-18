import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = "sb_publishable_A9CCRqbEFlddPEagCvXimg_Q_sqXOza";

console.log("URL:", supabaseUrl);
console.log("KEY LENGTH:", supabaseAnonKey.length);

const supabaseAdmin = createClient(supabaseUrl, supabaseAnonKey, {
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
