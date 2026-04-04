import { useState, useRef, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import { ArrowLeft, ChevronDown, X, Check, Phone, Navigation, List, Map } from 'lucide-react'
import { MOCK_PLACES, PLACE_LABELS } from '../data/mockPlaces'

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
})

const BASE = { lat: 40.8025, lon: 29.4301 }
const OFFSETS = [
  [0.003, 0.004], [0.005, -0.003], [-0.002, 0.006],
  [0.007, 0.002], [-0.004, -0.003], [0.002, -0.007],
  [0.008, -0.005], [-0.006, 0.004],
]

const EMOJI_MAP = {
  pharmacy: '💊', atm: '🏧', fuel: '⛽', hospital: '🏥',
  supermarket: '🛒', parking: '🅿️', charging: '⚡', bus: '🚌',
  assembly: '📍', mosque: '🕌',
}

const RENK_MAP = {
  pharmacy: '#ef4444', atm: '#3b82f6', fuel: '#f59e0b', hospital: '#ec4899',
  supermarket: '#10b981', parking: '#6366f1', charging: '#8b5cf6', bus: '#0ea5e9',
  assembly: '#f97316', mosque: '#14b8a6',
}

function markerIcon(type, isActive) {
  const emoji = EMOJI_MAP[type] || '📍'
  const renk  = isActive ? '#111827' : (RENK_MAP[type] || '#6b7280')
  const size  = isActive ? 38 : 30
  return L.divIcon({
    className: '',
    html: `<div style="
      background:${renk};width:${size}px;height:${size}px;
      border-radius:50% 50% 50% 0;transform:rotate(-45deg);
      display:flex;align-items:center;justify-content:center;
      box-shadow:0 2px 10px rgba(0,0,0,${isActive ? 0.4 : 0.2});
      border:${isActive ? 3 : 2}px solid white;
      transition:all 0.2s;
    "><span style="transform:rotate(45deg);font-size:${isActive ? 16 : 12}px;line-height:1">${emoji}</span></div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size],
    popupAnchor: [0, -size],
  })
}

// Haritayı fly ettirmek için helper component
function FlyTo({ lat, lng, zoom }) {
  const map = useMap()
  useEffect(() => {
    if (lat && lng) map.flyTo([lat, lng], zoom || 17, { duration: 0.6 })
  }, [lat, lng, zoom, map])
  return null
}

export default function NearbyDetail() {
  const { type } = useParams()
  const navigate = useNavigate()

  const title = PLACE_LABELS[type] || 'Yakınında'
  const places = MOCK_PLACES[type] || []
  const showBankFilter = type === 'atm'

  const [showBankSheet, setShowBankSheet] = useState(false)
  const [selectedBank,  setSelectedBank]  = useState(null)
  const [view,          setView]          = useState('map')  // 'map' | 'list'
  const [aktifId,       setAktifId]       = useState(null)
  const [flyTarget,     setFlyTarget]     = useState(null)
  const cardScrollRef = useRef(null)

  const banks = showBankFilter ? [...new Set(places.map(p => p.bank).filter(Boolean))] : []

  const filtered = selectedBank ? places.filter(p => p.bank === selectedBank) : places

  const markers = filtered.map((p, i) => ({
    ...p,
    lat: BASE.lat + (OFFSETS[i % OFFSETS.length][0]),
    lon: BASE.lon + (OFFSETS[i % OFFSETS.length][1]),
  }))

  function kartTiklandi(marker) {
    setAktifId(marker.id)
    setFlyTarget({ lat: marker.lat, lng: marker.lon })
  }

  function markerTiklandi(marker) {
    setAktifId(marker.id)
    // Kartı scroll et
    if (cardScrollRef.current) {
      const idx = markers.findIndex(m => m.id === marker.id)
      if (idx >= 0) {
        cardScrollRef.current.scrollTo({ left: idx * 260, behavior: 'smooth' })
      }
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 flex justify-center" style={{ zIndex: 1000 }}>
        <div className="w-full max-w-[430px] bg-white/90 backdrop-blur-md border-b border-gray-100 px-4 h-[56px] flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="w-9 h-9 flex items-center justify-center rounded-xl bg-gray-100 active:bg-gray-200 transition-colors">
            <ArrowLeft size={18} strokeWidth={1.5} className="text-gray-700" />
          </button>
          <h1 className="text-gray-800 text-base font-bold flex-1">{title}</h1>
          <div className="flex bg-gray-100 rounded-xl p-0.5">
            <button onClick={() => setView('list')}
              className="flex items-center justify-center rounded-[10px] transition-all"
              style={{ width: 32, height: 28, background: view === 'list' ? '#111827' : 'transparent' }}>
              <List size={14} strokeWidth={2} color={view === 'list' ? '#fff' : '#6b7280'} />
            </button>
            <button onClick={() => setView('map')}
              className="flex items-center justify-center rounded-[10px] transition-all"
              style={{ width: 32, height: 28, background: view === 'map' ? '#111827' : 'transparent' }}>
              <Map size={14} strokeWidth={2} color={view === 'map' ? '#fff' : '#6b7280'} />
            </button>
          </div>
        </div>
      </header>

      {/* LİSTE GÖRÜNÜMÜ */}
      {view === 'list' && (
        <div className="pt-[56px] pb-24 px-4">
          <p className="text-gray-400 text-xs pt-3 mb-3">{filtered.length} sonuç</p>
          <div className="flex flex-col gap-2.5">
            {markers.map(p => (
              <button
                key={p.id}
                onClick={() => { setAktifId(p.id); setView('map'); setFlyTarget({ lat: p.lat, lng: p.lon }) }}
                className="bg-white border border-gray-100 rounded-2xl px-4 py-3.5 shadow-sm flex items-center gap-3 text-left active:scale-[0.98] transition-transform"
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-lg"
                  style={{ background: (RENK_MAP[type] || '#6b7280') + '15' }}>
                  {EMOJI_MAP[type] || '📍'}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-gray-800 text-sm font-semibold truncate">{p.name}</p>
                  <p className="text-gray-400 text-xs truncate mt-0.5">{p.address}</p>
                </div>
                <div className="shrink-0 text-right">
                  <span className="text-xs font-semibold" style={{ color: RENK_MAP[type] || '#6b7280' }}>{p.distance}</span>
                  {p.nextBus != null && (
                    <div className="mt-1 text-[10px] font-bold bg-green-50 text-green-600 rounded-full px-2 py-0.5 inline-block">{p.nextBus} dk</div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* HARİTA GÖRÜNÜMÜ */}
      {view === 'map' && (
      <div className="pt-[56px] flex-1 relative" style={{ minHeight: 'calc(100vh - 56px)' }}>
        <MapContainer
          center={[BASE.lat, BASE.lon]}
          zoom={14}
          style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
          zoomControl={false}
          attributionControl={false}
        >
          <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />
          {markers.map(p => (
            <Marker
              key={p.id}
              position={[p.lat, p.lon]}
              icon={markerIcon(type, aktifId === p.id)}
              eventHandlers={{ click: () => markerTiklandi(p) }}
            >
              <Popup closeButton={false}>
                <div style={{ minWidth: 130, padding: '6px 8px' }}>
                  <p style={{ fontSize: 12, fontWeight: 700, color: '#111827', margin: 0 }}>{p.name}</p>
                  <p style={{ fontSize: 10, color: '#9ca3af', margin: '2px 0 0' }}>{p.address}</p>
                </div>
              </Popup>
            </Marker>
          ))}
          {flyTarget && <FlyTo lat={flyTarget.lat} lng={flyTarget.lng} zoom={17} />}
        </MapContainer>

        {/* Alt kısım: kartlar */}
        <div className="absolute bottom-0 left-0 right-0 z-[400]" style={{ paddingBottom: showBankFilter ? 76 : 16 }}>
          <div
            ref={cardScrollRef}
            className="flex gap-3 px-4 pb-2 overflow-x-auto"
            style={{ scrollbarWidth: 'none', scrollSnapType: 'x mandatory' }}
          >
            {markers.map((p, i) => (
              <button
                key={p.id}
                onClick={() => kartTiklandi(p)}
                className="shrink-0 text-left active:scale-[0.97] transition-transform"
                style={{
                  width: 240,
                  scrollSnapAlign: 'start',
                  background: aktifId === p.id ? '#111827' : 'rgba(255,255,255,0.95)',
                  backdropFilter: 'blur(12px)',
                  border: aktifId === p.id ? 'none' : '1px solid #e5e7eb',
                  borderRadius: 16,
                  padding: '14px 16px',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: 10,
                    background: aktifId === p.id ? 'rgba(255,255,255,0.15)' : (RENK_MAP[type] || '#6b7280') + '15',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 18,
                  }}>
                    {EMOJI_MAP[type] || '📍'}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{
                      fontSize: 13, fontWeight: 700, margin: 0,
                      color: aktifId === p.id ? '#fff' : '#111827',
                      overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                    }}>{p.name}</p>
                    <p style={{
                      fontSize: 11, margin: '2px 0 0',
                      color: aktifId === p.id ? 'rgba(255,255,255,0.5)' : '#9ca3af',
                      overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                    }}>{p.address}</p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: 4,
                    fontSize: 11, fontWeight: 600,
                    color: aktifId === p.id ? '#60a5fa' : (RENK_MAP[type] || '#6b7280'),
                  }}>
                    <Navigation size={10} strokeWidth={2} />
                    {p.distance}
                  </div>

                  {p.phone && (
                    <div style={{
                      display: 'flex', alignItems: 'center', gap: 4,
                      fontSize: 10,
                      color: aktifId === p.id ? 'rgba(255,255,255,0.4)' : '#9ca3af',
                    }}>
                      <Phone size={9} strokeWidth={1.5} />
                      Ara
                    </div>
                  )}

                  {p.nextBus != null && (
                    <div style={{
                      fontSize: 10, fontWeight: 700,
                      background: aktifId === p.id ? '#22c55e' : '#dcfce7',
                      color: aktifId === p.id ? '#fff' : '#16a34a',
                      borderRadius: 20, padding: '2px 8px',
                    }}>
                      {p.nextBus} dk
                    </div>
                  )}

                  {p.bank && (
                    <span style={{
                      fontSize: 10, fontWeight: 500,
                      color: aktifId === p.id ? 'rgba(255,255,255,0.4)' : '#9ca3af',
                    }}>{p.bank}</span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
      )}

      {/* ATM — Banka Seç */}
      {showBankFilter && (
        <div className="fixed bottom-0 left-0 right-0 z-[500] flex justify-center">
          <div className="w-full max-w-[430px] bg-white/90 backdrop-blur-md border-t border-gray-100 px-4 py-3">
            <button
              onClick={() => setShowBankSheet(true)}
              className="w-full flex items-center justify-between bg-gray-900 text-white px-4 py-3.5 rounded-2xl active:scale-95 transition-transform"
            >
              <span className="text-sm font-semibold">{selectedBank || 'Banka Seç'}</span>
              <ChevronDown size={16} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      )}

      {/* Banka Sheet */}
      {showBankSheet && (
        <div className="fixed inset-0 z-[600] flex flex-col justify-end" onClick={() => setShowBankSheet(false)}>
          <div className="absolute inset-0 bg-black/30" />
          <div className="relative bg-white rounded-t-3xl px-4 pt-4 pb-8 max-h-[60vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-gray-800 text-base font-bold">Banka Seç</h2>
              <button onClick={() => setShowBankSheet(false)} className="text-gray-400"><X size={20} strokeWidth={1.5} /></button>
            </div>
            <button
              onClick={() => { setSelectedBank(null); setShowBankSheet(false) }}
              className="w-full flex items-center justify-between px-4 py-3.5 rounded-2xl border border-gray-100 mb-2 bg-white"
            >
              <span className="text-gray-700 text-sm font-medium">Tümü</span>
              {!selectedBank && <Check size={16} strokeWidth={2} className="text-gray-800" />}
            </button>
            {banks.map(bank => (
              <button
                key={bank}
                onClick={() => { setSelectedBank(bank); setShowBankSheet(false) }}
                className="w-full flex items-center justify-between px-4 py-3.5 rounded-2xl border border-gray-100 mb-2 bg-white"
              >
                <span className="text-gray-700 text-sm font-medium">{bank}</span>
                {selectedBank === bank && <Check size={16} strokeWidth={2} className="text-gray-800" />}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
