import { lazy, Suspense, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { STATIONS, uniqueStates } from '../data/stations.js'
import { StatusBadge } from '../components/Badges.jsx'

const IndiaMap = lazy(() => import('../components/IndiaMap.jsx'))

export default function MapPage() {
  const states = uniqueStates(STATIONS)
  const [state, setState] = useState('All')
  const [q, setQ] = useState('')
  const [cat, setCat] = useState('All')

  const filtered = useMemo(() => {
    return STATIONS.filter((s) => {
      if (state !== 'All' && s.state !== state) return false
      if (cat !== 'All' && s.cat !== cat) return false
      if (q) {
        const hay = `${s.name} ${s.district} ${s.id}`.toLowerCase()
        if (!hay.includes(q.toLowerCase())) return false
      }
      return true
    })
  }, [state, q, cat])

  return (
    <main className="mx-auto grid max-w-7xl gap-4 px-4 py-6 lg:grid-cols-[280px_1fr]">
      <aside className="space-y-3">
        <h1 className="serif text-2xl">DWLR network map</h1>
        <p className="text-sm text-[#8aa4a0]">Filter representative stations. Click a marker for the local series.</p>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search district or ID"
          className="w-full rounded-xl border border-[#243836] bg-[#12211f] px-3 py-2 text-sm outline-none"
        />
        <select
          value={state}
          onChange={(e) => setState(e.target.value)}
          className="w-full rounded-xl border border-[#243836] bg-[#12211f] px-3 py-2 text-sm"
        >
          <option>All</option>
          {states.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
        <select
          value={cat}
          onChange={(e) => setCat(e.target.value)}
          className="w-full rounded-xl border border-[#243836] bg-[#12211f] px-3 py-2 text-sm"
        >
          <option>All</option>
          <option>Safe</option>
          <option>Semi-Critical</option>
          <option>Critical</option>
          <option>Over-Exploited</option>
        </select>
        <div className="text-xs text-[#8aa4a0]">{filtered.length} stations shown</div>
        <ul className="max-h-[420px] space-y-1 overflow-auto pr-1">
          {filtered.map((s) => (
            <li key={s.id}>
              <Link
                to={`/station/${s.id}`}
                className="flex items-center justify-between rounded-xl border border-transparent px-2 py-2 hover:border-[#243836] hover:bg-[#12211f]"
              >
                <div>
                  <div className="text-sm">{s.district}</div>
                  <div className="mono text-[11px] text-[#8aa4a0]">{s.id}</div>
                </div>
                <StatusBadge cat={s.cat} />
              </Link>
            </li>
          ))}
        </ul>
      </aside>
      <section className="h-[70vh] min-h-[420px] overflow-hidden rounded-2xl border border-[#243836]">
        <Suspense fallback={<div className="grid h-full place-items-center text-sm text-[#8aa4a0]">Loading map…</div>}>
          <IndiaMap stations={filtered} />
        </Suspense>
      </section>
    </main>
  )
}
