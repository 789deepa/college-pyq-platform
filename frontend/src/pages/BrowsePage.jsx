import PaperCard from "../components/PaperCard";

function BrowsePage () {
    const fakePapers = [
        { subject: 'DBMS', year: 2023, branch: 'IT', semester: 4},
        { subject: 'OS', year: 2022, branch: 'Comp', semester: 5},
    ];

    return (
        <div>
            <h2> Browse Papers</h2>

            {/* {Filters} */}
            <div style={{ marginBottom: '20px'}}>
                <select>
                    <option>Year</option>
                </select>

                <select>
                    <option>Branch</option>
                </select>
            </div>

            {/* {Papers} */}

            {fakePapers.map((paper, index) => (
                <PaperCard key={index} {...paper} />
            ))}
        </div>
    );
}

export default BrowsePage; 