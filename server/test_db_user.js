import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = "sb_publishable_A9CCRqbEFlddPEagCvXimg_Q_sqXOza";

async function test() {
  // First login to get a real user token
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
  console.log("Got token for user:", authData.user.id);

  // Now create a client like the backend could, using the user's token
  const userClient = createClient(supabaseUrl, supabaseAnonKey, {
    global: {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  });

  // Try to query incidents
  const { data, error } = await userClient.from('incidents').select('*').limit(1);
  console.log("Query Error:", error);
  console.log("Query Data:", data);
}

test();
