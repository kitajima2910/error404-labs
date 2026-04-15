const fs = require('fs');

let content = fs.readFileSync('src/App.tsx', 'utf8');

const replacements = [
  { regex: /\bbg-zinc-950\b/g, replacement: 'bg-white dark:bg-zinc-950' },
  { regex: /\bbg-zinc-900\b/g, replacement: 'bg-zinc-50 dark:bg-zinc-900' },
  { regex: /\bbg-zinc-800\b/g, replacement: 'bg-zinc-100 dark:bg-zinc-800' },
  { regex: /\bbg-zinc-700\b/g, replacement: 'bg-zinc-200 dark:bg-zinc-700' },
  { regex: /\bbg-zinc-600\b/g, replacement: 'bg-zinc-300 dark:bg-zinc-600' },
  
  { regex: /\btext-white\b/g, replacement: 'text-zinc-900 dark:text-white' },
  { regex: /\btext-zinc-400\b/g, replacement: 'text-zinc-500 dark:text-zinc-400' },
  { regex: /\btext-zinc-300\b/g, replacement: 'text-zinc-600 dark:text-zinc-300' },
  { regex: /\btext-zinc-500\b/g, replacement: 'text-zinc-400 dark:text-zinc-500' },
  { regex: /\btext-zinc-600\b/g, replacement: 'text-zinc-400 dark:text-zinc-600' },
  
  { regex: /\bborder-zinc-800\b/g, replacement: 'border-zinc-200 dark:border-zinc-800' },
  { regex: /\bborder-zinc-700\b/g, replacement: 'border-zinc-300 dark:border-zinc-700' },
  { regex: /\bborder-zinc-600\b/g, replacement: 'border-zinc-400 dark:border-zinc-600' },
  
  { regex: /\bhover:bg-zinc-800\b/g, replacement: 'hover:bg-zinc-200 dark:hover:bg-zinc-800' },
  { regex: /\bhover:bg-zinc-700\b/g, replacement: 'hover:bg-zinc-300 dark:hover:bg-zinc-700' },
  { regex: /\bhover:bg-zinc-600\b/g, replacement: 'hover:bg-zinc-400 dark:hover:bg-zinc-600' },
  
  { regex: /\bhover:text-white\b/g, replacement: 'hover:text-zinc-900 dark:hover:text-white' },
  { regex: /\bhover:text-zinc-100\b/g, replacement: 'hover:text-zinc-800 dark:hover:text-zinc-100' },
  
  { regex: /\bshadow-zinc-900\b/g, replacement: 'shadow-zinc-200 dark:shadow-zinc-900' },
];

replacements.forEach(({ regex, replacement }) => {
  content = content.replace(regex, replacement);
});

fs.writeFileSync('src/App.tsx', content, 'utf8');
console.log('Refactoring complete.');
