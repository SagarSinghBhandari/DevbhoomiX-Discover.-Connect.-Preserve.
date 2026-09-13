import { UK_CENTER } from '@/lib/constants'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { useEffect } from 'react'
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'

const icon = L.divIcon({
  className: 'uk-marker',
  html: '<span style="display:block;width:14px;height:14px;border-radius:999px;background:#2f6a4a;border:2px solid white;box-shadow:0 0 0 1px #2f6a4a"></span>',
  iconSize: [14, 14],
  iconAnchor: [7, 7],
})

export type MapMarker = {
  id: string
  lat: number
  lng: number
  title: string
  subtitle?: string
  href?: string
  color?: string
}

function Fit({ markers }: { markers: MapMarker[] }) {
  const map = useMap()
  useEffect(() => {
    if (!markers.length) {
      map.setView([UK_CENTER.lat, UK_CENTER.lng], 7)
      return
    }
    const bounds = L.latLngBounds(markers.map((m) => [m.lat, m.lng]))
    map.fitBounds(bounds.pad(0.2))
  }, [map, markers])
  return null
}

export function MapView({
  markers,
  height = 420,
  onSelect,
}: {
  markers: MapMarker[]
  height?: number
  onSelect?: (id: string) => void
}) {
  return (
    <div className="map-wrap overflow-hidden rounded-xl border" style={{ height }}>
      <MapContainer
        center={[UK_CENTER.lat, UK_CENTER.lng]}
        zoom={7}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Fit markers={markers} />
        {markers.map((m) => (
          <Marker
            key={m.id}
            position={[m.lat, m.lng]}
            icon={icon}
            eventHandlers={{ click: () => onSelect?.(m.id) }}
          >
            <Popup>
              <strong>{m.title}</strong>
              {m.subtitle ? <div>{m.subtitle}</div> : null}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}
