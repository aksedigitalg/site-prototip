import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, MapPin, Users, Globe, ChevronRight, Briefcase } from 'lucide-react'
import { ISVEREN_PROFILLER, IS_ILANLARI } from '../data/mockIsIlanlari'

const TUR_RENK = {
  tam:       { bg: '#f0fdf4', text: '#15803d' },
  yari:      { bg: '#fef9c3', text: '#a16207' },
  uzaktan:   { bg: '#eff6ff', text: '#1d4ed8' },
  staj:      { bg: '#fdf4ff', text: '#7e22ce' },
  freelance: { bg: '#fff7ed', text: '#c2410c' },
}

export default function IsverenProfil() {
  const { id }   = useParams()
  const navigate = useNavigate()
  const profil   = ISVEREN_PROFILLER[Number(id)]
  const ilanlar  = IS_ILANLARI.filter(i => i.isverenId === Number(id))

  if (!profil) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-400">İşveren bulunamadı.</p>
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
          <span className="text-gray-900 text-base font-bold flex-1">İşveren Profili</span>
        </div>
      </header>

      <div className="pt-16 pb-10">

        {/* Hero */}
        <div className="mx-4 mt-4 bg-white border border-gray-100 rounded-2xl p-5">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center text-3xl shrink-0">
              {profil.emoji}
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-gray-900 text-base font-extrabold">{profil.isim}</h1>
              <p className="text-gray-500 text-xs mt-0.5">{profil.kategori}</p>
              <div className="flex items-center gap-1 mt-1 text-gray-400 text-xs">
                <MapPin size={10} strokeWidth={1.5} />
                <span>{profil.konum}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div className="bg-gray-50 rounded-xl py-2.5 text-center">
              <p className="text-gray-900 text-sm font-extrabold">{profil.kurulumYili}</p>
              <p className="text-gray-400 text-[10px] mt-0.5">Kuruluş</p>
            </div>
            <div className="bg-gray-50 rounded-xl py-2.5 text-center">
              <p className="text-gray-900 text-sm font-extrabold">{profil.calısanSayisi}</p>
              <p className="text-gray-400 text-[10px] mt-0.5">Çalışan</p>
            </div>
            <div className="bg-gray-50 rounded-xl py-2.5 text-center">
              <p className="text-gray-900 text-sm font-extrabold">{profil.acikPozisyonlar}</p>
              <p className="text-gray-400 text-[10px] mt-0.5">Açık Pozisyon</p>
            </div>
          </div>
        </div>

        {/* Hakkında */}
        <div className="mx-4 mt-3 bg-white border border-gray-100 rounded-2xl p-4">
          <h2 className="text-gray-900 text-sm font-bold mb-2">Hakkında</h2>
          <p className="text-gray-600 text-sm leading-relaxed">{profil.aciklama}</p>
          <div className="flex items-center gap-1.5 mt-3 text-gray-500 text-xs">
            <Globe size={12} strokeWidth={1.5} />
            <span>{profil.web}</span>
          </div>
        </div>

        {/* Açık pozisyonlar */}
        <div className="mx-4 mt-3">
          <h2 className="text-gray-900 text-sm font-bold mb-3 flex items-center gap-2">
            <Briefcase size={14} strokeWidth={1.5} className="text-gray-500" />
            Açık Pozisyonlar ({ilanlar.length})
          </h2>

          {ilanlar.length === 0 ? (
            <div className="bg-white border border-gray-100 rounded-2xl p-6 text-center">
              <p className="text-gray-400 text-sm">Şu an açık pozisyon yok.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              {ilanlar.map(ilan => {
                const turRenk = TUR_RENK[ilan.turValue]
                return (
                  <button
                    key={ilan.id}
                    onClick={() => navigate(`/is-ilani/${ilan.id}`)}
                    className="bg-white border border-gray-100 rounded-2xl px-4 py-3.5 flex items-center gap-3 active:bg-gray-50 transition-colors"
                  >
                    <div className="flex-1 text-left">
                      <p className="text-gray-900 text-sm font-semibold">{ilan.baslik}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-gray-400 text-xs">{ilan.konum}</span>
                        <span
                          className="text-[10px] font-bold px-1.5 py-0.5 rounded-full"
                          style={{ background: turRenk.bg, color: turRenk.text }}
                        >
                          {ilan.tur}
                        </span>
                      </div>
                      <p className="text-gray-900 text-xs font-bold mt-1">{ilan.maas}</p>
                    </div>
                    <ChevronRight size={16} strokeWidth={1.5} className="text-gray-300 shrink-0" />
                  </button>
                )
              })}
            </div>
          )}
        </div>

      </div>
    </div>
  )
}
