import { Link } from 'react-router-dom';

function Navbar () {
    return (
        <nav>
            <Link to="/browse">Browse</Link>
            <Link to="/upload">Upload</Link>
        </nav>
    );
}

export default Navbar;