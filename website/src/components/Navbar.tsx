import { NavLink, useNavigate, useLocation } from 'react-router-dom';

const links = [
  { to: '/', label: 'Dashboard', end: true },
  { to: '/financials', label: 'Financials' },
  { to: '/segments', label: 'Segments' },
  { to: '/ratios', label: 'Ratios' },
  { to: '/benchmarking', label: 'Benchmarking' },
  { to: '/verdict', label: 'Verdict' },
  { to: '/report', label: 'Report' },
];

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <header className="sticky top-0 z-30 bg-ivory/85 backdrop-blur border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-8 h-8 rounded-md bg-slate text-ivory flex items-center justify-center font-serif text-sm shrink-0">SG</div>
          <div className="min-w-0">
            <div className="font-serif text-lg text-slate leading-tight truncate">Swatch Group Audit</div>
            <div className="text-xs text-muted leading-tight">FY2024 · Swiss GAAP FER</div>
          </div>
        </div>
        <nav className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              className={({ isActive }) =>
                `px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  isActive ? 'bg-slate text-ivory' : 'text-slate/70 hover:bg-oat'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
        <select
          className="md:hidden text-sm border border-border rounded-md px-2 py-1 bg-white shrink-0"
          value={location.pathname}
          onChange={(e) => navigate(e.target.value)}
          aria-label="Page navigation"
        >
          {links.map((l) => (
            <option key={l.to} value={l.to}>
              {l.label}
            </option>
          ))}
        </select>
      </div>
    </header>
  );
}
