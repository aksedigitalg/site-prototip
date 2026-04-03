import { useState } from 'react'
import { Calendar, Clock, Users, CheckCircle2, XCircle, List, Plus, X, ChevronLeft, ChevronRight } from 'lucide-react'
import IsletmeNav from '../../components/IsletmeNav'
import { ISLETME_REZERVASYONLAR } from '../../data/mockIsletme'

const DURUM_STYLE = {
  bekliyor:   { bg: '#fff7ed', color: '#ea580c', label: 'Bekliyor' },
  onaylandi:  { bg: '#f0fdf4', color: '#16a34a', label: 'Onaylandı' },
  tamamlandi: { bg: '#f9fafb', color: '#6b7280', label: 'Tamamlandı' },
}

const AYLAR_TR = ['Ocak','Şubat','Mart','Nisan','Mayıs','Haziran','Temmuz','Ağustos','Eylül','Ekim','Kasım','Aralık']
const GUN_K    = ['Pt','Sa','Çr','Pe','Cu','Ct','Pz']

// Tarih string'inden gün sayısını çek (örn: "4 Nisan 2026" → 4)
function tarihGun(tarihStr) {
  return parseInt(tarihStr.split(' ')[0]) || 0
}

function tarihAy(tarihStr) {
  const AYLAR = ['Ocak','Şubat','Mart','Nisan','Mayıs','Haziran','Temmuz','Ağustos','Eylül','Ekim','Kasım','Aralık']
  const parcalar = tarihStr.split(' ')
  return AYLAR.indexOf(parcalar[1])
}

function tarihYil(tarihStr) {
  return parseInt(tarihStr.split(' ')[2]) || new Date().getFullYear()
}

