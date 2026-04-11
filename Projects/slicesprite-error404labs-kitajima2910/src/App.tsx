/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { Upload, Download, Image as ImageIcon, Settings, Trash2, Grid3X3, Maximize, X, Wand2, Play, Pause, Film, Undo, Redo, CheckSquare, Square } from 'lucide-react';

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
  const [autoGroupMethod, setAutoGroupMethod] = useState<'pixel' | 'bbox'>('bbox');
  const [useCustomAutoCanvasSize, setUseCustomAutoCanvasSize] = useState<boolean>(false);
  const [autoCanvasWidth, setAutoCanvasWidth] = useState<number | ''>('');
  const [autoCanvasHeight, setAutoCanvasHeight] = useState<number | ''>('');
  
  // General settings
  const [skipEmpty, setSkipEmpty] = useState<boolean>(true);
  
  const [frames, setFrames] = useState<Frame[]>([]);
  const [selectedFrames, setSelectedFrames] = useState<Set<string>>(new Set());
  const [history, setHistory] = useState<Frame[][]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [isSlicing, setIsSlicing] = useState<boolean>(false);
  const [previewFrame, setPreviewFrame] = useState<Frame | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  
  // Animation settings
  const [previewTab, setPreviewTab] = useState<'frames' | 'animation'>('frames');
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [fps, setFps] = useState<number>(12);
  const [currentAnimFrame, setCurrentAnimFrame] = useState<number>(0);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sliceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Toast timeout effect
  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        setToastMessage(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

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
          setHistory([]);
          setHistoryIndex(-1);
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
      'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp']
    },
    maxFiles: 1
  } as any);

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

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (sliceTimeoutRef.current) {
        clearTimeout(sliceTimeoutRef.current);
      }
    };
  }, []);

  const handleRemoveFrame = (e: React.MouseEvent, idToRemove: string) => {
    e.stopPropagation();
    const newFrames = frames.filter(f => f.id !== idToRemove);
    setFrames(newFrames);
    
    if (selectedFrames.has(idToRemove)) {
      const newSelected = new Set(selectedFrames);
      newSelected.delete(idToRemove);
      setSelectedFrames(newSelected);
    }
    
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newFrames);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const toggleFrameSelection = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const newSelected = new Set(selectedFrames);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedFrames(newSelected);
  };

  const selectAllFrames = () => {
    setSelectedFrames(new Set(frames.map(f => f.id)));
  };

  const deselectAllFrames = () => {
    setSelectedFrames(new Set());
  };

  const handleDeleteSelected = () => {
    if (selectedFrames.size === 0) return;
    
    const newFrames = frames.filter(f => !selectedFrames.has(f.id));
    setFrames(newFrames);
    setSelectedFrames(new Set());
    
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newFrames);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const handleSlice = () => {
    if (!image || !canvasRef.current) return;
    
    setIsSlicing(true);
    
    if (sliceTimeoutRef.current) {
      clearTimeout(sliceTimeoutRef.current);
    }
    
    sliceTimeoutRef.current = setTimeout(() => {
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
        let boxes: {x: number, y: number, w: number, h: number}[] = [];
        
        const floodFillDist = autoGroupMethod === 'pixel' ? connDist : 0;
        
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
                for (let dy = -floodFillDist; dy <= floodFillDist; dy++) {
                  for (let dx = -floodFillDist; dx <= floodFillDist; dx++) {
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
              if (autoGroupMethod === 'bbox') {
                boxes.push({ x: minX, y: minY, w: bw, h: bh });
              } else {
                if (bw >= minSize && bh >= minSize) {
                  boxes.push({ x: minX, y: minY, w: bw, h: bh });
                }
              }
            } else {
              visited[i] = 1;
            }
          }
        }
        
        if (autoGroupMethod === 'bbox' && boxes.length > 0) {
          let merged = true;
          while (merged) {
            merged = false;
            for (let i = 0; i < boxes.length; i++) {
              for (let j = i + 1; j < boxes.length; j++) {
                const b1 = boxes[i];
                const b2 = boxes[j];
                
                const b1Right = b1.x + b1.w;
                const b1Bottom = b1.y + b1.h;
                const b2Right = b2.x + b2.w;
                const b2Bottom = b2.y + b2.h;
                
                const dx = Math.max(0, Math.max(b1.x - b2Right, b2.x - b1Right));
                const dy = Math.max(0, Math.max(b1.y - b2Bottom, b2.y - b1Bottom));
                
                if (dx <= connDist && dy <= connDist) {
                  const newX = Math.min(b1.x, b2.x);
                  const newY = Math.min(b1.y, b2.y);
                  const newRight = Math.max(b1Right, b2Right);
                  const newBottom = Math.max(b1Bottom, b2Bottom);
                  
                  boxes[i] = {
                    x: newX,
                    y: newY,
                    w: newRight - newX,
                    h: newBottom - newY
                  };
                  
                  boxes.splice(j, 1);
                  merged = true;
                  break;
                }
              }
              if (merged) break;
            }
          }
          
          boxes = boxes.filter(b => b.w >= minSize && b.h >= minSize);
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
        
        if (useCustomAutoCanvasSize && autoCanvasWidth && autoCanvasHeight) {
          maxWidth = Number(autoCanvasWidth);
          maxHeight = Number(autoCanvasHeight);
        } else {
          boxes.forEach(box => {
            if (box.w > maxWidth) maxWidth = box.w;
            if (box.h > maxHeight) maxHeight = box.h;
          });
        }

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
      setSelectedFrames(new Set());
      
      const newHistory = history.slice(0, historyIndex + 1);
      newHistory.push(newFrames);
      setHistory(newHistory);
      setHistoryIndex(newHistory.length - 1);
      
      setIsSlicing(false);
      setToastMessage(`Đã cắt thành công ${newFrames.length} frame!`);
    }, 300); // Debounced delay to prevent performance issues
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setFrames(history[newIndex]);
      setSelectedFrames(new Set());
    } else if (historyIndex === 0) {
      setHistoryIndex(-1);
      setFrames([]);
      setSelectedFrames(new Set());
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      setFrames(history[newIndex]);
      setSelectedFrames(new Set());
    }
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
    setAutoGroupMethod('bbox');
    setUseCustomAutoCanvasSize(false);
    setAutoCanvasWidth('');
    setAutoCanvasHeight('');
    setPreviewTab('frames');
    setCurrentAnimFrame(0);
    setHistory([]);
    setHistoryIndex(-1);
    setSelectedFrames(new Set());
  };

  return (
    <div className="min-h-screen bg-[#1a1a2e] text-[#e0e0e0] font-pixel p-4 md:p-8 flex flex-col items-center">
      <header className="w-full max-w-5xl mb-8 text-center">
        <h1 className="text-5xl md:text-7xl font-bold text-[#e94560] mb-2 tracking-widest drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)]">
          SliceSprite
        </h1>
        <p className="text-sm sm:text-lg md:text-xl text-[#0f3460] bg-[#16213e] inline-block px-4 py-2 border-2 border-[#0f3460] rounded-md">
          Công cụ cắt Sprite Sheet Pixel Art -  Error404 Labs - Kitajima2910
        </p>
      </header>

      <main className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Upload & Settings */}
        <div className="lg:col-span-1 space-y-6">
          {/* Upload Area */}
          <div className="bg-[#16213e] border-4 border-[#0f3460] rounded-lg p-4 shadow-lg">
            <h2 className="text-2xl mb-4 flex items-center border-b-2 border-[#0f3460] pb-2">
              <Upload className="mr-2" /> Tải ảnh lên
            </h2>
            
            {!image ? (
              <div 
                {...getRootProps()} 
                className={`border-4 border-dashed p-8 text-center cursor-pointer transition-colors duration-200 ${
                  isDragActive ? 'border-[#e94560] bg-[#1a1a2e]' : 'border-[#0f3460] hover:border-[#e94560] hover:bg-[#1a1a2e]'
                }`}
              >
                <input {...getInputProps()} />
                <ImageIcon className="mx-auto h-12 w-12 text-[#e94560] mb-4" />
                <p className="text-xl">Kéo & thả sprite sheet vào đây</p>
                <p className="text-sm text-gray-400 mt-2">hoặc click để chọn file</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="bg-[#1a1a2e] p-2 border-2 border-[#0f3460] rounded flex justify-center overflow-hidden max-h-48 relative group">
                  <img 
                    src={image.src} 
                    alt="Original sprite sheet" 
                    className="max-w-full max-h-full object-contain pixelated"
                  />
                  <button 
                    onClick={clearImage}
                    className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Xóa ảnh"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                <div className="text-center text-sm text-gray-400">
                  {image.width} x {image.height} px
                </div>
              </div>
            )}
          </div>

          {/* Settings Area */}
          <div className={`bg-[#16213e] border-4 border-[#0f3460] rounded-lg p-4 shadow-lg transition-opacity duration-300 ${!image ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
            <h2 className="text-2xl mb-4 flex items-center border-b-2 border-[#0f3460] pb-2">
              <Settings className="mr-2" /> Cài đặt
            </h2>
            
            <div className="space-y-4">
              <div className="flex bg-[#1a1a2e] rounded-md p-1 border-2 border-[#0f3460]">
                <button
                  className={`flex-1 py-2 text-xs sm:text-sm md:text-base font-bold flex items-center justify-center transition-colors ${sliceMethod === 'grid' ? 'bg-[#e94560] text-white' : 'text-gray-400 hover:text-white'}`}
                  onClick={() => setSliceMethod('grid')}
                >
                  <Grid3X3 className="mr-1" size={16} /> Lưới
                </button>
                <button
                  className={`flex-1 py-2 text-xs sm:text-sm md:text-base font-bold flex items-center justify-center transition-colors ${sliceMethod === 'size' ? 'bg-[#e94560] text-white' : 'text-gray-400 hover:text-white'}`}
                  onClick={() => setSliceMethod('size')}
                >
                  <Maximize className="mr-1" size={16} /> Kích cỡ
                </button>
                <button
                  className={`flex-1 py-2 text-xs sm:text-sm md:text-base font-bold flex items-center justify-center transition-colors ${sliceMethod === 'auto' ? 'bg-[#e94560] text-white' : 'text-gray-400 hover:text-white'}`}
                  onClick={() => setSliceMethod('auto')}
                >
                  <Wand2 className="mr-1" size={16} /> Tự động
                </button>
              </div>

              {sliceMethod === 'grid' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-base md:text-lg mb-1">Số cột</label>
                    <input 
                      type="number" 
                      min="1" 
                      value={columns} 
                      onChange={(e) => setColumns(e.target.value === '' ? '' : Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-full bg-[#1a1a2e] border-2 border-[#0f3460] p-2 text-xl focus:border-[#e94560] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-base md:text-lg mb-1">Số hàng</label>
                    <input 
                      type="number" 
                      min="1" 
                      value={rows} 
                      onChange={(e) => setRows(e.target.value === '' ? '' : Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-full bg-[#1a1a2e] border-2 border-[#0f3460] p-2 text-xl focus:border-[#e94560] focus:outline-none"
                    />
                  </div>
                </div>
              )}
              
              {sliceMethod === 'size' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-base md:text-lg mb-1">Rộng (px)</label>
                    <input 
                      type="number" 
                      min="1" 
                      value={frameWidth} 
                      onChange={(e) => setFrameWidth(e.target.value === '' ? '' : Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-full bg-[#1a1a2e] border-2 border-[#0f3460] p-2 text-xl focus:border-[#e94560] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-base md:text-lg mb-1">Cao (px)</label>
                    <input 
                      type="number" 
                      min="1" 
                      value={frameHeight} 
                      onChange={(e) => setFrameHeight(e.target.value === '' ? '' : Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-full bg-[#1a1a2e] border-2 border-[#0f3460] p-2 text-xl focus:border-[#e94560] focus:outline-none"
                    />
                  </div>
                </div>
              )}

              {sliceMethod === 'auto' && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-base md:text-lg mb-1" title="Chiều rộng/cao tối thiểu để được tính là một frame">Cỡ nhỏ nhất (px)</label>
                      <input 
                        type="number" 
                        min="1" 
                        value={minAutoFrameSize} 
                        onChange={(e) => setMinAutoFrameSize(e.target.value === '' ? '' : Math.max(1, parseInt(e.target.value) || 1))}
                        className="w-full bg-[#1a1a2e] border-2 border-[#0f3460] p-2 text-xl focus:border-[#e94560] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-base md:text-lg mb-1" title="Khoảng cách để nối các phần bị tách rời của sprite">Khoảng cách nối</label>
                      <input 
                        type="number" 
                        min="0" 
                        max="50"
                        value={connectionDistance} 
                        onChange={(e) => setConnectionDistance(e.target.value === '' ? '' : Math.max(0, parseInt(e.target.value) || 0))}
                        className="w-full bg-[#1a1a2e] border-2 border-[#0f3460] p-2 text-xl focus:border-[#e94560] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-base md:text-lg mb-1" title="Cách gộp các phần rời rạc">Phương pháp gộp</label>
                      <select
                        value={autoGroupMethod}
                        onChange={(e) => setAutoGroupMethod(e.target.value as 'pixel' | 'bbox')}
                        className="w-full bg-[#1a1a2e] border-2 border-[#0f3460] p-2 text-xl focus:border-[#e94560] focus:outline-none"
                      >
                        <option value="bbox">Vùng bao</option>
                        <option value="pixel">Pixel</option>
                      </select>
                    </div>
                  </div>
                  <div className="mt-4">
                    <label className="block text-base md:text-lg mb-2">Căn lề (Kích thước chuẩn)</label>
                    <div className="flex bg-[#1a1a2e] rounded-md p-1 border-2 border-[#0f3460]">
                      <button
                        className={`flex-1 py-2 text-xs sm:text-sm md:text-base font-bold flex items-center justify-center transition-colors ${autoAlign === 'bottom' ? 'bg-[#e94560] text-white' : 'text-gray-400 hover:text-white'}`}
                        onClick={() => setAutoAlign('bottom')}
                      >
                        Dưới đáy
                      </button>
                      <button
                        className={`flex-1 py-2 text-xs sm:text-sm md:text-base font-bold flex items-center justify-center transition-colors ${autoAlign === 'center' ? 'bg-[#e94560] text-white' : 'text-gray-400 hover:text-white'}`}
                        onClick={() => setAutoAlign('center')}
                      >
                        Chính giữa
                      </button>
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className="flex items-center space-x-2 cursor-pointer mb-2">
                      <input 
                        type="checkbox" 
                        checked={useCustomAutoCanvasSize}
                        onChange={(e) => setUseCustomAutoCanvasSize(e.target.checked)}
                        className="w-5 h-5 accent-[#e94560]"
                      />
                      <span className="text-base md:text-lg">Kích thước Canvas tùy chỉnh</span>
                    </label>
                    
                    {useCustomAutoCanvasSize && (
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm text-gray-400 mb-1">Rộng (px)</label>
                          <input 
                            type="number" 
                            min="1" 
                            value={autoCanvasWidth} 
                            onChange={(e) => setAutoCanvasWidth(e.target.value === '' ? '' : Math.max(1, parseInt(e.target.value) || 1))}
                            className="w-full bg-[#1a1a2e] border-2 border-[#0f3460] p-2 text-xl focus:border-[#e94560] focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-sm text-gray-400 mb-1">Cao (px)</label>
                          <input 
                            type="number" 
                            min="1" 
                            value={autoCanvasHeight} 
                            onChange={(e) => setAutoCanvasHeight(e.target.value === '' ? '' : Math.max(1, parseInt(e.target.value) || 1))}
                            className="w-full bg-[#1a1a2e] border-2 border-[#0f3460] p-2 text-xl focus:border-[#e94560] focus:outline-none"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </>
              )}

              {(sliceMethod === 'grid' || sliceMethod === 'size') && (
                <div className="flex items-center mt-2">
                  <input 
                    type="checkbox" 
                    id="skipEmpty" 
                    checked={skipEmpty}
                    onChange={(e) => setSkipEmpty(e.target.checked)}
                    className="w-5 h-5 mr-2 accent-[#e94560] shrink-0"
                  />
                  <label htmlFor="skipEmpty" className="text-sm md:text-base cursor-pointer leading-tight">Bỏ qua các ảnh trống (trong suốt)</label>
                </div>
              )}

              <div className="pt-4 border-t-2 border-[#0f3460]">
                <button
                  onClick={handleSlice}
                  disabled={!image || isSlicing}
                  className="w-full bg-[#e94560] hover:bg-[#d83a56] text-white text-xl md:text-2xl font-bold py-3 border-b-4 border-[#8a2337] active:border-b-0 active:translate-y-1 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSlicing ? 'ĐANG CẮT...' : 'CẮT ẢNH!'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Preview */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-[#16213e] border-4 border-[#0f3460] rounded-lg p-4 shadow-lg min-h-[500px] flex flex-col">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 border-b-2 border-[#0f3460] pb-2 gap-4">
              <div className="flex items-center gap-4">
                <h2 className="text-2xl flex items-center">
                  <ImageIcon className="mr-2" /> Xem trước
                </h2>
                
                <div className="flex bg-[#1a1a2e] rounded-md p-1 border-2 border-[#0f3460]">
                  <button
                    onClick={handleUndo}
                    disabled={historyIndex < 0 || isSlicing}
                    className={`px-2 py-1 flex items-center transition-colors ${historyIndex >= 0 && !isSlicing ? 'text-gray-400 hover:text-white' : 'text-gray-600 cursor-not-allowed'}`}
                    title="Hoàn tác (Undo)"
                  >
                    <Undo size={18} />
                  </button>
                  <div className="w-px bg-[#0f3460] mx-1"></div>
                  <button
                    onClick={handleRedo}
                    disabled={historyIndex >= history.length - 1 || isSlicing}
                    className={`px-2 py-1 flex items-center transition-colors ${historyIndex < history.length - 1 && !isSlicing ? 'text-gray-400 hover:text-white' : 'text-gray-600 cursor-not-allowed'}`}
                    title="Làm lại (Redo)"
                  >
                    <Redo size={18} />
                  </button>
                </div>

                {frames.length > 0 && (
                  <div className="flex bg-[#1a1a2e] rounded-md p-1 border-2 border-[#0f3460]">
                    <button
                      className={`px-3 py-1 text-sm md:text-base font-bold flex items-center transition-colors ${previewTab === 'frames' ? 'bg-[#e94560] text-white' : 'text-gray-400 hover:text-white'}`}
                      onClick={() => setPreviewTab('frames')}
                    >
                      <Grid3X3 className="mr-1 md:mr-2" size={16} /> Từng ảnh
                    </button>
                    <button
                      className={`px-3 py-1 text-sm md:text-base font-bold flex items-center transition-colors ${previewTab === 'animation' ? 'bg-[#e94560] text-white' : 'text-gray-400 hover:text-white'}`}
                      onClick={() => setPreviewTab('animation')}
                    >
                      <Film className="mr-1 md:mr-2" size={16} /> Ảnh động
                    </button>
                  </div>
                )}
              </div>
              
              {frames.length > 0 && (
                <button
                  onClick={handleDownloadZip}
                  className="bg-[#0f3460] hover:bg-[#1a4b8c] text-white px-3 md:px-4 py-2 flex items-center text-sm md:text-base font-bold border-b-4 border-[#0a2342] active:border-b-0 active:translate-y-1 transition-all"
                >
                  <Download className="mr-1 md:mr-2" size={18} /> Tải ZIP
                </button>
              )}
            </div>
            
            <div className="flex-1 bg-[#1a1a2e] border-2 border-[#0f3460] rounded p-4 overflow-y-auto flex flex-col">
              {frames.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center text-gray-500">
                  <Grid3X3 size={48} className="mb-4 opacity-50" />
                  <p className="text-2xl">Tải ảnh lên và nhấn Cắt</p>
                </div>
              ) : previewTab === 'frames' ? (
                <div className="flex flex-col h-full">
                  <div className="flex justify-between items-center mb-4 bg-[#16213e] p-2 rounded border-2 border-[#0f3460]">
                    <div className="flex gap-2">
                      <button
                        onClick={selectAllFrames}
                        className="text-sm bg-[#0f3460] hover:bg-[#1a4b8c] text-white px-3 py-1 rounded transition-colors"
                      >
                        Chọn tất cả
                      </button>
                      <button
                        onClick={deselectAllFrames}
                        className="text-sm bg-[#0f3460] hover:bg-[#1a4b8c] text-white px-3 py-1 rounded transition-colors"
                      >
                        Bỏ chọn
                      </button>
                    </div>
                    {selectedFrames.size > 0 && (
                      <button
                        onClick={handleDeleteSelected}
                        className="text-sm bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded flex items-center transition-colors"
                      >
                        <Trash2 size={16} className="mr-1" /> Xóa đã chọn ({selectedFrames.size})
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {frames.map((frame, index) => (
                      <div 
                        key={frame.id} 
                        className={`bg-[#16213e] border-2 rounded p-2 flex flex-col items-center group cursor-pointer transition-colors relative ${selectedFrames.has(frame.id) ? 'border-[#e94560]' : 'border-[#0f3460] hover:border-[#e94560]'}`}
                        onClick={() => setPreviewFrame(frame)}
                      >
                        <button
                          onClick={(e) => toggleFrameSelection(e, frame.id)}
                          className="absolute top-1 left-1 bg-[#1a1a2e]/80 text-white p-1 rounded z-10 hover:text-[#e94560] transition-colors"
                          title="Chọn frame"
                        >
                          {selectedFrames.has(frame.id) ? <CheckSquare size={18} className="text-[#e94560]" /> : <Square size={18} />}
                        </button>
                        <button
                          onClick={(e) => handleRemoveFrame(e, frame.id)}
                          className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity z-10"
                          title="Xóa frame"
                        >
                          <Trash2 size={14} />
                        </button>
                        <div className="w-full aspect-square flex items-center justify-center bg-[#1a1a2e] mb-2 overflow-hidden checkerboard">
                          <img 
                            src={frame.dataUrl} 
                            alt={`Frame ${index}`} 
                            className="max-w-full max-h-full object-contain pixelated group-hover:scale-150 transition-transform duration-200"
                          />
                        </div>
                        <span className="text-sm text-gray-400">Frame {index}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center">
                  <div className="w-full max-w-md aspect-square flex items-center justify-center bg-[#1a1a2e] border-4 border-[#0f3460] rounded-lg mb-6 overflow-hidden checkerboard relative">
                    {frames[currentAnimFrame % frames.length] && (
                      <img 
                        src={frames[currentAnimFrame % frames.length].dataUrl} 
                        alt={`Frame hoạt ảnh ${currentAnimFrame % frames.length}`} 
                        className="max-w-full max-h-full object-contain pixelated scale-150 md:scale-200"
                      />
                    )}
                    <div className="absolute top-2 right-2 bg-black/50 px-2 py-1 rounded text-sm">
                      {frames[currentAnimFrame % frames.length]?.width}x{frames[currentAnimFrame % frames.length]?.height}
                    </div>
                  </div>
                  
                  <div className="w-full max-w-md bg-[#16213e] border-2 border-[#0f3460] rounded-lg p-4 flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="bg-[#e94560] hover:bg-[#d83a56] text-white p-3 rounded-full flex items-center justify-center transition-colors"
                      >
                        {isPlaying ? <Pause size={24} /> : <Play size={24} className="ml-1" />}
                      </button>
                      
                      <div className="text-xl font-bold text-[#e94560]">
                        Frame {(currentAnimFrame % frames.length) + 1} / {frames.length}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <span className="text-lg w-20">FPS: {fps}</span>
                      <input 
                        type="range" 
                        min="1" 
                        max="60" 
                        value={fps} 
                        onChange={(e) => setFps(parseInt(e.target.value))}
                        className="flex-1 accent-[#e94560]"
                      />
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
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={() => setPreviewFrame(null)}
        >
          <div 
            className="bg-[#16213e] border-4 border-[#0f3460] rounded-lg p-6 max-w-3xl max-h-[90vh] flex flex-col items-center shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full flex justify-between items-center mb-4 border-b-2 border-[#0f3460] pb-2">
              <h3 className="text-3xl text-[#e94560]">Xem trước Frame</h3>
              <button 
                onClick={() => setPreviewFrame(null)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X size={32} />
              </button>
            </div>
            
            <div className="bg-[#1a1a2e] border-2 border-[#0f3460] rounded p-8 overflow-auto max-h-[60vh] flex items-center justify-center checkerboard w-full min-h-[300px]">
              <img 
                src={previewFrame.dataUrl} 
                alt="Xem trước Frame" 
                className="max-w-full max-h-full object-contain pixelated scale-150 md:scale-200"
              />
            </div>
            
            <div className="mt-6 flex gap-4 w-full justify-between items-center">
              <div className="text-xl text-gray-400 bg-[#1a1a2e] px-4 py-2 rounded border-2 border-[#0f3460]">
                {previewFrame.width} x {previewFrame.height} px
              </div>
              <button
                onClick={() => {
                  saveAs(previewFrame.dataUrl, `${imageName || 'sprite'}_${previewFrame.id}.png`);
                }}
                className="bg-[#0f3460] hover:bg-[#1a4b8c] text-white px-4 md:px-6 py-2 flex items-center text-lg md:text-xl font-bold border-b-4 border-[#0a2342] active:border-b-0 active:translate-y-1 transition-all rounded"
              >
                <Download className="mr-2" size={20} /> Tải ảnh này
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 bg-[#e94560] text-white px-6 py-3 rounded-lg shadow-2xl flex items-center gap-3 z-50 toast-animate">
          <CheckSquare size={20} />
          <span className="font-bold text-lg">{toastMessage}</span>
        </div>
      )}
      
      <style>{`
        @keyframes slideUpFade {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .toast-animate {
          animation: slideUpFade 0.3s ease-out forwards;
        }
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
