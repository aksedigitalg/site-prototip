import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import { ArrowLeft, List, Map, Navigation, ChevronDown, X, Check } from 'lucide-react'

// Leaflet default icon fix
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
})

const userIcon = new L.DivIcon({
  html: `<div style="width:14px;height:14px;background:#1f2937;border:3px solid white;border-radius:50%;box-shadow:0 2px 6px rgba(0,0,0,0.3)"></div>`,
  className: '',
  iconSize: [14, 14],
  iconAnchor: [7, 7],
})

const placeIcon = new L.DivIcon({
  html: `<div style="width:10px;height:10px;background:#6b7280;border:2px solid white;border-radius:50%;box-shadow:0 1px 4px rgba(0,0,0,0.2)"></div>`,
  className: '',
  iconSize: [10, 10],
  iconAnchor: [5, 5],
})

const CONFIG = {
  pharmacy: {
    title: 'Nöbetçi Eczane',
    amenity: 'pharmacy',
    nameKey: 'name',
    showBankFilter: false,
  },
  atm: {
    title: 'En Yakın ATM',
    amenity: 'atm',
    nameKey: 'name',
    showBankFilter: true,
  },
}

async function fetchOverpass(lat, lon, amenity) {
  const query = `[out:json][timeout:15];node["amenity"="${amenity}"](around:3000,${lat},${lon});out body 40;`
  const res = await fetch(`https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`)
  const data = await res.json()
  return data.elements || []
}

function haversine(lat1, lon1, lat2, lon2) {
  const R = 6371000
  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLon = (lon2 - lon1) * Math.PI / 180
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) ** 2
  const d = R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return { value: d, label: d < 1000 ? `${Math.round(d)} m` : `${(d / 1000).toFixed(1)} km` }
}

function MapRecenter({ lat, lon }) {
  const map = useMap()
  useEffect(() => { map.setView([lat, lon], 15) }, [lat, lon])
  return null
}

function Skeleton() {
  return (
    <div className="space-y-3 px-4 pt-4">
      {[1, 2, 3, 4].map(i => (
        <div key={i} className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">
          <div className="h-3 bg-gray-100 rounded animate-pulse w-2/3 mb-2" />
          <div className="h-3 bg-gray-100 rounded animate-pulse w-1/3" />
        </div>
      ))}
    </div>
  )
}

