import { useState } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import {
  ArrowLeft, Star, MapPin, Phone, Clock, Check, Wifi,
  ChevronRight, Share2, Heart, Calendar, Users, X,
} from 'lucide-react'
import { OTELLER, ODALAR, OTEL_YORUMLAR } from '../data/mockOtel'

function StarRow({ puan, size = 12 }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1,2,3,4,5].map(i => (
        <Star key={i} size={size} strokeWidth={0} fill={i <= Math.round(puan) ? '#eab308' : '#e5e7eb'} />
      ))}
    </div>
  )
}

const ODA_EMOJI_BG = {
  '🛏️':   '#f8fafc',
  '🛏️✨': '#eff6ff',
  '👑':   '#fdf4ff',
  '👨‍👩‍👧‍👦': '#f0fdf4',
  '🏅':   '#fffbeb',
  '🌊':   '#eff6ff',
  '🌅':   '#fff7ed',
  '🏡':   '#f0fdf4',
}

export default function OtelDetail() {
  const { id }       = useParams()
  const navigate     = useNavigate()
  const location     = useLocation()
  const state        = location.state || {}

  const today    = new Date().toISOString().split('T')[0]
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0]

  const [giris,       setGiris]       = useState(state.giris    || today)
  const [cikis,       setCikis]       = useState(state.cikis    || tomorrow)
  const [misafir,     setMisafir]     = useState(state.misafir  || 2)
  const [tab,         setTab]         = useState('odalar')
  const [favori,      setFavori]      = useState(false)
  const [rezervSheet, setRezervSheet] = useState(null) // seçili oda
  const [basarili,    setBasarili]    = useState(false)
  const [teklifSheet, setTeklifSheet] = useState(false)
  const [teklifNot,   setTeklifNot]   = useState('')

  const otel   = OTELLER.find(o => o.id === Number(id))
  const odalar = ODALAR[Number(id)] || []
  const yorumlar = OTEL_YORUMLAR.filter(y => y.otelId === Number(id))

  const geceSayisi = Math.max(1, Math.round((new Date(cikis) - new Date(giris)) / 86400000))

  if (!otel) return <div className="flex items-center justify-center min-h-screen"><p className="text-gray-400">Otel bulunamadı.</p></div>

  function rezervasyonYap() {
    setRezervSheet(null)
    setBasarili(true)
    setTimeout(() => setBasarili(false), 2500)
  }

  if (basarili) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-6 gap-4">
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center text-4xl">✅</div>
        <h2 className="text-gray-900 text-xl font-bold text-center">Rezervasyon Alındı!</h2>
        <p className="text-gray-500 text-sm text-center leading-relaxed">
          {giris} — {cikis} tarihleri için rezervasyonunuz oluşturuldu. Onay için otel sizi arayacak.
        </p>
        <button onClick={() => navigate(-1)} className="mt-4 bg-gray-900 text-white px-8 py-3 rounded-2xl text-sm font-bold active:scale-95 transition-transform">
          Tamam
        </button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center">
        <div className="w-full max-w-[430px] bg-white/90 backdrop-blur-md border-b border-gray-100 px-4 py-3 flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="w-9 h-9 flex items-center justify-center rounded-xl bg-gray-100 active:bg-gray-200 transition-colors">
            <ArrowLeft size={18} strokeWidth={1.5} className="text-gray-700" />
          </button>
          <span className="text-gray-900 text-base font-bold flex-1 truncate">{otel.isim}</span>
          <button onClick={() => setFavori(!favori)} className="w-9 h-9 flex items-center justify-center">
            <Heart size={18} strokeWidth={1.5} className={favori ? 'text-red-500 fill-red-500' : 'text-gray-400'} />
          </button>
          <button className="w-9 h-9 flex items-center justify-center">
            <Share2 size={18} strokeWidth={1.5} className="text-gray-400" />
          </button>
        </div>
      </header>

      <div className="pt-16 pb-24">

        {/* Hero görsel */}
        <div className="w-full flex items-center justify-center relative" style={{ height: '220px', background: otel.bg }}>
          <span className="text-[90px]">{otel.emoji}</span>
          <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm rounded-2xl px-3 py-2">
            <div className="flex items-center gap-1.5">
              <Star size={12} fill="#fbbf24" strokeWidth={0} />
              <span className="text-white text-sm font-bold">{otel.puan}</span>
              <span className="text-white/60 text-xs">({otel.yorumSayisi} yorum)</span>
            </div>
          </div>
          <div className="absolute bottom-4 right-4 bg-white rounded-2xl px-3 py-1.5">
            <span className="text-gray-900 text-xs font-bold">
              {otel.tip === 'apart' ? 'Apart Otel' : otel.tip === 'butik' ? 'Butik Otel' : `${otel.tip} Yıldızlı`}
            </span>
          </div>
        </div>

        {/* Otel bilgisi */}
        <div className="mx-4 mt-4 bg-white border border-gray-100 rounded-2xl p-4">
          <h1 className="text-gray-900 text-lg font-extrabold">{otel.isim}</h1>
          <div className="flex items-center gap-1.5 mt-1 text-gray-500 text-xs">
            <MapPin size={11} strokeWidth={1.5} />
            <span>{otel.adres}</span>
          </div>
          <div className="flex gap-3 mt-3">
            <div className="flex items-center gap-1.5 text-gray-500 text-xs">
              <Clock size={11} strokeWidth={1.5} />
              <span>Giriş {otel.checkin}</span>
            </div>
            <div className="flex items-center gap-1.5 text-gray-500 text-xs">
              <Clock size={11} strokeWidth={1.5} />
              <span>Çıkış {otel.checkout}</span>
            </div>
          </div>
          {/* Özellikler */}
          <div className="flex flex-wrap gap-2 mt-3">
            {otel.ozellikler.map(o => (
              <span key={o} className="flex items-center gap-1 text-[11px] text-gray-600 bg-gray-100 px-2.5 py-1 rounded-full">
                <Check size={9} strokeWidth={2.5} className="text-green-600" />
                {o}
              </span>
            ))}
          </div>
        </div>

        {/* Tarih + Misafir seçici */}
        <div className="mx-4 mt-3 bg-white border border-gray-100 rounded-2xl p-4">
          <p className="text-gray-900 text-xs font-bold mb-3">Tarih & Misafir</p>
          <div className="flex gap-2">
            <div className="flex-1 bg-gray-50 rounded-xl px-3 py-2.5">
              <p className="text-gray-400 text-[10px] mb-0.5 flex items-center gap-1"><Calendar size={9} strokeWidth={2} />Giriş</p>
              <input type="date" value={giris} min={today}
                onChange={e => { setGiris(e.target.value); if (e.target.value >= cikis) setCikis(e.target.value) }}
                className="text-gray-900 text-xs font-bold outline-none bg-transparent w-full" />
            </div>
            <div className="flex-1 bg-gray-50 rounded-xl px-3 py-2.5">
              <p className="text-gray-400 text-[10px] mb-0.5 flex items-center gap-1"><Calendar size={9} strokeWidth={2} />Çıkış</p>
              <input type="date" value={cikis} min={giris}
                onChange={e => setCikis(e.target.value)}
                className="text-gray-900 text-xs font-bold outline-none bg-transparent w-full" />
            </div>
            <div className="bg-gray-50 rounded-xl px-3 py-2.5 flex flex-col justify-center">
              <p className="text-gray-400 text-[10px] flex items-center gap-1"><Users size={9} strokeWidth={2} />Kişi</p>
              <div className="flex items-center gap-2 mt-1">
                <button onClick={() => setMisafir(m => Math.max(1, m - 1))} className="text-gray-600 font-bold">−</button>
                <span className="text-gray-900 text-xs font-bold">{misafir}</span>
                <button onClick={() => setMisafir(m => Math.min(8, m + 1))} className="text-gray-600 font-bold">+</button>
              </div>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-2">
            <span className="bg-gray-900 text-white text-[10px] font-bold px-2.5 py-1 rounded-full">{geceSayisi} gece</span>
            <span className="text-gray-400 text-[10px]">seçildi</span>
          </div>
        </div>

        {/* Tab menü */}
        <div className="flex mx-4 mt-3 bg-gray-100 rounded-2xl p-1 gap-1">
          {[
            { key: 'odalar',   label: 'Odalar' },
            { key: 'hakkinda', label: 'Hakkında' },
            { key: 'yorumlar', label: `Yorumlar (${yorumlar.length})` },
          ].map(t => (
            <button key={t.key} onClick={() => setTab(t.key)}
              className="flex-1 py-2.5 rounded-xl text-xs font-semibold transition-all"
              style={{ background: tab === t.key ? '#ffffff' : 'transparent', color: tab === t.key ? '#111827' : '#9ca3af' }}>
              {t.label}
            </button>
          ))}
        </div>

        {/* ── ODALAR ── */}
        {tab === 'odalar' && (
          <div className="mx-4 mt-3 flex flex-col gap-3">
            {odalar.length === 0 && (
              <div className="bg-white border border-gray-100 rounded-2xl p-6 text-center">
                <p className="text-gray-400 text-sm">Bu otel için oda bilgisi henüz yok.</p>
              </div>
            )}
            {odalar.map(oda => (
              <div key={oda.id} className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
                {/* Oda görseli */}
                <div className="w-full flex items-center justify-center relative"
                  style={{ height: '130px', background: oda.bg || '#f9fafb' }}>
                  <span className="text-6xl">{oda.emoji}</span>
                  {!oda.musait && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <span className="text-white text-sm font-bold bg-red-500 px-3 py-1 rounded-full">Dolu</span>
                    </div>
                  )}
                  <div className="absolute top-3 right-3 bg-white rounded-xl px-2 py-1">
                    <span className="text-gray-700 text-[10px] font-bold">{oda.alan}</span>
                  </div>
                </div>

                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-gray-900 text-sm font-bold">{oda.isim}</h3>
                      <p className="text-gray-500 text-xs mt-0.5">{oda.tip} · Kat: {oda.kat} · {oda.manzara}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-900 text-base font-extrabold">₺{(oda.fiyat * geceSayisi).toLocaleString('tr-TR')}</p>
                      <p className="text-gray-400 text-[10px]">₺{oda.fiyat.toLocaleString('tr-TR')}/gece · {geceSayisi} gece</p>
                    </div>
                  </div>

                  <p className="text-gray-600 text-xs leading-relaxed mb-3">{oda.aciklama}</p>

                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {oda.ozellikler.map(o => (
                      <span key={o} className="text-[10px] text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">{o}</span>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => oda.musait && setTeklifSheet(true)}
                      disabled={!oda.musait}
                      className="flex-1 py-3 rounded-xl border-2 border-gray-200 text-gray-700 text-xs font-bold active:scale-95 transition-all disabled:opacity-30">
                      Teklif Ver
                    </button>
                    <button
                      onClick={() => oda.musait && setRezervSheet(oda)}
                      disabled={!oda.musait}
                      className="flex-1 py-3 rounded-xl text-white text-xs font-bold active:scale-95 transition-all disabled:opacity-30"
                      style={{ background: oda.musait ? '#111827' : '#9ca3af' }}>
                      Rezervasyon Yap
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── HAKKINDA ── */}
        {tab === 'hakkinda' && (
          <div className="mx-4 mt-3 space-y-3">
            <div className="bg-white border border-gray-100 rounded-2xl p-4">
              <h3 className="text-gray-900 text-sm font-bold mb-2">Otel Hakkında</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{otel.aciklama}</p>
            </div>
            <div className="bg-white border border-gray-100 rounded-2xl p-4">
              <h3 className="text-gray-900 text-sm font-bold mb-3">İletişim</h3>
              <div className="space-y-2.5">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-gray-100 flex items-center justify-center">
                    <MapPin size={14} strokeWidth={1.5} className="text-gray-600" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-[10px]">Adres</p>
                    <p className="text-gray-800 text-xs font-medium">{otel.adres}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-gray-100 flex items-center justify-center">
                    <Phone size={14} strokeWidth={1.5} className="text-gray-600" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-[10px]">Telefon</p>
                    <p className="text-gray-800 text-xs font-medium">{otel.telefon}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── YORUMLAR ── */}
        {tab === 'yorumlar' && (
          <div className="mx-4 mt-3 space-y-3">
            {yorumlar.length === 0 ? (
              <div className="bg-white border border-gray-100 rounded-2xl p-6 text-center">
                <p className="text-gray-400 text-sm">Henüz yorum yok.</p>
              </div>
            ) : yorumlar.map(y => (
              <div key={y.id} className="bg-white border border-gray-100 rounded-2xl p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center text-sm font-bold text-gray-600">
                      {y.isim[0]}
                    </div>
                    <div>
                      <p className="text-gray-900 text-sm font-semibold">{y.isim}</p>
                      <p className="text-gray-400 text-xs">{y.tarih}</p>
                    </div>
                  </div>
                  <StarRow puan={y.puan} size={11} />
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">{y.yorum}</p>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* ── REZERVASYON SHEET ── */}
      {rezervSheet && (
        <div className="fixed inset-0 z-[100] flex flex-col justify-end">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setRezervSheet(null)} />
          <div className="relative bg-white rounded-t-3xl px-5 pt-5 pb-10 z-10">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-900 text-base font-bold">Rezervasyon Özeti</h3>
              <button onClick={() => setRezervSheet(null)} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                <X size={16} strokeWidth={2} className="text-gray-600" />
              </button>
            </div>
            <div className="bg-gray-50 rounded-2xl p-4 mb-4 space-y-2.5">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Oda</span>
                <span className="text-gray-900 font-semibold">{rezervSheet.isim}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Giriş</span>
                <span className="text-gray-900 font-semibold">{giris}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Çıkış</span>
                <span className="text-gray-900 font-semibold">{cikis}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Misafir</span>
                <span className="text-gray-900 font-semibold">{misafir} kişi</span>
              </div>
              <div className="border-t border-gray-200 pt-2.5 flex justify-between">
                <span className="text-gray-900 font-bold">Toplam</span>
                <span className="text-gray-900 text-base font-extrabold">₺{(rezervSheet.fiyat * geceSayisi).toLocaleString('tr-TR')}</span>
              </div>
            </div>
            <button onClick={rezervasyonYap}
              className="w-full py-4 rounded-2xl bg-gray-900 text-white text-sm font-bold active:scale-95 transition-transform">
              Rezervasyonu Onayla
            </button>
          </div>
        </div>
      )}

      {/* ── TEKLİF VER SHEET ── */}
      {teklifSheet && (
        <div className="fixed inset-0 z-[100] flex flex-col justify-end">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setTeklifSheet(false)} />
          <div className="relative bg-white rounded-t-3xl px-5 pt-5 pb-10 z-10">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-900 text-base font-bold">Özel Fiyat Talebi</h3>
              <button onClick={() => setTeklifSheet(false)} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                <X size={16} strokeWidth={2} className="text-gray-600" />
              </button>
            </div>
            <p className="text-gray-500 text-sm mb-4">Otel yönetimine özel fiyat teklifinizi iletin. 1 saat içinde dönüş yapılır.</p>
            <textarea
              value={teklifNot}
              onChange={e => setTeklifNot(e.target.value)}
              placeholder="Tarihleriniz, misafir sayınız ve bütçenizi belirtin..."
              rows={4}
              className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 text-sm text-gray-800 outline-none resize-none mb-4"
            />
            <button
              onClick={() => { setTeklifSheet(false); setBasarili(true) }}
              className="w-full py-4 rounded-2xl bg-gray-900 text-white text-sm font-bold active:scale-95 transition-transform">
              Teklif Gönder
            </button>
          </div>
        </div>
      )}

    </div>
  )
}
