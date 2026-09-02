import { useEffect, useState, useRef, useCallback } from "react";
import { getPopularSeries } from "../services/seriesAPI";
import MovieGrid from "../components/MovieGrid";
import LoadingSpinner from "../components/LoadingSpinner";

const ITEMS_PER_PAGE = 20;

export default function Series() {
  const [series, setSeries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [allSeries, setAllSeries] = useState([]);
  const observerTargetRef = useRef(null);

  // Initial load
  useEffect(() => {
    let active = true;

    getPopularSeries()
      .then((data) => {
        if (!active) return;
        const fetchedSeries = data.results || [];
        setAllSeries(fetchedSeries);
        setSeries(fetchedSeries.slice(0, ITEMS_PER_PAGE));
        setHasMore(fetchedSeries.length > ITEMS_PER_PAGE);
      })
      .catch((error) => {
        console.error(error);
        if (active) setSeries([]);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const loadMore = useCallback(() => {
    setLoading(true);
    const start = series.length;
    const end = start + ITEMS_PER_PAGE;
    const newSeries = allSeries.slice(start, end);

    if (newSeries.length === 0) {
      setHasMore(false);
    } else {
      setSeries((prev) => [...prev, ...newSeries]);
      setHasMore(end < allSeries.length);
    }
    setLoading(false);
  }, [series.length, allSeries]);

  // Infinite scroll observer
  useEffect(() => {
    if (!hasMore || loading) return;

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
  }, [hasMore, loading, loadMore]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Popular Series</h1>
        <p className="mt-2 text-sm text-neutral-400">Discover trending and popular TV series</p>
      </div>

      {loading && series.length === 0 ? (
        <div className="flex justify-center py-16">
          <LoadingSpinner />
        </div>
      ) : (
        <>
          <MovieGrid movies={series} />

          {/* Load More / Loading State */}
          <div className="mt-8 flex justify-center">
            {loading ? (
              <div className="flex flex-col items-center gap-3">
                <LoadingSpinner />
                <p className="text-sm text-neutral-500">Loading more series...</p>
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
              <p className="text-sm text-neutral-500">No more series to load</p>
            )}
          </div>

          {/* Infinite Scroll Trigger */}
          <div ref={observerTargetRef} className="mt-12 h-2" />
        </>
      )}
    </div>
  );
}
