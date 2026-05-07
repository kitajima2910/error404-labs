import { Search, BarChart2, Heart, Download, Gamepad2, FlaskConical } from 'lucide-react';

export default function Header() {
  return (
    <header className="h-16 bg-[#0f172a] px-4 flex items-center justify-between shrink-0 text-white border-b border-gray-800 shadow-sm relative z-10">
       <div className="flex items-center gap-2">
         <div className="w-8 h-8 rounded bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center shadow-inner">
             <FlaskConical size={18} className="text-white"/>
         </div>
         <span className="font-bold text-xl tracking-tight mr-2">404<span className="text-gray-300">LABS</span></span>
         <Gamepad2 className="text-pink-500" size={26}/>
       </div>

       <div className="flex-1 max-w-2xl px-8">
           <div className="relative">
             <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
             <input 
                type="text" 
                placeholder="Search game, genre, mechanic..." 
                className="w-full bg-[#1e293b] text-sm text-gray-200 placeholder-gray-400 rounded-full py-2.5 pl-11 pr-4 outline-none focus:ring-1 focus:ring-pink-500 transition-shadow border border-gray-700/50 shadow-inner" 
             />
           </div>
       </div>

       <div className="flex items-center gap-3">
         <button className="flex items-center gap-2 bg-[#1e293b] hover:bg-gray-700 border border-gray-700/50 px-4 py-2.5 rounded-full text-sm font-semibold transition-colors">
            <BarChart2 size={16} className="text-gray-400"/>
            My Progress
         </button>
         <button className="flex items-center gap-2 bg-[#1e293b] hover:bg-gray-700 border border-gray-700/50 px-4 py-2.5 rounded-full text-sm font-semibold transition-colors">
            <Heart size={16} className="text-pink-500 fill-pink-500"/>
            Favorites
         </button>
         <button className="flex items-center gap-2 bg-[#1e293b] hover:bg-gray-700 border border-gray-700/50 px-4 py-2.5 rounded-full text-sm font-semibold transition-colors">
            <Download size={16} className="text-gray-400"/>
            Export
         </button>
         <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-pink-400 to-indigo-500 overflow-hidden border-2 border-transparent hover:border-pink-500 cursor-pointer p-[2px] ml-1">
           <div className="w-full h-full bg-[#0f172a] rounded-full overflow-hidden flex items-center justify-center">
             <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix&backgroundColor=b6e3f4" alt="avatar" className="w-full h-full object-cover"/>
           </div>
         </div>
       </div>
    </header>
  )
}
