/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { Upload, Download, Image as ImageIcon, Settings, Trash2, Grid3X3, Maximize, X, Wand2, Play, Pause, Film } from 'lucide-react';

type SliceMethod = 'grid' | 'size' | 'auto';

interface Frame {
  id: string;
  dataUrl: string;
  width: number;
  height: number;
}

export default function App() {
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [imageName, setImageName] = useState<string>('');
  const [sliceMethod, setSliceMethod] = useState<SliceMethod>('grid');

  // Grid settings
  const [columns, setColumns] = useState<number | ''>(4);
  const [rows, setRows] = useState<number | ''>(4);

  // Size settings
  const [frameWidth, setFrameWidth] = useState<number | ''>(32);
  const [frameHeight, setFrameHeight] = useState<number | ''>(32);

  // Auto settings
  const [minAutoFrameSize, setMinAutoFrameSize] = useState<number | ''>(5);
  const [connectionDistance, setConnectionDistance] = useState<number | ''>(1);
  const [autoAlign, setAutoAlign] = useState<'center' | 'bottom'>('bottom');

  // General settings
  const [skipEmpty, setSkipEmpty] = useState<boolean>(true);

  const [frames, setFrames] = useState<Frame[]>([]);
  const [isSlicing, setIsSlicing] = useState<boolean>(false);
  const [previewFrame, setPreviewFrame] = useState<Frame | null>(null);

  // Animation settings
  const [previewTab, setPreviewTab] = useState<'frames' | 'animation'>('frames');
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [fps, setFps] = useState<number>(12);
  const [currentAnimFrame, setCurrentAnimFrame] = useState<number>(0);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          setImage(img);
          setImageName(file.name.replace(/\.[^/.]+$/, ""));
          setFrames([]);
          setPreviewFrame(null);

          // Auto-guess frame size if using grid
          if (sliceMethod === 'grid') {
            const c = Number(columns) || 4;
            const r = Number(rows) || 4;
            setFrameWidth(Math.floor(img.width / c));
            setFrameHeight(Math.floor(img.height / r));
          } else if (sliceMethod === 'size') {
            const fw = Number(frameWidth) || 32;
            const fh = Number(frameHeight) || 32;
            setColumns(Math.floor(img.width / fw) || 1);
            setRows(Math.floor(img.height / fh) || 1);
          } else {
            const c = Number(columns) || 4;
            const r = Number(rows) || 4;
            setFrameWidth(Math.floor(img.width / c));
            setFrameHeight(Math.floor(img.height / r));
          }
        };
        img.src = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  }, [columns, rows, frameWidth, frameHeight, sliceMethod]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/png': ['.png'],
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/gif': ['.gif'],
      'image/webp': ['.webp']
    },
    maxFiles: 1,
    multiple: false,
    onDragEnter: undefined,
    onDragOver: undefined,
    onDragLeave: undefined
  });

  useEffect(() => {
    if (image && sliceMethod === 'grid') {
      const c = Number(columns) || 1;
      const r = Number(rows) || 1;
      setFrameWidth(Math.floor(image.width / c));
      setFrameHeight(Math.floor(image.height / r));
    } else if (image && sliceMethod === 'size') {
      const fw = Number(frameWidth) || 1;
      const fh = Number(frameHeight) || 1;
      setColumns(Math.floor(image.width / fw) || 1);
      setRows(Math.floor(image.height / fh) || 1);
    }
  }, [columns, rows, frameWidth, frameHeight, sliceMethod, image]);

  // Animation effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && frames.length > 0 && previewTab === 'animation') {
      interval = setInterval(() => {
        setCurrentAnimFrame((prev) => (prev + 1) % frames.length);
      }, 1000 / fps);
    }
    return () => clearInterval(interval);
  }, [isPlaying, frames, fps, previewTab]);

  // Reset animation when frames change
  useEffect(() => {
    setCurrentAnimFrame(0);
    if (frames.length === 0) {
      setPreviewTab('frames');
    }
  }, [frames]);

  const handleRemoveFrame = (e: React.MouseEvent, idToRemove: string) => {
    e.stopPropagation();
    setFrames(prev => prev.filter(f => f.id !== idToRemove));
  };

  const handleSlice = () => {
    if (!image || !canvasRef.current) return;

    setIsSlicing(true);

    setTimeout(() => {
      const canvas = canvasRef.current!;
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      if (!ctx) return;

      const newFrames: Frame[] = [];

      if (sliceMethod === 'auto') {
        const minSize = Number(minAutoFrameSize) || 1;
        const connDist = Number(connectionDistance) || 0;

        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = image.width;
        tempCanvas.height = image.height;
        const tempCtx = tempCanvas.getContext('2d', { willReadFrequently: true });
        if (!tempCtx) return;

        tempCtx.drawImage(image, 0, 0);
        const imageData = tempCtx.getImageData(0, 0, image.width, image.height);
        const data = imageData.data;
        const width = image.width;
        const height = image.height;

        const visited = new Uint8Array(width * height);
        const boxes: { x: number, y: number, w: number, h: number }[] = [];

        for (let y = 0; y < height; y++) {
          for (let x = 0; x < width; x++) {
            const i = y * width + x;
            if (visited[i]) continue;

            const alpha = data[i * 4 + 3];
            if (alpha > 0) {
              let minX = x, minY = y, maxX = x, maxY = y;
              const stackX = [x];
              const stackY = [y];
              visited[i] = 1;

              while (stackX.length > 0) {
                const cx = stackX.pop()!;
                const cy = stackY.pop()!;

                if (cx < minX) minX = cx;
                if (cx > maxX) maxX = cx;
                if (cy < minY) minY = cy;
                if (cy > maxY) maxY = cy;

                // Check neighborhood based on connectionDistance
                for (let dy = -connDist; dy <= connDist; dy++) {
                  for (let dx = -connDist; dx <= connDist; dx++) {
                    if (dx === 0 && dy === 0) continue;
                    const nx = cx + dx;
                    const ny = cy + dy;

                    if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
                      const ni = ny * width + nx;
                      if (!visited[ni] && data[ni * 4 + 3] > 0) {
                        visited[ni] = 1;
                        stackX.push(nx);
                        stackY.push(ny);
                      }
                    }
                  }
                }
              }

              const bw = maxX - minX + 1;
              const bh = maxY - minY + 1;
              if (bw >= minSize && bh >= minSize) {
                boxes.push({ x: minX, y: minY, w: bw, h: bh });
              }
            } else {
              visited[i] = 1;
            }
          }
        }

        // Sort boxes top-to-bottom, left-to-right
        boxes.sort((a, b) => {
          if (Math.abs(a.y - b.y) > Math.min(a.h, b.h) / 2) {
            return a.y - b.y;
          }
          return a.x - b.x;
        });

        // Find max width and height to standardize frame size
        let maxWidth = 0;
        let maxHeight = 0;
        boxes.forEach(box => {
          if (box.w > maxWidth) maxWidth = box.w;
          if (box.h > maxHeight) maxHeight = box.h;
        });

        boxes.forEach((box, index) => {
          canvas.width = maxWidth;
          canvas.height = maxHeight;
          ctx.clearRect(0, 0, maxWidth, maxHeight);

          // Calculate position based on alignment
          const dx = Math.floor((maxWidth - box.w) / 2);
          const dy = autoAlign === 'bottom' ? maxHeight - box.h : Math.floor((maxHeight - box.h) / 2);

          ctx.drawImage(
            image,
            box.x, box.y, box.w, box.h,
            dx, dy, box.w, box.h
          );

          newFrames.push({
            id: `frame_auto_${index}`,
            dataUrl: canvas.toDataURL('image/png'),
            width: maxWidth,
            height: maxHeight
          });
        });
      } else {
        let cols = Number(columns) || 1;
        let rws = Number(rows) || 1;
        let fw = Number(frameWidth) || 32;
        let fh = Number(frameHeight) || 32;

        if (sliceMethod === 'grid') {
          fw = image.width / cols;
          fh = image.height / rws;
        } else {
          cols = Math.floor(image.width / fw) || 1;
          rws = Math.floor(image.height / fh) || 1;
        }

        canvas.width = fw;
        canvas.height = fh;

        for (let y = 0; y < rws; y++) {
          for (let x = 0; x < cols; x++) {
            ctx.clearRect(0, 0, fw, fh);
            ctx.drawImage(
              image,
              x * fw, y * fh, fw, fh,
              0, 0, fw, fh
            );

            let isEmpty = false;
            if (skipEmpty) {
              const frameData = ctx.getImageData(0, 0, fw, fh).data;
              isEmpty = true;
              for (let i = 3; i < frameData.length; i += 4) {
                if (frameData[i] > 0) {
                  isEmpty = false;
                  break;
                }
              }
            }

            if (!isEmpty) {
              newFrames.push({
                id: `frame_${y}_${x}`,
                dataUrl: canvas.toDataURL('image/png'),
                width: fw,
                height: fh
              });
            }
          }
        }
      }

      setFrames(newFrames);
      setIsSlicing(false);
    }, 50); // Small delay to allow UI to update
  };

  const handleDownloadZip = async () => {
    if (frames.length === 0) return;

    const zip = new JSZip();
    const folderName = imageName || 'sprites';
    const folder = zip.folder(folderName);

    if (!folder) return;

    frames.forEach((frame, index) => {
      // Remove the data:image/png;base64, part
      const base64Data = frame.dataUrl.replace(/^data:image\/(png|jpg);base64,/, "");
      // Pad index with zeros (e.g., 000, 001, 002)
      const paddedIndex = index.toString().padStart(3, '0');
      folder.file(`${folderName}_${paddedIndex}.png`, base64Data, { base64: true });
    });

    const content = await zip.generateAsync({ type: 'blob' });
    saveAs(content, `${folderName}.zip`);
  };

  const clearImage = () => {
    setImage(null);
    setImageName('');
    setFrames([]);
    setPreviewFrame(null);
    setColumns(4);
    setRows(4);
    setFrameWidth(32);
    setFrameHeight(32);
    setMinAutoFrameSize(5);
    setConnectionDistance(1);
    setPreviewTab('frames');
    setCurrentAnimFrame(0);
  };

  return (
    <div className="min-h-screen text-slate-200 p-4 md:p-8 flex flex-col items-center">
      <header className="w-full max-w-6xl mb-12 text-center animate-in fade-in slide-in-from-top duration-700">
        <h1 className="text-6xl md:text-8xl font-extrabold text-white mb-4 tracking-tighter filter drop-shadow-[0_0_20px_rgba(233,69,96,0.4)]">
          Slice<span className="text-[#e94560]">Sprite</span>
        </h1>
        <div className="inline-block relative">
          <p className="text-lg md:text-xl text-slate-400 font-medium tracking-wide uppercase px-6 py-2 rounded-full glass-panel border border-white/5">
            Công cụ cắt Sprite Pixel Art <span className="mx-2 text-white/20">|</span> <span className="text-slate-300">Error404-Labs</span>
          </p>
        </div>
      </header>

      <main className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Upload & Settings */}
        <div className="lg:col-span-4 space-y-6 animate-in fade-in slide-in-from-left duration-700">
          {/* Upload Area */}
          <div className="glass-panel rounded-2xl p-6 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-1 h-full bg-[#e94560]"></div>
            <h2 className="text-xl font-bold mb-6 flex items-center text-white">
              <Upload className="mr-3 text-[#e94560]" size={20} /> Tải Sprite lên
            </h2>

            {!image ? (
              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-all duration-300 group ${isDragActive ? 'border-[#e94560] bg-[#e94560]/5 scale-[0.98]' : 'border-white/10 hover:border-[#e94560]/50 hover:bg-white/5'
                  }`}
              >
                <input {...getInputProps()} />
                <div className="bg-[#e94560]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <ImageIcon className="text-[#e94560]" size={32} />
                </div>
                <p className="text-lg font-semibold text-white">Kéo & thả sprite sheet</p>
                <p className="text-sm text-slate-500 mt-2">hoặc nhấn để chọn file</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="bg-black/40 p-2 border border-white/10 rounded-xl flex justify-center overflow-hidden max-h-48 relative group/img">
                  <img
                    src={image.src}
                    alt="Original sprite sheet"
                    className="max-w-full max-h-full object-contain pixelated"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                    <button
                      onClick={clearImage}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full flex items-center shadow-lg transition-transform active:scale-95"
                    >
                      <Trash2 size={16} className="mr-2" /> Xóa ảnh
                    </button>
                  </div>
                </div>
                <div className="flex justify-between items-center px-2">
                  <span className="text-xs font-mono text-slate-500 uppercase tracking-widest">Kích thước</span>
                  <span className="text-sm font-bold text-[#e94560]">{image.width} × {image.height} px</span>
                </div>
              </div>
            )}
          </div>

          {/* Settings Area */}
          <div className={`glass-panel rounded-2xl p-6 shadow-2xl relative overflow-hidden transition-all duration-500 ${!image ? 'opacity-40 grayscale pointer-events-none translate-y-4' : 'opacity-100 translate-y-0'}`}>
            <div className="absolute top-0 left-0 w-1 h-full bg-[#e94560]"></div>
            <h2 className="text-xl font-bold mb-6 flex items-center text-white">
              <Settings className="mr-3 text-[#e94560]" size={20} /> Thiết lập
            </h2>

            <div className="space-y-6">
              <div className="flex bg-black/20 rounded-xl p-1 border border-white/10">
                <button
                  className={`flex-1 py-2 px-1 text-sm font-semibold rounded-lg flex items-center justify-center transition-all ${sliceMethod === 'grid' ? 'bg-[#e94560] text-white shadow-[0_0_15px_rgba(233,69,96,0.3)]' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                  onClick={() => setSliceMethod('grid')}
                >
                  <Grid3X3 className="mr-2" size={14} /> Lưới
                </button>
                <button
                  className={`flex-1 py-2 px-1 text-sm font-semibold rounded-lg flex items-center justify-center transition-all ${sliceMethod === 'size' ? 'bg-[#e94560] text-white shadow-[0_0_15px_rgba(233,69,96,0.3)]' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                  onClick={() => setSliceMethod('size')}
                >
                  <Maximize className="mr-2" size={14} /> Kích thước
                </button>
                <button
                  className={`flex-1 py-2 px-1 text-sm font-semibold rounded-lg flex items-center justify-center transition-all ${sliceMethod === 'auto' ? 'bg-[#e94560] text-white shadow-[0_0_15px_rgba(233,69,96,0.3)]' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                  onClick={() => setSliceMethod('auto')}
                >
                  <Wand2 className="mr-2" size={14} /> Tự động
                </button>
              </div>

              {sliceMethod === 'grid' && (
                <div className="grid grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-2 duration-300">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Số cột</label>
                    <input
                      type="number"
                      min="1"
                      value={columns}
                      onChange={(e) => setColumns(e.target.value === '' ? '' : Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-lg text-white focus:border-[#e94560]/50 focus:ring-1 focus:ring-[#e94560]/50 outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Số hàng</label>
                    <input
                      type="number"
                      min="1"
                      value={rows}
                      onChange={(e) => setRows(e.target.value === '' ? '' : Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-lg text-white focus:border-[#e94560]/50 focus:ring-1 focus:ring-[#e94560]/50 outline-none transition-all"
                    />
                  </div>
                </div>
              )}

              {sliceMethod === 'size' && (
                <div className="grid grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-2 duration-300">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Rộng (px)</label>
                    <input
                      type="number"
                      min="1"
                      value={frameWidth}
                      onChange={(e) => setFrameWidth(e.target.value === '' ? '' : Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-lg text-white focus:border-[#e94560]/50 focus:ring-1 focus:ring-[#e94560]/50 outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Cao (px)</label>
                    <input
                      type="number"
                      min="1"
                      value={frameHeight}
                      onChange={(e) => setFrameHeight(e.target.value === '' ? '' : Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-lg text-white focus:border-[#e94560]/50 focus:ring-1 focus:ring-[#e94560]/50 outline-none transition-all"
                    />
                  </div>
                </div>
              )}

              {sliceMethod === 'auto' && (
                <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Tối thiểu (px)</label>
                      <input
                        type="number"
                        min="1"
                        value={minAutoFrameSize}
                        onChange={(e) => setMinAutoFrameSize(e.target.value === '' ? '' : Math.max(1, parseInt(e.target.value) || 1))}
                        className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-lg text-white focus:border-[#e94560]/50 focus:ring-1 focus:ring-[#e94560]/50 outline-none transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Khoảng cách</label>
                      <input
                        type="number"
                        min="0"
                        max="20"
                        value={connectionDistance}
                        onChange={(e) => setConnectionDistance(e.target.value === '' ? '' : Math.max(0, parseInt(e.target.value) || 0))}
                        className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-lg text-white focus:border-[#e94560]/50 focus:ring-1 focus:ring-[#e94560]/50 outline-none transition-all"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Căn chỉnh</label>
                    <div className="flex bg-black/20 rounded-xl p-1 border border-white/10">
                      <button
                        className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${autoAlign === 'bottom' ? 'bg-[#e94560] text-white' : 'text-slate-400 hover:text-white'}`}
                        onClick={() => setAutoAlign('bottom')}
                      >
                        Gốc (Chân)
                      </button>
                      <button
                        className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${autoAlign === 'center' ? 'bg-[#e94560] text-white' : 'text-slate-400 hover:text-white'}`}
                        onClick={() => setAutoAlign('center')}
                      >
                        Trung tâm
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {(sliceMethod === 'grid' || sliceMethod === 'size') && (
                <label className="flex items-center space-x-3 cursor-pointer group/check">
                  <div className="relative">
                    <input
                      type="checkbox"
                      id="skipEmpty"
                      checked={skipEmpty}
                      onChange={(e) => setSkipEmpty(e.target.checked)}
                      className="peer hidden"
                    />
                    <div className="w-6 h-6 border-2 border-white/10 rounded-md peer-checked:bg-[#e94560] peer-checked:border-[#e94560] transition-all"></div>
                    <svg className="absolute top-1 left-1 w-4 h-4 text-white opacity-0 peer-checked:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-slate-300 group-hover/check:text-white transition-colors">Bỏ qua các khung hình trống</span>
                </label>
              )}

              <div className="pt-4">
                <button
                  onClick={handleSlice}
                  disabled={!image || isSlicing}
                  className="w-full bg-[#e94560] hover:bg-[#ff4d6d] hover:shadow-[0_0_25px_rgba(233,69,96,0.5)] text-white font-bold text-xl py-4 rounded-xl shadow-lg transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
                >
                  {isSlicing ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      ĐANG CẮT...
                    </span>
                  ) : 'BẮT ĐẦU CẮT SPRITE'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Preview */}
        <div className="lg:col-span-8 space-y-6 animate-in fade-in slide-in-from-right duration-700">
          <div className="glass-panel rounded-2xl p-6 shadow-2xl min-h-[600px] flex flex-col relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#e94560]/5 rounded-full -mr-16 -mt-16 blur-2xl"></div>

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4 z-10">
              <div className="flex flex-wrap items-center gap-4">
                <h2 className="text-xl font-bold flex items-center text-white mr-2">
                  <ImageIcon className="mr-3 text-[#e94560]" size={20} /> Xem trước
                </h2>
                {frames.length > 0 && (
                  <div className="flex bg-black/20 rounded-xl p-1 border border-white/10">
                    <button
                      className={`px-4 py-2 text-sm font-semibold rounded-lg flex items-center transition-all ${previewTab === 'frames' ? 'bg-white/10 text-white shadow-inner' : 'text-slate-400 hover:text-white'}`}
                      onClick={() => setPreviewTab('frames')}
                    >
                      <Grid3X3 className="mr-2" size={14} /> Khung hình
                    </button>
                    <button
                      className={`px-4 py-2 text-sm font-semibold rounded-lg flex items-center transition-all ${previewTab === 'animation' ? 'bg-white/10 text-white shadow-inner' : 'text-slate-400 hover:text-white'}`}
                      onClick={() => setPreviewTab('animation')}
                    >
                      <Film className="mr-2" size={14} /> Hoạt ảnh
                    </button>
                  </div>
                )}
              </div>

              {frames.length > 0 && (
                <button
                  onClick={handleDownloadZip}
                  className="bg-[#e94560] hover:bg-[#ff4d6d] text-white px-6 py-2.5 rounded-xl flex items-center shadow-lg transition-all active:scale-95 group"
                >
                  <Download className="mr-2 group-hover:translate-y-0.5 transition-transform" size={18} /> Tải ZIP
                </button>
              )}
            </div>

            <div className="flex-1 bg-black/30 border border-white/10 rounded-2xl p-6 overflow-y-auto flex flex-col relative">
              {frames.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center text-slate-600">
                  <div className="w-24 h-24 rounded-full border-2 border-dashed border-slate-700 flex items-center justify-center mb-4">
                    <Grid3X3 size={40} className="opacity-20" />
                  </div>
                  <p className="text-xl font-medium">Tải ảnh lên và nhấn Bắt đầu cắt</p>
                  <p className="text-sm mt-1">Kết quả sẽ hiển thị tại đây</p>
                </div>
              ) : previewTab === 'frames' ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-4">
                  {frames.map((frame, index) => (
                    <div
                      key={frame.id}
                      className="glass-panel border-white/5 rounded-lg p-2 flex flex-col items-center group cursor-pointer hover:border-[#e94560] hover:bg-[#e94560]/5 transition-all duration-200 relative animate-in zoom-in-95"
                      onClick={() => setPreviewFrame(frame)}
                    >
                      <button
                        onClick={(e) => handleRemoveFrame(e, frame.id)}
                        className="absolute top-1 right-1 bg-red-500 hover:bg-red-600 text-white p-1 rounded opacity-0 group-hover:opacity-100 transition-all z-20 shadow-lg"
                      >
                        <Trash2 size={14} />
                      </button>
                      <div className="w-full aspect-square flex items-center justify-center rounded bg-black/40 mb-2 overflow-hidden checkerboard relative">
                        <img
                          src={frame.dataUrl}
                          alt={`Khung ${index}`}
                          className="max-w-full max-h-full p-2 object-contain pixelated group-hover:scale-150 transition-transform duration-300"
                        />
                      </div>
                      <div className="flex justify-between w-full px-1">
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">#{index}</span>
                        <span className="text-[10px] font-bold text-[#e94560]">{frame.width}×{frame.height}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center animate-in fade-in duration-500 py-8">
                  <div className="w-full max-w-sm aspect-square flex items-center justify-center bg-black/40 border-2 border-white/5 rounded-xl mb-8 overflow-hidden checkerboard relative shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                    {frames[currentAnimFrame % frames.length] && (
                      <img
                        src={frames[currentAnimFrame % frames.length].dataUrl}
                        alt={`Hoạt ảnh khung ${currentAnimFrame % frames.length}`}
                        className="max-w-full max-h-full p-8 object-contain pixelated scale-150 md:scale-[2.5]"
                      />
                    )}
                    <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-md border border-white/10 text-[10px] font-bold tracking-widest text-[#e94560] uppercase">
                      {frames[currentAnimFrame % frames.length]?.width} x {frames[currentAnimFrame % frames.length]?.height} PX
                    </div>
                  </div>

                  <div className="w-full max-w-sm glass-panel rounded-2xl p-6 flex flex-col gap-6 shadow-2xl border-t border-white/10">
                    <div className="flex items-center justify-between">
                      <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="bg-[#e94560] hover:bg-[#ff4d6d] text-white w-14 h-14 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(233,69,96,0.3)] transition-all active:scale-90"
                      >
                        {isPlaying ? <Pause size={28} fill="currentColor" /> : <Play size={28} fill="currentColor" className="ml-1" />}
                      </button>

                      <div className="flex flex-col items-end">
                        <span className="text-4xl font-black text-white leading-none tracking-tighter">
                          {(currentAnimFrame % frames.length) + 1}
                          <span className="text-lg text-slate-600 ml-1 font-bold">/ {frames.length}</span>
                        </span>
                        <span className="text-xs uppercase font-bold tracking-widest text-[#e94560] mt-1">Đang phát</span>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex justify-between items-center text-xs font-bold uppercase tracking-widest text-slate-400">
                        <span>Tốc độ (FPS)</span>
                        <span className="text-white bg-[#e94560] px-2 py-0.5 rounded text-[10px]">{fps}</span>
                      </div>
                      <div className="relative flex items-center">
                        <input
                          type="range"
                          min="1"
                          max="60"
                          value={fps}
                          onChange={(e) => setFps(parseInt(e.target.value))}
                          className="w-full h-1 bg-white/5 rounded-lg appearance-none cursor-pointer accent-[#e94560]"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Hidden canvas for processing */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Frame Preview Modal */}
      {previewFrame && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 backdrop-blur-xl animate-in fade-in duration-300"
          onClick={() => setPreviewFrame(null)}
        >
          <div
            className="glass-panel rounded-3xl p-8 max-w-4xl w-full flex flex-col items-center shadow-2xl relative animate-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setPreviewFrame(null)}
              className="absolute top-6 right-6 text-slate-400 hover:text-white hover:rotate-90 transition-all"
            >
              <X size={32} />
            </button>

            <div className="w-full mb-8">
              <h3 className="text-3xl font-black text-white">Xem trước khung hình</h3>
              <p className="text-slate-500 font-medium font-mono uppercase tracking-widest text-xs mt-1">Chi tiết Frame #{frames.indexOf(previewFrame)}</p>
            </div>

            <div className="bg-black/40 border border-white/5 rounded-3xl p-8 overflow-hidden flex items-center justify-center checkerboard w-full min-h-[300px] max-h-[65vh] md:max-h-[70vh] neo-border">
              <img
                src={previewFrame.dataUrl}
                alt="Xem trước khung hình"
                className="object-contain pixelated transition-transform duration-300 shadow-inner"
                style={{
                  imageRendering: 'pixelated',
                  width: previewFrame.width * 2,
                  height: previewFrame.height * 2,
                  maxWidth: '100%',
                  maxHeight: '100%'
                }}
              />
            </div>

            <div className="mt-10 flex flex-col md:flex-row gap-6 w-full justify-between items-center">
              <div className="flex items-center space-x-4 bg-white/5 px-6 py-3 rounded-2xl border border-white/10">
                <div className="w-3 h-3 rounded-full bg-[#e94560] animate-pulse"></div>
                <span className="text-xl font-bold text-white tracking-wider uppercase font-mono">
                  {previewFrame.width} <span className="text-slate-600">×</span> {previewFrame.height} <span className="text-slate-600">PX</span>
                </span>
              </div>
              <button
                onClick={() => {
                  saveAs(previewFrame.dataUrl, `${imageName || 'sprite'}_frame_${frames.indexOf(previewFrame)}.png`);
                }}
                className="w-full md:w-auto bg-[#e94560] hover:bg-[#ff4d6d] text-white px-10 py-4 flex items-center justify-center text-xl font-bold rounded-2xl shadow-xl transition-all active:scale-95 group"
              >
                <Download className="mr-3 group-hover:translate-y-1 transition-transform" size={24} /> Tải xuống ngay
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .checkerboard {
          background-image: 
            linear-gradient(45deg, #2a2a4a 25%, transparent 25%), 
            linear-gradient(-45deg, #2a2a4a 25%, transparent 25%), 
            linear-gradient(45deg, transparent 75%, #2a2a4a 75%), 
            linear-gradient(-45deg, transparent 75%, #2a2a4a 75%);
          background-size: 10px 10px;
          background-position: 0 0, 0 5px, 5px -5px, -5px 0px;
        }
      `}</style>
    </div>
  );
}
