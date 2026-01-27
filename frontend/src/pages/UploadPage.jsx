import { useState } from 'react';

function UploadPage() {
  const [formData, setFormData] = useState({
    subject: '',
    year: '',
    branch: '',
    semester: '',
    pdf: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'pdf') {
      setFormData(prev => ({ ...prev, pdf: files[0] }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const data = new FormData();
    data.append('subject', formData.subject);
    data.append('year', formData.year);
    data.append('branch', formData.branch);
    data.append('semester', formData.semester);
    data.append('pdf', formData.pdf);

    const res = await fetch('http://localhost:5000/papers', {
      method: 'POST',
      body: data,
    });

    if (!res.ok) throw new Error('Upload failed');

    window.location.href = '/browse';
  } catch (err) {
    alert(err.message);
  }
};


  return (
    <div>
      <h2>Upload Paper</h2>

      <form onSubmit={handleSubmit}>
        <input name="subject" placeholder="Subject" onChange={handleChange} />
        <input name="year" type="number" placeholder="Year" onChange={handleChange} />
        <input name="branch" placeholder="Branch" onChange={handleChange} />
        <input name="semester" type="number" placeholder="Semester" onChange={handleChange} />
        <input name="pdf" type="file" onChange={handleChange} />

        <button type="submit">Upload</button>
      </form>
    </div>
  );
}

export default UploadPage;
