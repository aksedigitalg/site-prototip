import { useState, useEffect, useRef } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

// ─── Story Viewer (tam ekran overlay) ────────────────────────────────────────
function StoryViewer({ stories, startIndex, onClose }) {
  const [idx, setIdx]         = useState(startIndex)
  const [progress, setProgress] = useState(0)
  const timerRef              = useRef(null)

  const story = stories[idx]

  useEffect(() => {
    setProgress(0)
    if (timerRef.current) clearInterval(timerRef.current)

    timerRef.current = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          // sonrakine geç
          if (idx < stories.length - 1) {
            setIdx(i => i + 1)
            return 0
          } else {
            clearInterval(timerRef.current)
            onClose()
            return 100
          }
        }
        return prev + 2 // 50 adım → ~2.5sn
      })
    }, 50)

    return () => clearInterval(timerRef.current)
  }, [idx])

  function prev() { if (idx > 0) { setIdx(idx - 1); setProgress(0) } }
  function next() {
    if (idx < stories.length - 1) { setIdx(idx + 1); setProgress(0) }
    else onClose()
  }

  return (
    <div
      className="fixed inset-0 z-[200] flex items-stretch justify-center"
      style={{ background: '#000' }}
    >
      <div className="relative w-full max-w-[430px] flex flex-col"
        style={{ background: story.renk || '#111827' }}>

        {/* Progress bar'lar */}
        <div className="flex gap-1 px-3 pt-10 pb-3 z-10">
          {stories.map((_, i) => (
            <div key={i} className="flex-1 h-0.5 rounded-full overflow-hidden bg-white/30">
              <div
                className="h-full bg-white rounded-full transition-none"
                style={{ width: i < idx ? '100%' : i === idx ? `${progress}%` : '0%' }}
              />
            </div>
          ))}
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-4 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-xl">
              {story.emoji}
            </div>
            <span className="text-white text-sm font-bold">{story.kullanici}</span>
          </div>
          <button onClick={onClose} className="w-9 h-9 flex items-center justify-center rounded-full bg-white/20">
            <X size={18} strokeWidth={2} className="text-white" />
          </button>
        </div>

        {/* İçerik */}
        <div className="flex-1 flex flex-col items-center justify-center px-6">
          <div className="text-[100px] mb-8">{story.icerik}</div>
          <h2 className="text-white text-2xl font-extrabold text-center leading-snug mb-4">
            {story.baslik}
          </h2>
          <p className="text-white/70 text-sm text-center leading-relaxed">
            {story.aciklama}
          </p>
        </div>

        {/* CTA */}
        <div className="px-5 pb-12">
          <button className="w-full py-4 rounded-2xl bg-white text-gray-900 text-sm font-bold active:scale-95 transition-transform">
            Detayları Gör
          </button>
        </div>

        {/* Dokunma alanları */}
        <div className="absolute inset-0 flex pointer-events-none" style={{ top: '100px' }}>
          <div className="flex-1 pointer-events-auto" onClick={prev} />
          <div className="flex-1 pointer-events-auto" onClick={next} />
        </div>
      </div>
    </div>
  )
}

// ─── Story Bar ────────────────────────────────────────────────────────────────
export default function StoryBar({ stories, markalar }) {
  const [acik,  setAcik]  = useState(null)  // açık story index'i
  const [gorulen, setGorulen] = useState([])

  if (!stories || stories.length === 0) return null

  function storyAc(i) {
    setAcik(i)
    setGorulen(prev => [...new Set([...prev, stories[i].id])])
  }

  return (
    <>
      {/* ── Story çemberleri ── */}
      <div className="flex gap-3 px-4 pt-4 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
        {stories.map((story, i) => {
          const goruldu = gorulen.includes(story.id)
          return (
            <button
              key={story.id}
              onClick={() => storyAc(i)}
              className="shrink-0 flex flex-col items-center gap-1.5 active:scale-95 transition-transform"
            >
              {/* Çember + gradient ring */}
              <div
                className="rounded-full p-[2.5px]"
                style={{
                  background: goruldu
                    ? '#d1d5db'
                    : 'linear-gradient(135deg, #f97316 0%, #ec4899 50%, #8b5cf6 100%)',
                }}
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center text-2xl border-2 border-white"
                  style={{ background: story.bg }}
                >
                  {story.emoji}
                </div>
              </div>
              <span className="text-gray-600 text-[10px] font-medium max-w-[60px] text-center leading-tight truncate">
                {story.kullanici}
              </span>
            </button>
          )
        })}
      </div>

      {/* ── Marka logoları ── */}
      {markalar && markalar.length > 0 && (
        <div className="flex gap-3 px-4 pt-3 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
          {markalar.map((marka, i) => (
            <button
              key={i}
              className="shrink-0 flex flex-col items-center gap-1.5 active:scale-95 transition-transform"
            >
              <div
                className="w-14 h-14 rounded-[16px] flex items-center justify-center overflow-hidden"
                style={{ background: marka.bg }}
              >
                {marka.logoType === 'text' ? (
                  <span
                    className="font-black text-[11px] text-center leading-tight px-1"
                    style={{ color: marka.renk }}
                  >
                    {marka.textEmoji || marka.isim.slice(0, 3).toUpperCase()}
                  </span>
                ) : (
                  <span className="text-2xl">{marka.emoji}</span>
                )}
              </div>
              <span className="text-gray-500 text-[10px] font-medium max-w-[60px] text-center leading-tight truncate">
                {marka.isim}
              </span>
            </button>
          ))}
        </div>
      )}

      {/* ── Story Viewer overlay ── */}
      {acik !== null && (
        <StoryViewer
          stories={stories}
          startIndex={acik}
          onClose={() => setAcik(null)}
        />
      )}
    </>
  )
}
