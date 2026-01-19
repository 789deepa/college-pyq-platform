import express from "express";
import cors from "cors";
import papersRoutes from './routes/papers.js';
import path from 'path';
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

app.use(cors());
app.use(express.json());
app.use('/papers', papersRoutes);
app.use('/uploads', express.static('uploads'));
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

export default app;

