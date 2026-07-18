import express from 'express';
import { 
  reportIncident, 
  getUserIncidents, 
  getExpertCases,
  getExpertQueue, 
  assignExpert, 
  updateIncidentStatus 
} from '../controllers/incidentController.js';
import { authenticate, authorizeExpert } from '../middleware/auth.js';

const router = express.Router();

// Publicly authenticated routes (any user)
router.post('/create', authenticate, reportIncident);
router.get('/user', authenticate, getUserIncidents);

// Specialist only routes
router.get('/', authenticate, authorizeExpert, getExpertQueue);
router.get('/queue', authenticate, authorizeExpert, getExpertQueue);
router.get('/expert', authenticate, authorizeExpert, getExpertCases);
router.post('/assign', authenticate, authorizeExpert, assignExpert);
router.patch('/:id/accept', authenticate, authorizeExpert, assignExpert);
router.patch('/:id', authenticate, authorizeExpert, updateIncidentStatus);

export default router;
