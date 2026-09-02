import { useEffect, useState } from "react";
import TrendingMovie from "../components/TrendingMovie";
import TrendingSeries from "../components/TrendingSeries";
import NewMovies from "../components/NewMovies";
import MovieGrid from "../components/MovieGrid";
import { getPopularMovies } from "../services/movieAPI";
import LoadingSpinner from "../components/LoadingSpinner";

export default function Home() {
    const [popularMovies, setPopularMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let active = true;
        const fetchMovies = async () => {
            try {
                const data = await getPopularMovies();
                if (active) setPopularMovies(data.results || []);
            } catch (error) {
                console.error(error);
            } finally {
                if (active) setLoading(false);
            }
        };
        fetchMovies();
        return () => {
            active = false;
        };
    }, []);

    return (
        <div className="mx-auto max-w-7xl space-y-8 px-4 py-6">
            {/* Hero Section */}
            <section className="rounded-3xl border border-white/10 bg-gradient-to-br from-neutral-900 via-neutral-900/80 to-neutral-950 p-8 shadow-2xl">
                <div className="animate-in fade-in slide-in-from-top-4 duration-700">
                    <h1 className="text-4xl font-bold text-white md:text-5xl">
                        Welcome to <span className="bg-gradient-to-r from-red-500 to-orange-400 bg-clip-text text-transparent">CineScope</span>
                    </h1>
                    <p className="mt-3 max-w-2xl text-lg text-neutral-300">
                        Discover the latest movies and series. Find where to watch your favorite content across all streaming platforms.
                    </p>
                    <div className="mt-6 flex gap-4">
                        <a
                            href="/search"
                            className="rounded-xl bg-gradient-to-r from-red-600 to-orange-500 px-6 py-3 font-semibold text-white transition-all duration-300 hover:shadow-lg hover:shadow-red-500/50 hover:-translate-y-1"
                        >
                            Search Now
                        </a>
                        <a
                            href="/recommendation"
                            className="rounded-xl border border-white/20 bg-white/5 px-6 py-3 font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-white/40 hover:bg-white/10"
                        >
                            Get Recommendations
                        </a>
                    </div>
                </div>
            </section>

            <NewMovies />

            <section className="rounded-2xl border border-white/10 bg-neutral-900/40 p-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <h2 className="mb-4 text-xl font-bold text-white">Popular Movies</h2>
                {loading ? (
                    <div className="flex justify-center py-12">
                        <LoadingSpinner />
                    </div>
                ) : (
                    <MovieGrid movies={popularMovies.slice(0, 10)} />
                )}
            </section>

            <div className="grid gap-6 md:grid-cols-2">
                <section className="rounded-2xl border border-white/10 bg-neutral-900/40 p-6 animate-in fade-in slide-in-from-left-4 duration-700 md:duration-1000">
                    <TrendingMovie />
                </section>
                <section className="rounded-2xl border border-white/10 bg-neutral-900/40 p-6 animate-in fade-in slide-in-from-right-4 duration-700 md:duration-1000">
                    <TrendingSeries />
                </section>
            </div>
        </div>
    );
}
