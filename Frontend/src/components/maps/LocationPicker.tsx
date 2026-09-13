import { UK_CENTER } from '@/lib/constants'
import L from 'leaflet'
import { useMemo } from 'react'
import { MapContainer, Marker, TileLayer, useMapEvents } from 'react-leaflet'

const icon = L.divIcon({
  className: 'uk-picker',
  html: '<span style="display:block;width:16px;height:16px;border-radius:999px;background:#c45c26;border:2px solid white"></span>',
  iconSize: [16, 16],
  iconAnchor: [8, 8],
})

function ClickCapture({ onChange }: { onChange: (lat: number, lng: number) => void }) {
  useMapEvents({
    click(e) {
      onChange(e.latlng.lat, e.latlng.lng)
    },
  })
  return null
}

export function LocationPicker({
  latitude,
  longitude,
  onChange,
}: {
  latitude: number
  longitude: number
  onChange: (lat: number, lng: number) => void
}) {
  const position = useMemo<[number, number]>(
    () => [latitude || UK_CENTER.lat, longitude || UK_CENTER.lng],
    [latitude, longitude],
  )
  return (
    <div className="map-wrap overflow-hidden rounded-xl border" style={{ height: 280 }}>
      <MapContainer center={position} zoom={8} style={{ height: '100%', width: '100%' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; OpenStreetMap" />
        <ClickCapture onChange={onChange} />
        <Marker position={position} icon={icon} />
      </MapContainer>
    </div>
  )
}
