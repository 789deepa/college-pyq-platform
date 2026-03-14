import express from 'express';
import upload from '../config/upload.js';
import Paper from '../models/Paper.js';

const router = express.Router();

router.post('/', upload.single('pdf'), async (req, res) => {
  try {    
    const subject = req.body?.subject?.trim();
    const branch = req.body?.branch?.trim();
    const year = Number(req.body?.year);
    const semester = Number(req.body?.semester);

    if (!subject || !branch || Number.isNaN(year) || Number.isNaN(semester)) {
      return res.status(400).json({ error: 'Subject, year, branch, and semester are required.' });
    }

    if (!req.file) {
      return res.status(400).json({ error: 'File missing' });
    }

    const paper = await Paper.create({
      subject,
      year,
      branch,
      semester,
      filePath: `/uploads/${req.file.filename}`,
    });

    res.status(201).json(paper);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const { year, branch, subject, semester } = req.query;
    const filter = {};

    if (year) {
      const parsedYear = Number(year);
      if (Number.isNaN(parsedYear)) {
        return res.status(400).json({ error: 'year must be a number' });
      }
      filter.year = parsedYear;
    }

    if (semester) {
      const parsedSemester = Number(semester);
      if (Number.isNaN(parsedSemester)) {
        return res.status(400).json({ error: 'semester must be a number' });
      }
      filter.semester = parsedSemester;
    }

    if (branch) filter.branch = branch;
    if (subject) filter.subject = subject;

    const papers = await Paper.find(filter).sort({ createdAt: -1 });
    res.json(papers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
