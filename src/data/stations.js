/** Seeded PRNG so every student sees the same demo dataset. */
function mulberry32(seed) {
  return function rng() {
    let t = (seed += 0x6d2b79f5)
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/**
 * Representative DWLR sites across India.
 * Categories follow CGWB assessment classes.
 * Coordinates are district-HQ / known monitoring localities.
 */
export const STATION_META = [
  { id: 'DWLR-PB-001', name: 'Sangrur Central', state: 'Punjab', district: 'Sangrur', lat: 30.2458, lng: 75.8421, aquifer: 'Indo-Gangetic alluvium', sy: 0.12, cat: 'Over-Exploited', base: 29.8, stress: 0.92 },
  { id: 'DWLR-PB-002', name: 'Ludhiana Canal Colony', state: 'Punjab', district: 'Ludhiana', lat: 30.901, lng: 75.8573, aquifer: 'Alluvium', sy: 0.14, cat: 'Over-Exploited', base: 26.4, stress: 0.88 },
  { id: 'DWLR-PB-003', name: 'Patiala Civil Lines', state: 'Punjab', district: 'Patiala', lat: 30.3398, lng: 76.3869, aquifer: 'Alluvium', sy: 0.13, cat: 'Critical', base: 22.1, stress: 0.78 },
  { id: 'DWLR-HR-001', name: 'Kurukshetra Block', state: 'Haryana', district: 'Kurukshetra', lat: 29.9695, lng: 76.8783, aquifer: 'Alluvium', sy: 0.12, cat: 'Over-Exploited', base: 31.2, stress: 0.9 },
  { id: 'DWLR-HR-002', name: 'Mahendragarh Farm', state: 'Haryana', district: 'Mahendragarh', lat: 28.28, lng: 76.151, aquifer: 'Alluvium', sy: 0.1, cat: 'Over-Exploited', base: 34.6, stress: 0.93 },
  { id: 'DWLR-DL-001', name: 'Najafgarh Piezometer', state: 'Delhi', district: 'South West Delhi', lat: 28.609, lng: 76.979, aquifer: 'Yamuna alluvium', sy: 0.11, cat: 'Over-Exploited', base: 27.5, stress: 0.86 },
  { id: 'DWLR-RJ-001', name: 'Jaipur Sanganer', state: 'Rajasthan', district: 'Jaipur', lat: 26.819, lng: 75.79, aquifer: 'Quartzite / alluvium', sy: 0.04, cat: 'Over-Exploited', base: 38.2, stress: 0.91 },
  { id: 'DWLR-RJ-002', name: 'Jodhpur Mandore', state: 'Rajasthan', district: 'Jodhpur', lat: 26.351, lng: 73.035, aquifer: 'Sandstone', sy: 0.03, cat: 'Critical', base: 41.7, stress: 0.84 },
  { id: 'DWLR-RJ-003', name: 'Nagaur Deedwana', state: 'Rajasthan', district: 'Nagaur', lat: 27.395, lng: 73.744, aquifer: 'Alluvium', sy: 0.08, cat: 'Over-Exploited', base: 36.9, stress: 0.89 },
  { id: 'DWLR-GJ-001', name: 'Mehsana Unjha', state: 'Gujarat', district: 'Mehsana', lat: 23.804, lng: 72.39, aquifer: 'Alluvium', sy: 0.1, cat: 'Over-Exploited', base: 33.1, stress: 0.87 },
  { id: 'DWLR-GJ-002', name: 'Banaskantha Palanpur', state: 'Gujarat', district: 'Banaskantha', lat: 24.172, lng: 72.438, aquifer: 'Alluvium', sy: 0.09, cat: 'Critical', base: 28.4, stress: 0.8 },
  { id: 'DWLR-GJ-003', name: 'Ahmedabad Dholka', state: 'Gujarat', district: 'Ahmedabad', lat: 22.728, lng: 72.441, aquifer: 'Alluvium', sy: 0.11, cat: 'Semi-Critical', base: 18.6, stress: 0.62 },
  { id: 'DWLR-MH-001', name: 'Pune Baramati', state: 'Maharashtra', district: 'Pune', lat: 18.151, lng: 74.577, aquifer: 'Deccan basalt', sy: 0.02, cat: 'Semi-Critical', base: 14.8, stress: 0.58 },
  { id: 'DWLR-MH-002', name: 'Nagpur Kamptee', state: 'Maharashtra', district: 'Nagpur', lat: 21.22, lng: 79.2, aquifer: 'Basalt', sy: 0.02, cat: 'Safe', base: 9.4, stress: 0.34 },
  { id: 'DWLR-MH-003', name: 'Solapur Akkalkot', state: 'Maharashtra', district: 'Solapur', lat: 17.525, lng: 76.206, aquifer: 'Basalt', sy: 0.02, cat: 'Critical', base: 16.9, stress: 0.74 },
  { id: 'DWLR-KA-001', name: 'Bengaluru Anekal', state: 'Karnataka', district: 'Bengaluru Urban', lat: 12.708, lng: 77.702, aquifer: 'Hard rock / gneiss', sy: 0.015, cat: 'Over-Exploited', base: 24.7, stress: 0.9 },
  { id: 'DWLR-KA-002', name: 'Kolar Bangarpet', state: 'Karnataka', district: 'Kolar', lat: 12.991, lng: 78.178, aquifer: 'Hard rock', sy: 0.015, cat: 'Over-Exploited', base: 27.3, stress: 0.92 },
  { id: 'DWLR-KA-003', name: 'Mysuru Nanjangud', state: 'Karnataka', district: 'Mysuru', lat: 12.12, lng: 76.683, aquifer: 'Hard rock', sy: 0.02, cat: 'Semi-Critical', base: 11.6, stress: 0.55 },
  { id: 'DWLR-TN-001', name: 'Coimbatore Sulur', state: 'Tamil Nadu', district: 'Coimbatore', lat: 11.024, lng: 77.124, aquifer: 'Hard rock', sy: 0.018, cat: 'Over-Exploited', base: 21.8, stress: 0.85 },
  { id: 'DWLR-TN-002', name: 'Chennai Minjur', state: 'Tamil Nadu', district: 'Tiruvallur', lat: 13.279, lng: 80.258, aquifer: 'Coastal alluvium', sy: 0.12, cat: 'Critical', base: 8.9, stress: 0.72 },
  { id: 'DWLR-TN-003', name: 'Madurai Melur', state: 'Tamil Nadu', district: 'Madurai', lat: 10.032, lng: 78.339, aquifer: 'Hard rock', sy: 0.02, cat: 'Semi-Critical', base: 13.4, stress: 0.6 },
  { id: 'DWLR-AP-001', name: 'Anantapur Kadiri', state: 'Andhra Pradesh', district: 'Anantapur', lat: 14.112, lng: 78.16, aquifer: 'Hard rock', sy: 0.016, cat: 'Critical', base: 19.5, stress: 0.76 },
  { id: 'DWLR-TG-001', name: 'Hyderabad Shamshabad', state: 'Telangana', district: 'Ranga Reddy', lat: 17.24, lng: 78.429, aquifer: 'Granite', sy: 0.015, cat: 'Semi-Critical', base: 15.2, stress: 0.61 },
  { id: 'DWLR-TG-002', name: 'Warangal Hanamkonda', state: 'Telangana', district: 'Warangal', lat: 18.007, lng: 79.559, aquifer: 'Granite', sy: 0.018, cat: 'Safe', base: 8.7, stress: 0.38 },
  { id: 'DWLR-KL-001', name: 'Thrissur Chalakudy', state: 'Kerala', district: 'Thrissur', lat: 10.3, lng: 76.337, aquifer: 'Laterite / alluvium', sy: 0.08, cat: 'Safe', base: 5.2, stress: 0.22 },
  { id: 'DWLR-KL-002', name: 'Palakkad Chittur', state: 'Kerala', district: 'Palakkad', lat: 10.7, lng: 76.747, aquifer: 'Hard rock', sy: 0.02, cat: 'Semi-Critical', base: 9.8, stress: 0.52 },
  { id: 'DWLR-GA-001', name: 'North Goa Mapusa', state: 'Goa', district: 'North Goa', lat: 15.591, lng: 73.809, aquifer: 'Laterite', sy: 0.06, cat: 'Safe', base: 6.1, stress: 0.25 },
  { id: 'DWLR-MP-001', name: 'Indore Mhow', state: 'Madhya Pradesh', district: 'Indore', lat: 22.55, lng: 75.76, aquifer: 'Basalt', sy: 0.02, cat: 'Semi-Critical', base: 12.4, stress: 0.57 },
  { id: 'DWLR-MP-002', name: 'Bhopal Berasia', state: 'Madhya Pradesh', district: 'Bhopal', lat: 23.626, lng: 77.432, aquifer: 'Basalt / sandstone', sy: 0.03, cat: 'Safe', base: 8.3, stress: 0.33 },
  { id: 'DWLR-MP-003', name: 'Bundelkhand Chhatarpur', state: 'Madhya Pradesh', district: 'Chhatarpur', lat: 24.917, lng: 79.581, aquifer: 'Hard rock', sy: 0.015, cat: 'Critical', base: 17.8, stress: 0.73 },
  { id: 'DWLR-UP-001', name: 'Lucknow Bakshi Ka Talab', state: 'Uttar Pradesh', district: 'Lucknow', lat: 26.99, lng: 80.89, aquifer: 'Ganga alluvium', sy: 0.14, cat: 'Semi-Critical', base: 14.1, stress: 0.56 },
  { id: 'DWLR-UP-002', name: 'Meerut Mawana', state: 'Uttar Pradesh', district: 'Meerut', lat: 29.104, lng: 77.919, aquifer: 'Alluvium', sy: 0.13, cat: 'Critical', base: 20.6, stress: 0.77 },
  { id: 'DWLR-UP-003', name: 'Varanasi Ramnagar', state: 'Uttar Pradesh', district: 'Varanasi', lat: 25.269, lng: 83.026, aquifer: 'Alluvium', sy: 0.15, cat: 'Safe', base: 7.9, stress: 0.31 },
  { id: 'DWLR-UK-001', name: 'Haridwar Roorkee', state: 'Uttarakhand', district: 'Haridwar', lat: 29.854, lng: 77.888, aquifer: 'Bhabar / terai', sy: 0.16, cat: 'Safe', base: 6.4, stress: 0.28 },
  { id: 'DWLR-HP-001', name: 'Kangra Palampur', state: 'Himachal Pradesh', district: 'Kangra', lat: 32.11, lng: 76.536, aquifer: 'Valley fill', sy: 0.08, cat: 'Safe', base: 5.8, stress: 0.24 },
  { id: 'DWLR-JK-001', name: 'Jammu Akhnoor', state: 'Jammu & Kashmir', district: 'Jammu', lat: 32.89, lng: 74.735, aquifer: 'Alluvium', sy: 0.1, cat: 'Safe', base: 7.2, stress: 0.3 },
  { id: 'DWLR-BR-001', name: 'Patna Danapur', state: 'Bihar', district: 'Patna', lat: 25.634, lng: 85.046, aquifer: 'Ganga alluvium', sy: 0.16, cat: 'Safe', base: 6.8, stress: 0.29 },
  { id: 'DWLR-BR-002', name: 'Gaya Tikari', state: 'Bihar', district: 'Gaya', lat: 24.748, lng: 84.836, aquifer: 'Hard rock fringe', sy: 0.03, cat: 'Semi-Critical', base: 11.9, stress: 0.54 },
  { id: 'DWLR-JH-001', name: 'Ranchi Kanke', state: 'Jharkhand', district: 'Ranchi', lat: 23.434, lng: 85.32, aquifer: 'Hard rock', sy: 0.02, cat: 'Safe', base: 8.1, stress: 0.36 },
  { id: 'DWLR-OD-001', name: 'Khordha Jatni', state: 'Odisha', district: 'Khordha', lat: 20.162, lng: 85.707, aquifer: 'Hard rock / laterite', sy: 0.025, cat: 'Semi-Critical', base: 10.6, stress: 0.5 },
  { id: 'DWLR-OD-002', name: 'Balangir Titlagarh', state: 'Odisha', district: 'Balangir', lat: 20.289, lng: 83.152, aquifer: 'Hard rock', sy: 0.018, cat: 'Critical', base: 14.7, stress: 0.71 },
  { id: 'DWLR-OD-003', name: 'Cuttack Athagarh', state: 'Odisha', district: 'Cuttack', lat: 20.52, lng: 85.63, aquifer: 'Mahanadi alluvium', sy: 0.12, cat: 'Safe', base: 5.4, stress: 0.23 },
  { id: 'DWLR-WB-001', name: 'Nadia Krishnanagar', state: 'West Bengal', district: 'Nadia', lat: 23.401, lng: 88.501, aquifer: 'Bengal basin', sy: 0.15, cat: 'Safe', base: 7.1, stress: 0.32 },
  { id: 'DWLR-WB-002', name: 'Bankura Bishnupur', state: 'West Bengal', district: 'Bankura', lat: 23.076, lng: 87.321, aquifer: 'Hard rock', sy: 0.02, cat: 'Semi-Critical', base: 12.8, stress: 0.53 },
  { id: 'DWLR-AS-001', name: 'Kamrup Palashbari', state: 'Assam', district: 'Kamrup', lat: 26.124, lng: 91.54, aquifer: 'Brahmaputra alluvium', sy: 0.18, cat: 'Safe', base: 4.6, stress: 0.18 },
  { id: 'DWLR-AS-002', name: 'Jorhat Titabar', state: 'Assam', district: 'Jorhat', lat: 26.588, lng: 94.195, aquifer: 'Alluvium', sy: 0.16, cat: 'Safe', base: 4.2, stress: 0.16 },
  { id: 'DWLR-ML-001', name: 'East Khasi Shillong', state: 'Meghalaya', district: 'East Khasi Hills', lat: 25.578, lng: 91.893, aquifer: 'Fractured sandstone', sy: 0.03, cat: 'Safe', base: 6.9, stress: 0.21 },
  { id: 'DWLR-TR-001', name: 'West Tripura Agartala', state: 'Tripura', district: 'West Tripura', lat: 23.831, lng: 91.287, aquifer: 'Dupitila sands', sy: 0.1, cat: 'Safe', base: 5.9, stress: 0.26 },
  { id: 'DWLR-MN-001', name: 'Imphal West Lamphel', state: 'Manipur', district: 'Imphal West', lat: 24.821, lng: 93.936, aquifer: 'Valley alluvium', sy: 0.08, cat: 'Safe', base: 5.1, stress: 0.22 },
  { id: 'DWLR-NL-001', name: 'Dimapur Chumukedima', state: 'Nagaland', district: 'Dimapur', lat: 25.86, lng: 93.745, aquifer: 'Alluvium', sy: 0.09, cat: 'Safe', base: 6.3, stress: 0.25 },
  { id: 'DWLR-MZ-001', name: 'Aizawl Sairang', state: 'Mizoram', district: 'Aizawl', lat: 23.81, lng: 92.672, aquifer: 'Sandstone', sy: 0.04, cat: 'Safe', base: 7.7, stress: 0.27 },
  { id: 'DWLR-AR-001', name: 'Papum Pare Naharlagun', state: 'Arunachal Pradesh', district: 'Papum Pare', lat: 27.105, lng: 93.695, aquifer: 'Siwalik / alluvium', sy: 0.1, cat: 'Safe', base: 4.9, stress: 0.17 },
  { id: 'DWLR-SK-001', name: 'East Sikkim Rangpo', state: 'Sikkim', district: 'East Sikkim', lat: 27.175, lng: 88.53, aquifer: 'Valley fill', sy: 0.06, cat: 'Safe', base: 5.5, stress: 0.2 },
  { id: 'DWLR-CT-001', name: 'Raipur Abhanpur', state: 'Chhattisgarh', district: 'Raipur', lat: 21.054, lng: 81.744, aquifer: 'Limestone / sandstone', sy: 0.04, cat: 'Safe', base: 8.8, stress: 0.35 },
  { id: 'DWLR-CT-002', name: 'Bastar Jagdalpur', state: 'Chhattisgarh', district: 'Bastar', lat: 19.074, lng: 82.008, aquifer: 'Hard rock', sy: 0.02, cat: 'Safe', base: 7.4, stress: 0.28 },
  { id: 'DWLR-CG-CHD', name: 'Chandigarh Sector 32', state: 'Chandigarh', district: 'Chandigarh', lat: 30.704, lng: 76.792, aquifer: 'Alluvium', sy: 0.12, cat: 'Critical', base: 23.4, stress: 0.75 },
  { id: 'DWLR-PY-001', name: 'Puducherry Bahour', state: 'Puducherry', district: 'Puducherry', lat: 11.806, lng: 79.743, aquifer: 'Coastal sedimentary', sy: 0.1, cat: 'Semi-Critical', base: 9.6, stress: 0.59 },
  { id: 'DWLR-AN-001', name: 'South Andaman Port Blair', state: 'Andaman & Nicobar', district: 'South Andaman', lat: 11.623, lng: 92.726, aquifer: 'Coral / laterite', sy: 0.05, cat: 'Safe', base: 4.1, stress: 0.19 },
  { id: 'DWLR-LA-001', name: 'Leh Spituk', state: 'Ladakh', district: 'Leh', lat: 34.129, lng: 77.526, aquifer: 'Valley fill', sy: 0.08, cat: 'Safe', base: 9.2, stress: 0.4 },
  { id: 'DWLR-RJ-004', name: 'Udaipur Girwa', state: 'Rajasthan', district: 'Udaipur', lat: 24.585, lng: 73.712, aquifer: 'Hard rock', sy: 0.02, cat: 'Semi-Critical', base: 16.3, stress: 0.63 },
  { id: 'DWLR-KA-004', name: 'Dharwad Hubballi', state: 'Karnataka', district: 'Dharwad', lat: 15.365, lng: 75.124, aquifer: 'Hard rock', sy: 0.02, cat: 'Semi-Critical', base: 13.9, stress: 0.58 },
  { id: 'DWLR-MH-004', name: 'Aurangabad Paithan', state: 'Maharashtra', district: 'Chhatrapati Sambhajinagar', lat: 19.478, lng: 75.386, aquifer: 'Basalt', sy: 0.02, cat: 'Critical', base: 15.6, stress: 0.7 },
  { id: 'DWLR-TN-004', name: 'Tirunelveli Palayamkottai', state: 'Tamil Nadu', district: 'Tirunelveli', lat: 8.724, lng: 77.756, aquifer: 'Hard rock', sy: 0.018, cat: 'Critical', base: 18.2, stress: 0.74 },
  { id: 'DWLR-UP-004', name: 'Bundelkhand Jhansi', state: 'Uttar Pradesh', district: 'Jhansi', lat: 25.448, lng: 78.568, aquifer: 'Hard rock', sy: 0.015, cat: 'Critical', base: 16.5, stress: 0.72 },
  { id: 'DWLR-HR-003', name: 'Hisar Agro Farm', state: 'Haryana', district: 'Hisar', lat: 29.149, lng: 75.721, aquifer: 'Alluvium', sy: 0.11, cat: 'Over-Exploited', base: 30.1, stress: 0.88 },
]

const DAYS = 92
const END = new Date('2026-08-24T08:00:00+05:30')

function isoDay(date) {
  return date.toISOString().slice(0, 10)
}

function buildSeries(meta, rng) {
  const series = []
  let level = meta.base + (rng() - 0.5) * 1.2

  for (let i = DAYS - 1; i >= 0; i--) {
    const d = new Date(END)
    d.setDate(d.getDate() - i)
    const month = d.getMonth() + 1
    const monsoon = month >= 6 && month <= 9
    const rain = monsoon
      ? Math.max(0, rng() * 42 - 8 + (month === 7 || month === 8 ? 12 : 0))
      : Math.max(0, rng() * 6 - 3)

    const extraction = 0.012 + meta.stress * 0.028
    const rechargeRise = rain > 8 ? (rain / 180) * (1.15 - meta.stress * 0.55) : 0
    level += extraction - rechargeRise + (rng() - 0.5) * 0.08
    level = Math.max(1.2, level)

    series.push({
      t: d.toISOString(),
      date: isoDay(d),
      level: Number(level.toFixed(3)),
      rain: Number(rain.toFixed(1)),
    })
  }
  return series
}

function enrich(meta, series) {
  const first = series[0].level
  const last = series[series.length - 1].level
  const delta90 = last - first
  let rechargeMm = 0
  let riseEvents = 0
  for (let i = 1; i < series.length; i++) {
    const dh = series[i - 1].level - series[i].level
    if (dh > 0.008) {
      rechargeMm += dh * meta.sy * 1000
      riseEvents += 1
    }
  }

  const depthScore = Math.max(0, Math.min(100, 100 - (last / 42) * 100))
  const trendScore = Math.max(0, Math.min(100, 72 - delta90 * 38))
  const recScore = Math.max(0, Math.min(100, (rechargeMm / 90) * 100))
  const index = Math.round(0.45 * depthScore + 0.3 * trendScore + 0.25 * recScore)

  let health = 'Poor'
  if (index >= 70) health = 'Good'
  else if (index >= 50) health = 'Moderate'
  else if (index >= 30) health = 'Stressed'

  return {
    ...meta,
    series,
    latest: last,
    delta90: Number(delta90.toFixed(3)),
    rechargeMm: Number(rechargeMm.toFixed(1)),
    riseEvents,
    index,
    health,
    updatedAt: series[series.length - 1].t,
  }
}

export function buildStations() {
  return STATION_META.map((meta, i) => {
    const rng = mulberry32(18000 + i * 97)
    return enrich(meta, buildSeries(meta, rng))
  })
}

export const STATIONS = buildStations()

export const NETWORK_SIZE = 5260

export function applyLiveTick(stations, tick) {
  return stations.map((s, i) => {
    const jitter = Math.sin(tick * 0.7 + i) * 0.012 * (0.4 + s.stress)
    const latest = Number((s.series[s.series.length - 1].level + jitter).toFixed(3))
    return { ...s, latest, liveTick: tick }
  })
}

export function uniqueStates(stations) {
  return [...new Set(stations.map((s) => s.state))].sort()
}
