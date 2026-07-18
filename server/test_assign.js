import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = "sb_publishable_A9CCRqbEFlddPEagCvXimg_Q_sqXOza";

async function test() {
  const authClient = createClient(supabaseUrl, supabaseAnonKey);
  const { data: authData, error: authError } = await authClient.auth.signInWithPassword({
    email: 'expertuser1@jeztbrain.com', // Using the expert I created in step 2
    password: 'password123'
  });

  if (authError) return console.log("Auth Error:", authError);
  
  const token = authData.session.access_token;
  const expertClient = createClient(supabaseUrl, supabaseAnonKey, {
    global: { headers: { Authorization: `Bearer ${token}` } }
  });

  const { data, error } = await expertClient.from('incidents')
    .update({ expert_id: authData.user.id, status: 'assigned' })
    .eq('id', 'edc29887-4674-44fb-a820-6cac2ea0a278') // the inserted ID
    .select().single();

  console.log("Update Error:", error);
  console.log("Updated ID:", data?.id);
}

test();
