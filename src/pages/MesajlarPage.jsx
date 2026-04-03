import { useNavigate } from 'react-router-dom'
import { ArrowLeft, MessageSquare } from 'lucide-react'
import { KONUSMALAR } from '../data/mockMesajlar'

export default function MesajlarPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gray-50">

      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center">
        <div className="w-full max-w-[430px] bg-white/80 backdrop-blur-md border-b border-gray-100 px-4 py-3 flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="text-gray-500">
            <ArrowLeft size={20} strokeWidth={1.5} />
          </button>
          <h1 className="text-gray-800 text-base font-bold flex-1">Mesajlarım</h1>
        </div>
      </header>

      <div className="pt-[57px] pb-8">

        {KONUSMALAR.length === 0 ? (
          <div className="text-center py-16 text-gray-400 text-sm flex flex-col items-center gap-3">
            <MessageSquare size={40} strokeWidth={1.5} className="text-gray-300" />
            Henüz mesaj yok
          </div>
        ) : KONUSMALAR.map(k => (
          <button
            key={k.id}
            onClick={() => navigate(`/mesaj/${k.id}`)}
            className="w-full bg-white border-b border-gray-50 px-4 py-4 flex items-center gap-3 active:bg-gray-50 transition-colors text-left"
          >
            {/* Logo */}
            <div className="relative shrink-0">
              <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center text-2xl">
                {k.isletme.logo}
              </div>
              {k.okunmadi > 0 && (
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-gray-900 text-white text-xs rounded-full flex items-center justify-center font-bold">
                  {k.okunmadi}
                </div>
              )}
            </div>

            {/* Bilgi */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className={`text-sm ${k.okunmadi > 0 ? 'font-bold text-gray-900' : 'font-semibold text-gray-800'}`}>
                  {k.isletme.name}
                </p>
                <span className="text-gray-400 text-xs shrink-0 ml-2">{k.sonMesajZaman}</span>
              </div>
              <p className="text-gray-400 text-xs">{k.isletme.kategori}</p>
              <p className={`text-sm mt-0.5 line-clamp-1 ${k.okunmadi > 0 ? 'text-gray-700 font-medium' : 'text-gray-400'}`}>
                {k.sonMesaj}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
