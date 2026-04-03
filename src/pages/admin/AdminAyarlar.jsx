import { useState } from 'react'
import { CheckCircle2 } from 'lucide-react'
import AdminNav from '../../components/AdminNav'

export default function AdminAyarlar() {
  const [appAdi,    setAppAdi]    = useState('Şehir App')
  const [sehir,     setSehir]     = useState('Gebze')
  const [iletisim,  setIletisim]  = useState('destek@sehirapp.com')
  const [bakim,     setBakim]     = useState(false)
  const [kayit,     setKayit]     = useState(false)

  function kaydet() {
    setKayit(true)
    setTimeout(() => setKayit(false), 2500)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center">
        <div className="w-full max-w-[430px] bg-gray-900 px-4 pt-12 pb-3">
          <h1 className="text-white text-base font-extrabold">Ayarlar</h1>
        </div>
      </header>

      <div className="pt-[72px] pb-24 px-4 pt-4">
        <div className="flex flex-col gap-4 mt-4">
          {[
            { label: 'Uygulama Adı',     value: appAdi,   set: setAppAdi },
            { label: 'Varsayılan Şehir', value: sehir,    set: setSehir },
            { label: 'İletişim E-posta', value: iletisim, set: setIletisim },
          ].map(f => (
            <div key={f.label}>
              <label className="text-gray-700 text-xs font-semibold mb-1.5 block">{f.label}</label>
              <input
                value={f.value}
                onChange={e => f.set(e.target.value)}
                className="w-full bg-white border border-gray-200 rounded-2xl px-4 py-3.5 text-gray-800 text-sm outline-none focus:border-gray-400"
              />
            </div>
          ))}

          {/* Bakım modu */}
          <div className="flex items-center justify-between bg-white border border-gray-200 rounded-2xl px-4 py-4">
            <div>
              <p className="text-gray-800 text-sm font-semibold">Bakım Modu</p>
              <p className="text-gray-400 text-xs">Aktifken uygulama erişime kapalı</p>
            </div>
            <button
              onClick={() => setBakim(!bakim)}
              className="relative w-11 h-6 rounded-full transition-colors"
              style={{ background: bakim ? '#111827' : '#d1d5db' }}
            >
              <div
                className="absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all"
                style={{ left: bakim ? '22px' : '2px' }}
              />
            </button>
          </div>

          {bakim && (
            <div className="bg-orange-50 border border-orange-200 rounded-2xl px-4 py-3">
              <p className="text-orange-700 text-xs font-semibold">⚠️ Bakım modu aktif — kullanıcılar uygulamaya erişemiyor.</p>
            </div>
          )}

          {kayit && (
            <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-2xl px-4 py-3">
              <CheckCircle2 size={16} className="text-green-600" />
              <span className="text-green-700 text-sm font-semibold">Ayarlar kaydedildi!</span>
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

      <AdminNav />
    </div>
  )
}