export default function IsletmeRezervasyonlar() {
  const [liste,     setListe]     = useState(ISLETME_REZERVASYONLAR)
  const [aktifTab,  setAktifTab]  = useState('bekliyor')
  const [gorunum,   setGorunum]   = useState('liste')   // 'liste' | 'takvim'
  const [gorulenAy, setGorulenAy] = useState(new Date())
  const [yeniSheet, setYeniSheet] = useState(false)

  // Yeni rezervasyon form state
  const [yeniMusteri, setYeniMusteri] = useState('')
  const [yeniTarih,   setYeniTarih]   = useState('')
  const [yeniSaat,    setYeniSaat]    = useState('')
  const [yeniKisi,    setYeniKisi]    = useState(2)
  const [yeniNot,     setYeniNot]     = useState('')

  function durumGuncelle(id, yeniDurum) {
    setListe(prev => prev.map(r => r.id === id ? { ...r, durum: yeniDurum } : r))
  }

  function rezervasyonEkle() {
    if (!yeniMusteri || !yeniTarih || !yeniSaat) return
    const yeni = {
      id: Date.now(),
      musteri: yeniMusteri,
      tarih: new Date(yeniTarih).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' }),
      saat: yeniSaat,
      kisi: yeniKisi,
      not: yeniNot,
      durum: 'bekliyor',
    }
    setListe(prev => [yeni, ...prev])
    setYeniMusteri(''); setYeniTarih(''); setYeniSaat(''); setYeniKisi(2); setYeniNot('')
    setYeniSheet(false)
  }

  // Takvim hesapları
  const yil = gorulenAy.getFullYear()
  const ay  = gorulenAy.getMonth()
  const ayBaslangic   = new Date(yil, ay, 1)
  const ayBitis       = new Date(yil, ay + 1, 0)
  const baslangicGunu = (ayBaslangic.getDay() + 6) % 7
  const gunSayisi     = ayBitis.getDate()

  // O gündeki rezervasyonlar
  function gunRezervasyonlar(gun) {
    return liste.filter(r => {
      const g = tarihGun(r.tarih)
      const m = tarihAy(r.tarih)
      const y = tarihYil(r.tarih)
      return g === gun && m === ay && y === yil
    })
  }

  const filtrelenmis = aktifTab === 'tümü'
    ? liste
    : liste.filter(r => r.durum === aktifTab)

  const headerH = 140

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center">
        <div className="w-full max-w-[430px] bg-white border-b border-gray-100 px-4 pt-12 pb-3">
          <div className="flex items-center justify-between mb-3">
            <h1 className="text-gray-900 text-base font-extrabold">Rezervasyonlar</h1>
            <div className="flex items-center gap-2">
              {/* Görünüm toggle */}
              <div className="flex bg-gray-100 rounded-xl p-0.5">
                <button
                  onClick={() => setGorunum('liste')}
                  className="flex items-center justify-center rounded-[10px] transition-all"
                  style={{ width: 32, height: 28, background: gorunum === 'liste' ? '#111827' : 'transparent' }}
                >
                  <List size={14} strokeWidth={2} color={gorunum === 'liste' ? '#fff' : '#6b7280'} />
                </button>
                <button
                  onClick={() => setGorunum('takvim')}
                  className="flex items-center justify-center rounded-[10px] transition-all"
                  style={{ width: 32, height: 28, background: gorunum === 'takvim' ? '#111827' : 'transparent' }}
                >
                  <Calendar size={14} strokeWidth={2} color={gorunum === 'takvim' ? '#fff' : '#6b7280'} />
                </button>
              </div>
              {/* Yeni rezervasyon */}
              <button
                onClick={() => setYeniSheet(true)}
                className="flex items-center gap-1 bg-gray-900 text-white rounded-xl px-3 py-1.5 text-xs font-semibold active:scale-95 transition-transform"
              >
                <Plus size={13} strokeWidth={2.5} /> Yeni
              </button>
            </div>
          </div>

          {/* Tab filtreleri — sadece liste görünümünde */}
          {gorunum === 'liste' && (
            <div className="flex gap-2">
              {['bekliyor', 'onaylandi', 'tamamlandi'].map(t => (
                <button
                  key={t}
                  onClick={() => setAktifTab(t)}
                  className="px-3 py-1.5 rounded-full text-xs font-semibold transition-colors"
                  style={{
                    background: aktifTab === t ? '#111827' : '#f3f4f6',
                    color:      aktifTab === t ? 'white'   : '#6b7280',
                  }}
                >
                  {DURUM_STYLE[t].label}
                </button>
              ))}
            </div>
          )}

          {/* Ay navigasyonu — sadece takvim görünümünde */}
          {gorunum === 'takvim' && (
            <div className="flex items-center justify-between">
              <button
                onClick={() => setGorulenAy(new Date(yil, ay - 1, 1))}
                className="w-8 h-8 rounded-xl bg-gray-100 flex items-center justify-center"
              >
                <ChevronLeft size={15} strokeWidth={2} className="text-gray-600" />
              </button>
              <span className="text-gray-800 text-sm font-bold">{AYLAR_TR[ay]} {yil}</span>
              <button
                onClick={() => setGorulenAy(new Date(yil, ay + 1, 1))}
                className="w-8 h-8 rounded-xl bg-gray-100 flex items-center justify-center"
              >
                <ChevronRight size={15} strokeWidth={2} className="text-gray-600" />
              </button>
            </div>
          )}
        </div>
      </header>

      {/* İçerik */}
      <div style={{ paddingTop: gorunum === 'liste' ? 132 : 120, paddingBottom: 96 }}>

        {/* ── LİSTE GÖRÜNÜMÜ ── */}
        {gorunum === 'liste' && (
          <div className="px-4">
            {filtrelenmis.length === 0 ? (
              <div className="flex flex-col items-center pt-16 text-center">
                <div className="text-4xl mb-3">📭</div>
                <p className="text-gray-400 text-sm">Bu kategoride rezervasyon yok.</p>
              </div>
            ) : (
              <div className="flex flex-col gap-3 pt-3">
                {filtrelenmis.map(r => {
                  const ds = DURUM_STYLE[r.durum]
                  return (
                    <div key={r.id} className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <p className="text-gray-800 text-sm font-bold">{r.musteri}</p>
                          {r.not && <p className="text-gray-400 text-xs mt-0.5 italic">"{r.not}"</p>}
                        </div>
                        <span className="text-[10px] font-bold px-2.5 py-1 rounded-full" style={{ background: ds.bg, color: ds.color }}>
                          {ds.label}
                        </span>
                      </div>
                      <div className="flex gap-4 text-xs text-gray-500">
                        <span className="flex items-center gap-1"><Calendar size={11} strokeWidth={1.5} />{r.tarih}</span>
                        <span className="flex items-center gap-1"><Clock size={11} strokeWidth={1.5} />{r.saat}</span>
                        <span className="flex items-center gap-1"><Users size={11} strokeWidth={1.5} />{r.kisi} kişi</span>
                      </div>
                      {r.durum === 'bekliyor' && (
                        <div className="flex gap-2 mt-3">
                          <button
                            onClick={() => durumGuncelle(r.id, 'onaylandi')}
                            className="flex-1 flex items-center justify-center gap-1.5 bg-green-50 border border-green-200 text-green-700 text-xs font-bold py-2.5 rounded-xl active:scale-95 transition-transform"
                          >
                            <CheckCircle2 size={14} strokeWidth={2} /> Onayla
                          </button>
                          <button
                            onClick={() => durumGuncelle(r.id, 'tamamlandi')}
                            className="flex-1 flex items-center justify-center gap-1.5 bg-red-50 border border-red-200 text-red-600 text-xs font-bold py-2.5 rounded-xl active:scale-95 transition-transform"
                          >
                            <XCircle size={14} strokeWidth={2} /> Reddet
                          </button>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )}

        {/* ── TAKVİM GÖRÜNÜMÜ ── */}
        {gorunum === 'takvim' && (
          <div className="px-4 pt-3">
            {/* Gün başlıkları */}
            <div style={{ display: 'flex', marginBottom: 4 }}>
              {GUN_K.map(g => (
                <div key={g} style={{ width: 'calc(100%/7)', textAlign: 'center', fontSize: 10, fontWeight: 600, color: '#9ca3af', paddingBottom: 4 }}>{g}</div>
              ))}
            </div>

            {/* Günler grid */}
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
              {/* Boşluk */}
              {Array.from({ length: baslangicGunu }).map((_, i) => (
                <div key={`bos-${i}`} style={{ width: 'calc(100%/7)', height: 60 }} />
              ))}

              {Array.from({ length: gunSayisi }).map((_, i) => {
                const gun = i + 1
                const rezler = gunRezervasyonlar(gun)
                const bugun  = new Date()
                const bugunMu = gun === bugun.getDate() && ay === bugun.getMonth() && yil === bugun.getFullYear()

                return (
                  <div key={gun} style={{ width: 'calc(100%/7)', height: 60, padding: 2 }}>
                    <div style={{
                      width: '100%', height: '100%',
                      borderRadius: 10,
                      background: bugunMu ? '#111827' : rezler.length > 0 ? '#f0fdf4' : '#ffffff',
                      border: rezler.length > 0 && !bugunMu ? '1px solid #bbf7d0' : bugunMu ? 'none' : '1px solid #f3f4f6',
                      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                      gap: 2,
                    }}>
                      <span style={{ fontSize: 12, fontWeight: bugunMu || rezler.length > 0 ? 700 : 400, color: bugunMu ? '#fff' : '#1f2937' }}>
                        {gun}
                      </span>
                      {rezler.length > 0 && (
                        <span style={{
                          fontSize: 9, fontWeight: 700,
                          background: bugunMu ? '#fff' : '#16a34a',
                          color: bugunMu ? '#111827' : '#fff',
                          borderRadius: 20, paddingLeft: 5, paddingRight: 5, paddingTop: 1, paddingBottom: 1,
                        }}>
                          {rezler.length}
                        </span>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>

            {/* O aya ait tüm rezervasyonlar */}
            <div className="mt-4 flex flex-col gap-2.5">
              <p className="text-gray-500 text-xs font-semibold">{AYLAR_TR[ay]} AYI REZERVASYONLARı</p>
              {liste.filter(r => tarihAy(r.tarih) === ay && tarihYil(r.tarih) === yil).length === 0 ? (
                <p className="text-gray-400 text-sm text-center py-6">Bu ayda rezervasyon yok.</p>
              ) : (
                liste.filter(r => tarihAy(r.tarih) === ay && tarihYil(r.tarih) === yil)
                  .sort((a, b) => tarihGun(a.tarih) - tarihGun(b.tarih))
                  .map(r => {
                    const ds = DURUM_STYLE[r.durum]
                    return (
                      <div key={r.id} className="bg-white border border-gray-100 rounded-2xl px-4 py-3 shadow-sm flex items-center gap-3">
                        <div style={{ width: 40, height: 40, borderRadius: 10, background: '#f9fafb', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                          <span style={{ fontSize: 14, fontWeight: 800, color: '#111827', lineHeight: 1 }}>{tarihGun(r.tarih)}</span>
                          <span style={{ fontSize: 9, color: '#9ca3af' }}>{AYLAR_TR[ay].slice(0,3)}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-gray-800 text-sm font-bold">{r.musteri}</p>
                          <p className="text-gray-400 text-xs">{r.saat} · {r.kisi} kişi</p>
                        </div>
                        <span className="text-[10px] font-bold px-2.5 py-1 rounded-full" style={{ background: ds.bg, color: ds.color }}>
                          {ds.label}
                        </span>
                      </div>
                    )
                  })
              )}
            </div>
          </div>
        )}
      </div>

      <IsletmeNav active="rezervasyonlar" />

      {/* ── YENİ REZERVASYON SHEET ── */}
      {yeniSheet && (
        <div className="fixed inset-0 z-[100] flex flex-col justify-end">
          <div className="absolute inset-0 bg-black/40" onClick={() => setYeniSheet(false)} />
          <div className="relative bg-white rounded-t-3xl px-5 pt-5 pb-10 z-10 flex flex-col gap-4">
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-gray-900 text-base font-bold">Yeni Rezervasyon</h3>
              <button onClick={() => setYeniSheet(false)} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                <X size={16} strokeWidth={2} className="text-gray-600" />
              </button>
            </div>

            <div>
              <label className="text-gray-500 text-xs font-semibold block mb-1.5">Müşteri Adı</label>
              <input
                value={yeniMusteri}
                onChange={e => setYeniMusteri(e.target.value)}
                placeholder="Ad Soyad"
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-3 text-sm text-gray-800 outline-none"
              />
            </div>

            <div className="flex gap-3">
              <div className="flex-1">
                <label className="text-gray-500 text-xs font-semibold block mb-1.5">Tarih</label>
                <input
                  type="date"
                  value={yeniTarih}
                  onChange={e => setYeniTarih(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-3 text-sm text-gray-800 outline-none"
                />
              </div>
              <div className="flex-1">
                <label className="text-gray-500 text-xs font-semibold block mb-1.5">Saat</label>
                <input
                  type="time"
                  value={yeniSaat}
                  onChange={e => setYeniSaat(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-3 text-sm text-gray-800 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-gray-500 text-xs font-semibold block mb-1.5">Kişi Sayısı</label>
              <div className="flex items-center gap-4">
                <button onClick={() => setYeniKisi(k => Math.max(1, k - 1))} className="w-9 h-9 rounded-xl bg-gray-100 text-gray-700 text-lg font-bold flex items-center justify-center">−</button>
                <span className="text-gray-900 text-lg font-extrabold flex-1 text-center">{yeniKisi}</span>
                <button onClick={() => setYeniKisi(k => Math.min(20, k + 1))} className="w-9 h-9 rounded-xl bg-gray-900 text-white text-lg font-bold flex items-center justify-center">+</button>
              </div>
            </div>

            <div>
              <label className="text-gray-500 text-xs font-semibold block mb-1.5">Not (isteğe bağlı)</label>
              <input
                value={yeniNot}
                onChange={e => setYeniNot(e.target.value)}
                placeholder="Özel istek..."
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-3 text-sm text-gray-800 outline-none"
              />
            </div>

            <button
              onClick={rezervasyonEkle}
              disabled={!yeniMusteri || !yeniTarih || !yeniSaat}
              className="w-full bg-gray-900 text-white font-bold text-sm py-4 rounded-2xl active:scale-95 transition-transform disabled:opacity-30"
            >
              Rezervasyon Oluştur
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
