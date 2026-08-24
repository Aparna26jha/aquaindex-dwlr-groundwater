const MODEL = 'gemini-2.0-flash'

export async function briefStation(station) {
  const key = import.meta.env.VITE_GEMINI_API_KEY
  const local = localBrief(station)
  if (!key) return local

  const prompt = `You are a groundwater hydrologist briefing an Indian district planner.
Write 4 short sentences, no markdown, no bullets.
Station: ${station.name} (${station.id}), ${station.district}, ${station.state}.
Aquifer: ${station.aquifer}. CGWB class: ${station.cat}.
Water level: ${station.latest.toFixed(2)} m below ground. 90-day change: ${station.delta90 > 0 ? 'deeper by' : 'shallower by'} ${Math.abs(station.delta90).toFixed(2)} m.
WTF recharge this monsoon window: ${station.rechargeMm} mm. Availability index: ${station.index}/100 (${station.health}).
Specific yield used: ${station.sy}.
Stay factual, cautious, and practical.`

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${encodeURIComponent(key)}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.4, maxOutputTokens: 280 },
        }),
      },
    )
    if (!res.ok) return local
    const data = await res.json()
    const text = data?.candidates?.[0]?.content?.parts?.map((p) => p.text).join(' ').trim()
    return text || local
  } catch {
    return local
  }
}

function localBrief(station) {
  const trend =
    station.delta90 > 0.15
      ? 'The water table has declined over the last 90 days, which is consistent with extraction exceeding monsoon recharge.'
      : station.delta90 < -0.15
        ? 'The water table has risen over the last 90 days, indicating useful monsoon recharge at this piezometer.'
        : 'The water table has been relatively stable over the last 90 days.'
  return `${station.district} (${station.state}) is assessed as ${station.cat} with an availability index of ${station.index}/100 (${station.health}). Latest DWLR reading is ${station.latest.toFixed(2)} m below ground in a ${station.aquifer} setting. ${trend} Estimated recharge by the water-table fluctuation method is ${station.rechargeMm} mm for this window; planners should treat this as a local indicator, not a full aquifer budget.`
}
