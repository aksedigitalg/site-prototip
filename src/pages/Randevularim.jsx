import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Calendar, Clock } from 'lucide-react'
import { RANDEVULAR } from '../data/mockMesajlar'

const DURUM_STYLE = {
  'Onaylandı':  'bg-green-50 text-green-600',
  'Bekliyor':   'bg-yellow-50 text-yellow-600',
  'Tamamlandı': 'bg-gray-100 text-gray-500',
  'İptal':      'bg-red-50 text-red-500',
}

export default function Randevularim() {
  const navigate = useNavigate()

  const localRaw = localStorage.getItem('sehir_randevular')
  const localRnv = localRaw ? JSON.parse(localRaw) : []
  const tumu = [...localRnv, ...RANDEVULAR]

  return (
    <div className="min-h-screen bg-gray-50">

      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center">
        <div className="w-full max-w-[430px] bg-white/80 backdrop-blur-md border-b border-gray-100 px-4 py-3 flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="text-gray-500">
            <ArrowLeft size={20} strokeWidth={1.5} />
          </button>
          <h1 className="text-gray-800 text-base font-bold flex-1">Randevularım</h1>
        </div>
      </header>

      <div className="pt-[70px] pb-8 px-4 space-y-3">

        {tumu.length === 0 ? (
          <div className="text-center py-16 text-gray-400 text-sm flex flex-col items-center gap-3">
            <span className="text-5xl">🕐</span>
            Henüz randevu yok
            <button
              onClick={() => navigate('/services')}
              className="mt-2 px-4 py-2 bg-gray-900 text-white text-xs font-semibold rounded-xl"
            >
              Hizmetlere Git
            </button>
          </div>
        ) : tumu.map((r, i) => (
          <div key={r.id ?? i} className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-11 h-11 bg-gray-100 rounded-2xl flex items-center justify-center text-2xl shrink-0">
                {r.serviceLogo}
              </div>
              <div className="flex-1">
                <p className="text-gray-800 text-sm font-bold">{r.serviceName}</p>
                <p className="text-gray-400 text-xs">{r.altKategori}</p>
              </div>
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-lg shrink-0 ${DURUM_STYLE[r.durum] || 'bg-gray-100 text-gray-500'}`}>
                {r.durum}
              </span>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <Calendar size={12} strokeWidth={1.5} className="text-gray-400" />
                <span className="text-gray-600 text-xs">{r.tarih}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock size={12} strokeWidth={1.5} className="text-gray-400" />
                <span className="text-gray-600 text-xs">{r.saat}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
