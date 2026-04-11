import { useState, useRef, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Heart, MessageCircle, Repeat2, Send, MoreHorizontal } from 'lucide-react'
import { SOSYAL_POSTLAR, SOSYAL_KULLANICILAR, SOSYAL_YORUMLAR } from '../../data/mockSosyal'

function zamanOnce(tarih) {
  const fark = Date.now() - new Date(tarih).getTime()
  const dk = Math.floor(fark / 60000)
  if (dk < 1) return 'şimdi'
  if (dk < 60) return `${dk}dk`
  const saat = Math.floor(dk / 60)
  if (saat < 24) return `${saat}sa`
  return `${Math.floor(saat / 24)}g`
}

export default function SosyalPostDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const post = SOSYAL_POSTLAR.find(p => p.id === parseInt(id))
  const kullanici = post ? SOSYAL_KULLANICILAR.find(k => k.id === post.kullaniciId) : null
  const yorumlar = SOSYAL_YORUMLAR[parseInt(id)] || []

  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(post?.begeniler.length || 0)
  const [yeniYorum, setYeniYorum] = useState('')
  const [ekYorumlar, setEkYorumlar] = useState([])
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [ekYorumlar])

  if (!post || !kullanici) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: '#000' }}>
      <p className="text-gray-500 text-sm">Gönderi bulunamadı</p>
    </div>
  )

  function yorumGonder() {
    const metin = yeniYorum.trim()
    if (!metin) return
    setEkYorumlar(prev => [...prev, { id: Date.now(), metin, tarih: new Date().toISOString() }])
    setYeniYorum('')
  }

  const tumYorumlar = [...yorumlar, ...ekYorumlar.map(y => ({
    ...y, kullaniciId: 0, begeniler: [], yanitlar: []
  }))]

  return (
    <div className="flex flex-col" style={{ height: '100dvh', background: '#000000' }}>

      {/* Header */}
      <div className="shrink-0 flex items-center justify-between" style={{ padding: '14px 16px 10px' }}>
        <button onClick={() => navigate(-1)} className="w-10 h-10 flex items-center justify-center">
          <ArrowLeft size={20} strokeWidth={2} className="text-white" />
        </button>
        <span className="text-white text-[15px] font-bold">Gönderi</span>
        <div className="w-10" />
      </div>

      {/* İçerik */}
      <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: 'none', paddingBottom: 80 }}>

        {/* Ana post */}
        <div style={{ borderBottom: '1px solid rgba(255,255,255,0.07)', padding: '12px 16px' }}>
          <div className="flex gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-lg shrink-0" style={{ background: kullanici.bg }}>
              {kullanici.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-white text-[14px] font-bold">{kullanici.kullaniciAdi}</span>
                <span className="text-gray-600 text-[13px]">{zamanOnce(post.tarih)}</span>
              </div>
              <p className="text-white text-[15px] leading-relaxed mt-2">{post.aciklama}</p>
              {post.etiketler.length > 0 && (
                <p className="text-blue-400 text-[13px] mt-1">{post.etiketler.map(e => `#${e}`).join(' ')}</p>
              )}
              {post.gradyan && (
                <div className="mt-3 rounded-xl overflow-hidden" style={{ background: post.gradyan, height: 200 }}>
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-5xl">{post.emoji}</span>
                  </div>
                </div>
              )}
              <div className="flex items-center gap-5 mt-3">
                <button onClick={() => { setLiked(!liked); setLikeCount(prev => liked ? prev - 1 : prev + 1) }} className="flex items-center gap-1.5">
                  <Heart size={18} strokeWidth={1.8} className={liked ? 'text-red-500' : 'text-gray-500'} fill={liked ? '#ef4444' : 'none'} />
                  <span className="text-gray-500 text-[12px]">{likeCount}</span>
                </button>
                <div className="flex items-center gap-1.5">
                  <MessageCircle size={18} strokeWidth={1.8} className="text-gray-500" />
                  <span className="text-gray-500 text-[12px]">{tumYorumlar.length}</span>
                </div>
                <Repeat2 size={18} strokeWidth={1.8} className="text-gray-500" />
                <Send size={16} strokeWidth={1.8} className="text-gray-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Yorumlar */}
        {tumYorumlar.map(yorum => {
          const yorumcu = yorum.kullaniciId === 0
            ? { kullaniciAdi: 'Sen', avatar: '👤', bg: '#374151' }
            : SOSYAL_KULLANICILAR.find(k => k.id === yorum.kullaniciId) || { kullaniciAdi: '?', avatar: '?', bg: '#333' }

          return (
            <div key={yorum.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <div className="flex gap-3" style={{ padding: '12px 16px' }}>
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm shrink-0" style={{ background: yorumcu.bg }}>
                  {yorumcu.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-white text-[13px] font-bold">{yorumcu.kullaniciAdi}</span>
                    <span className="text-gray-600 text-[12px]">{zamanOnce(yorum.tarih)}</span>
                  </div>
                  <p className="text-gray-300 text-[13px] leading-relaxed mt-0.5">{yorum.metin}</p>
                </div>
              </div>

              {yorum.yanitlar?.map(yanit => {
                const yanitci = SOSYAL_KULLANICILAR.find(k => k.id === yanit.kullaniciId) || { kullaniciAdi: '?', avatar: '?', bg: '#333' }
                return (
                  <div key={yanit.id} className="flex gap-3" style={{ padding: '8px 16px 12px 56px' }}>
                    <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs shrink-0" style={{ background: yanitci.bg }}>
                      {yanitci.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-white text-[12px] font-bold">{yanitci.kullaniciAdi}</span>
                        <span className="text-gray-600 text-[11px]">{zamanOnce(yanit.tarih)}</span>
                      </div>
                      <p className="text-gray-400 text-[12px] mt-0.5">{yanit.metin}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          )
        })}
        <div ref={bottomRef} />
      </div>

      {/* Yorum input */}
      <div className="shrink-0" style={{ borderTop: '1px solid rgba(255,255,255,0.08)', padding: '10px 16px 28px', background: '#000' }}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gray-700 shrink-0" />
          <div className="flex-1 flex items-center rounded-full" style={{ background: '#1a1a1a', height: 40, padding: '0 4px 0 16px' }}>
            <input
              value={yeniYorum}
              onChange={e => setYeniYorum(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') yorumGonder() }}
              placeholder="Yanıtla..."
              className="flex-1 bg-transparent text-white text-[13px] outline-none placeholder-gray-600"
            />
            <button
              onClick={yorumGonder}
              disabled={!yeniYorum.trim()}
              className="px-3 py-1.5 rounded-full text-[13px] font-semibold"
              style={{ color: yeniYorum.trim() ? '#22c55e' : '#374151' }}
            >
              Gönder
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
