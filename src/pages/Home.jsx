import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Menu, MapPin, ChevronDown, Search,
  Pill, Landmark, Fuel, ParkingCircle, Zap, Bus,
  UtensilsCrossed, Soup, Wrench, Tag,
  Calendar, ShoppingBag, Sparkles,
  Key, Users, Building2, Stethoscope, Shield, Flame,
  Hotel, Coffee, Scissors, Dumbbell, BookOpen, PawPrint,
  Mail, GraduationCap, Navigation, Plus, X, ChevronRight, Clock,
} from 'lucide-react'
import { MOCK_PLACES } from '../data/mockPlaces'

// ─── Slider banner'ları ───────────────────────────────────────────────────────
const SLIDER_ITEMS = [
  { id: 1, baslik: "Gebze'de 50+ Yeni İşletme", alt: 'Hepsini Keşfet →', bg: '#111827', path: '/explore' },
  { id: 2, baslik: 'Nisan Etkinlikleri Başladı', alt: '8 etkinlik seni bekliyor →', bg: '#1e3a5f', path: '/etkinlikler' },
  { id: 3, baslik: "GebzemAI ile Şehrini Keşfet", alt: 'Hemen Dene →', bg: '#3b0764', path: '/gebzem-ai' },
]

// ─── Hızlı erişim ────────────────────────────────────────────────────────────
const QUICK_ACCESS = [
  { icon: Bus,           label: 'Otobüs',    type: 'bus' },
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
      className="shrink-0 flex flex-col gap-3 bg-white border border-gray-100 rounded-2xl p-3.5 active:scale-95 transition-transform text-left"
      style={{ width: '148px' }}
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
  const [sliderIdx,        setSliderIdx]        = useState(0)
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
        <div className="w-full max-w-[430px] bg-white/80 backdrop-blur-md border-b border-gray-100 px-4 h-[60px] flex items-center justify-between">
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
            onClick={() => navigate('/campaigns')}
            className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center active:scale-90 transition-transform"
          >
            <span className="text-lg">🎁</span>
          </button>
        </div>
      </header>

      {/* ── İçerik ── */}
      <div className="pt-[60px] pb-24">

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
                  minHeight: '160px',
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
            <button
              onClick={() => navigate('/nearby/bus')}
              className="text-gray-400 text-xs flex items-center gap-0.5 active:text-gray-600"
            >
              Hepsi <ChevronRight size={12} strokeWidth={2} />
            </button>
          </div>

          {/* Yatay scroll — hepsi aynı sırada */}
          <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
            <NearbyCard
              icon={Bus}
              title="Otobüs Durağı"
              type="bus"
              isBus
              onPress={() => navigate('/nearby/bus')}
            />
            <NearbyCard
              letter="E"
              letterBg="#c0392b"
              title="Nöbetçi Eczane"
              type="pharmacy"
              onPress={() => navigate('/nearby/pharmacy')}
            />
            <NearbyCard
              logo="https://yt3.googleusercontent.com/kawB1Mlmo8ECTgcckUGVRP0tHjYkc3yewLv7dc_OvF7xNyouBq2TIPYOHiTBb5qH4ItmwnKHOw=s900-c-k-c0x00ffffff-no-rj"
              title="Garanti Bankası ATM"
              type="atm"
              onPress={() => navigate('/nearby/atm')}
            />
            <NearbyCard
              icon={Fuel}
              title="Benzinlik"
              type="fuel"
              onPress={() => navigate('/nearby/fuel')}
            />
            <NearbyCard
              icon={Users}
              title="Toplanma Alanı"
              type="assembly"
              onPress={() => navigate('/nearby/assembly')}
            />
            <NearbyCard
              icon={Building2}
              title="En Yakın Cami"
              type="mosque"
              onPress={() => navigate('/nearby/mosque')}
            />
            <NearbyCard
              icon={Zap}
              title="Şarj İstasyonu"
              type="charging"
              onPress={() => navigate('/nearby/charging')}
            />
          </div>
        </div>

        {/* ── Kategoriler ── */}
        <div className="pt-6 px-4">
          <h2 className="text-gray-800 text-sm font-semibold mb-3">Kategoriler</h2>
          <div className="grid grid-cols-4 gap-3">
            {CATEGORIES.map(({ icon: Icon, label, path }) => (
              <button
                key={label}
                onClick={() => navigate(path)}
                className="flex flex-col items-center gap-1.5 active:scale-95 transition-transform"
              >
                <div className="rounded-2xl bg-white border border-gray-100 shadow-sm flex items-center justify-center" style={{ width: 52, height: 52 }}>
                  <Icon size={20} strokeWidth={1.5} className="text-gray-700" />
                </div>
                <span className="text-gray-500 text-[11px] font-medium text-center leading-tight">{label}</span>
              </button>
            ))}
            {/* Hepsi butonu */}
            <button
              onClick={() => setTumKatSheet(true)}
              className="flex flex-col items-center gap-1.5 active:scale-95 transition-transform"
            >
              <div className="rounded-2xl bg-gray-900 flex items-center justify-center" style={{ width: 52, height: 52 }}>
                <ChevronRight size={18} strokeWidth={2} className="text-white" />
              </div>
              <span className="text-gray-500 text-[11px] font-medium">Hepsi</span>
            </button>
          </div>
        </div>

      </div>



      {/* ── Dev Sıfırla ── */}
      <button
        onClick={() => {
          // Session ve geçici verileri sil, demo hesabını koru
          localStorage.removeItem('sehir_session')
          localStorage.removeItem('isletme_session')
          localStorage.removeItem('admin_session')
          localStorage.removeItem('sehir_rezervasyonlar')
          localStorage.removeItem('sehir_randevular')
          localStorage.removeItem('sehir_teklifler')
          sessionStorage.clear()
          // Demo hesapları koru / yenile
          localStorage.setItem('sehir_user', JSON.stringify({ firstName: 'Demo', lastName: 'Kullanıcı', phone: '5426469070', password: '8014' }))
          localStorage.setItem('isletme_user', JSON.stringify({ isim: 'Demo Kafe', sahipAdi: 'Demo Sahip', telefon: '5426469070', kategori: 'Kafe & Restoran', password: '8014' }))
          localStorage.setItem('sehir_onboarded', '1')
          window.location.href = '/login'
        }}
        className="fixed bottom-24 left-4 z-50 bg-gray-800 text-white text-xs px-3 py-2 rounded-full opacity-40 hover:opacity-100 transition-opacity"
      >
        ↺ Sıfırla
      </button>

      {/* ════════ TÜM KATEGORİLER BOTTOM SHEET (85% yükseklik, büyük kartlar) ════════ */}
      {tumKatSheet && (
        <div className="fixed inset-0 z-[100] flex flex-col justify-end">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setTumKatSheet(false)} />
          <div
            className="relative bg-white rounded-t-3xl z-10 flex flex-col"
            style={{ height: '85vh' }}
          >
            {/* Drag handle */}
            <div className="flex justify-center pt-3 pb-2 shrink-0">
              <div className="w-10 h-1 rounded-full bg-gray-200" />
            </div>

            <div className="flex items-center justify-between px-5 pb-4 shrink-0">
              <h3 className="text-gray-900 text-base font-bold">Tüm Kategoriler</h3>
              <button onClick={() => setTumKatSheet(false)} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                <X size={16} strokeWidth={2} className="text-gray-600" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-4 pb-8">
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
