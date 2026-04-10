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
      'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp']
    },
    maxFiles: 1
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
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      const newFrames: Frame[] = [];
      
      if (sliceMethod === 'auto') {
        const minSize = Number(minAutoFrameSize) || 1;
        const connDist = Number(connectionDistance) || 0;
        
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = image.width;
        tempCanvas.height = image.height;
        const tempCtx = tempCanvas.getContext('2d');
        if (!tempCtx) return;
        
        tempCtx.drawImage(image, 0, 0);
        const imageData = tempCtx.getImageData(0, 0, image.width, image.height);
        const data = imageData.data;
        const width = image.width;
        const height = image.height;
        
        const visited = new Uint8Array(width * height);
        const boxes: {x: number, y: number, w: number, h: number}[] = [];
        
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
    <div className="min-h-screen bg-[#1a1a2e] text-[#e0e0e0] font-pixel p-4 md:p-8 flex flex-col items-center">
      <header className="w-full max-w-5xl mb-8 text-center">
        <h1 className="text-5xl md:text-7xl font-bold text-[#e94560] mb-2 tracking-widest drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)]">
          SliceSprite
        </h1>
        <p className="text-xl md:text-2xl text-[#0f3460] bg-[#16213e] inline-block px-4 py-1 border-2 border-[#0f3460] rounded-md">
          Pixel Art Sprite Sheet Splitter -  Error404 Labs - Kitajima2910
        </p>
      </header>

      <main className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Upload & Settings */}
        <div className="lg:col-span-1 space-y-6">
          {/* Upload Area */}
          <div className="bg-[#16213e] border-4 border-[#0f3460] rounded-lg p-4 shadow-lg">
            <h2 className="text-2xl mb-4 flex items-center border-b-2 border-[#0f3460] pb-2">
              <Upload className="mr-2" /> Upload Sprite
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
                <p className="text-xl">Drag & drop a sprite sheet here</p>
                <p className="text-sm text-gray-400 mt-2">or click to select file</p>
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
                    title="Remove image"
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
              <Settings className="mr-2" /> Settings
            </h2>
            
            <div className="space-y-4">
              <div className="flex bg-[#1a1a2e] rounded-md p-1 border-2 border-[#0f3460]">
                <button
                  className={`flex-1 py-2 text-sm md:text-lg flex items-center justify-center transition-colors ${sliceMethod === 'grid' ? 'bg-[#e94560] text-white' : 'text-gray-400 hover:text-white'}`}
                  onClick={() => setSliceMethod('grid')}
                >
                  <Grid3X3 className="mr-1 md:mr-2" size={18} /> Grid
                </button>
                <button
                  className={`flex-1 py-2 text-sm md:text-lg flex items-center justify-center transition-colors ${sliceMethod === 'size' ? 'bg-[#e94560] text-white' : 'text-gray-400 hover:text-white'}`}
                  onClick={() => setSliceMethod('size')}
                >
                  <Maximize className="mr-1 md:mr-2" size={18} /> Size
                </button>
                <button
                  className={`flex-1 py-2 text-sm md:text-lg flex items-center justify-center transition-colors ${sliceMethod === 'auto' ? 'bg-[#e94560] text-white' : 'text-gray-400 hover:text-white'}`}
                  onClick={() => setSliceMethod('auto')}
                >
                  <Wand2 className="mr-1 md:mr-2" size={18} /> Auto
                </button>
              </div>

              {sliceMethod === 'grid' && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-lg mb-1">Columns</label>
                    <input 
                      type="number" 
                      min="1" 
                      value={columns} 
                      onChange={(e) => setColumns(e.target.value === '' ? '' : Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-full bg-[#1a1a2e] border-2 border-[#0f3460] p-2 text-xl focus:border-[#e94560] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-lg mb-1">Rows</label>
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
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-lg mb-1">Width (px)</label>
                    <input 
                      type="number" 
                      min="1" 
                      value={frameWidth} 
                      onChange={(e) => setFrameWidth(e.target.value === '' ? '' : Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-full bg-[#1a1a2e] border-2 border-[#0f3460] p-2 text-xl focus:border-[#e94560] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-lg mb-1">Height (px)</label>
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
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-lg mb-1" title="Minimum width/height to be considered a frame">Min Size (px)</label>
                      <input 
                        type="number" 
                        min="1" 
                        value={minAutoFrameSize} 
                        onChange={(e) => setMinAutoFrameSize(e.target.value === '' ? '' : Math.max(1, parseInt(e.target.value) || 1))}
                        className="w-full bg-[#1a1a2e] border-2 border-[#0f3460] p-2 text-xl focus:border-[#e94560] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-lg mb-1" title="Distance to connect separated parts of a sprite">Join Gap (px)</label>
                      <input 
                        type="number" 
                        min="0" 
                        max="20"
                        value={connectionDistance} 
                        onChange={(e) => setConnectionDistance(e.target.value === '' ? '' : Math.max(0, parseInt(e.target.value) || 0))}
                        className="w-full bg-[#1a1a2e] border-2 border-[#0f3460] p-2 text-xl focus:border-[#e94560] focus:outline-none"
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <label className="block text-lg mb-2">Alignment (Standardized Size)</label>
                    <div className="flex bg-[#1a1a2e] rounded-md p-1 border-2 border-[#0f3460]">
                      <button
                        className={`flex-1 py-2 text-sm md:text-lg flex items-center justify-center transition-colors ${autoAlign === 'bottom' ? 'bg-[#e94560] text-white' : 'text-gray-400 hover:text-white'}`}
                        onClick={() => setAutoAlign('bottom')}
                      >
                        Bottom (Feet)
                      </button>
                      <button
                        className={`flex-1 py-2 text-sm md:text-lg flex items-center justify-center transition-colors ${autoAlign === 'center' ? 'bg-[#e94560] text-white' : 'text-gray-400 hover:text-white'}`}
                        onClick={() => setAutoAlign('center')}
                      >
                        Center
                      </button>
                    </div>
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
                    className="w-5 h-5 mr-2 accent-[#e94560]"
                  />
                  <label htmlFor="skipEmpty" className="text-lg cursor-pointer">Skip empty (transparent) frames</label>
                </div>
              )}

              <div className="pt-4 border-t-2 border-[#0f3460]">
                <button
                  onClick={handleSlice}
                  disabled={!image || isSlicing}
                  className="w-full bg-[#e94560] hover:bg-[#d83a56] text-white text-2xl py-3 border-b-4 border-[#8a2337] active:border-b-0 active:translate-y-1 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSlicing ? 'SLICING...' : 'SLICE SPRITE!'}
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
                  <ImageIcon className="mr-2" /> Preview
                </h2>
                {frames.length > 0 && (
                  <div className="flex bg-[#1a1a2e] rounded-md p-1 border-2 border-[#0f3460]">
                    <button
                      className={`px-4 py-1 text-lg flex items-center transition-colors ${previewTab === 'frames' ? 'bg-[#e94560] text-white' : 'text-gray-400 hover:text-white'}`}
                      onClick={() => setPreviewTab('frames')}
                    >
                      <Grid3X3 className="mr-2" size={16} /> Frames
                    </button>
                    <button
                      className={`px-4 py-1 text-lg flex items-center transition-colors ${previewTab === 'animation' ? 'bg-[#e94560] text-white' : 'text-gray-400 hover:text-white'}`}
                      onClick={() => setPreviewTab('animation')}
                    >
                      <Film className="mr-2" size={16} /> Animation
                    </button>
                  </div>
                )}
              </div>
              
              {frames.length > 0 && (
                <button
                  onClick={handleDownloadZip}
                  className="bg-[#0f3460] hover:bg-[#1a4b8c] text-white px-4 py-2 flex items-center text-lg border-b-4 border-[#0a2342] active:border-b-0 active:translate-y-1 transition-all"
                >
                  <Download className="mr-2" size={18} /> Download ZIP
                </button>
              )}
            </div>
            
            <div className="flex-1 bg-[#1a1a2e] border-2 border-[#0f3460] rounded p-4 overflow-y-auto flex flex-col">
              {frames.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center text-gray-500">
                  <Grid3X3 size={48} className="mb-4 opacity-50" />
                  <p className="text-2xl">Upload an image and click Slice</p>
                </div>
              ) : previewTab === 'frames' ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {frames.map((frame, index) => (
                    <div 
                      key={frame.id} 
                      className="bg-[#16213e] border-2 border-[#0f3460] rounded p-2 flex flex-col items-center group cursor-pointer hover:border-[#e94560] transition-colors relative"
                      onClick={() => setPreviewFrame(frame)}
                    >
                      <button
                        onClick={(e) => handleRemoveFrame(e, frame.id)}
                        className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity z-10"
                        title="Remove frame"
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
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center">
                  <div className="w-full max-w-md aspect-square flex items-center justify-center bg-[#1a1a2e] border-4 border-[#0f3460] rounded-lg mb-6 overflow-hidden checkerboard relative">
                    {frames[currentAnimFrame % frames.length] && (
                      <img 
                        src={frames[currentAnimFrame % frames.length].dataUrl} 
                        alt={`Animation Frame ${currentAnimFrame % frames.length}`} 
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
              <h3 className="text-3xl text-[#e94560]">Frame Preview</h3>
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
                alt="Frame Preview" 
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
                className="bg-[#0f3460] hover:bg-[#1a4b8c] text-white px-6 py-2 flex items-center text-xl border-b-4 border-[#0a2342] active:border-b-0 active:translate-y-1 transition-all rounded"
              >
                <Download className="mr-2" size={24} /> Download Frame
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
