function PaperCard ( { subject, year, branch, semester }) {
    return (
        <div style={{ border: '1px solid #ccc', padding: '12px', marginBottom: '10px' }}>
            <h3>{subject}</h3>
            <p> Year: {year}</p>
            <p> Branch: {branch}</p>
            <p> Semester: {semester}</p>
        </div>
    );
}

export default PaperCard; 