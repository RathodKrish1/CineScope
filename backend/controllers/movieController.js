export const getMovieController = (req, res) => {
  fetch(
    `${process.env.TMDB_BASE_URL}/movie/popular?api_key=${process.env.TMDB_API_KEY}`
  )
    .then((response) => response.json())
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.status(500).json({
        message: "Failed to fetch movies",
        error: error.message,
      });
    });
};
