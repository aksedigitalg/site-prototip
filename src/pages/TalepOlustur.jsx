import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, ChevronDown, Send } from 'lucide-react'
import { TALEP_KATEGORILER } from '../data/mockTalep'

export default function TalepOlustur() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    baslik: '',
    kategori: '',
    aciklama: '',
    butce: '',
    konum: 'Gebze Merkez',
  })
  const [gonderildi, setGonderildi] = useState(false)

  function gonder() {
    if (!form.baslik || !form.kategori || !form.aciklama) return
    setGonderildi(true)
    setTimeout(() => navigate(-1), 1800)
  }

  if (gonderildi) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-6 gap-4">
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center text-4xl">✅</div>
        <h2 className="text-gray-900 text-lg font-bold text-center">Talebiniz Yayınlandı!</h2>
        <p className="text-gray-500 text-sm text-center leading-relaxed">
          Ustalar tekliflerini hazırlıyor. Bildirim geldiğinde teklifleri karşılaştırabilirsiniz.
        </p>
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
          <span className="text-gray-900 text-base font-bold">Talep Oluştur</span>
        </div>
      </header>

      <div className="pt-16 pb-10 px-4 space-y-4">

        <div className="pt-4">
          <p className="text-gray-500 text-xs mb-4 leading-relaxed">
            Probleminizi tarif edin — ustalar size teklif göndersin.
          </p>

          {/* Başlık */}
          <div className="bg-white border border-gray-100 rounded-2xl px-4 py-3 mb-3">
            <p className="text-gray-400 text-xs mb-1">Talep Başlığı *</p>
            <input
              value={form.baslik}
              onChange={e => setForm(p => ({ ...p, baslik: e.target.value }))}
              placeholder="Örn: Kombim bozuldu, bakım lazım"
              className="w-full text-gray-800 text-sm font-medium outline-none bg-transparent"
            />
          </div>

          {/* Kategori */}
          <div className="bg-white border border-gray-100 rounded-2xl px-4 py-3 mb-3">
            <p className="text-gray-400 text-xs mb-1">Kategori *</p>
            <div className="relative">
              <select
                value={form.kategori}
                onChange={e => setForm(p => ({ ...p, kategori: e.target.value }))}
                className="w-full text-gray-800 text-sm font-medium outline-none bg-transparent appearance-none pr-6"
              >
                <option value="">Seçiniz...</option>
                {TALEP_KATEGORILER.filter(k => k.value !== 'tumu').map(k => (
                  <option key={k.value} value={k.value}>{k.label}</option>
                ))}
              </select>
              <ChevronDown size={14} className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Açıklama */}
          <div className="bg-white border border-gray-100 rounded-2xl px-4 py-3 mb-3">
            <p className="text-gray-400 text-xs mb-1">Detaylar *</p>
            <textarea
              value={form.aciklama}
              onChange={e => setForm(p => ({ ...p, aciklama: e.target.value }))}
              placeholder="Probleminizi ve beklentilerinizi açıklayın..."
              rows={4}
              className="w-full text-gray-800 text-sm outline-none bg-transparent resize-none"
            />
          </div>

          {/* Bütçe */}
          <div className="bg-white border border-gray-100 rounded-2xl px-4 py-3 mb-3">
            <p className="text-gray-400 text-xs mb-1">Bütçe (isteğe bağlı)</p>
            <input
              value={form.butce}
              onChange={e => setForm(p => ({ ...p, butce: e.target.value }))}
              placeholder="Örn: 500 - 1.000 TL"
              className="w-full text-gray-800 text-sm font-medium outline-none bg-transparent"
            />
          </div>

          {/* Konum */}
          <div className="bg-white border border-gray-100 rounded-2xl px-4 py-3 mb-6">
            <p className="text-gray-400 text-xs mb-1">Konum</p>
            <input
              value={form.konum}
              onChange={e => setForm(p => ({ ...p, konum: e.target.value }))}
              className="w-full text-gray-800 text-sm font-medium outline-none bg-transparent"
            />
          </div>

          <button
            onClick={gonder}
            disabled={!form.baslik || !form.kategori || !form.aciklama}
            className="w-full py-4 rounded-2xl flex items-center justify-center gap-2 text-sm font-bold active:scale-95 transition-all disabled:opacity-40"
            style={{ background: '#111827', color: '#ffffff' }}
          >
            <Send size={15} strokeWidth={2} />
            Talebi Yayınla
          </button>
        </div>

      </div>
    </div>
  )
}
