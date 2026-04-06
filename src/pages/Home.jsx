import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Bell, MapPin, ChevronDown, Search,
  Pill, CreditCard, Fuel, ParkingCircle, Zap, Bus,
  UtensilsCrossed, Soup, Wrench, Tag,
  Calendar, ShoppingBag, Sparkles,
  Key, Users, Building2, Stethoscope, Shield, Flame,
  Hotel, Coffee, Scissors, Dumbbell, BookOpen, PawPrint,
  Mail, GraduationCap, Navigation, Plus, X, ChevronRight, Clock,
} from 'lucide-react'
import { MOCK_PLACES } from '../data/mockPlaces'

// ─── Slider banner'ları ───────────────────────────────────────────────────────
const SLIDER_ITEMS = [
  { id: 1, baslik: 'Soru Sor, Cevap Al', alt: 'GebzemAI yapay zeka asistanın', path: '/gebzem-ai' },
]

// ─── Hızlı erişim ────────────────────────────────────────────────────────────
const QUICK_ACCESS = [
  { icon: Pill,          label: 'Eczane',    type: 'pharmacy' },
  { icon: CreditCard,    label: 'ATM',       type: 'atm' },
  { icon: Fuel,          label: 'Benzinlik', type: 'fuel' },
  { icon: ParkingCircle, label: 'Otopark',   type: 'parking' },
  { icon: Zap,           label: 'Şarj',      type: 'charging' },
  { icon: Bus,           label: 'Otobüs',   type: 'bus' },
]

// ─── Tüm kategoriler (bottom sheet) ─────────────────────────────────────────
const TUM_KATEGORILER = [
  { icon: Pill,          label: 'Eczane',       type: 'pharmacy' },
  { icon: CreditCard,    label: 'ATM',           type: 'atm' },
  { icon: Fuel,          label: 'Benzinlik',     type: 'fuel' },
  { icon: ParkingCircle, label: 'Otopark',       type: 'parking' },
  { icon: Zap,           label: 'Şarj',          type: 'charging' },
  { icon: Key,           label: 'Çilingir',      type: 'locksmith' },
  { icon: Users,         label: 'Toplanma',      type: 'assembly' },
  { icon: Building2,     label: 'Tarihi Yer',    type: 'historic' },
  { icon: Building2,     label: 'Belediye',      type: 'municipality' },
  { icon: Stethoscope,   label: 'Sağlık Ocağı', type: 'clinic' },
  { icon: Shield,        label: 'Polis',         type: 'police' },
  { icon: Flame,         label: 'İtfaiye',       type: 'firefighter' },
  { icon: Hotel,         label: 'Konaklama',     type: 'hotel' },
  { icon: Coffee,        label: 'Kafe',          type: 'cafe' },
  { icon: Scissors,      label: 'Kuaför',        type: 'salon' },
  { icon: Dumbbell,      label: 'Spor Salonu',   type: 'gym' },
  { icon: BookOpen,      label: 'Kütüphane',     type: 'library' },
  { icon: ShoppingBag,   label: 'AVM',           type: 'mall' },
  { icon: PawPrint,      label: 'Veteriner',     type: 'vet' },
  { icon: Mail,          label: 'PTT',           type: 'ptt' },
  { icon: Building2,     label: 'Cami',          type: 'mosque' },
  { icon: GraduationCap, label: 'Okul',          type: 'school' },
]

const CATEGORIES = [
  { icon: UtensilsCrossed, label: 'Yemek',       path: '/food' },
  { icon: Soup,            label: 'Restoran',    path: '/food' },
  { icon: ShoppingBag,     label: 'Alışveriş',   path: '/alisveris' },
  { icon: Wrench,          label: 'Hizmetler',   path: '/services' },
  { icon: Tag,             label: 'İlanlar',     path: '/ilanlar' },
  { icon: Calendar,        label: 'Etkinlikler', path: '/etkinlikler' },
  { icon: Hotel,           label: 'Otel',        path: '/oteller' },
]

