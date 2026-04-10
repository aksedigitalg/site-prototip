import { useState, useRef, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Send, Phone } from 'lucide-react'
import { KONUSMALAR } from '../data/mockMesajlar'

export default function MesajDetay() {
  const { id } = useParams()
  const navigate = useNavigate()
  const konusma = KONUSMALAR.find(k => k.id === parseInt(id))

  const [mesajlar, setMesajlar] = useState(konusma?.mesajlar || [])
  const [yeniMesaj, setYeniMesaj] = useState('')
  const altRef = useRef(null)

  useEffect(() => {
    altRef.current?.scrollIntoView()
  }, [mesajlar])

  if (!konusma) return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-gray-400 text-sm">Konuşma bulunamadı</p>
    </div>
  )

  function gonder() {
    const metin = yeniMesaj.trim()
    if (!metin) return
    const yeni = { id: Date.now(), gelen: false, metin, saat: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }) }
    setMesajlar(m => [...m, yeni])
    setYeniMesaj('')

    // Mock otomatik yanıt
    setTimeout(() => {
      setMesajlar(m => [...m, {
        id: Date.now() + 1,
        gelen: true,
        metin: 'Mesajınız alındı, en kısa sürede geri döneceğiz.',
        saat: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }),
      }])
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center">
        <div className="w-full max-w-[430px] bg-white/80 backdrop-blur-md border-b border-gray-100 px-4 py-3 flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="text-gray-500">
            <ArrowLeft size={20} strokeWidth={1.5} />
          </button>

<div className="flex-1 min-w-0">
            <p className="text-gray-800 text-sm font-bold leading-tight">{konusma.isletme.name}</p>
            <p className="text-gray-400 text-xs">{konusma.isletme.kategori}</p>
          </div>

          <a href="tel:05321112233" className="w-9 h-9 bg-gray-100 rounded-xl flex items-center justify-center shrink-0">
            <Phone size={16} strokeWidth={1.5} className="text-gray-600" />
          </a>
        </div>
      </header>

      {/* Mesajlar */}
      <div className="flex-1 pt-[57px] pb-20 px-4 overflow-y-auto">
        <div className="py-4 space-y-2">
          {mesajlar.map(m => (
            <div key={m.id} className={`flex ${m.gelen ? 'justify-start' : 'justify-end'}`}>
              <div className={`max-w-[75%] ${m.gelen ? '' : 'items-end flex flex-col'}`}>
                <div
                  className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                    m.gelen
                      ? 'bg-white border border-gray-100 text-gray-800 rounded-tl-sm'
                      : 'bg-gray-900 text-white rounded-tr-sm'
                  }`}
                >
                  {m.metin}
                </div>
                <span className="text-gray-400 text-xs mt-1 px-1">{m.saat}</span>
              </div>
            </div>
          ))}
          <div ref={altRef} />
        </div>
      </div>

      {/* Input */}
      <div className="fixed bottom-0 left-0 right-0 z-40 flex justify-center">
        <div className="w-full max-w-[430px] bg-white border-t border-gray-100 px-4 py-3 flex items-center gap-3">
          <textarea
            value={yeniMesaj}
            onChange={e => setYeniMesaj(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); gonder() } }}
            placeholder="Mesaj yaz..."
            rows={1}
            className="flex-1 bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 text-sm text-gray-800 placeholder-gray-400 resize-none outline-none leading-relaxed max-h-24"
            style={{ lineHeight: '1.4' }}
          />
          <button
            onClick={gonder}
            disabled={!yeniMesaj.trim()}
            className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 active:scale-90 transition-all ${
              yeniMesaj.trim() ? 'bg-gray-900' : 'bg-gray-200'
            }`}
          >
            <Send size={16} strokeWidth={2} className={yeniMesaj.trim() ? 'text-white' : 'text-gray-400'} />
          </button>
        </div>
      </div>

    </div>
  )
}
