import 'dotenv/config';

import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import auth from './routes/auth';
import portfolio from './routes/portfolio';
import projects from './routes/projects';
import analytics from './routes/analytics';
import { notFound, errorHandler } from './middleware/error';

const app = express();

const port = Number(process.env.PORT || 5000);

// Allow both possible Next.js development ports
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  process.env.FRONTEND_URL,
].filter((origin): origin is string => Boolean(origin));

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests without an Origin header
      // (for Postman, server-side requests, health checks, etc.)
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      console.log(`CORS blocked for origin: ${origin}`);

      return callback(new Error(`Not allowed by CORS: ${origin}`));
    },
    credentials: true,
  })
);

app.use(
  express.json({
    limit: '1mb',
  })
);

app.use(cookieParser());

// Health check
app.get('/api/health', (_req, res) => {
  res.json({
    success: true,
    data: {
      status: 'ok',
    },
  });
});

// API Routes
app.use('/api/auth', auth);
app.use('/api/portfolio', portfolio);
app.use('/api/projects', projects);
app.use('/api/analytics', analytics);

// Error handling
app.use(notFound);
app.use(errorHandler);

// Start server
app.listen(port, () => {
  console.log(`API running on http://localhost:${port}`);
});