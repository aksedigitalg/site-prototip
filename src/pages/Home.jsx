import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Menu, MapPin, ChevronDown, Search,
  Pill, Landmark, Fuel, ParkingCircle, Zap,
  UtensilsCrossed, Soup, Wrench, Briefcase, Tag,
  Calendar, ShoppingBag, Sparkles,
  Key, Users, Building2, Stethoscope, Shield, Flame,
  Hotel, Coffee, Scissors, Dumbbell, BookOpen, PawPrint,
  Mail, GraduationCap, Navigation, Plus, X, ChevronRight,
} from 'lucide-react'
import BottomNav from '../components/BottomNav'
import { MOCK_PLACES } from '../data/mockPlaces'

// ─── Slider banner'ları ───────────────────────────────────────────────────────
const SLIDER_ITEMS = [
  { id: 1, baslik: "Gebze'de 50+ Yeni İşletme", alt: 'Hepsini Keşfet →', bg: '#111827', path: '/explore' },
  { id: 2, baslik: 'Nisan Etkinlikleri Başladı', alt: '8 etkinlik seni bekliyor →', bg: '#1e3a5f', path: '/etkinlikler' },
  { id: 3, baslik: "GebzemAI ile Şehrini Keşfet", alt: 'Hemen Dene →', bg: '#3b0764', path: '/gebzem-ai' },
]

// ─── Hızlı erişim (ilk 5 — scrollable satırda gösterilen) ───────────────────
const QUICK_ACCESS = [
  { icon: Pill,          label: 'Eczane',    type: 'pharmacy' },
  { icon: Landmark,      label: 'ATM',       type: 'atm' },
  { icon: Fuel,          label: 'Benzinlik', type: 'fuel' },
  { icon: ParkingCircle, label: 'Otopark',   type: 'parking' },
  { icon: Zap,           label: 'Şarj',      type: 'charging' },
]

// ─── Tüm kategoriler (bottom sheet) ─────────────────────────────────────────
const TUM_KATEGORILER = [
  { icon: Pill,          label: 'Eczane',       type: 'pharmacy' },
  { icon: Landmark,      label: 'ATM',           type: 'atm' },
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
  { icon: Wrench,          label: 'Hizmetler',   path: '/services' },
  { icon: Briefcase,       label: 'İş İlanları', path: null },
  { icon: Tag,             label: 'İlanlar',     path: '/ilanlar' },
  { icon: Calendar,        label: 'Etkinlikler', path: '/etkinlikler' },
  { icon: ShoppingBag,     label: 'Alışveriş',   path: '/alisveris' },
]

const KAYITLI_KONUMLAR = [
  { id: 1, isim: 'İstanbul', altIsim: 'Türkiye' },
  { id: 2, isim: 'Gebze', altIsim: 'Kocaeli' },
]

