import { supabaseAdmin, getSupabaseClient } from '../config/supabase.js';
import { io } from '../index.js';

const getToken = (req) => req.headers.authorization?.split(' ')[1];

/**
 * Report a new incident
 * POST /api/incidents/report
 */
export const reportIncident = async (req, res) => {
  const { incidenttype, severitylevel, description, affectedsystems } = req.body;
  const userId = req.user.id;

  if (!incidenttype || !severitylevel) {
    return res.status(400).json({ error: 'REQUIRED_FIELDS_MISSING', message: 'Incident type and severity are required.' });
  }

  // Generate tactical ticket number: INC-XXXX
  const ticketNumber = `INC-${Math.floor(1000 + Math.random() * 9000)}`;

  try {
    const token = getToken(req);
    const client = getSupabaseClient(token);
    const { data, error } = await client
      .from('incidents')
      .insert([{
        user_id: userId,
        incidenttype,
        severitylevel,
        description,
        affectedsystems,
        ticket_number: ticketNumber,
        status: 'pending'
      }])
      .select()
      .single();

    if (error) throw error;

    // Explicitly emit event from backend as requested by user
    io.emit('incident_created', data);

    // Create Notification object and store in DB for all experts to see
    // Passing the reporter's user_id satisfies the NOT NULL constraint, while
    // the frontend/backend logic treats NEW_INCIDENT as a global alert.
    await client.from('notifications').insert([{
      type: 'NEW_INCIDENT',
      title: 'New Incident Reported',
      message: `${incidenttype} reported. Severity: ${severitylevel}`,
      related_incident_id: data.id,
      user_id: userId
    }]);

    res.status(201).json({
      success: true,
      message: 'TACTICAL_INCIDENT_REPORTED',
      incident: data
    });
  } catch (err) {
    console.error('[IncidentController] Report Error:', err.message);
    res.status(500).json({ error: 'DATABASE_ERROR', message: 'Failed to record incident.' });
  }
};

/**
 * Get incidents for the logged-in user
 * GET /api/incidents/user
 */
export const getUserIncidents = async (req, res) => {
  const userId = req.user.id;

  try {
    const token = getToken(req);
    const client = getSupabaseClient(token);
    const { data, error } = await client
      .from('incidents')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;

    res.json({ success: true, incidents: data });
  } catch (err) {
    console.error('[IncidentController] Fetch User Error:', err.message);
    res.status(500).json({ error: 'DATABASE_ERROR', message: 'Failed to fetch your incidents.' });
  }
};

/**
 * Get incidents assigned to the logged-in expert
 * GET /api/incidents/expert
 */
export const getExpertCases = async (req, res) => {
  const expertId = req.user.id;

  try {
    let { data, error } = await supabaseAdmin
      .from('incidents')
      .select('*')
      .eq('expert_id', expertId)
      .neq('status', 'pending')
      .order('updated_at', { ascending: false });

    if (error) {
      if (error.message?.includes('API key')) {
        const token = getToken(req);
        const client = getSupabaseClient(token);
        const fallback = await client
          .from('incidents')
          .select('*')
          .eq('expert_id', expertId)
          .neq('status', 'pending')
          .order('updated_at', { ascending: false });
        data = fallback.data;
        error = fallback.error;
      }
      if (error) throw error;
    }

    res.json({ success: true, cases: data });
  } catch (err) {
    console.error('[IncidentController] Fetch Expert Cases Error:', err.message);
    res.status(500).json({ error: 'DATABASE_ERROR', message: 'Failed to fetch assigned cases.' });
  }
};

/**
 * Get all open incidents (Expert Queue)
 * GET /api/incidents/queue
 */
export const getExpertQueue = async (req, res) => {
  try {
    const status = req.query.status || 'pending';
    
    // Try with supabaseAdmin to bypass RLS
    let { data, error } = await supabaseAdmin
      .from('incidents')
      .select('*')
      .eq('status', status)
      .order('created_at', { ascending: false });

    if (error) {
      if (error.message?.includes('API key')) {
        console.warn('[IncidentController] supabaseAdmin has an invalid key. Falling back to anon client.');
        const token = getToken(req);
        const client = getSupabaseClient(token);
        const fallback = await client
          .from('incidents')
          .select('*')
          .eq('status', status)
          .order('created_at', { ascending: false });
        data = fallback.data;
        error = fallback.error;
      }
      if (error) throw error;
    }

    res.json({ success: true, queue: data || [] });
  } catch (err) {
    console.error('[IncidentController] Fetch Queue Error:', err.message);
    res.status(500).json({ error: 'DATABASE_ERROR', message: 'Failed to fetch incident queue.' });
  }
};

