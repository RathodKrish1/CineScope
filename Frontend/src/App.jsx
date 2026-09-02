import { BrowserRouter,Routes,Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Movie from "./pages/Movie";
import MovieDetails from "./pages/MovieDetails";
import Series from "./pages/Series";
import Search from "./pages/Search";
import Recommendation from "./pages/Recommendation";

export default function App(){
	return(
		<>
			<div className="flex flex-col mx-1 mt-1">
				<BrowserRouter>
					<Navbar />
					
					<Routes>
						<Route path="/" element={<Home />}/>
						<Route path="/movies" element={<Movie />} />
						<Route path="/movie/:id" element={<MovieDetails />} />
						<Route path="/series" element={<Series />} />
						<Route path="/search" element={<Search />} />
						<Route path="/recommendation" element={<Recommendation />} />
					</Routes>
				</BrowserRouter>
			</div>
		</>
	)
}
