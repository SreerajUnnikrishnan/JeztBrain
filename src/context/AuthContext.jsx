/**
 * AuthContext.jsx
 * Production-ready Supabase authentication context for JeztBrain.
 * - Role fetched from profiles table (auth.uid = id)
 * - Race-condition safe with cancel flag
 * - 6s safety fallback to prevent infinite loading
 */

import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import Loader from '../components/Layout/Loader';

const AuthContext = createContext();

const VALID_ROLES = ['user', 'security_specialist', 'network_specialist', 'expert', 'admin'];
const SPECIALIST_ROLES = ['security_specialist', 'network_specialist', 'expert'];

export const BACKEND_URL = 'http://localhost:5000';

// ─── Helper: fetch role from profiles ─────────────────────────────────────────
async function fetchRoleFromDB(userId) {
  const { data, error } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', userId)
    .maybeSingle();

  if (error) {
    console.error('[Auth] fetchRole error:', error.message);
    return null;
  }
  return data?.role || null;
}

// ─── Helper: create profile row if missing ────────────────────────────────────
async function createProfileRow(userId, email, role = 'user') {
  const { data, error } = await supabase
    .from('profiles')
    .insert([{ id: userId, email, role }])
    .select('role')
    .maybeSingle();

  if (error) {
    console.warn('[Auth] createProfile error:', error.message);
    return role; // Fall back to intended role even if insert fails
  }
  return data?.role || role;
}

// ─── Helper: update profile role ─────────────────────────────────────────────
async function updateProfileRole(userId, role) {
  await supabase
    .from('profiles')
    .update({ role })
    .eq('id', userId);
}

// ─────────────────────────────────────────────────────────────────────────────
export const AuthProvider = ({ children }) => {
  const [user, setUser]       = useState(null);
  const [role, setRole]       = useState(null);
  const [loading, setLoading] = useState(true);

  // ── Core: resolve a supabase user → set user + role state ──────────────────
  const resolveUser = useCallback(async (supaUser, { signal } = {}) => {
    if (!supaUser) return;

    const isCancelled = () => signal?.aborted;

    try {
      if (!isCancelled()) setLoading(true);

      const displayName =
        supaUser.user_metadata?.displayName ||
        supaUser.user_metadata?.full_name   ||
        supaUser.email.split('@')[0];

      const photoURL =
        supaUser.user_metadata?.avatar_url ||
        supaUser.user_metadata?.photoURL   ||
        null;

      // 1. Try fetching existing role
      let finalRole = await fetchRoleFromDB(supaUser.id);

      if (!finalRole) {
        // 2. Profile doesn't exist → create it with intended role from metadata
        const intendedRole = supaUser.user_metadata?.role;
        const roleToCreate = VALID_ROLES.includes(intendedRole) ? intendedRole : 'user';
        finalRole = await createProfileRow(supaUser.id, supaUser.email, roleToCreate);
      }

      // 3. Validate and normalize the role
      if (!VALID_ROLES.includes(finalRole)) {
        console.warn(`[Auth] Unknown role "${finalRole}", defaulting to "user"`);
        finalRole = 'user';
      }

      if (!isCancelled()) {
        console.log(`[Auth] ✓ Resolved — uid:${supaUser.id} role:${finalRole}`);
        setRole(finalRole);
        setUser({ id: supaUser.id, email: supaUser.email, displayName, photoURL });
      }

      return finalRole;
    } catch (err) {
      console.error('[Auth] resolveUser error:', err.message);
      if (!isCancelled()) {
        setRole('user');
        setUser({
          id: supaUser.id,
          email: supaUser.email,
          displayName: supaUser.email.split('@')[0],
          photoURL: null,
        });
      }
      return 'user';
    } finally {
      if (!isCancelled()) setLoading(false);
    }
  }, []);

  // ── Auth state initialization ───────────────────────────────────────────────
  useEffect(() => {
    const controller = new AbortController();

    // 1. Resolve existing session on mount
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (error) {
        console.error('[Auth] getSession error:', error.message);
        setLoading(false);
        return;
      }
      if (!controller.signal.aborted) {
        if (session?.user) {
          resolveUser(session.user, { signal: controller.signal });
        } else {
          setLoading(false);
        }
      }
    });

    // 2. Listen for subsequent auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log(`[Auth] Event: ${event}`);

        if (event === 'SIGNED_IN') {
          // Only handle if not already resolved via getSession above
          if (!controller.signal.aborted) {
            resolveUser(session.user, { signal: controller.signal });
          }
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
          setRole(null);
          setLoading(false);
        } else if (event === 'TOKEN_REFRESHED' && session?.user) {
          // Re-fetch role silently on token refresh
          const refreshedRole = await fetchRoleFromDB(session.user.id);
          if (refreshedRole && !controller.signal.aborted) {
            setRole(refreshedRole);
          }
        }
      }
    );

    // 3. Safety net — never leave user on infinite loader
    const safetyTimer = setTimeout(() => {
      if (!controller.signal.aborted) {
        console.warn('[Auth] Safety timeout — forcing loading=false');
        setLoading(false);
      }
    }, 6000);

    return () => {
      controller.abort();
      clearTimeout(safetyTimer);
      subscription?.unsubscribe();
    };
  }, [resolveUser]);

  // ── Auth actions ────────────────────────────────────────────────────────────

  /**
   * Login with email + password.
   * Returns { user, role } for immediate redirect use.
   */
  const login = async (email, password) => {
    setLoading(true);
    try {
      const { data: authData, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;

      const finalRole = await resolveUser(authData.user);
      return { user: authData.user, role: finalRole };
    } catch (err) {
      setLoading(false);
      throw err;
    }
  };

  /**
   * Sign up with email + password + role.
   * Writes role to profiles table immediately so login works correctly.
   */
  const signUp = async (email, password, metadata = {}) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: metadata },
      });
      if (error) throw error;

      // If session returned immediately (email confirm disabled), write the profile
      if (data.user) {
        const intendedRole = metadata?.role;
        const validRole = VALID_ROLES.includes(intendedRole) ? intendedRole : 'user';
        await createProfileRow(data.user.id, email, validRole);
      }

      return data;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Update the role of the current user in Supabase and local state.
   * Useful for admin role promotion.
   */
  const updateRole = async (newRole) => {
    if (!user?.id || !VALID_ROLES.includes(newRole)) return;
    await updateProfileRole(user.id, newRole);
    setRole(newRole);
  };

  const loginWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { queryParams: { prompt: 'select_account' } },
    });
    if (error) throw error;
  };

  const logout = async () => {
    setUser(null);
    setRole(null);
    try {
      const { error } = await supabase.auth.signOut();
      if (error && !error.message.includes('session_not_found')) {
        console.error('[Auth] Logout error:', error.message);
      }
    } catch (err) {
      console.error('[Auth] Logout exception:', err.message);
    }
  };

  /**
   * Get current session access token
   */
  const getAccessToken = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    return session?.access_token || null;
  };

  const isSpecialist = SPECIALIST_ROLES.includes(role);

  return (
    <AuthContext.Provider value={{
      user,
      role,
      loading,
      isSpecialist,
      // Actions
      login,
      signUp,
      loginWithGoogle,
      logout,
      updateRole,
      getAccessToken,
      BACKEND_URL,
      // Legacy stubs (kept for backward compat, unikeys table not required)
      isVerified: true,
      verifyUnikey: async () => true,
      generateAndSendUnikey: async () => ({ success: false, error: 'unikeys table not set up' }),
    }}>
      {children}
      <Loader visible={loading} />
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
};
