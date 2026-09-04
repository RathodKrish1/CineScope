import { useCallback } from "react";
import CatalogPage from "../components/CatalogPage";
import { getPopularMovies } from "../services/movieAPI";
export default function PopularMovie(){const fetchPage=useCallback(page=>getPopularMovies(page),[]);return <CatalogPage title="Popular Movies" description="The movies getting the most attention right now. Scroll to keep loading the list." showFilters={false} fetchPage={fetchPage}/>;}
