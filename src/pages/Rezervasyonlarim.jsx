import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Calendar, Clock, Users, ChevronRight } from 'lucide-react'
import { REZERVASYONLAR } from '../data/mockMesajlar'

const DURUM_STYLE = {
  'Onaylandı':  'bg-green-50 text-green-600',
  'Bekliyor':   'bg-yellow-50 text-yellow-600',
  'Tamamlandı': 'bg-gray-100 text-gray-500',
  'İptal':      'bg-red-50 text-red-500',
}

export default function Rezervasyonlarim() {
  const navigate = useNavigate()

  const localRaw = localStorage.getItem('sehir_rezervasyonlar')
  const localRez = localRaw ? JSON.parse(localRaw) : []
  const tumu = [...localRez, ...REZERVASYONLAR]

  return (
    <div className="min-h-screen bg-gray-50">

      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center">
        <div className="w-full max-w-[430px] bg-white/80 backdrop-blur-md border-b border-gray-100 px-4 py-3 flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="text-gray-500">
            <ArrowLeft size={20} strokeWidth={1.5} />
          </button>
          <h1 className="text-gray-800 text-base font-bold flex-1">Rezervasyonlarım</h1>
        </div>
      </header>

      <div className="pt-14 pb-8 px-4 space-y-3 pt-[70px]">

        {tumu.length === 0 ? (
          <div className="text-center py-16 text-gray-400 text-sm flex flex-col items-center gap-3">
            <span className="text-5xl">📅</span>
            Henüz rezervasyon yok
            <button
              onClick={() => navigate('/food')}
              className="mt-2 px-4 py-2 bg-gray-900 text-white text-xs font-semibold rounded-xl"
            >
              Restoran Keşfet
            </button>
          </div>
        ) : tumu.map((r, i) => (
          <div key={r.id ?? i} className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">
            <div className="flex items-start justify-between gap-2 mb-3">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 bg-gray-100 rounded-2xl flex items-center justify-center text-2xl shrink-0">
                  {r.restaurantLogo}
                </div>
                <div>
                  <p className="text-gray-800 text-sm font-bold">{r.restaurantName}</p>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-lg ${DURUM_STYLE[r.durum] || 'bg-gray-100 text-gray-500'}`}>
                    {r.durum}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-1.5">
                <Calendar size={12} strokeWidth={1.5} className="text-gray-400" />
                <span className="text-gray-600 text-xs">{r.tarih}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock size={12} strokeWidth={1.5} className="text-gray-400" />
                <span className="text-gray-600 text-xs">{r.saat}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Users size={12} strokeWidth={1.5} className="text-gray-400" />
                <span className="text-gray-600 text-xs">{r.kisiSayisi} kişi</span>
              </div>
            </div>

            {r.not ? (
              <p className="text-gray-400 text-xs mt-2 italic">"{r.not}"</p>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  )
}
