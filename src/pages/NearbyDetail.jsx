import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import { ArrowLeft, List, Map, Navigation, ChevronDown, X, Check } from 'lucide-react'
import { MOCK_PLACES, PLACE_LABELS } from '../data/mockPlaces'

// Leaflet icon fix
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
})

// İstanbul merkezi + mock offset konumlar
const BASE = { lat: 40.8025, lon: 29.4301 }
const OFFSETS = [
  [0.001, 0.001], [0.002, -0.001], [-0.001, 0.002],
  [0.003, 0.001], [-0.002, -0.001], [0.001, -0.003],
  [0.004, -0.002], [-0.003, 0.002],
]

export default function NearbyDetail() {
  const { type } = useParams()
  const navigate = useNavigate()

  const title = PLACE_LABELS[type] || 'Yakınında'
  const places = MOCK_PLACES[type] || []
  const showBankFilter = type === 'atm'

  const [view, setView] = useState('list')
  const [showBankSheet, setShowBankSheet] = useState(false)
  const [selectedBank, setSelectedBank] = useState(null)

  const banks = showBankFilter
    ? [...new Set(places.map(p => p.bank).filter(Boolean))]
    : []

  const filtered = selectedBank
    ? places.filter(p => p.bank === selectedBank)
    : places

  // Mock koordinatlar
  const markers = filtered.map((p, i) => ({
    ...p,
    lat: BASE.lat + (OFFSETS[i % OFFSETS.length][0]),
    lon: BASE.lon + (OFFSETS[i % OFFSETS.length][1]),
  }))

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center">
        <div className="w-full max-w-[430px] bg-white/80 backdrop-blur-md border-b border-gray-100 px-4 py-3 flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="text-gray-500">
            <ArrowLeft size={20} strokeWidth={1.5} />
          </button>
          <h1 className="text-gray-800 text-base font-semibold flex-1">{title}</h1>
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
      <div
        className="pt-[105px] flex-1 flex flex-col"
        style={{ paddingBottom: showBankFilter ? '80px' : '16px' }}
      >

        {/* LİSTE */}
        {view === 'list' && (
          <div className="px-4 pt-3 space-y-3 overflow-y-auto">
            {filtered.map((p) => (
              <div key={p.id} className="bg-white border border-gray-100 rounded-2xl px-4 py-4 shadow-sm flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center shrink-0">
                  <Navigation size={16} strokeWidth={1.5} className="text-gray-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-gray-800 text-sm font-semibold truncate">{p.name}</p>
                  <p className="text-gray-400 text-xs truncate mt-0.5">{p.address}</p>
                </div>
                <span className="text-gray-400 text-xs font-medium shrink-0">{p.distance}</span>
              </div>
            ))}
          </div>
        )}

        {/* HARİTA */}
        {view === 'map' && (
          <div>
            <MapContainer
              center={[BASE.lat, BASE.lon]}
              zoom={15}
              style={{ width: '100%', height: 'calc(100vh - 105px)' }}
              zoomControl={false}
              attributionControl={false}
            >
              <TileLayer
                url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                attribution='&copy; OpenStreetMap &copy; CARTO'
              />
              {markers.map(p => (
                <Marker key={p.id} position={[p.lat, p.lon]}>
                  <Popup>
                    <div className="text-xs">
                      <p className="font-semibold">{p.name}</p>
                      <p className="text-gray-500 mt-0.5">{p.distance}</p>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        )}
      </div>

      {/* ATM — Banka Seç */}
      {showBankFilter && (
        <div className="fixed bottom-0 left-0 right-0 z-40 flex justify-center">
          <div className="w-full max-w-[430px] bg-white border-t border-gray-100 px-4 py-3">
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
