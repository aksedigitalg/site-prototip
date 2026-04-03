import { useState } from 'react'
import { CheckCircle2 } from 'lucide-react'
import IsletmeNav from '../../components/IsletmeNav'
import { ISLETME_PROFIL } from '../../data/mockIsletme'

export default function IsletmeProfil() {
  const [isim,     setIsim]     = useState(ISLETME_PROFIL.isim)
  const [telefon,  setTelefon]  = useState(ISLETME_PROFIL.telefon)
  const [adres,    setAdres]    = useState(ISLETME_PROFIL.adres)
  const [aciklama, setAciklama] = useState(ISLETME_PROFIL.aciklama)
  const [kayit,    setKayit]    = useState(false)

  function kaydet() {
    setKayit(true)
    setTimeout(() => setKayit(false), 2500)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center">
        <div className="w-full max-w-[430px] bg-white border-b border-gray-100 px-4 pt-12 pb-3">
          <h1 className="text-gray-900 text-base font-extrabold">İşletme Profilim</h1>
        </div>
      </header>

      <div className="pt-[72px] pb-24 px-4">

        {/* Durum badge */}
        <div className="flex justify-end mt-4 mb-4">
          <span className="flex items-center gap-1.5 bg-green-50 border border-green-200 text-green-700 text-xs font-bold px-3 py-1.5 rounded-full">
            <CheckCircle2 size={13} strokeWidth={2} /> {ISLETME_PROFIL.durum}
          </span>
        </div>

        <div className="flex flex-col gap-4">
          {[
            { label: 'İşletme Adı', value: isim, set: setIsim, placeholder: 'İşletme adınız' },
            { label: 'Telefon', value: telefon, set: setTelefon, placeholder: '05xx xxx xx xx' },
            { label: 'Adres', value: adres, set: setAdres, placeholder: 'Açık adres' },
          ].map(f => (
            <div key={f.label}>
              <label className="text-gray-700 text-xs font-semibold mb-1.5 block">{f.label}</label>
              <input
                value={f.value}
                onChange={e => f.set(e.target.value)}
                placeholder={f.placeholder}
                className="w-full bg-white border border-gray-200 rounded-2xl px-4 py-3.5 text-gray-800 text-sm outline-none focus:border-gray-400"
              />
            </div>
          ))}

          <div>
            <label className="text-gray-700 text-xs font-semibold mb-1.5 block">İşletme Açıklaması</label>
            <textarea
              value={aciklama}
              onChange={e => setAciklama(e.target.value)}
              rows={4}
              className="w-full bg-white border border-gray-200 rounded-2xl px-4 py-3.5 text-gray-800 text-sm outline-none focus:border-gray-400 resize-none"
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">Puan</span>
            <span className="text-yellow-500 font-bold">★ {ISLETME_PROFIL.puan} ({ISLETME_PROFIL.degerlendirme} değerlendirme)</span>
          </div>

          {kayit && (
            <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-2xl px-4 py-3">
              <CheckCircle2 size={16} strokeWidth={2} className="text-green-600" />
              <span className="text-green-700 text-sm font-semibold">Değişiklikler kaydedildi!</span>
            </div>
          )}

          <button
            onClick={kaydet}
            className="w-full bg-gray-900 text-white text-sm font-bold py-4 rounded-2xl active:scale-[0.98] transition-transform"
          >
            Kaydet
          </button>
        </div>
      </div>

      <IsletmeNav />
    </div>
  )
}
