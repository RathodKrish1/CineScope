import MovieCard from "./MovieCard"
import { useState } from "react";

const data = [
    {
        id:1,
        src:"https://tse2.mm.bing.net/th/id/OIP.zjX0voB9Jimzyxlz-ch0fgHaDt?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
        name:"Spider-Man",
        description:"This is Spider-Man Movie."
    },
    {
        id:2,
        src:"https://tse2.mm.bing.net/th/id/OIP.zjX0voB9Jimzyxlz-ch0fgHaDt?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
        name:"Spider-Man",
        description:"This is Spider-Man Movie."
    }
]
export default function MovieGrid(){
    const [movies,setMovie] = useState(data);  
    function newMovie(){
        setMovie()
    }
    return(
        <>
            <div className="flex">
                {
                    movies.map(movie=>(
                        <MovieCard movie={movie}/>
                    ))
                }        
            </div>
            <button onClick={newMovie}>Click</button>
        </>
    )
}