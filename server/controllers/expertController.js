import { supabaseAdmin, getSupabaseClient } from '../config/supabase.js';

const getToken = (req) => req.headers.authorization?.split(' ')[1];

/**
 * Update expert profile
 */
export const updateExpertProfile = async (req, res) => {
  const userId = req.user.id;
  const { certifications, skills, experience, bio } = req.body;

  try {
    const token = getToken(req);
    const client = getSupabaseClient(token);
    const { data, error } = await client
      .from('profiles')
      .update({
        certifications,
        skills,
        experience,
        bio,
        updated_at: new Date().toISOString()
      })
      .eq('id', userId)
      .select()
      .single();

    if (error) throw error;

    res.json({ success: true, profile: data });
  } catch (err) {
    console.error('[ExpertController] Update Error:', err.message);
    res.status(500).json({ error: 'DATABASE_ERROR' });
  }
};

/**
 * Set availability status
 */
export const setAvailability = async (req, res) => {
  const userId = req.user.id;
  const { status } = req.body; // 'online', 'busy', 'offline'

  if (!['online', 'busy', 'offline'].includes(status)) {
    return res.status(400).json({ error: 'INVALID_STATUS' });
  }

  try {
    const token = getToken(req);
    const client = getSupabaseClient(token);
    const { data, error } = await client
      .from('profiles')
      .update({ availability: status })
      .eq('id', userId)
      .select()
      .single();

    if (error) throw error;

    res.json({ success: true, status: data.availability });
  } catch (err) {
    console.error('[ExpertController] Availability Error:', err.message);
    res.status(500).json({ error: 'DATABASE_ERROR' });
  }
};

/**
 * Get expert metrics
 */
export const getExpertMetrics = async (req, res) => {
  const userId = req.user.id;

  try {
    const token = getToken(req);
    const client = getSupabaseClient(token);
    // Fetch assigned incidents count
    const { count: assignedCount } = await client
      .from('incidents')
      .select('*', { count: 'exact', head: true })
      .eq('expert_id', userId);

    // Fetch resolved incidents count
    const { count: resolvedCount } = await client
      .from('incidents')
      .select('*', { count: 'exact', head: true })
      .eq('expert_id', userId)
      .eq('status', 'resolved');

    res.json({
      success: true,
      metrics: {
        activeCases: assignedCount - resolvedCount,
        resolvedCases: resolvedCount,
        trustScore: 98, // Mocked for now
        responseTime: '< 15m'
      }
    });
  } catch (err) {
    console.error('[ExpertController] Metrics Error:', err.message);
    res.status(500).json({ error: 'DATABASE_ERROR' });
  }
};
