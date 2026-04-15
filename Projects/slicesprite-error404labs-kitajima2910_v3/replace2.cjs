const fs = require('fs');

let content = fs.readFileSync('src/App.tsx', 'utf8');

const replacements = [
  { from: /focus:border-\[#e94560\]/g, to: 'focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500' },
  { from: /bg-zinc-900 border border-zinc-800 p-2 text-sm/g, to: 'bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-sm transition-all' },
  { from: /bg-indigo-600 text-white/g, to: 'bg-indigo-600 text-white shadow-md' },
  { from: /text-gray-400 hover:text-white/g, to: 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50' },
  { from: /bg-zinc-900 rounded-md p-1 border border-zinc-800/g, to: 'bg-zinc-950 rounded-xl p-1.5 border border-zinc-800/80 shadow-inner' },
  { from: /flex-1 py-2 text-xs sm:text-sm md:text-base font-bold flex items-center justify-center transition-colors/g, to: 'flex-1 py-2 text-xs sm:text-sm font-medium flex items-center justify-center transition-all rounded-lg' },
  { from: /text-base md:text-sm font-medium/g, to: 'text-sm font-medium text-zinc-300' },
  { from: /mt-4/g, to: 'mt-5' },
  { from: /mb-4/g, to: 'mb-5' },
];

replacements.forEach(({ from, to }) => {
  content = content.replace(from, to);
});

fs.writeFileSync('src/App.tsx', content);
console.log('Done');
