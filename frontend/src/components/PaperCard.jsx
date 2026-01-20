function PaperCard ( { subject, year, branch, semester, filePath }) {
    return (
        <div style={{ border: '1px solid #ccc', padding: '12px', marginBottom: '10px' }}>
            <h3>{subject}</h3>
            <p> Year: {year}</p>
            <p> Branch: {branch}</p>
            <p> Semester: {semester}</p>
            <a 
            href={`http://localhost:5000${filePath}`}
            target="_blank"
            rel="noreferrer" 
            >
            Open PDF
            </a>
        </div>
    );
}

export default PaperCard; 