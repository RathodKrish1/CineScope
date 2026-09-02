import { useState, useEffect, useRef, useCallback } from "react";
import { getTopRatedMovies, getFilterMovie } from "../services/movieAPI";
import MovieGrid from "../components/MovieGrid";
import LoadingSpinner from "../components/LoadingSpinner";

const RATING_FILTERS = [
  { label: "All Ratings", value: 0 },
  { label: "7+ ⭐", value: 7 },
  { label: "8+ ⭐", value: 8 },
  { label: "9+ ⭐", value: 9 },
];

const YEAR_FILTERS = [
  { label: "All Years", value: 0 },
  { label: "2024", value: 2024 },
  { label: "2023", value: 2023 },
  { label: "2022", value: 2022 },
  { label: "2020+", value: 2020 },
  { label: "2010+", value: 2010 },
];

export default function Recommendation() {
  const [movies, setMovies] = useState([]);
  const [allMovies, setAllMovies] = useState([]);
  const [allGenres, setAllGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);

  // Filters
  const [selectedRating, setSelectedRating] = useState(0);
  const [selectedYear, setSelectedYear] = useState(0);
  const [selectedGenres, setSelectedGenres] = useState([]);

  const observerTargetRef = useRef(null);

  // Fetch genres and initial movies
  useEffect(() => {
    let active = true;

    const fetchInitial = async () => {
      try {
        const [genreData, movieData] = await Promise.all([
          getFilterMovie(),
          getTopRatedMovies(),
        ]);

        if (!active) return;

        setAllGenres(genreData.genres || []);
        setAllMovies(movieData.results || []);
        const filtered = applyFilters(movieData.results || [], 0, 0, []);
        setMovies(filtered.slice(0, 20));
        setHasMore(filtered.length > 20);
      } catch (error) {
        console.error(error);
      } finally {
        if (active) setLoading(false);
      }
    };

    fetchInitial();

    return () => {
      active = false;
    };
// eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const applyFilters = useCallback((moviesToFilter, rating, year, genres) => {
    return moviesToFilter.filter((movie) => {
      // Rating filter
      if (rating > 0 && movie.vote_average < rating) {
        return false;
      }

      // Year filter
      if (year > 0) {
        const movieYear = parseInt(movie.release_date?.split("-")[0] || 0);
        if (movieYear < year) {
          return false;
        }
      }

      // Genre filter
      if (genres.length > 0) {
        const hasGenre = genres.some((genreId) =>
          movie.genre_ids?.includes(genreId)
        );
        if (!hasGenre) {
          return false;
        }
      }

      return true;
    });
  }, []);

  // Apply filters when filter values change
  useEffect(() => {
    const filtered = applyFilters(allMovies, selectedRating, selectedYear, selectedGenres);
    setMovies(filtered.slice(0, 20));
    setHasMore(filtered.length > 20);
  }, [selectedRating, selectedYear, selectedGenres, allMovies, applyFilters]);

  const loadMore = useCallback(() => {
    if (loading) return;

    setLoading(true);
    const filtered = applyFilters(allMovies, selectedRating, selectedYear, selectedGenres);
    const start = movies.length;
    const end = start + 20;
    const newMovies = filtered.slice(start, end);

    if (newMovies.length === 0) {
      setHasMore(false);
    } else {
      setMovies((prev) => [...prev, ...newMovies]);
      setHasMore(end < filtered.length);
    }
    setLoading(false);
  }, [movies.length, selectedRating, selectedYear, selectedGenres, allMovies, applyFilters, loading]);

  const toggleGenre = (genreId) => {
    setSelectedGenres((prev) =>
      prev.includes(genreId)
        ? prev.filter((id) => id !== genreId)
        : [...prev, genreId]
    );
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Get Recommendations</h1>
        <p className="mt-2 text-sm text-neutral-400">
          Filter by your preferences to find the perfect movie
        </p>
      </div>

      {/* Filters */}
      <div className="mb-8 grid gap-6 rounded-2xl border border-white/10 bg-neutral-900/40 p-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Rating Filter */}
        <div>
          <label className="block text-sm font-semibold text-neutral-300 mb-3">
            Minimum Rating
          </label>
          <select
            value={selectedRating}
            onChange={(e) => setSelectedRating(Number(e.target.value))}
            className="w-full rounded-lg border border-white/10 bg-neutral-800 px-3 py-2 text-sm text-white focus:border-red-500/50 focus:outline-none focus:ring-2 focus:ring-red-500/20 transition-all"
          >
            {RATING_FILTERS.map((filter) => (
              <option key={filter.value} value={filter.value}>
                {filter.label}
              </option>
            ))}
          </select>
        </div>

        {/* Year Filter */}
        <div>
          <label className="block text-sm font-semibold text-neutral-300 mb-3">
            Release Year
          </label>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
            className="w-full rounded-lg border border-white/10 bg-neutral-800 px-3 py-2 text-sm text-white focus:border-red-500/50 focus:outline-none focus:ring-2 focus:ring-red-500/20 transition-all"
          >
            {YEAR_FILTERS.map((filter) => (
              <option key={filter.value} value={filter.value}>
                {filter.label}
              </option>
            ))}
          </select>
        </div>

        {/* Genre Filter */}
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-neutral-300 mb-3">
            Genres
          </label>
          <div className="flex flex-wrap gap-2">
            {allGenres.slice(0, 8).map((genre) => (
              <button
                key={genre.id}
                onClick={() => toggleGenre(genre.id)}
                className={`rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-300 ${
                  selectedGenres.includes(genre.id)
                    ? "bg-red-600 text-white ring-1 ring-red-400/50"
                    : "bg-neutral-800 text-neutral-300 ring-1 ring-white/10 hover:bg-neutral-700"
                }`}
              >
                {genre.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results */}
      {loading && movies.length === 0 ? (
        <div className="flex justify-center py-16">
          <LoadingSpinner />
        </div>
      ) : movies.length > 0 ? (
        <>
          <div className="mb-6 text-sm text-neutral-400">
            Showing <span className="text-white font-semibold">{movies.length}+</span> recommended movies
          </div>

          <MovieGrid movies={movies} />

          {/* Load More / Loading State */}
          <div className="mt-8 flex justify-center">
            {loading ? (
              <div className="flex flex-col items-center gap-3">
                <LoadingSpinner />
                <p className="text-sm text-neutral-500">Loading more recommendations...</p>
              </div>
            ) : hasMore ? (
              <button
                onClick={loadMore}
                disabled={loading}
                className="rounded-xl bg-gradient-to-r from-red-600 to-orange-500 px-8 py-3 font-semibold text-white transition-all duration-300 hover:shadow-lg hover:shadow-red-500/50 disabled:opacity-50"
              >
                Load More
              </button>
            ) : (
              <p className="text-sm text-neutral-500">No more recommendations</p>
            )}
          </div>

          {/* Infinite Scroll Trigger */}
          <div ref={observerTargetRef} className="mt-12 h-2" />
        </>
      ) : (
        <div className="py-16 text-center">
          <p className="text-lg text-neutral-400">
            No movies found matching your filters
          </p>
          <p className="mt-2 text-sm text-neutral-500">Try adjusting your filter settings</p>
        </div>
      )}
    </div>
  );
}
