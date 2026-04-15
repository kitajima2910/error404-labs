const fs = require('fs');

let content = fs.readFileSync('src/App.tsx', 'utf8');

const replacements = [
  { from: /accent-\[#e94560\]/g, to: 'accent-indigo-500' },
  { from: /bg-zinc-800\/50 border border-zinc-800 rounded-xl p-5 max-w-3xl max-h-\[90vh\] flex flex-col items-center shadow-2xl/g, to: 'bg-zinc-950 border border-zinc-800 rounded-2xl p-6 max-w-3xl max-h-[90vh] flex flex-col items-center shadow-2xl' },
  { from: /text-lg font-medium font-bold text-white/g, to: 'text-xl font-bold text-white' },
  { from: /bg-zinc-900 border border-zinc-800 rounded-lg p-5/g, to: 'bg-zinc-900 border border-zinc-800 rounded-xl p-5' },
  { from: /bg-zinc-800 hover:bg-zinc-700 text-white px-4 md:px-6 py-2 flex items-center text-sm font-medium md:text-sm font-bold border-b-4 border-zinc-900 active:border-b-0 active:translate-y-1 transition-all rounded-lg/g, to: 'bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2.5 flex items-center text-base font-semibold rounded-xl shadow-lg shadow-indigo-500/20 transition-all active:scale-[0.98]' },
  { from: /bg-indigo-600 text-white shadow-md px-6 py-3 rounded-xl shadow-2xl/g, to: 'bg-zinc-800 border border-zinc-700 text-white px-6 py-4 rounded-xl shadow-2xl' },
  { from: /font-bold text-sm font-medium/g, to: 'font-medium text-base' },
  { from: /#2a2a4a/g, to: '#18181b' } // Update checkerboard pattern color to match zinc theme
];

replacements.forEach(({ from, to }) => {
  content = content.replace(from, to);
});

fs.writeFileSync('src/App.tsx', content);
console.log('Done');