// ─── Yakında kart ─────────────────────────────────────────────────────────────
function NearbyCard({ logo, title, subtitle, type, onPress }) {
  const first = MOCK_PLACES[type]?.[0]
  return (
    <div
      onClick={onPress}
      className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm flex flex-col gap-2 cursor-pointer active:scale-95 transition-transform"
    >
      <div className="flex items-center gap-2">
        <div className="w-9 h-9 rounded-lg bg-gray-50 flex items-center justify-center shrink-0 overflow-hidden">
          <img src={logo} alt={title} className="w-full h-full object-contain" />
        </div>
        <div className="flex flex-col">
          <span className="text-gray-600 text-xs font-semibold">{title}</span>
          {subtitle && <span className="text-gray-400 text-[10px]">{subtitle}</span>}
        </div>
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

  const [aktifKonum, setAktifKonum] = useState(
    localStorage.getItem('sehir_konum') || 'İstanbul'
  )
  const [konumSheet,    setKonumSheet]    = useState(false)
  const [kategoriSheet, setKategoriSheet] = useState(false)
  const [sliderIdx,     setSliderIdx]     = useState(0)
  const sliderRef = useRef(null)

  // Otomatik slider
  useEffect(() => {
    const t = setInterval(() => {
      setSliderIdx(prev => (prev + 1) % SLIDER_ITEMS.length)
    }, 3500)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    if (!sliderRef.current) return
    sliderRef.current.scrollTo({ left: sliderIdx * sliderRef.current.offsetWidth, behavior: 'smooth' })
  }, [sliderIdx])

  function konumSec(isim) {
    setAktifKonum(isim)
    localStorage.setItem('sehir_konum', isim)
    setKonumSheet(false)
  }

  function handleSliderScroll() {
    if (!sliderRef.current) return
    const idx = Math.round(sliderRef.current.scrollLeft / sliderRef.current.offsetWidth)
    setSliderIdx(idx)
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ── Header ── */}
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center">
        <div className="w-full max-w-[430px] bg-white/80 backdrop-blur-md border-b border-gray-100 px-4 py-3 flex items-center justify-between">
          <button className="w-9 h-9 flex items-center justify-center">
            <Menu size={20} strokeWidth={1.5} className="text-gray-700" />
          </button>

          {/* Konum butonu */}
          <button
            onClick={() => setKonumSheet(true)}
            className="flex items-center gap-1 active:scale-95 transition-transform"
          >
            <MapPin size={13} strokeWidth={1.5} className="text-gray-500" />
            <span className="text-gray-800 text-sm font-semibold">{aktifKonum}</span>
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

      {/* ── İçerik ── */}
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

        {/* ── Slider ── */}
        <div className="pt-4 px-4">
          <div
            ref={sliderRef}
            onScroll={handleSliderScroll}
            className="flex overflow-x-auto rounded-2xl"
            style={{ scrollbarWidth: 'none', scrollSnapType: 'x mandatory' }}
          >
            {SLIDER_ITEMS.map((item, i) => (
              <button
                key={item.id}
                onClick={() => navigate(item.path)}
                className="shrink-0 w-full flex flex-col justify-end px-5 py-5 active:scale-[0.98] transition-transform"
                style={{
                  scrollSnapAlign: 'start',
                  background: item.bg,
                  minHeight: '110px',
                  borderRadius: '16px',
                }}
              >
                <p className="text-white text-base font-bold leading-snug text-left">{item.baslik}</p>
                <p className="text-white/60 text-xs mt-1 text-left">{item.alt}</p>
              </button>
            ))}
          </div>
          {/* Dot indikatörler */}
          <div className="flex justify-center gap-1.5 mt-2">
            {SLIDER_ITEMS.map((_, i) => (
              <button
                key={i}
                onClick={() => setSliderIdx(i)}
                className="transition-all rounded-full"
                style={{
                  width: i === sliderIdx ? '16px' : '6px',
                  height: '6px',
                  background: i === sliderIdx ? '#111827' : '#d1d5db',
                }}
              />
            ))}
          </div>
        </div>

        {/* ── Hızlı Erişim ── */}
        <div className="pt-5">
          <div className="px-4 mb-3 flex items-center justify-between">
            <h2 className="text-gray-800 text-sm font-semibold">Hızlı Erişim</h2>
          </div>
          <div className="flex gap-3 px-4 overflow-x-auto pb-1 items-center" style={{ scrollbarWidth: 'none' }}>
            {QUICK_ACCESS.map(({ icon: Icon, label, type }) => (
              <button
                key={label}
                onClick={() => navigate(`/nearby/${type}`)}
                className="flex flex-col items-center gap-1.5 shrink-0 active:scale-95 transition-transform"
              >
                <div className="w-13 h-13 rounded-2xl bg-white border border-gray-100 shadow-sm flex items-center justify-center" style={{ width: 52, height: 52 }}>
                  <Icon size={20} strokeWidth={1.5} className="text-gray-700" />
                </div>
                <span className="text-gray-500 text-[11px] font-medium">{label}</span>
              </button>
            ))}

            {/* Tümü butonu */}
            <button
              onClick={() => setKategoriSheet(true)}
              className="flex flex-col items-center gap-1.5 shrink-0 active:scale-95 transition-transform"
            >
              <div className="rounded-2xl bg-gray-900 flex items-center justify-center" style={{ width: 52, height: 52 }}>
                <ChevronRight size={18} strokeWidth={2} className="text-white" />
              </div>
              <span className="text-gray-500 text-[11px] font-medium">Tümü</span>
            </button>
          </div>
        </div>

        {/* ── Yakınında ── */}
        <div className="px-4 pt-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-gray-800 text-sm font-semibold">Yakınında</h2>
            <span className="text-gray-400 text-xs">Konumundan</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <NearbyCard
              logo="https://atakoyplus.com/wp-content/uploads/2022/03/eczane.png"
              title="Nöbetçi Eczane"
              type="pharmacy"
              onPress={() => navigate('/nearby/pharmacy')}
            />
            <NearbyCard
              logo="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Ziraat_Bankas%C4%B1_logo.svg/1200px-Ziraat_Bankas%C4%B1_logo.svg.png"
              title="En Yakın ATM"
              type="atm"
              onPress={() => navigate('/nearby/atm')}
            />
          </div>
        </div>

        {/* ── Kategoriler ── */}
        <div className="px-4 pt-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-gray-800 text-sm font-semibold">Kategoriler</h2>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {CATEGORIES.map(({ icon: Icon, label, path }) => (
              <button
                key={label}
                onClick={() => { if (path) navigate(path) }}
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

      {/* ── GebzemAI FAB ── */}
      <button
        onClick={() => navigate('/gebzem-ai')}
        className="fixed z-50 flex items-center gap-2 active:scale-90 transition-transform"
        style={{
          bottom: '78px',
          right: '16px',
          background: 'linear-gradient(135deg, #7C3AED 0%, #9333EA 55%, #EC4899 100%)',
          boxShadow: '0 4px 20px rgba(147,51,234,0.45), 0 2px 8px rgba(236,72,153,0.25)',
          borderRadius: '20px',
          padding: '10px 16px 10px 12px',
        }}
      >
        <Sparkles size={16} strokeWidth={2} className="text-white" />
        <span className="text-white text-xs font-bold tracking-wide">GebzemAI</span>
      </button>

      {/* ── Dev Sıfırla ── */}
      <button
        onClick={() => { localStorage.clear(); sessionStorage.clear(); window.location.href = '/' }}
        className="fixed bottom-24 left-4 z-50 bg-gray-800 text-white text-xs px-3 py-2 rounded-full opacity-40 hover:opacity-100 transition-opacity"
      >
        ↺ Sıfırla
      </button>

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
