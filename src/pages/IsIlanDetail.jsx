import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  ArrowLeft, MapPin, Clock, Bookmark, Share2,
  ChevronRight, Check, Gift, Users,
} from 'lucide-react'
import { IS_ILANLARI } from '../data/mockIsIlanlari'

const TUR_RENK = {
  tam:       { bg: '#f0fdf4', text: '#15803d' },
  yari:      { bg: '#fef9c3', text: '#a16207' },
  uzaktan:   { bg: '#eff6ff', text: '#1d4ed8' },
  staj:      { bg: '#fdf4ff', text: '#7e22ce' },
  freelance: { bg: '#fff7ed', text: '#c2410c' },
}

export default function IsIlanDetail() {
  const { id }     = useParams()
  const navigate   = useNavigate()
  const [tab, setTab] = useState('aciklama')
  const [kaydedildi, setKaydedildi] = useState(false)
  const [basvuruldu, setBasvuruldu] = useState(false)

  const ilan = IS_ILANLARI.find(i => i.id === Number(id))

  if (!ilan) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-400">İlan bulunamadı.</p>
      </div>
    )
  }

  const turRenk = TUR_RENK[ilan.turValue]

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center">
        <div className="w-full max-w-[430px] bg-white/90 backdrop-blur-md border-b border-gray-100 px-4 py-3 flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="w-9 h-9 flex items-center justify-center rounded-xl bg-gray-100 active:bg-gray-200 transition-colors">
            <ArrowLeft size={18} strokeWidth={1.5} className="text-gray-700" />
          </button>
          <span className="text-gray-900 text-base font-bold flex-1 truncate">İlan Detayı</span>
          <button onClick={() => setKaydedildi(!kaydedildi)} className="w-9 h-9 flex items-center justify-center">
            <Bookmark size={18} strokeWidth={1.5} className={kaydedildi ? 'text-gray-900 fill-gray-900' : 'text-gray-400'} />
          </button>
          <button className="w-9 h-9 flex items-center justify-center">
            <Share2 size={18} strokeWidth={1.5} className="text-gray-400" />
          </button>
        </div>
      </header>

      <div className="pt-16 pb-28">

        {/* Hero */}
        <div className="mx-4 mt-4 bg-white border border-gray-100 rounded-2xl p-5">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center text-3xl shrink-0">
              {ilan.emoji}
            </div>
            <div className="flex-1 min-w-0">
              {ilan.acil && (
                <span className="text-[10px] font-bold text-red-500 bg-red-50 px-1.5 py-0.5 rounded-full">ACİL</span>
              )}
              <h1 className="text-gray-900 text-base font-extrabold leading-snug mt-1">{ilan.baslik}</h1>
              <button
                onClick={() => navigate(`/isveren/${ilan.isverenId}`)}
                className="flex items-center gap-1 mt-1 text-gray-500 text-xs active:text-gray-800"
              >
                {ilan.isletme}
                <ChevronRight size={11} strokeWidth={2} />
              </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mt-4">
            <div className="flex items-center gap-1 bg-gray-50 rounded-xl px-3 py-1.5">
              <MapPin size={11} strokeWidth={1.5} className="text-gray-500" />
              <span className="text-gray-600 text-xs">{ilan.konum}</span>
            </div>
            <div className="flex items-center gap-1 bg-gray-50 rounded-xl px-3 py-1.5">
              <Clock size={11} strokeWidth={1.5} className="text-gray-500" />
              <span className="text-gray-600 text-xs">{ilan.sure}</span>
            </div>
            <div
              className="flex items-center gap-1 rounded-xl px-3 py-1.5"
              style={{ background: turRenk.bg }}
            >
              <span className="text-xs font-semibold" style={{ color: turRenk.text }}>{ilan.tur}</span>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-50 flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-xs">Maaş Aralığı</p>
              <p className="text-gray-900 text-base font-extrabold">{ilan.maas}</p>
            </div>
            <div className="flex items-center gap-1 text-gray-400 text-xs">
              <Users size={12} strokeWidth={1.5} />
              <span>{ilan.basvuruSayisi} başvuru</span>
            </div>
          </div>
        </div>

        {/* Tab menü */}
        <div className="flex mx-4 mt-4 bg-gray-100 rounded-2xl p-1 gap-1">
          {[
            { key: 'aciklama', label: 'Açıklama' },
            { key: 'gereksinimler', label: 'Gereksinimler' },
            { key: 'avantajlar', label: 'Avantajlar' },
          ].map(t => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className="flex-1 py-2.5 rounded-xl text-xs font-semibold transition-all"
              style={{
                background: tab === t.key ? '#ffffff' : 'transparent',
                color:      tab === t.key ? '#111827' : '#9ca3af',
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="mx-4 mt-3 bg-white border border-gray-100 rounded-2xl p-4">
          {tab === 'aciklama' && (
            <p className="text-gray-600 text-sm leading-relaxed">{ilan.aciklama}</p>
          )}

          {tab === 'gereksinimler' && (
            <div className="flex flex-col gap-3">
              {ilan.gereksinimler.map((g, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-gray-900 flex items-center justify-center shrink-0 mt-0.5">
                    <Check size={11} strokeWidth={2.5} className="text-white" />
                  </div>
                  <p className="text-gray-700 text-sm leading-snug">{g}</p>
                </div>
              ))}
            </div>
          )}

          {tab === 'avantajlar' && (
            <div className="flex flex-col gap-3">
              {ilan.avantajlar.map((a, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center shrink-0 mt-0.5">
                    <Gift size={11} strokeWidth={2} className="text-green-600" />
                  </div>
                  <p className="text-gray-700 text-sm leading-snug">{a}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* İşveren kartı */}
        <button
          onClick={() => navigate(`/isveren/${ilan.isverenId}`)}
          className="mx-4 mt-3 bg-white border border-gray-100 rounded-2xl p-4 flex items-center gap-3 w-full active:bg-gray-50 transition-colors"
        >
          <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-2xl shrink-0">
            {ilan.emoji}
          </div>
          <div className="flex-1 text-left">
            <p className="text-gray-900 text-sm font-bold">{ilan.isletme}</p>
            <p className="text-gray-400 text-xs">{ilan.kategori} · {ilan.konum}</p>
          </div>
          <ChevronRight size={16} strokeWidth={1.5} className="text-gray-300 shrink-0" />
        </button>

      </div>

      {/* Başvur CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center">
        <div className="w-full max-w-[430px] bg-white/90 backdrop-blur-md border-t border-gray-100 px-4 py-4">
          <button
            onClick={() => setBasvuruldu(true)}
            disabled={basvuruldu}
            className="w-full py-4 rounded-2xl text-sm font-bold active:scale-95 transition-all disabled:opacity-60"
            style={{ background: basvuruldu ? '#f0fdf4' : '#111827', color: basvuruldu ? '#16a34a' : '#ffffff' }}
          >
            {basvuruldu ? '✓ Başvurunuz Alındı' : 'Şimdi Başvur'}
          </button>
        </div>
      </div>

    </div>
  )
}
