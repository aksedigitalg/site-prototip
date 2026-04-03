import { useState } from 'react'
import { Calendar, Clock, Users, CheckCircle2, XCircle } from 'lucide-react'
import IsletmeNav from '../../components/IsletmeNav'
import { ISLETME_REZERVASYONLAR } from '../../data/mockIsletme'

const DURUM_STYLE = {
  bekliyor:    { bg: '#fff7ed', color: '#ea580c', label: 'Bekliyor' },
  onaylandi:   { bg: '#f0fdf4', color: '#16a34a', label: 'Onaylandı' },
  tamamlandi:  { bg: '#f9fafb', color: '#6b7280', label: 'Tamamlandı' },
}

export default function IsletmeRezervasyonlar() {
  const [liste, setListe] = useState(ISLETME_REZERVASYONLAR)
  const [aktifTab, setAktifTab] = useState('bekliyor')

  const filtrelenmis = aktifTab === 'tümü'
    ? liste
    : liste.filter(r => r.durum === aktifTab)

  function durumGuncelle(id, yeniDurum) {
    setListe(prev => prev.map(r => r.id === id ? { ...r, durum: yeniDurum } : r))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center">
        <div className="w-full max-w-[430px] bg-white border-b border-gray-100 px-4 pt-12 pb-3">
          <h1 className="text-gray-900 text-base font-extrabold mb-3">Rezervasyonlar</h1>
          <div className="flex gap-2">
            {['bekliyor', 'onaylandi', 'tamamlandi'].map(t => (
              <button
                key={t}
                onClick={() => setAktifTab(t)}
                className="px-3 py-1.5 rounded-full text-xs font-semibold transition-colors"
                style={{
                  background: aktifTab === t ? '#111827' : '#f3f4f6',
                  color:      aktifTab === t ? 'white'   : '#6b7280',
                }}
              >
                {DURUM_STYLE[t].label}
              </button>
            ))}
          </div>
        </div>
      </header>

      <div className="pt-[116px] pb-24 px-4">
        {filtrelenmis.length === 0 ? (
          <div className="flex flex-col items-center pt-16 text-center">
            <div className="text-4xl mb-3">📭</div>
            <p className="text-gray-400 text-sm">Bu kategoride rezervasyon yok.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3 pt-3">
            {filtrelenmis.map(r => {
              const ds = DURUM_STYLE[r.durum]
              return (
                <div key={r.id} className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="text-gray-800 text-sm font-bold">{r.musteri}</p>
                      {r.not && <p className="text-gray-400 text-xs mt-0.5 italic">"{r.not}"</p>}
                    </div>
                    <span className="text-[10px] font-bold px-2.5 py-1 rounded-full" style={{ background: ds.bg, color: ds.color }}>
                      {ds.label}
                    </span>
                  </div>

                  <div className="flex gap-4 text-xs text-gray-500">
                    <span className="flex items-center gap-1"><Calendar size={11} strokeWidth={1.5} /> {r.tarih}</span>
                    <span className="flex items-center gap-1"><Clock size={11} strokeWidth={1.5} /> {r.saat}</span>
                    <span className="flex items-center gap-1"><Users size={11} strokeWidth={1.5} /> {r.kisi} kişi</span>
                  </div>

                  {r.durum === 'bekliyor' && (
                    <div className="flex gap-2 mt-3">
                      <button
                        onClick={() => durumGuncelle(r.id, 'onaylandi')}
                        className="flex-1 flex items-center justify-center gap-1.5 bg-green-50 border border-green-200 text-green-700 text-xs font-bold py-2.5 rounded-xl active:scale-95 transition-transform"
                      >
                        <CheckCircle2 size={14} strokeWidth={2} /> Onayla
                      </button>
                      <button
                        onClick={() => durumGuncelle(r.id, 'tamamlandi')}
                        className="flex-1 flex items-center justify-center gap-1.5 bg-red-50 border border-red-200 text-red-600 text-xs font-bold py-2.5 rounded-xl active:scale-95 transition-transform"
                      >
                        <XCircle size={14} strokeWidth={2} /> Reddet
                      </button>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>

      <IsletmeNav />
    </div>
  )
}
