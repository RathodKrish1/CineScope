import express from "express";
import { getMovieController } from "../controllers/movieController.js";

const router = express.Router();

router.get("/popular", getMovieController);

export default router;
