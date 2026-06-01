const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'pages', 'quan-ly.astro');
let content = fs.readFileSync(filePath, 'utf8');

// Find the loadAttendanceStudents function
const funcIdx = content.indexOf('loadAttendanceStudents');
if (funcIdx === -1) { console.log('FAIL: function not found'); process.exit(1); }

// Find the if (select && data.members) line after it
const ifIdx = content.indexOf('if (select && data.members)', funcIdx);
if (ifIdx === -1) { console.log('FAIL: if statement not found'); process.exit(1); }

// Find the forEach line after that
const forEachIdx = content.indexOf('data.members.forEach', ifIdx);
if (forEachIdx === -1) { console.log('FAIL: forEach not found'); process.exit(1); }

// Get the indentation of the forEach line - look backwards from forEachIdx to find the start of line
let lineStart = forEachIdx;
while (lineStart > 0 && content[lineStart - 1] !== '\n') lineStart--;
const indent = content.substring(lineStart, forEachIdx);
console.log('Indentation of forEach line:', JSON.stringify(indent));

// Create the cleanup code with matching indentation
const cleanupCode = `// Clear existing options except the first default one\n${indent}while (select.options.length > 1) {\n${indent}    select.remove(1);\n${indent}}\n${indent}`;

// Insert before data.members.forEach
content = content.slice(0, forEachIdx) + cleanupCode + content.slice(forEachIdx);

fs.writeFileSync(filePath, content, 'utf8');
console.log('SUCCESS: Fix applied - cleared old options before appending new ones');
