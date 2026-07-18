import express from 'express';
import { updateExpertProfile, setAvailability, getExpertMetrics } from '../controllers/expertController.js';
import { authenticate, authorizeExpert } from '../middleware/auth.js';

const router = express.Router();

router.put('/profile', authenticate, authorizeExpert, updateExpertProfile);
router.patch('/availability', authenticate, authorizeExpert, setAvailability);
router.get('/metrics', authenticate, authorizeExpert, getExpertMetrics);

export default router;
