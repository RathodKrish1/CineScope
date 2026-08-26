import { getPopularSeries,getTrendingSeries,getFilterSeries,getTopRatedSeries } from "../services/CinescopeService.js";

// Series Part
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

export const trendingSeries = async (req,res)=>{
  try{
    const {time} = req.params;
    const data = await getTrendingSeries(time);
    res.json(data);
  }catch(err){
    res.status(500).json({
      message:"Failed to fetch trending series ",
      error: err.message,
    })
  }
}

export const topRatedSeries = async (req,res)=>{
  getTopRatedSeries()
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

export const filterSeries = async (req,res)=>{
  getFilterSeries()
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