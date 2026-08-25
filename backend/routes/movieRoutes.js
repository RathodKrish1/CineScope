import express from "express";
import { latestMovie,popularMovie,searchMovieAndSeries } from "../controllers/movieController.js";

const router = express.Router();

router.get("/popular", popularMovie);
router.get("/latest", latestMovie);
router.get("/search",searchMovieAndSeries);
export default router;
