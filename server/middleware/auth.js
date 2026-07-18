import { createClient } from '@supabase/supabase-js';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// Use the valid anon key to verify user tokens - this works as proven by test_supabase3.js
const SUPABASE_URL = (process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || '').trim();
const ANON_KEY = 'sb_publishable_A9CCRqbEFlddPEagCvXimg_Q_sqXOza';

// Anon client used solely for token verification — getUser(token) works with anon key
const authVerifier = createClient(SUPABASE_URL, ANON_KEY, {
  auth: { autoRefreshToken: false, persistSession: false }
});

/**
 * Decode a JWT payload without verification (base64 decode only).
 * We trust the token is valid Supabase-signed JWT since we verify via getUser below.
 */
function decodeJwtPayload(token) {
  try {
    const base64Payload = token.split('.')[1];
    const payload = Buffer.from(base64Payload, 'base64url').toString('utf8');
    return JSON.parse(payload);
  } catch {
    return null;
  }
}

/**
 * Middleware to verify Supabase JWT.
 * Strategy: decode payload directly (ES256 tokens can't be verified with symmetric secret),
 * then call authVerifier.auth.getUser(token) which works with the anon key.
 */
export const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'AUTHENTICATION_REQUIRED', message: 'No bearer token provided.' });
  }

  const token = authHeader.split(' ')[1];

  // Fast-path: decode payload to get user id without a network call
  const decoded = decodeJwtPayload(token);
  if (!decoded?.sub) {
    return res.status(401).json({ error: 'INVALID_TOKEN', message: 'Malformed JWT.' });
  }

  // Check expiry locally before making network call
  if (decoded.exp && decoded.exp * 1000 < Date.now()) {
    return res.status(401).json({ error: 'TOKEN_EXPIRED', message: 'Access token has expired.' });
  }

  try {
    // Verify authenticity via Supabase — anon key client can call getUser(token)
    const { data: { user }, error } = await authVerifier.auth.getUser(token);

    if (error || !user) {
      console.warn('[AuthMiddleware] Verification Failed:', error?.message);
      return res.status(401).json({ error: 'INVALID_TOKEN', message: error?.message || 'User not found.' });
    }

    // Attach full user object to request
    req.user = user;
    next();
  } catch (err) {
    console.error('[AuthMiddleware] Error:', err.message);
    res.status(500).json({ error: 'AUTH_SERVICE_ERROR', message: 'Internal authentication failure.' });
  }
};

/**
 * Middleware to restrict access to expert/specialist roles.
 */
export const authorizeExpert = async (req, res, next) => {
  const SPECIALIST_ROLES = ['security_specialist', 'network_specialist', 'admin', 'expert'];

  // Check user_metadata first (set at registration)
  let userRole = req.user.user_metadata?.role || req.user.role;

  if (!SPECIALIST_ROLES.includes(userRole)) {
    // Fallback: check profiles table using user's own token (respects RLS)
    try {
      const userClient = createClient(SUPABASE_URL, ANON_KEY, {
        global: { headers: { Authorization: `Bearer ${req.headers.authorization?.split(' ')[1]}` } }
      });
      const { data } = await userClient.from('profiles').select('role').eq('id', req.user.id).maybeSingle();
      if (data?.role) userRole = data.role;
    } catch (err) {
      // Ignore database retrieval errors, fall back to default metadata role checks
    }
  }

  if (!SPECIALIST_ROLES.includes(userRole)) {
    return res.status(403).json({ error: 'ACCESS_DENIED', message: 'Specialist credentials required.' });
  }

  req.user.role = userRole;
  next();
};
