import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const slides = [
  {
    title: 'Şehrini\nKeşfet',
    desc: 'Etkinlikler, mekanlar ve daha fazlası — yaşadığın şehri hiç bu kadar yakından tanımadın.',
    // ribbon: soldan girer, büyük döngü, sağdan çıkar
    path: 'M -25 130 C 80 -40, 460 60, 430 280 C 400 500, -30 470, 15 640 C 45 770, 350 840, 465 790',
  },
  {
    title: 'Anında\nBul',
    desc: 'Bulunduğun konuma göre en iyi yerleri ve gizli hazineleri anında keşfet.',
    path: 'M -25 160 C 60 -20, 470 80, 440 300 C 410 520, -20 490, 20 660 C 50 790, 360 850, 465 800',
  },
  {
    title: 'Topluluğa\nKatıl',
    desc: 'Şehrin nabzını tut. Yerel toplulukla bağlan, paylaş ve birlikte keşfet.',
    path: 'M -25 110 C 100 -50, 450 70, 415 290 C 380 510, -25 480, 10 650 C 40 790, 340 850, 465 800',
  },
]

const RIBBON_COLOR = '#8B5CF6'
const RIBBON_BG = '#F5F3FF'

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
    <div
      className="min-h-screen relative overflow-hidden flex flex-col"
      style={{ backgroundColor: RIBBON_BG }}
    >
      {/* SVG Ribbon */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 430 870"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Arka şerit — hafif soluk, derinlik için */}
        <path
          d={slide.path}
          stroke={RIBBON_COLOR}
          strokeWidth="38"
          fill="none"
          strokeLinecap="round"
          opacity="0.12"
        />
        {/* Ön şerit — ana */}
        <path
          d={slide.path}
          stroke={RIBBON_COLOR}
          strokeWidth="22"
          fill="none"
          strokeLinecap="round"
          opacity="0.85"
        />
      </svg>

      {/* Geç butonu */}
      <div className="absolute top-12 right-6 z-10">
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

      {/* Alt içerik */}
      <div className="absolute bottom-0 left-0 right-0 px-7 pb-14 z-10">
        {/* Dots */}
        <div className="flex gap-2 mb-7">
          {slides.map((_, i) => (
            <div
              key={i}
              className="h-1.5 rounded-full transition-all duration-300"
              style={{
                width: i === current ? 24 : 6,
                backgroundColor: i === current ? RIBBON_COLOR : '#D1D5DB',
              }}
            />
          ))}
        </div>

        {/* Başlık */}
        <h1 className="text-gray-900 text-4xl font-bold leading-tight mb-3 whitespace-pre-line">
          {slide.title}
        </h1>

        {/* Açıklama */}
        <p className="text-gray-500 text-sm leading-relaxed mb-8 max-w-xs">
          {slide.desc}
        </p>

        {/* Buton */}
        <button
          onClick={handleNext}
          className="w-full text-white font-semibold text-base py-4 rounded-2xl active:scale-95 transition-transform"
          style={{ backgroundColor: RIBBON_COLOR }}
        >
          {current < slides.length - 1 ? 'İleri' : 'Başla'}
        </button>
      </div>
    </div>
  )
}
