import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Calendar, Clock, Users, CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react'
import { RESTAURANTS } from '../data/mockFood'

const SAAT_DILIMLERI = [
  '12:00','12:30','13:00','13:30','14:00',
  '18:00','18:30','19:00','19:30','20:00','20:30','21:00','21:30','22:00',
]

const AYLAR_TR = ['Ocak','Şubat','Mart','Nisan','Mayıs','Haziran','Temmuz','Ağustos','Eylül','Ekim','Kasım','Aralık']
const GUN_BASLIKLARI = ['Pt','Sa','Çr','Pe','Cu','Ct','Pz']

function gunEsit(a, b) {
  return a.getFullYear() === b.getFullYear() &&
         a.getMonth()    === b.getMonth()    &&
         a.getDate()     === b.getDate()
}

function MiniCalendar({ secilenTarih, onChange }) {
  const bugun = new Date()
  bugun.setHours(0, 0, 0, 0)

  const [gorulenAy, setGorulenAy] = useState(new Date(bugun))

  const ayBaslangic = new Date(gorulenAy.getFullYear(), gorulenAy.getMonth(), 1)
  const ayBitis     = new Date(gorulenAy.getFullYear(), gorulenAy.getMonth() + 1, 0)
  const baslangicGunu = (ayBaslangic.getDay() + 6) % 7 // Pt=0 bazlı

  const gunler = []
  for (let i = 1; i <= ayBitis.getDate(); i++) {
    gunler.push(new Date(gorulenAy.getFullYear(), gorulenAy.getMonth(), i))
  }

  function oncekiAy() {
    setGorulenAy(new Date(gorulenAy.getFullYear(), gorulenAy.getMonth() - 1, 1))
  }
  function sonrakiAy() {
    setGorulenAy(new Date(gorulenAy.getFullYear(), gorulenAy.getMonth() + 1, 1))
  }

  const oncekiAyGoster = ayBaslangic > bugun

  const cellW = 'calc(100% / 7)'

  return (
    <div style={{ width: '100%' }}>
      {/* Ay navigasyonu */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
        <button
          onClick={oncekiAy}
          disabled={!oncekiAyGoster}
          style={{ width: 32, height: 32, borderRadius: 10, background: '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: oncekiAyGoster ? 1 : 0.3 }}
        >
          <ChevronLeft size={16} strokeWidth={2} color="#4b5563" />
        </button>
        <span style={{ fontSize: 14, fontWeight: 700, color: '#1f2937' }}>
          {AYLAR_TR[gorulenAy.getMonth()]} {gorulenAy.getFullYear()}
        </span>
        <button
          onClick={sonrakiAy}
          style={{ width: 32, height: 32, borderRadius: 10, background: '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <ChevronRight size={16} strokeWidth={2} color="#4b5563" />
        </button>
      </div>

      {/* Gün başlıkları */}
      <div style={{ display: 'flex', marginBottom: 4 }}>
        {GUN_BASLIKLARI.map(g => (
          <div key={g} style={{ width: cellW, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 600, color: '#9ca3af' }}>{g}</div>
        ))}
      </div>

      {/* Günler */}
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {Array.from({ length: baslangicGunu }).map((_, i) => (
          <div key={`bos-${i}`} style={{ width: cellW, height: 36 }} />
        ))}
        {gunler.map(gun => {
          const gecmis  = gun < bugun
          const secili  = secilenTarih && gunEsit(gun, secilenTarih)
          const bugunMu = gunEsit(gun, bugun)
          return (
            <div key={gun.getDate()} style={{ width: cellW, height: 36, padding: '2px' }}>
              <button
                onClick={() => !gecmis && onChange(gun)}
                disabled={gecmis}
                style={{
                  width: '100%', height: '100%',
                  borderRadius: 9,
                  background: secili ? '#111827' : 'transparent',
                  color:      secili ? '#fff' : gecmis ? '#d1d5db' : '#1f2937',
                  border:     bugunMu && !secili ? '1.5px solid #d1d5db' : 'none',
                  fontSize: 13,
                  fontWeight: secili ? 700 : 400,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: gecmis ? 'default' : 'pointer',
                }}
              >
                {gun.getDate()}
              </button>
            </div>
          )
        })}
      </div>

      {/* Seçilen tarih */}
      {secilenTarih && (
        <p style={{ textAlign: 'center', fontSize: 11, color: '#9ca3af', marginTop: 10 }}>
          {secilenTarih.toLocaleDateString('tr-TR', { weekday: 'long', day: 'numeric', month: 'long' })}
        </p>
      )}
    </div>
  )
}

export default function RezervasyonForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const restaurant = RESTAURANTS.find(r => r.id === parseInt(id))

  const bugun = new Date()
  bugun.setHours(0, 0, 0, 0)

  const [secilenTarih, setSecilenTarih] = useState(bugun)
  const [secilenSaat,  setSecilenSaat]  = useState(null)
  const [kisi,         setKisi]         = useState(2)
  const [not,          setNot]          = useState('')
  const [basarili,     setBasarili]     = useState(false)

  if (!restaurant) return null

  const tarihLabel = secilenTarih
    ? secilenTarih.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', weekday: 'long' })
    : ''

  function handleSubmit() {
    if (!secilenSaat) return
    const rez = {
      id: Date.now(),
      restaurantId: restaurant.id,
      restaurantName: restaurant.name,
      restaurantLogo: '🍽️',
      tarih: tarihLabel,
      saat: secilenSaat,
      kisiSayisi: kisi,
      not,
      durum: 'Bekliyor',
    }
    const existing = JSON.parse(localStorage.getItem('sehir_rezervasyonlar') || '[]')
    localStorage.setItem('sehir_rezervasyonlar', JSON.stringify([rez, ...existing]))
    setBasarili(true)
  }

  if (basarili) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
      <div className="text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle size={40} className="text-green-500" />
        </div>
        <h1 className="text-gray-900 text-xl font-bold">Rezervasyon Alındı!</h1>
        <p className="text-gray-500 text-sm mt-2 leading-relaxed">
          {restaurant.name} için {tarihLabel} saat {secilenSaat}, {kisi} kişilik rezervasyonunuz alındı.
        </p>
        <p className="text-gray-400 text-xs mt-1">Onay için sizi arayabiliriz.</p>
        <button
          onClick={() => navigate('/rezervasyonlarim')}
          className="mt-6 w-full bg-gray-900 text-white font-semibold text-sm py-4 rounded-2xl active:scale-95 transition-transform"
        >
          Rezervasyonlarıma Git
        </button>
        <button
          onClick={() => navigate(-2)}
          className="mt-2 w-full border border-gray-200 text-gray-700 font-semibold text-sm py-4 rounded-2xl active:scale-95 transition-transform"
        >
          Restorana Dön
        </button>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center">
        <div className="w-full max-w-[430px] bg-white/80 backdrop-blur-md border-b border-gray-100 px-4 h-[60px] flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="text-gray-500">
            <ArrowLeft size={20} strokeWidth={1.5} />
          </button>
          <div>
            <h1 className="text-gray-800 text-sm font-bold leading-tight">Rezervasyon</h1>
            <p className="text-gray-400 text-xs">{restaurant.name}</p>
          </div>
        </div>
      </header>

      <div className="pt-[60px] pb-28 px-4 space-y-4">

        {/* Takvim */}
        <div className="bg-white border border-gray-100 rounded-2xl px-4 py-4 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Calendar size={15} strokeWidth={1.5} className="text-gray-400" />
            <p className="text-gray-800 text-sm font-bold">Tarih Seç</p>
          </div>
          <MiniCalendar secilenTarih={secilenTarih} onChange={setSecilenTarih} />
        </div>

        {/* Saat Seç */}
        <div className="bg-white border border-gray-100 rounded-2xl px-4 py-4 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <Clock size={15} strokeWidth={1.5} className="text-gray-400" />
            <p className="text-gray-800 text-sm font-bold">Saat Seç</p>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {SAAT_DILIMLERI.map(s => (
              <button
                key={s}
                onClick={() => setSecilenSaat(s)}
                className={`py-2 rounded-xl text-xs font-semibold transition-all ${
                  secilenSaat === s
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-50 border border-gray-200 text-gray-600'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Kişi Sayısı */}
        <div className="bg-white border border-gray-100 rounded-2xl px-4 py-4 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <Users size={15} strokeWidth={1.5} className="text-gray-400" />
            <p className="text-gray-800 text-sm font-bold">Kişi Sayısı</p>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setKisi(k => Math.max(1, k - 1))}
              className="w-10 h-10 rounded-xl bg-gray-100 text-gray-700 text-xl font-bold flex items-center justify-center active:scale-90 transition-transform"
            >
              −
            </button>
            <span className="text-gray-900 text-2xl font-extrabold flex-1 text-center">{kisi}</span>
            <button
              onClick={() => setKisi(k => Math.min(20, k + 1))}
              className="w-10 h-10 rounded-xl bg-gray-900 text-white text-xl font-bold flex items-center justify-center active:scale-90 transition-transform"
            >
              +
            </button>
          </div>
        </div>

        {/* Not */}
        <div className="bg-white border border-gray-100 rounded-2xl px-4 py-4 shadow-sm">
          <p className="text-gray-800 text-sm font-bold mb-2">Not (isteğe bağlı)</p>
          <textarea
            value={not}
            onChange={e => setNot(e.target.value)}
            placeholder="Özel isteklerinizi belirtin (allerji, masa tercihi...)"
            rows={3}
            className="w-full text-sm text-gray-700 placeholder-gray-300 resize-none outline-none leading-relaxed"
          />
        </div>

      </div>

      {/* Alt buton */}
      <div className="fixed bottom-0 left-0 right-0 z-40 flex justify-center">
        <div className="w-full max-w-[430px] bg-white border-t border-gray-100 px-4 py-3">
          <button
            onClick={handleSubmit}
            disabled={!secilenSaat}
            className={`w-full text-white font-bold text-sm py-4 rounded-2xl active:scale-95 transition-all ${
              secilenSaat ? 'bg-gray-900' : 'bg-gray-300'
            }`}
          >
            {secilenSaat
              ? `Rezervasyon Yap — ${tarihLabel}, ${secilenSaat}, ${kisi} Kişi`
              : 'Saat Seçiniz'}
          </button>
        </div>
      </div>

    </div>
  )
}
