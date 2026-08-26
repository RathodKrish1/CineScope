import express from "express";
import { filterSeries, popularSeries,topRatedSeries,trendingSeries } from "../controllers/seriesController.js";

const router = express.Router();

router.get("/popular",popularSeries);
router.get("/trending",trendingSeries);
router.get("/top_rated",topRatedSeries);
router.get("/filter",filterSeries);
export default router;
  