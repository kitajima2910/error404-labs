const fs = require('fs');

let content = fs.readFileSync('src/App.tsx', 'utf8');

const replacements = [
  { from: /border-\[#e94560\] shadow-md shadow-indigo-500\/40 ring-1 ring-\[#e94560\]/g, to: 'border-indigo-500 shadow-md shadow-indigo-500/40 ring-1 ring-indigo-500' },
  { from: /hover:border-\[#e94560\]/g, to: 'hover:border-indigo-500' },
  { from: /text-\[#e94560\]/g, to: 'text-indigo-400' },
  { from: /bg-zinc-800\/50 border rounded-lg p-2 flex flex-col items-center group cursor-pointer transition-all duration-200 relative hover:scale-105 hover:shadow-lg hover:shadow-indigo-500\/20/g, to: 'bg-zinc-900 border rounded-xl p-2 flex flex-col items-center group cursor-pointer transition-all duration-200 relative hover:scale-[1.02] hover:shadow-xl hover:shadow-indigo-500/20' },
  { from: /bg-zinc-800\/50 border border-zinc-800 rounded-xl p-4 flex flex-col gap-3/g, to: 'bg-zinc-900 border border-zinc-800 rounded-xl p-5 flex flex-col gap-4 shadow-lg' },
  { from: /text-sm font-bold text-indigo-400/g, to: 'text-base font-semibold text-indigo-400 font-mono' },
  { from: /text-sm font-medium w-20/g, to: 'text-sm font-medium text-zinc-300 w-20' },
  { from: /flex items-center justify-center transition-colors/g, to: 'flex items-center justify-center' },
  { from: /rounded-lg-sm/g, to: 'rounded-md' },
  { from: /bg-black\/50/g, to: 'bg-zinc-900/80 backdrop-blur-sm border border-zinc-800' },
  { from: /text-sm font-bold px-1 w-12/g, to: 'text-xs font-bold px-1 w-12 text-zinc-300' }
];

replacements.forEach(({ from, to }) => {
  content = content.replace(from, to);
});

fs.writeFileSync('src/App.tsx', content);
console.log('Done');
