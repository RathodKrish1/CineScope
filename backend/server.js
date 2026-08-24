import express from "express";
import dotenv from "dotenv";
import movieRoutes from "./routes/movieRoutes.js";

dotenv.config();

const app = express();

app.use("/api/movies", movieRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
``