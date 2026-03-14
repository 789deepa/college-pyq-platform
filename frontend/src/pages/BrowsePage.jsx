import { useEffect, useState } from 'react';
import PaperCard from '../components/PaperCard';
import { apiPath, parseResponseError } from '../lib/api';

function BrowsePage() {
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    year: '',
    branch: '',
  });

  useEffect(() => {
    const activeFilters = Object.fromEntries(
      Object.entries(filters).filter(([, value]) => String(value).trim() !== '')
    );
    const query = new URLSearchParams(activeFilters).toString();
    const controller = new AbortController();

    async function loadPapers() {
      setLoading(true);
      setError('');

      try {
        const res = await fetch(apiPath(`/papers${query ? `?${query}` : ''}`), {
          signal: controller.signal,
        });
        if (!res.ok) {
          throw new Error(await parseResponseError(res));
        }
        const data = await res.json();
        setPapers(Array.isArray(data) ? data : []);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message || 'Could not load papers.');
        }
      } finally {
        setLoading(false);
      }
    }

    loadPapers();
    return () => controller.abort();
  }, [filters]);

  return (
    <div>
      <h2>Browse Papers</h2>

      <div style={{ marginBottom: '20px' }}>
        <select
          value={filters.year}
          onChange={(e) =>
            setFilters(prev => ({ ...prev, year: e.target.value }))
          }
        >
          <option value="">All Years</option>
          <option value="2023">2023</option>
          <option value="2022">2022</option>
        </select>
          
        <select
          value={filters.branch}
          onChange={(e) =>
            setFilters(prev => ({ ...prev, branch: e.target.value }))
          }
        >
          <option value="">All Branches</option>
          <option value="IT">IT</option>
          <option value="Comp">Comp</option>
        </select>
      </div>

      {loading && <p>Loading papers...</p>}
      {error && <p style={{ color: 'crimson' }}>{error}</p>}
      {!loading && !error && papers.length === 0 && (
        <p>No papers match selected filters</p>
      )}

      {!loading && !error && papers.map((paper) => (
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
