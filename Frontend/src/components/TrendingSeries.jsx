import { useEffect,useState } from "react";
import MovieGrid from "./MovieGrid";
import { getTrendingSeries } from "../services/seriesAPI";
export default function TrendingSeries(){const [items,setItems]=useState([]);useEffect(()=>{getTrendingSeries("week",1).then(d=>setItems(d.results||[])).catch(console.error)},[]);return <section><div className="section-head"><h2 className="section-title">Trending Series</h2></div><MovieGrid movies={items}/></section>}
