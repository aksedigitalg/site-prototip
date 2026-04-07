import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { GRADYANLAR, POPULER_EMOJILER } from '../../data/mockSosyal'

export default function SosyalPaylasim() {
  const navigate = useNavigate()
  const [gradyan, setGradyan] = useState(GRADYANLAR[0].css)
  const [emoji, setEmoji] = useState('😊')
  const [aciklama, setAciklama] = useState('')
  const [etiketler, setEtiketler] = useState('')

  function paylas() {
    if (!aciklama.trim()) return
    const yeniPost = {
      id: Date.now(),
      kullaniciId: 0,
      gradyan,
      emoji,
      aciklama: aciklama.trim(),
      etiketler: etiketler.trim().split(/\s+/).filter(e => e).map(e => e.replace('#', '')),
      begeniler: [],
      yorumSayisi: 0,
      tarih: new Date().toISOString(),
    }
    const mevcut = JSON.parse(localStorage.getItem('sehir_sosyal_postlar') || '[]')
    localStorage.setItem('sehir_sosyal_postlar', JSON.stringify([yeniPost, ...mevcut]))
    navigate('/sosyal')
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center backdrop-blur-md" style={{ background: 'rgba(255,255,255,0.9)' }}>
        <div className="w-full max-w-[430px] flex items-center justify-between" style={{ padding: '10px 20px', height: 56 }}>
          <button onClick={() => navigate(-1)}>
            <ArrowLeft size={20} strokeWidth={2} className="text-gray-900" />
          </button>
          <h1 className="text-gray-900 text-base font-bold">Yeni Gönderi</h1>
          <button onClick={paylas} className="text-blue-500 text-sm font-bold">Paylaş</button>
        </div>
      </header>

      <div style={{ paddingTop: 72, paddingBottom: 40, paddingLeft: 20, paddingRight: 20 }}>

        {/* Önizleme */}
        <div className="w-full rounded-2xl flex items-center justify-center mb-6" style={{ background: gradyan, aspectRatio: '1/1' }}>
          <span className="text-8xl">{emoji}</span>
        </div>

        {/* Gradient seçici */}
        <p className="text-gray-900 text-sm font-semibold mb-2">Arka Plan</p>
        <div className="flex gap-2 overflow-x-auto mb-5" style={{ scrollbarWidth: 'none' }}>
          {GRADYANLAR.map(g => (
            <button
              key={g.id}
              onClick={() => setGradyan(g.css)}
              className="shrink-0 w-10 h-10 rounded-full"
              style={{ background: g.css, border: gradyan === g.css ? '3px solid #111827' : '3px solid transparent' }}
            />
          ))}
        </div>

        {/* Emoji seçici */}
        <p className="text-gray-900 text-sm font-semibold mb-2">Emoji</p>
        <div className="grid grid-cols-8 gap-2 mb-5">
          {POPULER_EMOJILER.map(e => (
            <button
              key={e}
              onClick={() => setEmoji(e)}
              className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
              style={{ background: emoji === e ? '#f3f4f6' : 'transparent', border: emoji === e ? '2px solid #d1d5db' : '2px solid transparent' }}
            >
              {e}
            </button>
          ))}
        </div>

        {/* Açıklama */}
        <p className="text-gray-900 text-sm font-semibold mb-2">Açıklama</p>
        <textarea
          value={aciklama}
          onChange={e => setAciklama(e.target.value)}
          placeholder="Ne düşünüyorsun?"
          className="w-full bg-gray-50 rounded-xl px-4 py-3 text-sm outline-none resize-none mb-4"
          rows={3}
        />

        {/* Etiketler */}
        <p className="text-gray-900 text-sm font-semibold mb-2">Etiketler</p>
        <input
          type="text"
          value={etiketler}
          onChange={e => setEtiketler(e.target.value)}
          placeholder="#gebze #gunluk #hayat"
          className="w-full bg-gray-50 rounded-xl px-4 py-3 text-sm outline-none mb-6"
        />

        {/* Paylaş butonu */}
        <button
          onClick={paylas}
          className="w-full bg-gray-900 text-white rounded-xl py-3.5 text-sm font-bold active:scale-[0.98] transition-transform"
        >
          Paylaş
        </button>
      </div>
    </div>
  )
}
