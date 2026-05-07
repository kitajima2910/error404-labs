import { Gamepad2, CalendarDays, Clock, Trophy, Filter, ChevronDown, ChevronRight, Play, FileCheck, ArrowRight, Copy, Code, Zap, Target, Crown, Bot, Puzzle, Smartphone, Flame, Hand, Repeat, Image } from 'lucide-react';

export default function MainContent() {
  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8 pb-12">
       {/* Top Header stats area */}
       <div className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-[0_2px_20px_-4px_rgba(0,0,0,0.05)] relative overflow-hidden flex justify-between items-center">
          <div className="z-10 relative">
             <h1 className="text-4xl font-extrabold text-[#0f172a] mb-2 flex items-center gap-3">
               <Gamepad2 className="text-[#4f46e5]" size={40}/>
               144 Game Roadmap
               <span className="text-yellow-400 text-3xl -mt-4 drop-shadow-sm">✨</span>
             </h1>
             <p className="text-slate-600 font-semibold mb-8 text-lg">Build trend-style web games for kids with fast, colorful, easy-to-make templates</p>

             <div className="flex gap-4">
                <StatCard val="144" label="Games" icon={Gamepad2} color="pink" />
                <StatCard val="12" label="Months" icon={CalendarDays} color="blue" />
                <StatCard val="48" label="Weeks" icon={Clock} color="green" />
                <StatCard val="3" label="Games / Week" icon={Trophy} color="yellow" />
             </div>
          </div>
          <div className="absolute right-0 bottom-0 h-[120%] w-[45%] flex items-end justify-end p-2 pointer-events-none opacity-90">
             <div className="w-full h-full bg-contain bg-no-repeat bg-right-bottom" style={{backgroundImage: "url('https://api.dicebear.com/7.x/fun-emoji/svg?seed=gamer&backgroundColor=transparent')"}}></div>
          </div>
       </div>

       {/* Timeline */}
       <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-[0_2px_15px_-4px_rgba(0,0,0,0.05)]">
          <div className="flex justify-between items-center text-xs font-bold text-slate-400 mb-6 px-1 uppercase tracking-widest">
             <span className="text-pink-500">Month 1</span>
             <span>Month 12</span>
          </div>
          <div className="relative flex justify-between items-center mb-8 px-2">
             <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-1.5 bg-[#e2e8f0] rounded-full z-0"></div>
             <div className="absolute left-6 w-16 top-1/2 -translate-y-1/2 h-1.5 bg-pink-500 rounded-full z-0"></div>

             {[1,2,3,4,5,6,7,8,9,10,11,12].map(m => (
                <div key={m} className={`w-9 h-9 rounded-full flex items-center justify-center font-extrabold text-sm z-10 relative shadow-sm ${m === 1 ? 'bg-pink-500 text-white ring-4 ring-pink-100' : 'bg-[#4f46e5] text-white border-[3px] border-white shadow-md'}`}>
                  {m === 12 ? <Crown size={16} className="text-white" /> : m}
                </div>
             ))}
          </div>
          <div className="flex justify-center mt-2">
             <button className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-8 rounded-full shadow-lg shadow-pink-500/30 transition-transform active:scale-95 flex items-center gap-2 text-[15px]">
                <Target size={18}/> Start with trending game
             </button>
          </div>
       </div>

       {/* Filter tags (first row) */}
       <div className="flex items-center gap-2.5 flex-wrap">
          {["All", "Runner", "Obby", "Obstacles", "Tycoon", "Clicker", "Collect", "Race", "Puzzle", "Rhythm", "Boss Fight", "Pet", "Simulator"].map(tag => (
             <button key={tag} className={`px-4 py-2 rounded-xl text-[13px] font-bold border transition-colors ${tag === 'All' ? 'bg-pink-500 text-white border-pink-500 shadow-md shadow-pink-500/20' : 'bg-white text-slate-600 border-gray-200 hover:border-gray-300 hover:bg-gray-50 shadow-sm'}`}>
               {tag}
             </button>
          ))}
          <button className="px-5 py-2 rounded-xl text-[13px] font-bold border border-gray-200 bg-white text-slate-700 hover:bg-gray-50 flex items-center gap-2 ml-auto shadow-sm transition-colors">
             <Filter size={16}/> Filters
          </button>
       </div>

       {/* Filter tags (second row) */}
       <div className="flex items-center justify-between pb-4 border-b border-gray-100">
           <div className="flex items-center gap-2.5">
              <button className="px-3.5 py-1.5 bg-[#fef2f2] text-red-600 rounded-lg text-[13px] font-bold border border-red-100 flex items-center gap-1.5"><Flame size={14}/> Trending</button>
              <button className="px-3.5 py-1.5 bg-white text-slate-600 rounded-lg text-[13px] font-semibold border border-gray-200 flex items-center gap-1.5 hover:bg-gray-50"><Zap size={14}/> Short session</button>
              <button className="px-3.5 py-1.5 bg-white text-slate-600 rounded-lg text-[13px] font-semibold border border-gray-200 flex items-center gap-1.5 hover:bg-gray-50"><Hand size={14}/> One hand play</button>
             <button className="px-3.5 py-1.5 bg-white text-slate-600 rounded-lg text-[13px] font-semibold border border-gray-200 flex items-center gap-1.5 hover:bg-gray-50"><Puzzle size={14}/> Low complexity</button>
             <button className="px-3.5 py-1.5 bg-white text-slate-600 rounded-lg text-[13px] font-semibold border border-gray-200 flex items-center gap-1.5 hover:bg-gray-50"><Repeat size={14}/> Viral loop</button>
             <button className="px-3.5 py-1.5 bg-white text-slate-600 rounded-lg text-[13px] font-semibold border border-gray-200 flex items-center gap-1.5 hover:bg-gray-50"><Smartphone size={14}/> Mobile first</button>
           </div>
           <button className="text-[13px] font-bold text-slate-500 flex items-center gap-1 hover:text-slate-800 transition-colors">Sort by: Newest <ChevronDown size={16}/></button>
       </div>

       {/* Grid header */}
       <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-3">
             <h2 className="text-2xl font-extrabold text-slate-900">Month 1 – Week 1</h2>
             <span className="px-3 py-1 rounded-lg bg-[#4f46e5]/10 text-[#4f46e5] text-xs font-bold">3 Games</span>
          </div>
          <button className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 text-slate-600 shadow-sm transition-colors">
             <ChevronRight size={20}/>
          </button>
       </div>

       {/* Game Grid */}
       <div className="grid grid-cols-3 gap-6">
          <GameCard
             title="Neon Jump Runner"
             badges={["Runner"]}
             image="bg-[url('https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=400')]"
             desc="Jump, dodge, collect coins"
             tags={[{text:"Easy", color:"bg-green-100 text-green-700"}, {text:"Kids Favorite", color:"bg-pink-100 text-pink-700"}]}
             trending
             active
          />
          <GameCard
             title="Tower Obby Climb"
             badges={["Obby"]}
             image="bg-[url('https://images.unsplash.com/photo-1622737133809-d95047b9e673?auto=format&fit=crop&q=80&w=400')]"
             desc="Climb, avoid traps, reach top"
             tags={[{text:"Easy", color:"bg-green-100 text-green-700"}, {text:"Fast Loop", color:"bg-blue-100 text-blue-700"}]}
             trending
          />
          <GameCard
             title="Pet Merge Clicker"
             badges={["Clicker"]}
             image="bg-[url('https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&q=80&w=400')]"
             desc="Merge pets, earn coins"
             tags={[{text:"Easy", color:"bg-green-100 text-green-700"}, {text:"Kids Favorite", color:"bg-pink-100 text-pink-700"}]}
             trending
          />
       </div>

       {/* AI Prompt Builder */}
       <div className="bg-white rounded-3xl border-[1.5px] border-indigo-100 shadow-[0_4px_20px_-4px_rgba(99,102,241,0.15)] overflow-hidden mt-6">
           <div className="bg-indigo-50/70 p-5 border-b border-indigo-100 flex items-center gap-4">
               <div className="w-12 h-12 bg-white shadow-sm text-indigo-600 rounded-2xl flex items-center justify-center shrink-0 border border-indigo-100">
                  <Bot size={28} />
               </div>
               <h2 className="text-xl font-extrabold text-slate-800">AI Prompt Builder</h2>
               <div className="flex-1 flex gap-3 ml-6">
                   <Dropdown label="Game Name" value="Neon Jump Runner" />
                   <Dropdown label="Genre" value="Runner" />
                   <Dropdown label="Main Mechanic" value="Jump, Dodge, Collect" />
                   <Dropdown label="Art Style" value="Neon" />
                   <Dropdown label="Platform" value="Mobile (HTML5)" />
               </div>
           </div>
           <div className="p-6 flex gap-6">
               <div className="flex-1">
                  <div className="text-xs font-bold text-slate-800 mb-3 uppercase tracking-wider">Prompt Preview</div>
                  <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5 text-sm text-slate-700 leading-relaxed relative min-h-[120px] font-medium shadow-inner">
                     Create a neon style endless runner game. Player automatically runs forward. Tap or press to jump.
                     Dodge obstacles, collect coins, survive as long as possible. Colorful neon city background...
                     <button className="absolute bottom-4 right-5 text-indigo-600 text-[13px] font-bold flex items-center gap-1.5 hover:text-indigo-800 transition-colors bg-white px-3 py-1.5 rounded-lg shadow-sm border border-indigo-100">View Full Prompt <ArrowRight size={14}/></button>
                  </div>
               </div>
               <div className="w-64 flex flex-col gap-3 shrink-0 justify-end">
                   <button className="bg-[#4f46e5] hover:bg-indigo-700 text-white font-bold py-3.5 px-5 rounded-2xl shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2 transition-colors">
                      <Bot size={20}/> Generate Full Prompt
                   </button>
                   <button className="bg-white hover:bg-gray-50 text-slate-700 font-bold py-3 px-5 rounded-2xl border-2 border-gray-200 flex items-center justify-center gap-2 transition-colors shadow-sm">
                      <FileCheck size={18} className="text-gray-400"/> Minimal Prompt
                   </button>
                   <button className="bg-white hover:bg-gray-50 text-slate-700 font-bold py-3 px-5 rounded-2xl border-2 border-gray-200 flex items-center justify-center gap-2 transition-colors shadow-sm">
                      <Code size={18} className="text-gray-400"/> HTML5 Template
                   </button>
               </div>
           </div>
       </div>

    </div>
  )
}

