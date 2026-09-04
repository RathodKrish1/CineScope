import {
  getLatestMovies, getPopularMovies, getSearchMovie, getFilterMovie,
  getTopRatedMovies, getTrendingMovies, getMovieDetails,
  getDiscoverMovies, getAnimeMovies
} from "../services/CinescopeService.js";

const safe = (fn, message) => async (req, res) => {
  try { res.json(await fn(req)); }
  catch (err) { res.status(500).json({ message, error: err.message }); }
};

export const latestMovie = safe(req => getLatestMovies(req.query.page || 1), "Failed to fetch now-playing movies");
export const popularMovie = safe(req => getPopularMovies(req.query.page || 1), "Failed to fetch popular movies");
export const topRatedMovie = safe(req => getTopRatedMovies(req.query.page || 1), "Failed to fetch top rated movies");
export const filterMovie = safe(() => getFilterMovie(), "Failed to fetch movie genres");
export const trendingMovie = safe(req => getTrendingMovies(req.params.time || "week", req.query.page || 1), "Failed to fetch trending movies");
export const movieDetails = safe(req => getMovieDetails(req.params.id), "Failed to fetch movie details");
export const searchMovieAndSeries = safe(req => getSearchMovie(req.query.query || "", req.query.page || 1), "Failed to search");
export const discoverMovie = safe(req => getDiscoverMovies({
  page: req.query.page || 1,
  sort_by: req.query.sort_by || "popularity.desc",
  with_genres: req.query.with_genres,
  "vote_average.gte": req.query.rating,
  "primary_release_date.gte": req.query.year ? `${req.query.year}-01-01` : undefined,
  "primary_release_date.lte": req.query.year ? `${req.query.year}-12-31` : undefined,
  with_original_language: req.query.language
}), "Failed to discover movies");
export const animeMovie = safe(req => getAnimeMovies(req.query.page || 1, {
  "vote_average.gte": req.query.rating,
  with_original_language: req.query.language
}), "Failed to fetch anime movies");
