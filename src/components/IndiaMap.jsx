import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from 'react-leaflet'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { categoryColor } from '../lib/hydrology.js'
import { StatusBadge } from './Badges.jsx'
import 'leaflet/dist/leaflet.css'

function Fit({ stations }) {
  const map = useMap()
  const key = stations.map((s) => s.id).join()
  useEffect(() => {
    if (!stations.length) return
    const bounds = stations.map((s) => [s.lat, s.lng])
    map.fitBounds(bounds, { padding: [28, 28], maxZoom: 6 })
  }, [map, key])
  return null
}

export default function IndiaMap({ stations, selectedId }) {
  return (
    <MapContainer
      center={[22.5, 79]}
      zoom={5}
      scrollWheelZoom
      className="h-full w-full rounded-2xl"
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer
        attribution='&copy; OpenStreetMap'
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      />
      <Fit stations={stations} />
      {stations.map((s) => (
        <CircleMarker
          key={s.id}
          center={[s.lat, s.lng]}
          radius={selectedId === s.id ? 10 : 6}
          pathOptions={{
            color: categoryColor(s.cat),
            fillColor: categoryColor(s.cat),
            fillOpacity: 0.85,
            weight: selectedId === s.id ? 3 : 1,
          }}
        >
          <Popup>
            <div className="min-w-[180px] text-sm">
              <div className="font-medium">{s.name}</div>
              <div className="text-xs text-[#8aa4a0]">
                {s.district}, {s.state}
              </div>
              <div className="mt-2 flex items-center justify-between">
                <StatusBadge cat={s.cat} />
                <span className="mono text-xs">{s.latest.toFixed(2)} m</span>
              </div>
              <Link className="mt-2 inline-block text-xs text-[#3dba9a]" to={`/station/${s.id}`}>
                Open station →
              </Link>
            </div>
          </Popup>
        </CircleMarker>
      ))}
    </MapContainer>
  )
}
