import { useState, useEffect, useRef, useCallback } from "react";
import { searchMovies } from "../services/movieAPI";
import MovieGrid from "../components/MovieGrid";
import LoadingSpinner from "../components/LoadingSpinner";

export default function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const searchTimeoutRef = useRef(null);
  const observerTargetRef = useRef(null);

  // Debounced search
  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    if (!query.trim()) {
      setResults([]);
      setPage(1);
      return;
    }

    setLoading(true);

    searchTimeoutRef.current = setTimeout(() => {
      searchMovies(query, 1)
        .then((data) => {
          setResults(data.results || []);
          setPage(1);
          setTotalPages(data.total_pages || 0);
          setHasMore((data.page || 1) < (data.total_pages || 1));
        })
        .catch((error) => {
          console.error(error);
          setResults([]);
        })
        .finally(() => setLoading(false));
    }, 300);

    return () => {
      if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
    };
  }, [query]);

  const loadMore = useCallback(() => {
    const nextPage = page + 1;
    if (nextPage > totalPages) return;

    setLoading(true);
    searchMovies(query, nextPage)
      .then((data) => {
        setResults((prev) => [...prev, ...(data.results || [])]);
        setPage(nextPage);
        setHasMore(nextPage < (data.total_pages || 0));
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, [query, page, totalPages]);

  // Intersection Observer for infinite scroll
  useEffect(() => {
    if (!query.trim() || !hasMore || loading || page >= totalPages) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        loadMore();
      }
    });

    const currentRef = observerTargetRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [page, hasMore, query, totalPages, loading, loadMore]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      {/* Search Header */}
      <div className="mb-8">
        <h1 className="mb-4 text-3xl font-bold text-white">Search Movies & Series</h1>
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by title, actor, director..."
            className="w-full rounded-xl border border-white/20 bg-neutral-900/50 px-5 py-3 text-white placeholder-neutral-500 backdrop-blur-md transition-all duration-300 focus:border-red-500/50 focus:outline-none focus:ring-2 focus:ring-red-500/20"
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500">
            🔍
          </span>
        </div>
      </div>

      {/* Results Count */}
      {query && !loading && results.length > 0 && (
        <p className="mb-6 text-sm text-neutral-400">
          Found <span className="text-white font-semibold">{results.length}+</span> results for{" "}
          <span className="text-white font-semibold">"{query}"</span>
        </p>
      )}

      {/* Empty State */}
      {query && !loading && results.length === 0 && (
        <div className="py-16 text-center">
          <p className="text-lg text-neutral-400">
            No results found for <span className="text-white">"{query}"</span>
          </p>
          <p className="mt-2 text-sm text-neutral-500">Try a different search term</p>
        </div>
      )}

      {/* Results Grid */}
      {results.length > 0 && (
        <>
          <MovieGrid movies={results} />

          {/* Load More / Loading State */}
          <div className="mt-8 flex justify-center">
            {loading ? (
              <div className="flex flex-col items-center gap-3">
                <LoadingSpinner />
                <p className="text-sm text-neutral-500">Loading more results...</p>
              </div>
            ) : hasMore && page < totalPages ? (
              <button
                onClick={loadMore}
                disabled={loading}
                className="rounded-xl bg-gradient-to-r from-red-600 to-orange-500 px-8 py-3 font-semibold text-white transition-all duration-300 hover:shadow-lg hover:shadow-red-500/50 disabled:opacity-50"
              >
                Load More
              </button>
            ) : results.length > 0 && totalPages > 0 ? (
              <p className="text-sm text-neutral-500">No more results</p>
            ) : null}
          </div>

          {/* Infinite Scroll Trigger */}
          <div ref={observerTargetRef} className="mt-12 h-2" />
        </>
      )}

      {/* Initial Empty State */}
      {!query && (
        <div className="py-20 text-center">
          <p className="text-2xl text-neutral-500">Start searching to find movies and series</p>
        </div>
      )}
    </div>
  );
}
