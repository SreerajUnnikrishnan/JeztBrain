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

  if (authError) return console.log("Auth Error:", authError);
  
  const token = authData.session.access_token;
  const userClient = createClient(supabaseUrl, supabaseAnonKey, {
    global: { headers: { Authorization: `Bearer ${token}` } }
  });

  const ticketNumber = `INC-TEST-${Math.floor(1000 + Math.random() * 9000)}`;
  const { data, error } = await userClient.from('incidents').insert([{
    user_id: authData.user.id,
    incidenttype: 'malware',
    severitylevel: 'high',
    description: 'Test insert',
    affectedsystems: 'Test Sys',
    ticket_number: ticketNumber,
    status: 'open'
  }]).select().single();

  console.log("Insert Error:", error);
  console.log("Inserted ID:", data?.id);
}

test();
