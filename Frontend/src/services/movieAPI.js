const API_URL = "http://localhost:5000/showtime/movies";

export const getPopularMovies = async () => {
  const response = await fetch(`${API_URL}/popular`);

  if (!response.ok) {
    throw new Error("Failed to fetch popular movies");
  }

  return response.json();
};

export const getLatestMovies = async () => {
  const response = await fetch(`${API_URL}/latest`);

  if (!response.ok) {
    throw new Error("Failed to fetch latest movies");
  }

  return response.json();
};

export const getTrendingMovies = async () => {
  const response = await fetch(`${API_URL}/trending`);

  if (!response.ok) {
    throw new Error("Failed to fetch trending movies");
  }

  return response.json();
};

export const getTopRatedMovies = async () => {
  const response = await fetch(`${API_URL}/top_rated`);

  if (!response.ok) {
    throw new Error("Failed to fetch top rated movies");
  }

  return response.json();
};

export const getMovieDetails = async (id) => {
  const response = await fetch(`${API_URL}/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch movie details");
  }

  return response.json();
};

export const searchMovies = async (query, page = 1) => {
  const response = await fetch(`${API_URL}/search?query=${encodeURIComponent(query)}&page=${page}`);

  if (!response.ok) {
    throw new Error("Failed to search movies");
  }

  return response.json();
};

export const getFilterMovie = async () => {
  const response = await fetch(`${API_URL}/filter`);

  if (!response.ok) {
    throw new Error("Failed to fetch movie filters/genres");
  }

  return response.json();
};
