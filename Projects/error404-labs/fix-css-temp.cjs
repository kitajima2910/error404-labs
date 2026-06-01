const fs = require('fs');
const path = 'src/pages/quan-ly.astro';
let content = fs.readFileSync(path, 'utf8');

// 1) Add border-collapse + width BEFORE "#attendanceView .attendance-table th"
const marker1 = `            #attendanceView .attendance-table th {`;
const insert1 = `            #attendanceView .attendance-table {
                border-collapse: collapse;
                width: 100%;
            }
            #attendanceView .attendance-table th,
            #attendanceView .attendance-table td {
                border: 1px solid #cbd5e1;
            }
            #attendanceView .attendance-table th {`;
content = content.replace(marker1, insert1);

// 2) z-index: 10 -> z-index: 15 in att th (the FIRST occurrence)
content = content.replace(
  `                z-index: 10;`,
  `                z-index: 15;`
);

// 3) Remove border-bottom from day-header, change z-index 11 -> 20
content = content.replace(
  `                border-bottom: 2px solid #cbd5e1;
                line-height: 1.1;
            }
            #attendanceView .attendance-table th.sticky-col {
                position: sticky;
                left: 0;
                z-index: 11;`,
  `                line-height: 1.1;
            }
            #attendanceView .attendance-table th.sticky-col {
                position: sticky;
                left: 0;
                z-index: 20;`
);

// 4) Add border-right to th.sticky-col
content = content.replace(
  `            #attendanceView .attendance-table th.sticky-col {
                position: sticky;
                left: 0;
                z-index: 20;
                background: #f8fafc;
            }`,
  `            #attendanceView .attendance-table th.sticky-col {
                position: sticky;
                left: 0;
                z-index: 20;
                background: #f8fafc;
                border-right: 2px solid #cbd5e1;
            }`
);

// 5) Update td.sticky-col: z-index 5->10, border #e2e8f0->#cbd5e1
content = content.replace(
  `            #attendanceView .attendance-table td.sticky-col {
                position: sticky;
                left: 0;
                z-index: 5;
                background: white;
                border-right: 2px solid #e2e8f0;
            }`,
  `            #attendanceView .attendance-table td.sticky-col {
                position: sticky;
                left: 0;
                z-index: 10;
                background: white;
                border-right: 2px solid #cbd5e1;
            }`
);

// 6) Remove td.sticky-col::after block
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

// 7) Remove td block
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

// 8) Remove td:last-child block
content = content.replace(
  `            #attendanceView .attendance-table td:last-child {
                border-right: none;
            }
`,
  ''
);

fs.writeFileSync(path, content, 'utf8');
console.log('CSS fixes applied successfully');
