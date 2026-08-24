import {
  CartesianGrid,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Bar,
  ComposedChart,
} from 'recharts'

export function LevelChart({ series, height = 280 }) {
  const data = series.map((p) => ({
    date: p.date.slice(5),
    level: p.level,
    rain: p.rain,
  }))

  return (
    <div style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
          <CartesianGrid stroke="#243836" vertical={false} />
          <XAxis dataKey="date" tick={{ fill: '#8aa4a0', fontSize: 11 }} axisLine={false} tickLine={false} minTickGap={24} />
          <YAxis
            yAxisId="l"
            tick={{ fill: '#8aa4a0', fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            reversed
            domain={['auto', 'auto']}
            width={42}
          />
          <YAxis yAxisId="r" orientation="right" tick={{ fill: '#8aa4a0', fontSize: 11 }} axisLine={false} tickLine={false} width={36} />
          <Tooltip
            contentStyle={{ background: '#12211f', border: '1px solid #243836', borderRadius: 12 }}
            labelStyle={{ color: '#8aa4a0' }}
          />
          <Bar yAxisId="r" dataKey="rain" fill="#1a3d38" name="Rain (mm)" />
          <Line yAxisId="l" type="monotone" dataKey="level" stroke="#3dba9a" strokeWidth={2} dot={false} name="Level (mbgl)" />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  )
}
