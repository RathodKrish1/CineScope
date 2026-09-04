import { Link, useLocation } from "react-router-dom";
const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

export default function MovieCard({ movie }) {
  const location = useLocation();
  const isSeries = movie.media_type === "tv" || Boolean(movie.first_air_date);
  const title = movie.title || movie.name || "Untitled";
  const date = movie.release_date || movie.first_air_date || "";
  const poster = movie.poster_path ? `${IMAGE_BASE}${movie.poster_path}` : null;
  const fromHome = location.pathname === "/";
  const target = isSeries ? `/series/${movie.id}` : `/movie/${movie.id}`;

  return <Link state={{ from: fromHome ? "/" : location.pathname }} to={target} className="card">
    <div className="poster">
      {poster ? <img src={poster} alt={title} loading="lazy" /> : <div className="empty">No poster</div>}
      <span className="card-type">{isSeries ? "Series" : "Movie"}</span>
      {movie.vote_average ? <span className="rating">★ {Number(movie.vote_average).toFixed(1)}</span> : null}
      <div className="card-info"><h3 className="card-title">{title}</h3><p className="card-meta">{date.slice(0,4) || "—"}</p></div>
      <div className="card-hover"><span>View details</span></div>
    </div>
  </Link>;
}
