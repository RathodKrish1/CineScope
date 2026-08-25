import TrendingMovie from "../components/TrendingMovie";
import TrendingSeries from "../components/TrendingSeries";
import NewMovies from "../components/NewMovies";

export default function Home(){
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