function StatCard({val, label, icon: Icon, color}: any) {
  const bgStyles: Record<string, string> = {
    pink: "bg-pink-50 border-pink-100 text-pink-500",
    blue: "bg-blue-50 border-blue-100 text-blue-500",
    green: "bg-green-50 border-green-100 text-green-500",
    yellow: "bg-yellow-50 border-yellow-100 text-yellow-500"
  }
  const textStyles: Record<string, string> = {
    pink: "text-pink-800", blue: "text-blue-800", green: "text-green-800", yellow: "text-yellow-800"
  }
  
  return (
    <div className={`${bgStyles[color]} border rounded-3xl p-5 flex flex-col items-center justify-center min-w-[110px] shadow-sm`}>
       <div className="text-[32px] font-black mb-1 leading-none">{val}</div>
       <div className={`${textStyles[color]} text-[11px] font-bold flex items-center gap-1.5 uppercase tracking-wide`}>
         {label} <Icon size={12}/>
       </div>
    </div>
  )
}

function Dropdown({label, value}: {label: string, value: string}) {
  return (
    <div className="flex flex-col flex-1 min-w-0">
      <label className="text-[10px] uppercase font-bold text-slate-500 mb-1 tracking-wider">{label}</label>
      <div className="bg-white border text-slate-700 border-gray-200 rounded-xl px-3 py-2 text-[13px] font-bold flex justify-between items-center cursor-pointer shadow-sm min-w-0 hover:border-gray-300 transition-colors">
         <span className="truncate">{value}</span>
         <ChevronDown size={14} className="text-slate-400 shrink-0 ml-1"/>
      </div>
    </div>
  )
}

