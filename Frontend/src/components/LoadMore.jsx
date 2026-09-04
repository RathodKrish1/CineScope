import LoadingSpinner from "./LoadingSpinner";
export default function LoadMore({ loading, hasMore, onClick, label = "Load more" }) {
  if (!hasMore && !loading) return <div className="end-note">You reached the end.</div>;
  return <div className="load-more">{loading ? <LoadingSpinner /> : <button className="btn btn-secondary" onClick={onClick}>{label}</button>}</div>;
}
