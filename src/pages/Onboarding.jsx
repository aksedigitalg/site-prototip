import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const slides = [
  {
    icon: '🏙️',
    title: 'Şehrine Hoş Geldin',
    desc: 'Yaşadığın şehri daha iyi keşfet. Etkinlikler, mekanlar ve çok daha fazlası seni bekliyor.',
    bg: 'from-blue-600 to-blue-800',
  },
  {
    icon: '🗺️',
    title: 'Her Yerde Keşfet',
    desc: 'Bulunduğun konuma göre en iyi yerleri, kısa yolları ve gizli hazineleri bul.',
    bg: 'from-orange-500 to-orange-700',
  },
  {
    icon: '⚡',
    title: 'Anında Bağlan',
    desc: 'Şehrin nabzını tut. Gerçek zamanlı güncellemeler ve yerel toplulukla anında iletişim kur.',
    bg: 'from-blue-700 to-orange-600',
  },
]

export default function Onboarding() {
  const [current, setCurrent] = useState(0)
  const navigate = useNavigate()

  function handleNext() {
    if (current < slides.length - 1) {
      setCurrent(current + 1)
    } else {
      localStorage.setItem('sehir_onboarded', '1')
      navigate('/login')
    }
  }

  const slide = slides[current]

  return (
    <div className={`min-h-screen bg-gradient-to-br ${slide.bg} flex flex-col items-center justify-between px-6 py-12 transition-all duration-500`}>
      {/* Skip */}
      <div className="w-full flex justify-end">
        <button
          onClick={() => {
            localStorage.setItem('sehir_onboarded', '1')
            navigate('/login')
          }}
          className="text-white/70 text-sm font-medium"
        >
          Geç
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center text-center gap-6">
        <div className="text-8xl mb-2">{slide.icon}</div>
        <h1 className="text-white text-3xl font-bold leading-tight">{slide.title}</h1>
        <p className="text-white/80 text-base leading-relaxed max-w-xs">{slide.desc}</p>
      </div>

      {/* Dots */}
      <div className="flex gap-2 mb-8">
        {slides.map((_, i) => (
          <div
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
              i === current ? 'w-6 bg-white' : 'w-2 bg-white/40'
            }`}
          />
        ))}
      </div>

      {/* Button */}
      <button
        onClick={handleNext}
        className="w-full bg-white text-blue-700 font-bold text-lg py-4 rounded-2xl shadow-lg active:scale-95 transition-transform"
      >
        {current < slides.length - 1 ? 'İleri' : 'Başla'}
      </button>
    </div>
  )
}
