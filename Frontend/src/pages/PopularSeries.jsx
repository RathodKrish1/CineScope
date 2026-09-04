import { useCallback } from "react";
import CatalogPage from "../components/CatalogPage";
import { getPopularSeries } from "../services/seriesAPI";
export default function PopularSeries(){const fetchPage=useCallback(page=>getPopularSeries(page),[]);return <CatalogPage title="Popular Series" description="Series worth adding to your watchlist. Scroll to keep loading more." showFilters={false} fetchPage={fetchPage}/>;}
