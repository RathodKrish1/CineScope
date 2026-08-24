import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav className="sticky top-1 flex items-center border border-gray-400 rounded-2xl h-20 mx-1 mt-1">
            <div className="flex-1 text-center">
                <Link to="/">CineScope</Link>
            </div>

            <div className="flex-1 text-center">
                <Link to="/search">Search</Link>
            </div>

            <div className="flex-1 text-center">
                <Link to="/movies">Movies</Link>
            </div>

            <div className="flex-1 text-center">
                <Link to="/series">Series</Link>
            </div>

            <div className="flex-1 text-center">
                <Link to="/recommendation">Recommended Shows</Link>
            </div>
        </nav>
    );
}

export default Navbar;
