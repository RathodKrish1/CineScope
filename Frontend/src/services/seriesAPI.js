const API_URL="http://localhost:5000/showtime/series";
async function request(url){const response=await fetch(url);if(!response.ok)throw new Error(`Request failed (${response.status})`);return response.json()}
export const getSeriesDetails=id=>request(`${API_URL}/${id}`);
export const getPopularSeries=(page=1,params={})=>request(`${API_URL}/popular?page=${page}&${new URLSearchParams(params)}`);
export const getTrendingSeries=(time="week",page=1)=>request(`${API_URL}/trending/${time}?page=${page}`);
export const getTopRatedSeries=(page=1)=>request(`${API_URL}/top_rated?page=${page}`);
export const getFilteredSeries=(params={})=>request(`${API_URL}/filter?${new URLSearchParams(params)}`);
export const getDiscoverSeries=(params={})=>request(`${API_URL}/discover?${new URLSearchParams(params)}`);
export const discoverSeries=getDiscoverSeries;
export const getAnimeSeries=(page=1,params={})=>request(`${API_URL}/anime?page=${page}&${new URLSearchParams(params)}`);
export const getSeriesGenres=()=>request(`${API_URL}/genres`);
export const searchSeries=(query,page=1)=>request(`${API_URL}/search?query=${encodeURIComponent(query)}&page=${page}`);
