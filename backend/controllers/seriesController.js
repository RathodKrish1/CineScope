import { getPopularSeries,getTrendingSeries } from "../services/CinescopeService.js";

//Popular 
export const popularSeries = async (req,res)=>{
  getPopularSeries()
  .then((data)=>{
    res.json(data)
  })
  .catch((err)=>{
    res.status(500).json({
      message: "Failed to fetch latest movies",
      error: err.message,
    });
  });
}
//Trending Series
export const trendingSeries = async (req,res)=>{
  getTrendingSeries()
  .then((data)=>{
    res.json(data)
  })
  .catch((err)=>{
    res.status(500).json({
      message: "Failed to fetch latest movies",
      error: err.message,
    });
  });
}
