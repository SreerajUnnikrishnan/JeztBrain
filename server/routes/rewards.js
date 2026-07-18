import express from 'express';
import { getRewardsStats, requestWithdrawal } from '../controllers/rewardsController.js';
import { authenticate, authorizeExpert } from '../middleware/auth.js';

const router = express.Router();

// All rewards endpoints are expert/specialist restricted
router.get('/stats', authenticate, authorizeExpert, getRewardsStats);
router.post('/withdraw', authenticate, authorizeExpert, requestWithdrawal);

export default router;
