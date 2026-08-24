export const CATEGORY_COLOR = {
  Safe: '#3dba9a',
  'Semi-Critical': '#d4b45a',
  Critical: '#e07a3d',
  'Over-Exploited': '#d45d4a',
}

export function categoryColor(cat) {
  return CATEGORY_COLOR[cat] || '#8aa4a0'
}

export function healthColor(health) {
  return (
    {
      Good: '#3dba9a',
      Moderate: '#d4b45a',
      Stressed: '#e07a3d',
      Poor: '#d45d4a',
    }[health] || '#8aa4a0'
  )
}

/** Water-table fluctuation (WTF) recharge, mm, over the series window. */
export function rechargeMm(station) {
  return station.rechargeMm
}

/**
 * Simple intervention model for the planner:
 * cutting extraction slows the 90-day decline and slightly improves monsoon capture.
 */
export function projectLevel(station, extractionCutPct, horizonDays = 365) {
  const daily = station.delta90 / 90
  const factor = 1 - extractionCutPct / 100
  const extraRecharge = (extractionCutPct / 100) * 0.004 * (1 - station.stress * 0.4)
  const projected = station.latest + daily * factor * horizonDays - extraRecharge * horizonDays
  return Number(Math.max(1, projected).toFixed(2))
}

export function nationalSummary(stations) {
  const n = stations.length
  const avgIndex = Math.round(stations.reduce((a, s) => a + s.index, 0) / n)
  const avgLevel = stations.reduce((a, s) => a + s.latest, 0) / n
  const counts = stations.reduce((acc, s) => {
    acc[s.cat] = (acc[s.cat] || 0) + 1
    return acc
  }, {})
  const falling = stations.filter((s) => s.delta90 > 0.15).length
  const rising = stations.filter((s) => s.delta90 < -0.15).length
  const avgRecharge = stations.reduce((a, s) => a + s.rechargeMm, 0) / n
  return { n, avgIndex, avgLevel, counts, falling, rising, avgRecharge }
}

export function groupByState(stations) {
  const map = new Map()
  for (const s of stations) {
    if (!map.has(s.state)) map.set(s.state, [])
    map.get(s.state).push(s)
  }
  return [...map.entries()]
    .map(([state, list]) => ({
      state,
      count: list.length,
      index: Math.round(list.reduce((a, s) => a + s.index, 0) / list.length),
      latest: list.reduce((a, s) => a + s.latest, 0) / list.length,
      cat: majority(list.map((s) => s.cat)),
    }))
    .sort((a, b) => a.index - b.index)
}

function majority(arr) {
  const c = {}
  for (const x of arr) c[x] = (c[x] || 0) + 1
  return Object.entries(c).sort((a, b) => b[1] - a[1])[0][0]
}
