import express from "express";
import { filterSeries, popularSeries, topRatedSeries, trendingSeries, discoverSeries, animeSeries, seriesDetails } from "../controllers/seriesController.js";
const router = express.Router();

router.get("/popular", popularSeries);
router.get("/trending/:time", trendingSeries);
router.get("/trending", trendingSeries);
router.get("/top_rated", topRatedSeries);
router.get("/filter", filterSeries);
router.get("/genres", filterSeries);
router.get("/discover", discoverSeries);
router.get("/anime", animeSeries);
router.get("/:id", seriesDetails);
export default router;
