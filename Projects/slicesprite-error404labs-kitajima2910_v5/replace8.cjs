const fs = require('fs');

let content = fs.readFileSync('src/App.tsx', 'utf8');

// 1. Add imports
content = content.replace(
  "import { Upload, Download, Image as ImageIcon, Settings, Trash2, Grid3X3, Maximize, X, Wand2, Play, Pause, Film, Undo, Redo, CheckSquare, Square, ZoomIn, ZoomOut, Video } from 'lucide-react';",
  "import { Upload, Download, Image as ImageIcon, Settings, Trash2, Grid3X3, Maximize, X, Wand2, Play, Pause, Film, Undo, Redo, CheckSquare, Square, ZoomIn, ZoomOut, Video, Crop as CropIcon } from 'lucide-react';\nimport ReactCrop, { type Crop } from 'react-image-crop';\nimport 'react-image-crop/dist/ReactCrop.css';"
);

// 2. Add state variables
const stateVars = `
  const [isCropping, setIsCropping] = useState<boolean>(false);
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<Crop | null>(null);
  const imgRef = useRef<HTMLImageElement>(null);
`;

content = content.replace(
  "const [toastMessage, setToastMessage] = useState<string | null>(null);",
  "const [toastMessage, setToastMessage] = useState<string | null>(null);\n" + stateVars
);

// 3. Add handleApplyCrop function
const handleApplyCropStr = `
  const handleApplyCrop = () => {
    if (!completedCrop || !imgRef.current) return;

    const canvas = document.createElement('canvas');
    const scaleX = imgRef.current.naturalWidth / imgRef.current.width;
    const scaleY = imgRef.current.naturalHeight / imgRef.current.height;
    
    canvas.width = completedCrop.width * scaleX;
    canvas.height = completedCrop.height * scaleY;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.drawImage(
      imgRef.current,
      completedCrop.x * scaleX,
      completedCrop.y * scaleY,
      completedCrop.width * scaleX,
      completedCrop.height * scaleY,
      0,
      0,
      completedCrop.width * scaleX,
      completedCrop.height * scaleY
    );

    const croppedImageUrl = canvas.toDataURL('image/png');
    const newImg = new Image();
    newImg.onload = () => {
      setImage(newImg);
      setFrames([]);
      setHistory([]);
      setHistoryIndex(-1);
      setPreviewFrame(null);
      setIsCropping(false);
      setCrop(undefined);
      setCompletedCrop(null);
      setToastMessage('Đã cắt ảnh thành công!');
    };
    newImg.src = croppedImageUrl;
  };
`;

content = content.replace(
  "const clearImage = () => {",
  handleApplyCropStr + "\n  const clearImage = () => {"
);

// 4. Update image preview UI
const imagePreviewStr = `
                <div className="bg-zinc-950 p-4 border border-zinc-800 rounded-xl flex justify-center overflow-hidden max-h-48 relative group">
                  <img 
                    src={image.src} 
                    alt="Original sprite sheet" 
                    className="max-w-full max-h-full object-contain pixelated"
                  />
                  <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-all">
                    <button 
                      onClick={() => setIsCropping(true)}
                      className="bg-indigo-500/90 hover:bg-indigo-500 text-white p-2 rounded-lg shadow-lg"
                      title="Cắt vùng ảnh"
                    >
                      <CropIcon size={16} />
                    </button>
                    <button 
                      onClick={clearImage}
                      className="bg-red-500/90 hover:bg-red-500 text-white p-2 rounded-lg shadow-lg"
                      title="Xóa ảnh"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
`;

content = content.replace(
  /<div className="bg-zinc-950 p-4 border border-zinc-800 rounded-xl flex justify-center overflow-hidden max-h-48 relative group">[\s\S]*?<\/div>/,
  imagePreviewStr.trim()
);

// 5. Add Crop Modal
const cropModalStr = `
      {/* Crop Modal */}
      {isCropping && image && (
        <div 
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={() => setIsCropping(false)}
        >
          <div 
            className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6 max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full flex justify-between items-center mb-5 border-b border-zinc-800/50 pb-4">
              <h3 className="text-xl font-bold text-white flex items-center">
                <CropIcon className="mr-2 text-indigo-400" /> Cắt vùng ảnh
              </h3>
              <button 
                onClick={() => setIsCropping(false)}
                className="text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50 transition-colors rounded-lg p-1"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="flex-1 overflow-auto bg-zinc-900 border border-zinc-800 rounded-xl flex items-center justify-center p-4 checkerboard min-h-[300px]">
              <ReactCrop 
                crop={crop} 
                onChange={c => setCrop(c)} 
                onComplete={c => setCompletedCrop(c)}
              >
                <img 
                  ref={imgRef}
                  src={image.src} 
                  alt="Crop preview" 
                  className="max-w-full max-h-[60vh] object-contain pixelated"
                />
              </ReactCrop>
            </div>
            
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setIsCropping(false)}
                className="bg-zinc-800 hover:bg-zinc-700 text-white px-5 py-2.5 rounded-xl font-medium transition-colors"
              >
                Hủy
              </button>
              <button
                onClick={handleApplyCrop}
                disabled={!completedCrop?.width || !completedCrop?.height}
                className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2.5 rounded-xl font-semibold shadow-lg shadow-indigo-500/20 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                <CheckSquare className="mr-2" size={18} /> Áp dụng
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Frame Preview Modal */}
`;

content = content.replace(
  "{/* Frame Preview Modal */}",
  cropModalStr.trim()
);

fs.writeFileSync('src/App.tsx', content);
console.log('Done');
