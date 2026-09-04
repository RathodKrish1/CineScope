import { useEffect,useState } from "react";
import MovieGrid from "./MovieGrid";
import { getPopularSeries } from "../services/seriesAPI";
export default function NewMovies(){const[items,setItems]=useState([]);useEffect(()=>{getPopularSeries(1).then(d=>setItems(d.results||[])).catch(console.error)},[]);return <section className="section"><div className="section-head"><div><p className="section-eyebrow">Binge-worthy</p><h2 className="section-title">Popular Series</h2></div></div><div className="section-panel"><MovieGrid movies={items.slice(0,6)}/></div></section>}
