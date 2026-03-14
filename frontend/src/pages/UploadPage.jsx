import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiPath, parseResponseError } from '../lib/api';

function UploadPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    subject: '',
    year: '',
    branch: '',
    semester: '',
    pdf: null,
  });
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'pdf') {
      setFormData(prev => ({ ...prev, pdf: files[0] }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }

    if (error) {
      setError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.pdf) {
      setError('Please choose a PDF file to upload.');
      return;
    }

    setIsUploading(true);
    setError('');

    try {
      const data = new FormData();
      data.append('subject', formData.subject.trim());
      data.append('year', formData.year);
      data.append('branch', formData.branch.trim());
      data.append('semester', formData.semester);
      data.append('pdf', formData.pdf);

      const res = await fetch(apiPath('/papers'), {
        method: 'POST',
        body: data,
      });

      if (!res.ok) {
        const message = await parseResponseError(res);
        throw new Error(message);
      }

      setFormData({
        subject: '',
        year: '',
        branch: '',
        semester: '',
        pdf: null,
      });
      navigate('/browse');
    } catch (err) {
      setError(err.message || 'Upload failed. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div>
      <h2>Upload Paper</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="subject"
          placeholder="Subject"
          value={formData.subject}
          onChange={handleChange}
          required
        />
        <input
          name="year"
          type="number"
          placeholder="Year"
          value={formData.year}
          onChange={handleChange}
          min="1900"
          max="2100"
          required
        />
        <input
          name="branch"
          placeholder="Branch"
          value={formData.branch}
          onChange={handleChange}
          required
        />
        <input
          name="semester"
          type="number"
          placeholder="Semester"
          value={formData.semester}
          onChange={handleChange}
          min="1"
          max="12"
          required
        />
        <input
          name="pdf"
          type="file"
          accept="application/pdf,.pdf"
          onChange={handleChange}
          required
        />

        {error && <p style={{ color: 'crimson' }}>{error}</p>}

        <button type="submit" disabled={isUploading}>
          {isUploading ? 'Uploading...' : 'Upload'}
        </button>
      </form>
    </div>
  );
}

export default UploadPage;
