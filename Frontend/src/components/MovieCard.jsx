import { Link } from "react-router-dom";

const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

export default function MovieCard({ movie, index = 0 }) {
    const title = movie.title || movie.name || "Untitled";
    const year = (movie.release_date || movie.first_air_date || "").slice(0, 4);
    const rating = movie.vote_average ? movie.vote_average.toFixed(1) : null;
    const poster = movie.poster_path ? `${IMAGE_BASE}${movie.poster_path}` : null;

    return (
        <Link
            to={`/movie/${movie.id}`}
            style={{ animationDelay: `${index * 30}ms` }}
            className="group relative block overflow-hidden rounded-2xl bg-neutral-900 ring-1 ring-white/10 shadow-lg transition-all duration-500 ease-out hover:-translate-y-2 hover:ring-red-500/40 hover:shadow-2xl hover:shadow-red-500/10 animate-in fade-in slide-in-from-bottom-4"
        >
            <div className="relative aspect-[2/3] w-full overflow-hidden bg-neutral-800">
                {poster ? (
                    <img
                        src={poster}
                        alt={title}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center p-4 text-center text-xs text-neutral-500">
                        {title}
                    </div>
                )}

                {rating && (
                    <div className="absolute top-2 right-2 flex items-center gap-1 rounded-full bg-black/70 px-2 py-0.5 text-xs font-semibold text-white backdrop-blur-sm ring-1 ring-white/10 transition-all duration-300 group-hover:bg-red-600/80 group-hover:ring-red-400/50">
                        <span className="text-amber-400">★</span>
                        {rating}
                    </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/10 to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-95" />

                <div className="absolute inset-x-0 bottom-0 p-3 transition-all duration-300 group-hover:pb-8">
                    <h3 className="line-clamp-2 text-sm font-semibold text-white transition-all duration-300">
                        {title}
                    </h3>
                    {year && <p className="mt-0.5 text-xs text-neutral-400">{year}</p>}
                </div>

                <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-all duration-300 group-hover:opacity-100">
                    <span className="rounded-full bg-white/10 px-4 py-2 text-xs font-medium text-white backdrop-blur-md ring-1 ring-white/30 transition-all duration-300 group-hover:scale-110">
                        View details
                    </span>
                </div>
            </div>
        </Link>
    );
}
