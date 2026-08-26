import express from "express";
import { latestMovie,popularMovie,searchMovieAndSeries,filterMovie, topRatedMovie,trendingMovie } from "../controllers/movieController.js";

const router = express.Router();

router.get("/popular", popularMovie);
router.get("/latest", latestMovie);
router.get("/search",searchMovieAndSeries);
router.get("/top_rated",topRatedMovie);
router.get("/trending",trendingMovie);
router.get("/filter",filterMovie);

export default router;