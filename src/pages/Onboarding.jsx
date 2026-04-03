import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

const slides = [
  {
    title: 'Şehrini\nKeşfet',
    desc: 'Etkinlikler, mekanlar ve daha fazlası — yaşadığın şehri hiç bu kadar yakından tanımadın.',
  },
  {
    title: 'Anında\nBul',
    desc: 'Bulunduğun konuma göre en iyi yerleri ve gizli hazineleri anında keşfet.',
  },
  {
    title: 'Topluluğa\nKatıl',
    desc: 'Şehrin nabzını tut. Yerel toplulukla bağlan, paylaş ve birlikte keşfet.',
  },
]

function Ribbon({ animate }) {
  const pathRef = useRef(null)
  const [length, setLength] = useState(3000)

  useEffect(() => {
    if (pathRef.current) {
      setLength(pathRef.current.getTotalLength())
    }
  }, [])

  return (
    <svg
      className="absolute inset-0 pointer-events-none"
      width="100%"
      height="100%"
      viewBox="0 0 430 870"
      preserveAspectRatio="xMidYMid slice"
    >
      <path
        ref={pathRef}
        /*
          Temiz 3 segmentli smooth ribbon:
          - Soldan giriş (x=-30, y=250)
          - Sağa büyük yay (tepe noktası yukarıda)
          - Sola döngü (orta)
          - Sağa çıkış (alt)

          Her segmentin CP1'i = önceki CP2'nin bitiş noktasına yansıması
          → yamuksuz, pürüzsüz geçiş garantili
        */
        d={`
          M -30 250
          C 100 50, 400 50, 450 250
          C 500 450, 100 500, 30 650
          C -40 800, 350 830, 470 790
        `}
        stroke="#8B5CF6"
        strokeWidth="20"
        strokeLinecap="round"
        fill="none"
        style={{
          strokeDasharray: length,
          strokeDashoffset: animate ? 0 : length,
          transition: animate
            ? `stroke-dashoffset 1.8s cubic-bezier(0.4, 0, 0.2, 1)`
            : 'none',
        }}
      />
    </svg>
  )
}

export default function Onboarding() {
  const [current, setCurrent] = useState(0)
  const [animate, setAnimate] = useState(false)
  const navigate = useNavigate()

  // Her slayt değişince animasyonu sıfırla ve yeniden başlat
  useEffect(() => {
    setAnimate(false)
    const t = setTimeout(() => setAnimate(true), 50)
    return () => clearTimeout(t)
  }, [current])

  function handleNext() {
    if (current < slides.length - 1) {
      setCurrent(current + 1)
    } else {
      localStorage.setItem('sehir_onboarded', '1')
      navigate('/login')
    }
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#F5F0FF]">

      <Ribbon animate={animate} />

      {/* Geç */}
      <button
        onClick={() => { localStorage.setItem('sehir_onboarded', '1'); navigate('/login') }}
        className="absolute top-12 right-6 z-10 text-gray-400 text-sm font-medium"
      >
        Geç
      </button>

      {/* Alt içerik */}
      <div className="absolute bottom-0 left-0 right-0 px-7 pb-14 z-10">
        <div className="flex gap-2 mb-7">
          {slides.map((_, i) => (
            <div
              key={i}
              className="h-1.5 rounded-full transition-all duration-300"
              style={{
                width: i === current ? 24 : 6,
                backgroundColor: i === current ? '#8B5CF6' : '#D1D5DB',
              }}
            />
          ))}
        </div>

        <h1 className="text-gray-900 text-4xl font-bold leading-tight mb-3 whitespace-pre-line">
          {slides[current].title}
        </h1>
        <p className="text-gray-500 text-sm leading-relaxed mb-8 max-w-xs">
          {slides[current].desc}
        </p>

        <button
          onClick={handleNext}
          className="w-full text-white font-semibold text-base py-4 rounded-2xl active:scale-95 transition-transform"
          style={{ backgroundColor: '#8B5CF6' }}
        >
          {current < slides.length - 1 ? 'İleri' : 'Başla'}
        </button>
      </div>
    </div>
  )
}
