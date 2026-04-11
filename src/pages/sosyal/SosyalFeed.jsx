import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Heart, MessageCircle, Repeat2, Send, MoreHorizontal, Plus, Image, Film, Hash } from 'lucide-react'
import { SOSYAL_POSTLAR, SOSYAL_KULLANICILAR, SOSYAL_HIKAYELER } from '../../data/mockSosyal'
import SosyalNav from '../../components/SosyalNav'

function zamanOnce(tarih) {
  const fark = Date.now() - new Date(tarih).getTime()
  const dk = Math.floor(fark / 60000)
  if (dk < 1) return 'şimdi'
  if (dk < 60) return `${dk}dk`
  const saat = Math.floor(dk / 60)
  if (saat < 24) return `${saat}sa`
  const gun = Math.floor(saat / 24)
  return `${gun}g`
}

function PostCard({ post, kullanici, navigate }) {
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(post.begeniler.length)

  function handleLike() {
    setLiked(!liked)
    setLikeCount(prev => liked ? prev - 1 : prev + 1)
  }

  return (
    <div style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
      <div className="flex gap-3" style={{ padding: '16px 16px 12px' }}>
        {/* Avatar */}
        <button onClick={() => navigate(`/sosyal/profil/${kullanici.id}`)} className="shrink-0">
          <div className="w-10 h-10 rounded-full flex items-center justify-center text-lg" style={{ background: kullanici.bg }}>
            {kullanici.avatar}
          </div>
        </button>

        {/* İçerik */}
        <div className="flex-1 min-w-0">
          {/* Üst: isim + zaman + more */}
          <div className="flex items-center gap-2">
            <button onClick={() => navigate(`/sosyal/profil/${kullanici.id}`)}>
              <span className="text-white text-[14px] font-bold">{kullanici.kullaniciAdi}</span>
            </button>
            <span className="text-gray-600 text-[13px]">{zamanOnce(post.tarih)}</span>
            <div className="flex-1" />
            <MoreHorizontal size={16} className="text-gray-600" />
          </div>

          {/* Metin */}
          <p className="text-white text-[14px] leading-relaxed mt-1">{post.aciklama}</p>

          {/* Etiketler */}
          {post.etiketler.length > 0 && (
            <p className="text-blue-400 text-[13px] mt-1">
              {post.etiketler.map(e => `#${e}`).join(' ')}
            </p>
          )}

          {/* Fotoğraf */}
          {post.tip === 'foto' && (
            <div className="mt-3 rounded-xl overflow-hidden bg-gray-800" style={{ height: 220 }}>
              <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&auto=format" alt="" className="w-full h-full object-cover" />
            </div>
          )}

          {/* Video */}
          {post.tip === 'video' && (
            <div className="mt-3 rounded-xl overflow-hidden bg-gray-800 relative flex items-center justify-center" style={{ height: 220 }}>
              <img src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&auto=format" alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.6)' }}>
                  <div style={{ width: 0, height: 0, borderTop: '8px solid transparent', borderBottom: '8px solid transparent', borderLeft: '14px solid white', marginLeft: 2 }} />
                </div>
              </div>
            </div>
          )}

          {/* Aksiyonlar */}
          <div className="flex items-center gap-5 mt-3">
            <button onClick={handleLike} className="flex items-center gap-1.5">
              <Heart size={18} strokeWidth={1.8} className={liked ? 'text-red-500' : 'text-gray-500'} fill={liked ? '#ef4444' : 'none'} />
              {likeCount > 0 && <span className="text-gray-500 text-[12px]">{likeCount}</span>}
            </button>
            <button onClick={() => navigate(`/sosyal/post/${post.id}`)} className="flex items-center gap-1.5">
              <MessageCircle size={18} strokeWidth={1.8} className="text-gray-500" />
              {post.yorumSayisi > 0 && <span className="text-gray-500 text-[12px]">{post.yorumSayisi}</span>}
            </button>
            <button>
              <Repeat2 size={18} strokeWidth={1.8} className="text-gray-500" />
            </button>
            <button>
              <Send size={16} strokeWidth={1.8} className="text-gray-500" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function SosyalFeed() {
  const navigate = useNavigate()
  const raw = localStorage.getItem('sehir_user')
  const user = raw ? JSON.parse(raw) : null

  const [storyViewer, setStoryViewer] = useState(null)
  const [composerOpen, setComposerOpen] = useState(false)
  const [composerText, setComposerText] = useState('')
  const postlar = [...SOSYAL_POSTLAR].sort((a, b) => new Date(b.tarih) - new Date(a.tarih))

  return (
    <div className="min-h-screen" style={{ background: '#000000' }}>

      {/* Stories */}
      <div className="flex gap-3 overflow-x-auto" style={{ scrollbarWidth: 'none', padding: '14px 16px 12px' }}>
        {/* Ekle */}
        <button onClick={() => navigate('/sosyal/paylasim')} className="shrink-0 flex flex-col items-center gap-1.5">
          <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ border: '1.5px dashed rgba(255,255,255,0.2)' }}>
            <Plus size={22} strokeWidth={1.5} className="text-gray-500" />
          </div>
          <span className="text-gray-500 text-[11px]">Ekle</span>
        </button>
        {SOSYAL_HIKAYELER.map(story => (
          <button key={story.id} onClick={() => setStoryViewer(story)} className="shrink-0 flex flex-col items-center gap-1.5">
            <div className="rounded-full p-[2px]" style={{ background: 'linear-gradient(135deg, #22c55e, #16a34a)' }}>
              <div className="w-[60px] h-[60px] rounded-full" style={{ background: story.bg, border: '2px solid #000' }} />
            </div>
            <span className="text-gray-400 text-[11px] w-16 text-center truncate">{story.kullanici}</span>
          </button>
        ))}
      </div>

      {/* Composer */}
      <div style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <div className="flex gap-3" style={{ padding: '12px 16px' }}>
          <div className="w-10 h-10 rounded-full bg-gray-700 shrink-0" />
          <div className="flex-1">
            <p className="text-white text-[14px] font-bold">Yavuz Demir</p>
            {composerOpen ? (
              <textarea
                autoFocus
                value={composerText}
                onChange={e => setComposerText(e.target.value)}
                onBlur={() => { if (!composerText.trim()) setComposerOpen(false) }}
                placeholder="Ne düşünüyorsun?"
                className="w-full bg-transparent text-white text-[14px] outline-none placeholder-gray-600 resize-none mt-1"
                style={{ minHeight: 80 }}
              />
            ) : (
              <button onClick={() => setComposerOpen(true)} className="w-full text-left mt-1">
                <p className="text-gray-600 text-[14px]">Ne düşünüyorsun?</p>
              </button>
            )}
            <div className="flex items-center gap-4 mt-3">
              <Image size={18} strokeWidth={1.8} className="text-gray-600" />
              <Film size={18} strokeWidth={1.8} className="text-gray-600" />
              <Hash size={18} strokeWidth={1.8} className="text-gray-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Feed — 3 gönderi: yazı, fotoğraf, video */}
      <div style={{ paddingBottom: 80 }}>
        {[
          { ...postlar[0], tip: 'yazi' },
          { ...postlar[1], tip: 'foto' },
          { ...postlar[2], tip: 'video' },
        ].map(post => {
          const kullanici = SOSYAL_KULLANICILAR.find(k => k.id === post.kullaniciId)
          if (!kullanici) return null
          return <PostCard key={post.id} post={post} kullanici={kullanici} navigate={navigate} />
        })}
      </div>

      {/* Story Viewer */}
      {storyViewer && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center" style={{ background: storyViewer.renk }}>
          <button onClick={() => setStoryViewer(null)} className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.3)' }}>
            <span className="text-white text-lg">✕</span>
          </button>
          <div className="absolute top-5 left-5 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-xl" style={{ background: 'rgba(0,0,0,0.2)' }}>
              {storyViewer.emoji}
            </div>
            <p className="text-white text-sm font-semibold">{storyViewer.kullanici}</p>
          </div>
          <div className="text-center">
            <span className="text-8xl">{storyViewer.icerik}</span>
            <p className="text-white text-xl font-bold mt-6">{storyViewer.baslik}</p>
            <p className="text-white/60 text-sm mt-2">{storyViewer.aciklama}</p>
          </div>
        </div>
      )}

      <SosyalNav />
    </div>
  )
}
