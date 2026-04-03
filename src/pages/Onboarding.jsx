import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MapPin, Zap, Users } from 'lucide-react'

const slides = [
  {
    Icon: MapPin,
    title: 'Şehrini Keşfet',
    desc: 'Etkinlikler, mekanlar ve daha fazlası — yaşadığın şehri hiç bu kadar yakından tanımadın.',
  },
  {
    Icon: Zap,
    title: 'Anında Bul',
    desc: 'Bulunduğun konuma göre en iyi yerleri, kısa yolları ve gizli hazineleri anında keşfet.',
  },
  {
    Icon: Users,
    title: 'Topluluğa Katıl',
    desc: 'Şehrin nabzını tut. Yerel toplulukla bağlan, paylaş ve birlikte keşfet.',
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

  const { Icon, title, desc } = slides[current]

  return (
    <div className="min-h-screen bg-white flex flex-col px-6 py-12">
      {/* Skip */}
      <div className="flex justify-end">
        <button
          onClick={() => {
            localStorage.setItem('sehir_onboarded', '1')
            navigate('/login')
          }}
          className="text-gray-400 text-sm font-medium"
        >
          Geç
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center text-center gap-6">
        <div className="w-24 h-24 rounded-3xl bg-gray-100 flex items-center justify-center shadow-sm mb-2">
          <Icon size={40} strokeWidth={1.5} className="text-gray-900" />
        </div>
        <h1 className="text-gray-900 text-3xl font-bold leading-tight">{title}</h1>
        <p className="text-gray-500 text-base leading-relaxed max-w-xs">{desc}</p>
      </div>

      {/* Dots */}
      <div className="flex gap-2 justify-center mb-8">
        {slides.map((_, i) => (
          <div
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
              i === current ? 'w-6 bg-gray-900' : 'w-2 bg-gray-200'
            }`}
          />
        ))}
      </div>

      {/* Button */}
      <button
        onClick={handleNext}
        className="w-full bg-gray-900 text-white font-semibold text-base py-4 rounded-2xl shadow-sm active:scale-95 transition-transform"
      >
        {current < slides.length - 1 ? 'İleri' : 'Başla'}
      </button>
    </div>
  )
}
