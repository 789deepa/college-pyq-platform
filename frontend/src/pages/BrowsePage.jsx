import { useEffect, useState } from 'react';
import PaperCard from '../components/PaperCard';

function BrowsePage() {
  const [papers, setPapers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/papers')
      .then(res => res.json())
      .then(data => setPapers(data));
  }, []);

  return (
    <div>
      <h2>Browse Papers</h2>

      {papers.map(paper => (
        <PaperCard
          key={paper._id}
          subject={paper.subject}
          year={paper.year}
          branch={paper.branch}
          semester={paper.semester}
          filePath={paper.filePath}
        />
      ))}
    </div>
  );
}

export default BrowsePage;
