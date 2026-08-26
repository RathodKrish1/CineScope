import TrendingMovie from "../components/TrendingMovie";
import TrendingSeries from "../components/TrendingSeries";
import NewMovies from "../components/NewMovies";
import { getPopularMovies } from "../services/movieAPI";
import { useEffect,useState } from "react";

export default function Home(){
    const [popularMovies,setPopularMovies] = useState([]);
    useEffect(()=>{
        const fetchMovies = async()=>{
            try{
                const data = await getPopularMovies();
                console.log(data);
                setPopularMovies(data);
            }catch(error){
                console.log(error);
            }
        }
        fetchMovies();
    },[])
    return(
        <>
            <div className="mt-2">
                <NewMovies />
                <div className="grid grid-cols-2 divide-x divide-gray-400 mt-5 ">
                    <div className="">
                        Trending Movies
                        <TrendingMovie />
                    </div>
                    <div>
                        <h1>Trending Series</h1>
                        <TrendingSeries />
                    </div>
                </div>

                

            </div>
        </>
    )
}