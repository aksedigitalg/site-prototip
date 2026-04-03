import { useState } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import {
  ArrowLeft, Star, MapPin, Calendar, Users, Check, Share2,
  Heart, X, ChevronRight, Shield,
} from 'lucide-react'
import { ARACLAR, KIRALAMA_SIRKETLERI, ARAC_YORUMLAR } from '../data/mockAracKiralama'

function StarRow({ puan, size = 11 }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1,2,3,4,5].map(i => (
        <Star key={i} size={size} strokeWidth={0} fill={i <= Math.round(puan) ? '#eab308' : '#e5e7eb'} />
      ))}
    </div>
  )
}

const YAKIT_COLOR = {
  'Benzin':  { bg: '#fff7ed', text: '#c2410c' },
  'Dizel':   { bg: '#eff6ff', text: '#1d4ed8' },
  'Hibrit':  { bg: '#f0fdf4', text: '#15803d' },
  'Elektrik (620 km menzil)': { bg: '#1e293b', text: '#7dd3fc' },
  'Elektrik (480 km menzil)': { bg: '#064e3b', text: '#6ee7b7' },
}

export default function AracDetail() {
  const { id }    = useParams()
  const navigate  = useNavigate()
  const location  = useLocation()
  const state     = location.state || {}

  const today    = new Date().toISOString().split('T')[0]
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0]

  const [alis,        setAlis]        = useState(state.alis   || today)
  const [iade,        setIade]        = useState(state.iade   || tomorrow)
  const [konum,       setKonum]       = useState(state.konum  || 'Gebze Merkez')
  const [favori,      setFavori]      = useState(false)
  const [tab,         setTab]         = useState('detay')
  const [kiraSheet,   setKiraSheet]   = useState(false)
  const [teklifSheet, setTeklifSheet] = useState(false)
  const [teklifNot,   setTeklifNot]   = useState('')
  const [teklifFiyat, setTeklifFiyat] = useState('')
  const [basarili,    setBasarili]    = useState(false)

  const arac   = ARACLAR.find(a => a.id === Number(id))
  const sirket = arac ? KIRALAMA_SIRKETLERI[arac.sirketId] : null
  const yorumlar = ARAC_YORUMLAR.filter(y => y.aracId === Number(id))

  const gunSayisi  = Math.max(1, Math.round((new Date(iade) - new Date(alis)) / 86400000))
  const toplamFiyat = arac ? arac.gunlukFiyat * gunSayisi : 0

  if (!arac) return <div className="flex items-center justify-center min-h-screen"><p className="text-gray-400">Araç bulunamadı.</p></div>
  if (basarili) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-6 gap-4">
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center text-4xl">✅</div>
        <h2 className="text-gray-900 text-xl font-bold text-center">Rezervasyon Alındı!</h2>
        <p className="text-gray-500 text-sm text-center leading-relaxed">
          {arac.marka} {arac.model} için {alis} — {iade} tarihleri arasında rezervasyonunuz onaylandı.
        </p>
        <button onClick={() => navigate(-1)} className="mt-4 bg-gray-900 text-white px-8 py-3 rounded-2xl text-sm font-bold active:scale-95 transition-transform">
          Tamam
        </button>
      </div>
    )
  }

  const yakitRenk = YAKIT_COLOR[arac.yakit] || { bg: '#f3f4f6', text: '#374151' }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center">
        <div className="w-full max-w-[430px] bg-white/90 backdrop-blur-md border-b border-gray-100 px-4 py-3 flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="w-9 h-9 flex items-center justify-center rounded-xl bg-gray-100 active:bg-gray-200 transition-colors">
            <ArrowLeft size={18} strokeWidth={1.5} className="text-gray-700" />
          </button>
          <span className="text-gray-900 text-base font-bold flex-1">{arac.marka} {arac.model}</span>
          <button onClick={() => setFavori(!favori)} className="w-9 h-9 flex items-center justify-center">
            <Heart size={18} strokeWidth={1.5} className={favori ? 'text-red-500 fill-red-500' : 'text-gray-400'} />
          </button>
          <button className="w-9 h-9 flex items-center justify-center">
            <Share2 size={18} strokeWidth={1.5} className="text-gray-400" />
          </button>
        </div>
      </header>

      <div className="pt-16 pb-28">

        {/* Araç görseli */}
        <div className="w-full flex items-center justify-center relative" style={{ height: '220px', background: arac.bg }}>
          <span className="text-[100px]">{arac.emoji}</span>
          <div className="absolute top-4 left-4 bg-black/40 backdrop-blur-sm rounded-xl px-2.5 py-1.5">
            <span className="text-white text-xs font-bold">{arac.kategoriLabel}</span>
          </div>
          {!arac.musait && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="text-white text-base font-bold bg-red-500 px-4 py-2 rounded-full">Müsait Değil</span>
            </div>
          )}
        </div>

        {/* Araç başlık */}
        <div className="mx-4 mt-4 bg-white border border-gray-100 rounded-2xl p-4">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-gray-900 text-lg font-extrabold">{arac.marka} {arac.model}</h1>
              <p className="text-gray-500 text-sm">{arac.yil} · {arac.renk} · {arac.kapi} kapı</p>
            </div>
            <div className="text-right">
              <p className="text-gray-900 text-xl font-extrabold">₺{arac.gunlukFiyat.toLocaleString('tr-TR')}</p>
              <p className="text-gray-400 text-xs">günlük</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mt-3">
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full"
              style={{ background: yakitRenk.bg, color: yakitRenk.text }}>
              {arac.yakit.split(' (')[0]}
            </span>
            <span className="text-xs font-semibold text-gray-600 bg-gray-100 px-2.5 py-1 rounded-full">
              {arac.vites === 'Otomatik' ? '🤖' : '⚙️'} {arac.vites}
            </span>
            <span className="text-xs text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full">👥 {arac.koltuk} kişi</span>
            <span className="text-xs text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full">🧳 {arac.bagaj}</span>
          </div>
        </div>

        {/* Tarih seçici */}
        <div className="mx-4 mt-3 bg-white border border-gray-100 rounded-2xl p-4">
          <p className="text-gray-900 text-xs font-bold mb-3">Kiralama Tarihleri</p>
          <div className="flex gap-2 mb-2">
            <div className="flex-1 bg-gray-50 rounded-xl px-3 py-2.5">
              <p className="text-gray-400 text-[10px] mb-0.5 flex items-center gap-1"><Calendar size={9} strokeWidth={2} />Alış</p>
              <input type="date" value={alis} min={today}
                onChange={e => { setAlis(e.target.value); if (e.target.value >= iade) setIade(e.target.value) }}
                className="text-gray-900 text-xs font-bold outline-none bg-transparent w-full" />
            </div>
            <div className="flex-1 bg-gray-50 rounded-xl px-3 py-2.5">
              <p className="text-gray-400 text-[10px] mb-0.5 flex items-center gap-1"><Calendar size={9} strokeWidth={2} />İade</p>
              <input type="date" value={iade} min={alis}
                onChange={e => setIade(e.target.value)}
                className="text-gray-900 text-xs font-bold outline-none bg-transparent w-full" />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="bg-gray-900 text-white text-[10px] font-bold px-2.5 py-1 rounded-full">{gunSayisi} gün</span>
            </div>
            <p className="text-gray-900 text-sm font-extrabold">₺{toplamFiyat.toLocaleString('tr-TR')} toplam</p>
          </div>
        </div>

        {/* Alış Lokasyonu */}
        <div className="mx-4 mt-3 bg-white border border-gray-100 rounded-2xl p-4">
          <p className="text-gray-900 text-xs font-bold mb-2 flex items-center gap-1.5">
            <MapPin size={12} strokeWidth={2} /> Alış Lokasyonu
          </p>
          <input value={konum} onChange={e => setKonum(e.target.value)}
            className="text-gray-800 text-sm outline-none bg-gray-50 rounded-xl px-3 py-2.5 w-full" />
        </div>

        {/* Tab */}
        <div className="flex mx-4 mt-3 bg-gray-100 rounded-2xl p-1 gap-1">
          {[
            { key: 'detay', label: 'Detaylar' },
            { key: 'ozellik', label: 'Özellikler' },
            { key: 'sirket', label: 'Kiralama Firması' },
            { key: 'yorumlar', label: 'Yorumlar' },
          ].map(t => (
            <button key={t.key} onClick={() => setTab(t.key)}
              className="flex-1 py-2 rounded-xl text-[10px] font-semibold transition-all"
              style={{ background: tab === t.key ? '#ffffff' : 'transparent', color: tab === t.key ? '#111827' : '#9ca3af' }}>
              {t.label}
            </button>
          ))}
        </div>

        {/* Detaylar */}
        {tab === 'detay' && (
          <div className="mx-4 mt-3 bg-white border border-gray-100 rounded-2xl p-4">
            <p className="text-gray-600 text-sm leading-relaxed mb-4">{arac.aciklama}</p>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: 'Min. Yaş', val: `${arac.min_yas} yaş` },
                { label: 'Ehliyet', val: `${arac.ehliyet_yil} yıl` },
                { label: 'Kilometre', val: arac.kilometre },
                { label: 'Sigorta', val: arac.sigorta },
                { label: 'Bagaj', val: arac.bagaj },
                { label: 'Koltuk', val: `${arac.koltuk} kişi` },
              ].map(item => (
                <div key={item.label} className="bg-gray-50 rounded-xl p-3">
                  <p className="text-gray-400 text-[10px] mb-0.5">{item.label}</p>
                  <p className="text-gray-900 text-xs font-bold">{item.val}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Özellikler */}
        {tab === 'ozellik' && (
          <div className="mx-4 mt-3 bg-white border border-gray-100 rounded-2xl p-4">
            <div className="flex flex-col gap-3">
              {arac.ozellikler.map(o => (
                <div key={o} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-gray-900 flex items-center justify-center shrink-0">
                    <Check size={12} strokeWidth={2.5} className="text-white" />
                  </div>
                  <p className="text-gray-800 text-sm">{o}</p>
                </div>
              ))}
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                  <Shield size={12} strokeWidth={2} className="text-green-600" />
                </div>
                <p className="text-gray-800 text-sm">{arac.sigorta}</p>
              </div>
            </div>
          </div>
        )}

        {/* Firma */}
        {tab === 'sirket' && sirket && (
          <div className="mx-4 mt-3 space-y-3">
            <div className="bg-white border border-gray-100 rounded-2xl p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center text-3xl shrink-0">{sirket.emoji}</div>
                <div className="flex-1">
                  <h3 className="text-gray-900 text-sm font-bold">{sirket.isim}</h3>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <StarRow puan={sirket.puan} />
                    <span className="text-yellow-600 text-xs font-bold">{sirket.puan}</span>
                    <span className="text-gray-400 text-xs">({sirket.yorumSayisi})</span>
                  </div>
                  <p className="text-gray-400 text-xs mt-0.5 flex items-center gap-1">
                    <MapPin size={10} strokeWidth={1.5} />{sirket.konum}
                  </p>
                </div>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed mb-3">{sirket.aciklama}</p>
              <div className="flex flex-wrap gap-2">
                {sirket.ozellikler.map(o => (
                  <span key={o} className="text-[10px] text-gray-600 bg-gray-100 px-2.5 py-1 rounded-full flex items-center gap-1">
                    <Check size={9} strokeWidth={2.5} className="text-green-600" />{o}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Yorumlar */}
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
                    <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center text-sm font-bold text-gray-600">{y.isim[0]}</div>
                    <div>
                      <p className="text-gray-900 text-sm font-semibold">{y.isim}</p>
                      <p className="text-gray-400 text-xs">{y.tarih}</p>
                    </div>
                  </div>
                  <StarRow puan={y.puan} />
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">{y.yorum}</p>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Kiralama CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center">
        <div className="w-full max-w-[430px] bg-white/90 backdrop-blur-md border-t border-gray-100 px-4 py-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-gray-400 text-xs">{gunSayisi} günlük toplam</p>
              <p className="text-gray-900 text-lg font-extrabold">₺{toplamFiyat.toLocaleString('tr-TR')}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => arac.musait && setTeklifSheet(true)}
                disabled={!arac.musait}
                className="px-4 py-3 rounded-2xl border-2 border-gray-200 text-gray-700 text-xs font-bold active:scale-95 transition-all disabled:opacity-30">
                Teklif Ver
              </button>
              <button
                onClick={() => arac.musait && setKiraSheet(true)}
                disabled={!arac.musait}
                className="px-6 py-3 rounded-2xl text-white text-xs font-bold active:scale-95 transition-all disabled:opacity-30"
                style={{ background: arac.musait ? '#111827' : '#9ca3af' }}>
                Hemen Kirala
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── KİRALAMA SHEET ── */}
      {kiraSheet && (
        <div className="fixed inset-0 z-[100] flex flex-col justify-end">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setKiraSheet(false)} />
          <div className="relative bg-white rounded-t-3xl px-5 pt-5 pb-10 z-10">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-900 text-base font-bold">Kiralama Özeti</h3>
              <button onClick={() => setKiraSheet(false)} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                <X size={16} strokeWidth={2} className="text-gray-600" />
              </button>
            </div>
            <div className="bg-gray-50 rounded-2xl p-4 mb-4 space-y-2.5">
              <div className="flex justify-between text-sm"><span className="text-gray-500">Araç</span><span className="text-gray-900 font-semibold">{arac.marka} {arac.model}</span></div>
              <div className="flex justify-between text-sm"><span className="text-gray-500">Alış</span><span className="text-gray-900 font-semibold">{alis}</span></div>
              <div className="flex justify-between text-sm"><span className="text-gray-500">İade</span><span className="text-gray-900 font-semibold">{iade}</span></div>
              <div className="flex justify-between text-sm"><span className="text-gray-500">Lokasyon</span><span className="text-gray-900 font-semibold">{konum}</span></div>
              <div className="flex justify-between text-sm"><span className="text-gray-500">Sigorta</span><span className="text-gray-900 font-semibold">{arac.sigorta}</span></div>
              <div className="border-t border-gray-200 pt-2.5 flex justify-between">
                <span className="text-gray-900 font-bold">Toplam ({gunSayisi} gün)</span>
                <span className="text-gray-900 text-base font-extrabold">₺{toplamFiyat.toLocaleString('tr-TR')}</span>
              </div>
            </div>
            <button onClick={() => { setKiraSheet(false); setBasarili(true) }}
              className="w-full py-4 rounded-2xl bg-gray-900 text-white text-sm font-bold active:scale-95 transition-transform">
              Rezervasyonu Onayla
            </button>
          </div>
        </div>
      )}

      {/* ── TEKLİF SHEET ── */}
      {teklifSheet && (
        <div className="fixed inset-0 z-[100] flex flex-col justify-end">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setTeklifSheet(false)} />
          <div className="relative bg-white rounded-t-3xl px-5 pt-5 pb-10 z-10">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-900 text-base font-bold">Fiyat Teklifi Ver</h3>
              <button onClick={() => setTeklifSheet(false)} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                <X size={16} strokeWidth={2} className="text-gray-600" />
              </button>
            </div>
            <p className="text-gray-500 text-sm mb-4">Kiralama firmasına özel fiyat teklifinizi iletin.</p>
            <div className="bg-gray-50 rounded-2xl px-4 py-3 mb-3">
              <p className="text-gray-400 text-xs mb-1">Teklif Ettiğiniz Fiyat (günlük, TL)</p>
              <input type="number" value={teklifFiyat} onChange={e => setTeklifFiyat(e.target.value)}
                placeholder={`Mevcut fiyat: ₺${arac.gunlukFiyat}`}
                className="text-gray-900 text-sm font-bold outline-none bg-transparent w-full" />
            </div>
            <textarea value={teklifNot} onChange={e => setTeklifNot(e.target.value)}
              placeholder="Notunuz (uzun dönem kiralama, özel durum vb.)..."
              rows={3}
              className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-4 py-3 text-sm text-gray-800 outline-none resize-none mb-4" />
            <button onClick={() => { setTeklifSheet(false); setBasarili(true) }}
              className="w-full py-4 rounded-2xl bg-gray-900 text-white text-sm font-bold active:scale-95 transition-transform">
              Teklif Gönder
            </button>
          </div>
        </div>
      )}

    </div>
  )
}
