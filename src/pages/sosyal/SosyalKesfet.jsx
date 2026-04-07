import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search } from 'lucide-react'
import { SOSYAL_POSTLAR, SOSYAL_KULLANICILAR } from '../../data/mockSosyal'
import SosyalNav from '../../components/SosyalNav'

export default function SosyalKesfet() {
  const navigate = useNavigate()
  const [arama, setArama] = useState('')

  const filtrelenmis = arama.trim()
    ? {
        kullanicilar: SOSYAL_KULLANICILAR.filter(k =>
          k.isim.toLowerCase().includes(arama.toLowerCase()) ||
          k.kullaniciAdi.toLowerCase().includes(arama.toLowerCase())
        ),
        etiketler: [...new Set(SOSYAL_POSTLAR.flatMap(p => p.etiketler))]
          .filter(e => e.toLowerCase().includes(arama.toLowerCase().replace('#', '')))
          .map(e => ({ etiket: e, sayi: SOSYAL_POSTLAR.filter(p => p.etiketler.includes(e)).length })),
      }
    : null

  const karisik = [...SOSYAL_POSTLAR].sort(() => Math.random() - 0.5)

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center backdrop-blur-md" style={{ background: 'rgba(255,255,255,0.9)' }}>
        <div className="w-full max-w-[430px]" style={{ padding: '10px 20px', height: 56 }}>
          <div className="flex items-center gap-2 bg-gray-100 rounded-xl px-4 py-2.5">
            <Search size={16} strokeWidth={2} className="text-gray-400 shrink-0" />
            <input
              type="text"
              value={arama}
              onChange={e => setArama(e.target.value)}
              placeholder="Kullanıcı veya etiket ara..."
              className="flex-1 bg-transparent text-sm outline-none"
            />
          </div>
        </div>
      </header>

      <div style={{ paddingTop: 56, paddingBottom: 96, paddingLeft: 4, paddingRight: 4 }}>

        {filtrelenmis ? (
          <div className="px-4">
            {/* Kullanıcı sonuçları */}
            {filtrelenmis.kullanicilar.length > 0 && (
              <div className="mb-4">
                <p className="text-gray-500 text-xs font-semibold mb-2 mt-4">KULLANICILAR</p>
                {filtrelenmis.kullanicilar.map(k => (
                  <button
                    key={k.id}
                    onClick={() => navigate(`/sosyal/profil/${k.id}`)}
                    className="w-full flex items-center gap-3 py-3 active:bg-gray-50 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-xl" style={{ background: k.bg }}>
                      {k.avatar}
                    </div>
                    <div className="text-left">
                      <p className="text-gray-900 text-sm font-semibold">{k.kullaniciAdi}</p>
                      <p className="text-gray-500 text-xs">{k.isim}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* Etiket sonuçları */}
            {filtrelenmis.etiketler.length > 0 && (
              <div>
                <p className="text-gray-500 text-xs font-semibold mb-2">ETİKETLER</p>
                {filtrelenmis.etiketler.map(({ etiket, sayi }) => (
                  <div key={etiket} className="flex items-center justify-between py-3">
                    <p className="text-gray-900 text-sm font-semibold">#{etiket}</p>
                    <p className="text-gray-400 text-xs">{sayi} gönderi</p>
                  </div>
                ))}
              </div>
            )}

            {filtrelenmis.kullanicilar.length === 0 && filtrelenmis.etiketler.length === 0 && (
              <p className="text-gray-400 text-sm text-center py-12">Sonuç bulunamadı</p>
            )}
          </div>
        ) : (
          /* Keşfet grid */
          <div className="grid grid-cols-3 gap-1 pt-2">
            {karisik.map((post, i) => (
              <button
                key={post.id}
                onClick={() => navigate(`/sosyal/post/${post.id}`)}
                className="flex items-center justify-center"
                style={{
                  background: post.gradyan,
                  aspectRatio: (i % 6 === 0 || i % 6 === 5) ? '1/2' : '1/1',
                  gridRow: (i % 6 === 0 || i % 6 === 5) ? 'span 2' : 'span 1',
                }}
              >
                <span className="text-3xl">{post.emoji}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      <SosyalNav />
    </div>
  )
}
