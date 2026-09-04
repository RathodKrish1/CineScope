import { useCallback, useEffect, useState } from "react";
import CatalogPage from "../components/CatalogPage";
import { getFilterMovie, discoverMovies } from "../services/movieAPI";
export default function Movie(){const [genres,setGenres]=useState([]);useEffect(()=>{getFilterMovie().then(d=>setGenres(d.genres||[])).catch(console.error)},[]);const fetchPage=useCallback((page,params)=>discoverMovies({page,...params}),[]);return <CatalogPage title="Movies" description="Explore movies with filters for genre, rating, year and popularity." genres={genres} fetchPage={fetchPage}/>;}