const TUM_KATEGORILER_BUYUK = [
  { emoji: '🍜', label: 'Yemek',          path: '/food',         renk: '#fff7ed' },
  { emoji: '🍽️', label: 'Restoran',       path: '/food',         renk: '#fff7ed' },
  { emoji: '🛍️', label: 'Alışveriş',      path: '/alisveris',    renk: '#eff6ff' },
  { emoji: '🔧', label: 'Hizmetler',      path: '/services',     renk: '#f0fdf4' },
  { emoji: '🏠', label: 'İlanlar',         path: '/ilanlar',      renk: '#fdf4ff' },
  { emoji: '🎭', label: 'Etkinlikler',    path: '/etkinlikler',  renk: '#fef9c3' },
  { emoji: '💼', label: 'İş İlanları',    path: '/is-ilanlari',  renk: '#f0f9ff' },
  { emoji: '🏨', label: 'Otel',           path: '/oteller',      renk: '#fef2f2' },
  { emoji: '🚗', label: 'Araç Kiralama',  path: '/arac-kiralama',renk: '#f5f3ff' },
  { emoji: '🤖', label: 'GebzemAI',       path: '/gebzem-ai',    renk: '#f3e8ff' },
  { emoji: '🗺️', label: 'Keşfet',         path: '/explore',      renk: '#ecfdf5' },
  { emoji: '🎯', label: 'Kampanyalar',    path: '/campaigns',    renk: '#fff1f2' },
]

const KAYITLI_KONUMLAR = [
  { id: 1, isim: 'İstanbul', altIsim: 'Türkiye' },
  { id: 2, isim: 'Gebze', altIsim: 'Kocaeli' },
]

// ─── Yakınında kartı (hepsi aynı yatay scroll içinde) ────────────────────────
function NearbyCard({ logo, letter, letterBg, icon: Icon, title, type, isBus, onPress }) {
  const first = MOCK_PLACES[type]?.[0]
  return (
    <button
      onClick={onPress}
      className="shrink-0 flex flex-col gap-3 bg-white rounded-2xl p-3.5 active:scale-95 transition-transform text-left"
      style={{ width: 'calc(50% - 6px)' }}
    >
      <div className="flex items-center justify-between">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center overflow-hidden"
          style={{ background: letterBg || (logo ? '#f5f5f5' : '#f3f4f6') }}
        >
          {letter
            ? <span className="text-white font-black text-sm leading-none">{letter}</span>
            : logo
              ? <img src={logo} alt={title} className="w-full h-full object-contain" />
              : Icon ? <Icon size={16} strokeWidth={1.5} className="text-gray-600" /> : null
          }
        </div>
        {isBus && first?.nextBus && (
          <div className="flex items-center gap-1 bg-green-50 rounded-lg px-2 py-1">
            <Clock size={9} strokeWidth={2} className="text-green-600" />
            <span className="text-green-600 text-[10px] font-bold">{first.nextBus} dk</span>
          </div>
        )}
      </div>
      <div className="min-w-0">
        <p className="text-gray-400 text-[10px] font-medium mb-0.5">{title}</p>
        <p className="text-gray-800 text-xs font-bold leading-snug line-clamp-2">{first?.name}</p>
        <p className="text-gray-400 text-[10px] mt-1.5">{first?.distance}</p>
      </div>
    </button>
  )
}

