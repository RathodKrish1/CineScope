import {
  getPopularSeries, getTrendingSeries, getFilterSeries, getTopRatedSeries,
  getDiscoverSeries, getAnimeSeries, getSeriesDetails
} from "../services/CinescopeService.js";

const safe = (fn, message) => async (req, res) => {
  try { res.json(await fn(req)); }
  catch (err) { res.status(500).json({ message, error: err.message }); }
};

export const seriesDetails = safe(req => getSeriesDetails(req.params.id), "Failed to fetch series details");
export const popularSeries = safe(req => getPopularSeries(req.query.page || 1), "Failed to fetch popular series");
export const trendingSeries = safe(req => getTrendingSeries(req.params.time || "week", req.query.page || 1), "Failed to fetch trending series");
export const topRatedSeries = safe(req => getTopRatedSeries(req.query.page || 1), "Failed to fetch top rated series");
export const filterSeries = safe(() => getFilterSeries(), "Failed to fetch series genres");
export const discoverSeries = safe(req => getDiscoverSeries({
  page: req.query.page || 1,
  sort_by: req.query.sort_by || "popularity.desc",
  with_genres: req.query.with_genres,
  "vote_average.gte": req.query.rating,
  "first_air_date.gte": req.query.year ? `${req.query.year}-01-01` : undefined,
  "first_air_date.lte": req.query.year ? `${req.query.year}-12-31` : undefined,
  with_original_language: req.query.language
}), "Failed to discover series");
export const animeSeries = safe(req => getAnimeSeries(req.query.page || 1, {
  "vote_average.gte": req.query.rating,
  with_original_language: req.query.language
}), "Failed to fetch anime series");
