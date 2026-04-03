import { Search } from 'lucide-react'
import BottomNav from '../components/BottomNav'

export default function SearchPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center gap-3 pb-20">
        <div className="w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center">
          <Search size={24} strokeWidth={1.5} className="text-gray-400" />
        </div>
        <p className="text-gray-400 text-sm font-medium">Arama yakında geliyor</p>
      </div>
      <BottomNav active="search" />
    </div>
  )
}
