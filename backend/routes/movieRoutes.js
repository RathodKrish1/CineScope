import express from "express";
import { latestMovie, popularMovie, searchMovieAndSeries, filterMovie, topRatedMovie, trendingMovie, movieDetails, discoverMovie, animeMovie } from "../controllers/movieController.js";
const router = express.Router();

router.get("/popular", popularMovie);
router.get("/latest", latestMovie);
router.get("/search", searchMovieAndSeries);
router.get("/top_rated", topRatedMovie);
router.get("/trending/:time", trendingMovie);
router.get("/trending", trendingMovie);
router.get("/filter", filterMovie);
router.get("/discover", discoverMovie);
router.get("/anime", animeMovie);
router.get("/:id", movieDetails);
export default router;
 