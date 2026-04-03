import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronRight, Star, MapPin, Plus, Clock, MessageCircle } from 'lucide-react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import {
  HERO_ITEMS,
  POPULER_YERLER,
  YENI_ISLETMELER,
  HAFTALIK_ONERILER,
  KESFET_KATEGORILER,
} from '../data/mockExplore'
import { TALEPLER } from '../data/mockTalep'

// ─── Harita kategorileri ──────────────────────────────────────────────────────
const HARITA_KATEGORILER = [
  { key: 'tumu',    label: 'Tümü',        emoji: '🗺️' },
  { key: 'metro',   label: 'Metro',        emoji: '🚇' },
  { key: 'otobus',  label: 'Otobüs',       emoji: '🚌' },
  { key: 'tren',    label: 'Tren',         emoji: '🚆' },
  { key: 'tarihi',  label: 'Tarihi Yer',   emoji: '🏛️' },
  { key: 'kafe',    label: 'Kafe',         emoji: '☕' },
  { key: 'park',    label: 'Park',         emoji: '🌳' },
  { key: 'avm',     label: 'AVM',          emoji: '🛍️' },
  { key: 'cami',    label: 'Cami',         emoji: '🕌' },
]

// ─── Mock harita noktaları (Gebze merkez civarı) ──────────────────────────────
const HARITA_NOKTALARI = [
  { id: 1,  kategori: 'metro',  isim: 'Gebze Metro İstasyonu',   adres: 'Gebze Merkez', emoji: '🚇', renk: '#6366f1', lat: 40.8025, lng: 29.4301 },
  { id: 2,  kategori: 'metro',  isim: 'Osmangazi Metro',          adres: 'Osmangazi Cd.', emoji: '🚇', renk: '#6366f1', lat: 40.8070, lng: 29.4180 },
  { id: 3,  kategori: 'otobus', isim: 'Gebze Otogar',             adres: 'Terminal Cd.',  emoji: '🚌', renk: '#f59e0b', lat: 40.7990, lng: 29.4350 },
  { id: 4,  kategori: 'otobus', isim: 'Çarşı Durağı',             adres: 'İstanbul Cad.', emoji: '🚌', renk: '#f59e0b', lat: 40.8040, lng: 29.4260 },
  { id: 5,  kategori: 'tren',   isim: 'Gebze Tren Garı',          adres: 'İstasyon Mah.', emoji: '🚆', renk: '#10b981', lat: 40.7955, lng: 29.4410 },
  { id: 6,  kategori: 'tren',   isim: 'Osmangazi Tren Durağı',    adres: 'Osmangazi',     emoji: '🚆', renk: '#10b981', lat: 40.8080, lng: 29.4150 },
  { id: 7,  kategori: 'tarihi', isim: 'Gebze Çoban Mustafa Paşa Külliyesi', adres: 'Tarihi Merkez', emoji: '🏛️', renk: '#8b5cf6', lat: 40.8015, lng: 29.4320 },
  { id: 8,  kategori: 'tarihi', isim: 'Hannibal Anıtı',           adres: 'Diliskelesi',   emoji: '🏛️', renk: '#8b5cf6', lat: 40.7850, lng: 29.4500 },
  { id: 9,  kategori: 'kafe',   isim: 'Starbucks Gebze Center',   adres: 'Gebze Center AVM', emoji: '☕', renk: '#00704a', lat: 40.8010, lng: 29.4280 },
  { id: 10, kategori: 'kafe',   isim: 'Coffeemania',              adres: 'İstanbul Cad.', emoji: '☕', renk: '#00704a', lat: 40.8050, lng: 29.4230 },
  { id: 11, kategori: 'park',   isim: 'Gebze Millet Bahçesi',     adres: 'Çayırova Yolu', emoji: '🌳', renk: '#16a34a', lat: 40.8100, lng: 29.4350 },
  { id: 12, kategori: 'park',   isim: 'Fatih Parkı',              adres: 'Fatih Mah.',    emoji: '🌳', renk: '#16a34a', lat: 40.7980, lng: 29.4290 },
  { id: 13, kategori: 'avm',    isim: 'Gebze Center',             adres: 'E-5 Karayolu',  emoji: '🛍️', renk: '#ec4899', lat: 40.8005, lng: 29.4270 },
  { id: 14, kategori: 'avm',    isim: 'Migros AVM',               adres: 'İstanbul Cad.', emoji: '🛍️', renk: '#ec4899', lat: 40.8060, lng: 29.4200 },
  { id: 15, kategori: 'cami',   isim: 'Orhan Gazi Camii',         adres: 'Gebze Merkez',  emoji: '🕌', renk: '#0ea5e9', lat: 40.8030, lng: 29.4310 },
  { id: 16, kategori: 'cami',   isim: 'Çoban Mustafa Paşa Camii', adres: 'Tarihi Merkez', emoji: '🕌', renk: '#0ea5e9', lat: 40.8020, lng: 29.4330 },
]

