import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft, Navigation } from 'lucide-react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import BottomNav from '../components/BottomNav'

// ── Metro durakları ──
const METRO_DURAKLARI = [
  { id: 1, isim: 'Gebze Metro', adres: 'Gebze Merkez', mesafe: '0.3 km', lat: 40.8025, lng: 29.4301 },
  { id: 2, isim: 'Darıca İstasyonu', adres: 'Darıca, Kocaeli', mesafe: '2.1 km', lat: 40.7690, lng: 29.3750 },
  { id: 3, isim: 'Çayırova Metro', adres: 'Çayırova Merkez', mesafe: '3.5 km', lat: 40.8260, lng: 29.3690 },
  { id: 4, isim: 'Tuzla İstasyonu', adres: 'Tuzla, İstanbul', mesafe: '5.8 km', lat: 40.8180, lng: 29.3050 },
  { id: 5, isim: 'Pendik İstasyonu', adres: 'Pendik, İstanbul', mesafe: '9.2 km', lat: 40.8760, lng: 29.2340 },
  { id: 6, isim: 'Osmangazi Metro', adres: 'Gebze OSB Yanı', mesafe: '1.8 km', lat: 40.7930, lng: 29.4520 },
]

const metroIcon = L.divIcon({
  className: '',
  html: '<div style="width:28px;height:28px;background:#111827;border-radius:50%;border:3px solid white;box-shadow:0 2px 6px rgba(0,0,0,0.3);display:flex;align-items:center;justify-content:center"><span style="font-size:14px">🚇</span></div>',
  iconSize: [28, 28],
  iconAnchor: [14, 14],
})

export default function Explore() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#f5f6f8' }}>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center backdrop-blur-md" style={{ background: 'rgba(245,246,248,0.85)' }}>
        <div className="w-full max-w-[430px] flex items-center gap-3" style={{ padding: '12px 20px' }}>
          <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-full bg-white flex items-center justify-center active:scale-90 transition-transform">
            <ChevronLeft size={20} strokeWidth={2} className="text-gray-900" />
          </button>
          <h1 className="text-gray-900 font-bold" style={{ fontSize: 17 }}>Kesfet</h1>
        </div>
      </header>

      {/* Harita */}
      <div style={{ paddingTop: 60, height: '45vh', minHeight: 260 }}>
        <MapContainer
          center={[40.8025, 29.4301]}
          zoom={13}
          style={{ width: '100%', height: '100%' }}
          zoomControl={false}
          attributionControl={false}
        >
          <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />
          {METRO_DURAKLARI.map(d => (
            <Marker key={d.id} position={[d.lat, d.lng]} icon={metroIcon}>
              <Popup>
                <span style={{ fontWeight: 600, fontSize: 13 }}>{d.isim}</span><br />
                <span style={{ fontSize: 11, color: '#6b7280' }}>{d.adres}</span>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* Yakınımdakiler */}
      <div className="flex-1" style={{ padding: '20px 20px 96px' }}>
        <h3 className="text-gray-900 font-bold" style={{ fontSize: 16, marginBottom: 12 }}>Yakinimdakiler</h3>

        {/* Kategori filtre */}
        <div className="flex gap-2 overflow-x-auto" style={{ scrollbarWidth: 'none', marginBottom: 16 }}>
          {['Metro'].map(f => (
            <button
              key={f}
              className="shrink-0 px-4 py-2 rounded-full text-xs font-semibold"
              style={{ background: '#111827', color: 'white' }}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Durak listesi */}
        <div className="flex flex-col gap-3">
          {METRO_DURAKLARI.map(d => (
            <div key={d.id} className="bg-white rounded-2xl flex items-center gap-3" style={{ padding: '14px 16px' }}>
              <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center shrink-0">
                <span style={{ fontSize: 18 }}>🚇</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-gray-900 text-sm font-semibold truncate">{d.isim}</p>
                <p className="text-gray-400 text-xs truncate">{d.adres}</p>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <Navigation size={12} strokeWidth={2} className="text-gray-400" />
                <span className="text-gray-500 text-xs font-medium">{d.mesafe}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
