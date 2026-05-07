import { Map, Zap, Target, Swords, Puzzle, Music, DownloadCloud, Trophy, Bot, PenTool, Diamond, Crown, ChevronRight, ChevronDown } from 'lucide-react';

const MENUS = [
  { title: "Month 1 - Starter", subtitle: "Runner • Puzzle • Arcade", icon: Zap, color: "text-pink-500", bg: "bg-pink-100", active: true },
  { title: "Month 2 - Reflex", icon: Zap, color: "text-blue-500", bg: "bg-blue-100" },
  { title: "Month 3 - Shooter", icon: Target, color: "text-orange-500", bg: "bg-orange-100" },
  { title: "Month 4 - Action", icon: Swords, color: "text-yellow-500", bg: "bg-yellow-100" },
  { title: "Month 5 - Puzzle", icon: Puzzle, color: "text-green-500", bg: "bg-green-100" },
  { title: "Month 6 - Rhythm", icon: Music, color: "text-purple-500", bg: "bg-purple-100" },
  { title: "Month 7 - Collect", icon: DownloadCloud, color: "text-indigo-500", bg: "bg-indigo-100" },
  { title: "Month 8 - Progress", icon: Trophy, color: "text-red-500", bg: "bg-red-100" },
  { title: "Month 9 - AI Enemy", icon: Bot, color: "text-teal-500", bg: "bg-teal-100" },
  { title: "Month 10 - Free Build", icon: PenTool, color: "text-blue-400", bg: "bg-blue-100" },
  { title: "Month 11 - Polish", icon: Diamond, color: "text-cyan-500", bg: "bg-cyan-100" },
  { title: "Month 12 - Showcase", icon: Crown, color: "text-yellow-600", bg: "bg-yellow-100" },
]

export default function Sidebar() {
  return (
    <div className="w-[280px] bg-white border-r border-gray-200 flex flex-col shrink-0 h-full overflow-hidden shadow-[2px_0_10px_-4px_rgba(0,0,0,0.05)] z-0 relative">
       <div className="p-5 flex items-center gap-3 text-slate-800 font-extrabold uppercase tracking-widest text-sm border-b border-gray-100 shrink-0">
          <Map size={20} className="text-blue-600"/>
          ROADMAP
       </div>

       <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {MENUS.map((menu, i) => (
             <div key={i} className="flex flex-col">
               <button className={`flex items-center w-full text-left p-3 rounded-xl transition-colors ${menu.active ? 'bg-pink-50 border border-pink-100 ring-1 ring-pink-500/20' : 'hover:bg-gray-50 border border-transparent'}`}>
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${menu.bg} ${menu.color} mr-3 shadow-sm`}>
                    <menu.icon size={18} />
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col justify-center">
                    <div className={`font-bold text-sm truncate ${menu.active ? 'text-pink-600' : 'text-slate-700'}`}>{menu.title}</div>
                    {menu.subtitle && <div className="text-[11px] text-slate-500 truncate mt-0.5 font-medium">{menu.subtitle}</div>}
                  </div>
                  {menu.active ? <ChevronDown size={18} className="text-pink-500 shrink-0 ml-2" /> : <ChevronRight size={18} className="text-gray-400 shrink-0 ml-2" />}
               </button>

               {menu.active && (
                  <div className="ml-7 border-l-[1.5px] border-pink-200 mt-2 mb-3 pl-4 space-y-1.5 relative">
                     <div className="flex justify-between items-center py-1.5 text-sm font-bold text-pink-600 cursor-pointer rounded -ml-4 pl-4 relative">
                        <div className="absolute left-[calc(-1rem-4.5px)] top-1/2 -translate-y-1/2 w-[8px] h-[8px] rounded-full bg-white border-2 border-pink-500 -ml-[0.5px]"></div>
                        <div className="flex items-center gap-2">
                           Week 1
                        </div>
                        <span className="text-xs text-pink-400 font-medium">3/3</span>
                     </div>
                     {[2,3,4].map(w => (
                         <div key={w} className="flex justify-between items-center py-1.5 text-sm font-medium text-slate-500 hover:text-slate-800 cursor-pointer rounded -ml-4 pl-4 transition-colors relative group">
                            <div className="absolute left-[calc(-1rem-4.5px)] top-1/2 -translate-y-1/2 w-[8px] h-[8px] rounded-full bg-white border-[1.5px] border-gray-200 group-hover:border-slate-400 -ml-[0.5px] transition-colors"></div>
                            <div className="flex items-center gap-2">
                               Week {w}
                            </div>
                            <span className="text-[10px] font-bold text-gray-400">0/3</span>
                         </div>
                     ))}
                  </div>
               )}
             </div>
          ))}
       </div>

       <div className="border-t border-gray-100 p-5 shrink-0 bg-white relative">
          <div className="text-xs font-bold text-slate-800 mb-1">Overall Progress</div>
          <div className="flex items-end justify-between mb-3">
             <div className="text-xl font-extrabold text-slate-900">12<span className="text-[11px] font-semibold text-slate-500 ml-1">/ 144 Games</span></div>
             <div className="text-xs font-bold text-slate-600 mb-1">8%</div>
          </div>
          <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden mb-6 shadow-inner">
             <div className="h-full bg-gradient-to-r from-teal-400 via-blue-500 to-purple-500 w-[8%] rounded-full shadow-sm"></div>
          </div>
          
          <div className="relative h-[84px] w-full mt-4">
             <img src="https://api.dicebear.com/7.x/fun-emoji/svg?seed=monster&backgroundColor=transparent" alt="cute monster" className="absolute -bottom-2 -left-2 w-28 h-28 object-contain drop-shadow-md origin-bottom-left hover:scale-105 transition-transform" />
          </div>
       </div>
    </div>
  )
}
