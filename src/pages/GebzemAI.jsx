import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Mic, ArrowUp, Sparkles } from 'lucide-react'
import { ONERI_SORULAR, AI_YANIT_SABLONLARI, VARSAYILAN_YANIT } from '../data/mockAI'

function getAIResponse(text) {
  const lower = text.toLowerCase()
  for (const sablon of AI_YANIT_SABLONLARI) {
    if (sablon.keywords.some(k => lower.includes(k))) return sablon.yanit
  }
  return VARSAYILAN_YANIT
}

function TypingDots() {
  return (
    <div className="flex items-center gap-1 px-4 py-3">
      {[0, 1, 2].map(i => (
        <span
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-gray-300 animate-bounce"
          style={{ animationDelay: `${i * 0.18}s` }}
        />
      ))}
    </div>
  )
}

export default function GebzemAI() {
  const navigate = useNavigate()
  const raw  = localStorage.getItem('sehir_user')
  const user = raw ? JSON.parse(raw) : null

  const [phase,    setPhase]    = useState('welcome')
  const [messages, setMessages] = useState([])
  const [input,    setInput]    = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    if (phase === 'chat') {
      setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 120)
    }
  }, [messages, phase])

  function gonder(metin) {
    const soru = (metin || input).trim()
    if (!soru) return

    setPhase('chat')
    setInput('')

    setMessages(prev => [...prev, { id: Date.now(), role: 'user', text: soru }])
    setIsTyping(true)

    setTimeout(() => {
      setMessages(prev => [...prev, { id: Date.now() + 1, role: 'ai', text: getAIResponse(soru) }])
      setIsTyping(false)
    }, 1500)
  }

  function handleKey(e) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); gonder() }
  }

  return (
    <div
      className="flex flex-col bg-white"
      style={{ height: '100dvh', overscrollBehavior: 'none' }}
    >

      {/* ── Header ── */}
      <div className="shrink-0 flex items-center justify-between px-4 pt-12 pb-3 bg-white border-b border-gray-100">
        <button
          onClick={() => navigate(-1)}
          className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center active:scale-90 transition-transform"
        >
          <ArrowLeft size={18} strokeWidth={2} className="text-gray-700" />
        </button>

        <div className="flex items-center gap-1.5">
          <Sparkles size={14} strokeWidth={2} className="text-gray-800" />
          <span className="text-gray-900 text-sm font-bold tracking-wide">GebzemAI</span>
        </div>

        <div className="w-9" />
      </div>

      {/* ── Karşılama ── */}
      {phase === 'welcome' && (
        <div className="flex-1 flex flex-col px-5 pt-8">
          <p className="text-gray-400 text-sm font-medium">
            Merhaba, {user?.firstName || 'Hoş geldin'}!
          </p>
          <h1 className="text-gray-900 text-2xl font-extrabold leading-snug mt-2">
            Şehrinizle ilgili<br />ne öğrenmek istersiniz?
          </h1>
        </div>
      )}

      {/* ── Sohbet mesajları ── */}
      {phase === 'chat' && (
        <div
          className="flex-1 overflow-y-auto px-4 pt-4 space-y-4"
          style={{ scrollbarWidth: 'none', overscrollBehavior: 'contain', paddingBottom: '168px' }}
        >
          {messages.map(m =>
            m.role === 'user' ? (
              <div key={m.id} className="flex justify-end">
                <div className="max-w-[78%] bg-gray-900 rounded-2xl rounded-tr-sm px-4 py-3 shadow-sm">
                  <p className="text-white text-sm leading-relaxed">{m.text}</p>
                </div>
              </div>
            ) : (
              <div key={m.id} className="flex gap-2.5 items-start">
                <div className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center shrink-0 mt-0.5">
                  <Sparkles size={12} strokeWidth={2} className="text-gray-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-gray-400 text-xs font-semibold mb-1.5">GebzemAI</p>
                  <div className="bg-gray-50 border border-gray-100 rounded-2xl rounded-tl-sm px-4 py-3.5 shadow-sm">
                    <p className="text-gray-800 text-sm leading-relaxed whitespace-pre-wrap">{m.text}</p>
                  </div>
                </div>
              </div>
            )
          )}

          {isTyping && (
            <div className="flex gap-2.5 items-start">
              <div className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                <Sparkles size={12} strokeWidth={2} className="text-gray-600" />
              </div>
              <div className="bg-gray-50 border border-gray-100 rounded-2xl rounded-tl-sm overflow-hidden shadow-sm">
                <TypingDots />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      )}

      {/* ── Alt alan (sabit) ── */}
      <div className="fixed bottom-0 left-0 right-0 flex justify-center z-50">
        <div className="w-full max-w-[430px] bg-white border-t border-gray-100" style={{ boxShadow: '0 -4px 24px rgba(0,0,0,0.06)' }}>

          {/* Öneri chips — yatay scroll */}
          <div
            className="flex gap-2 px-4 pt-3 pb-2 overflow-x-auto"
            style={{ scrollbarWidth: 'none' }}
          >
            {ONERI_SORULAR.map((soru, i) => (
              <button
                key={i}
                onClick={() => gonder(soru)}
                className="shrink-0 px-3 py-1.5 bg-gray-100 rounded-full active:bg-gray-200 transition-colors"
              >
                <span className="text-gray-600 text-xs font-medium whitespace-nowrap">{soru}</span>
              </button>
            ))}
          </div>

          {/* Input kutusu */}
          <div className="px-4 pb-8 pt-1">
            <div
              className="flex items-end gap-3 bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3"
              style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}
            >
              <textarea
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Sorunuzu yazın..."
                rows={1}
                className="flex-1 bg-transparent text-gray-800 placeholder-gray-400 text-sm resize-none outline-none leading-relaxed"
                style={{ maxHeight: '100px' }}
              />
              <div className="flex items-center gap-2 shrink-0 mb-0.5">
                <button className="text-gray-400 active:text-gray-600 transition-colors">
                  <Mic size={17} strokeWidth={1.5} />
                </button>
                <button
                  onClick={() => gonder()}
                  disabled={!input.trim()}
                  className="w-8 h-8 rounded-full flex items-center justify-center active:scale-90 transition-all"
                  style={{ background: input.trim() ? '#111827' : '#e5e7eb' }}
                >
                  <ArrowUp
                    size={15}
                    strokeWidth={2.5}
                    className={input.trim() ? 'text-white' : 'text-gray-400'}
                  />
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  )
}
