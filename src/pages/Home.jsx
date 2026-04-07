import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Bell, MapPin, ChevronDown, Search,
  Pill, CreditCard, Fuel, ParkingCircle, Zap, Bus,
  UtensilsCrossed, Soup, Wrench, Tag,
  Calendar, ShoppingBag, Sparkles,
  Key, Users, Building2, Stethoscope, Shield, Flame,
  Hotel, Coffee, Scissors, Dumbbell, BookOpen, PawPrint,
  Mail, GraduationCap, Navigation, Plus, X, ChevronRight, Clock,
  CloudSun, Sun, Moon, DollarSign, Euro, Gem,
} from 'lucide-react'
import { MOCK_PLACES } from '../data/mockPlaces'

// ─── Slider banner'ları ───────────────────────────────────────────────────────
const SLIDER_ITEMS = [
  { id: 1, baslik: 'GebzemAI ile Tanış', path: '/gebzem-ai' },
  { id: 2, baslik: 'Şehrin Nabzını Tut', path: '/explore' },
]

// ─── Hızlı erişim ────────────────────────────────────────────────────────────
const QUICK_ACCESS = [
  { icon: Pill,          label: 'Eczane',       type: 'pharmacy' },
  { icon: CreditCard,    label: 'ATM',          type: 'atm' },
  { icon: Fuel,          label: 'Benzinlik',    type: 'fuel' },
  { icon: ParkingCircle, label: 'Otopark',      type: 'parking' },
  { icon: Key,           label: 'Çilingir',     type: 'locksmith' },
  { icon: Zap,           label: 'Şarj',         type: 'charging' },
  { icon: Bus,           label: 'Otobüs',       type: 'bus' },
  { icon: Stethoscope,   label: 'Sağlık',       type: 'clinic' },
  { icon: Coffee,        label: 'Kafe',         type: 'cafe' },
  { icon: Hotel,         label: 'Otel',         type: 'hotel' },
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
  const [sliderIndex,      setSliderIndex]      = useState(0)
  const [dovizIndex,       setDovizIndex]       = useState(0)
  const [scrolled,         setScrolled]         = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const DOVIZ_DATA = [
    { label: 'USD/TRY', deger: '38.42', Icon: DollarSign },
    { label: 'EUR/TRY', deger: '41.85', Icon: Euro },
    { label: 'Gram Altın', deger: '3.245', Icon: Gem },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setSliderIndex(prev => (prev + 1) % SLIDER_ITEMS.length)
    }, 3500)
    const dovizTimer = setInterval(() => {
      setDovizIndex(prev => (prev + 1) % 3)
    }, 3000)
    return () => { clearInterval(timer); clearInterval(dovizTimer) }
  }, [])

  function konumSec(isim) {
    setAktifKonum(isim)
    localStorage.setItem('sehir_konum', isim)
    setKonumSheet(false)
  }

  return (
    <div className="min-h-screen" style={{ background: '#f5f6f8' }}>

      {/* ── Header ── */}
      <header className={`fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-300 ${scrolled ? 'backdrop-blur-md' : ''}`} style={{ background: scrolled ? 'rgba(245,246,248,0.8)' : 'transparent' }}>
        <div className="w-full max-w-[430px] flex items-center" style={{ gap: 6, paddingTop: 10, paddingBottom: scrolled ? 10 : 0, paddingLeft: 20, paddingRight: 20 }}>
        {/* Profil resmi */}
        <button onClick={() => navigate('/profile')} className="w-9 h-9 rounded-full bg-gray-300 shrink-0 active:scale-95 transition-transform" style={{ marginRight: 4 }} />

        {/* Selamlama */}
        <div className="flex-1 min-w-0">
          <p className="text-gray-900 truncate flex items-center gap-1" style={{ fontSize: 16 }}><span className="font-normal">{new Date().getHours() < 12 ? 'Günaydın' : new Date().getHours() < 18 ? 'İyi Günler' : 'İyi Akşamlar'}</span>{new Date().getHours() < 18 ? <Sun size={16} strokeWidth={2} className="text-yellow-400" /> : <Moon size={16} strokeWidth={2} className="text-gray-400" />}<span className="font-bold">{user?.firstName}</span></p>
        </div>

        {/* Arama */}
        <button onClick={() => navigate('/search')} className="rounded-full bg-white flex items-center justify-center active:scale-90 transition-transform" style={{ width: 42, height: 42 }}>
          <Search size={18} strokeWidth={2.2} className="text-gray-900" />
        </button>

        {/* Bildirim */}
        <button onClick={() => navigate('/bildirimler')} className="rounded-full bg-white flex items-center justify-center active:scale-90 transition-transform relative" style={{ width: 42, height: 42 }}>
          <Bell size={18} strokeWidth={2.2} className="text-gray-900" />
          <div className="absolute rounded-full bg-red-500" style={{ width: 12, height: 12, top: 0, right: 0 }} />
        </button>
        </div>
      </header>

      {/* ── İçerik ── */}
      <div style={{ paddingTop: 66, paddingLeft: 20, paddingRight: 20, paddingBottom: 96 }}>

        {/* ── Banner (fade geçişli slider) ── */}
        <div>
          <div
            className="w-full relative overflow-hidden"
            style={{ borderRadius: 25, height: 210 }}
          >
            <img src="/resim1.jpg" alt="" className="absolute inset-0 w-full h-full object-cover" style={{ borderRadius: 25 }} />
            <div className="absolute inset-0" style={{ borderRadius: 25, background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0) 80%)' }} />

            {/* İçerik */}
            <div className="relative h-full flex flex-col justify-between" style={{ padding: 20 }}>
              {/* CANLI badge */}
              <div className="flex items-center gap-1 border border-red-500 rounded-full px-2 py-0.5 w-fit" style={{ background: 'rgba(239,68,68,0.9)' }}>
                <div className="rounded-full bg-white live-dot" style={{ width: 6, height: 6 }} />
                <span className="text-white text-[8px] font-bold tracking-wide">CANLI</span>
              </div>

              {/* Skor + gol bilgisi */}
              <div>
                <div className="flex items-center justify-center gap-4">
                  <span className="text-white font-bold" style={{ fontSize: 22 }}>Türkiye</span>
                  <span className="text-white font-black" style={{ fontSize: 34 }}>2 - 1</span>
                  <span className="text-white font-bold" style={{ fontSize: 22 }}>Kosova</span>
                </div>
                <div className="text-right mt-1.5" style={{ paddingRight: 'calc(50% + 24px)' }}>
                  <span className="text-white/50 text-[10px] font-medium block">Arda Güler 70'</span>
                  <span className="text-white/50 text-[10px] font-medium block">Kerem A. 60'</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Kategoriler (yatay scroll) ── */}
        <div style={{ paddingTop: 20 }}>
          <div style={{ marginBottom: 12 }}>
            <h2 className="text-gray-800 font-semibold" style={{ fontSize: 18 }}>Kategoriler <span className="text-gray-400">›</span></h2>
          </div>
          <div className="flex gap-3 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
            {[
              { label: '', bg: '#d1d5db' },
              { label: 'Yemek' },
              { label: 'Restoran' },
              { label: 'Alışveriş' },
              { label: 'Hizmetler' },
              { label: 'İlanlar' },
              { label: 'Etkinlikler' },
              { label: 'Oteller' },
              { label: 'Araç Kira' },
            ].map(({ label, bg }) => (
              <div key={label || 'ai'} className="shrink-0 flex flex-col items-center gap-1.5" style={{ minWidth: 75 }}>
                <div className="rounded-2xl relative overflow-hidden" style={{ width: 75, height: 75, background: bg || '#ffffff' }} />
                {label && <span className="text-center whitespace-nowrap" style={{ fontSize: 14, color: '#6b7280', fontWeight: 500 }}>{label}</span>}
              </div>
            ))}
          </div>
        </div>

        {/* ── Hızlı Erişim ── */}
        <div style={{ paddingTop: 20 }}>
          <div style={{ marginBottom: 12 }} className="flex items-center justify-between">
            <button onClick={() => setKategoriSheet(true)}><h2 className="text-gray-800 font-semibold" style={{ fontSize: 18 }}>Şehir Rehberi <span className="text-gray-400">›</span></h2></button>
          </div>
          <div className="grid grid-cols-5 gap-x-3" style={{ rowGap: 12 }}>
            {QUICK_ACCESS.map(({ icon: Icon, label, type }) => (
              <button
                key={label}
                onClick={() => navigate(`/nearby/${type}`)}
                className="flex flex-col items-center gap-1.5 active:scale-95 transition-transform"
              >
                <div className="rounded-2xl bg-white flex items-center justify-center" style={{ width: 60, height: 60 }}>
                  <Icon size={26} strokeWidth={1.8} className="text-gray-700" />
                </div>
                <span style={{ fontSize: 13, color: '#6b7280', fontWeight: 500 }}>{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* ── Bilgilendirme (tek kart, 3 bölüm) ── */}
        <div style={{ paddingTop: 20 }}>
          <div className="relative overflow-hidden" style={{ borderRadius: 24, background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)', padding: 20 }}>
            {/* Dekoratif daireler */}
            <div className="absolute" style={{ width: 120, height: 120, borderRadius: '50%', background: 'rgba(59,130,246,0.08)', top: -30, right: -20 }} />
            <div className="absolute" style={{ width: 80, height: 80, borderRadius: '50%', background: 'rgba(139,92,246,0.06)', bottom: -20, left: -10 }} />

            {/* Üst satır: Hava + Namaz */}
            <div className="flex gap-3 mb-3">
              {/* Hava Durumu */}
              <div className="flex-1 relative overflow-hidden" style={{ borderRadius: 16, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)', padding: '14px 16px' }}>
                <CloudSun size={50} strokeWidth={1} className="absolute -bottom-2 -right-2" style={{ color: 'rgba(255,255,255,0.06)' }} />
                <p className="text-white/50 text-[11px] font-medium">Hava Durumu</p>
                <div className="flex items-end justify-between mt-2">
                  <div>
                    <p className="text-white font-black text-2xl leading-none">9°</p>
                    <p className="text-white/40 text-[10px] mt-1">Parçalı Bulutlu</p>
                  </div>
                  <CloudSun size={24} strokeWidth={1.5} className="text-blue-400/70 mb-1" />
                </div>
              </div>

              {/* Namaz Vakti */}
              <div className="flex-1 relative overflow-hidden" style={{ borderRadius: 16, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)', padding: '14px 16px' }}>
                <Moon size={50} strokeWidth={1} className="absolute -bottom-2 -right-2" style={{ color: 'rgba(255,255,255,0.06)' }} />
                <p className="text-white/50 text-[11px] font-medium">Namaz Vakti</p>
                <div className="flex items-end justify-between mt-2">
                  <div>
                    <p className="text-white font-black text-2xl leading-none">15:42</p>
                    <p className="text-white/40 text-[10px] mt-1">İkindi</p>
                  </div>
                  <Moon size={20} strokeWidth={1.5} className="text-emerald-400/70 mb-1" />
                </div>
              </div>
            </div>

            {/* Alt satır: Döviz (tam genişlik) */}
            <div className="relative overflow-hidden" style={{ borderRadius: 16, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)', padding: '14px 16px' }}>
              <p className="text-white/50 text-[11px] font-medium mb-2">Döviz Kuru</p>
              <div className="flex items-center justify-between">
                {DOVIZ_DATA.map((d, i) => {
                  const DIcon = d.Icon
                  return (
                    <div key={i} className="flex items-center gap-2" style={{ opacity: dovizIndex === i ? 1 : 0.3, transition: 'opacity 0.5s ease' }}>
                      <DIcon size={16} strokeWidth={1.5} className="text-amber-400/70" />
                      <div>
                        <p className="text-white font-bold text-sm leading-none">{d.deger}</p>
                        <p className="text-white/30 text-[9px] mt-0.5">{d.label}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {/* ══ VARYASYON 1: Yatay banner kartlar ══ */}
        <div style={{ paddingTop: 20 }}>
          <p className="text-gray-400 text-xs font-bold mb-2">VARYASYON 1 — Banner</p>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3 bg-white rounded-2xl px-4 py-3">
              <div className="w-1 h-10 rounded-full bg-blue-400" />
              <CloudSun size={22} strokeWidth={1.5} className="text-blue-400" />
              <div className="flex-1">
                <p className="text-gray-900 text-sm font-semibold">Parçalı Bulutlu</p>
                <p className="text-gray-400 text-[11px]">Gebze</p>
              </div>
              <p className="text-gray-900 text-xl font-black">9°</p>
            </div>
            <div className="flex items-center gap-3 bg-white rounded-2xl px-4 py-3">
              <div className="w-1 h-10 rounded-full bg-emerald-400" />
              <Moon size={22} strokeWidth={1.5} className="text-emerald-400" />
              <div className="flex-1">
                <p className="text-gray-900 text-sm font-semibold">İkindi</p>
                <p className="text-gray-400 text-[11px]">Namaz Vakti</p>
              </div>
              <p className="text-gray-900 text-xl font-black">15:42</p>
            </div>
            <div className="flex items-center gap-3 bg-white rounded-2xl px-4 py-3">
              <div className="w-1 h-10 rounded-full bg-amber-400" />
              <DollarSign size={22} strokeWidth={1.5} className="text-amber-400" />
              <div className="flex-1">
                <p className="text-gray-900 text-sm font-semibold">USD/TRY</p>
                <p className="text-gray-400 text-[11px]">Döviz Kuru</p>
              </div>
              <p className="text-gray-900 text-xl font-black">38.42</p>
            </div>
          </div>
        </div>

        {/* ══ VARYASYON 2: Kompakt tek satır ══ */}
        <div style={{ paddingTop: 20 }}>
          <p className="text-gray-400 text-xs font-bold mb-2">VARYASYON 2 — Kompakt</p>
          <div className="flex items-center bg-white rounded-2xl px-4 py-4">
            <div className="flex-1 flex items-center gap-2 justify-center border-r border-gray-100">
              <CloudSun size={18} strokeWidth={1.5} className="text-blue-400" />
              <p className="text-gray-900 text-lg font-black">9°</p>
            </div>
            <div className="flex-1 flex items-center gap-2 justify-center border-r border-gray-100">
              <Moon size={18} strokeWidth={1.5} className="text-emerald-400" />
              <p className="text-gray-900 text-lg font-black">15:42</p>
            </div>
            <div className="flex-1 flex items-center gap-2 justify-center">
              <DollarSign size={18} strokeWidth={1.5} className="text-amber-400" />
              <p className="text-gray-900 text-lg font-black">38.42</p>
            </div>
          </div>
        </div>

        {/* ══ VARYASYON 3: Renkli gradient kartlar ══ */}
        <div style={{ paddingTop: 20 }}>
          <p className="text-gray-400 text-xs font-bold mb-2">VARYASYON 3 — Renkli</p>
          <div className="flex gap-3 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
            <div className="shrink-0 flex flex-col justify-between relative overflow-hidden" style={{ width: 140, height: 130, borderRadius: 22, padding: '14px 16px', background: 'linear-gradient(135deg, #3b82f6, #60a5fa)' }}>
              <CloudSun size={60} strokeWidth={1} className="absolute -bottom-2 -right-2 text-white/15" />
              <p className="text-white/80 text-[11px] font-medium">Hava Durumu</p>
              <div>
                <p className="text-white font-black text-3xl leading-none">9°</p>
                <p className="text-white/60 text-[10px] mt-1">Parçalı Bulutlu</p>
              </div>
            </div>
            <div className="shrink-0 flex flex-col justify-between relative overflow-hidden" style={{ width: 140, height: 130, borderRadius: 22, padding: '14px 16px', background: 'linear-gradient(135deg, #059669, #34d399)' }}>
              <Moon size={60} strokeWidth={1} className="absolute -bottom-2 -right-2 text-white/15" />
              <p className="text-white/80 text-[11px] font-medium">Namaz Vakti</p>
              <div>
                <p className="text-white font-black text-3xl leading-none">15:42</p>
                <p className="text-white/60 text-[10px] mt-1">İkindi</p>
              </div>
            </div>
            <div className="shrink-0 flex flex-col justify-between relative overflow-hidden" style={{ width: 140, height: 130, borderRadius: 22, padding: '14px 16px', background: 'linear-gradient(135deg, #d97706, #fbbf24)' }}>
              <DollarSign size={60} strokeWidth={1} className="absolute -bottom-2 -right-2 text-white/15" />
              <p className="text-white/80 text-[11px] font-medium">Döviz Kuru</p>
              <div>
                <p className="text-white font-black text-3xl leading-none">38.42</p>
                <p className="text-white/60 text-[10px] mt-1">USD/TRY</p>
              </div>
            </div>
          </div>
        </div>

        {/* ══ VARYASYON 4: Minimal çizgi ══ */}
        <div style={{ paddingTop: 20 }}>
          <p className="text-gray-400 text-xs font-bold mb-2">VARYASYON 4 — Minimal</p>
          <div className="bg-white rounded-2xl" style={{ padding: '16px 20px' }}>
            <div className="flex items-center justify-between py-3">
              <div className="flex items-center gap-3">
                <CloudSun size={20} strokeWidth={1.5} className="text-gray-400" />
                <div>
                  <p className="text-gray-900 text-sm font-semibold">Parçalı Bulutlu</p>
                  <p className="text-gray-400 text-[10px]">Gebze</p>
                </div>
              </div>
              <p className="text-gray-900 text-2xl font-black">9°</p>
            </div>
            <div className="h-px bg-gray-100" />
            <div className="flex items-center justify-between py-3">
              <div className="flex items-center gap-3">
                <Moon size={20} strokeWidth={1.5} className="text-gray-400" />
                <div>
                  <p className="text-gray-900 text-sm font-semibold">İkindi</p>
                  <p className="text-gray-400 text-[10px]">Namaz Vakti</p>
                </div>
              </div>
              <p className="text-gray-900 text-2xl font-black">15:42</p>
            </div>
            <div className="h-px bg-gray-100" />
            <div className="flex items-center justify-between py-3">
              <div className="flex items-center gap-3">
                <DollarSign size={20} strokeWidth={1.5} className="text-gray-400" />
                <div>
                  <p className="text-gray-900 text-sm font-semibold">USD/TRY</p>
                  <p className="text-gray-400 text-[10px]">Döviz Kuru</p>
                </div>
              </div>
              <p className="text-gray-900 text-2xl font-black">38.42</p>
            </div>
          </div>
        </div>

        {/* ══ VARYASYON 5: Büyük hava + küçük alt ══ */}
        <div style={{ paddingTop: 20 }}>
          <p className="text-gray-400 text-xs font-bold mb-2">VARYASYON 5 — Hero</p>
          <div className="relative overflow-hidden" style={{ borderRadius: 24, background: 'linear-gradient(180deg, #1e40af 0%, #3b82f6 100%)', padding: '24px 20px' }}>
            <CloudSun size={100} strokeWidth={1} className="absolute top-2 right-2 text-white/10" />
            <p className="text-white/60 text-xs font-medium">Gebze · Parçalı Bulutlu</p>
            <p className="text-white font-black mt-1" style={{ fontSize: 48, lineHeight: 1 }}>9°</p>
            <div className="flex gap-3 mt-4">
              <div className="flex-1 rounded-xl py-2.5 px-3" style={{ background: 'rgba(255,255,255,0.12)' }}>
                <p className="text-white/50 text-[10px]">Namaz</p>
                <p className="text-white font-bold text-sm">İkindi 15:42</p>
              </div>
              <div className="flex-1 rounded-xl py-2.5 px-3" style={{ background: 'rgba(255,255,255,0.12)' }}>
                <p className="text-white/50 text-[10px]">Döviz</p>
                <p className="text-white font-bold text-sm">USD 38.42</p>
              </div>
            </div>
          </div>
        </div>

        {/* ══ VARYASYON 6: Neon glow ══ */}
        <div style={{ paddingTop: 20 }}>
          <p className="text-gray-400 text-xs font-bold mb-2">VARYASYON 6 — Neon</p>
          <div className="flex gap-3 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
            <div className="shrink-0 flex flex-col justify-between" style={{ width: 140, height: 120, borderRadius: 20, padding: '14px 16px', background: '#0a0a0a', boxShadow: '0 0 20px rgba(59,130,246,0.3), inset 0 0 20px rgba(59,130,246,0.05)' }}>
              <CloudSun size={20} strokeWidth={1.5} style={{ color: '#60a5fa' }} />
              <div>
                <p style={{ color: '#60a5fa', fontSize: 28, fontWeight: 900, lineHeight: 1 }}>9°</p>
                <p className="text-white/30 text-[10px] mt-1">Bulutlu</p>
              </div>
            </div>
            <div className="shrink-0 flex flex-col justify-between" style={{ width: 140, height: 120, borderRadius: 20, padding: '14px 16px', background: '#0a0a0a', boxShadow: '0 0 20px rgba(16,185,129,0.3), inset 0 0 20px rgba(16,185,129,0.05)' }}>
              <Moon size={20} strokeWidth={1.5} style={{ color: '#34d399' }} />
              <div>
                <p style={{ color: '#34d399', fontSize: 28, fontWeight: 900, lineHeight: 1 }}>15:42</p>
                <p className="text-white/30 text-[10px] mt-1">İkindi</p>
              </div>
            </div>
            <div className="shrink-0 flex flex-col justify-between" style={{ width: 140, height: 120, borderRadius: 20, padding: '14px 16px', background: '#0a0a0a', boxShadow: '0 0 20px rgba(245,158,11,0.3), inset 0 0 20px rgba(245,158,11,0.05)' }}>
              <DollarSign size={20} strokeWidth={1.5} style={{ color: '#fbbf24' }} />
              <div>
                <p style={{ color: '#fbbf24', fontSize: 28, fontWeight: 900, lineHeight: 1 }}>38.42</p>
                <p className="text-white/30 text-[10px] mt-1">USD/TRY</p>
              </div>
            </div>
          </div>
        </div>

        {/* ══ VARYASYON 7: Pill / Tag tarzı ══ */}
        <div style={{ paddingTop: 20 }}>
          <p className="text-gray-400 text-xs font-bold mb-2">VARYASYON 7 — Pill</p>
          <div className="flex flex-wrap gap-2">
            <div className="flex items-center gap-2 bg-blue-50 rounded-full px-4 py-2.5">
              <CloudSun size={16} strokeWidth={2} className="text-blue-500" />
              <span className="text-blue-700 text-sm font-bold">9°</span>
              <span className="text-blue-400 text-xs">Bulutlu</span>
            </div>
            <div className="flex items-center gap-2 bg-emerald-50 rounded-full px-4 py-2.5">
              <Moon size={16} strokeWidth={2} className="text-emerald-500" />
              <span className="text-emerald-700 text-sm font-bold">15:42</span>
              <span className="text-emerald-400 text-xs">İkindi</span>
            </div>
            <div className="flex items-center gap-2 bg-amber-50 rounded-full px-4 py-2.5">
              <DollarSign size={16} strokeWidth={2} className="text-amber-500" />
              <span className="text-amber-700 text-sm font-bold">38.42</span>
              <span className="text-amber-400 text-xs">USD</span>
            </div>
          </div>
        </div>

        {/* ══ VARYASYON 8: Büyük rakam ortada ══ */}
        <div style={{ paddingTop: 20 }}>
          <p className="text-gray-400 text-xs font-bold mb-2">VARYASYON 8 — Centered</p>
          <div className="flex gap-3">
            <div className="flex-1 bg-white rounded-2xl flex flex-col items-center justify-center" style={{ height: 110, padding: 12 }}>
              <CloudSun size={22} strokeWidth={1.5} className="text-blue-400 mb-1" />
              <p className="text-gray-900 font-black text-2xl">9°</p>
              <p className="text-gray-400 text-[10px] mt-0.5">Bulutlu</p>
            </div>
            <div className="flex-1 bg-white rounded-2xl flex flex-col items-center justify-center" style={{ height: 110, padding: 12 }}>
              <Moon size={22} strokeWidth={1.5} className="text-emerald-400 mb-1" />
              <p className="text-gray-900 font-black text-2xl">15:42</p>
              <p className="text-gray-400 text-[10px] mt-0.5">İkindi</p>
            </div>
            <div className="flex-1 bg-white rounded-2xl flex flex-col items-center justify-center" style={{ height: 110, padding: 12 }}>
              <DollarSign size={22} strokeWidth={1.5} className="text-amber-400 mb-1" />
              <p className="text-gray-900 font-black text-2xl">38.42</p>
              <p className="text-gray-400 text-[10px] mt-0.5">USD</p>
            </div>
          </div>
        </div>

        {/* ══ VARYASYON 9: Sol border accent ══ */}
        <div style={{ paddingTop: 20 }}>
          <p className="text-gray-400 text-xs font-bold mb-2">VARYASYON 9 — Accent</p>
          <div className="flex gap-3 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
            <div className="shrink-0 bg-white flex items-center gap-3" style={{ width: 160, borderRadius: 16, padding: '12px 14px', borderLeft: '4px solid #3b82f6' }}>
              <div>
                <p className="text-gray-900 font-black text-xl">9°</p>
                <p className="text-gray-400 text-[10px]">Parçalı Bulutlu</p>
              </div>
              <CloudSun size={28} strokeWidth={1} className="text-gray-200 ml-auto" />
            </div>
            <div className="shrink-0 bg-white flex items-center gap-3" style={{ width: 160, borderRadius: 16, padding: '12px 14px', borderLeft: '4px solid #10b981' }}>
              <div>
                <p className="text-gray-900 font-black text-xl">15:42</p>
                <p className="text-gray-400 text-[10px]">İkindi</p>
              </div>
              <Moon size={28} strokeWidth={1} className="text-gray-200 ml-auto" />
            </div>
            <div className="shrink-0 bg-white flex items-center gap-3" style={{ width: 160, borderRadius: 16, padding: '12px 14px', borderLeft: '4px solid #f59e0b' }}>
              <div>
                <p className="text-gray-900 font-black text-xl">38.42</p>
                <p className="text-gray-400 text-[10px]">USD/TRY</p>
              </div>
              <DollarSign size={28} strokeWidth={1} className="text-gray-200 ml-auto" />
            </div>
          </div>
        </div>

        {/* ══ VARYASYON 10: Gradient border ══ */}
        <div style={{ paddingTop: 20 }}>
          <p className="text-gray-400 text-xs font-bold mb-2">VARYASYON 10 — Gradient Border</p>
          <div className="flex gap-3 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
            {[
              { icon: CloudSun, deger: '9°', alt: 'Bulutlu', grad: 'linear-gradient(135deg, #3b82f6, #8b5cf6)' },
              { icon: Moon, deger: '15:42', alt: 'İkindi', grad: 'linear-gradient(135deg, #10b981, #06b6d4)' },
              { icon: DollarSign, deger: '38.42', alt: 'USD/TRY', grad: 'linear-gradient(135deg, #f59e0b, #ef4444)' },
            ].map(({ icon: Icon, deger, alt, grad }, i) => (
              <div key={i} className="shrink-0 p-[2px] rounded-2xl" style={{ background: grad, width: 140 }}>
                <div className="bg-white rounded-[14px] flex flex-col justify-between" style={{ height: 110, padding: '14px 16px' }}>
                  <Icon size={20} strokeWidth={1.5} className="text-gray-400" />
                  <div>
                    <p className="text-gray-900 font-black text-2xl leading-none">{deger}</p>
                    <p className="text-gray-400 text-[10px] mt-1">{alt}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ══ VARYASYON 11: Ticker şerit ══ */}
        <div style={{ paddingTop: 20 }}>
          <p className="text-gray-400 text-xs font-bold mb-2">VARYASYON 11 — Ticker</p>
          <div className="bg-gray-900 rounded-2xl overflow-hidden" style={{ padding: '14px 20px' }}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CloudSun size={14} strokeWidth={2} className="text-blue-400" />
                <span className="text-white text-sm font-bold">9°</span>
              </div>
              <div className="w-px h-4 bg-white/10" />
              <div className="flex items-center gap-2">
                <Moon size={14} strokeWidth={2} className="text-emerald-400" />
                <span className="text-white text-sm font-bold">15:42</span>
                <span className="text-white/40 text-[10px]">İkindi</span>
              </div>
              <div className="w-px h-4 bg-white/10" />
              <div className="flex items-center gap-2">
                <DollarSign size={14} strokeWidth={2} className="text-amber-400" />
                <span className="text-white text-sm font-bold">38.42</span>
              </div>
            </div>
          </div>
        </div>

        {/* ══ VARYASYON 12: Kart + ikon daire ══ */}
        <div style={{ paddingTop: 20 }}>
          <p className="text-gray-400 text-xs font-bold mb-2">VARYASYON 12 — Circle Icon</p>
          <div className="flex gap-3 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
            <div className="shrink-0 bg-white rounded-2xl flex flex-col items-center" style={{ width: 120, padding: '16px 12px' }}>
              <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mb-2">
                <CloudSun size={22} strokeWidth={1.5} className="text-blue-500" />
              </div>
              <p className="text-gray-900 font-black text-xl">9°</p>
              <p className="text-gray-400 text-[10px] mt-0.5">Bulutlu</p>
            </div>
            <div className="shrink-0 bg-white rounded-2xl flex flex-col items-center" style={{ width: 120, padding: '16px 12px' }}>
              <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center mb-2">
                <Moon size={22} strokeWidth={1.5} className="text-emerald-500" />
              </div>
              <p className="text-gray-900 font-black text-xl">15:42</p>
              <p className="text-gray-400 text-[10px] mt-0.5">İkindi</p>
            </div>
            <div className="shrink-0 bg-white rounded-2xl flex flex-col items-center" style={{ width: 120, padding: '16px 12px' }}>
              <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center mb-2">
                <DollarSign size={22} strokeWidth={1.5} className="text-amber-500" />
              </div>
              <p className="text-gray-900 font-black text-xl">38.42</p>
              <p className="text-gray-400 text-[10px] mt-0.5">USD</p>
            </div>
          </div>
        </div>

        {/* ══ VARYASYON 13: Tam koyu 2+1 ══ */}
        <div style={{ paddingTop: 20 }}>
          <p className="text-gray-400 text-xs font-bold mb-2">VARYASYON 13 — Dark 2+1</p>
          <div className="flex gap-3 mb-3">
            <div className="flex-1 rounded-2xl" style={{ background: '#1a1a2e', padding: '16px' }}>
              <div className="flex items-center justify-between mb-3">
                <p className="text-white/40 text-[10px] font-medium">HAVA</p>
                <CloudSun size={16} strokeWidth={1.5} className="text-blue-400" />
              </div>
              <p className="text-white font-black" style={{ fontSize: 32, lineHeight: 1 }}>9°</p>
            </div>
            <div className="flex-1 rounded-2xl" style={{ background: '#1a1a2e', padding: '16px' }}>
              <div className="flex items-center justify-between mb-3">
                <p className="text-white/40 text-[10px] font-medium">NAMAZ</p>
                <Moon size={16} strokeWidth={1.5} className="text-emerald-400" />
              </div>
              <p className="text-white font-black" style={{ fontSize: 32, lineHeight: 1 }}>15:42</p>
            </div>
          </div>
          <div className="rounded-2xl flex items-center justify-between" style={{ background: '#1a1a2e', padding: '14px 16px' }}>
            <div className="flex items-center gap-2">
              <DollarSign size={16} strokeWidth={1.5} className="text-amber-400" />
              <p className="text-white/40 text-[10px] font-medium">DÖVİZ</p>
            </div>
            <div className="flex gap-6">
              <div className="text-right">
                <p className="text-white font-bold text-sm">38.42</p>
                <p className="text-white/30 text-[9px]">USD</p>
              </div>
              <div className="text-right">
                <p className="text-white font-bold text-sm">41.85</p>
                <p className="text-white/30 text-[9px]">EUR</p>
              </div>
              <div className="text-right">
                <p className="text-white font-bold text-sm">3.245</p>
                <p className="text-white/30 text-[9px]">Altın</p>
              </div>
            </div>
          </div>
        </div>

        {/* ══ VARYASYON 14: Soft pastel ══ */}
        <div style={{ paddingTop: 20 }}>
          <p className="text-gray-400 text-xs font-bold mb-2">VARYASYON 14 — Pastel</p>
          <div className="flex gap-3 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
            <div className="shrink-0 flex flex-col justify-between" style={{ width: 140, height: 120, borderRadius: 22, padding: '14px 16px', background: '#eef2ff' }}>
              <CloudSun size={20} strokeWidth={1.5} className="text-indigo-400" />
              <div>
                <p className="text-indigo-900 font-black text-2xl leading-none">9°</p>
                <p className="text-indigo-400 text-[10px] mt-1">Parçalı Bulutlu</p>
              </div>
            </div>
            <div className="shrink-0 flex flex-col justify-between" style={{ width: 140, height: 120, borderRadius: 22, padding: '14px 16px', background: '#ecfdf5' }}>
              <Moon size={20} strokeWidth={1.5} className="text-emerald-400" />
              <div>
                <p className="text-emerald-900 font-black text-2xl leading-none">15:42</p>
                <p className="text-emerald-400 text-[10px] mt-1">İkindi</p>
              </div>
            </div>
            <div className="shrink-0 flex flex-col justify-between" style={{ width: 140, height: 120, borderRadius: 22, padding: '14px 16px', background: '#fffbeb' }}>
              <DollarSign size={20} strokeWidth={1.5} className="text-amber-400" />
              <div>
                <p className="text-amber-900 font-black text-2xl leading-none">38.42</p>
                <p className="text-amber-400 text-[10px] mt-1">USD/TRY</p>
              </div>
            </div>
          </div>
        </div>

        {/* ══ VARYASYON 15: Outline minimal ══ */}
        <div style={{ paddingTop: 20 }}>
          <p className="text-gray-400 text-xs font-bold mb-2">VARYASYON 15 — Outline</p>
          <div className="flex gap-3 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
            <div className="shrink-0 flex flex-col justify-between" style={{ width: 140, height: 120, borderRadius: 22, padding: '14px 16px', background: 'transparent', border: '1.5px solid #e5e7eb' }}>
              <CloudSun size={20} strokeWidth={1.5} className="text-gray-400" />
              <div>
                <p className="text-gray-900 font-black text-2xl leading-none">9°</p>
                <p className="text-gray-400 text-[10px] mt-1">Bulutlu</p>
              </div>
            </div>
            <div className="shrink-0 flex flex-col justify-between" style={{ width: 140, height: 120, borderRadius: 22, padding: '14px 16px', background: 'transparent', border: '1.5px solid #e5e7eb' }}>
              <Moon size={20} strokeWidth={1.5} className="text-gray-400" />
              <div>
                <p className="text-gray-900 font-black text-2xl leading-none">15:42</p>
                <p className="text-gray-400 text-[10px] mt-1">İkindi</p>
              </div>
            </div>
            <div className="shrink-0 flex flex-col justify-between" style={{ width: 140, height: 120, borderRadius: 22, padding: '14px 16px', background: 'transparent', border: '1.5px solid #e5e7eb' }}>
              <DollarSign size={20} strokeWidth={1.5} className="text-gray-400" />
              <div>
                <p className="text-gray-900 font-black text-2xl leading-none">38.42</p>
                <p className="text-gray-400 text-[10px] mt-1">USD/TRY</p>
              </div>
            </div>
          </div>
        </div>

        {/* ── İndirimler & Fırsatlar (resimdeki alt kısım) ── */}
        <div style={{ paddingTop: 20 }}>
          <div style={{ marginBottom: 12 }}>
            <h2 className="text-gray-800 font-semibold" style={{ fontSize: 18 }}>İndirimler & Fırsatlar <span className="text-gray-400">›</span></h2>
          </div>
          <div className="flex gap-3 overflow-x-auto" style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}>

            {/* Kart 1 */}
            <button onClick={() => navigate('/alisveris')} className="shrink-0 text-left active:scale-[0.97] transition-transform" style={{ width: 140 }}>
              <div className="w-full h-[100px] bg-white" style={{ borderRadius: 16 }} />
              <div className="px-1 pt-2.5">
                <p className="text-gray-900 text-[15px] font-bold truncate">Alışveriş</p>
                <p className="text-gray-400 text-xs mt-0.5 truncate">6 ay taksit fırsatları</p>
              </div>
            </button>

            {/* Kart 2 */}
            <button onClick={() => navigate('/food')} className="shrink-0 text-left active:scale-[0.97] transition-transform" style={{ width: 140 }}>
              <div className="w-full h-[100px] bg-white" style={{ borderRadius: 16 }} />
              <div className="px-1 pt-2.5">
                <p className="text-gray-900 text-[15px] font-bold truncate">Yemek & Restoran</p>
                <p className="text-gray-400 text-xs mt-0.5 truncate">%20'ye varan indirimler</p>
              </div>
            </button>

            {/* Kart 3 */}
            <button onClick={() => navigate('/campaigns')} className="shrink-0 text-left active:scale-[0.97] transition-transform" style={{ width: 140 }}>
              <div className="w-full h-[100px] bg-white" style={{ borderRadius: 16 }} />
              <div className="px-1 pt-2.5">
                <p className="text-gray-900 text-[15px] font-bold truncate">Kampanyalar</p>
                <p className="text-gray-400 text-xs mt-0.5 truncate">Güncel promosyonlar</p>
              </div>
            </button>

            {/* Kart 4 */}
            <button onClick={() => navigate('/oteller')} className="shrink-0 text-left active:scale-[0.97] transition-transform" style={{ width: 140 }}>
              <div className="w-full h-[100px] bg-white" style={{ borderRadius: 16 }} />
              <div className="px-1 pt-2.5">
                <p className="text-gray-900 text-[15px] font-bold truncate">Oteller</p>
                <p className="text-gray-400 text-xs mt-0.5 truncate">Erken rezervasyon fırs...</p>
              </div>
            </button>

          </div>
        </div>

        {/* ── Haberler ── */}
        <div style={{ paddingTop: 20 }}>
          <div style={{ marginBottom: 12 }}>
            <h2 className="text-gray-800 font-semibold" style={{ fontSize: 18 }}>Haberler <span className="text-gray-400">›</span></h2>
          </div>
          <div className="flex gap-3 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>

            <div className="shrink-0 text-left" style={{ width: 140 }}>
              <div className="w-full h-[100px] bg-white" style={{ borderRadius: 16 }} />
              <div className="px-1 pt-2.5">
                <p className="text-gray-900 text-[15px] font-bold truncate">Yeni Metro Hattı</p>
                <p className="text-gray-400 text-xs mt-0.5 truncate">Gebze'de çalışmalar başladı</p>
              </div>
            </div>

            <div className="shrink-0 text-left" style={{ width: 140 }}>
              <div className="w-full h-[100px] bg-white" style={{ borderRadius: 16 }} />
              <div className="px-1 pt-2.5">
                <p className="text-gray-900 text-[15px] font-bold truncate">Kent Parkı Yenilendi</p>
                <p className="text-gray-400 text-xs mt-0.5 truncate">Proje tamamlandı</p>
              </div>
            </div>

            <div className="shrink-0 text-left" style={{ width: 140 }}>
              <div className="w-full h-[100px] bg-white" style={{ borderRadius: 16 }} />
              <div className="px-1 pt-2.5">
                <p className="text-gray-900 text-[15px] font-bold truncate">Ücretsiz Ulaşım</p>
                <p className="text-gray-400 text-xs mt-0.5 truncate">Öğrencilere müjde</p>
              </div>
            </div>

            <div className="shrink-0 text-left" style={{ width: 140 }}>
              <div className="w-full h-[100px] bg-white" style={{ borderRadius: 16 }} />
              <div className="px-1 pt-2.5">
                <p className="text-gray-900 text-[15px] font-bold truncate">Yeni Hastane</p>
                <p className="text-gray-400 text-xs mt-0.5 truncate">Hizmete açılıyor</p>
              </div>
            </div>

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
            <div className="grid grid-cols-5 gap-x-3" style={{ rowGap: 12 }}>
              {TUM_KATEGORILER.map(({ icon: Icon, label, type }) => (
                <button
                  key={label}
                  onClick={() => { setKategoriSheet(false); navigate(`/nearby/${type}`) }}
                  className="flex flex-col items-center gap-1.5 active:scale-95 transition-transform"
                >
                  <div className="rounded-2xl bg-gray-100 flex items-center justify-center" style={{ width: 60, height: 60 }}>
                    <Icon size={26} strokeWidth={1.8} className="text-gray-700" />
                  </div>
                  <span style={{ fontSize: 13, color: '#6b7280', fontWeight: 500 }}>{label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
