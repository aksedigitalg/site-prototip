import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Paperclip, Pen, Mic, ArrowUp, Sparkles } from 'lucide-react'
import { ONERI_SORULAR, AI_YANIT_SABLONLARI, VARSAYILAN_YANIT, AI_ILKmesaj } from '../data/mockAI'

// ─── Mesh gradient (resme birebir renk eşleşmesi) ─────────────────────────────
const MESH_BG = [
  'radial-gradient(ellipse at 15% 8%,  rgba(244,168,152,0.92) 0%, transparent 44%)',
  'radial-gradient(ellipse at 85% 6%,  rgba(148,212,170,0.82) 0%, transparent 44%)',
  'radial-gradient(ellipse at 50% 44%, rgba(196,160,216,0.72) 0%, transparent 54%)',
  'radial-gradient(ellipse at 12% 76%, rgba(176,160,208,0.62) 0%, transparent 44%)',
  'radial-gradient(ellipse at 88% 80%, rgba(232,212,168,0.72) 0%, transparent 50%)',
  'radial-gradient(ellipse at 50% 90%, rgba(245,225,195,0.65) 0%, transparent 38%)',
  '#ede6de',
].join(', ')

// ─── Yardımcılar ──────────────────────────────────────────────────────────────
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
          className="w-2 h-2 rounded-full bg-white/60 animate-bounce"
          style={{ animationDelay: `${i * 0.18}s` }}
        />
      ))}
    </div>
  )
}

