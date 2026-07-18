import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = "sb_publishable_A9CCRqbEFlddPEagCvXimg_Q_sqXOza";

async function test() {
  const authClient = createClient(supabaseUrl, supabaseAnonKey);
  const { data: authData, error: authError } = await authClient.auth.signInWithPassword({
    email: 'testuser5@jeztbrain.com',
    password: 'password123'
  });

  if (authError) {
    console.log("Auth Error:", authError);
    return;
  }

  const token = authData.session.access_token;
  console.log("Got real token");

  // Verify token using authClient.auth.getUser()
  const { data, error } = await authClient.auth.getUser(token);
  console.log("getUser Error:", error);
  console.log("getUser Data (user.id):", data?.user?.id);
}

test();
