import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, Clock } from 'lucide-react'
import { KAMPANYALAR, KAMPANYA_KATEGORILER } from '../data/mockCampaigns'

export default function Campaigns() {
  const navigate = useNavigate()
  const [aktif, setAktif] = useState('Tümü')

  const liste = aktif === 'Tümü' ? KAMPANYALAR : KAMPANYALAR.filter(k => k.kategori === aktif)

  const buyuk = liste[0]
  const kucukler = liste.slice(1)

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ── Header ── */}
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center">
        <div className="w-full max-w-[430px] bg-white/80 backdrop-blur-md border-b border-gray-100 px-4 pt-12 pb-3">
          <h1 className="text-gray-900 text-lg font-bold mb-3">Kampanyalar</h1>
          <div className="flex gap-2 overflow-x-auto pb-0.5" style={{ scrollbarWidth: 'none' }}>
            {KAMPANYA_KATEGORILER.map(k => (
              <button
                key={k}
                onClick={() => setAktif(k)}
                className="shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors"
                style={{
                  background: aktif === k ? '#111827' : '#f3f4f6',
                  color:      aktif === k ? 'white'   : '#6b7280',
                }}
              >
                {k}
              </button>
            ))}
          </div>
        </div>
      </header>

      <div className="pt-[116px] pb-24 px-4">

        {liste.length === 0 ? (
          <div className="flex flex-col items-center justify-center pt-20 text-center">
            <div className="text-5xl mb-4">🎁</div>
            <p className="text-gray-500 text-sm">Bu kategoride kampanya yok.</p>
          </div>
        ) : (
          <>
            {/* ── Büyük kampanya kartı ── */}
            {buyuk && (
              <button
                onClick={() => navigate(buyuk.path)}
                className="w-full text-left rounded-2xl overflow-hidden shadow-sm mb-4 active:scale-[0.98] transition-transform"
                style={{ background: buyuk.bg }}
              >
                <div className="px-5 pt-5 pb-6">
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-4xl">{buyuk.emoji}</span>
                    <span
                      className="text-lg font-extrabold px-3 py-1 rounded-full"
                      style={{ background: buyuk.accent + '33', color: buyuk.accent }}
                    >
                      {buyuk.indirim}
                    </span>
                  </div>
                  <p className="text-white/60 text-xs font-semibold mb-1">{buyuk.isletme}</p>
                  <p className="text-white text-xl font-extrabold leading-snug mb-3">{buyuk.baslik}</p>
                  <p className="text-white/50 text-xs mb-4">{buyuk.aciklama}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-white/50 text-xs">
                      <Clock size={12} strokeWidth={1.5} />
                      <span>{buyuk.kalanGun} gün kaldı</span>
                    </div>
                    <div
                      className="flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-full"
                      style={{ background: buyuk.accent, color: '#fff' }}
                    >
                      Fırsatı Yakala <ArrowRight size={12} strokeWidth={2.5} />
                    </div>
                  </div>
                </div>
              </button>
            )}

            {/* ── Küçük kampanya listesi ── */}
            <div className="flex flex-col gap-3">
              {kucukler.map(k => (
                <button
                  key={k.id}
                  onClick={() => navigate(k.path)}
                  className="flex items-center gap-4 bg-white border border-gray-100 rounded-2xl px-4 py-3.5 shadow-sm active:scale-[0.98] transition-transform"
                >
                  {/* Sol renk bloğu */}
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0"
                    style={{ background: k.bg }}
                  >
                    {k.emoji}
                  </div>

                  <div className="flex-1 text-left min-w-0">
                    <p className="text-gray-400 text-[10px] font-semibold">{k.isletme}</p>
                    <p className="text-gray-800 text-sm font-bold leading-snug truncate">{k.baslik}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Clock size={11} strokeWidth={1.5} className="text-gray-300" />
                      <span className="text-gray-400 text-[10px]">{k.kalanGun} gün kaldı</span>
                    </div>
                  </div>

                  <span
                    className="shrink-0 text-sm font-extrabold px-2.5 py-1 rounded-xl"
                    style={{ background: k.bg + '22', color: k.accent === '#ffffff' ? '#374151' : k.accent }}
                  >
                    {k.indirim}
                  </span>
                </button>
              ))}
            </div>
          </>
        )}

      </div>

    </div>
  )
}
