import express from 'express';
import upload from '../config/upload.js';
import Paper from '../models/Paper.js';

const router = express.Router();

router.post('/', upload.single('pdf'), async (req, res) => {
  try {
    console.log('BODY:', req.body);
    console.log('FILE:', req.file);

    const { subject, year, branch, semester } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: 'File missing' });
    }

    const paper = await Paper.create({
      subject,
      year: Number(year),
      branch,
      semester: Number(semester),
      filePath: `/uploads/${req.file.filename}`,
    });

    res.status(201).json(paper);
  } catch (error) {
    console.error('DB ERROR:', error);
    res.status(500).json({ error: error.message });
  }
});

router.get('/', async (req, res) => {
    try {
        const { year, branch, subject, semester} = req.query;

        const filter = {};
        if(year) filter.year = Number(year);
        if(branch) filter.branch = branch;
        if(subject) filter.subject = subject;
        if(semester) filter.semester = Number(semester);

        const papers = await Paper.find(filter);

        res.json(papers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message});
    }
});

export default router;