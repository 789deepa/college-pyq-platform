import { Link } from 'react-router-dom';

function Navbar () {
    return (
        <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#0a0a0f]/80 backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.35)]">
            <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
                <Link
                    to="/"
                    className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-xl font-extrabold tracking-wide text-transparent transition-all duration-200 hover:opacity-90"
                >
                    PYQ Vault
                </Link>

                <div className="flex w-full flex-wrap items-center gap-2 sm:w-auto sm:justify-end">
                    <Link
                        to="/browse"
                        className="inline-flex flex-1 items-center justify-center rounded-full border border-purple-500 px-4 py-2 text-sm font-semibold text-purple-400 transition-all duration-200 hover:bg-purple-500/20 sm:flex-none"
                    >
                        Browse
                    </Link>
                    <Link
                        to="/upload"
                        className="inline-flex flex-1 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 px-4 py-2 text-sm font-semibold text-white transition-all duration-200 hover:opacity-90 sm:flex-none"
                    >
                        Upload
                    </Link>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
