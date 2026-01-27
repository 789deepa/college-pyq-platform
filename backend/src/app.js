import express from "express";
import cors from "cors";
import path from 'path';
import { fileURLToPath } from "url";
import papersRoutes from './routes/papers.js';
import healthRoutes from './routes/health.js';

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
}));

app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.use('/papers', papersRoutes);
app.use('/health', healthRoutes);

export default app;