function GameCard({title, badges, image, desc, tags, trending, active}: {title: string, badges: string[], image: string, desc: string, tags: {text:string, color:string}[], trending?: boolean, active?: boolean}) {
  return (
    <div className={`bg-white rounded-3xl border-[2px] ${active ? 'border-pink-500 shadow-lg shadow-pink-500/20' : 'border-gray-100 shadow-sm hover:shadow-md hover:border-gray-200'} overflow-hidden transition-all flex flex-col`}>
       <div className={`h-44 w-full bg-cover bg-center relative p-3.5 flex flex-col justify-between ${image}`}>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          {/* Top badges */}
          <div className="flex gap-2 relative z-10">
             {trending && <span className="bg-red-500 text-white text-[11px] font-bold px-2 py-1 rounded-md flex items-center gap-1 shadow-sm"><Flame size={12} className="fill-white"/> Trending</span>}
          </div>
       </div>
       <div className="p-5 flex flex-col flex-1 relative z-20 -mt-3 bg-white rounded-t-2xl">
          <h3 className="font-extrabold text-slate-900 mb-2 text-xl truncate">{title}</h3>
          <div className="flex gap-1.5 mb-2.5">
             {badges.map(b => <span key={b} className="bg-[#4f46e5]/10 text-[#4f46e5] text-xs font-bold px-2.5 py-0.5 rounded-md">{b}</span>)}
          </div>
          <p className="text-slate-600 text-[13px] mb-4 font-semibold leading-relaxed line-clamp-2">{desc}</p>
          <div className="flex flex-wrap gap-1.5 mb-5 mt-auto">
             {tags.map(t => <span key={t.text} className={`px-2.5 py-1 rounded-md text-[11px] font-bold ${t.color}`}>{t.text}</span>)}
          </div>
          <div className="flex gap-2 mt-auto">
             <button className="flex-1 bg-white border-2 border-gray-100 rounded-xl py-2 flex items-center justify-center hover:bg-gray-50 hover:border-gray-200 text-slate-500 transition-colors tooltip tooltip-top" title="Copy Prompts"><Copy size={18}/></button>
             <button className="flex-1 bg-white border-2 border-gray-100 rounded-xl py-2 flex items-center justify-center hover:bg-gray-50 hover:border-gray-200 text-slate-500 transition-colors tooltip tooltip-top" title="Assets"><Image size={18}/></button>
             <button className="flex-1 bg-white border-2 border-gray-100 rounded-xl py-2 flex items-center justify-center hover:bg-gray-50 hover:border-gray-200 text-slate-500 transition-colors tooltip tooltip-top" title="Template"><Code size={18}/></button>
             <button className="w-14 bg-[#8b5cf6] hover:bg-purple-600 text-white rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/30 transition-transform active:scale-95"><Play size={20} className="fill-white translate-x-0.5"/></button>
          </div>
       </div>
    </div>
  )
}
