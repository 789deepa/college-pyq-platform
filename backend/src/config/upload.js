import multer from 'multer';
import getSupabase from './supabase.js';

// Use memory storage instead of disk
const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
  },
  fileFilter: (req, file, cb) => {
    const isPdf = file.mimetype === 'application/pdf' || /\.pdf$/i.test(file.originalname);
    if (!isPdf) {
      cb(new Error('Only PDF files are allowed'));
      return;
    }
    cb(null, true);
  },
});

// Helper function to upload PDF to Supabase
export async function uploadToSupabase(file) {
  const fileName = `${Date.now()}-${file.originalname}`;
  
  const { data, error } = await getSupabase().storage
    .from('papers')
    .upload(fileName, file.buffer, {
      contentType: 'application/pdf',
      upsert: false,
    });

  if (error) throw new Error(error.message);

  // Get public URL
  const { data: urlData } = getSupabase().storage
    .from('papers')
    .getPublicUrl(fileName);

  return urlData.publicUrl;
}

export default upload;