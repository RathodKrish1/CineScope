//Movies URLs
//Recently on Theater
export const getLatestMovies = async () => {
    const response = await fetch(
        `${process.env.TMDB_BASE_URL}/movie/now_playing?api_key=${process.env.TMDB_API_KEY}`
    );
    if (!response.ok) {
        throw new Error("Failed to fetch latest movies from TMDB");
    }
    return await response.json();
};
//Trending Movie https://api.themoviedb.org/3/trending/movie/{time_window}
export const getTrendingMovies = async (time)=>{
    const response = await fetch(`${process.env.TMDB_BASE_URL}/trending/movie/${time}?api_key=${process.env.TMDB_API_KEY}`);
    if(!response.ok){
        throw new Error("Failed to Fetch Popular Movies");
    }
    return await response.json();
}

//Popular Movie
export const getPopularMovies = async () => {
    const response = await fetch(
        `${process.env.TMDB_BASE_URL}/movie/popular?api_key=${process.env.TMDB_API_KEY}`
    );
    if (!response.ok) {
        throw new Error("Failed to fetch popular movies from TMDB");
    }
    return await response.json();
};
//Top Rated Movies
export const getTopRatedMovies = async () => {
    const response = await fetch(
        `${process.env.TMDB_BASE_URL}/movie/top_rated?api_key=${process.env.TMDB_API_KEY}`
    );
    if (!response.ok) {
        throw new Error("Failed to fetch popular movies from TMDB");
    }
    return await response.json();
};

//Filter Movie 
export const getFilterMovie = async () => {
    const response = await fetch(
        `${process.env.TMDB_BASE_URL}/genre/movie/list?api_key=${process.env.TMDB_API_KEY}`
    );
    if (!response.ok) {
        throw new Error("Failed to fetch latest movies from TMDB");
    }
    return await response.json();
};


//Series URLs

//Popular 
export const getPopularSeries = async ()=>{
    const response = await fetch(`${process.env.TMDB_BASE_URL}/tv/popular?api_key=${process.env.TMDB_API_KEY}`);
    if(!response.ok){
        throw new Error("Failed to Fetch Popular Series");
    }
    return await response.json();
}
//Top Rated Series
export const getTopRatedSeries = async ()=>{
    const response = await fetch(`${process.env.TMDB_BASE_URL}/tv/top_rated?api_key=${process.env.TMDB_API_KEY}`);
    if(!response.ok){
        throw new Error("Failed to Fetch Popular Series");
    }
    return await response.json();
}
//Trending 
export const getTrendingSeries = async (time)=>{
    const response = await fetch(`${process.env.TMDB_BASE_URL}/trending/tv/${time}?api_key=${process.env.TMDB_API_KEY}`);
    if(!response.ok){
        throw new Error("Failed to Fetch Popular Series");
    }
    return await response.json();
}
//Filter Series 
export const getFilterSeries = async () => {
    const response = await fetch(
        `${process.env.TMDB_BASE_URL}/genre/tv/list?api_key=${process.env.TMDB_API_KEY}`
    );
    if (!response.ok) {
        throw new Error("Failed to fetch latest movies from TMDB");
    }
    return await response.json();
};

// Search Both Show
export const getSearchMovie = async (query)=>{
    const response = await fetch(`${process.env.TMDB_BASE_URL}/search/multi?api_key=${process.env.TMDB_API_KEY}&query=${encodeURIComponent(query)}`);
    if (!response.ok) {
        throw new Error("Failed to search");
    }
    const data = await response.json();
    const filteredResults = data.results.filter(
        (item) =>
            item.media_type === "movie" ||
            item.media_type === "tv"
    );

    return {
        ...data,
        result: filteredResults
    };
};