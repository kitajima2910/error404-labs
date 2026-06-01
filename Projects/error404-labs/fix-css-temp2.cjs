const fs = require('fs');
const path = 'src/pages/quan-ly.astro';
let content = fs.readFileSync(path, 'utf8');

// Change z-index 11 -> 20 in th.sticky-col, add border-right
content = content.replace(
  `#attendanceView .attendance-table th.sticky-col {
                position: sticky;
                left: 0;
                z-index: 11;
                background: #f8fafc;
            }`,
  `#attendanceView .attendance-table th.sticky-col {
                position: sticky;
                left: 0;
                z-index: 20;
                background: #f8fafc;
                border-right: 2px solid #cbd5e1;
            }`
);

// Change z-index 5 -> 10 and border #e2e8f0 -> #cbd5e1 in td.sticky-col
content = content.replace(
  `#attendanceView .attendance-table td.sticky-col {
                position: sticky;
                left: 0;
                z-index: 5;
                background: white;
                border-right: 2px solid #e2e8f0;
            }`,
  `#attendanceView .attendance-table td.sticky-col {
                position: sticky;
                left: 0;
                z-index: 10;
                background: white;
                border-right: 2px solid #cbd5e1;
            }`
);

// Remove td.sticky-col::after block
content = content.replace(
  `            #attendanceView .attendance-table td.sticky-col::after {
                content: '';
                position: absolute;
                right: -1px;
                top: 0;
                bottom: 0;
                width: 1px;
                background: #e2e8f0;
            }
`,
  ''
);

// Remove td block
content = content.replace(
  `            #attendanceView .attendance-table td {
                padding: 12px 3px;
                text-align: center;
                font-size: 13px;
                border-bottom: 1px solid #e2e8f0;
                border-right: 1px solid #f1f5f9;
            }
`,
  ''
);

// Remove td:last-child block
content = content.replace(
  `            #attendanceView .attendance-table td:last-child {
                border-right: none;
            }
`,
  ''
);

// Remove border-bottom from day-header
content = content.replace(
  `                border-bottom: 2px solid #cbd5e1;
                line-height: 1.1;`,
  `                line-height: 1.1;`
);

fs.writeFileSync(path, content, 'utf8');
console.log('Remaining CSS fixes applied');
