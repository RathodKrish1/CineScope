const API_URL = "http://localhost:5000/showtime/series";

export const getPopularSeries = async () => {
  const response = await fetch(`${API_URL}/popular`);

  if (!response.ok) {
    throw new Error("Failed to fetch popular series");
  }

  return response.json();
};

export const getTrendingSeries = async () => {
  const response = await fetch(`${API_URL}/trending`);

  if (!response.ok) {
    throw new Error("Failed to fetch trending series");
  }

  return response.json();
};

export const getTopRatedSeries = async () => {
  const response = await fetch(`${API_URL}/top_rated`);

  if (!response.ok) {
    throw new Error("Failed to fetch top rated series");
  }

  return response.json();
};

export const getFilteredSeries = async (params) => {
  const response = await fetch(`${API_URL}/filter?${params}`);

  if (!response.ok) {
    throw new Error("Failed to fetch filtered series");
  }

  return response.json();
};

export const searchSeries = async (query, page = 1) => {
  const response = await fetch(`${API_URL}/search?query=${encodeURIComponent(query)}&page=${page}`);

  if (!response.ok) {
    throw new Error("Failed to search series");
  }

  return response.json();
};
