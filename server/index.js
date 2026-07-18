import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';

// Route Imports
import incidentRoutes from './routes/incidents.js';
import chatRoutes from './routes/chat.js';
import aiRoutes from './routes/ai.js';
import expertRoutes from './routes/experts.js';
import notificationRoutes from './routes/notifications.js';
import rewardsRoutes from './routes/rewards.js';
import { runDbQuery, readDb, writeDb } from './config/mockSupabase.js';

import { registerChatHandlers } from './socket/chatHandler.js';

import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '.env') });

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || "*",
    methods: ["GET", "POST"]
  }
});

// --- Middleware ---
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api/', limiter);

// --- Routes ---
app.get('/health', (req, res) => {
  res.json({ status: 'OPTIMAL', uptime: process.uptime() });
});

app.use('/api/incidents', incidentRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/experts', expertRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/rewards', rewardsRoutes);

// --- Mock DB & Auth Operations ---
app.post('/api/mock-db-op', (req, res) => {
  const { action, table, builder, email, password, metadata } = req.body;

  if (action === 'login') {
    const db = readDb();
    const userProfile = db.profiles.find(p => p.email === email);
    const expectedPassword = db.passwords[email] || 'password123';
    
    if (!userProfile || password !== expectedPassword) {
      return res.json({
        data: { user: null, session: null },
        error: { message: 'Invalid login credentials', status: 400 }
      });
    }

    const payload = {
      sub: userProfile.id,
      email: userProfile.email,
      role: userProfile.role,
      exp: Math.floor(Date.now() / 1000) + 7200
    };
    const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url');
    const encodedPayload = Buffer.from(JSON.stringify(payload)).toString('base64url');
    const signature = 'mock_signature';
    const token = `${header}.${encodedPayload}.${signature}`;

    return res.json({
      data: {
        user: {
          id: userProfile.id,
          email: userProfile.email,
          user_metadata: {
            role: userProfile.role,
            displayName: userProfile.display_name
          },
          role: userProfile.role
        },
        session: {
          access_token: token,
          refresh_token: 'mock_refresh_token',
          expires_in: 7200,
          token_type: 'bearer',
          user: {
            id: userProfile.id,
            email: userProfile.email,
            role: userProfile.role,
            user_metadata: {
              role: userProfile.role,
              displayName: userProfile.display_name
            }
          }
        }
      },
      error: null
    });
  }

  if (action === 'signup') {
    const db = readDb();
    if (db.profiles.find(p => p.email === email)) {
      return res.json({
        data: { user: null, session: null },
        error: { message: 'User already registered', status: 400 }
      });
    }

    const userId = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });

    const intendedRole = metadata?.role || 'user';
    const newProfile = {
      id: userId,
      email,
      role: intendedRole,
      display_name: metadata?.displayName || email.split('@')[0],
      availability: 'online',
      created_at: new Date().toISOString()
    };

    db.profiles.push(newProfile);
    db.passwords[email] = password;
    writeDb(db);

    const payload = {
      sub: userId,
      email: email,
      role: intendedRole,
      exp: Math.floor(Date.now() / 1000) + 7200
    };
    const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url');
    const encodedPayload = Buffer.from(JSON.stringify(payload)).toString('base64url');
    const signature = 'mock_signature';
    const token = `${header}.${encodedPayload}.${signature}`;

    return res.json({
      data: {
        user: {
          id: userId,
          email,
          user_metadata: {
            role: intendedRole,
            displayName: newProfile.display_name
          },
          role: intendedRole
        },
        session: {
          access_token: token,
          refresh_token: 'mock_refresh_token',
          expires_in: 7200,
          token_type: 'bearer',
          user: {
            id: userId,
            email,
            role: intendedRole,
            user_metadata: {
              role: intendedRole,
              displayName: newProfile.display_name
            }
          }
        }
      },
      error: null
    });
  }

  if (action === 'query') {
    const queryBuilder = {
      tableName: table,
      operation: builder.operation,
      filters: builder.filters || [],
      orderBy: builder.orderBy,
      limitVal: builder.limitVal,
      isSingle: builder.isSingle,
      isMaybeSingle: builder.isMaybeSingle,
      data: builder.data
    };

    const result = runDbQuery(queryBuilder);
    return res.json(result);
  }

  return res.status(400).json({ error: 'Unknown action' });
});

// --- Socket.IO Integration ---
io.on('connection', (socket) => {
  console.log('--- SOC_UPLINK_ESTABLISHED:', socket.id);

  // Register Handlers
  registerChatHandlers(io, socket);

  socket.on('disconnect', () => {
    console.log('--- SOC_UPLINK_TERMINATED:', socket.id);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`
  --------------------------------------------------
  JEZTBRAIN SOC BACKEND ACTIVE
  Uplink Port: ${PORT}
  Environment: ${process.env.NODE_ENV}
  --------------------------------------------------
  `);
});

export { io };
