import express from 'express';
import rateLimit from 'express-rate-limit';
import { generateIncidentReport, analyzeThreat, getAIChatResponse } from '../services/aiService.js';
import { authenticate, authorizeExpert } from '../middleware/auth.js';

const router = express.Router();

// ── Chat-specific rate limiter: 30 requests per 10 minutes per IP ────────────
const chatRateLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'RATE_LIMIT_EXCEEDED', message: 'Too many requests. Please wait before sending more queries.' },
});

/**
 * POST /api/ai/chat
 * JeztBrain SOC AI Chat — OpenAI primary, Gemini fallback, offline fallback
 */
router.post('/chat', chatRateLimiter, async (req, res) => {
  const { message, history } = req.body;

  if (!message || typeof message !== 'string' || !message.trim()) {
    return res.status(400).json({ error: 'MESSAGE_REQUIRED', message: 'Message cannot be empty.' });
  }

  const sanitizedMessage = message.trim().substring(0, 2000); // prevent oversized payloads

  try {
    // We allow anonymous chat for showcase, protected by IP rate limits
    console.log(`[AIRoute] Chat request received (length: ${sanitizedMessage.length})`);
    const aiResponse = await getAIChatResponse(sanitizedMessage, history || []);
    res.json({ success: true, response: aiResponse });
  } catch (err) {
    console.error('[AIRoute] Chat Error:', err.message);
    res.status(500).json({ error: 'AI_CHAT_FAILED', message: 'AI service temporarily unavailable.' });
  }
});

/**
 * POST /api/ai/generate-report
 * Generate a formal SOC incident report (experts only)
 */
router.post('/generate-report', authenticate, authorizeExpert, async (req, res) => {
  const { incident } = req.body;

  if (!incident) {
    return res.status(400).json({ error: 'INCIDENT_DATA_REQUIRED' });
  }

  try {
    const report = await generateIncidentReport(incident);
    res.json({ success: true, report });
  } catch (err) {
    console.error('[AIRoute] Report Error:', err.message);
    res.status(500).json({ error: 'AI_SERVICE_ERROR', message: err.message });
  }
});

/**
 * POST /api/ai/analyze-threat
 * Analyze a threat indicator or query
 */
router.post('/analyze-threat', authenticate, async (req, res) => {
  const { query } = req.body;

  if (!query) {
    return res.status(400).json({ error: 'QUERY_REQUIRED' });
  }

  try {
    const analysis = await analyzeThreat(query);
    res.json({ success: true, analysis });
  } catch (err) {
    console.error('[AIRoute] Threat Analysis Error:', err.message);
    res.status(500).json({ error: 'AI_SERVICE_ERROR', message: err.message });
  }
});

export default router;
