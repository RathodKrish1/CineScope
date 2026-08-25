import { getLatestMovies,getPopularMovies,getSearchMovie } from "../services/CinescopeService.js";


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
