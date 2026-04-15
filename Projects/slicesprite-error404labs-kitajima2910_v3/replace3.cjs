const fs = require('fs');

let content = fs.readFileSync('src/App.tsx', 'utf8');

const replacements = [
  { from: /bg-zinc-800\/50 border border-zinc-800 rounded-xl p-4 shadow-lg/g, to: 'bg-zinc-900/80 backdrop-blur-sm border border-zinc-800 rounded-2xl p-6 shadow-xl' },
  { from: /border-b-2 border-zinc-800 pb-2/g, to: 'border-b border-zinc-800/50 pb-4' },
  { from: /text-2xl flex items-center/g, to: 'text-xl font-semibold flex items-center text-white' },
  { from: /bg-zinc-800 hover:bg-zinc-700 text-white px-3 md:px-4 py-2 flex items-center text-sm md:text-base font-bold border-b-4 border-zinc-900 active:border-b-0 active:translate-y-1 transition-all/g, to: 'bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2 flex items-center text-sm font-medium rounded-lg shadow-sm transition-all' },
  { from: /bg-indigo-600 hover:bg-indigo-500 text-white text-sm md:text-2xl font-bold py-3 border-b-4 border-\[#8a2337\] active:border-b-0 active:translate-y-1 transition-all/g, to: 'w-full bg-indigo-600 hover:bg-indigo-500 text-white text-lg font-bold py-3 rounded-xl shadow-lg shadow-indigo-500/20 transition-all active:scale-[0.98]' },
  { from: /lg:col-span-2/g, to: 'lg:col-span-8' },
  { from: /lg:col-span-1/g, to: 'lg:col-span-4' },
  { from: /text-sm md:text-base font-bold/g, to: 'text-sm font-medium' },
  { from: /bg-zinc-900 border border-zinc-800 p-2/g, to: 'bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-sm transition-all' },
  { from: /bg-zinc-900 p-2 border border-zinc-800 rounded-lg/g, to: 'bg-zinc-950 p-4 border border-zinc-800 rounded-xl' },
  { from: /bg-zinc-950 rounded-xl p-1.5 border border-zinc-800\/80 shadow-inner/g, to: 'bg-zinc-950 rounded-xl p-1.5 border border-zinc-800/80 shadow-inner' },
  { from: /text-sm bg-zinc-800 hover:bg-zinc-700 text-white px-3 py-1 rounded transition-colors/g, to: 'text-xs font-medium bg-zinc-800 hover:bg-zinc-700 text-white px-3 py-1.5 rounded-lg transition-colors shadow-sm' },
  { from: /text-sm bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded transition-colors/g, to: 'text-xs font-medium bg-red-500/90 hover:bg-red-500 text-white px-3 py-1.5 rounded-lg transition-colors shadow-sm' },
  { from: /bg-zinc-800\/50 border border-zinc-800 rounded flex flex-col items-center group cursor-pointer transition-all hover:scale-105 hover:shadow-lg/g, to: 'bg-zinc-900 border border-zinc-800/50 rounded-xl flex flex-col items-center group cursor-pointer transition-all hover:scale-[1.02] hover:shadow-xl hover:border-indigo-500/50' },
  { from: /ring-1 ring-indigo-400 shadow-indigo-500\/40 shadow-lg/g, to: 'ring-2 ring-indigo-500 shadow-lg shadow-indigo-500/20' },
  { from: /text-xs text-gray-400 mt-2/g, to: 'text-xs text-zinc-500 mt-2 font-mono' },
  { from: /bg-zinc-800\/50 border border-zinc-800 rounded-lg p-6 max-w-3xl max-h-\[90vh\] flex flex-col items-center shadow-2xl/g, to: 'bg-zinc-900 border border-zinc-800 rounded-2xl p-6 max-w-3xl max-h-[90vh] flex flex-col items-center shadow-2xl' },
  { from: /bg-zinc-900 border border-zinc-800 rounded p-8/g, to: 'bg-zinc-950 border border-zinc-800 rounded-xl p-8' },
  { from: /bg-zinc-800 hover:bg-zinc-700 text-white px-4 md:px-6 py-2 flex items-center text-lg md:text-xl font-bold border-b-4 border-zinc-900 active:border-b-0 active:translate-y-1 transition-all rounded/g, to: 'bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2.5 flex items-center text-base font-semibold rounded-xl shadow-lg shadow-indigo-500/20 transition-all active:scale-[0.98]' },
  { from: /text-3xl text-indigo-400/g, to: 'text-2xl font-bold text-white' },
  { from: /text-xl text-gray-400 bg-zinc-900 px-4 py-2 rounded border border-zinc-800/g, to: 'text-sm font-mono text-zinc-400 bg-zinc-950 px-4 py-2 rounded-lg border border-zinc-800' },
  { from: /bg-indigo-600 text-white px-6 py-3 rounded-lg shadow-2xl/g, to: 'bg-zinc-800 border border-zinc-700 text-white px-6 py-3 rounded-xl shadow-2xl' },
  { from: /bg-zinc-800\/50 border border-zinc-800 rounded-lg p-4 flex flex-col gap-4/g, to: 'bg-zinc-900 border border-zinc-800 rounded-2xl p-6 flex flex-col gap-5 shadow-xl' },
  { from: /bg-indigo-600 hover:bg-indigo-500 text-white p-3 rounded-full/g, to: 'bg-indigo-600 hover:bg-indigo-500 text-white p-4 rounded-full shadow-lg shadow-indigo-500/20 transition-all active:scale-95' },
  { from: /text-xl font-bold text-indigo-400/g, to: 'text-lg font-semibold text-zinc-300 font-mono' },
  { from: /text-lg w-20/g, to: 'text-sm font-medium text-zinc-400 w-20' },
  { from: /accent-indigo-400/g, to: 'accent-indigo-500' },
  { from: /bg-black\/80/g, to: 'bg-black/60' },
  { from: /bg-black\/70/g, to: 'bg-zinc-900/90 backdrop-blur-sm border border-zinc-800' }
];

replacements.forEach(({ from, to }) => {
  content = content.replace(from, to);
});

fs.writeFileSync('src/App.tsx', content);
console.log('Done');
