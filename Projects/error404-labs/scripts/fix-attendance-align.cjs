const fs = require('fs');
const filePath = 'src/pages/quan-ly.astro';
let content = fs.readFileSync(filePath, 'utf8');

// Find the exact code block using regex (handles CRLF)
// Match from the for loop header to its closing brace before `const rate =`
const regex = /(for \(let d = 1; d <= daysInMonth; d\+\+\) \{[\s\S]*?\}\s*)(const rate = daysInMonth > 0)/;

const match = content.match(regex);
if (!match) {
    console.error('Pattern not found!');
    process.exit(1);
}

const oldBlock = match[1];
const afterBlock = match[2];

// Build the new block with same indentation
// Extract indentation from the for loop
const indent = '                                ';
const bracketIndent = '                            ';

const newBlock = `for (let d = 1; d <= 31; d++) {\r\n` +
    `${indent}                                    if (d <= daysInMonth) {\r\n` +
    `${indent}                                        const dateStr = \`\${year}-\${String(month).padStart(2, '0')}-\${String(d).padStart(2, '0')}\`;\r\n` +
    `${indent}                                        const checkedIn = dates.includes(dateStr);\r\n` +
    `${indent}                                        \r\n` +
    `${indent}                                        const dayDate = new Date(year, month - 1, d);\r\n` +
    `\r\n` +
    `${indent}                                        const dayOfWeek = dayDate.getDay();\r\n` +
    `\r\n` +
    `${indent}                                        const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;\r\n` +
    `\r\n` +
    `${indent}                                        const isToday = dayDate.toDateString() === new Date().toDateString();\r\n` +
    `\r\n` +
    `${indent}                                        let tdClass = 'text-center';\r\n` +
    `\r\n` +
    `${indent}                                        if (isWeekend) tdClass += ' weekend-col';\r\n` +
    `\r\n` +
    `${indent}                                        if (isToday) tdClass += ' today-col';\r\n` +
    `\r\n` +
    `${indent}                                        const memberId = student.id;\r\n` +
    `${indent}                                        html += \`<td class="\${tdClass} day-cell" title="\${dateStr}" style="cursor:pointer;" onclick="toggleAttendance(\${memberId}, '\${dateStr}', \${checkedIn})">\r\n` +
    `${indent}                                            \${checkedIn ? '<span class="checkmark present">\u2713</span>' : ''}\r\n` +
    `${indent}                                        </td>\`;\r\n` +
    `${indent}                                    } else {\r\n` +
    `${indent}                                        html += \`<td class="text-center"></td>\`;\r\n` +
    `${indent}                                    }\r\n` +
    `${bracketIndent}                                }\r\n`;

content = content.replace(regex, newBlock + afterBlock);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Fix applied successfully!');
