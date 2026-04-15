const fs = require('fs');

let content = fs.readFileSync('src/App.tsx', 'utf8');

// Any element with bg-indigo- or bg-red- should have text-white
content = content.replace(/(bg-(?:indigo|red)-[0-9]+(?:\/[0-9]+)?.*?)text-zinc-900 dark:text-white/g, '$1text-white');
content = content.replace(/text-zinc-900 dark:text-white(.*?)bg-(?:indigo|red)-[0-9]+/g, 'text-white$1bg-indigo-600'); // simplistic, maybe just do it manually if regex is hard

fs.writeFileSync('src/App.tsx', content, 'utf8');
console.log('Fixed text-white');
