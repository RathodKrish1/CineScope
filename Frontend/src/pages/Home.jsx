import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import MovieGrid from "../components/MovieGrid";
import LoadingSpinner from "../components/LoadingSpinner";
import { getLatestMovies, getTrendingMovies, getPopularMovies } from "../services/movieAPI";
import { getTrendingSeries, getPopularSeries } from "../services/seriesAPI";

function Section({ title, eyebrow, children, to }) {
  return <section className="section"><div className="section-head"><div><p className="section-eyebrow">{eyebrow}</p><h2 className="section-title">{title}</h2></div>{to&&<Link className="section-link" to={to}>View all →</Link>}</div><div className="section-panel">{children}</div></section>;
}

function useInfiniteSection(fetcher, initial=[]) {
  const [items,setItems]=useState(initial),[page,setPage]=useState(1),[more,setMore]=useState(true),[loading,setLoading]=useState(false);
  const load=useCallback(async()=>{if(loading||!more)return;setLoading(true);try{const p=page+1,d=await fetcher(p);setItems(x=>[...x,...(d.results||[])]);setPage(p);setMore(p<(d.total_pages||1));}catch(e){console.error(e)}finally{setLoading(false)}} ,[loading,more,page,fetcher]);
  return {items,setItems,page,setPage,more,setMore,loading,load};
}

export default function Home(){
 const movieFetcher=useCallback(p=>getTrendingMovies("week",p),[]);
 const seriesFetcher=useCallback(p=>getTrendingSeries("week",p),[]);
 const [theater,setTheater]=useState([]),[theaterIndex,setTheaterIndex]=useState(0),[initial,setInitial]=useState(true),[error,setError]=useState("");
 const movies=useInfiniteSection(movieFetcher);
 const series=useInfiniteSection(seriesFetcher);
 const [popularMovies,setPopularMovies]=useState([]),[popularSeries,setPopularSeries]=useState([]);
 const movieTrigger=useRef(null),seriesTrigger=useRef(null);
 useEffect(()=>{Promise.all([getLatestMovies(1),getTrendingMovies("week",1),getTrendingSeries("week",1),getPopularMovies(1),getPopularSeries(1)]).then(([t,tm,ts,pm,ps])=>{setTheater((t.results||[]).filter((item)=>item.poster_path));movies.setItems(tm.results||[]);movies.setPage(1);movies.setMore(1<(tm.total_pages||1));series.setItems(ts.results||[]);series.setPage(1);series.setMore(1<(ts.total_pages||1));setPopularMovies(pm.results||[]);setPopularSeries(ps.results||[])}).catch(e=>setError(e.message||"Unable to load the home page")).finally(()=>setInitial(false));},[]);
 useEffect(()=>{
   if (!theater.length) return undefined;
   const timer = setInterval(()=>setTheaterIndex((i)=>(i+1)%theater.length), 4500);
   return ()=>clearInterval(timer);
 },[theater.length]);
 useEffect(()=>{const setup=(ref,fn)=>{const obs=new IntersectionObserver(e=>e[0].isIntersecting&&fn(),{rootMargin:"500px"});if(ref.current)obs.observe(ref.current);return obs};const a=setup(movieTrigger,movies.load),b=setup(seriesTrigger,series.load);return()=>{a.disconnect();b.disconnect()}},[movies.load,series.load]);
 return <main className="container page">
   <section className="home-hero"><div className="home-hero-glow"/><div className="hero-content"><div className="hero-topline"><span className="status-dot"/> Your next watch starts here</div><h1>Find something<br/><span>worth watching.</span></h1><p>Movies, series and anime picked for the way you actually watch. Explore what is trending, popular, new and worth your time.</p><div className="actions"><Link className="btn btn-primary" to="/search">Explore library <span>→</span></Link><Link className="btn btn-secondary" to="/recommendation">Build my pick <span>✦</span></Link></div><div className="hero-stats"><span><b>Movies</b><small>Discover</small></span><span><b>Series</b><small>Binge next</small></span><span><b>Anime</b><small>Explore</small></span></div></div></section>
   {theater.length>0&&(()=>{
     const item=theater[theaterIndex%theater.length];
     return <section className="theatre theatre-carousel">
       {theater.map((movie,index)=><img key={`${movie.id}-bg`} className={`theatre-bg theatre-slide ${index===theaterIndex?"is-active":""}`} src={`https://image.tmdb.org/t/p/original${movie.backdrop_path||movie.poster_path}`} alt=""/>)}
       <div className="theatre-overlay"/>
       <div className="theatre-content theatre-slide-content">
         <img className="theatre-poster" src={`https://image.tmdb.org/t/p/w342${item.poster_path}`} alt={item.title}/>
         <div className="theatre-copy">
           <span className="badge">Now in theatres</span>
           <p className="theatre-count">{String(theaterIndex+1).padStart(2,"0")} / {String(theater.length).padStart(2,"0")}</p>
           <h2>{item.title}</h2>
           <p>{item.overview||"No description available."}</p>
           <Link className="btn btn-primary" to={`/movie/${item.id}`}>View movie</Link>
         </div>
       </div>
       <div className="theatre-dots">{theater.slice(0,8).map((movie,index)=><button key={movie.id} aria-label={`Show ${movie.title}`} className={index===theaterIndex?"active":""} onClick={()=>setTheaterIndex(index)}/>)}</div>
     </section>;
   })()}
   {initial?<div className="loader-wrap"><LoadingSpinner/></div>:error?<div className="empty">{error}</div>:<>
    <Section title="Popular Movies" eyebrow="Audience favorites" to="/popular-movie"><MovieGrid movies={popularMovies.slice(0,7)}/></Section>
    <Section title="Popular Series" eyebrow="Binge-worthy picks" to="/popular-series"><MovieGrid movies={popularSeries.slice(0,7)}/></Section>
    <Section title="Trending Movies" eyebrow="What people are watching"><MovieGrid movies={movies.items} className="horizontal-scroll"/><div ref={movieTrigger} style={{height:1}}/>{movies.loading&&<div className="load-more"><LoadingSpinner/></div>}{!movies.more&&!movies.loading&&<div className="end-note">No more trending movies.</div>}</Section>
    <Section title="Trending Series" eyebrow="Your next binge"><MovieGrid movies={series.items} className="horizontal-scroll"/><div ref={seriesTrigger} style={{height:1}}/>{series.loading&&<div className="load-more"><LoadingSpinner/></div>}{!series.more&&!series.loading&&<div className="end-note">No more trending series.</div>}</Section>
   </>}
 </main>;
}
