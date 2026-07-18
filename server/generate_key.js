import jwt from 'jsonwebtoken';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const secret = process.env.JWT_SECRET;
const payload = {
  "iss": "supabase",
  "ref": "tkqidkmrlsrglhlfcwvz",
  "role": "service_role",
  "iat": Math.floor(Date.now() / 1000),
  "exp": Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 365) // 1 year
};

const token = jwt.sign(payload, secret);
console.log("Generated Service Role Key:", token);

const supabaseAdmin = createClient(process.env.SUPABASE_URL, token, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function test() {
  const { data, error } = await supabaseAdmin.from('profiles').select('*').limit(1);
  console.log("Error:", error);
  console.log("Data:", data);
}

test();
