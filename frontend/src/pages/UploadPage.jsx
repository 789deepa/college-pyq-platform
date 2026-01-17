function UploadPage () {
    return (
        <div>
            <h2> Upload Paper</h2>

            <form>
                <div>
                    <label>Subject</label><br/>
                    <input type="text" />
                </div>

                <div>
                    <label>Year</label><br/>
                    <input type="number" />
                </div>

                <div>
                    <label>Branch</label><br/>
                    <input type="text" />
                </div>

                <div>
                    <label>Semester</label><br/>
                    <input type="number" />
                </div>

                <div>
                    <label>PDF File</label><br/>
                    <input type="file" />
                </div>

                <button type="button"> Upload</button>
            </form>
        </div>
    );
}

export default UploadPage;