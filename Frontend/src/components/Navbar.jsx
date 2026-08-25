import { Link, useLocation } from "react-router-dom";

function Navbar() {
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="sticky top-2 z-50 flex items-center h-16 px-4 border border-white/10 rounded-2xl bg-black/80 backdrop-blur-xl shadow-2xl">

            <div className="flex-1 text-center">
                <Link
                    to="/"
                    className="brand"
                >
                    CineScope
                </Link>
            </div>

            <div className="flex-1 text-center">
                <Link
                    to="/search"
                    className={`nav-link ${isActive("/search") ? "text-white" : ""}`}
                >
                    Search
                </Link>
            </div>

            <div className="flex-1 text-center">
                <Link
                    to="/movies"
                    className={`nav-link ${isActive("/movies") ? "text-white" : ""}`}
                >
                    Movies
                </Link>
            </div>

            <div className="flex-1 text-center">
                <Link
                    to="/series"
                    className={`nav-link ${isActive("/series") ? "text-white" : ""}`}
                >
                    Series
                </Link>
            </div>

            <div className="flex-1 text-center">
                <Link
                    to="/recommendation"
                    className={`nav-link ${isActive("/recommendation") ? "text-white" : ""}`}
                >
                    Recommended Shows
                </Link>
            </div>

        </nav>
    );
}

export default Navbar;