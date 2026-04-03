import { useState } from 'react'
import { CheckCircle2, XCircle } from 'lucide-react'
import AdminNav from '../../components/AdminNav'
import { ADMIN_ISLETMELER } from '../../data/mockAdmin'

const DURUM = {
  bekliyor:   { bg: '#fff7ed', color: '#ea580c', label: 'Bekliyor' },
  onaylandi:  { bg: '#f0fdf4', color: '#16a34a', label: 'Onaylı' },
  reddedildi: { bg: '#fef2f2', color: '#dc2626', label: 'Reddedildi' },
}

export default function AdminIsletmeler() {
  const [liste, setListe] = useState(ADMIN_ISLETMELER)
  const [tab,   setTab]   = useState('bekliyor')

  const filtreli = tab === 'tümü' ? liste : liste.filter(i => i.durum === tab)

  function guncelle(id, yeni) {
    setListe(prev => prev.map(i => i.id === id ? { ...i, durum: yeni } : i))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center">
        <div className="w-full max-w-[430px] bg-gray-900 px-4 pt-12 pb-3">
          <h1 className="text-white text-base font-extrabold mb-3">İşletmeler</h1>
          <div className="flex gap-2">
            {['bekliyor', 'onaylandi', 'reddedildi'].map(t => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className="px-3 py-1.5 rounded-full text-xs font-semibold transition-colors"
                style={{
                  background: tab === t ? 'white'        : 'rgba(255,255,255,0.15)',
                  color:      tab === t ? '#111827'       : 'rgba(255,255,255,0.6)',
                }}
              >
                {DURUM[t].label}
              </button>
            ))}
          </div>
        </div>
      </header>

      <div className="pt-[116px] pb-24 px-4">
        {filtreli.length === 0 ? (
          <div className="flex flex-col items-center pt-16 text-center">
            <div className="text-4xl mb-3">🏪</div>
            <p className="text-gray-400 text-sm">Bu kategoride işletme yok.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3 pt-3">
            {filtreli.map(i => {
              const ds = DURUM[i.durum]
              return (
                <div key={i.id} className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="text-gray-800 text-sm font-bold">{i.isim}</p>
                      <p className="text-gray-400 text-xs">{i.kategori} · {i.sahip}</p>
                      <p className="text-gray-300 text-[10px] mt-0.5">{i.basvuruTarih}</p>
                    </div>
                    <span className="text-[10px] font-bold px-2.5 py-1 rounded-full" style={{ background: ds.bg, color: ds.color }}>
                      {ds.label}
                    </span>
                  </div>

                  {i.durum === 'bekliyor' && (
                    <div className="flex gap-2 mt-3">
                      <button
                        onClick={() => guncelle(i.id, 'onaylandi')}
                        className="flex-1 flex items-center justify-center gap-1.5 bg-green-50 border border-green-200 text-green-700 text-xs font-bold py-2.5 rounded-xl active:scale-95 transition-transform"
                      >
                        <CheckCircle2 size={14} strokeWidth={2} /> Onayla
                      </button>
                      <button
                        onClick={() => guncelle(i.id, 'reddedildi')}
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

      <AdminNav />
    </div>
  )
}
