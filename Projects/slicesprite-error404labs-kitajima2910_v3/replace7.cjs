const fs = require('fs');

let content = fs.readFileSync('src/App.tsx', 'utf8');

// Add convertToWebP function
const convertToWebPStr = `
const convertToWebP = (dataUrl: string): Promise<string> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(img, 0, 0);
        resolve(canvas.toDataURL('image/webp'));
      } else {
        resolve(dataUrl);
      }
    };
    img.src = dataUrl;
  });
};

export default function App() {`;

content = content.replace('export default function App() {', convertToWebPStr);

// Add isGeneratingZip state
content = content.replace(
  'const [isGeneratingVideo, setIsGeneratingVideo] = useState<boolean>(false);',
  'const [isGeneratingVideo, setIsGeneratingVideo] = useState<boolean>(false);\n  const [isGeneratingZip, setIsGeneratingZip] = useState<boolean>(false);'
);

// Update handleDownloadZip
const handleDownloadZipStr = `
  const handleDownloadZip = async (format: 'png' | 'webp' = 'png') => {
    if (frames.length === 0) return;
    
    setIsGeneratingZip(true);
    
    try {
      const zip = new JSZip();
      const folderName = imageName || 'sprites';
      const folder = zip.folder(folderName);
      
      if (!folder) {
        setIsGeneratingZip(false);
        return;
      }
      
      for (let i = 0; i < frames.length; i++) {
        const frame = frames[i];
        let dataUrl = frame.dataUrl;
        
        if (format === 'webp') {
          dataUrl = await convertToWebP(frame.dataUrl);
        }
        
        const base64Data = dataUrl.replace(/^data:image\\/(png|jpg|webp);base64,/, "");
        const paddedIndex = i.toString().padStart(3, '0');
        folder.file(\`\${folderName}_\${paddedIndex}.\${format}\`, base64Data, { base64: true });
      }
      
      const content = await zip.generateAsync({ type: 'blob' });
      saveAs(content, \`\${folderName}_\${format}.zip\`);
      setToastMessage(\`Đã tải xuống ZIP (\${format.toUpperCase()})!\`);
    } catch (error) {
      console.error("Error generating ZIP:", error);
      setToastMessage('Có lỗi xảy ra khi tạo ZIP.');
    } finally {
      setIsGeneratingZip(false);
    }
  };`;

content = content.replace(/const handleDownloadZip = async \(\) => {[\s\S]*?saveAs\(content, `\$\{folderName\}\.zip`\);\n  };/, handleDownloadZipStr.trim());

// Update buttons for ZIP
const zipButtonsStr = `
                  <button
                    onClick={() => handleDownloadZip('png')}
                    disabled={isGeneratingZip}
                    className="bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2 flex items-center text-sm font-medium rounded-lg shadow-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Download className="mr-1 md:mr-2" size={18} /> {isGeneratingZip ? 'Đang tạo...' : 'Tải ZIP (PNG)'}
                  </button>
                  <button
                    onClick={() => handleDownloadZip('webp')}
                    disabled={isGeneratingZip}
                    className="bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2 flex items-center text-sm font-medium rounded-lg shadow-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Download className="mr-1 md:mr-2" size={18} /> {isGeneratingZip ? 'Đang tạo...' : 'Tải ZIP (WebP)'}
                  </button>`;

content = content.replace(/<button\s+onClick=\{handleDownloadZip\}\s+className="bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2 flex items-center text-sm font-medium rounded-lg shadow-sm transition-all"\s+>\s+<Download className="mr-1 md:mr-2" size=\{18\} \/> Tải ZIP\s+<\/button>/, zipButtonsStr.trim());

// Update individual frame download buttons
const individualDownloadStr = `
            <div className="mt-6 flex gap-3 w-full justify-between items-center">
              <div className="text-sm text-zinc-400 bg-zinc-900 px-4 py-2 rounded-lg border border-zinc-800">
                {previewFrame.width} x {previewFrame.height} px
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    saveAs(previewFrame.dataUrl, \`\${imageName || 'sprite'}_\${previewFrame.id}.png\`);
                  }}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 flex items-center text-sm font-semibold rounded-xl shadow-lg shadow-indigo-500/20 transition-all active:scale-[0.98]"
                >
                  <Download className="mr-2" size={18} /> Tải PNG
                </button>
                <button
                  onClick={async () => {
                    const webpDataUrl = await convertToWebP(previewFrame.dataUrl);
                    saveAs(webpDataUrl, \`\${imageName || 'sprite'}_\${previewFrame.id}.webp\`);
                  }}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 flex items-center text-sm font-semibold rounded-xl shadow-lg shadow-indigo-500/20 transition-all active:scale-[0.98]"
                >
                  <Download className="mr-2" size={18} /> Tải WebP
                </button>
              </div>
            </div>`;

content = content.replace(/<div className="mt-6 flex gap-3 w-full justify-between items-center">[\s\S]*?<\/button>\s+<\/div>/, individualDownloadStr.trim());

fs.writeFileSync('src/App.tsx', content);
console.log('Done');