/**
 * Assign expert to incident
 * POST /api/incidents/assign
 */
export const assignExpert = async (req, res) => {
  const incidentId = req.params.id || req.body.incidentId;
  const expertId = req.user.id;

  if (!incidentId) {
    return res.status(400).json({ error: 'INCIDENT_ID_REQUIRED' });
  }

  try {
    let { data, error } = await supabaseAdmin
      .from('incidents')
      .update({
        expert_id: expertId,
        status: 'accepted',
        updated_at: new Date().toISOString()
      })
      .eq('id', incidentId)
      .eq('status', 'pending') // Ensure it's still open
      .select()
      .single();

    if (error && error.message?.includes('API key')) {
      const token = getToken(req);
      const client = getSupabaseClient(token);
      const fallback = await client
        .from('incidents')
        .update({
          expert_id: expertId,
          status: 'accepted',
          updated_at: new Date().toISOString()
        })
        .eq('id', incidentId)
        .eq('status', 'pending')
        .select()
        .single();
      data = fallback.data;
      error = fallback.error;
    }

    if (error || !data) {
      return res.status(400).json({ error: 'ASSIGNMENT_FAILED', message: 'Incident may already be assigned or does not exist.' });
    }

    // Notify the user and global system via Socket.IO
    io.emit('incident_updated', data);

    // Log Activity
    await supabaseAdmin.from('incident_activity_logs').insert([{
      incident_id: incidentId,
      action: 'assigned',
      description: `Expert assigned to case`,
      actor_id: expertId
    }]);

    res.json({
      success: true,
      message: 'CASE_ASSIGNED_TO_EXPERT',
      incident: data
    });
  } catch (err) {
    console.error('[IncidentController] Assignment Error:', err.message);
    res.status(500).json({ error: 'DATABASE_ERROR', message: 'Failed to assign case.' });
  }
};

/**
 * Update incident status
 * PATCH /api/incidents/:id
 */
export const updateIncidentStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!['open', 'assigned', 'investigating', 'resolved', 'closed'].includes(status)) {
    return res.status(400).json({ error: 'INVALID_STATUS' });
  }

  try {
    let { data, error } = await supabaseAdmin
      .from('incidents')
      .update({
        status,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error && error.message?.includes('API key')) {
      const token = getToken(req);
      const client = getSupabaseClient(token);
      const fallback = await client
        .from('incidents')
        .update({
          status,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single();
      data = fallback.data;
      error = fallback.error;
    }

    if (error) throw error;

    // Notify the user via Socket.IO
    io.to(`user_${data.user_id}`).emit('incident_status_change', data);
    
    // Log Activity
    await supabaseAdmin.from('incident_activity_logs').insert([{
      incident_id: id,
      action: 'status_changed',
      description: `Status changed to ${status}`,
      actor_id: req.user.id
    }]);

    // Automatically credit reward if status is resolved and an expert is assigned
    if (status === 'resolved' && data.expert_id) {
      const calculateReward = (severity) => {
        const sev = (severity || 'medium').toLowerCase();
        if (sev === 'critical') return 35000;
        if (sev === 'high') return 12000;
        if (sev === 'medium') return 3500;
        return 1500;
      };

      const rewardAmt = calculateReward(data.severitylevel);

      try {
        await supabaseAdmin.from('expert_rewards').insert([{
          expert_id: data.expert_id,
          incident_id: data.id,
          reward_amount: rewardAmt,
          reward_type: data.severitylevel || 'medium',
          status: 'credited'
        }]);
        console.log(`[IncidentController] Reward of ₹${rewardAmt} automatically credited to expert ${data.expert_id}`);
      } catch (rewErr) {
        console.warn('[IncidentController] Could not write to expert_rewards (table might not exist):', rewErr.message);
      }
    }

    res.json({ success: true, incident: data });
  } catch (err) {
    console.error('[IncidentController] Status Update Error:', err.message);
    res.status(500).json({ error: 'DATABASE_ERROR', message: 'Failed to update status.' });
  }
};
