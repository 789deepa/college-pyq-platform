function PaperCard({ subject, year, branch, semester, filePath, canDelete = false, onDelete, isDeleting = false }) {
  const pdfUrl = filePath?.startsWith('http') ? filePath : filePath || '#';

  return (
    <div className="group relative rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/10">
      {canDelete ? (
        <button
          type="button"
          onClick={onDelete}
          disabled={isDeleting}
          aria-label="Delete paper"
          title={isDeleting ? 'Deleting...' : 'Delete paper'}
          className="absolute right-4 top-4 inline-flex h-8 w-8 items-center justify-center rounded-full border border-red-500/40 bg-red-500/10 text-red-300 transition-all duration-200 hover:bg-red-500/20 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <svg
            className="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path d="M3 6H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M8 6V4.8C8 4.35817 8.35817 4 8.8 4H15.2C15.6418 4 16 4.35817 16 4.8V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M18 6L17.2 18.2C17.1426 19.0761 16.4146 19.75 15.5367 19.75H8.46329C7.58543 19.75 6.85745 19.0761 6.80001 18.2L6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M10 10V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M14 10V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      ) : null}

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
