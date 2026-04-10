import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft, ArrowUp, Search } from 'lucide-react'
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
    <div className="flex items-center gap-1.5 px-4 py-3">
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

const QUICK_CHIPS = [
  'Yakınımdaki restoranlar', 'Nöbetçi eczane nerede', 'Hava durumu nasıl', 'Bu hafta etkinlikler',
  'En iyi kafeler', 'Düğün salonu öner', 'Güvenilir elektrikçi bul', 'Yakın otopark', 'En yakın ATM', 'Benzinlik nerede',
  'Kuaför önerisi', 'Spor salonu yakında', 'Veteriner kliniği', 'Uygun otel bul',
]

export default function GebzemAI() {
  const navigate = useNavigate()
  const raw = localStorage.getItem('sehir_user')
  const user = raw ? JSON.parse(raw) : null

  const [phase, setPhase] = useState('welcome')
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [mode, setMode] = useState('ai')
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
    <div className="flex flex-col" style={{ height: '100dvh', background: '#ffffff' }}>

      {/* Header */}
      <div className="shrink-0 flex items-center justify-between" style={{ paddingTop: 15, paddingBottom: 10, paddingLeft: 15, paddingRight: 15 }}>
        <button onClick={() => navigate('/home')} className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center active:scale-90 transition-transform">
          <ChevronLeft size={20} strokeWidth={2} className="text-gray-700" />
        </button>
        <span className="text-gray-900 text-sm font-bold">GebzemAI</span>
        <div className="w-10" />
      </div>

      {/* Welcome */}
      {phase === 'welcome' && (
        <div className="flex-1 flex flex-col" style={{ paddingLeft: 15, paddingRight: 15 }}>
          <div className="flex flex-col items-center justify-center" style={{ flex: '0 0 auto', paddingTop: '25vh' }}>
            <h1 className="text-gray-900 text-[22px] font-bold text-center leading-snug">
              Merhaba {user?.firstName},<br />Bugün ne arıyorsun?
            </h1>
          </div>

          {/* Chip grid — 3 satır, yatay scroll */}
          <div style={{ marginTop: 40, marginLeft: -15, marginRight: -15 }}>
            {[
              QUICK_CHIPS.slice(0, 4),
              QUICK_CHIPS.slice(4, 10),
              QUICK_CHIPS.slice(10, 14),
            ].map((row, ri) => (
              <div key={ri} className="flex justify-center gap-1.5 overflow-x-auto" style={{ scrollbarWidth: 'none', paddingLeft: 15, paddingRight: 15, marginBottom: 6 }}>
                {row.map((chip, ci) => (
                  <button
                    key={ci}
                    onClick={() => gonder(chip)}
                    className="shrink-0 rounded-full active:scale-95 transition-transform flex items-center justify-center"
                    style={{ background: '#f3f3f3', height: 32, paddingLeft: 14, paddingRight: 14 }}
                  >
                    <span className="text-gray-500 text-[11px] font-medium whitespace-nowrap leading-none">{chip}</span>
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Chat */}
      {phase === 'chat' && (
        <div className="flex-1 overflow-y-auto pt-2 space-y-4" style={{ scrollbarWidth: 'none', paddingBottom: 180, paddingLeft: 15, paddingRight: 15 }}>
          {messages.map(m =>
            m.role === 'user' ? (
              <div key={m.id} className="flex justify-end">
                <div className="max-w-[80%] rounded-2xl rounded-br-sm px-4 py-3" style={{ background: '#111827' }}>
                  <p className="text-white text-[14px] leading-relaxed">{m.text}</p>
                </div>
              </div>
            ) : (
              <div key={m.id} className="flex gap-3 items-start">
                <div className="w-8 h-8 rounded-full bg-gray-100 shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <div className="rounded-2xl rounded-bl-sm px-4 py-3" style={{ background: '#f5f5f5' }}>
                    <p className="text-gray-800 text-[14px] leading-relaxed whitespace-pre-wrap">{m.text}</p>
                  </div>
                </div>
              </div>
            )
          )}
          {isTyping && (
            <div className="flex gap-3 items-start">
              <div className="w-8 h-8 rounded-full bg-gray-100 shrink-0" />
              <div className="rounded-2xl rounded-bl-sm overflow-hidden" style={{ background: '#f5f5f5' }}>
                <TypingDots />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      )}

      {/* Alt alan */}
      <div className="shrink-0" style={{ paddingLeft: 15, paddingRight: 15, paddingBottom: 30 }}>
        <div className="rounded-2xl" style={{ background: '#f5f5f5' }}>
          <div className="flex items-center px-4" style={{ height: 44 }}>
            <textarea
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Aramaya başla..."
              rows={1}
              className="flex-1 bg-transparent text-gray-800 placeholder-gray-400 resize-none outline-none"
              style={{ maxHeight: 44, paddingTop: 13, fontSize: 12 }}
            />
          </div>
          <div className="flex items-center justify-between px-3 pb-2.5">
            <div className="flex items-center gap-1">
              <button
                onClick={() => setMode('ai')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full font-semibold transition-colors"
                style={{ fontSize: 11, background: mode === 'ai' ? '#e8e8e8' : 'transparent', color: '#374151' }}
              >
                <div className="w-2 h-2 rounded-full" style={{ background: '#f59e0b' }} />
                AI mode
              </button>
              <button
                onClick={() => setMode('standard')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full font-semibold transition-colors"
                style={{ fontSize: 11, background: mode === 'standard' ? '#e8e8e8' : 'transparent', color: '#374151' }}
              >
                <Search size={11} strokeWidth={2} className="text-gray-400" />
                Standard
              </button>
            </div>
            <button
              onClick={() => gonder()}
              disabled={!input.trim()}
              className="w-8 h-8 rounded-full flex items-center justify-center active:scale-90 transition-all"
              style={{ background: input.trim() ? '#111827' : '#d4d4d4' }}
            >
              <ArrowUp size={15} strokeWidth={2.5} className={input.trim() ? 'text-white' : 'text-gray-400'} />
            </button>
          </div>
        </div>
      </div>

    </div>
  )
}
