import { useState } from 'react'
import { Search, UserX, UserCheck } from 'lucide-react'
import AdminNav from '../../components/AdminNav'
import { ADMIN_KULLANICILAR } from '../../data/mockAdmin'

export default function AdminKullanicilar() {
  const [liste,  setListe]  = useState(ADMIN_KULLANICILAR)
  const [query,  setQuery]  = useState('')

  const filtreli = liste.filter(k =>
    k.isim.toLowerCase().includes(query.toLowerCase()) ||
    k.telefon.includes(query)
  )

  function durumToggle(id) {
    setListe(prev => prev.map(k =>
      k.id === id ? { ...k, durum: k.durum === 'aktif' ? 'askida' : 'aktif' } : k
    ))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center">
        <div className="w-full max-w-[430px] bg-gray-900 px-4 pt-12 pb-3">
          <h1 className="text-white text-base font-extrabold mb-3">Kullanıcılar</h1>
          <div className="flex items-center gap-2 bg-white/10 rounded-2xl px-3 py-2.5">
            <Search size={14} strokeWidth={1.5} className="text-white/40" />
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Ad veya telefon ara..."
              className="flex-1 bg-transparent text-white text-sm outline-none placeholder-white/30"
            />
          </div>
        </div>
      </header>

      <div className="pt-[108px] pb-24 px-4 pt-3">
        <p className="text-gray-400 text-xs mb-3 mt-3">{filtreli.length} kullanıcı</p>
        <div className="flex flex-col gap-2">
          {filtreli.map(k => (
            <div key={k.id} className="flex items-center gap-3 bg-white border border-gray-100 rounded-2xl px-4 py-3.5 shadow-sm">
              <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 text-sm font-bold shrink-0">
                {k.isim[0]}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-gray-800 text-sm font-semibold">{k.isim}</p>
                <p className="text-gray-400 text-xs">{k.telefon}</p>
                <p className="text-gray-300 text-[10px]">{k.kayitTarih}</p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <span
                  className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                  style={{
                    background: k.durum === 'aktif' ? '#f0fdf4' : '#fef2f2',
                    color:      k.durum === 'aktif' ? '#16a34a' : '#dc2626',
                  }}
                >
                  {k.durum === 'aktif' ? 'Aktif' : 'Askıda'}
                </span>
                <button onClick={() => durumToggle(k.id)} className="active:scale-90 transition-transform">
                  {k.durum === 'aktif'
                    ? <UserX size={15} strokeWidth={1.5} className="text-red-400" />
                    : <UserCheck size={15} strokeWidth={1.5} className="text-green-500" />
                  }
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <AdminNav />
    </div>
  )
}
