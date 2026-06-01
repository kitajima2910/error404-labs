const fs = require('fs');

const filePath = 'src/pages/quan-ly.astro';
let content = fs.readFileSync(filePath, 'utf8');
const originalLength = content.length;

// Fix 1: Add loadAttendanceStudents() call in switchView attendance case
const switchViewOld = `                } else if (viewName === 'attendance') {\n                    attendanceView.classList.remove('hidden')\n                    navAttendance.classList.add('bg-indigo-50', 'text-indigo-700', 'font-medium')\n                    navAttendance.classList.remove('text-slate-600')\n                    fetchAttendanceSummary()\n                }`;

const switchViewNew = `                } else if (viewName === 'attendance') {\n                    attendanceView.classList.remove('hidden')\n                    navAttendance.classList.add('bg-indigo-50', 'text-indigo-700', 'font-medium')\n                    navAttendance.classList.remove('text-slate-600')\n                    const _attF = document.getElementById('attendanceStudentFilter');\n                    if (_attF && _attF.options.length <= 1) loadAttendanceStudents();\n                    fetchAttendanceSummary()\n                }`;

if (content.includes(switchViewOld)) {
    content = content.replace(switchViewOld, switchViewNew);
    console.log('Fix 1 applied: loadAttendanceStudents() called on switchView attendance');
} else {
    console.log('Fix 1: Pattern not found. Trying with CRLF...');
    const switchViewOldCRLF = switchViewOld.replace(/\n/g, '\r\n');
    const switchViewNewCRLF = switchViewNew.replace(/\n/g, '\r\n');
    if (content.includes(switchViewOldCRLF)) {
        content = content.replace(switchViewOldCRLF, switchViewNewCRLF);
        console.log('Fix 1 applied (CRLF): loadAttendanceStudents() called on switchView attendance');
    } else {
        console.log('Fix 1 FAILED: Neither LF nor CRLF pattern found');
        // Debug
        const idx = content.indexOf("viewName === 'attendance'");
        if (idx >= 0) {
            console.log('Context:', JSON.stringify(content.substring(idx - 10, idx + 400)));
        }
    }
}

// Fix 2: Add success notification to check-in button
const checkInOld = 'if (res.ok) fetchAttendanceSummary();';
const checkInNew = "if (res.ok) { fetchAttendanceSummary(); showNotification('\\u0110i\\u1ec3m danh th\\u00e0nh c\\u00f4ng!', 'success'); }";

if (content.includes(checkInOld)) {
    content = content.replace(checkInOld, checkInNew);
    console.log('Fix 2 applied: success notification added to check-in');
} else {
    console.log('Fix 2: Pattern not found');
}

fs.writeFileSync(filePath, content, 'utf8');
console.log(`File written. Size: ${originalLength} -> ${content.length} chars`);
