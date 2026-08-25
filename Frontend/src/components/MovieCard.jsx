
export default function MovieCard({movie}){
    return( 
        <>   
            <div className="border border-gray-400 rounded-2xl overflow-hidden w-100 mb-2 mt-2">
                <img
                    src={movie.src}
                    alt={movie.name}
                    className="block h-52 w-full object-cover"
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