const fs = require('fs');

let content = fs.readFileSync('src/App.tsx', 'utf8');

// 1. Add Info to imports
content = content.replace(
  "import { Upload, Download, Image as ImageIcon, Settings, Trash2, Grid3X3, Maximize, X, Wand2, Play, Pause, Film, Undo, Redo, CheckSquare, Square, ZoomIn, ZoomOut, Video, Crop as CropIcon } from 'lucide-react';",
  "import { Upload, Download, Image as ImageIcon, Settings, Trash2, Grid3X3, Maximize, X, Wand2, Play, Pause, Film, Undo, Redo, CheckSquare, Square, ZoomIn, ZoomOut, Video, Crop as CropIcon, Info } from 'lucide-react';"
);

// 2. Add TooltipLabel component
const tooltipLabelComponent = `
const TooltipLabel = ({ label, tooltip, htmlFor, className = "mb-1" }: { label: string, tooltip: string, htmlFor?: string, className?: string }) => (
  <div className={\`flex items-center \${className}\`}>
    <label htmlFor={htmlFor} className="block text-sm font-medium text-zinc-300">{label}</label>
    <div className="group relative ml-1.5 flex items-center">
      <Info size={14} className="text-zinc-500 hover:text-zinc-300 cursor-help transition-colors" />
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-zinc-800 text-xs text-zinc-200 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 text-center pointer-events-none border border-zinc-700">
        {tooltip}
        <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-zinc-800"></div>
      </div>
    </div>
  </div>
);
`;

content = content.replace(
  "export default function App() {",
  tooltipLabelComponent + "\nexport default function App() {"
);

// 3. Replace labels
content = content.replace(
  '<label className="block text-sm font-medium text-zinc-300 mb-1">Số cột</label>',
  '<TooltipLabel label="Số cột" tooltip="Chia ảnh thành bao nhiêu cột bằng nhau" />'
);

content = content.replace(
  '<label className="block text-sm font-medium text-zinc-300 mb-1">Số hàng</label>',
  '<TooltipLabel label="Số hàng" tooltip="Chia ảnh thành bao nhiêu hàng bằng nhau" />'
);

content = content.replace(
  '<label className="block text-sm font-medium text-zinc-300 mb-1">Rộng (px)</label>',
  '<TooltipLabel label="Rộng (px)" tooltip="Chiều rộng của mỗi frame (pixel)" />'
);

content = content.replace(
  '<label className="block text-sm font-medium text-zinc-300 mb-1">Cao (px)</label>',
  '<TooltipLabel label="Cao (px)" tooltip="Chiều cao của mỗi frame (pixel)" />'
);

content = content.replace(
  '<label className="block text-sm font-medium text-zinc-300 mb-1" title="Chiều rộng/cao tối thiểu để được tính là một frame">Cỡ nhỏ nhất (px)</label>',
  '<TooltipLabel label="Cỡ nhỏ nhất (px)" tooltip="Chiều rộng/cao tối thiểu để được tính là một frame" />'
);

content = content.replace(
  '<label className="block text-sm font-medium text-zinc-300 mb-1" title="Khoảng cách để nối các phần bị tách rời của sprite">Khoảng cách nối</label>',
  '<TooltipLabel label="Khoảng cách nối" tooltip="Khoảng cách tối đa (pixel) để nối các phần bị tách rời của một sprite" />'
);

content = content.replace(
  '<label className="block text-sm font-medium text-zinc-300 mb-1" title="Cách gộp các phần rời rạc">Phương pháp gộp</label>',
  '<TooltipLabel label="Phương pháp gộp" tooltip="Cách thuật toán gộp các phần rời rạc thành một frame" />'
);

content = content.replace(
  '<label className="block text-sm font-medium text-zinc-300 mb-1" title="Độ lệch màu tối đa để gộp (0-1020)">Dung sai màu</label>',
  '<TooltipLabel label="Dung sai màu" tooltip="Độ lệch màu tối đa để gộp (0-1020)" />'
);

content = content.replace(
  '<label className="block text-sm font-medium text-zinc-300 mb-2">Căn lề (Kích thước chuẩn)</label>',
  '<TooltipLabel label="Căn lề (Kích thước chuẩn)" tooltip="Cách căn lề các frame khi xuất ra ảnh động" className="mb-2" />'
);

content = content.replace(
  '<span className="text-sm font-medium text-zinc-300">Kích thước Canvas tùy chỉnh</span>',
  '<span className="text-sm font-medium text-zinc-300">Kích thước Canvas tùy chỉnh</span>\n                      <div className="group relative ml-1.5 flex items-center">\n                        <Info size={14} className="text-zinc-500 hover:text-zinc-300 cursor-help transition-colors" />\n                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-zinc-800 text-xs text-zinc-200 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 text-center pointer-events-none border border-zinc-700">\n                          Tự định nghĩa kích thước khung hình cho tất cả các frame\n                          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-zinc-800"></div>\n                        </div>\n                      </div>'
);

content = content.replace(
  '<label className="block text-sm text-zinc-400 mb-1">Rộng (px)</label>',
  '<TooltipLabel label="Rộng (px)" tooltip="Chiều rộng khung hình (pixel)" />'
);

content = content.replace(
  '<label className="block text-sm text-zinc-400 mb-1">Cao (px)</label>',
  '<TooltipLabel label="Cao (px)" tooltip="Chiều cao khung hình (pixel)" />'
);

content = content.replace(
  '<label className="block text-sm font-medium text-zinc-300 mb-2">Bộ lọc màu</label>',
  '<TooltipLabel label="Bộ lọc màu" tooltip="Áp dụng hiệu ứng màu sắc cho tất cả các frame" className="mb-2" />'
);

content = content.replace(
  '<label htmlFor="skipEmpty" className="text-sm font-medium text-zinc-300 cursor-pointer leading-tight">Bỏ qua các ảnh trống (trong suốt)</label>',
  '<label htmlFor="skipEmpty" className="text-sm font-medium text-zinc-300 cursor-pointer leading-tight">Bỏ qua các ảnh trống (trong suốt)</label>\n                  <div className="group relative ml-1.5 flex items-center">\n                    <Info size={14} className="text-zinc-500 hover:text-zinc-300 cursor-help transition-colors" />\n                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-zinc-800 text-xs text-zinc-200 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 text-center pointer-events-none border border-zinc-700">\n                      Tự động loại bỏ các frame không có điểm ảnh nào\n                      <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-zinc-800"></div>\n                    </div>\n                  </div>'
);

fs.writeFileSync('src/App.tsx', content);
console.log('Done');
