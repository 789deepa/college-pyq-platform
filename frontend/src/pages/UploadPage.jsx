import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiPath, parseResponseError } from '../lib/api';
import { getToken } from '../lib/auth';

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
      const token = getToken();
      if (!token) {
        throw new Error('Please sign in before uploading.');
      }

      const data = new FormData();
      data.append('subject', formData.subject.trim());
      data.append('year', formData.year);
      data.append('branch', formData.branch.trim());
      data.append('semester', formData.semester);
      data.append('pdf', formData.pdf);

     const res = await fetch(apiPath('/papers'), {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
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
    <div className="min-h-screen bg-[#0a0a0f] px-4 py-10 text-slate-200 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-md items-center justify-center">
        <div className="w-full rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md sm:p-8">
          <h2 className="mb-6 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-2xl font-bold text-transparent">
            Upload Paper
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-slate-200 outline-none transition-all duration-200 placeholder:text-slate-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
              name="subject"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleChange}
              required
            />
            <input
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-slate-200 outline-none transition-all duration-200 placeholder:text-slate-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
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
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-slate-200 outline-none transition-all duration-200 placeholder:text-slate-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
              name="branch"
              placeholder="Branch"
              value={formData.branch}
              onChange={handleChange}
              required
            />
            <input
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-slate-200 outline-none transition-all duration-200 placeholder:text-slate-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
              name="semester"
              type="number"
              placeholder="Semester"
              value={formData.semester}
              onChange={handleChange}
              min="1"
              max="12"
              required
            />

            <label className="block cursor-pointer rounded-xl border border-dashed border-white/20 p-8 text-center text-slate-400 transition-all duration-200 hover:border-purple-500/50">
              <span className="text-sm">
                {formData.pdf ? formData.pdf.name : 'Click to choose PDF file'}
              </span>
              <input
                className="hidden"
                name="pdf"
                type="file"
                accept="application/pdf,.pdf"
                onChange={handleChange}
                required
              />
            </label>

            {error && (
              <p className="rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-400">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={isUploading}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-500 to-cyan-500 py-3 text-base font-semibold text-white transition-all duration-200 hover:opacity-90 disabled:opacity-50"
            >
              {isUploading && (
                <svg
                  className="h-4 w-4 animate-spin"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="3" opacity="0.25" />
                  <path d="M12 3A9 9 0 0121 12" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                </svg>
              )}
              <span className={isUploading ? 'opacity-70' : ''}>
                {isUploading ? 'Uploading...' : 'Upload'}
              </span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UploadPage;
