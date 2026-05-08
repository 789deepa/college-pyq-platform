import express from "express";
import cors from "cors";
import path from 'path';
import { fileURLToPath } from "url";
import multer from 'multer';
import papersRoutes from './routes/papers.js';
import healthRoutes from './routes/health.js';
import authRouter from './routes/auth.js';

const app = express();

app.use(cors());

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

