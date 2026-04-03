import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Calendar, Users, ChevronRight } from 'lucide-react'
import { TEKLIFLER } from '../data/mockMesajlar'

const DURUM_STYLE = {
  'Teklif Verildi': 'bg-blue-50 text-blue-600',
  'Bekliyor':       'bg-yellow-50 text-yellow-600',
  'Onaylandı':      'bg-green-50 text-green-600',
  'Reddedildi':     'bg-red-50 text-red-500',
}

export default function TekliflerPage() {
  const navigate = useNavigate()

  const localRaw = localStorage.getItem('sehir_teklifler')
  const localTkf = localRaw ? JSON.parse(localRaw) : []
  const tumu = [...localTkf, ...TEKLIFLER]

  return (
    <div className="min-h-screen bg-gray-50">

      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center">
        <div className="w-full max-w-[430px] bg-white/80 backdrop-blur-md border-b border-gray-100 px-4 py-3 flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="text-gray-500">
            <ArrowLeft size={20} strokeWidth={1.5} />
          </button>
          <h1 className="text-gray-800 text-base font-bold flex-1">Tekliflerim</h1>
        </div>
      </header>

      <div className="pt-[70px] pb-8 px-4 space-y-3">

        {tumu.length === 0 ? (
          <div className="text-center py-16 text-gray-400 text-sm flex flex-col items-center gap-3">
            <span className="text-5xl">📋</span>
            Henüz teklif yok
            <button
              onClick={() => navigate('/services')}
              className="mt-2 px-4 py-2 bg-gray-900 text-white text-xs font-semibold rounded-xl"
            >
              Hizmetlere Git
            </button>
          </div>
        ) : tumu.map((t, i) => (
          <div key={t.id ?? i} className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">

            <div className="flex items-center gap-3 mb-3">
              <div className="w-11 h-11 bg-gray-100 rounded-2xl flex items-center justify-center text-2xl shrink-0">
                {t.serviceLogo}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-gray-800 text-sm font-bold">{t.serviceName}</p>
                <p className="text-gray-400 text-xs">{t.etkinlik}</p>
              </div>
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-lg shrink-0 ${DURUM_STYLE[t.durum] || 'bg-gray-100 text-gray-500'}`}>
                {t.durum}
              </span>
            </div>

            <div className="flex items-center gap-4 mb-2 flex-wrap">
              {t.tarih && (
                <div className="flex items-center gap-1.5">
                  <Calendar size={12} strokeWidth={1.5} className="text-gray-400" />
                  <span className="text-gray-600 text-xs">{t.tarih}</span>
                </div>
              )}
              {t.kisiSayisi && (
                <div className="flex items-center gap-1.5">
                  <Users size={12} strokeWidth={1.5} className="text-gray-400" />
                  <span className="text-gray-600 text-xs">{t.kisiSayisi} kişi</span>
                </div>
              )}
              {t.butce && (
                <span className="text-gray-500 text-xs">Bütçe: {t.butce}</span>
              )}
            </div>

            {/* Teklif tutarı varsa */}
            {t.teklifTutari && (
              <div className="bg-blue-50 border border-blue-100 rounded-xl px-3 py-2.5 mt-2">
                <p className="text-blue-400 text-xs mb-0.5">Gelen Teklif</p>
                <p className="text-blue-700 text-lg font-extrabold">{t.teklifTutari}</p>
                {t.aciklama && <p className="text-blue-500 text-xs mt-0.5 leading-snug">{t.aciklama}</p>}
                {t.sonTarih && <p className="text-blue-400 text-xs mt-1">Son Kabul: {t.sonTarih}</p>}
                <div className="flex gap-2 mt-3">
                  <button className="flex-1 bg-blue-600 text-white text-xs font-bold py-2 rounded-xl active:scale-95 transition-transform">
                    Kabul Et
                  </button>
                  <button className="flex-1 border border-blue-200 text-blue-600 text-xs font-bold py-2 rounded-xl active:scale-95 transition-transform">
                    Müzakere Et
                  </button>
                </div>
              </div>
            )}

            {!t.teklifTutari && (
              <p className="text-gray-400 text-xs italic">{t.aciklama}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
