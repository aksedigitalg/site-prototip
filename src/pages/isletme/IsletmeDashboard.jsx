import { useNavigate } from 'react-router-dom'
import { LogOut, TrendingUp, Eye, MousePointerClick, CalendarCheck, MessageCircle, Tag, ChevronRight } from 'lucide-react'
import IsletmeNav from '../../components/IsletmeNav'
import { ISLETME_PROFIL, ISLETME_ISTATISTIK, ISLETME_REZERVASYONLAR, ISLETME_MESAJLAR } from '../../data/mockIsletme'

const AYLIK_GRAFIK = [
  { ay: 'Eki', rez: 14, goru: 980  },
  { ay: 'Kas', rez: 18, goru: 1120 },
  { ay: 'Ara', rez: 12, goru: 870  },
  { ay: 'Oca', rez: 22, goru: 1340 },
  { ay: 'Şub', rez: 19, goru: 1190 },
  { ay: 'Mar', rez: 25, goru: 1560 },
  { ay: 'Nis', rez: 28, goru: 1842 },
]

function IsletmeChart() {
  const maxRez  = Math.max(...AYLIK_GRAFIK.map(d => d.rez))
  const maxGoru = Math.max(...AYLIK_GRAFIK.map(d => d.goru))
  const CHART_H = 60
  const BAR_W   = 18
  const GAP     = 8
  const totalW  = AYLIK_GRAFIK.length * (BAR_W * 2 + GAP + 4) + GAP

  return (
    <svg viewBox={`0 0 ${totalW} 80`} className="w-full" style={{ height: 80 }}>
      {AYLIK_GRAFIK.map((d, i) => {
        const rezH  = Math.max((d.rez  / maxRez)  * CHART_H, 3)
        const goruH = Math.max((d.goru / maxGoru) * CHART_H, 3)
        const xBase = i * (BAR_W * 2 + GAP + 4) + GAP
        const isLast = i === AYLIK_GRAFIK.length - 1
        return (
          <g key={d.ay}>
            <rect x={xBase}           y={CHART_H - goruH} width={BAR_W} height={goruH} rx={4} fill={isLast ? '#6366f1' : '#e0e7ff'} />
            <rect x={xBase + BAR_W + 2} y={CHART_H - rezH}  width={BAR_W} height={rezH}  rx={4} fill={isLast ? '#10b981' : '#d1fae5'} />
            <text x={xBase + BAR_W} y={76} textAnchor="middle" fontSize={8} fill={isLast ? '#6b7280' : '#9ca3af'} fontWeight={isLast ? '600' : '400'}>
              {d.ay}
            </text>
          </g>
        )
      })}
    </svg>
  )
}

function StatKart({ label, deger, alt, ikon: Icon, renk }) {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm flex flex-col gap-1">
      <div className="flex items-center justify-between mb-1">
        <span className="text-gray-400 text-[11px] font-semibold">{label}</span>
        <div className="w-7 h-7 rounded-xl flex items-center justify-center" style={{ background: renk + '18' }}>
          <Icon size={14} strokeWidth={1.5} style={{ color: renk }} />
        </div>
      </div>
      <p className="text-gray-900 text-xl font-extrabold">{deger.toLocaleString()}</p>
      <p className="text-gray-400 text-[10px]">{alt}</p>
    </div>
  )
}

