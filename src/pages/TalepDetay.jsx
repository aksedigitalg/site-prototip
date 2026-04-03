import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, MapPin, Clock, Star, MessageCircle, ChevronRight } from 'lucide-react'
import { TALEPLER, TALEP_TEKLIFLERI } from '../data/mockTalep'

export default function TalepDetay() {
  const { id }   = useParams()
  const navigate = useNavigate()
  const talep    = TALEPLER.find(t => t.id === Number(id))
  const teklifler = TALEP_TEKLIFLERI[Number(id)] || []

  if (!talep) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-400">Talep bulunamadı.</p>
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
          <span className="text-gray-900 text-base font-bold flex-1 truncate">{talep.baslik}</span>
        </div>
      </header>

      <div className="pt-16 pb-10">

        {/* Talep kartı */}
        <div className="mx-4 mt-4 bg-white border border-gray-100 rounded-2xl p-4">
          <div className="flex items-start gap-3 mb-3">
            <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-2xl shrink-0">
              {talep.emoji}
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wide">{talep.kategori}</span>
              <h2 className="text-gray-900 text-base font-bold leading-snug mt-0.5">{talep.baslik}</h2>
            </div>
          </div>

          <p className="text-gray-600 text-sm leading-relaxed mb-4">{talep.aciklama}</p>

          <div className="flex flex-wrap gap-2 mb-3">
            <div className="flex items-center gap-1 text-gray-500 text-xs">
              <MapPin size={11} strokeWidth={1.5} />
              <span>{talep.konum}</span>
            </div>
            <div className="flex items-center gap-1 text-gray-500 text-xs">
              <Clock size={11} strokeWidth={1.5} />
              <span>{talep.sure}</span>
            </div>
          </div>

          {talep.butce && (
            <div className="bg-gray-50 rounded-xl px-3 py-2 inline-flex items-center gap-1.5">
              <span className="text-gray-500 text-xs">Bütçe:</span>
              <span className="text-gray-900 text-xs font-bold">{talep.butce}</span>
            </div>
          )}
        </div>

        {/* Teklifler */}
        <div className="mx-4 mt-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-gray-900 text-sm font-bold">
              Teklifler
              <span className="ml-2 text-[11px] font-semibold text-gray-400">({teklifler.length})</span>
            </h3>
          </div>

          {teklifler.length === 0 ? (
            <div className="bg-white border border-gray-100 rounded-2xl p-6 text-center">
              <p className="text-gray-400 text-sm">Henüz teklif yok. Ustalar hazırlıyor...</p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {teklifler.map((t, i) => (
                <div key={t.id} className="bg-white border border-gray-100 rounded-2xl p-4">
                  {/* Usta bilgisi */}
                  <div className="flex items-start gap-3 mb-3">
                    <div
                      className="w-11 h-11 rounded-2xl flex items-center justify-center text-white text-sm font-bold shrink-0"
                      style={{ background: ['#111827', '#7c3aed', '#0f766e', '#b45309'][i % 4] }}
                    >
                      {t.usta[0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-gray-900 text-sm font-bold">{t.usta}</p>
                      <p className="text-gray-500 text-xs">{t.meslek}</p>
                      <div className="flex items-center gap-1 mt-0.5">
                        <Star size={10} fill="#eab308" strokeWidth={0} className="text-yellow-400" />
                        <span className="text-yellow-600 text-xs font-bold">{t.puan}</span>
                        <span className="text-gray-400 text-xs">({t.yorumSayisi} yorum)</span>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-gray-900 text-base font-extrabold">₺{t.fiyat}</p>
                      <p className="text-gray-400 text-xs">{t.sure}</p>
                    </div>
                  </div>

                  <p className="text-gray-600 text-xs leading-relaxed mb-3">{t.aciklama}</p>

                  <button className="w-full py-3 rounded-xl bg-gray-900 text-white text-xs font-bold flex items-center justify-center gap-1.5 active:scale-95 transition-transform">
                    <MessageCircle size={13} strokeWidth={2} />
                    Teklifi Kabul Et & Mesaj Gönder
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  )
}
