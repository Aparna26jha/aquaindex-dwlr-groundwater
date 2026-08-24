import { lazy, Suspense } from 'react'
import { NavLink, Route, Routes } from 'react-router-dom'

const Dashboard = lazy(() => import('./pages/Dashboard.jsx'))
const MapPage = lazy(() => import('./pages/MapPage.jsx'))
const StationPage = lazy(() => import('./pages/StationPage.jsx'))
const RechargePage = lazy(() => import('./pages/RechargePage.jsx'))
const PlannerPage = lazy(() => import('./pages/PlannerPage.jsx'))
const AboutPage = lazy(() => import('./pages/AboutPage.jsx'))

const links = [
  { to: '/', label: 'Overview' },
  { to: '/map', label: 'DWLR map' },
  { to: '/recharge', label: 'Recharge' },
  { to: '/planner', label: 'Planner' },
  { to: '/about', label: 'Project' },
]

function Fallback() {
  return <div className="px-4 py-16 text-center text-sm text-[#8aa4a0]">Loading…</div>
}

export default function App() {
  return (
    <div className="min-h-svh bg-[#0b1615] text-[#e7f1ee]">
      <header className="sticky top-0 z-30 border-b border-[#243836] bg-[#0b1615]/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-3 px-4 py-3">
          <NavLink to="/" className="flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-[#1a3d38] text-[#3dba9a]">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.5s6.5 7.4 6.5 12.1A6.5 6.5 0 1 1 5.5 14.6C5.5 9.9 12 2.5 12 2.5z" />
              </svg>
            </span>
            <div>
              <div className="serif text-[15px] leading-none tracking-tight">AquaIndex</div>
              <div className="text-[10px] uppercase tracking-[0.18em] text-[#8aa4a0]">DWLR evaluation</div>
            </div>
          </NavLink>
          <nav className="ml-auto flex flex-wrap gap-1 text-sm">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === '/'}
                className={({ isActive }) =>
                  `rounded-full px-3 py-1.5 ${isActive ? 'bg-[#1a3d38] text-[#3dba9a]' : 'text-[#8aa4a0] hover:text-[#e7f1ee]'}`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>
      <Suspense fallback={<Fallback />}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/station/:id" element={<StationPage />} />
          <Route path="/recharge" element={<RechargePage />} />
          <Route path="/planner" element={<PlannerPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </Suspense>
    </div>
  )
}
