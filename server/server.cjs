const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const axios = require('axios');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Adjust for production
    methods: ["GET", "POST", "PUT"]
  }
});

app.use(cors());
app.use(express.json());

// --- Mock Database / State ---
let userProfile = {
  name: 'Authorized User',
  email: 'user@jeztbrain.ai',
  phone: '+1 234 567 890',
  role: 'Security Agent'
};

let incidents = [];

// --- API Endpoints ---

// Profile Update
app.put('/api/user/profile', (req, res) => {
  const { name, email, phone } = req.body;
  
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and Email are required.' });
  }

  // Update mock state
  userProfile = { ...userProfile, name, email, phone };
  
  console.log('Profile Updated:', userProfile);
  
  res.json({ 
    success: true, 
    message: 'AGENT_IDENTITY_SYNC_COMPLETE', 
    profile: userProfile 
  });
});

// Report Attack / Incident
app.post('/api/incidents', (req, res) => {
  const { timestamp, type, severity, description, affectedSystems } = req.body;
  
  if (!type || !severity) {
    return res.status(400).json({ error: 'Incident type and severity are required.' });
  }

  const newIncident = {
    id: `INC-${Math.floor(Math.random() * 9000) + 1000}`,
    timestamp: timestamp || new Date().toISOString(),
    type,
    severity,
    description,
    affectedSystems,
    status: 'open'
  };

  incidents.push(newIncident);
  console.log('New Incident Logged:', newIncident);

  // Notify connected clients via Socket.io
  io.emit('new_incident', newIncident);

  res.status(201).json({ 
    success: true, 
    message: 'TACTICAL_INTELLIGENCE_LOGGED', 
    ticketNumber: newIncident.id 
  });
});

// --- Socket.io Logic (Real-time Chat) ---
io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);

  socket.on('send_message', (data) => {
    console.log('Message Received:', data);
    // Echo back or broadcast
    io.emit('receive_message', {
      ...data,
      timestamp: new Date().toISOString(),
      id: Date.now()
    });
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`JeztBrain Backend Server running on port ${PORT}`);
});
