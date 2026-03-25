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
    semester: '',
    subject: '',
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

  const filteredPapers = papers.filter((paper) => {
    const matchYear = !filters.year || String(paper.year) === filters.year;
    const matchBranch = !filters.branch || paper.branch === filters.branch;
    const matchSemester = !filters.semester || String(paper.semester) === filters.semester;
    const matchSubject = !filters.subject ||
      paper.subject.toLowerCase().includes(filters.subject.toLowerCase());
    return matchYear && matchBranch && matchSemester && matchSubject;
  });

  return (
    <div className="min-h-screen bg-[#0a0a0f] px-4 pb-10 pt-8 text-slate-200 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-6xl">
        <section className="mb-8 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-md sm:p-8">
          <h2 className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-3xl font-bold text-transparent sm:text-4xl">
            Find Your Papers
          </h2>
          <p className="mt-2 text-sm text-slate-400 sm:text-base">
            Access previous year question papers for all branches
          </p>
        </section>

        <div className="mb-8 flex flex-wrap gap-3">
          <input
            className="flex-1 min-w-[200px] rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-slate-200 placeholder:text-slate-500 outline-none transition-all duration-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
            type="text"
            placeholder="Search subject..."
            value={filters.subject}
            onChange={(e) => setFilters(prev => ({ ...prev, subject: e.target.value }))}
          />
          <select
            className="min-w-[130px] appearance-none cursor-pointer rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-slate-200 outline-none transition-all duration-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
            value={filters.year}
            onChange={(e) => setFilters(prev => ({ ...prev, year: e.target.value }))}
          >
            <option value="">All Years</option>
            {[2025, 2024, 2023, 2022, 2021, 2020].map(y => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
          <select
            className="min-w-[130px] appearance-none cursor-pointer rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-slate-200 outline-none transition-all duration-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
            value={filters.branch}
            onChange={(e) => setFilters(prev => ({ ...prev, branch: e.target.value }))}
          >
            <option value="">All Branches</option>
            {['IT', 'Comp', 'ENTC', 'Mech', 'Civil', 'AIDS', 'Robotics', 'Electrical'].map(b => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
          <select
            className="min-w-[130px] appearance-none cursor-pointer rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-slate-200 outline-none transition-all duration-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
            value={filters.semester}
            onChange={(e) => setFilters(prev => ({ ...prev, semester: e.target.value }))}
          >
            <option value="">All Semesters</option>
            {[1, 2, 3, 4, 5, 6, 7, 8].map(s => (
              <option key={s} value={s}>Sem {s}</option>
            ))}
          </select>
        </div>

        {loading && (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="animate-pulse rounded-2xl border border-white/10 bg-white/5 p-6"
              >
                <div className="mb-4 h-6 w-2/3 rounded bg-white/10" />
                <div className="mb-6 flex gap-2">
                  <div className="h-6 w-16 rounded-full bg-white/10" />
                  <div className="h-6 w-16 rounded-full bg-white/10" />
                  <div className="h-6 w-20 rounded-full bg-white/10" />
                </div>
                <div className="h-10 w-full rounded-xl bg-white/10" />
              </div>
            ))}
          </div>
        )}

        {error && (
          <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-red-400">
            <p className="flex items-start gap-2 text-sm sm:text-base">
              <svg
                className="mt-0.5 h-5 w-5 shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path d="M12 8V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M12 16H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path
                  d="M10.29 3.86L1.82 18A2 2 0 003.53 21H20.47A2 2 0 0022.18 18L13.71 3.86A2 2 0 0010.29 3.86Z"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
              <span>{error}</span>
            </p>
          </div>
        )}

        {!loading && !error && filteredPapers.length === 0 && (
          <div className="flex min-h-[220px] flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/5 p-8 text-center">
            <svg
              className="mb-3 h-12 w-12 text-slate-500"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M4 5.5A1.5 1.5 0 015.5 4H18.5A1.5 1.5 0 0120 5.5V18.5A1.5 1.5 0 0118.5 20H5.5A1.5 1.5 0 014 18.5V5.5Z"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path d="M8 9H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M8 13H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <p className="text-slate-400">No papers found for selected filters</p>
          </div>
        )}

        {!loading && !error && (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredPapers.map((paper) => (
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
        )}
      </div>
    </div>
  );
}

export default BrowsePage;
