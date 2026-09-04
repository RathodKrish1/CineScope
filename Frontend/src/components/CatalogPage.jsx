import { useEffect, useRef, useState, useCallback } from "react";
import MovieGrid from "./MovieGrid";
import LoadingSpinner from "./LoadingSpinner";

export default function CatalogPage({ title, description, fetchPage, genres = [], showFilters = true, type = "movie" }) {
  const [items,setItems]=useState([]), [page,setPage]=useState(0), [hasMore,setHasMore]=useState(true), [loading,setLoading]=useState(true), [error,setError]=useState("");
  const [rating,setRating]=useState(""), [year,setYear]=useState(""), [genre,setGenre]=useState(""), [sort,setSort]=useState("popularity.desc");
  const trigger=useRef(null);
  const loadingRef=useRef(false);
  const load=useCallback(async(nextPage,replace=false)=>{ if(!replace && loadingRef.current) return; loadingRef.current=true; setLoading(true); setError(""); try{const data=await fetchPage(nextPage,{rating,year,with_genres:genre,sort_by:sort}); const next=data.results||[]; setItems(prev=>replace?next:[...prev,...next]); setPage(nextPage); setHasMore(nextPage < (data.total_pages||1));}catch(e){setError(e.message||"Unable to load results");}finally{loadingRef.current=false;setLoading(false);}},[fetchPage,rating,year,genre,sort]);
  useEffect(()=>{load(1,true);},[rating,year,genre,sort]);
  useEffect(()=>{if(!hasMore||loading)return; const obs=new IntersectionObserver(es=>{if(es[0].isIntersecting)load(page+1);},{rootMargin:"700px"}); if(trigger.current)obs.observe(trigger.current); return()=>obs.disconnect();},[hasMore,loading,page,load]);
  const reset=()=>{setRating("");setYear("");setGenre("");setSort("popularity.desc");};
  return <main className="container page">
    <header className="page-head"><span className="kicker">Cinevo library</span><h1>{title}</h1><p>{description}</p></header>
    {showFilters&&<section className="filter-panel"><div className="filter-top"><h2 className="filter-title">Refine your results</h2><button className="reset" onClick={reset}>Reset filters</button></div><div className="filters">
      <select className="filter-input" value={sort} onChange={e=>setSort(e.target.value)}><option value="popularity.desc">Most popular</option><option value="vote_average.desc">Highest rated</option><option value={type === "series" ? "first_air_date.desc" : "primary_release_date.desc"}>Newest</option><option value="vote_count.desc">Most reviewed</option></select>
      <select className="filter-input" value={rating} onChange={e=>setRating(e.target.value)}><option value="">Any rating</option><option value="6">6+</option><option value="7">7+</option><option value="8">8+</option><option value="9">9+</option></select>
      <select className="filter-input" value={year} onChange={e=>setYear(e.target.value)}><option value="">Any year</option>{Array.from({length:30},(_,i)=>new Date().getFullYear()-i).map(y=><option key={y} value={y}>{y}</option>)}</select>
      <select className="filter-input" value={genre} onChange={e=>setGenre(e.target.value)}><option value="">All genres</option>{genres.map(g=><option key={g.id} value={g.id}>{g.name}</option>)}</select>
    </div></section>}
    {error&&<div className="empty">{error}</div>}
    {loading&&!items.length?<div className="loader-wrap"><LoadingSpinner/></div>:<MovieGrid movies={items}/>}<div ref={trigger} style={{height:1}}/>
    {loading&&items.length?<div className="load-more"><LoadingSpinner/></div>:hasMore?<div className="load-more"><button className="btn btn-secondary" onClick={()=>load(page+1)}>Load more</button></div>:<div className="end-note">You reached the end.</div>}
  </main>;
}