export default function IsletmeDashboard() {
  const navigate = useNavigate()
  const { buAyGoruntulenme, buAyTiklama, buAyRezervasyon, buAyMesaj, oncekiAyGoruntulenme } = ISLETME_ISTATISTIK
  const bekleyenRez = ISLETME_REZERVASYONLAR.filter(r => r.durum === 'bekliyor').length
  const okunmamis  = ISLETME_MESAJLAR.filter(m => m.okunmadi).length

  function cikisYap() {
    localStorage.removeItem('isletme_session')
    navigate('/isletme/login', { replace: true })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center">
        <div className="w-full max-w-[430px] bg-white border-b border-gray-100 px-4 pt-12 pb-3 flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-xs">Hoş geldin 👋</p>
            <h1 className="text-gray-900 text-base font-extrabold">{ISLETME_PROFIL.isim}</h1>
          </div>
          <button onClick={cikisYap} className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center active:scale-90 transition-transform">
            <LogOut size={16} strokeWidth={1.5} className="text-gray-600" />
          </button>
        </div>
      </header>

      <div className="pt-[80px] pb-24 px-4">

        {/* Aylık Grafik */}
        <div className="pt-4 bg-white border border-gray-100 rounded-2xl px-4 py-4 shadow-sm">
          <div className="flex items-center justify-between mb-1">
            <p className="text-gray-800 text-sm font-bold">Aylık Performans</p>
            <span className="text-gray-400 text-[10px]">Son 7 ay</span>
          </div>
          <div className="flex items-center gap-3 mb-3">
            <span className="flex items-center gap-1 text-[10px] text-indigo-500 font-semibold"><span className="w-2 h-2 rounded-sm bg-indigo-400 inline-block" /> Görüntülenme</span>
            <span className="flex items-center gap-1 text-[10px] text-emerald-500 font-semibold"><span className="w-2 h-2 rounded-sm bg-emerald-400 inline-block" /> Rezervasyon</span>
          </div>
          <IsletmeChart />
        </div>

        {/* İstatistik kartları */}
        <div className="pt-1 grid grid-cols-2 gap-3">
          <StatKart label="Görüntülenme" deger={buAyGoruntulenme} alt="Bu ay" ikon={Eye} renk="#6366f1" />
          <StatKart label="Tıklama"      deger={buAyTiklama}      alt="Bu ay" ikon={MousePointerClick} renk="#f59e0b" />
          <StatKart label="Rezervasyon"  deger={buAyRezervasyon}  alt="Bu ay" ikon={CalendarCheck} renk="#10b981" />
          <StatKart label="Mesaj"        deger={buAyMesaj}        alt="Bu ay" ikon={MessageCircle} renk="#3b82f6" />
        </div>

        {/* Hızlı erişim */}
        <div className="mt-5 flex flex-col gap-3">
          <button
            onClick={() => navigate('/isletme/rezervasyonlar')}
            className="flex items-center gap-3 bg-white border border-gray-100 rounded-2xl px-4 py-3.5 shadow-sm active:scale-[0.98] transition-transform"
          >
            <div className="w-9 h-9 rounded-xl bg-orange-50 flex items-center justify-center">
              <CalendarCheck size={18} strokeWidth={1.5} className="text-orange-500" />
            </div>
            <div className="flex-1 text-left">
              <p className="text-gray-800 text-sm font-semibold">Rezervasyonlar</p>
              <p className="text-gray-400 text-xs">{bekleyenRez} adet bekliyor</p>
            </div>
            {bekleyenRez > 0 && (
              <span className="w-5 h-5 rounded-full bg-orange-500 text-white text-[10px] font-bold flex items-center justify-center">
                {bekleyenRez}
              </span>
            )}
            <ChevronRight size={16} strokeWidth={1.5} className="text-gray-300" />
          </button>

          <button
            onClick={() => navigate('/isletme/mesajlar')}
            className="flex items-center gap-3 bg-white border border-gray-100 rounded-2xl px-4 py-3.5 shadow-sm active:scale-[0.98] transition-transform"
          >
            <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center">
              <MessageCircle size={18} strokeWidth={1.5} className="text-blue-500" />
            </div>
            <div className="flex-1 text-left">
              <p className="text-gray-800 text-sm font-semibold">Mesajlar</p>
              <p className="text-gray-400 text-xs">{okunmamis} okunmamış mesaj</p>
            </div>
            {okunmamis > 0 && (
              <span className="w-5 h-5 rounded-full bg-blue-500 text-white text-[10px] font-bold flex items-center justify-center">
                {okunmamis}
              </span>
            )}
            <ChevronRight size={16} strokeWidth={1.5} className="text-gray-300" />
          </button>

          <button
            onClick={() => navigate('/isletme/kampanyalar')}
            className="flex items-center gap-3 bg-white border border-gray-100 rounded-2xl px-4 py-3.5 shadow-sm active:scale-[0.98] transition-transform"
          >
            <div className="w-9 h-9 rounded-xl bg-purple-50 flex items-center justify-center">
              <Tag size={18} strokeWidth={1.5} className="text-purple-500" />
            </div>
            <div className="flex-1 text-left">
              <p className="text-gray-800 text-sm font-semibold">Kampanyalarım</p>
              <p className="text-gray-400 text-xs">Kampanya oluştur ve yönet</p>
            </div>
            <ChevronRight size={16} strokeWidth={1.5} className="text-gray-300" />
          </button>
        </div>

        {/* Performans notu */}
        <div className="mt-4 bg-gray-900 rounded-2xl px-4 py-4">
          <p className="text-white/60 text-[10px] font-semibold mb-1">Geçen Aya Göre</p>
          <div className="flex items-center gap-2">
            <TrendingUp size={16} strokeWidth={2} className="text-green-400" />
            <p className="text-white text-sm font-bold">
              Görüntülenme %{Math.round((buAyGoruntulenme - oncekiAyGoruntulenme) / oncekiAyGoruntulenme * 100)} arttı
            </p>
          </div>
        </div>

      </div>

      <IsletmeNav />
    </div>
  )
}
