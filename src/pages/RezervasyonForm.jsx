import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Calendar, Clock, Users, CheckCircle } from 'lucide-react'
import { RESTAURANTS } from '../data/mockFood'

const SAAT_DILIMLERI = [
  '12:00','12:30','13:00','13:30','14:00',
  '18:00','18:30','19:00','19:30','20:00','20:30','21:00','21:30','22:00',
]

function tarihEkle(gun) {
  const d = new Date()
  d.setDate(d.getDate() + gun)
  return d.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', weekday: 'long' })
}

export default function RezervasyonForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const restaurant = RESTAURANTS.find(r => r.id === parseInt(id))

  const [secilenGun,  setSecilenGun]  = useState(0)
  const [secilenSaat, setSecilenSaat] = useState(null)
  const [kisi,        setKisi]        = useState(2)
  const [not,         setNot]         = useState('')
  const [basarili,    setBasarili]    = useState(false)

  if (!restaurant) return null

  const GUNLER = [
    { label: 'Bugün',      tarih: tarihEkle(0), gun: 0 },
    { label: 'Yarın',      tarih: tarihEkle(1), gun: 1 },
    { label: 'Öbür Gün',  tarih: tarihEkle(2), gun: 2 },
  ]

  function handleSubmit() {
    if (!secilenSaat) return
    const rez = {
      id: Date.now(),
      restaurantId: restaurant.id,
      restaurantName: restaurant.name,
      restaurantLogo: '🍽️',
      tarih: GUNLER[secilenGun].tarih,
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
          {restaurant.name} için {GUNLER[secilenGun].tarih} saat {secilenSaat}
          {'\n'}{kisi} kişilik rezervasyonunuz alındı.
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
        <div className="w-full max-w-[430px] bg-white/80 backdrop-blur-md border-b border-gray-100 px-4 py-3 flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="text-gray-500">
            <ArrowLeft size={20} strokeWidth={1.5} />
          </button>
          <div>
            <h1 className="text-gray-800 text-sm font-bold leading-tight">Rezervasyon</h1>
            <p className="text-gray-400 text-xs">{restaurant.name}</p>
          </div>
        </div>
      </header>

      <div className="pt-16 pb-28 px-4 space-y-4">

        {/* Tarih Seç */}
        <div className="bg-white border border-gray-100 rounded-2xl px-4 py-4 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <Calendar size={15} strokeWidth={1.5} className="text-gray-400" />
            <p className="text-gray-800 text-sm font-bold">Tarih Seç</p>
          </div>
          <div className="flex gap-2">
            {GUNLER.map((g, i) => (
              <button
                key={i}
                onClick={() => setSecilenGun(i)}
                className={`flex-1 py-3 rounded-xl text-center transition-all ${
                  secilenGun === i
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-50 border border-gray-200 text-gray-600'
                }`}
              >
                <p className="text-xs font-bold">{g.label}</p>
                <p className={`text-xs mt-0.5 ${secilenGun === i ? 'text-white/70' : 'text-gray-400'}`}>
                  {new Date(Date.now() + i * 86400000).toLocaleDateString('tr-TR', { day: 'numeric', month: 'short' })}
                </p>
              </button>
            ))}
          </div>
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
              ? `Rezervasyon Yap — ${GUNLER[secilenGun].label}, ${secilenSaat}, ${kisi} Kişi`
              : 'Saat Seçiniz'}
          </button>
        </div>
      </div>

    </div>
  )
}
