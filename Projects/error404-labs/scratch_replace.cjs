const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/pages/quan-ly.astro');
let content = fs.readFileSync(filePath, 'utf8');

// Using regex to match regardless of line ending type (\r?\n) and spacing
const targetRegex = /const rate = daysInMonth > 0 \? Math\.round\(\(days \/ daysInMonth\) \* 100\) : 0;[\s\S]*?const todayCount = data\.attendance\.filter[\s\S]*?includes\(todayStr\)\)\.length;/;

const replacement = `const rate = daysInMonth > 0 ? Math.round((days / daysInMonth) * 100) : 0;
                                html += \`<td class="text-center px-4 py-2.5 font-bold text-indigo-600">\${days}/\${daysInMonth} (\${rate}%)</td>\`;
                                html += \`</tr>\`;
                            });

                            tbody.innerHTML = html || \`<tr><td colspan="\${2 + daysInMonth}" class="text-center px-4 py-8 text-slate-400">Không có dữ liệu</td></tr>\`;

                            // Update stats
                            const today = new Date();
                            const todayStr = today.getFullYear() + '-' + String(today.getMonth() + 1).padStart(2, '0') + '-' + String(today.getDate()).padStart(2, '0');
                            const todayCount = data.attendance.filter(s => s.dates && s.dates.map(toDateStr).includes(todayStr)).length;`;

if (targetRegex.test(content)) {
    content = content.replace(targetRegex, replacement);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('REPLACEMENT_SUCCESS');
} else {
    console.log('REPLACEMENT_TARGET_NOT_FOUND');
}
