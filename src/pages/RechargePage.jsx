import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { STATIONS } from '../data/stations.js'
import { Kpi } from '../components/Badges.jsx'

export default function RechargePage() {
  const [state, setState] = useState('All')
  const states = useMemo(
    () => ['All', ...[...new Set(STATIONS.map((s) => s.state))].sort()],
    [],
  )
  const rows = useMemo(() => {
    const list = state === 'All' ? STATIONS : STATIONS.filter((s) => s.state === state)
    return [...list].sort((a, b) => b.rechargeMm - a.rechargeMm)
  }, [state])

  const mean = rows.reduce((a, s) => a + s.rechargeMm, 0) / rows.length
  const max = rows[0]
  const min = rows[rows.length - 1]

  return (
    <main className="mx-auto max-w-6xl space-y-6 px-4 py-6">
      <div>
        <h1 className="serif text-3xl">Dynamic recharge estimation</h1>
        <p className="mt-2 max-w-3xl text-sm text-[#8aa4a0]">
          Recharge is estimated with the water-table fluctuation (WTF) method used in CGWB assessments: a rise in the
          water table (drop in metres below ground) multiplied by specific yield, summed over monsoon-season rise events.
          Formula: <span className="mono text-[#e7f1ee]">R (mm) = Σ Δh × Sy × 1000</span>, where Δh is a rise in metres.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <Kpi label="Mean recharge" value={`${mean.toFixed(0)} mm`} hint="Selected filter, May–Aug 2026 window" />
        <Kpi label="Highest capture" value={`${max.rechargeMm} mm`} hint={`${max.district}, ${max.state}`} />
        <Kpi label="Lowest capture" value={`${min.rechargeMm} mm`} hint={`${min.district}, ${min.state}`} />
      </div>

      <div className="flex items-center gap-3">
        <label className="text-xs text-[#8aa4a0]">State</label>
        <select
          value={state}
          onChange={(e) => setState(e.target.value)}
          className="rounded-xl border border-[#243836] bg-[#12211f] px-3 py-2 text-sm"
        >
          {states.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-[#243836]">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="bg-[#12211f] text-[11px] uppercase tracking-wider text-[#8aa4a0]">
            <tr>
              <th className="px-3 py-2 font-medium">Station</th>
              <th className="px-3 py-2 font-medium">Sy</th>
              <th className="px-3 py-2 font-medium">Rise events</th>
              <th className="px-3 py-2 font-medium">Recharge</th>
              <th className="px-3 py-2 font-medium">Bar</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((s) => (
              <tr key={s.id} className="border-t border-[#243836]">
                <td className="px-3 py-2">
                  <Link to={`/station/${s.id}`} className="hover:text-[#3dba9a]">
                    {s.district}
                  </Link>
                  <div className="text-xs text-[#8aa4a0]">{s.state}</div>
                </td>
                <td className="mono px-3 py-2">{s.sy}</td>
                <td className="mono px-3 py-2">{s.riseEvents}</td>
                <td className="mono px-3 py-2">{s.rechargeMm} mm</td>
                <td className="px-3 py-2">
                  <div className="h-2 w-40 rounded-full bg-[#1a2c2a]">
                    <div
                      className="h-2 rounded-full bg-[#3dba9a]"
                      style={{ width: `${Math.min(100, (s.rechargeMm / (max.rechargeMm || 1)) * 100)}%` }}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  )
}
