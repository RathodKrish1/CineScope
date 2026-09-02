import { useEffect, useState } from "react";
import MovieGrid from "./MovieGrid";
import { getTrendingMovies } from "../services/movieAPI";

export default function TrendingMovie() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let active = true;
        getTrendingMovies()
            .then((data) => {
                if (active) setMovies(data.results || []);
            })
            .catch((error) => console.error(error))
            .finally(() => {
                if (active) setLoading(false);
            });
        return () => {
            active = false;
        };
    }, []);

    return (
        <div>
            <h2 className="mb-4 text-xl font-bold text-white">Trending Movies</h2>
            {loading ? (
                <p className="text-sm text-neutral-500">Loading...</p>
            ) : (
                <MovieGrid movies={movies.slice(0, 8)} />
            )}
        </div>
    );
}
