
const fs = require('fs');
const path = require('path');

const sqlFile = 'd:/error404-labs/Projects/error404-labs/.gemini/antigravity/brain/d7096d4c-0262-46cc-abc7-f60d6052fd2e/scratch/migrate_roadmap.sql';
const sqlContent = fs.readFileSync(sqlFile, 'utf8');
const statements = sqlContent.split(';\n').filter(s => s.trim() !== '');

console.log(JSON.stringify(statements));
