import { useState } from 'react'
import { Plus, CheckCircle2 } from 'lucide-react'
import IsletmeNav from '../../components/IsletmeNav'
import { ISLETME_KAMPANYALAR } from '../../data/mockIsletme'

export default function IsletmeKampanyalar() {
  const [liste,   setListe]   = useState(ISLETME_KAMPANYALAR)
  const [yeni,    setYeni]    = useState(false)
  const [baslik,  setBaslik]  = useState('')
  const [aciklama,setAciklama]= useState('')
  const [kayit,   setKayit]   = useState(false)

  function ekle() {
    if (!baslik) return
    setListe(prev => [...prev, { id: Date.now(), baslik, aciklama, durum: 'aktif', bitisTarihi: '30 Nisan' }])
    setBaslik('')
    setAciklama('')
    setYeni(false)
    setKayit(true)
    setTimeout(() => setKayit(false), 2000)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center">
        <div className="w-full max-w-[430px] bg-white border-b border-gray-100 px-4 pt-12 pb-3 flex items-center justify-between">
          <h1 className="text-gray-900 text-base font-extrabold">Kampanyalarım</h1>
          <button
            onClick={() => setYeni(!yeni)}
            className="flex items-center gap-1.5 bg-gray-900 text-white text-xs font-bold px-3 py-2 rounded-full active:scale-90 transition-transform"
          >
            <Plus size={14} strokeWidth={2.5} /> Yeni
          </button>
        </div>
      </header>

      <div className="pt-[72px] pb-24 px-4">

        {yeni && (
          <div className="mt-4 bg-white border border-gray-200 rounded-2xl p-4 shadow-sm flex flex-col gap-3">
            <p className="text-gray-700 text-sm font-bold">Yeni Kampanya</p>
            <input
              value={baslik}
              onChange={e => setBaslik(e.target.value)}
              placeholder="Kampanya başlığı"
              className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-800 outline-none"
            />
            <textarea
              value={aciklama}
              onChange={e => setAciklama(e.target.value)}
              placeholder="Açıklama"
              rows={2}
              className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-800 outline-none resize-none"
            />
            <div className="flex gap-2">
              <button
                onClick={() => setYeni(false)}
                className="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-500 text-sm font-semibold"
              >İptal</button>
              <button
                onClick={ekle}
                className="flex-1 py-2.5 rounded-xl bg-gray-900 text-white text-sm font-semibold active:scale-95 transition-transform"
              >Kaydet</button>
            </div>
          </div>
        )}

        {kayit && (
          <div className="flex items-center gap-2 mt-3 bg-green-50 border border-green-200 rounded-2xl px-4 py-3">
            <CheckCircle2 size={16} className="text-green-600" />
            <span className="text-green-700 text-sm font-semibold">Kampanya eklendi!</span>
          </div>
        )}

        <div className="flex flex-col gap-3 mt-4">
          {liste.map(k => (
            <div key={k.id} className="bg-white border border-gray-100 rounded-2xl px-4 py-4 shadow-sm">
              <div className="flex items-start justify-between">
                <p className="text-gray-800 text-sm font-bold flex-1 mr-2">{k.baslik}</p>
                <span
                  className="text-[10px] font-bold px-2.5 py-1 rounded-full shrink-0"
                  style={{
                    background: k.durum === 'aktif' ? '#f0fdf4' : '#f9fafb',
                    color:      k.durum === 'aktif' ? '#16a34a' : '#9ca3af',
                  }}
                >
                  {k.durum === 'aktif' ? 'Aktif' : 'Bitti'}
                </span>
              </div>
              {k.aciklama && <p className="text-gray-400 text-xs mt-1">{k.aciklama}</p>}
              <p className="text-gray-300 text-xs mt-2">Bitiş: {k.bitisTarihi}</p>
            </div>
          ))}
        </div>
      </div>

      <IsletmeNav />
    </div>
  )
}