export default function Home() {
  const navigate = useNavigate()
  const raw = localStorage.getItem('sehir_user')
  const user = raw ? JSON.parse(raw) : null

  const [aktifKonum, setAktifKonum] = useState(
    localStorage.getItem('sehir_konum') || 'İstanbul'
  )
  const [konumSheet,       setKonumSheet]       = useState(false)
  const [kategoriSheet,    setKategoriSheet]    = useState(false)
  const [tumKatSheet,      setTumKatSheet]      = useState(false)

  function konumSec(isim) {
    setAktifKonum(isim)
    localStorage.setItem('sehir_konum', isim)
    setKonumSheet(false)
  }

  return (
    <div className="min-h-screen" style={{ background: '#f5f6f8' }}>

      {/* ── Header ── */}
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center">
        <div className="w-full max-w-[430px] flex items-center" style={{ paddingLeft: 20, paddingRight: 20, gap: 8, paddingTop: 10, height: 56 }}>
          {/* Profil resmi */}
          <button onClick={() => navigate('/profile')} className="w-9 h-9 rounded-full overflow-hidden shrink-0 active:scale-95 transition-transform">
            <img src={localStorage.getItem('sehir_avatar') || '/profil.jpeg'} alt="" className="w-full h-full object-cover" />
          </button>

          {/* Selamlama */}
          <div className="flex-1 min-w-0">
            <p className="text-gray-900 truncate" style={{ fontSize: 15 }}><span className="font-normal">{new Date().getHours() < 12 ? 'Günaydın' : new Date().getHours() < 18 ? 'İyi Günler' : 'İyi Akşamlar'}, </span><span className="font-bold">{user?.firstName}</span></p>
          </div>

          {/* Arama + Menü sağda */}

          {/* Arama */}
          <button onClick={() => navigate('/search')} className="rounded-full bg-white flex items-center justify-center active:scale-90 transition-transform" style={{ width: 42, height: 42 }}>
            <Search size={18} strokeWidth={2} className="text-gray-900" />
          </button>

          {/* Bildirim */}
          <button onClick={() => navigate('/bildirimler')} className="rounded-full bg-white flex items-center justify-center active:scale-90 transition-transform" style={{ width: 42, height: 42 }}>
            <Bell size={18} strokeWidth={2} className="text-gray-900" />
          </button>
        </div>
      </header>

      {/* ── İçerik ── */}
      <div style={{ paddingTop: 56, paddingBottom: 96, paddingLeft: 20, paddingRight: 20 }}>

        {/* ── Banner ── */}
        <div style={{ paddingTop: 16 }}>
          <button
            onClick={() => navigate(SLIDER_ITEMS[0].path)}
            className="w-full flex flex-col justify-end rounded-2xl active:scale-[0.98] transition-transform"
            style={{ background: '#ffffff', minHeight: '210px', padding: '30px' }}
          >
            <p className="text-gray-900 font-extrabold leading-snug text-left" style={{ fontSize: 22 }}>{SLIDER_ITEMS[0].baslik}</p>
            <p className="text-gray-400 text-xs mt-1.5 text-left">{SLIDER_ITEMS[0].alt}</p>
          </button>
        </div>

        {/* ── Hızlı Erişim ── */}
        <div style={{ paddingTop: 16 }}>
          <div style={{ marginBottom: 12 }} className="flex items-center justify-between">
            <button onClick={() => setKategoriSheet(true)}><h2 className="text-gray-800 font-semibold" style={{ fontSize: 18 }}>Şehir Rehberi <span className="text-gray-400">›</span></h2></button>
          </div>
          <div className="grid grid-cols-6 gap-2">
            {QUICK_ACCESS.map(({ icon: Icon, label, type }) => (
              <button
                key={label}
                onClick={() => navigate(`/nearby/${type}`)}
                className="flex flex-col items-center gap-1.5 active:scale-95 transition-transform"
              >
                <div className="rounded-2xl bg-white flex items-center justify-center" style={{ width: 52, height: 52 }}>
                  <Icon size={22} strokeWidth={1.8} className="text-gray-700" />
                </div>
                <span className="text-gray-500 text-[12px] font-medium">{label}</span>
              </button>
            ))}

          </div>
        </div>


      </div>




      {/* ════════ TÜM KATEGORİLER BOTTOM SHEET (80% yükseklik) ════════ */}
      {tumKatSheet && (
        <div className="fixed inset-0 z-[100] flex flex-col justify-end">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setTumKatSheet(false)} />
          <div
            className="relative bg-white rounded-t-3xl z-10 flex flex-col"
            style={{ height: '80vh' }}
          >
            {/* iPhone çentik */}
            <div className="flex justify-center pt-3 pb-2 shrink-0">
              <div className="w-10 h-1.5 rounded-full bg-gray-300" />
            </div>

            <div className="flex items-center justify-between px-5 pb-3 shrink-0">
              <h3 className="text-gray-900 text-base font-bold">Kategoriler</h3>
              <button onClick={() => setTumKatSheet(false)} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                <X size={16} strokeWidth={2} className="text-gray-600" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-4 pb-8">

              {/* GebzemAI — en üstte */}
              <button
                onClick={() => { setTumKatSheet(false); navigate('/gebzem-ai') }}
                className="w-full flex items-center gap-3 rounded-2xl px-4 py-4 mb-4 active:scale-[0.97] transition-transform"
                style={{ background: 'linear-gradient(135deg, #7C3AED 0%, #9333EA 55%, #EC4899 100%)' }}
              >
                <div className="w-11 h-11 rounded-xl bg-white/15 flex items-center justify-center shrink-0">
                  <Sparkles size={20} strokeWidth={2} className="text-white" />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-white text-sm font-bold">GebzemAI</p>
                  <p className="text-white/60 text-xs mt-0.5">Yapay zeka ile şehrini keşfet</p>
                </div>
                <ChevronRight size={16} strokeWidth={1.5} className="text-white/40" />
              </button>

              {/* Kategoriler grid */}
              <div className="grid grid-cols-3 gap-3">
                {TUM_KATEGORILER_BUYUK.map(({ emoji, label, path, renk }) => (
                  <button
                    key={label}
                    onClick={() => {
                      setTumKatSheet(false)
                      if (path) navigate(path)
                    }}
                    className="flex flex-col items-center justify-center gap-3 py-5 rounded-2xl active:scale-95 transition-transform"
                    style={{ background: renk }}
                  >
                    <span className="text-3xl">{emoji}</span>
                    <span className="text-gray-700 text-xs font-semibold text-center leading-tight px-1">{label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ════════ KONUM BOTTOM SHEET ════════ */}
      {konumSheet && (
        <div className="fixed inset-0 z-[100] flex flex-col justify-end">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setKonumSheet(false)} />
          <div className="relative bg-white rounded-t-3xl px-5 pt-5 pb-10 flex flex-col gap-4 z-10">
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-gray-900 text-base font-bold">Konum Seç</h3>
              <button onClick={() => setKonumSheet(false)} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                <X size={16} strokeWidth={2} className="text-gray-600" />
              </button>
            </div>

            {/* Mevcut konumumu kullan */}
            <button className="flex items-center gap-3 bg-gray-50 rounded-2xl px-4 py-3.5 active:bg-gray-100 transition-colors">
              <div className="w-9 h-9 rounded-xl bg-gray-900 flex items-center justify-center shrink-0">
                <Navigation size={16} strokeWidth={2} className="text-white" />
              </div>
              <div className="text-left">
                <p className="text-gray-800 text-sm font-semibold">Mevcut Konumumu Kullan</p>
                <p className="text-gray-400 text-xs">GPS ile otomatik algıla</p>
              </div>
            </button>

            {/* Kayıtlı konumlar */}
            <div className="flex flex-col gap-2">
              {KAYITLI_KONUMLAR.map(k => (
                <button
                  key={k.id}
                  onClick={() => konumSec(k.isim)}
                  className="flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-colors active:bg-gray-50"
                  style={{ background: aktifKonum === k.isim ? '#f9fafb' : 'transparent', border: aktifKonum === k.isim ? '1.5px solid #e5e7eb' : '1.5px solid transparent' }}
                >
                  <div className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center shrink-0">
                    <MapPin size={16} strokeWidth={1.5} className="text-gray-600" />
                  </div>
                  <div className="text-left flex-1">
                    <p className="text-gray-800 text-sm font-semibold">{k.isim}</p>
                    <p className="text-gray-400 text-xs">{k.altIsim}</p>
                  </div>
                  {aktifKonum === k.isim && (
                    <div className="w-2 h-2 rounded-full bg-gray-900" />
                  )}
                </button>
              ))}
            </div>

            {/* Yeni konum ekle */}
            <button className="flex items-center gap-3 border border-dashed border-gray-300 rounded-2xl px-4 py-3.5 active:bg-gray-50 transition-colors">
              <div className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center shrink-0">
                <Plus size={16} strokeWidth={2} className="text-gray-600" />
              </div>
              <p className="text-gray-600 text-sm font-medium">Yeni Konum Ekle</p>
            </button>
          </div>
        </div>
      )}

      {/* ════════ KATEGORİ BOTTOM SHEET (Tüm Hızlı Erişim) ════════ */}
      {kategoriSheet && (
        <div className="fixed inset-0 z-[100] flex flex-col justify-end">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setKategoriSheet(false)} />
          <div className="relative bg-white rounded-t-3xl px-5 pt-5 pb-10 z-10">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-900 text-base font-bold">Tüm Kategoriler</h3>
              <button onClick={() => setKategoriSheet(false)} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                <X size={16} strokeWidth={2} className="text-gray-600" />
              </button>
            </div>
            <div className="grid grid-cols-5 gap-3">
              {TUM_KATEGORILER.map(({ icon: Icon, label, type }) => (
                <button
                  key={label}
                  onClick={() => { setKategoriSheet(false); navigate(`/nearby/${type}`) }}
                  className="flex flex-col items-center gap-1.5 active:scale-95 transition-transform"
                >
                  <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center">
                    <Icon size={18} strokeWidth={1.5} className="text-gray-700" />
                  </div>
                  <span className="text-gray-500 text-[10px] font-medium text-center leading-tight">{label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
