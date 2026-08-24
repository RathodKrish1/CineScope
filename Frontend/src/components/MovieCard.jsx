
export default function MovieCard({movie}){
    return( 
        <>   
            <div className="">
                <img
                    src={movie.src}
                    alt={movie.name}
                    className=""
                />
                <h2 className="">
                    {movie.name}
                </h2>

                <p className="">
                    {movie.description}
                </p>
                <span className="">
                    Movie
                </span>

                <button className="">
                    View
                </button>
            </div>
             
        </> 
    )
}