import { lazy, Suspense, useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { STATIONS, NETWORK_SIZE, applyLiveTick } from '../data/stations.js'
import { nationalSummary, groupByState } from '../lib/hydrology.js'
import { Kpi, StatusBadge } from '../components/Badges.jsx'
import { Sparkline } from '../components/Sparkline.jsx'

const IndiaMap = lazy(() => import('../components/IndiaMap.jsx'))

export default function Dashboard() {
  const [tick, setTick] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 7000)
    return () => clearInterval(id)
  }, [])

  const stations = useMemo(() => applyLiveTick(STATIONS, tick), [tick])
  const summary = useMemo(() => nationalSummary(stations), [stations])
  const states = useMemo(() => groupByState(stations).slice(0, 8), [stations])
  const watch = useMemo(
    () => [...stations].sort((a, b) => a.index - b.index).slice(0, 6),
    [stations],
  )

  return (
    <main className="mx-auto max-w-7xl space-y-6 px-4 py-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="serif max-w-2xl text-3xl leading-tight md:text-4xl">
            Real-time groundwater resource evaluation from DWLR stations
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-[#8aa4a0]">
            High-frequency water-level signals from a national Digital Water Level Recorder network, turned into recharge
            estimates and a local availability index for planners.
          </p>
        </div>
        <div className="rounded-full border border-[#243836] px-3 py-1 text-xs text-[#8aa4a0]">
          Live tick {tick} · demo subset {stations.length} of {NETWORK_SIZE.toLocaleString()} stations
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Kpi label="National index" value={`${summary.avgIndex}/100`} hint="Mean availability across mapped sites" />
        <Kpi label="Mean water level" value={`${summary.avgLevel.toFixed(1)} m`} hint="Metres below ground level" />
        <Kpi label="Falling tables" value={summary.falling} hint={`${summary.rising} sites recovering this monsoon`} />
        <Kpi label="Mean WTF recharge" value={`${summary.avgRecharge.toFixed(0)} mm`} hint="May–Aug window, specific-yield method" />
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.3fr_0.9fr]">
        <section className="overflow-hidden rounded-2xl border border-[#243836] bg-[#12211f]">
          <div className="flex items-center justify-between border-b border-[#243836] px-4 py-3">
            <h2 className="text-sm font-medium">National DWLR map</h2>
            <Link to="/map" className="text-xs text-[#3dba9a]">
              Expand
            </Link>
          </div>
          <div className="h-[380px]">
            <Suspense fallback={<div className="grid h-full place-items-center text-sm text-[#8aa4a0]">Loading map…</div>}>
              <IndiaMap stations={stations} />
            </Suspense>
          </div>
        </section>

        <section className="rounded-2xl border border-[#243836] bg-[#12211f] p-4">
          <h2 className="text-sm font-medium">Lowest availability</h2>
          <p className="mb-3 text-xs text-[#8aa4a0]">Districts to watch this monsoon</p>
          <ul className="space-y-3">
            {watch.map((s) => (
              <li key={s.id}>
                <Link to={`/station/${s.id}`} className="flex items-center gap-3 rounded-xl p-1 hover:bg-[#1a2c2a]">
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm">{s.district}</div>
                    <div className="text-xs text-[#8aa4a0]">{s.state}</div>
                  </div>
                  <StatusBadge cat={s.cat} />
                  <div className="text-right">
                    <div className="mono text-sm">{s.index}</div>
                    <div className="text-[10px] text-[#8aa4a0]">index</div>
                  </div>
                  <Sparkline series={s.series} />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section className="rounded-2xl border border-[#243836] bg-[#12211f] p-4">
        <h2 className="mb-3 text-sm font-medium">State snapshot</h2>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="text-[11px] uppercase tracking-wider text-[#8aa4a0]">
              <tr>
                <th className="pb-2 font-medium">State</th>
                <th className="pb-2 font-medium">Sites</th>
                <th className="pb-2 font-medium">Index</th>
                <th className="pb-2 font-medium">Mean mbgl</th>
                <th className="pb-2 font-medium">Class</th>
              </tr>
            </thead>
            <tbody>
              {states.map((row) => (
                <tr key={row.state} className="border-t border-[#243836]">
                  <td className="py-2">{row.state}</td>
                  <td className="mono py-2">{row.count}</td>
                  <td className="mono py-2">{row.index}</td>
                  <td className="mono py-2">{row.latest.toFixed(1)}</td>
                  <td className="py-2">
                    <StatusBadge cat={row.cat} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  )
}
