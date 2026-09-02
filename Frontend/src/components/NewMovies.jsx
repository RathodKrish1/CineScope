import { useEffect, useState } from "react";
import MovieGrid from "./MovieGrid";
import { getLatestMovies } from "../services/movieAPI";

export default function NewMovies() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let active = true;
        getLatestMovies()
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
        <section className="rounded-2xl border border-white/10 bg-neutral-900/40 p-6">
            <h2 className="mb-4 text-xl font-bold text-white">New Release Movies</h2>
            {loading ? (
                <p className="text-sm text-neutral-500">Loading...</p>
            ) : (
                <MovieGrid movies={movies.slice(0, 10)} />
            )}
        </section>
    );
}
