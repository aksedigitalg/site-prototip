import { useNavigate } from 'react-router-dom'
import {
  Menu, MapPin, ChevronDown, Search,
  Pill, Landmark, Hospital, Fuel, ParkingCircle, Zap,
  UtensilsCrossed, Soup, Wrench, Briefcase, Home as HomeIcon,
  Calendar, ShoppingBag,
} from 'lucide-react'
import BottomNav from '../components/BottomNav'
import { MOCK_PLACES } from '../data/mockPlaces'

const QUICK_ACCESS = [
  { icon: Pill,          label: 'Eczane',    type: 'pharmacy' },
  { icon: Landmark,      label: 'ATM',       type: 'atm' },
  { icon: Fuel,          label: 'Benzinlik', type: 'fuel' },
  { icon: ParkingCircle, label: 'Otopark',   type: 'parking' },
  { icon: Zap,           label: 'Şarj',      type: 'charging' },
]

const CATEGORIES = [
  { icon: UtensilsCrossed, label: 'Yemek',      path: '/food' },
  { icon: Soup,            label: 'Restoran',   path: '/food' },
  { icon: Wrench,          label: 'Hizmetler',  path: null },
  { icon: Briefcase,       label: 'İş İlanları',path: null },
  { icon: HomeIcon,        label: 'Emlak',      path: null },
  { icon: Calendar,        label: 'Etkinlikler',path: null },
  { icon: ShoppingBag,     label: 'Alışveriş',  path: null },
]

function NearbyCard({ icon: Icon, title, type, onPress }) {
  const first = MOCK_PLACES[type]?.[0]
  return (
    <div
      onClick={onPress}
      className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm flex flex-col gap-2 cursor-pointer active:scale-95 transition-transform"
    >
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-xl bg-gray-100 flex items-center justify-center shrink-0">
          <Icon size={15} strokeWidth={1.5} className="text-gray-700" />
        </div>
        <span className="text-gray-600 text-xs font-semibold">{title}</span>
      </div>
      <p className="text-gray-800 text-xs font-medium leading-snug line-clamp-2">{first?.name}</p>
      <p className="text-gray-400 text-xs">{first?.distance}</p>
    </div>
  )
}

export default function Home() {
  const navigate = useNavigate()
  const raw = localStorage.getItem('sehir_user')
  const user = raw ? JSON.parse(raw) : null

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
      <div className="pt-16 pb-24">

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
            {QUICK_ACCESS.map(({ icon: Icon, label, type }) => (
              <button
                key={label}
                onClick={() => navigate(`/nearby/${type}`)}
                className="flex flex-col items-center gap-2 shrink-0 active:scale-95 transition-transform"
              >
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
            <NearbyCard icon={Pill}     title="Nöbetçi Eczane" type="pharmacy" onPress={() => navigate('/nearby/pharmacy')} />
            <NearbyCard icon={Landmark} title="En Yakın ATM"   type="atm"      onPress={() => navigate('/nearby/atm')} />
          </div>
        </div>

        {/* Kategoriler */}
        <div className="px-4 pt-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-gray-800 text-sm font-semibold">Kategoriler</h2>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {CATEGORIES.map(({ icon: Icon, label, path }) => (
              <button
                key={label}
                onClick={() => path && navigate(path)}
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
