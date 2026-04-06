import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { MapContainer, TileLayer, Polyline, useMap } from 'react-leaflet'
import { ArrowLeft } from 'lucide-react'

const CENTER = [40.8025, 29.4301]

// Sahte trafik verileri — Gebze ana yolları
const TRAFIK_YOLLARI = [
  // D-100 (Kırmızı - yoğun)
  { renk: '#ef4444', agirlik: 6, label: 'D-100', coords: [
    [40.8055, 29.4050], [40.8060, 29.4120], [40.8058, 29.4200],
    [40.8050, 29.4300], [40.8045, 29.4400], [40.8040, 29.4500],
  ]},
  // Gebze Merkez (Turuncu - orta)
  { renk: '#f59e0b', agirlik: 5, label: 'Gebze Merkez', coords: [
    [40.8025, 29.4250], [40.8025, 29.4301], [40.8020, 29.4350],
    [40.8015, 29.4400],
  ]},
  // Sultan Orhan Caddesi (Yeşil - rahat)
  { renk: '#22c55e', agirlik: 5, label: 'Sultan Orhan Cd.', coords: [
    [40.7990, 29.4250], [40.8000, 29.4280], [40.8010, 29.4301],
    [40.8025, 29.4320],
  ]},
  // İstanbul Caddesi (Kırmızı - yoğun)
  { renk: '#ef4444', agirlik: 5, label: 'İstanbul Cd.', coords: [
    [40.8070, 29.4200], [40.8060, 29.4250], [40.8045, 29.4301],
    [40.8030, 29.4340],
  ]},
  // Osman Yılmaz Mah. (Yeşil - rahat)
  { renk: '#22c55e', agirlik: 4, label: 'Osman Yılmaz Mah.', coords: [
    [40.7980, 29.4350], [40.7995, 29.4380], [40.8010, 29.4400],
  ]},
  // Güzeller Mah. (Turuncu - orta)
  { renk: '#f59e0b', agirlik: 4, label: 'Güzeller Mah.', coords: [
    [40.8040, 29.4150], [40.8030, 29.4200], [40.8025, 29.4250],
  ]},
  // TEM Otoyol (Kırmızı - yoğun)
  { renk: '#ef4444', agirlik: 7, label: 'TEM Otoyol', coords: [
    [40.8120, 29.4050], [40.8115, 29.4150], [40.8110, 29.4250],
    [40.8105, 29.4350], [40.8100, 29.4450], [40.8095, 29.4550],
  ]},
  // Eskihisar yolu (Yeşil)
  { renk: '#22c55e', agirlik: 4, label: 'Eskihisar Yolu', coords: [
    [40.7960, 29.4301], [40.7940, 29.4350], [40.7920, 29.4400],
  ]},
]

function InvalidateSize() {
  const map = useMap()
  useEffect(() => {
    setTimeout(() => map.invalidateSize(), 100)
    setTimeout(() => map.invalidateSize(), 300)
  }, [map])
  return null
}

export default function TrafikHarita() {
  const navigate = useNavigate()

  return (
    <div className="fixed inset-0 bg-white flex flex-col" style={{ maxWidth: 430, margin: '0 auto' }}>
      {/* Header */}
      <header className="flex items-center gap-3 px-4 shrink-0" style={{ height: 56 }}>
        <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center">
          <ArrowLeft size={18} strokeWidth={2} className="text-gray-700" />
        </button>
        <h1 className="text-gray-900 font-bold" style={{ fontSize: 17 }}>Trafik Yoğunluğu</h1>
      </header>

      {/* Lejant */}
      <div className="flex items-center gap-4 px-4 pb-3">
        <div className="flex items-center gap-1.5">
          <div style={{ width: 12, height: 12, borderRadius: 3, background: '#22c55e' }} />
          <span className="text-[11px] text-gray-500 font-medium">Rahat</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div style={{ width: 12, height: 12, borderRadius: 3, background: '#f59e0b' }} />
          <span className="text-[11px] text-gray-500 font-medium">Orta</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div style={{ width: 12, height: 12, borderRadius: 3, background: '#ef4444' }} />
          <span className="text-[11px] text-gray-500 font-medium">Yoğun</span>
        </div>
      </div>

      {/* Harita */}
      <div style={{ flex: 1, position: 'relative', minHeight: 0 }}>
        <MapContainer
          center={CENTER}
          zoom={14}
          style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
          zoomControl={false}
          attributionControl={false}
        >
          <InvalidateSize />
          <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />
          {TRAFIK_YOLLARI.map((yol, i) => (
            <Polyline
              key={i}
              positions={yol.coords}
              pathOptions={{ color: yol.renk, weight: yol.agirlik, opacity: 0.8, lineCap: 'round', lineJoin: 'round' }}
            />
          ))}
        </MapContainer>
      </div>
    </div>
  )
}
