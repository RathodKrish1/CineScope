import express from "express";
import { popularSeries,trendingSeries } from "../controllers/seriesController.js";

const router = express.Router();

router.get("/popular",popularSeries);
router.get("/trending",trendingSeries);
export default router;
