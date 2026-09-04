const tmdb = async (path, params = {}) => {
  if (!process.env.TMDB_BASE_URL || !process.env.TMDB_API_KEY) throw new Error("TMDB_BASE_URL and TMDB_API_KEY are required");
  const url = new URL(`${process.env.TMDB_BASE_URL}${path}`);
  url.searchParams.set("api_key", process.env.TMDB_API_KEY);
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") url.searchParams.set(key, value);
  });
  const response = await fetch(url);
  if (!response.ok) throw new Error(`TMDB request failed: ${response.status}`);
  return response.json();
};

export const getLatestMovies = (page = 1) => tmdb("/movie/now_playing", { page });
export const getTrendingMovies = (time = "week", page = 1) => tmdb(`/trending/movie/${time}`, { page });
export const getMovieDetails = (id) => tmdb(`/movie/${id}`, { append_to_response: "watch/providers" });
export const getPopularMovies = (page = 1) => tmdb("/movie/popular", { page });
export const getTopRatedMovies = (page = 1) => tmdb("/movie/top_rated", { page });
export const getFilterMovie = () => tmdb("/genre/movie/list");
export const getDiscoverMovies = (params = {}) => tmdb("/discover/movie", params);
export const getAnimeMovies = (page = 1, params = {}) =>
  tmdb("/discover/movie", { with_genres: 16, sort_by: "popularity.desc", page, ...params });

export const getSeriesDetails = (id) => tmdb(`/tv/${id}`, { append_to_response: "watch/providers" });
export const getPopularSeries = (page = 1) => tmdb("/tv/popular", { page });
export const getTopRatedSeries = (page = 1) => tmdb("/tv/top_rated", { page });
export const getTrendingSeries = (time = "week", page = 1) => tmdb(`/trending/tv/${time}`, { page });
export const getFilterSeries = () => tmdb("/genre/tv/list");
export const getDiscoverSeries = (params = {}) => tmdb("/discover/tv", params);
export const getAnimeSeries = (page = 1, params = {}) =>
  tmdb("/discover/tv", { with_genres: 16, sort_by: "popularity.desc", page, ...params });

export const getSearchMovie = (query, page = 1) =>
  tmdb("/search/multi", { query, page }).then(data => ({
    ...data,
    results: (data.results || []).filter(item => item.media_type === "movie" || item.media_type === "tv")
  }));
