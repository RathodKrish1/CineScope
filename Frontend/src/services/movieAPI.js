const API_URL = "http://localhost:5000/showtime/movies";

async function request(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error("Request failed");
  return response.json();
}

export const getPopularMovies = (page = 1, params = {}) =>
  request(`${API_URL}/popular?page=${page}&${new URLSearchParams(params)}`);

export const getLatestMovies = (page = 1) =>
  request(`${API_URL}/latest?page=${page}`);

export const getTrendingMovies = (time = "week", page = 1) =>
  request(`${API_URL}/trending/${time}?page=${page}`);

export const getTopRatedMovies = (page = 1) =>
  request(`${API_URL}/top_rated?page=${page}`);

export const getMovieDetails = (id) => request(`${API_URL}/${id}`);

export const searchMovies = (query, page = 1) =>
  request(`${API_URL}/search?query=${encodeURIComponent(query)}&page=${page}`);

export const getFilterMovie = () => request(`${API_URL}/filter`);

export const discoverMovies = (params = {}) =>
  request(`${API_URL}/discover?${new URLSearchParams(params)}`);

export const getAnimeMovies = (page = 1, params = {}) =>
  request(`${API_URL}/anime?page=${page}&${new URLSearchParams(params)}`);
