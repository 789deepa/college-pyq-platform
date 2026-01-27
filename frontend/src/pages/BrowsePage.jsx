import { useEffect, useState } from 'react';
import PaperCard from '../components/PaperCard';

function BrowsePage() {

  const [papers, setPapers] = useState([]);
  const [filters, setFilters] = useState({
  year: '',
  branch: '',
});

  useEffect(() => {
  const query = new URLSearchParams(filters).toString();
  


  fetch(`http://localhost:5000/papers?${query}`)
    .then(res => res.json())
    .then(data => setPapers(data));
}, [filters]);

  return (
    <div>
      <h2>Browse Papers</h2>

      <div style={{ marginBottom: '20px' }}>
        <select
          onChange={(e) =>
            setFilters(prev => ({ ...prev, year: e.target.value }))
          }
        >
          <option value="">All Years</option>
          <option value="2023">2023</option>
          <option value="2022">2022</option>
        </select>
          
        <select
          onChange={(e) =>
            setFilters(prev => ({ ...prev, branch: e.target.value }))
          }
        >
          <option value="">All Branches</option>
          <option value="IT">IT</option>
          <option value="Comp">Comp</option>
        </select>
      </div>

{papers.length === 0 && <p>No papers match selected filters</p>}

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
