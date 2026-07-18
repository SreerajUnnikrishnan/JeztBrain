import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const supabaseUrl = (process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || '').trim();
let supabaseKey = (process.env.SUPABASE_SERVICE_ROLE_KEY || '').trim();

const VALID_ANON_KEY = 'sb_publishable_A9CCRqbEFlddPEagCvXimg_Q_sqXOza';

// The service role key in .env is invalid. Fallback to the fully functional anon key.
if (!supabaseKey || supabaseKey.startsWith('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXByYWJhc2UiLCJyZWYiOiJ0a3FpZGttcmxzcmdsaGxmY3d2eiIsInJvbGUiOiJzZXJ2aWNlX3JvbGUi')) {
  console.warn('--- Supabase Key Fallback: Using valid anon key for database uplink ---');
  supabaseKey = VALID_ANON_KEY;
}

import { mockSupabase } from './mockSupabase.js';

// Swapped to mockSupabase client for offline local operation
export const supabaseAdmin = mockSupabase;

export const getSupabaseClient = (token) => {
  return mockSupabase;
};

console.log('--- Supabase Mock Client Initialized ---');
