function PaperCard({ subject, year, branch, semester, filePath }) {
  const pdfUrl = filePath?.startsWith('http') ? filePath : filePath || '#';

  return (
    <div className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/10">
      <h3 className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-xl font-bold text-transparent">
        {subject}
      </h3>

      <div className="mt-4 flex flex-wrap gap-2 text-xs font-medium">
        <span className="rounded-full border border-purple-500/20 bg-purple-500/10 px-3 py-1 text-purple-300">
          Year: {year}
        </span>
        <span className="rounded-full border border-purple-500/20 bg-purple-500/10 px-3 py-1 text-purple-300">
          Branch: {branch}
        </span>
        <span className="rounded-full border border-purple-500/20 bg-purple-500/10 px-3 py-1 text-purple-300">
          Semester: {semester}
        </span>
      </div>

      <a
        href={pdfUrl}
        target="_blank"
        rel="noreferrer"
        className="mt-5 inline-flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-purple-500 to-cyan-500 py-2 font-medium text-white transition-all duration-200 hover:opacity-90"
      >
        Open PDF
      </a>
    </div>
  );
}

export default PaperCard;
