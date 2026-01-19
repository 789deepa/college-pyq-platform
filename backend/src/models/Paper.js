import mongoose from 'mongoose';

const paperSchema = new mongoose.Schema(
  {
    subject: { type: String, required: true },
    year: { type: Number, required: true },
    branch: { type: String, required: true },
    semester: { type: Number, required: true },
    filePath: { type: String, required: true },
  },
  { timestamps: true }
);

const Paper = mongoose.model('Paper', paperSchema);

export default Paper;
