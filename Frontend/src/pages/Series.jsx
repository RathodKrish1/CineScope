import { useCallback, useEffect, useState } from "react";
import CatalogPage from "../components/CatalogPage";
import { getSeriesGenres, discoverSeries } from "../services/seriesAPI";
export default function Series(){const [genres,setGenres]=useState([]);useEffect(()=>{getSeriesGenres().then(d=>setGenres(d.genres||[])).catch(console.error)},[]);const fetchPage=useCallback((page,params)=>discoverSeries({page,...params}),[]);return <CatalogPage title="Series" description="Find your next binge with powerful filters for TV series." genres={genres} type="series" fetchPage={fetchPage}/>;}
