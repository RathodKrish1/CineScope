import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Movie from "./pages/Movie";
import Series from "./pages/Series";
import PopularMovie from "./pages/PopularMovie";
import PopularSeries from "./pages/PopularSeries";
import Anime from "./pages/Anime";
import MovieDetails from "./pages/MovieDetails";
import SeriesDetails from "./pages/SeriesDetails";
import Search from "./pages/Search";
import Recommendation from "./pages/Recommendation";

export default function App() {
  return <BrowserRouter>
    <div className="min-h-screen">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movie />} />
        <Route path="/popular-movie" element={<PopularMovie />} />
        <Route path="/series" element={<Series />} />
        <Route path="/popular-series" element={<PopularSeries />} />
        <Route path="/anime" element={<Anime />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/series/:id" element={<SeriesDetails />} />
        <Route path="/search" element={<Search />} />
        <Route path="/recommendation" element={<Recommendation />} />
      </Routes>
    </div>
  </BrowserRouter>;
}
