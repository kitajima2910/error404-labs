const fs = require('fs');

let content = fs.readFileSync('src/App.tsx', 'utf8');

const replacements = [
  { from: /text-sm bg-zinc-800 hover:bg-zinc-700 text-white px-3 py-1 rounded-lg transition-colors/g, to: 'text-xs font-medium bg-zinc-800 hover:bg-zinc-700 text-white px-3 py-1.5 rounded-lg transition-colors shadow-sm' },
  { from: /text-sm bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg transition-colors/g, to: 'text-xs font-medium bg-red-500/90 hover:bg-red-500 text-white px-3 py-1.5 rounded-lg transition-colors shadow-sm' },
  { from: /bg-zinc-800\/50 p-2 rounded-lg border border-zinc-800/g, to: 'bg-zinc-950 p-2 rounded-xl border border-zinc-800/80 shadow-inner' },
  { from: /bg-zinc-900 border border-zinc-800 rounded-lg p-4/g, to: 'bg-zinc-950 border border-zinc-800 rounded-xl p-4' },
  { from: /text-2xl/g, to: 'text-lg font-medium' },
  { from: /text-gray-500/g, to: 'text-zinc-500' },
  { from: /text-gray-600/g, to: 'text-zinc-600' },
  { from: /text-gray-400/g, to: 'text-zinc-400' },
  { from: /text-white/g, to: 'text-white' },
];

replacements.forEach(({ from, to }) => {
  content = content.replace(from, to);
});

fs.writeFileSync('src/App.tsx', content);
console.log('Done');
