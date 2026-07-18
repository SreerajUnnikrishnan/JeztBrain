import express from 'express';
import { sendMessage, getChatHistory } from '../controllers/chatController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.post('/message', authenticate, sendMessage);
router.get('/history/:incidentId', authenticate, getChatHistory);

export default router;
