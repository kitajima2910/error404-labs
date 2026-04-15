const fs = require('fs');

let content = fs.readFileSync('src/App.tsx', 'utf8');

const replacements = [
  { from: /bg-\[#0f172a\]/g, to: 'bg-zinc-950' },
  { from: /bg-\[#1a1a2e\]/g, to: 'bg-zinc-900' },
  { from: /bg-\[#16213e\]/g, to: 'bg-zinc-800/50' },
  { from: /border-\[#0f3460\]/g, to: 'border-zinc-800' },
  { from: /border-\[#0a2342\]/g, to: 'border-zinc-900' },
  { from: /text-\[#e94560\]/g, to: 'text-indigo-400' },
  { from: /bg-\[#e94560\]/g, to: 'bg-indigo-600' },
  { from: /hover:bg-\[#d83a56\]/g, to: 'hover:bg-indigo-500' },
  { from: /bg-\[#0f3460\]/g, to: 'bg-zinc-800' },
  { from: /hover:bg-\[#1a4b8c\]/g, to: 'hover:bg-zinc-700' },
  { from: /shadow-\[#e94560\]/g, to: 'shadow-indigo-500' },
  { from: /border-4/g, to: 'border' },
  { from: /border-2/g, to: 'border' },
  { from: /text-xl/g, to: 'text-sm' },
  { from: /text-lg/g, to: 'text-sm font-medium' },
  { from: /rounded-lg/g, to: 'rounded-xl' },
  { from: /rounded/g, to: 'rounded-lg' },
  { from: /rounded-lg-xl/g, to: 'rounded-xl' },
  { from: /rounded-lg-md/g, to: 'rounded-md' },
  { from: /rounded-lg-full/g, to: 'rounded-full' },
  { from: /p-8/g, to: 'p-6' },
  { from: /p-6/g, to: 'p-5' },
  { from: /p-4/g, to: 'p-4' },
  { from: /gap-8/g, to: 'gap-6' },
  { from: /gap-6/g, to: 'gap-5' },
  { from: /gap-4/g, to: 'gap-3' },
];

replacements.forEach(({ from, to }) => {
  content = content.replace(from, to);
});

fs.writeFileSync('src/App.tsx', content);
console.log('Done');
