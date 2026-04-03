import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, CheckCircle } from 'lucide-react'
import { SERVICES } from '../data/mockServices'

const ETKINLIK_TIPLERI = ['Düğün', 'Nişan', 'Söz', 'Kına Gecesi', 'Doğum Günü', 'Diğer']
const BUTCE_ARALIGLARI = [
  'Belirtmek istemiyorum',
  '10.000 – 30.000 ₺',
  '30.000 – 60.000 ₺',
  '60.000 – 100.000 ₺',
  '100.000 – 150.000 ₺',
  '150.000 ₺ üzeri',
]

export default function TeklifForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const service = SERVICES.find(s => s.id === parseInt(id))

  const [etkinlik,    setEtkinlik]    = useState('Düğün')
  const [tarih,       setTarih]       = useState('')
  const [kisi,        setKisi]        = useState(100)
  const [butce,       setBtce]        = useState(BUTCE_ARALIGLARI[1])
  const [not,         setNot]         = useState('')
  const [basarili,    setBasarili]    = useState(false)

  if (!service) return null

  function handleSubmit() {
    const teklif = {
      id: Date.now(),
      serviceId: service.id,
      serviceName: service.name,
      serviceLogo: '💒',
      etkinlik,
      tarih,
      kisiSayisi: kisi,
      butce,
      not,
      durum: 'Bekliyor',
      teklifTutari: null,
      aciklama: 'Teklif bekleniyor.',
      sonTarih: null,
    }
    const existing = JSON.parse(localStorage.getItem('sehir_teklifler') || '[]')
    localStorage.setItem('sehir_teklifler', JSON.stringify([teklif, ...existing]))
    setBasarili(true)
  }

  if (basarili) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
      <div className="text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle size={40} className="text-green-500" />
        </div>
        <h1 className="text-gray-900 text-xl font-bold">Teklif Talebiniz Alındı!</h1>
        <p className="text-gray-500 text-sm mt-2 leading-relaxed">
          {service.name} ekibi en kısa sürede size özel bir teklif hazırlayacak.
        </p>
        <p className="text-gray-400 text-xs mt-1">Ortalama yanıt süresi: 2-4 saat</p>
        <button
          onClick={() => navigate('/tekliflerim')}
          className="mt-6 w-full bg-gray-900 text-white font-semibold text-sm py-4 rounded-2xl active:scale-95 transition-transform"
        >
          Tekliflerimi Gör
        </button>
        <button
          onClick={() => navigate(-2)}
          className="mt-2 w-full border border-gray-200 text-gray-700 font-semibold text-sm py-4 rounded-2xl active:scale-95 transition-transform"
        >
          Geri Dön
        </button>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center">
        <div className="w-full max-w-[430px] bg-white/80 backdrop-blur-md border-b border-gray-100 px-4 py-3 flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="text-gray-500">
            <ArrowLeft size={20} strokeWidth={1.5} />
          </button>
          <div>
            <h1 className="text-gray-800 text-sm font-bold leading-tight">Teklif Al</h1>
            <p className="text-gray-400 text-xs">{service.name}</p>
          </div>
        </div>
      </header>

      <div className="pt-16 pb-28 px-4 space-y-3">

        {/* Etkinlik Türü */}
        <div className="bg-white border border-gray-100 rounded-2xl px-4 py-4 shadow-sm">
          <p className="text-gray-800 text-sm font-bold mb-3">Etkinlik Türü</p>
          <div className="flex flex-wrap gap-2">
            {ETKINLIK_TIPLERI.map(t => (
              <button
                key={t}
                onClick={() => setEtkinlik(t)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border ${
                  etkinlik === t
                    ? 'bg-gray-900 text-white border-gray-900'
                    : 'bg-gray-50 border-gray-200 text-gray-600'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Tarih */}
        <div className="bg-white border border-gray-100 rounded-2xl px-4 py-4 shadow-sm">
          <p className="text-gray-800 text-sm font-bold mb-2">Etkinlik Tarihi</p>
          <input
            type="date"
            value={tarih}
            onChange={e => setTarih(e.target.value)}
            className="w-full text-sm text-gray-700 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 outline-none"
          />
        </div>

        {/* Davetli Sayısı */}
        <div className="bg-white border border-gray-100 rounded-2xl px-4 py-4 shadow-sm">
          <p className="text-gray-800 text-sm font-bold mb-3">Tahmini Davetli Sayısı</p>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setKisi(k => Math.max(10, k - 10))}
              className="w-10 h-10 rounded-xl bg-gray-100 text-gray-700 text-xl font-bold flex items-center justify-center active:scale-90 transition-transform"
            >
              −
            </button>
            <span className="text-gray-900 text-2xl font-extrabold flex-1 text-center">{kisi}</span>
            <button
              onClick={() => setKisi(k => Math.min(1000, k + 10))}
              className="w-10 h-10 rounded-xl bg-gray-900 text-white text-xl font-bold flex items-center justify-center active:scale-90 transition-transform"
            >
              +
            </button>
          </div>
        </div>

        {/* Bütçe */}
        <div className="bg-white border border-gray-100 rounded-2xl px-4 py-4 shadow-sm">
          <p className="text-gray-800 text-sm font-bold mb-3">Bütçe Aralığı</p>
          <div className="space-y-2">
            {BUTCE_ARALIGLARI.map(b => (
              <button
                key={b}
                onClick={() => setBtce(b)}
                className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium transition-all border ${
                  butce === b
                    ? 'bg-gray-900 text-white border-gray-900'
                    : 'bg-gray-50 border-gray-200 text-gray-600'
                }`}
              >
                {b}
              </button>
            ))}
          </div>
        </div>

        {/* Not */}
        <div className="bg-white border border-gray-100 rounded-2xl px-4 py-4 shadow-sm">
          <p className="text-gray-800 text-sm font-bold mb-2">Özel İstekler (isteğe bağlı)</p>
          <textarea
            value={not}
            onChange={e => setNot(e.target.value)}
            placeholder="Tema, özel istek, soru varsa belirtiniz..."
            rows={3}
            className="w-full text-sm text-gray-700 placeholder-gray-300 resize-none outline-none leading-relaxed"
          />
        </div>

      </div>

      {/* Alt buton */}
      <div className="fixed bottom-0 left-0 right-0 z-40 flex justify-center">
        <div className="w-full max-w-[430px] bg-white border-t border-gray-100 px-4 py-3">
          <button
            onClick={handleSubmit}
            className="w-full bg-gray-900 text-white font-bold text-sm py-4 rounded-2xl active:scale-95 transition-transform"
          >
            Teklif Gönder
          </button>
        </div>
      </div>

    </div>
  )
}