// ─── Ana Sayfa ────────────────────────────────────────────────────────────────
export default function GebzemAI() {
  const navigate = useNavigate()
  const raw  = localStorage.getItem('sehir_user')
  const user = raw ? JSON.parse(raw) : null

  const [phase,        setPhase]        = useState('welcome') // 'welcome' | 'chat'
  const [messages,     setMessages]     = useState([
    { id: 1, role: 'ai', text: AI_ILKmesaj },
  ])
  const [userQuestion, setUserQuestion] = useState('')
  const [input,        setInput]        = useState('')
  const [isTyping,     setIsTyping]     = useState(false)
  const messagesEndRef = useRef(null)
  const textareaRef    = useRef(null)

  useEffect(() => {
    if (phase === 'chat') {
      setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 100)
    }
  }, [messages, phase])

  function gonder(metin) {
    const soru = (metin || input).trim()
    if (!soru) return

    setUserQuestion(soru)
    setPhase('chat')
    setInput('')

    const userMsg = { id: Date.now(), role: 'user', text: soru }
    setMessages(prev => [...prev, userMsg])
    setIsTyping(true)

    setTimeout(() => {
      const yanit = getAIResponse(soru)
      setMessages(prev => [...prev, { id: Date.now() + 1, role: 'ai', text: yanit }])
      setIsTyping(false)
    }, 1600)
  }

  function handleKey(e) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); gonder() }
  }

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden" style={{ background: MESH_BG }}>

      {/* ── Header ── */}
      <div className="flex items-center justify-between px-5 pt-12 pb-2 relative z-10">
        <button
          onClick={() => phase === 'chat' ? setPhase('welcome') : navigate(-1)}
          className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center active:scale-90 transition-transform"
        >
          <ArrowLeft size={18} strokeWidth={2} className="text-white" />
        </button>

        <div className="flex items-center gap-1.5 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full">
          <Sparkles size={13} className="text-white" />
          <span className="text-white text-xs font-bold tracking-wide">GebzemAI</span>
        </div>

        <div className="w-9" />
      </div>

      {/* ────────────────── KARŞILAMA EKRANI ────────────────── */}
      {phase === 'welcome' && (
        <div className="flex-1 flex flex-col px-5 pt-6 pb-48 relative z-10">

          {/* Selamlama */}
          <p className="text-white/80 text-base font-medium">
            Merhaba, {user?.firstName || 'Hoş geldin'}! 👋
          </p>

          {/* Ana soru */}
          <h1 className="text-white text-[2rem] font-extrabold leading-tight mt-3">
            Şehrinizle ilgili ne öğrenmek istersiniz?{' '}
            <span style={{ textShadow: '0 0 12px rgba(255,255,255,0.6)' }}>✦</span>
          </h1>

          {/* Öneri balonları */}
          <div className="mt-8 space-y-3 flex-1">
            {ONERI_SORULAR.map((soru, i) => (
              <button
                key={i}
                onClick={() => gonder(soru)}
                className="block text-left px-4 py-3.5 bg-white/85 backdrop-blur-sm rounded-2xl shadow-sm active:scale-[0.97] transition-transform"
                style={{
                  marginLeft: i % 2 === 1 ? '32px' : '0px',
                  maxWidth: '78%',
                }}
              >
                <span className="text-gray-800 text-sm font-semibold leading-snug">{soru}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ────────────────── SOHBET EKRANI ────────────────── */}
      {phase === 'chat' && (
        <div className="flex-1 flex flex-col relative z-10 overflow-hidden">

          {/* Kullanıcının sorusu — büyük başlık */}
          <div className="px-5 pt-4 pb-4 shrink-0">
            <p className="text-white/70 text-xs font-semibold tracking-widest uppercase mb-2">Talebiniz</p>
            <h2 className="text-white text-2xl font-extrabold italic leading-snug line-clamp-3">
              {userQuestion}
            </h2>
          </div>

          {/* Mesajlar */}
          <div
            className="flex-1 overflow-y-auto px-4 pb-4 space-y-3"
            style={{ scrollbarWidth: 'none' }}
          >
            {messages.filter(m => m.role === 'ai').map(m => (
              <div key={m.id} className="flex gap-2.5 items-start">
                {/* AI Avatar */}
                <div className="w-7 h-7 rounded-full bg-gray-900/80 backdrop-blur-sm flex items-center justify-center shrink-0 mt-0.5">
                  <Sparkles size={13} className="text-white" />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-white/70 text-xs font-semibold mb-1.5">GebzemAI</p>
                  <div className="bg-white/20 backdrop-blur-md rounded-2xl rounded-tl-sm px-4 py-3.5 shadow-sm">
                    <p className="text-white text-sm leading-relaxed whitespace-pre-wrap">
                      {m.text}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {/* Yazıyor animasyonu */}
            {isTyping && (
              <div className="flex gap-2.5 items-start">
                <div className="w-7 h-7 rounded-full bg-gray-900/80 backdrop-blur-sm flex items-center justify-center shrink-0">
                  <Sparkles size={13} className="text-white" />
                </div>
                <div className="bg-white/20 backdrop-blur-md rounded-2xl rounded-tl-sm overflow-hidden">
                  <TypingDots />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>
      )}

      {/* ────────────────── ALT INPUT ALANI (her iki state'de) ────────────────── */}
      <div className="fixed bottom-0 left-0 right-0 flex justify-center z-50">
        <div className="w-full max-w-[430px] px-4 pb-8 pt-2">

          {/* Kredi çubuğu */}
          <div
            className="flex items-center justify-between px-4 py-1.5 rounded-t-2xl"
            style={{ background: 'rgba(255,255,255,0.18)', backdropFilter: 'blur(12px)' }}
          >
            <span className="text-white/80 text-xs">
              <span className="font-bold text-white">245</span> Kredi Kaldı
            </span>
            <button className="text-xs font-bold text-white/90 underline underline-offset-2">
              Yükselt
            </button>
          </div>

          {/* Input kutusu */}
          <div
            className="rounded-b-2xl overflow-hidden px-4 pt-3 pb-3.5"
            style={{
              background: 'rgba(255,255,255,0.22)',
              backdropFilter: 'blur(16px)',
              boxShadow: '0 8px 32px rgba(180,140,200,0.25)',
              border: '1.5px solid rgba(255,255,255,0.35)',
            }}
          >
            <textarea
              ref={textareaRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Sorunuzu yazın..."
              rows={2}
              className="w-full bg-transparent text-white placeholder-white/50 text-sm resize-none outline-none leading-relaxed"
              style={{ caretColor: 'white' }}
            />

            <div className="flex items-center justify-between mt-2">
              {/* Sol ikonlar */}
              <div className="flex items-center gap-3">
                <button className="text-white/60 active:text-white transition-colors">
                  <Paperclip size={18} strokeWidth={1.5} />
                </button>
                <button className="text-white/60 active:text-white transition-colors">
                  <Pen size={16} strokeWidth={1.5} />
                </button>
                <button className="text-white/60 active:text-white transition-colors">
                  <Mic size={17} strokeWidth={1.5} />
                </button>
              </div>

              {/* Gönder butonu */}
              <button
                onClick={() => gonder()}
                disabled={!input.trim() && phase === 'welcome'}
                className="w-9 h-9 rounded-full flex items-center justify-center active:scale-90 transition-all"
                style={{
                  background: input.trim()
                    ? 'rgba(30,20,40,0.85)'
                    : 'rgba(255,255,255,0.20)',
                }}
              >
                <ArrowUp
                  size={17}
                  strokeWidth={2.5}
                  className={input.trim() ? 'text-white' : 'text-white/40'}
                />
              </button>
            </div>
          </div>

        </div>
      </div>

    </div>
  )
}
