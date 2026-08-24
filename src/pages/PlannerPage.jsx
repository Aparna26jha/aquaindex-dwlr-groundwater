import { useMemo, useState } from 'react'
import { STATIONS } from '../data/stations.js'
import { projectLevel } from '../lib/hydrology.js'
import { HealthBadge, Kpi, StatusBadge } from '../components/Badges.jsx'
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

export default function PlannerPage() {
  const [id, setId] = useState('DWLR-KA-001')
  const [cut, setCut] = useState(20)
  const station = STATIONS.find((s) => s.id === id) || STATIONS[0]
  const projected = projectLevel(station, cut)
  const baseline = projectLevel(station, 0)

  const chart = useMemo(
    () => [
      { name: 'Now', level: Number(station.latest.toFixed(2)) },
      { name: '1y, no change', level: baseline },
      { name: `1y, −${cut}% extraction`, level: projected },
    ],
    [station, cut, projected, baseline],
  )

  const saved = Number((baseline - projected).toFixed(2))

  return (
    <main className="mx-auto max-w-6xl space-y-6 px-4 py-6">
      <div>
        <h1 className="serif text-3xl">Decision-support planner</h1>
        <p className="mt-2 max-w-3xl text-sm text-[#8aa4a0]">
          Simulate a reduction in local groundwater extraction and see the implied water-table depth after one year. This
          is a screening model for classroom demonstration — not a calibrated MODFLOW run.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_1.2fr]">
        <section className="space-y-4 rounded-2xl border border-[#243836] bg-[#12211f] p-4">
          <label className="block text-xs uppercase tracking-wider text-[#8aa4a0]">Station</label>
          <select
            value={station.id}
            onChange={(e) => setId(e.target.value)}
            className="w-full rounded-xl border border-[#243836] bg-[#0b1615] px-3 py-2 text-sm"
          >
            {STATIONS.map((s) => (
              <option key={s.id} value={s.id}>
                {s.district}, {s.state} · {s.cat}
              </option>
            ))}
          </select>

          <div>
            <div className="flex justify-between text-sm">
              <span>Extraction cut</span>
              <span className="mono">{cut}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="50"
              value={cut}
              onChange={(e) => setCut(Number(e.target.value))}
              className="mt-2 w-full accent-[#3dba9a]"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <StatusBadge cat={station.cat} />
            <span className="text-sm text-[#8aa4a0]">
              Index {station.index} · <HealthBadge health={station.health} />
            </span>
          </div>

          <p className="text-xs leading-relaxed text-[#8aa4a0]">
            The 90-day DWLR slope is extrapolated, then scaled by the extraction cut. A small extra recharge term
            represents reduced pumping during monsoon capture. Hard-rock sites (low Sy) recover more slowly than alluvial
            aquifers.
          </p>
        </section>

        <section className="rounded-2xl border border-[#243836] bg-[#12211f] p-4">
          <div className="mb-4 grid gap-3 sm:grid-cols-3">
            <Kpi label="Current" value={`${station.latest.toFixed(2)} m`} />
            <Kpi label="Projected" value={`${projected} m`} hint="After 365 days" />
            <Kpi label="Depth avoided" value={`${saved} m`} hint="Versus business-as-usual" />
          </div>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chart}>
                <CartesianGrid stroke="#243836" vertical={false} />
                <XAxis dataKey="name" tick={{ fill: '#8aa4a0', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#8aa4a0', fontSize: 11 }} axisLine={false} tickLine={false} reversed width={40} />
                <Tooltip contentStyle={{ background: '#12211f', border: '1px solid #243836' }} />
                <Bar dataKey="level" fill="#3dba9a" radius={[8, 8, 0, 0]} name="mbgl" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>
      </div>
    </main>
  )
}
