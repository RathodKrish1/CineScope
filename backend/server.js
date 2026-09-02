import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import movieRoutes from "./routes/movieRoutes.js";
import seriesRoutes from "./routes/seriesRoutes.js"
dotenv.config();

const app = express();

app.use(cors());

app.use("/showtime/movies", movieRoutes);
app.use("/showtime/series",seriesRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
