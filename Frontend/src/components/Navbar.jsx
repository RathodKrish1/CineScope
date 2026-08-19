import { Link } from "react-router-dom";

function Navbar(){
    return(
        <nav>  
            <Link to="/">CineScope</Link>
            <Link to="/movies">Movies</Link>
            <Link to="/series">Series</Link>
            <Link to="/recommendation">Recommended Shows</Link>
            <Link to="/search">Search</Link>
        </nav>
    )
}

export default Navbar;