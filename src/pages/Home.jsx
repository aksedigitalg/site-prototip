import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Menu, MapPin, ChevronDown, Search,
  Pill, Landmark, Hospital, Fuel, ShoppingCart, ParkingCircle,
  UtensilsCrossed, Soup, Wrench, Briefcase, Home as HomeIcon,
  Calendar, ShoppingBag, LogOut,
} from 'lucide-react'
import BottomNav from '../components/BottomNav'

const QUICK_ACCESS = [
  { icon: Pill,          label: 'Eczane',    amenity: 'pharmacy' },
  { icon: Landmark,      label: 'ATM',       amenity: 'atm' },
  { icon: Hospital,      label: 'Hastane',   amenity: 'hospital' },
  { icon: Fuel,          label: 'Benzinlik', amenity: 'fuel' },
  { icon: ShoppingCart,  label: 'Market',    amenity: 'supermarket' },
  { icon: ParkingCircle, label: 'Otopark',   amenity: 'parking' },
]

const CATEGORIES = [
  { icon: UtensilsCrossed, label: 'Yemek' },
  { icon: Soup,            label: 'Restoran' },
  { icon: Wrench,          label: 'Hizmetler' },
  { icon: Briefcase,       label: 'İş İlanları' },
  { icon: HomeIcon,        label: 'Emlak' },
  { icon: Calendar,        label: 'Etkinlikler' },
  { icon: ShoppingBag,     label: 'Alışveriş' },
]

async function fetchOverpass(lat, lon, amenity) {
  const query = `[out:json][timeout:10];node["amenity"="${amenity}"](around:2000,${lat},${lon});out body 3;`
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
  return d < 1000 ? `${Math.round(d)} m` : `${(d / 1000).toFixed(1)} km`
}

function NearbyCard({ icon: Icon, title, data, loading }) {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-xl bg-gray-100 flex items-center justify-center shrink-0">
          <Icon size={15} strokeWidth={1.5} className="text-gray-700" />
        </div>
        <span className="text-gray-600 text-xs font-semibold">{title}</span>
      </div>
      {loading ? (
        <div className="space-y-1.5">
          <div className="h-3 bg-gray-100 rounded animate-pulse w-3/4" />
          <div className="h-3 bg-gray-100 rounded animate-pulse w-1/3" />
        </div>
      ) : data ? (
        <>
          <p className="text-gray-800 text-xs font-medium leading-snug line-clamp-2">
            {data.tags?.name || data.tags?.operator || title}
          </p>
          <p className="text-gray-400 text-xs">{data.distance}</p>
        </>
      ) : (
        <p className="text-gray-400 text-xs">Konum izni gerekli</p>
      )}
    </div>
  )
}

export default function Home() {
  const navigate = useNavigate()
  const raw = localStorage.getItem('sehir_user')
  const user = raw ? JSON.parse(raw) : null

  const [pharmacy, setPharmacy] = useState(null)
  const [atm, setAtm] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!navigator.geolocation) { setLoading(false); return }
    navigator.geolocation.getCurrentPosition(
      async ({ coords: { latitude: lat, longitude: lon } }) => {
        try {
          const [pharmacies, atms] = await Promise.all([
            fetchOverpass(lat, lon, 'pharmacy'),
            fetchOverpass(lat, lon, 'atm'),
          ])
          if (pharmacies[0]) setPharmacy({ ...pharmacies[0], distance: haversine(lat, lon, pharmacies[0].lat, pharmacies[0].lon) })
          if (atms[0]) setAtm({ ...atms[0], distance: haversine(lat, lon, atms[0].lat, atms[0].lon) })
        } catch (_) {}
        setLoading(false)
      },
      () => setLoading(false)
    )
  }, [])

  function handleLogout() {
    localStorage.removeItem('sehir_session')
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center">
        <div className="w-full max-w-[430px] bg-white/80 backdrop-blur-md border-b border-gray-100 px-4 py-3 flex items-center justify-between">
          <button className="w-9 h-9 flex items-center justify-center">
            <Menu size={20} strokeWidth={1.5} className="text-gray-700" />
          </button>

          <button className="flex items-center gap-1">
            <MapPin size={13} strokeWidth={1.5} className="text-gray-500" />
            <span className="text-gray-800 text-sm font-semibold">İstanbul</span>
            <ChevronDown size={13} strokeWidth={1.5} className="text-gray-400" />
          </button>

          <button
            onClick={() => navigate('/profile')}
            className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center"
          >
            <span className="text-gray-700 text-xs font-bold">
              {user?.firstName?.[0]}{user?.lastName?.[0]}
            </span>
          </button>
        </div>
      </header>

      {/* İçerik */}
      <div className="pt-16 pb-24 overflow-y-auto">

        {/* Arama */}
        <div className="px-4 pt-4 pb-1">
          <button
            onClick={() => navigate('/search')}
            className="w-full flex items-center gap-3 bg-white border border-gray-200 rounded-2xl px-4 py-3 shadow-sm"
          >
            <Search size={15} strokeWidth={1.5} className="text-gray-400" />
            <span className="text-gray-400 text-sm">Ne arıyorsun?</span>
          </button>
        </div>

        {/* Hızlı Erişim */}
        <div className="pt-5">
          <div className="px-4 mb-3">
            <h2 className="text-gray-800 text-sm font-semibold">Hızlı Erişim</h2>
          </div>
          <div className="flex gap-3 px-4 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
            {QUICK_ACCESS.map(({ icon: Icon, label }) => (
              <button key={label} className="flex flex-col items-center gap-2 shrink-0">
                <div className="w-14 h-14 rounded-2xl bg-white border border-gray-100 shadow-sm flex items-center justify-center">
                  <Icon size={22} strokeWidth={1.5} className="text-gray-700" />
                </div>
                <span className="text-gray-500 text-xs font-medium">{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Yakınında */}
        <div className="px-4 pt-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-gray-800 text-sm font-semibold">Yakınında</h2>
            <span className="text-gray-400 text-xs">Konumundan</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <NearbyCard icon={Pill}     title="Nöbetçi Eczane" data={pharmacy} loading={loading} />
            <NearbyCard icon={Landmark} title="En Yakın ATM"   data={atm}      loading={loading} />
          </div>
        </div>

        {/* Kategoriler */}
        <div className="px-4 pt-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-gray-800 text-sm font-semibold">Kategoriler</h2>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {CATEGORIES.map(({ icon: Icon, label }) => (
              <button
                key={label}
                className="flex flex-col items-center gap-2 active:scale-95 transition-transform"
              >
                <div className="w-[60px] h-[60px] rounded-[14px] bg-white border border-gray-100 shadow-sm flex items-center justify-center">
                  <Icon size={24} strokeWidth={1.5} className="text-gray-700" />
                </div>
                <span className="text-gray-500 text-xs font-medium text-center leading-tight">{label}</span>
              </button>
            ))}
          </div>
        </div>

      </div>

      <BottomNav active="home" />
    </div>
  )
}
