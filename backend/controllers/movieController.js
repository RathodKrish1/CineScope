import { getLatestMovies,getPopularMovies,getSearchMovie,getFilterMovie,getTopRatedMovies,getTrendingMovies,getMovieDetails } from "../services/CinescopeService.js";


//Movies Part
export const latestMovie = (req,res)=>{
  getLatestMovies()
  .then((data)=>{
    res.json(data)
  })
  .catch((err)=>{
    res.status(500).json({
      message: "Failed to fetch latest movies",
      error: err.message,
    })
  })
}

export const popularMovie = (req,res)=>{
  getPopularMovies()
  .then((data)=>{
    res.json(data)
  })
  .catch((err)=>{
    res.status(500).json({
      message: "Failed to fetch latest movies",
      error: err.message,
    });
  })
}

export const topRatedMovie = (req,res)=>{
  getTopRatedMovies()
  .then((data)=>{
    res.json(data)
  })
  .catch((err)=>{
    res.status(500).json({
      message: "Failed to fetch latest movies",
      error: err.message,
    });
  })
}

export const filterMovie = (req,res)=>{
  getFilterMovie()
  .then((data)=>{
    res.json(data);
  })
  .catch((err)=>{
    res.status(500).json({
      message: "Failed to fetch Filter Movie",
      error: err.message,
    })
  })
}

export const trendingMovie = async (req,res)=>{
  try{
    const {time} = req.params;
    const data = await getTrendingMovies(time);
    res.json(data);
  }catch(err){
    res.status(500).json({
      message:"Failed to fetch trending Movie ",
      error: err.message,
    })
  }
}
// Single Movie Details (includes watch providers / streaming availability)
export const movieDetails = async (req,res)=>{
  try{
    const { id } = req.params;
    const data = await getMovieDetails(id);
    res.json(data);
  }catch(err){
    res.status(500).json({
      message: "Failed to fetch movie details",
      error: err.message,
    })
  }
}

// Search Both
export const searchMovieAndSeries = async (req,res)=>{
  try{
    const { query } = req.query;
    if(!query?.trim()){
      return res.json({
        results:[]
      });
    }
    const data = await getSearchMovie(query);
    res.json(data); 
  }catch(err){
    res.status(500).json({
      message: "Failed to fetch latest movies",
      error: err.message,
    });
  }
}
