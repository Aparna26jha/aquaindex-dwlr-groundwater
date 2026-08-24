import { categoryColor, healthColor } from '../lib/hydrology.js'

export function StatusBadge({ cat }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[11px] font-medium"
      style={{
        color: categoryColor(cat),
        borderColor: categoryColor(cat) + '66',
        background: categoryColor(cat) + '18',
      }}
    >
      <span className="h-1.5 w-1.5 rounded-full" style={{ background: categoryColor(cat) }} />
      {cat}
    </span>
  )
}

export function HealthBadge({ health }) {
  return (
    <span className="mono text-sm font-medium" style={{ color: healthColor(health) }}>
      {health}
    </span>
  )
}

export function Kpi({ label, value, hint }) {
  return (
    <div className="rounded-2xl border border-[#243836] bg-[#12211f] p-4">
      <div className="text-[11px] uppercase tracking-[0.16em] text-[#8aa4a0]">{label}</div>
      <div className="serif mt-2 text-2xl text-[#e7f1ee]">{value}</div>
      {hint ? <div className="mt-1 text-xs text-[#8aa4a0]">{hint}</div> : null}
    </div>
  )
}
