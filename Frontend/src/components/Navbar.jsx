import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

const LINKS = [
  ["/movies", "Movies"], ["/series", "Series"], ["/anime", "Anime"],
  ["/recommendation", "For You"], ["/search", "Search"],
];

export default function Navbar() {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const active = (path) => location.pathname === path || location.pathname.startsWith(`${path}/`);

  return <header className="navbar">
    <div className="nav-inner">
      <Link to="/" className="brand" aria-label="Cinevo home">
        <span className="brand-dot" />
        <span>Cine<span className="brand-mark">vo</span></span>
      </Link>
      <nav className="nav-links" aria-label="Main navigation">
        {LINKS.map(([to, label]) => <Link key={to} to={to} className={`nav-link ${active(to) ? "active" : ""}`}>{label}</Link>)}
      </nav>
      <div className="nav-actions">
        <Link className="nav-search" to="/search" aria-label="Search">⌕</Link>
        <button className="menu-btn" onClick={() => setOpen(v => !v)} aria-label="Toggle navigation" aria-expanded={open}>☰</button>
      </div>
    </div>
    <div className={`mobile-menu ${open ? "open" : ""}`}>
      {LINKS.map(([to, label]) => <Link onClick={() => setOpen(false)} key={to} to={to} className={`nav-link ${active(to) ? "active" : ""}`}>{label}</Link>)}
    </div>
  </header>;
}
