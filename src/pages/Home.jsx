import { useState, useEffect, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Bell, MapPin, ChevronDown, Search,
  Pill, CreditCard, Fuel, ParkingCircle, Zap, Bus,
  UtensilsCrossed, Soup, Wrench, Tag,
  Calendar, ShoppingBag, Sparkles,
  Key, Users, Building2, Stethoscope, Shield, Flame,
  Hotel, Coffee, Scissors, Dumbbell, BookOpen, PawPrint,
  Mail, GraduationCap, Navigation, Plus, X, ChevronRight, Clock,
  Sun, Moon,
} from 'lucide-react'
import { MOCK_PLACES } from '../data/mockPlaces'

// ─── Slider banner'ları ───────────────────────────────────────────────────────
const SLIDER_ITEMS = [
  { id: 1, baslik: 'GebzemAI ile Tanış', path: '/gebzem-ai' },
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
  { icon: Wrench,          label: 'Hizmetler',   path: '/services' },
  { icon: Tag,             label: 'İlanlar',     path: '/ilanlar' },
  { icon: Calendar,        label: 'Etkinlikler', path: '/etkinlikler' },
  { icon: Hotel,           label: 'Otel',        path: '/oteller' },
]

const TUM_KATEGORILER_BUYUK = [
  { emoji: '🍜', label: 'Yemek',          path: '/food',         renk: '#fff7ed' },
  { emoji: '🍽️', label: 'Restoran',       path: '/food',         renk: '#fff7ed' },
  { emoji: '🔧', label: 'Hizmetler',      path: '/services',     renk: '#f0fdf4' },
  { emoji: '🏠', label: 'İlanlar',         path: '/ilanlar',      renk: '#fdf4ff' },
  { emoji: '🎭', label: 'Etkinlikler',    path: '/etkinlikler',  renk: '#fef9c3' },
  { emoji: '💼', label: 'İş İlanları',    path: '/is-ilanlari',  renk: '#f0f9ff' },
  { emoji: '🏨', label: 'Otel',           path: '/oteller',      renk: '#fef2f2' },
  { emoji: '🤖', label: 'GebzemAI',       path: '/gebzem-ai',    renk: '#f3e8ff' },
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
  const [scrolled,         setScrolled]         = useState(false)
  const [bannerIndex,      setBannerIndex]      = useState(0)
  const sliderRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setSliderIndex(prev => (prev + 1) % SLIDER_ITEMS.length)
    }, 3500)
    return () => clearInterval(timer)
  }, [])

  const handleSliderScroll = useCallback(() => {
    const el = sliderRef.current
    if (!el) return
    const scrollLeft = el.scrollLeft
    const cardWidth = el.firstChild?.offsetWidth || 1
    const idx = Math.round(scrollLeft / (cardWidth + 12))
    setBannerIndex(idx)
  }, [])

  function konumSec(isim) {
    setAktifKonum(isim)
    localStorage.setItem('sehir_konum', isim)
    setKonumSheet(false)
  }

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(180deg, #2d1b69 0%, #1a1a2e 20%, #111118 40%)' }}>

      {/* ── Header ── */}
      <header className={`fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-300 ${scrolled ? 'backdrop-blur-md' : ''}`} style={{ background: scrolled ? 'rgba(17,17,24,0.85)' : 'transparent' }}>
        <div className="w-full max-w-[430px] flex items-center" style={{ gap: 6, paddingTop: 10, paddingBottom: scrolled ? 10 : 0, paddingLeft: 20, paddingRight: 20 }}>
        <button onClick={() => navigate('/profile')} className="w-9 h-9 rounded-full shrink-0 active:scale-95 transition-transform bg-white/15" style={{ marginRight: 4 }} />

        {/* Selamlama */}
        <div className="flex-1 min-w-0">
          <p className="text-white truncate flex items-center gap-1" style={{ fontSize: 16 }}><span className="font-normal">{new Date().getHours() < 12 ? 'Günaydın' : new Date().getHours() < 18 ? 'İyi Günler' : 'İyi Akşamlar'}</span>{new Date().getHours() < 18 ? <Sun size={16} strokeWidth={2} className="text-yellow-400" /> : <Moon size={16} strokeWidth={2} className="text-white/60" />}<span className="font-bold">{user?.firstName}</span></p>
        </div>

        {/* Arama */}
        <button onClick={() => window.dispatchEvent(new Event('open-search-sheet'))} className="rounded-full flex items-center justify-center active:scale-90 transition-all bg-white/10" style={{ width: 42, height: 42 }}>
          <Search size={18} strokeWidth={2.2} className="text-white" />
        </button>

        {/* Bildirim */}
        <button onClick={() => navigate('/bildirimler')} className="rounded-full flex items-center justify-center active:scale-90 transition-all relative bg-white/10" style={{ width: 42, height: 42 }}>
          <Bell size={18} strokeWidth={2.2} className="text-white" />
          <div className="absolute rounded-full bg-red-500" style={{ width: 12, height: 12, top: 0, right: 0 }} />
        </button>
        </div>
      </header>

      {/* ── İçerik ── */}
      <div style={{ paddingTop: 66, paddingLeft: 20, paddingRight: 20, paddingBottom: 96 }}>

        {/* ── Banner Slider (2 slayt, peek efektli) ── */}
        <div style={{ marginLeft: -20, marginRight: -20 }}>
          <div
            ref={sliderRef}
            className="flex gap-3 overflow-x-auto"
            style={{ scrollSnapType: 'x mandatory', scrollbarWidth: 'none', paddingLeft: 20, paddingRight: 20 }}
            onScroll={handleSliderScroll}
          >
            {/* Slayt 1 */}
            <div
              className="shrink-0"
              style={{ width: 'calc(100% - 40px)', borderRadius: 25, height: 210, scrollSnapAlign: 'center', background: '#1e1e2e' }}
            />

            {/* Slayt 2 */}
            <div
              className="shrink-0"
              style={{ width: 'calc(100% - 40px)', borderRadius: 25, height: 210, scrollSnapAlign: 'center', background: '#1e1e2e' }}
            />

            {/* Slayt 3 */}
            <div
              className="shrink-0"
              style={{ width: 'calc(100% - 40px)', borderRadius: 25, height: 210, scrollSnapAlign: 'center', background: '#1e1e2e' }}
            />
          </div>

          {/* Dot indicator */}
          <div className="flex justify-center gap-1.5" style={{ marginTop: 10 }}>
            {[0, 1, 2].map(i => (
              <div
                key={i}
                className="rounded-full transition-all duration-300"
                style={{
                  width: bannerIndex === i ? 20 : 6,
                  height: 6,
                  background: bannerIndex === i ? '#ffffff' : 'rgba(255,255,255,0.2)',
                }}
              />
            ))}
          </div>
        </div>

        {/* ── Kategoriler (yatay scroll) ── */}
        <div style={{ paddingTop: 20 }}>
          <div style={{ marginBottom: 12 }}>
            <h2 className="text-white font-semibold" style={{ fontSize: 18 }}>Kategoriler <span className="text-white/30">›</span></h2>
          </div>
          <div className="flex gap-3 overflow-x-auto" style={{ scrollbarWidth: 'none', marginLeft: -20, marginRight: -20, paddingLeft: 20, paddingRight: 20 }}>
            {[
              { label: '', bg: 'linear-gradient(135deg, #7C3AED, #EC4899)' },
              { label: 'Yemek' },
              { label: 'Restoran' },
              { label: 'Hizmetler' },
              { label: 'İlanlar' },
              { label: 'Etkinlikler' },
              { label: 'Oteller' },
            ].map(({ label, bg }) => (
              <div key={label || 'ai'} className="shrink-0 flex flex-col items-center gap-1.5" style={{ minWidth: 75 }}>
                <div className="rounded-2xl relative overflow-hidden" style={{ width: 75, height: 75, background: bg || '#1e1e2e' }} />
                {label && <span className="text-center whitespace-nowrap" style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', fontWeight: 500 }}>{label}</span>}
              </div>
            ))}
          </div>
        </div>

        {/* ── Yakınımda ── */}
        <div style={{ paddingTop: 20 }}>
          <div style={{ marginBottom: 12 }}>
            <h2 className="text-white font-semibold" style={{ fontSize: 18 }}>Yakınımda <span className="text-white/30">›</span></h2>
          </div>
          <div className="flex gap-3 overflow-x-auto" style={{ scrollbarWidth: 'none', marginLeft: -20, marginRight: -20, paddingLeft: 20, paddingRight: 20 }}>
            {[
              { label: 'Eczane', type: 'pharmacy', logo: 'https://atakoyplus.com/wp-content/uploads/2022/03/eczane.png', iconBg: '#ef4444' },
              { label: 'ATM', type: 'atm', logo: 'https://play-lh.googleusercontent.com/FzSKxZNZy_tchg-jexqNX9SWyK_l_iXU3DnN4AufVVm6CsoI1ouAjSaHy0X-_PeQ_D23' },
              { label: 'Benzinlik', type: 'fuel', logo: 'https://s3-symbol-logo.tradingview.com/shell--600.png' },
              { label: 'Otopark', type: 'parking', icon: ParkingCircle, iconBg: '#2563eb' },
              { label: 'Otobüs', type: 'bus', icon: Bus, iconBg: '#2563eb' },
              { label: 'Şarj', type: 'charging', icon: Zap, iconBg: '#84cc16' },
            ].map(({ label, type, icon: Icon, logo, letter, iconBg }) => {
              const place = MOCK_PLACES[type]?.[0]
              return (
                <button key={type} onClick={() => navigate(`/nearby/${type}`)} className="shrink-0 active:scale-[0.97] transition-transform">
                  <div className="flex items-center gap-3" style={{ width: 165, borderRadius: 16, padding: '14px 14px', background: '#1e1e2e' }}>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 overflow-hidden" style={{ background: iconBg || 'rgba(255,255,255,0.08)' }}>
                      {letter ? <span className="text-white font-black text-base">{letter}</span>
                        : logo ? <img src={logo} alt={label} className="w-full h-full object-cover" />
                        : Icon ? <Icon size={20} strokeWidth={1.8} className="text-white" /> : null}
                    </div>
                    <div className="flex-1 min-w-0 text-left">
                      <p className="text-white text-[13px] font-bold truncate">{place?.name || label}</p>
                      <p className="text-[11px] mt-0.5" style={{ color: 'rgba(255,255,255,0.4)' }}>{place?.distance}</p>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* ── Hızlı Erişim ── */}
        <div style={{ paddingTop: 20 }}>
          <div style={{ marginBottom: 12 }} className="flex items-center justify-between">
            <button onClick={() => setKategoriSheet(true)}><h2 className="text-white font-semibold" style={{ fontSize: 18 }}>Şehir Rehberi <span className="text-white/30">›</span></h2></button>
          </div>
          <div className="grid grid-cols-5 gap-x-3" style={{ rowGap: 12 }}>
            {QUICK_ACCESS.map(({ icon: Icon, label, type }) => (
              <button
                key={label}
                onClick={() => navigate(`/nearby/${type}`)}
                className="flex flex-col items-center gap-1.5 active:scale-95 transition-transform"
              >
                <div className="rounded-2xl flex items-center justify-center" style={{ width: 60, height: 60, background: 'linear-gradient(180deg, #252038 0%, #1e1e2e 100%)' }}>
                  <Icon size={22} strokeWidth={1.8} className="text-white" />
                </div>
                <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', fontWeight: 500 }}>{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* ── İndirimler & Fırsatlar ── */}
        <div style={{ paddingTop: 20 }}>
          <div style={{ marginBottom: 12 }}>
            <h2 className="text-white font-semibold" style={{ fontSize: 18 }}>İndirimler & Fırsatlar <span className="text-white/30">›</span></h2>
          </div>
          <div className="flex gap-3 overflow-x-auto" style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch', marginLeft: -20, marginRight: -20, paddingLeft: 20, paddingRight: 20 }}>

            {/* Kart 1 */}
            <button onClick={() => navigate('/food')} className="shrink-0 text-left active:scale-[0.97] transition-transform" style={{ width: 140 }}>
              <div className="w-full h-[100px]" style={{ borderRadius: 16, background: '#1e1e2e' }} />
              <div className="px-1 pt-2.5">
                <p className="text-white text-[15px] font-bold truncate">Yemek & Restoran</p>
                <p className="text-xs mt-0.5 truncate" style={{ color: 'rgba(255,255,255,0.4)' }}>%20'ye varan indirimler</p>
              </div>
            </button>

            {/* Kart 3 */}
            <button onClick={() => navigate('/campaigns')} className="shrink-0 text-left active:scale-[0.97] transition-transform" style={{ width: 140 }}>
              <div className="w-full h-[100px]" style={{ borderRadius: 16, background: '#1e1e2e' }} />
              <div className="px-1 pt-2.5">
                <p className="text-white text-[15px] font-bold truncate">Kampanyalar</p>
                <p className="text-xs mt-0.5 truncate" style={{ color: 'rgba(255,255,255,0.4)' }}>Güncel promosyonlar</p>
              </div>
            </button>

            {/* Kart 4 */}
            <button onClick={() => navigate('/oteller')} className="shrink-0 text-left active:scale-[0.97] transition-transform" style={{ width: 140 }}>
              <div className="w-full h-[100px]" style={{ borderRadius: 16, background: '#1e1e2e' }} />
              <div className="px-1 pt-2.5">
                <p className="text-white text-[15px] font-bold truncate">Oteller</p>
                <p className="text-xs mt-0.5 truncate" style={{ color: 'rgba(255,255,255,0.4)' }}>Erken rezervasyon fırs...</p>
              </div>
            </button>

          </div>
        </div>

        {/* ── Haberler ── */}
        <div style={{ paddingTop: 20 }}>
          <div style={{ marginBottom: 12 }}>
            <h2 className="text-white font-semibold" style={{ fontSize: 18 }}>Haberler <span className="text-white/30">›</span></h2>
          </div>
          <div className="flex gap-3 overflow-x-auto" style={{ scrollbarWidth: 'none', marginLeft: -20, marginRight: -20, paddingLeft: 20, paddingRight: 20 }}>

            <div className="shrink-0 text-left" style={{ width: 140 }}>
              <div className="w-full h-[100px]" style={{ borderRadius: 16, background: '#1e1e2e' }} />
              <div className="px-1 pt-2.5">
                <p className="text-white text-[15px] font-bold truncate">Yeni Metro Hattı</p>
                <p className="text-xs mt-0.5 truncate" style={{ color: 'rgba(255,255,255,0.4)' }}>Gebze'de çalışmalar başladı</p>
              </div>
            </div>

            <div className="shrink-0 text-left" style={{ width: 140 }}>
              <div className="w-full h-[100px]" style={{ borderRadius: 16, background: '#1e1e2e' }} />
              <div className="px-1 pt-2.5">
                <p className="text-white text-[15px] font-bold truncate">Kent Parkı Yenilendi</p>
                <p className="text-xs mt-0.5 truncate" style={{ color: 'rgba(255,255,255,0.4)' }}>Proje tamamlandı</p>
              </div>
            </div>

            <div className="shrink-0 text-left" style={{ width: 140 }}>
              <div className="w-full h-[100px]" style={{ borderRadius: 16, background: '#1e1e2e' }} />
              <div className="px-1 pt-2.5">
                <p className="text-white text-[15px] font-bold truncate">Ücretsiz Ulaşım</p>
                <p className="text-xs mt-0.5 truncate" style={{ color: 'rgba(255,255,255,0.4)' }}>Öğrencilere müjde</p>
              </div>
            </div>

            <div className="shrink-0 text-left" style={{ width: 140 }}>
              <div className="w-full h-[100px]" style={{ borderRadius: 16, background: '#1e1e2e' }} />
              <div className="px-1 pt-2.5">
                <p className="text-white text-[15px] font-bold truncate">Yeni Hastane</p>
                <p className="text-xs mt-0.5 truncate" style={{ color: 'rgba(255,255,255,0.4)' }}>Hizmete açılıyor</p>
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
              {TUM_KATEGORILER.map(({ label, type }) => (
                <button
                  key={label}
                  onClick={() => { setKategoriSheet(false); navigate(`/nearby/${type}`) }}
                  className="flex flex-col items-center gap-1.5 active:scale-95 transition-transform"
                >
                  <div className="rounded-2xl bg-gray-100" style={{ width: 60, height: 60 }} />
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
