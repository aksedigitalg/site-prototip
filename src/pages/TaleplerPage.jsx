import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Plus, Clock, MapPin, MessageCircle } from 'lucide-react'
import { TALEPLER, TALEP_KATEGORILER } from '../data/mockTalep'

export default function TaleplerPage() {
  const navigate  = useNavigate()
  const [aktif, setAktif] = useState('tumu')

  const liste = aktif === 'tumu'
    ? TALEPLER
    : TALEPLER.filter(t => t.kategoriValue === aktif)

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center">
        <div className="w-full max-w-[430px] bg-white/90 backdrop-blur-md border-b border-gray-100 px-4 py-3">
          <div className="flex items-center gap-3 mb-3">
            <button onClick={() => navigate(-1)} className="w-9 h-9 flex items-center justify-center rounded-xl bg-gray-100 active:bg-gray-200 transition-colors">
              <ArrowLeft size={18} strokeWidth={1.5} className="text-gray-700" />
            </button>
            <h1 className="text-gray-900 text-base font-bold flex-1">Servis Talepleri</h1>
            <button
              onClick={() => navigate('/talep-olustur')}
              className="flex items-center gap-1.5 bg-gray-900 text-white text-xs font-bold px-3 py-2 rounded-xl active:scale-95 transition-transform"
            >
              <Plus size={13} strokeWidth={2.5} />
              Talep Oluştur
            </button>
          </div>

          {/* Kategori filtreleri */}
          <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
            {TALEP_KATEGORILER.map(k => (
              <button
                key={k.value}
                onClick={() => setAktif(k.value)}
                className="shrink-0 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all active:scale-95"
                style={{
                  background: aktif === k.value ? '#111827' : '#ffffff',
                  color:      aktif === k.value ? '#ffffff' : '#4b5563',
                  border:     aktif === k.value ? '1.5px solid #111827' : '1.5px solid #e5e7eb',
                }}
              >
                {k.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      <div className="pt-[116px] pb-8 px-4 flex flex-col gap-3">
        {liste.map(talep => (
          <button
            key={talep.id}
            onClick={() => navigate(`/talep/${talep.id}`)}
            className="bg-white border border-gray-100 rounded-2xl p-4 text-left active:scale-[0.98] transition-transform"
          >
            <div className="flex items-start gap-3">
              <div className="w-11 h-11 rounded-2xl bg-gray-50 flex items-center justify-center text-xl shrink-0">
                {talep.emoji}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-gray-900 text-sm font-bold leading-snug flex-1">{talep.baslik}</p>
                  <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full shrink-0">Aktif</span>
                </div>
                <p className="text-gray-500 text-xs mt-1 line-clamp-2">{talep.aciklama}</p>
                <div className="flex items-center gap-3 mt-2">
                  <span className="flex items-center gap-1 text-gray-400 text-xs">
                    <MapPin size={10} strokeWidth={1.5} />
                    {talep.konum}
                  </span>
                  <span className="flex items-center gap-1 text-gray-400 text-xs">
                    <Clock size={10} strokeWidth={1.5} />
                    {talep.sure}
                  </span>
                </div>
                <div className="flex items-center justify-between mt-2">
                  {talep.butce && (
                    <span className="text-gray-900 text-xs font-bold">{talep.butce}</span>
                  )}
                  <span className="flex items-center gap-1 text-gray-500 text-xs ml-auto">
                    <MessageCircle size={11} strokeWidth={1.5} />
                    {talep.teklifSayisi} teklif
                  </span>
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