function markerIcon(emoji, renk) {
  return L.divIcon({
    className: '',
    html: `<div style="
      background:${renk};
      width:32px;height:32px;
      border-radius:50% 50% 50% 0;
      transform:rotate(-45deg);
      display:flex;align-items:center;justify-content:center;
      box-shadow:0 2px 8px rgba(0,0,0,0.25);
      border:2px solid white;
    "><span style="transform:rotate(45deg);font-size:13px;line-height:1">${emoji}</span></div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -34],
  })
}

export default function Explore() {
  const navigate = useNavigate()
  const [heroIdx,    setHeroIdx]    = useState(0)
  const [aktifKat,   setAktifKat]   = useState('tumu')
  const heroRef = useRef(null)

  useEffect(() => {
    const t = setInterval(() => setHeroIdx(p => (p + 1) % HERO_ITEMS.length), 4000)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    if (!heroRef.current) return
    heroRef.current.scrollTo({ left: heroIdx * heroRef.current.offsetWidth, behavior: 'smooth' })
  }, [heroIdx])

  function handleHeroScroll() {
    if (!heroRef.current) return
    setHeroIdx(Math.round(heroRef.current.scrollLeft / heroRef.current.offsetWidth))
  }

  const gosterilecek = aktifKat === 'tumu'
    ? HARITA_NOKTALARI
    : HARITA_NOKTALARI.filter(n => n.kategori === aktifKat)

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ── Header ── */}
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center">
        <div className="w-full max-w-[430px] bg-white/80 backdrop-blur-md border-b border-gray-100 px-4 py-3 pt-12">
          <h1 className="text-gray-900 text-lg font-bold">Keşfet</h1>
        </div>
      </header>

      <div className="pt-[72px] pb-24">

        {/* ── Harita Bölümü ── */}
        <div className="bg-white border-b border-gray-100">

          {/* Harita */}
          <div style={{ height: 260, position: 'relative' }}>
            <MapContainer
              center={[40.8025, 29.4301]}
              zoom={14}
              style={{ width: '100%', height: '100%' }}
              zoomControl={false}
              attributionControl={false}
            >
              <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />
              {gosterilecek.map(nokta => (
                <Marker
                  key={nokta.id}
                  position={[nokta.lat, nokta.lng]}
                  icon={markerIcon(nokta.emoji, nokta.renk)}
                >
                  <Popup closeButton={false}>
                    <div style={{
                      minWidth: 140,
                      padding: '8px 10px',
                      borderRadius: 12,
                      fontFamily: 'Plus Jakarta Sans, sans-serif',
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                        <div style={{
                          width: 28, height: 28, borderRadius: 8,
                          background: nokta.renk + '20',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: 14,
                        }}>{nokta.emoji}</div>
                        <div>
                          <p style={{ fontSize: 11, fontWeight: 700, color: '#111827', margin: 0, lineHeight: 1.3 }}>{nokta.isim}</p>
                          <p style={{ fontSize: 10, color: '#9ca3af', margin: 0, marginTop: 1 }}>{nokta.adres}</p>
                        </div>
                      </div>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>

          {/* Kategori filtreleri */}
          <div className="flex gap-2 px-4 pt-2.5 pb-2 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
            {HARITA_KATEGORILER.map(k => (
              <button
                key={k.key}
                onClick={() => setAktifKat(k.key)}
                className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all active:scale-95"
                style={{
                  background: aktifKat === k.key ? '#111827' : '#f3f4f6',
                  color:      aktifKat === k.key ? '#ffffff' : '#4b5563',
                }}
              >
                <span>{k.emoji}</span>
                {k.label}
              </button>
            ))}
          </div>

          {/* Nokta sayısı */}
          <div className="px-4 pb-2 flex items-center gap-1.5">
            <MapPin size={11} strokeWidth={1.5} className="text-gray-400" />
            <span className="text-gray-400 text-xs">{gosterilecek.length} yer gösteriliyor</span>
          </div>
        </div>

        {/* ── Servis Talep Sistemi ── */}
        <div className="px-4 pt-4 pb-2">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 className="text-gray-900 text-sm font-bold">Servis Talepleri</h2>
              <p className="text-gray-400 text-xs mt-0.5">Probleminizi paylaşın, ustalar teklif versin</p>
            </div>
            <button
              onClick={() => navigate('/talep-olustur')}
              className="flex items-center gap-1.5 bg-gray-900 text-white text-xs font-bold px-3 py-2 rounded-xl active:scale-95 transition-transform"
            >
              <Plus size={13} strokeWidth={2.5} />
              Talep Oluştur
            </button>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
            {TALEPLER.slice(0, 4).map(talep => (
              <button
                key={talep.id}
                onClick={() => navigate(`/talep/${talep.id}`)}
                className="shrink-0 bg-white border border-gray-100 rounded-2xl p-3.5 text-left active:scale-95 transition-transform"
                style={{ width: '180px' }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">{talep.emoji}</span>
                  <span className="text-[10px] font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">{talep.kategori}</span>
                </div>
                <p className="text-gray-900 text-xs font-bold leading-snug line-clamp-2 mb-2">{talep.baslik}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-gray-400 text-[10px]">
                    <Clock size={9} strokeWidth={1.5} />
                    <span>{talep.sure}</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-500 text-[10px]">
                    <MessageCircle size={9} strokeWidth={1.5} />
                    <span>{talep.teklifSayisi} teklif</span>
                  </div>
                </div>
              </button>
            ))}
            <button
              onClick={() => navigate('/talepler')}
              className="shrink-0 flex flex-col items-center justify-center bg-gray-50 border border-dashed border-gray-200 rounded-2xl gap-2 active:scale-95 transition-transform"
              style={{ width: '100px', minHeight: '110px' }}
            >
              <ChevronRight size={18} strokeWidth={1.5} className="text-gray-400" />
              <span className="text-gray-400 text-xs font-medium">Tümü</span>
            </button>
          </div>
        </div>

        <div className="h-px bg-gray-100 mx-4 my-2" />

        {/* ── Hero Carousel ── */}
        <div className="px-4 pt-4">
          <div
            ref={heroRef}
            onScroll={handleHeroScroll}
            className="flex overflow-x-auto rounded-2xl"
            style={{ scrollbarWidth: 'none', scrollSnapType: 'x mandatory' }}
          >
            {HERO_ITEMS.map(item => (
              <button
                key={item.id}
                onClick={() => navigate(item.path)}
                className="shrink-0 w-full flex flex-col justify-end px-5 py-6 active:scale-[0.98] transition-transform"
                style={{ scrollSnapAlign: 'start', background: item.bg, minHeight: '160px', borderRadius: '16px', position: 'relative' }}
              >
                <div className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center text-2xl" style={{ background: item.accent + '33' }}>
                  {item.emoji}
                </div>
                <p className="text-white/60 text-xs font-semibold mb-1 text-left">Öne Çıkan</p>
                <p className="text-white text-xl font-extrabold leading-snug text-left">{item.baslik}</p>
                <p className="text-white/50 text-xs mt-1 text-left">{item.altBaslik}</p>
              </button>
            ))}
          </div>
          <div className="flex justify-center gap-1.5 mt-2">
            {HERO_ITEMS.map((_, i) => (
              <button key={i} onClick={() => setHeroIdx(i)} className="rounded-full transition-all"
                style={{ width: i === heroIdx ? '16px' : '6px', height: '6px', background: i === heroIdx ? '#111827' : '#d1d5db' }} />
            ))}
          </div>
        </div>

        {/* ── Yakınındaki Popüler ── */}
        <div className="pt-6">
          <div className="px-4 flex items-center justify-between mb-3">
            <h2 className="text-gray-800 text-sm font-semibold">Yakınındaki Popüler</h2>
            <button className="text-gray-400 text-xs flex items-center gap-0.5">Tümü <ChevronRight size={12} strokeWidth={2} /></button>
          </div>
          <div className="flex gap-3 px-4 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
            {POPULER_YERLER.map(yer => (
              <button key={yer.id} onClick={() => navigate(yer.path)}
                className="shrink-0 w-36 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden active:scale-95 transition-transform">
                <div className="w-full flex items-center justify-center text-3xl" style={{ height: '80px', background: '#f9fafb' }}>{yer.emoji}</div>
                <div className="p-3">
                  <p className="text-gray-800 text-xs font-semibold truncate">{yer.isim}</p>
                  <p className="text-gray-400 text-[10px] mt-0.5">{yer.kategori}</p>
                  <div className="flex items-center justify-between mt-1.5">
                    <span className="text-yellow-500 text-[11px] font-bold flex items-center gap-0.5"><Star size={10} fill="#eab308" strokeWidth={0} /> {yer.puan}</span>
                    <span className="text-gray-400 text-[10px] flex items-center gap-0.5"><MapPin size={9} strokeWidth={1.5} /> {yer.mesafe}</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* ── Haftalık Öneriler ── */}
        <div className="px-4 pt-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-gray-800 text-sm font-semibold">Bu Hafta Öne Çıkanlar</h2>
            <button onClick={() => navigate('/etkinlikler')} className="text-gray-400 text-xs flex items-center gap-0.5">Tümü <ChevronRight size={12} strokeWidth={2} /></button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {HAFTALIK_ONERILER.map(e => (
              <button key={e.id} onClick={() => navigate(e.path)}
                className="bg-white border border-gray-100 rounded-2xl p-3.5 shadow-sm text-left active:scale-95 transition-transform">
                <span className="text-2xl">{e.emoji}</span>
                <p className="text-gray-800 text-xs font-bold mt-2 leading-snug">{e.isim}</p>
                <p className="text-gray-400 text-[10px] mt-1">{e.tarih} · {e.yer}</p>
                <div className="mt-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                    style={{ background: e.fiyat === 'Ücretsiz' ? '#dcfce7' : '#f3f4f6', color: e.fiyat === 'Ücretsiz' ? '#16a34a' : '#374151' }}>
                    {e.fiyat}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* ── Yeni İşletmeler ── */}
        <div className="pt-6">
          <div className="px-4 flex items-center justify-between mb-3">
            <h2 className="text-gray-800 text-sm font-semibold">Yeni İşletmeler</h2>
          </div>
          <div className="flex flex-col px-4 gap-2">
            {YENI_ISLETMELER.map(i => (
              <button key={i.id} onClick={() => navigate(i.path)}
                className="flex items-center gap-3 bg-white border border-gray-100 rounded-2xl px-4 py-3.5 shadow-sm active:scale-[0.98] transition-transform">
                <div className="w-10 h-10 rounded-2xl bg-gray-50 flex items-center justify-center text-xl shrink-0">{i.emoji}</div>
                <div className="flex-1 text-left">
                  <div className="flex items-center gap-2">
                    <p className="text-gray-800 text-sm font-semibold">{i.isim}</p>
                    <span className="text-[10px] font-bold bg-gray-900 text-white px-1.5 py-0.5 rounded-full">Yeni</span>
                  </div>
                  <p className="text-gray-400 text-xs mt-0.5">{i.aciklama}</p>
                </div>
                <ChevronRight size={16} strokeWidth={1.5} className="text-gray-300 shrink-0" />
              </button>
            ))}
          </div>
        </div>

        {/* ── Kategori Dünyası ── */}
        <div className="px-4 pt-6">
          <h2 className="text-gray-800 text-sm font-semibold mb-3">Kategori Dünyası</h2>
          <div className="grid grid-cols-3 gap-3">
            {KESFET_KATEGORILER.map(k => (
              <button key={k.label} onClick={() => navigate(k.path)}
                className="flex flex-col items-center gap-2 py-5 rounded-2xl border border-gray-100 shadow-sm active:scale-95 transition-transform"
                style={{ background: k.bg }}>
                <span className="text-2xl">{k.emoji}</span>
                <span className="text-gray-700 text-xs font-semibold">{k.label}</span>
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
