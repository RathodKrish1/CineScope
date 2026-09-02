import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getMovieDetails } from "../services/movieAPI";

const BACKDROP_BASE = "https://image.tmdb.org/t/p/original";
const POSTER_BASE = "https://image.tmdb.org/t/p/w342";
const LOGO_BASE = "https://image.tmdb.org/t/p/w92";

const REGIONS = [
  { code: "IN", label: "India" },
  { code: "US", label: "United States" },
  { code: "GB", label: "United Kingdom" },
  { code: "CA", label: "Canada" },
  { code: "AU", label: "Australia" },
];

function ProviderRow({ label, providers }) {
  if (!providers?.length) return null;

  return (
    <div className="mb-4 last:mb-0">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-neutral-400">
        {label}
      </p>
      <div className="flex flex-wrap gap-3">
        {providers.map((p) => (
          <div
            key={p.provider_id}
            title={p.provider_name}
            className="flex items-center gap-2 rounded-full bg-neutral-800 py-1.5 pl-1.5 pr-3 ring-1 ring-white/10"
          >
            {p.logo_path && (
              <img
                src={`${LOGO_BASE}${p.logo_path}`}
                alt={p.provider_name}
                className="h-6 w-6 rounded-full object-cover"
              />
            )}
            <span className="text-xs text-neutral-200">{p.provider_name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [region, setRegion] = useState("IN");

  useEffect(() => {
    let active = true;

    getMovieDetails(id)
      .then((data) => {
        if (!active) return;
        setMovie(data);
        setError(null);
      })
      .catch((err) => {
        if (active) setError(err.message);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [id]);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <p className="text-sm text-neutral-500">Loading movie...</p>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="flex h-64 flex-col items-center justify-center gap-3">
        <p className="text-sm text-neutral-500">
          Couldn't load this movie right now.
        </p>
        <Link to="/" className="text-sm text-red-400 underline">
          Go back home
        </Link>
      </div>
    );
  }

  const providersByRegion = movie["watch/providers"]?.results || {};
  const providers = providersByRegion[region];
  const providerLink = providers?.link;
  const hasAnyProviders =
    providers?.flatrate?.length ||
    providers?.rent?.length ||
    providers?.buy?.length;

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <Link
        to="/"
        className="mb-4 inline-block text-sm text-neutral-400 hover:text-white"
      >
        ← Back
      </Link>

      {/* Hero */}
      <div className="relative overflow-hidden rounded-3xl bg-neutral-900">
        {movie.backdrop_path && (
          <img
            src={`${BACKDROP_BASE}${movie.backdrop_path}`}
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-25"
          />
        )}
        <div className="relative flex flex-col gap-6 bg-gradient-to-t from-black via-black/80 to-black/50 p-6 md:flex-row md:p-10">
          {movie.poster_path && (
            <img
              src={`${POSTER_BASE}${movie.poster_path}`}
              alt={movie.title}
              className="w-40 flex-shrink-0 self-center rounded-xl shadow-2xl ring-1 ring-white/10 md:w-56 md:self-start"
            />
          )}

          <div className="flex-1">
            <h1 className="text-2xl font-bold text-white md:text-4xl">
              {movie.title}
            </h1>
            {movie.tagline && (
              <p className="mt-1 italic text-neutral-400">{movie.tagline}</p>
            )}

            <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-neutral-300">
              {movie.vote_average > 0 && (
                <span className="flex items-center gap-1 rounded-full bg-black/50 px-3 py-1 ring-1 ring-white/10">
                  <span className="text-amber-400">★</span>
                  {movie.vote_average.toFixed(1)}
                </span>
              )}
              {movie.release_date && <span>{movie.release_date.slice(0, 4)}</span>}
              {movie.runtime > 0 && <span>{movie.runtime} min</span>}
            </div>

            {movie.genres?.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {movie.genres.map((g) => (
                  <span
                    key={g.id}
                    className="rounded-full bg-white/5 px-3 py-1 text-xs text-neutral-300 ring-1 ring-white/10"
                  >
                    {g.name}
                  </span>
                ))}
              </div>
            )}

            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-neutral-300">
              {movie.overview || "No description available."}
            </p>
          </div>
        </div>
      </div>

      {/* Where to watch */}
      <section className="mt-8 rounded-2xl border border-white/10 bg-neutral-900/40 p-6">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-lg font-bold text-white">Where to Watch</h2>
          <select
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className="rounded-lg border border-white/10 bg-neutral-800 px-3 py-1.5 text-sm text-neutral-200 focus:outline-none focus:ring-2 focus:ring-red-500/50"
          >
            {REGIONS.map((r) => (
              <option key={r.code} value={r.code}>
                {r.label}
              </option>
            ))}
          </select>
        </div>

        {hasAnyProviders ? (
          <>
            <ProviderRow label="Stream" providers={providers.flatrate} />
            <ProviderRow label="Rent" providers={providers.rent} />
            <ProviderRow label="Buy" providers={providers.buy} />
            {providerLink && (
              <a
                href={providerLink}
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-block text-xs text-red-400 underline"
              >
                See all options on JustWatch
              </a>
            )}
          </>
        ) : (
          <p className="text-sm text-neutral-500">
            Not currently available to stream, rent, or buy in this region.
          </p>
        )}

        <p className="mt-4 text-[11px] text-neutral-600">
          Streaming availability data provided by JustWatch.
        </p>
      </section>
    </div>
  );
}
