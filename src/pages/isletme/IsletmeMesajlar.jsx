import IsletmeNav from '../../components/IsletmeNav'
import { ISLETME_MESAJLAR } from '../../data/mockIsletme'

export default function IsletmeMesajlar() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center">
        <div className="w-full max-w-[430px] bg-white border-b border-gray-100 px-4 pt-12 pb-3">
          <h1 className="text-gray-900 text-base font-extrabold">Mesajlar</h1>
        </div>
      </header>

      <div className="pt-[72px] pb-24">
        <div className="flex flex-col divide-y divide-gray-100">
          {ISLETME_MESAJLAR.map(m => (
            <button
              key={m.id}
              className="flex items-center gap-3 px-4 py-4 bg-white active:bg-gray-50 transition-colors text-left"
            >
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-sm font-bold shrink-0">
                {m.gonderen[0]}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className={`text-sm ${m.okunmadi ? 'font-bold text-gray-900' : 'font-semibold text-gray-700'}`}>
                    {m.gonderen}
                  </p>
                  <span className="text-gray-400 text-[10px]">{m.zaman}</span>
                </div>
                <p className="text-gray-400 text-xs truncate mt-0.5">{m.mesaj}</p>
              </div>
              {m.okunmadi && (
                <div className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />
              )}
            </button>
          ))}
        </div>
      </div>

      <IsletmeNav />
    </div>
  )
}
