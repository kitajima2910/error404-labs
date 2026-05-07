import { Star, Zap, Activity, Gamepad2, MonitorSmartphone, Brush, Gauge, Clock, Copy, Box, Code, Download, Paintbrush, Image } from 'lucide-react';

export default function RightPanel() {
  return (
    <div className="w-[360px] bg-white border-l border-gray-200 flex flex-col shrink-0 overflow-y-auto shadow-[-4px_0_15px_-4px_rgba(0,0,0,0.05)] z-0 relative custom-scrollbar">
       <div className="p-4 border-b border-gray-100 flex gap-2">
          <button className="flex-1 bg-yellow-50 text-yellow-700 border border-yellow-200 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-colors"><Gamepad2 size={14}/> Kids Trend Mode</button>
          <button className="flex-1 bg-white text-slate-600 hover:bg-gray-50 border border-gray-200 py-2 rounded-xl text-[11px] font-bold shadow-sm transition-colors">Study Mode</button>
          <button className="flex-1 bg-white text-slate-600 hover:bg-gray-50 border border-gray-200 py-2 rounded-xl text-[11px] font-bold shadow-sm transition-colors">Vibe Coding Mode</button>
       </div>

       <div className="p-6 flex flex-col gap-6">
          {/* Main Info */}
          <div>
            <div className="w-full aspect-square rounded-[2rem] bg-slate-100 mb-6 bg-cover bg-center border-4 border-white shadow-[0_8px_30px_rgb(0,0,0,0.12)] relative" style={{backgroundImage: "url('https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=600')"}}>
            </div>
            
            <div className="flex justify-between items-start mb-3">
               <h2 className="text-[26px] font-extrabold text-slate-900 leading-tight">Neon Jump Runner</h2>
               <button className="text-gray-300 hover:text-yellow-400 transition-colors mt-1.5 bg-gray-50 p-1.5 rounded-full hover:bg-yellow-50"><Star size={24} className="hover:fill-yellow-400"/></button>
            </div>
            
            <div className="flex gap-2.5 mb-5">
                <span className="bg-[#4f46e5] text-white text-[13px] font-bold px-3 py-1 rounded-lg shadow-sm">Runner</span>
                <span className="bg-red-500 text-white text-[13px] font-bold px-3 py-1 rounded-lg flex items-center gap-1 shadow-sm"><Zap size={14} className="fill-white"/> Trending</span>
            </div>
            <p className="text-slate-600 text-[15px] font-medium leading-relaxed">
              Jump, dodge, collect coins and survive as long as you can!
            </p>
          </div>

          <div className="h-px bg-gray-100 w-full mb-1"></div>

          {/* Attributes List */}
          <div className="space-y-5">
             <AttributeRow icon={Activity} label="Core Loop" value="Jump → Dodge → Collect → Survive" />
             <AttributeRow icon={Gamepad2} label="Controls" value="Arrow Keys / Tap / Swipe" />
             <AttributeRow icon={MonitorSmartphone} label="Platform" value={
                <div className="flex items-center gap-4">
                   <span className="flex items-center gap-1.5 text-slate-700 font-bold"><MonitorSmartphone size={16}/> Mobile</span>
                   <span className="flex items-center gap-1.5 text-slate-700 font-bold"><MonitorSmartphone size={16}/> Desktop</span>
                </div>
             } />
             <AttributeRow icon={Paintbrush} label="Art Style" value="Neon" />
             <AttributeRow icon={Gauge} label="Difficulty" value="Easy" />
             <AttributeRow icon={Clock} label="Build Time" value="2 - 4 hours" />
          </div>

          <div className="h-px bg-gray-100 w-full mt-1"></div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3 mt-1 pb-4">
             <ActionButton icon={Copy} label="Copy Prompt" color="purple" />
             <ActionButton icon={Image} label="Generate Assets" color="green" />
             <ActionButton icon={Code} label="Open Template" color="blue" />
             <ActionButton icon={Download} label="Export HTML5" color="yellow" />
          </div>
       </div>
    </div>
  )
}

function AttributeRow({icon: Icon, label, value}: any) {
  return (
    <div className="flex items-start text-[14px]">
      <div className="w-32 flex items-center gap-2.5 text-slate-500 font-bold shrink-0">
         <div className="w-6 h-6 rounded flex items-center justify-center bg-blue-50 text-blue-600">
           <Icon size={14} className="stroke-[2.5]" />
         </div>
         {label}
      </div>
      <div className="font-bold text-slate-800 flex-1 leading-tight flex items-center h-6">
         {value}
      </div>
    </div>
  )
}

function ActionButton({icon: Icon, label, color}: any) {
  const colorStyles = {
    purple: "bg-[#f3e8ff] border-[#e9d5ff] text-[#7e22ce] hover:bg-[#e9d5ff]",
    green: "bg-[#dcfce7] border-[#bbf7d0] text-[#15803d] hover:bg-[#bcf0d0]",
    blue: "bg-[#e0f2fe] border-[#bae6fd] text-[#0369a1] hover:bg-[#bae6fd]",
    yellow: "bg-[#fef9c3] border-[#fef08a] text-[#a16207] hover:bg-[#fef08a]",
  }
  const selectedStyle = colorStyles[color as keyof typeof colorStyles];

  return (
    <button className={`w-full py-3.5 px-5 rounded-2xl border flex items-center justify-center gap-2.5 font-bold transition-all shadow-sm active:scale-[0.98] ${selectedStyle}`}>
       <Icon size={18} className="stroke-[2.5]" />
       {label}
    </button>
  )
}
