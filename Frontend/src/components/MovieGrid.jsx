import MovieCard from "./MovieCard";

export default function MovieGrid({ movies = [], className = "" }) {
  if (!movies.length) return <div className="empty">Nothing to show right now.</div>;
  return (
    <div className={`grid ${className}`.trim()}>
      {movies.map((item, index) => (
        <MovieCard key={`${item.id}-${item.media_type || ""}-${index}`} movie={item} />
      ))}
    </div>
  );
}
