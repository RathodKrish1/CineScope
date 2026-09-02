import express from "express";
import { latestMovie,popularMovie,searchMovieAndSeries,filterMovie, topRatedMovie,trendingMovie,movieDetails } from "../controllers/movieController.js";

const router = express.Router();

router.get("/popular", popularMovie);
router.get("/latest", latestMovie);
router.get("/search",searchMovieAndSeries);
router.get("/top_rated",topRatedMovie);
router.get("/trending",trendingMovie);
router.get("/trending/:time",trendingMovie);
router.get("/filter",filterMovie);

// Keep this LAST - ":id" is a catch-all-ish dynamic segment and would
// otherwise swallow the literal routes above (e.g. "/popular" would be
// treated as an id).
router.get("/:id", movieDetails);

export default router;