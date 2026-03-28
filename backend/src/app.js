import express from "express";
import cors from "cors";
import path from 'path';
import { fileURLToPath } from "url";
import multer from 'multer';
import papersRoutes from './routes/papers.js';
import healthRoutes from './routes/health.js';
import authRouter from './routes/auth.js';

const app = express();

const allowedOrigins = new Set(
  (process.env.ALLOWED_ORIGINS || '')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean)
);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow server-to-server calls and local dev hosts.
      if (!origin) {
        callback(null, true);
        return;
      }

      const isLocalhostOrigin = /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin);
      if (isLocalhostOrigin || allowedOrigins.has(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error('Origin not allowed by CORS'));
    },
  })
);

app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.use('/api/auth', authRouter);
app.use('/api/papers', papersRoutes);
app.use('/api/health', healthRoutes);

app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    res.status(400).json({ error: err.message });
    return;
  }

  if (err?.message) {
    res.status(400).json({ error: err.message });
    return;
  }

  next(err);
});

export default app;

