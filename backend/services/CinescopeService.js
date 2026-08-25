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



//Series URLs

//Popular 
export const getPopularSeries = async ()=>{
    const response = await fetch(`${process.env.TMDB_BASE_URL}/tv/popular?api_key=${process.env.TMDB_API_KEY}`);
    if(!response.ok){
        throw new Error("Failed to Fetch Popular Series");
    }
    return await response.json();
}

//Trending 
export const getTrendingSeries = async ()=>{
    const response = await fetch(`${process.env.TMDB_BASE_URL}/tv/on_the_air?api_key=${process.env.TMDB_API_KEY}`);
    if(!response.ok){
        throw new Error("Failed to Fetch Popular Series");
    }
    return await response.json();
}

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