export default function NearbyDetail() {
  const { type } = useParams()
  const navigate = useNavigate()
  const config = CONFIG[type] || CONFIG.pharmacy

  const [view, setView] = useState('list') // 'list' | 'map'
  const [userPos, setUserPos] = useState(null)
  const [places, setPlaces] = useState([])
  const [loading, setLoading] = useState(true)
  const [showBankSheet, setShowBankSheet] = useState(false)
  const [selectedBank, setSelectedBank] = useState(null)

  useEffect(() => {
    if (!navigator.geolocation) { setLoading(false); return }
    navigator.geolocation.getCurrentPosition(
      async ({ coords: { latitude: lat, longitude: lon } }) => {
        setUserPos({ lat, lon })
        try {
          const results = await fetchOverpass(lat, lon, config.amenity)
          const enriched = results
            .map(p => ({ ...p, dist: haversine(lat, lon, p.lat, p.lon) }))
            .sort((a, b) => a.dist.value - b.dist.value)
          setPlaces(enriched)
        } catch (_) {}
        setLoading(false)
      },
      () => setLoading(false)
    )
  }, [type])

  // Banka listesi (ATM için)
  const banks = type === 'atm'
    ? [...new Set(places.map(p => p.tags?.operator || p.tags?.brand || p.tags?.name).filter(Boolean))]
    : []

  const filtered = selectedBank
    ? places.filter(p => (p.tags?.operator || p.tags?.brand || p.tags?.name) === selectedBank)
    : places

  const getName = (p) =>
    p.tags?.name || p.tags?.operator || p.tags?.brand || config.title

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center">
        <div className="w-full max-w-[430px] bg-white/80 backdrop-blur-md border-b border-gray-100 px-4 py-3 flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="text-gray-500">
            <ArrowLeft size={20} strokeWidth={1.5} />
          </button>
          <h1 className="text-gray-800 text-base font-semibold flex-1">{config.title}</h1>
          {loading && <div className="w-4 h-4 border-2 border-gray-200 border-t-gray-600 rounded-full animate-spin" />}
        </div>
      </header>

      {/* Toggle */}
      <div className="fixed top-[57px] left-0 right-0 z-40 flex justify-center">
        <div className="w-full max-w-[430px] bg-white border-b border-gray-100 px-4 py-2 flex gap-2">
          <button
            onClick={() => setView('list')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              view === 'list' ? 'bg-gray-900 text-white' : 'text-gray-500 bg-gray-100'
            }`}
          >
            <List size={14} strokeWidth={1.5} />
            Liste
          </button>
          <button
            onClick={() => setView('map')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              view === 'map' ? 'bg-gray-900 text-white' : 'text-gray-500 bg-gray-100'
            }`}
          >
            <Map size={14} strokeWidth={1.5} />
            Harita
          </button>
        </div>
      </div>

      {/* İçerik */}
      <div className="pt-[105px] flex-1 flex flex-col" style={{ paddingBottom: config.showBankFilter ? '80px' : '16px' }}>

        {/* LİSTE */}
        {view === 'list' && (
          <div className="flex-1 overflow-y-auto">
            {loading ? <Skeleton /> : filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center pt-20 text-gray-400">
                <p className="text-sm">Yakınında sonuç bulunamadı</p>
              </div>
            ) : (
              <div className="px-4 pt-3 space-y-3">
                {filtered.map((p) => (
                  <div key={p.id} className="bg-white border border-gray-100 rounded-2xl px-4 py-4 shadow-sm flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center shrink-0">
                      <Navigation size={16} strokeWidth={1.5} className="text-gray-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-gray-800 text-sm font-semibold truncate">{getName(p)}</p>
                      {p.tags?.['addr:street'] && (
                        <p className="text-gray-400 text-xs truncate mt-0.5">{p.tags['addr:street']}</p>
                      )}
                    </div>
                    <span className="text-gray-400 text-xs font-medium shrink-0">{p.dist.label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* HARİTA */}
        {view === 'map' && userPos && (
          <div className="flex-1" style={{ minHeight: 0 }}>
            <MapContainer
              center={[userPos.lat, userPos.lon]}
              zoom={15}
              style={{ width: '100%', height: '100%' }}
              zoomControl={false}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; OpenStreetMap'
              />
              <MapRecenter lat={userPos.lat} lon={userPos.lon} />
              {/* Kullanıcı konumu */}
              <Marker position={[userPos.lat, userPos.lon]} icon={userIcon}>
                <Popup><span className="text-xs font-medium">Buradasın</span></Popup>
              </Marker>
              {/* Yerler */}
              {filtered.map(p => (
                <Marker key={p.id} position={[p.lat, p.lon]} icon={placeIcon}>
                  <Popup>
                    <div className="text-xs">
                      <p className="font-semibold">{getName(p)}</p>
                      <p className="text-gray-500 mt-0.5">{p.dist.label}</p>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        )}

        {view === 'map' && !userPos && !loading && (
          <div className="flex-1 flex items-center justify-center text-gray-400">
            <p className="text-sm">Konum izni gerekli</p>
          </div>
        )}
      </div>

      {/* ATM — Banka Seç butonu */}
      {config.showBankFilter && (
        <div className="fixed bottom-0 left-0 right-0 z-40 flex justify-center">
          <div className="w-full max-w-[430px] bg-white border-t border-gray-100 px-4 py-3">
            <button
              onClick={() => setShowBankSheet(true)}
              className="w-full flex items-center justify-between bg-gray-900 text-white px-4 py-3.5 rounded-2xl active:scale-95 transition-transform"
            >
              <span className="text-sm font-semibold">
                {selectedBank ? selectedBank : 'Banka Seç'}
              </span>
              <ChevronDown size={16} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      )}

      {/* Banka filtre sheet */}
      {showBankSheet && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end" onClick={() => setShowBankSheet(false)}>
          <div className="absolute inset-0 bg-black/30" />
          <div
            className="relative bg-white rounded-t-3xl px-4 pt-4 pb-8 max-h-[60vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-gray-800 text-base font-bold">Banka Seç</h2>
              <button onClick={() => setShowBankSheet(false)} className="text-gray-400">
                <X size={20} strokeWidth={1.5} />
              </button>
            </div>

            {/* Tümü */}
            <button
              onClick={() => { setSelectedBank(null); setShowBankSheet(false) }}
              className="w-full flex items-center justify-between px-4 py-3.5 rounded-2xl border border-gray-100 mb-2 bg-white active:bg-gray-50"
            >
              <span className="text-gray-700 text-sm font-medium">Tümü</span>
              {!selectedBank && <Check size={16} strokeWidth={2} className="text-gray-800" />}
            </button>

            {banks.map(bank => (
              <button
                key={bank}
                onClick={() => { setSelectedBank(bank); setShowBankSheet(false) }}
                className="w-full flex items-center justify-between px-4 py-3.5 rounded-2xl border border-gray-100 mb-2 bg-white active:bg-gray-50"
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
