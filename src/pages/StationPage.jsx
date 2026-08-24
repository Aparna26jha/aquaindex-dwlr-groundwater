import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { STATIONS } from '../data/stations.js'
import { LevelChart } from '../components/LevelChart.jsx'
import { HealthBadge, Kpi, StatusBadge } from '../components/Badges.jsx'
import { briefStation } from '../lib/gemini.js'

export default function StationPage() {
  const { id } = useParams()
  const station = STATIONS.find((s) => s.id === id)
  const [brief, setBrief] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!station) return
    setLoading(true)
    briefStation(station)
      .then(setBrief)
      .finally(() => setLoading(false))
  }, [station])

  if (!station) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-16 text-center">
        <p>Station not found.</p>
        <Link to="/map" className="text-[#3dba9a]">
          Back to map
        </Link>
      </main>
    )
  }

  return (
    <main className="mx-auto max-w-6xl space-y-6 px-4 py-6">
      <Link to="/map" className="text-xs text-[#8aa4a0]">
        ← Network
      </Link>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="mono text-xs text-[#8aa4a0]">{station.id}</p>
          <h1 className="serif text-3xl">{station.name}</h1>
          <p className="text-sm text-[#8aa4a0]">
            {station.district}, {station.state} · {station.aquifer}
          </p>
        </div>
        <StatusBadge cat={station.cat} />
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Kpi label="Latest level" value={`${station.latest.toFixed(2)} m`} hint="Below ground level" />
        <Kpi
          label="90-day change"
          value={`${station.delta90 > 0 ? '+' : ''}${station.delta90.toFixed(2)} m`}
          hint={station.delta90 > 0 ? 'Deeper (decline)' : 'Shallower (recovery)'}
        />
        <Kpi label="WTF recharge" value={`${station.rechargeMm} mm`} hint={`${station.riseEvents} rise events · Sy ${station.sy}`} />
        <Kpi
          label="Availability index"
          value={
            <span>
              {station.index} · <HealthBadge health={station.health} />
            </span>
          }
          hint="Depth + trend + recharge"
        />
      </div>

      <section className="rounded-2xl border border-[#243836] bg-[#12211f] p-4">
        <div className="mb-2 flex items-center justify-between">
          <h2 className="text-sm font-medium">High-frequency water level (mbgl, inverted axis)</h2>
          <span className="text-xs text-[#8aa4a0]">Bars = local rainfall proxy</span>
        </div>
        <LevelChart series={station.series} />
      </section>

      <section className="rounded-2xl border border-[#243836] bg-[#12211f] p-4">
        <h2 className="text-sm font-medium">Hydrologist briefing</h2>
        <p className="mt-2 text-sm leading-relaxed text-[#c5d6d2]">
          {loading ? 'Preparing station briefing…' : brief}
        </p>
      </section>
    </main>
  )
}
