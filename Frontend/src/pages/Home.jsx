import TrendingMovie from "../components/TrendingMovie";
import MovieGrid from '../components/MovieGrid';

export default function Home(){
    return(
        <>
            <div>
                <div className="">
                    Trending Shows
                    <TrendingMovie />
                </div>
                <div>
                    <h1>Movies</h1>  
                    <MovieGrid />
                </div>
                <div>
                    <h1>Series</h1>
                </div>
            </div>
        </>
    )
}