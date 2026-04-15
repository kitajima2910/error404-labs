/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import GIF from 'gif.js';
import { Upload, Download, Image as ImageIcon, Settings, Trash2, Grid3X3, Maximize, X, Wand2, Play, Pause, Film, Undo, Redo, CheckSquare, Square, ZoomIn, ZoomOut, Video, Crop as CropIcon, Info, LayoutGrid, List, Sun, Moon, FolderOpen, FlipHorizontal, FlipVertical, Palette, Loader2, ArrowDownToLine, AlignCenter, Code2, Check, ChevronDown, Share2 } from 'lucide-react';
import ReactCrop, { type Crop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { get, set } from 'idb-keyval';

type SliceMethod = 'grid' | 'size' | 'auto';

interface Frame {
  id: string;
  dataUrl: string;
  width: number;
  height: number;
}

type FilterType = 'none' | 'grayscale' | 'sepia' | 'invert';


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


const TooltipLabel = ({ label, tooltip, htmlFor, className = "mb-1" }: { label: string, tooltip: string, htmlFor?: string, className?: string }) => (
  <div className={`flex items-center ${className}`}>
    <label htmlFor={htmlFor} className="block text-sm font-medium text-zinc-400 dark:text-zinc-600 dark:text-zinc-300">{label}</label>
    <div className="group relative ml-1.5 flex items-center">
      <Info size={14} className="text-zinc-400 dark:text-zinc-500 hover:text-zinc-400 dark:text-zinc-600 dark:text-zinc-300 cursor-help transition-colors" />
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-zinc-100 dark:bg-zinc-800 text-xs text-zinc-700 dark:text-zinc-200 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 text-center pointer-events-none border border-zinc-300 dark:border-zinc-700">
        {tooltip}
        <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-zinc-800"></div>
      </div>
    </div>
  </div>
);

export default function App() {
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [imageName, setImageName] = useState<string>('');
  const [sliceMethod, setSliceMethod] = useState<SliceMethod>('grid');
  const [imageFilter, setImageFilter] = useState<FilterType>('none');
  
  // Grid settings
  const [columns, setColumns] = useState<number | ''>(4);
  const [rows, setRows] = useState<number | ''>(4);
  
  // Size settings
  const [frameWidth, setFrameWidth] = useState<number | ''>(32);
  const [frameHeight, setFrameHeight] = useState<number | ''>(32);
  
  // Auto settings
  const [minAutoFrameSize, setMinAutoFrameSize] = useState<number | ''>(5);
  const [connectionDistance, setConnectionDistance] = useState<number | ''>(1);
  const [colorTolerance, setColorTolerance] = useState<number | ''>(10);
  const [autoAlign, setAutoAlign] = useState<'center' | 'bottom'>('bottom');
  const [autoGroupMethod, setAutoGroupMethod] = useState<'pixel' | 'bbox' | 'color'>('bbox');
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
  const [isGeneratingGif, setIsGeneratingGif] = useState<boolean>(false);
  const [isGeneratingVideo, setIsGeneratingVideo] = useState<boolean>(false);
  const [isGeneratingZip, setIsGeneratingZip] = useState<boolean>(false);
  const [previewFrame, setPreviewFrame] = useState<Frame | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [isCropping, setIsCropping] = useState<boolean>(false);
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<Crop | null>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  
  // Animation settings
  const [previewTab, setPreviewTab] = useState<'frames' | 'animation'>('frames');
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [fps, setFps] = useState<number>(12);
  const [currentAnimFrame, setCurrentAnimFrame] = useState<number>(0);
  const [animZoom, setAnimZoom] = useState<number>(2);
  const [modalZoom, setModalZoom] = useState<number>(2);
  const [animTimelineView, setAnimTimelineView] = useState<'row' | 'grid'>('row');
  const [showDeleteAllConfirm, setShowDeleteAllConfirm] = useState<boolean>(false);
  const [showHelpModal, setShowHelpModal] = useState<boolean>(false);
  
  // Theme state
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light' || savedTheme === 'dark') return savedTheme;
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  });

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const [skinTheme, setSkinTheme] = useState<string>(() => {
    return localStorage.getItem('skinTheme') || 'indigo';
  });
  const [showThemeMenu, setShowThemeMenu] = useState(false);
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [settingsTab, setSettingsTab] = useState<'slice' | 'ui'>('slice');

  const [uiFontFamily, setUiFontFamily] = useState<string>(() => {
    return localStorage.getItem('uiFontFamily') || 'font-sans';
  });
  const [uiFontSize, setUiFontSize] = useState<string>(() => {
    return localStorage.getItem('uiFontSize') || 'text-base';
  });
  const [uiLineHeight, setUiLineHeight] = useState<string>(() => {
    return localStorage.getItem('uiLineHeight') || 'leading-normal';
  });

  useEffect(() => {
    localStorage.setItem('uiFontFamily', uiFontFamily);
  }, [uiFontFamily]);

  useEffect(() => {
    localStorage.setItem('uiFontSize', uiFontSize);
  }, [uiFontSize]);

  useEffect(() => {
    localStorage.setItem('uiLineHeight', uiLineHeight);
  }, [uiLineHeight]);

  useEffect(() => {
    if (skinTheme === 'indigo') {
      document.documentElement.removeAttribute('data-theme');
    } else {
      document.documentElement.setAttribute('data-theme', skinTheme);
    }
    localStorage.setItem('skinTheme', skinTheme);
  }, [skinTheme]);

  const THEMES = [
    { id: 'indigo', name: 'Mặc định', color: '#6366f1' },
    { id: 'rose', name: 'Hồng', color: '#f43f5e' },
    { id: 'emerald', name: 'Ngọc bích', color: '#10b981' },
    { id: 'amber', name: 'Hổ phách', color: '#f59e0b' },
    { id: 'violet', name: 'Tím', color: '#8b5cf6' },
    { id: 'cyan', name: 'Xanh lơ', color: '#06b6d4' },
  ];
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sliceTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const animContainerRef = useRef<HTMLDivElement>(null);
  const modalContainerRef = useRef<HTMLDivElement>(null);

  // Auto-save state
  const [isStateLoaded, setIsStateLoaded] = useState(false);

  // Load state on mount
  useEffect(() => {
    const loadState = async () => {
      try {
        const savedState = await get('sliceSpriteState');
        if (savedState) {
          if (savedState.imageSrc) {
            const img = new Image();
            img.onload = () => {
              setImage(img);
              setIsStateLoaded(true);
            };
            img.src = savedState.imageSrc;
          } else {
            setIsStateLoaded(true);
          }
          
          if (savedState.imageName) setImageName(savedState.imageName);
          if (savedState.sliceMethod) setSliceMethod(savedState.sliceMethod);
          if (savedState.imageFilter) setImageFilter(savedState.imageFilter);
          if (savedState.columns !== undefined) setColumns(savedState.columns);
          if (savedState.rows !== undefined) setRows(savedState.rows);
          if (savedState.frameWidth !== undefined) setFrameWidth(savedState.frameWidth);
          if (savedState.frameHeight !== undefined) setFrameHeight(savedState.frameHeight);
          if (savedState.minAutoFrameSize !== undefined) setMinAutoFrameSize(savedState.minAutoFrameSize);
          if (savedState.connectionDistance !== undefined) setConnectionDistance(savedState.connectionDistance);
          if (savedState.colorTolerance !== undefined) setColorTolerance(savedState.colorTolerance);
          if (savedState.autoAlign) setAutoAlign(savedState.autoAlign);
          if (savedState.autoGroupMethod) setAutoGroupMethod(savedState.autoGroupMethod);
          if (savedState.useCustomAutoCanvasSize !== undefined) setUseCustomAutoCanvasSize(savedState.useCustomAutoCanvasSize);
          if (savedState.autoCanvasWidth !== undefined) setAutoCanvasWidth(savedState.autoCanvasWidth);
          if (savedState.autoCanvasHeight !== undefined) setAutoCanvasHeight(savedState.autoCanvasHeight);
          if (savedState.skipEmpty !== undefined) setSkipEmpty(savedState.skipEmpty);
          if (savedState.frames) setFrames(savedState.frames);
          if (savedState.fps) setFps(savedState.fps);
          if (savedState.previewTab) setPreviewTab(savedState.previewTab);
          if (savedState.animTimelineView) setAnimTimelineView(savedState.animTimelineView);
          
          if (savedState.history) setHistory(savedState.history);
          if (savedState.historyIndex !== undefined) setHistoryIndex(savedState.historyIndex);
        } else {
          setIsStateLoaded(true);
        }
      } catch (error) {
        console.error('Failed to load state:', error);
        setIsStateLoaded(true);
      }
    };
    loadState();
  }, []);

  // Save state when it changes
  useEffect(() => {
    if (!isStateLoaded) return;
    
    const saveState = async () => {
      try {
        const stateToSave = {
          imageSrc: image?.src || null,
          imageName,
          sliceMethod,
          imageFilter,
          columns,
          rows,
          frameWidth,
          frameHeight,
          minAutoFrameSize,
          connectionDistance,
          colorTolerance,
          autoAlign,
          autoGroupMethod,
          useCustomAutoCanvasSize,
          autoCanvasWidth,
          autoCanvasHeight,
          skipEmpty,
          frames,
          fps,
          previewTab,
          animTimelineView,
          history,
          historyIndex
        };
        await set('sliceSpriteState', stateToSave);
      } catch (error) {
        console.error('Failed to save state:', error);
      }
    };
    
    // Debounce the save to avoid too many writes
    const timeoutId = setTimeout(saveState, 1000);
    return () => clearTimeout(timeoutId);
  }, [
    isStateLoaded,
    image,
    imageName,
    sliceMethod,
    imageFilter,
    columns,
    rows,
    frameWidth,
    frameHeight,
    minAutoFrameSize,
    connectionDistance,
    colorTolerance,
    autoAlign,
    autoGroupMethod,
    useCustomAutoCanvasSize,
    autoCanvasWidth,
    autoCanvasHeight,
    skipEmpty,
    frames,
    fps,
    previewTab,
    animTimelineView,
    history,
    historyIndex
  ]);

  const handleZoomToFitAnim = () => {
    if (!animContainerRef.current || frames.length === 0) return;
    const frame = frames[currentAnimFrame % frames.length];
    if (!frame) return;
    const container = animContainerRef.current;
    const padding = 40;
    const scaleX = (container.clientWidth - padding) / frame.width;
    const scaleY = (container.clientHeight - padding) / frame.height;
    setAnimZoom(Math.max(0.1, Math.min(scaleX, scaleY, 20)));
  };

  const handleZoomToFitModal = () => {
    if (!modalContainerRef.current || !previewFrame) return;
    const container = modalContainerRef.current;
    const padding = 40;
    const scaleX = (container.clientWidth - padding) / previewFrame.width;
    const scaleY = (container.clientHeight - padding) / previewFrame.height;
    setModalZoom(Math.max(0.1, Math.min(scaleX, scaleY, 20)));
  };

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

  const handleFolderUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    // Filter image files
    const fileArray = Array.from(files) as File[];
    const imageFiles = fileArray.filter(file => file.type.startsWith('image/'));
    if (imageFiles.length === 0) {
      setToastMessage("Không tìm thấy file ảnh nào trong thư mục.");
      return;
    }

    // Sort files by name to maintain sequence
    imageFiles.sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: 'base' }));

    const newFrames: Frame[] = [];
    let loadedCount = 0;

    imageFiles.forEach((file, index) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          newFrames.push({
            id: `folder-frame-${Date.now()}-${index}`,
            dataUrl: event.target?.result as string,
            width: img.width,
            height: img.height,
          });
          
          loadedCount++;
          if (loadedCount === imageFiles.length) {
            // Sort again just in case onload fired out of order
            newFrames.sort((a, b) => {
              const aIndex = parseInt(a.id.split('-').pop() || '0');
              const bIndex = parseInt(b.id.split('-').pop() || '0');
              return aIndex - bIndex;
            });
            
            setFrames(newFrames);
            setHistory([newFrames]);
            setHistoryIndex(0);
            setImage(null); // Clear sprite sheet image
            
            // Try to get folder name from webkitRelativePath
            const folderName = imageFiles[0].webkitRelativePath ? imageFiles[0].webkitRelativePath.split('/')[0] : 'imported-folder';
            setImageName(folderName);
            
            setPreviewTab('animation'); // Switch to animation tab
            setToastMessage(`Đã tải lên ${newFrames.length} frames từ thư mục.`);
          }
        };
        img.src = event.target?.result as string;
      };
      reader.readAsDataURL(file);
    });
  };

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

  const handleShareFrame = async () => {
    if (!previewFrame) return;
    try {
      const response = await fetch(previewFrame.dataUrl);
      const blob = await response.blob();
      const file = new File([blob], `${imageName || 'sprite'}_${previewFrame.id}.png`, { type: 'image/png' });
      
      if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: 'Sprite Frame',
          text: 'Chia sẻ frame này từ Sprite Slicer',
          files: [file]
        });
      } else {
        setToastMessage('Trình duyệt của bạn không hỗ trợ chia sẻ file.');
      }
    } catch (error) {
      console.error('Error sharing:', error);
      setToastMessage('Có lỗi xảy ra khi chia sẻ.');
    }
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

  const flipFrames = (direction: 'horizontal' | 'vertical') => {
    if (frames.length === 0) return;
    
    const targetIds = selectedFrames.size > 0 ? selectedFrames : new Set(frames.map(f => f.id));
    
    const newFrames = [...frames];
    let processedCount = 0;
    
    newFrames.forEach((frame, index) => {
      if (!targetIds.has(frame.id)) {
        processedCount++;
        return;
      }
      
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = frame.width;
        canvas.height = frame.height;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        
        if (direction === 'horizontal') {
          ctx.translate(frame.width, 0);
          ctx.scale(-1, 1);
        } else {
          ctx.translate(0, frame.height);
          ctx.scale(1, -1);
        }
        
        ctx.drawImage(img, 0, 0);
        newFrames[index] = {
          ...frame,
          dataUrl: canvas.toDataURL('image/png')
        };
        
        processedCount++;
        if (processedCount === newFrames.length) {
          setFrames(newFrames);
          const newHistory = history.slice(0, historyIndex + 1);
          newHistory.push(newFrames);
          setHistory(newHistory);
          setHistoryIndex(newHistory.length - 1);
          setToastMessage(`Đã lật ${targetIds.size} frames.`);
        }
      };
      img.src = frame.dataUrl;
    });
  };

  const handleSlice = () => {
    if (!image || !canvasRef.current) return;
    
    setIsSlicing(true);
    
    if (sliceTimeoutRef.current) {
      clearTimeout(sliceTimeoutRef.current);
    }
    
    sliceTimeoutRef.current = setTimeout(() => {
      const canvas = canvasRef.current!;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      const newFrames: Frame[] = [];
      
      // Create a source canvas with the filter applied
      const sourceCanvas = document.createElement('canvas');
      sourceCanvas.width = image.width;
      sourceCanvas.height = image.height;
      const sourceCtx = sourceCanvas.getContext('2d');
      if (!sourceCtx) return;
      
      switch (imageFilter) {
        case 'grayscale': sourceCtx.filter = 'grayscale(100%)'; break;
        case 'sepia': sourceCtx.filter = 'sepia(100%)'; break;
        case 'invert': sourceCtx.filter = 'invert(100%)'; break;
        default: sourceCtx.filter = 'none'; break;
      }
      sourceCtx.drawImage(image, 0, 0);
      
      if (sliceMethod === 'auto') {
        const minSize = Number(minAutoFrameSize) || 1;
        const connDist = Number(connectionDistance) || 0;
        const colTol = Number(colorTolerance) || 0;
        
        const imageData = sourceCtx.getImageData(0, 0, image.width, image.height);
        const data = imageData.data;
        const width = image.width;
        const height = image.height;
        
        const visited = new Uint8Array(width * height);
        let boxes: {x: number, y: number, w: number, h: number}[] = [];
        
        const floodFillDist = (autoGroupMethod === 'pixel' || autoGroupMethod === 'color') ? Math.max(1, connDist) : 1;
        
        // Use a single typed array for the stack to avoid GC overhead and improve performance
        const stack = new Int32Array(width * height);
        
        for (let y = 0; y < height; y++) {
          for (let x = 0; x < width; x++) {
            const i = y * width + x;
            if (visited[i]) continue;
            
            const alpha = data[i * 4 + 3];
            if (alpha > 0) {
              let minX = x, minY = y, maxX = x, maxY = y;
              let stackPtr = 0;
              stack[stackPtr++] = i;
              visited[i] = 1;
              
              while (stackPtr > 0) {
                const ci = stack[--stackPtr];
                const cx = ci % width;
                const cy = Math.floor(ci / width);
                
                if (cx < minX) minX = cx;
                if (cx > maxX) maxX = cx;
                if (cy < minY) minY = cy;
                if (cy > maxY) maxY = cy;
                
                let isBoundary = false;
                
                // First, check immediate neighbors (distance 1)
                for (let dy = -1; dy <= 1; dy++) {
                  for (let dx = -1; dx <= 1; dx++) {
                    if (dx === 0 && dy === 0) continue;
                    const nx = cx + dx;
                    const ny = cy + dy;
                    
                    if (nx < 0 || nx >= width || ny < 0 || ny >= height) {
                      isBoundary = true;
                      continue;
                    }
                    
                    const ni = ny * width + nx;
                    const nAlpha = data[ni * 4 + 3];
                    
                    if (nAlpha === 0) {
                      isBoundary = true;
                    } else {
                      let sameComponent = false;
                      if (autoGroupMethod === 'color') {
                        const r1 = data[ci * 4];
                        const g1 = data[ci * 4 + 1];
                        const b1 = data[ci * 4 + 2];
                        const a1 = data[ci * 4 + 3];
                        const r2 = data[ni * 4];
                        const g2 = data[ni * 4 + 1];
                        const b2 = data[ni * 4 + 2];
                        const a2 = data[ni * 4 + 3];
                        const diff = Math.abs(r1 - r2) + Math.abs(g1 - g2) + Math.abs(b1 - b2) + Math.abs(a1 - a2);
                        if (diff <= colTol) sameComponent = true;
                      } else {
                        sameComponent = true;
                      }
                      
                      if (!sameComponent) {
                        isBoundary = true;
                      } else if (!visited[ni]) {
                        visited[ni] = 1;
                        stack[stackPtr++] = ni;
                      }
                    }
                  }
                }
                
                // If it's a boundary pixel and we need to check further
                if (isBoundary && floodFillDist > 1) {
                  const startDy = Math.max(-floodFillDist, -cy);
                  const endDy = Math.min(floodFillDist, height - 1 - cy);
                  const startDx = Math.max(-floodFillDist, -cx);
                  const endDx = Math.min(floodFillDist, width - 1 - cx);
                  
                  for (let dy = startDy; dy <= endDy; dy++) {
                    const ny = cy + dy;
                    const yOffset = ny * width;
                    for (let dx = startDx; dx <= endDx; dx++) {
                      if (dx >= -1 && dx <= 1 && dy >= -1 && dy <= 1) continue;
                      
                      const nx = cx + dx;
                      const ni = yOffset + nx;
                      
                      if (!visited[ni] && data[ni * 4 + 3] > 0) {
                        let shouldAdd = false;
                        if (autoGroupMethod === 'color') {
                          const r1 = data[ci * 4];
                          const g1 = data[ci * 4 + 1];
                          const b1 = data[ci * 4 + 2];
                          const a1 = data[ci * 4 + 3];
                          const r2 = data[ni * 4];
                          const g2 = data[ni * 4 + 1];
                          const b2 = data[ni * 4 + 2];
                          const a2 = data[ni * 4 + 3];
                          const diff = Math.abs(r1 - r2) + Math.abs(g1 - g2) + Math.abs(b1 - b2) + Math.abs(a1 - a2);
                          if (diff <= colTol) {
                            shouldAdd = true;
                          }
                        } else {
                          shouldAdd = true;
                        }
                        
                        if (shouldAdd) {
                          visited[ni] = 1;
                          stack[stackPtr++] = ni;
                        }
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
          // Optimize bounding box merging using Disjoint Set Union (DSU)
          // This reduces complexity from O(N^3) to O(N^2)
          const parent = new Int32Array(boxes.length);
          for (let i = 0; i < boxes.length; i++) parent[i] = i;
          
          const find = (i: number): number => {
            if (parent[i] === i) return i;
            return parent[i] = find(parent[i]);
          };
          
          const union = (i: number, j: number) => {
            const rootI = find(i);
            const rootJ = find(j);
            if (rootI !== rootJ) {
              parent[rootI] = rootJ;
            }
          };
          
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
                union(i, j);
              }
            }
          }
          
          const mergedBoxesMap = new Map<number, {x: number, y: number, w: number, h: number}>();
          for (let i = 0; i < boxes.length; i++) {
            const root = find(i);
            const b = boxes[i];
            if (!mergedBoxesMap.has(root)) {
              mergedBoxesMap.set(root, { ...b });
            } else {
              const mb = mergedBoxesMap.get(root)!;
              const mbRight = mb.x + mb.w;
              const mbBottom = mb.y + mb.h;
              const bRight = b.x + b.w;
              const bBottom = b.y + b.h;
              
              const newX = Math.min(mb.x, b.x);
              const newY = Math.min(mb.y, b.y);
              const newRight = Math.max(mbRight, bRight);
              const newBottom = Math.max(mbBottom, bBottom);
              
              mb.x = newX;
              mb.y = newY;
              mb.w = newRight - newX;
              mb.h = newBottom - newY;
            }
          }
          
          boxes = Array.from(mergedBoxesMap.values()).filter(b => b.w >= minSize && b.h >= minSize);
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
            sourceCanvas,
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
              sourceCanvas,
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
        
        const base64Data = dataUrl.replace(/^data:image\/(png|jpg|webp);base64,/, "");
        const paddedIndex = i.toString().padStart(3, '0');
        folder.file(`${folderName}_${paddedIndex}.${format}`, base64Data, { base64: true });
      }
      
      const content = await zip.generateAsync({ type: 'blob' });
      saveAs(content, `${folderName}_${format}.zip`);
      setToastMessage(`Đã tải xuống ZIP (${format.toUpperCase()})!`);
    } catch (error) {
      console.error("Error generating ZIP:", error);
      setToastMessage('Có lỗi xảy ra khi tạo ZIP.');
    } finally {
      setIsGeneratingZip(false);
    }
  };

  const handleDownloadGif = async () => {
    if (frames.length === 0) return;
    setIsGeneratingGif(true);
    
    let workerBlobUrl: string | null = null;
    
    try {
      // Fetch the worker script and create a blob URL to bypass CORS restrictions
      const workerResponse = await fetch('https://cdnjs.cloudflare.com/ajax/libs/gif.js/0.2.0/gif.worker.js');
      const workerBlob = await workerResponse.blob();
      workerBlobUrl = URL.createObjectURL(workerBlob);

      const gif = new GIF({
        workers: 2,
        quality: 10,
        workerScript: workerBlobUrl,
        width: frames[0].width,
        height: frames[0].height,
        transparent: 'rgba(0,0,0,0)'
      });

      // Load all frames as images
      const imagePromises = frames.map(frame => {
        return new Promise<HTMLImageElement>((resolve, reject) => {
          const img = new Image();
          img.onload = () => resolve(img);
          img.onerror = reject;
          img.src = frame.dataUrl;
        });
      });

      const loadedImages = await Promise.all(imagePromises);

      loadedImages.forEach(img => {
        gif.addFrame(img, { delay: 1000 / fps });
      });

      gif.on('finished', (blob: Blob) => {
        saveAs(blob, `${imageName || 'animation'}.gif`);
        setIsGeneratingGif(false);
        setToastMessage('Đã tạo và tải xuống ảnh GIF!');
        if (workerBlobUrl) {
          URL.revokeObjectURL(workerBlobUrl);
        }
      });

      gif.render();
    } catch (error) {
      console.error("Error generating GIF:", error);
      setIsGeneratingGif(false);
      setToastMessage('Có lỗi xảy ra khi tạo GIF.');
      if (workerBlobUrl) {
        URL.revokeObjectURL(workerBlobUrl);
      }
    }
  };

  const handleDownloadVideo = async () => {
    if (frames.length === 0) return;
    setIsGeneratingVideo(true);
    
    try {
      const canvas = document.createElement('canvas');
      canvas.width = frames[0].width;
      canvas.height = frames[0].height;
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error("Could not get canvas context");

      const fpsRate = fps || 12;
      const stream = canvas.captureStream(fpsRate);
      const mimeType = MediaRecorder.isTypeSupported('video/mp4') ? 'video/mp4' : 'video/webm';
      const extension = mimeType.includes('mp4') ? 'mp4' : 'webm';
      
      const mediaRecorder = new MediaRecorder(stream, { mimeType });
      const chunks: Blob[] = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunks.push(e.data);
      };

      const recordingPromise = new Promise<void>((resolve) => {
        mediaRecorder.onstop = () => {
          const blob = new Blob(chunks, { type: mimeType });
          saveAs(blob, `${imageName || 'animation'}.${extension}`);
          resolve();
        };
      });

      mediaRecorder.start();

      // Load all images first
      const imagePromises = frames.map(frame => {
        return new Promise<HTMLImageElement>((resolve, reject) => {
          const img = new Image();
          img.onload = () => resolve(img);
          img.onerror = reject;
          img.src = frame.dataUrl;
        });
      });
      const loadedImages = await Promise.all(imagePromises);

      // Draw frames
      for (let i = 0; i < loadedImages.length; i++) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // Fill background with white for better video compatibility if needed, but clearRect is fine for WebM
        ctx.drawImage(loadedImages[i], 0, 0);
        await new Promise(r => setTimeout(r, 1000 / fpsRate));
      }

      // Add a small buffer at the end
      await new Promise(r => setTimeout(r, 100));

      mediaRecorder.stop();
      await recordingPromise;
      
      setIsGeneratingVideo(false);
      setToastMessage(`Đã tạo và tải xuống Video!`);
    } catch (error) {
      console.error("Error generating video:", error);
      setIsGeneratingVideo(false);
      setToastMessage('Có lỗi xảy ra khi tạo Video.');
    }
  };

  
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
    setImageFilter('none');
    setPreviewTab('frames');
    setCurrentAnimFrame(0);
    setHistory([]);
    setHistoryIndex(-1);
    setSelectedFrames(new Set());
  };

  // Global Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const isInput = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.tagName === 'SELECT';

      if (e.key === 'Escape') {
        setSelectedFrames(new Set());
        setPreviewFrame(null);
      }

      if (e.key === 'Enter' && !e.ctrlKey && !e.altKey && !e.shiftKey) {
        if (image && !isSlicing) {
          e.preventDefault();
          handleSlice();
        }
      }

      if (!isInput) {
        if (e.ctrlKey || e.metaKey) {
          if (e.key.toLowerCase() === 'z') {
            e.preventDefault();
            if (e.shiftKey) {
              handleRedo();
            } else {
              handleUndo();
            }
          } else if (e.key.toLowerCase() === 'y') {
            e.preventDefault();
            handleRedo();
          } else if (e.key.toLowerCase() === 's') {
            e.preventDefault();
            if (frames.length > 0) {
              handleDownloadZip('png');
            }
          }
        } else if (e.key === ' ') {
          if (previewTab === 'animation' && frames.length > 0) {
            e.preventDefault();
            setIsPlaying(!isPlaying);
          }
        } else if (e.key === 'Delete' || e.key === 'Backspace') {
          if (selectedFrames.size > 0) {
             e.preventDefault();
             handleDeleteSelected();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  if (!isStateLoaded) {
    return (
      <div className="min-h-screen bg-white dark:bg-zinc-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-200 ${uiFontFamily} ${uiFontSize} ${uiLineHeight} p-4 md:p-6 lg:p-8 flex flex-col items-center`}>
      <header className="w-full max-w-7xl mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-zinc-900 dark:text-white mb-1 tracking-tight flex items-center gap-3">
            <span className="bg-primary-600 text-white p-2.5 rounded-xl shadow-lg shadow-primary-500/20">
              <Grid3X3 size={32} />
            </span>
            SliceSprite
          </h1>
          <p className="text-sm font-medium text-zinc-400 dark:text-zinc-500 dark:text-zinc-400 mt-2">
            Công cụ cắt Sprite Sheet Pixel Art
          </p>
        </div>
        <div className="flex items-center gap-3 relative">
          <div className="flex items-center text-xs font-medium text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-900/80 backdrop-blur-sm px-4 py-2 border border-zinc-200 dark:border-zinc-800 rounded-full">
            <Code2 size={14} className="mr-1.5 text-primary-500" /> Error404 Labs • Kitajima2910
          </div>
          
          <div className="relative">
            <button
              onClick={() => setShowThemeMenu(!showThemeMenu)}
              className="p-2.5 rounded-full bg-zinc-100 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-primary-600 dark:hover:text-primary-400 hover:border-primary-200 dark:hover:border-primary-800 transition-all shadow-sm"
              title="Chọn màu chủ đạo"
            >
              <Palette size={18} />
            </button>
            
            {showThemeMenu && (
              <>
                <div 
                  className="fixed inset-0 z-40"
                  onClick={() => setShowThemeMenu(false)}
                ></div>
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-xl z-50 overflow-hidden">
                  <div className="p-2 border-b border-zinc-100 dark:border-zinc-800">
                    <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 px-2 flex items-center gap-1.5">
                      <Palette size={14} /> MÀU CHỦ ĐẠO
                    </p>
                  </div>
                  <div className="p-2 flex flex-col gap-1">
                    {THEMES.map((t) => (
                      <button
                        key={t.id}
                        onClick={() => {
                          setSkinTheme(t.id);
                          setShowThemeMenu(false);
                        }}
                        className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${skinTheme === t.id ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400' : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800'}`}
                      >
                        <div 
                          className="w-4 h-4 rounded-full shadow-sm" 
                          style={{ backgroundColor: t.color }}
                        ></div>
                        <span className="flex-1 text-left">{t.name}</span>
                        {skinTheme === t.id && <Check size={16} />}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          <button
            onClick={() => setShowHelpModal(true)}
            className="p-2.5 rounded-full bg-zinc-100 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-primary-600 dark:hover:text-primary-400 hover:border-primary-200 dark:hover:border-primary-800 transition-all shadow-sm"
            title="Hướng dẫn sử dụng"
          >
            <Info size={18} />
          </button>
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-full bg-zinc-100 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-primary-600 dark:hover:text-primary-400 hover:border-primary-200 dark:hover:border-primary-800 transition-all shadow-sm"
            title={theme === 'dark' ? 'Chuyển sang giao diện sáng' : 'Chuyển sang giao diện tối'}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </header>

      <main className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Upload & Settings */}
        <div className="lg:col-span-4 space-y-6">
          {/* Upload Area */}
          <div className="bg-zinc-50 dark:bg-zinc-900/80 backdrop-blur-sm border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-xl">
            <h2 className="text-xl font-semibold mb-5 flex items-center text-zinc-900 dark:text-white">
              <Upload className="mr-2 text-primary-400" size={20} /> Tải ảnh lên
            </h2>
            
            {!image && frames.length === 0 ? (
              <>
                <div 
                  {...getRootProps()} 
                  className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-200 ${
                    isDragActive ? 'border-primary-500 bg-primary-500/10' : 'border-zinc-300 dark:border-zinc-700 hover:border-primary-400 hover:bg-zinc-100 dark:bg-zinc-800/50'
                  }`}
                >
                  <input {...getInputProps()} />
                  <div className="bg-zinc-100 dark:bg-zinc-800/50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5">
                    <ImageIcon className="h-8 w-8 text-primary-400" />
                  </div>
                  <p className="text-sm font-medium text-zinc-400 dark:text-zinc-600 dark:text-zinc-300">Kéo & thả sprite sheet vào đây</p>
                  <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-2">hoặc click để chọn file</p>
                </div>
                
                <div className="mt-4 text-center">
                  <label className="cursor-pointer text-sm font-medium text-primary-600 dark:text-primary-400 hover:text-primary-500 transition-colors flex items-center justify-center gap-2">
                    <FolderOpen size={16} /> Hoặc tải lên thư mục chứa các frame
                    <input 
                      type="file" 
                      // @ts-ignore
                      webkitdirectory="true" 
                      directory="true" 
                      multiple 
                      className="hidden" 
                      onChange={handleFolderUpload} 
                    />
                  </label>
                </div>
              </>
            ) : !image && frames.length > 0 ? (
              <div className="space-y-4">
                <div className="bg-white dark:bg-zinc-950 p-6 border border-zinc-200 dark:border-zinc-800 rounded-xl flex flex-col items-center justify-center text-center">
                  <div className="bg-primary-100 dark:bg-primary-900/30 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                    <FolderOpen className="h-8 w-8 text-primary-500" />
                  </div>
                  <h3 className="text-lg font-medium text-zinc-900 dark:text-white mb-1">Đã tải lên thư mục</h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-4">{imageName} ({frames.length} frames)</p>
                  
                  <button
                    onClick={() => {
                      setFrames([]);
                      setHistory([]);
                      setHistoryIndex(-1);
                      setImageName('');
                    }}
                    className="flex items-center text-sm font-medium text-red-500 hover:text-red-600 transition-colors"
                  >
                    <Trash2 size={16} className="mr-1" /> Xóa và tải lên lại
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="bg-white dark:bg-zinc-950 p-4 border border-zinc-200 dark:border-zinc-800 rounded-xl flex justify-center overflow-hidden max-h-48 relative group">
                  <img 
                    src={image.src} 
                    alt="Original sprite sheet" 
                    className="max-w-full max-h-full object-contain pixelated"
                  />
                  <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-all">
                    <button 
                      onClick={() => setIsCropping(true)}
                      className="bg-primary-500/90 hover:bg-primary-500 text-white p-2 rounded-lg shadow-lg"
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
                <div className="text-center text-xs font-mono text-zinc-400 dark:text-zinc-500 bg-white dark:bg-zinc-950 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800/50">
                  {image.width} × {image.height} px
                </div>
              </div>
            )}
          </div>

          {/* Settings Area */}
          <div className={`bg-zinc-50 dark:bg-zinc-900/80 backdrop-blur-sm border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-xl transition-all duration-300 ${!image ? 'opacity-50 pointer-events-none grayscale-[0.5]' : 'opacity-100'}`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <h2 className="text-xl font-semibold flex items-center text-zinc-900 dark:text-white">
                <Settings className="mr-2 text-primary-400" size={20} /> Cài đặt
              </h2>
              <div className="flex bg-white dark:bg-zinc-950 rounded-xl p-1 border border-zinc-200 dark:border-zinc-800/80 shadow-inner">
                <button
                  className={`px-3 py-1.5 text-xs font-medium transition-all rounded-lg ${settingsTab === 'slice' ? 'bg-primary-600 text-white shadow-md' : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-100'}`}
                  onClick={() => setSettingsTab('slice')}
                >
                  Cắt ảnh
                </button>
                <button
                  className={`px-3 py-1.5 text-xs font-medium transition-all rounded-lg ${settingsTab === 'ui' ? 'bg-primary-600 text-white shadow-md' : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-100'}`}
                  onClick={() => setSettingsTab('ui')}
                >
                  Giao diện
                </button>
              </div>
            </div>
            
            {settingsTab === 'slice' ? (
              <div className="space-y-4">
                <div className="flex bg-white dark:bg-zinc-950 rounded-xl p-1.5 border border-zinc-200 dark:border-zinc-800/80 shadow-inner">
                  <button
                    className={`flex-1 py-2 text-xs sm:text-sm font-medium flex items-center justify-center transition-all rounded-lg ${sliceMethod === 'grid' ? 'bg-primary-600 text-white shadow-md' : 'text-zinc-400 dark:text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:bg-zinc-800/50'}`}
                    onClick={() => setSliceMethod('grid')}
                  >
                    <Grid3X3 className="mr-1" size={16} /> Lưới
                  </button>
                  <button
                    className={`flex-1 py-2 text-xs sm:text-sm font-medium flex items-center justify-center transition-all rounded-lg ${sliceMethod === 'size' ? 'bg-primary-600 text-white shadow-md' : 'text-zinc-400 dark:text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:bg-zinc-800/50'}`}
                    onClick={() => setSliceMethod('size')}
                  >
                    <Maximize className="mr-1" size={16} /> Kích cỡ
                  </button>
                  <button
                    className={`flex-1 py-2 text-xs sm:text-sm font-medium flex items-center justify-center transition-all rounded-lg ${sliceMethod === 'auto' ? 'bg-primary-600 text-white shadow-md' : 'text-zinc-400 dark:text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:bg-zinc-800/50'}`}
                    onClick={() => setSliceMethod('auto')}
                  >
                    <Wand2 className="mr-1" size={16} /> Tự động
                  </button>
                </div>

              {sliceMethod === 'grid' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <TooltipLabel label="Số cột" tooltip="Chia ảnh thành bao nhiêu cột bằng nhau" />
                    <input 
                      type="number" 
                      min="1" 
                      value={columns} 
                      onChange={(e) => setColumns(e.target.value === '' ? '' : Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg p-2.5 text-sm transition-all focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <TooltipLabel label="Số hàng" tooltip="Chia ảnh thành bao nhiêu hàng bằng nhau" />
                    <input 
                      type="number" 
                      min="1" 
                      value={rows} 
                      onChange={(e) => setRows(e.target.value === '' ? '' : Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg p-2.5 text-sm transition-all focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none"
                    />
                  </div>
                </div>
              )}
              
              {sliceMethod === 'size' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <TooltipLabel label="Rộng (px)" tooltip="Chiều rộng của mỗi frame (pixel)" />
                    <input 
                      type="number" 
                      min="1" 
                      value={frameWidth} 
                      onChange={(e) => setFrameWidth(e.target.value === '' ? '' : Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg p-2.5 text-sm transition-all focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <TooltipLabel label="Cao (px)" tooltip="Chiều cao của mỗi frame (pixel)" />
                    <input 
                      type="number" 
                      min="1" 
                      value={frameHeight} 
                      onChange={(e) => setFrameHeight(e.target.value === '' ? '' : Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg p-2.5 text-sm transition-all focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none"
                    />
                  </div>
                </div>
              )}

              {sliceMethod === 'auto' && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                      <TooltipLabel label="Cỡ nhỏ nhất (px)" tooltip="Chiều rộng/cao tối thiểu để được tính là một frame" />
                      <input 
                        type="number" 
                        min="1" 
                        value={minAutoFrameSize} 
                        onChange={(e) => setMinAutoFrameSize(e.target.value === '' ? '' : Math.max(1, parseInt(e.target.value) || 1))}
                        className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg p-2.5 text-sm transition-all focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <TooltipLabel label="Khoảng cách nối" tooltip="Khoảng cách tối đa (pixel) để nối các phần bị tách rời của một sprite" />
                      <input 
                        type="number" 
                        min="0" 
                        max="50"
                        value={connectionDistance} 
                        onChange={(e) => setConnectionDistance(e.target.value === '' ? '' : Math.max(0, parseInt(e.target.value) || 0))}
                        className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg p-2.5 text-sm transition-all focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <TooltipLabel label="Phương pháp gộp" tooltip="Cách thuật toán gộp các phần rời rạc thành một frame" />
                      <div className="flex bg-white dark:bg-zinc-950 rounded-xl p-1.5 border border-zinc-200 dark:border-zinc-800/80 shadow-inner">
                        <button 
                          className={`flex-1 py-1.5 text-xs font-medium flex items-center justify-center transition-all rounded-lg ${autoGroupMethod === 'bbox' ? 'bg-primary-600 text-white shadow-md' : 'text-zinc-400 dark:text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800/50'}`}
                          onClick={() => setAutoGroupMethod('bbox')}
                        >
                          <Square size={14} className="mr-1" /> Vùng bao
                        </button>
                        <button 
                          className={`flex-1 py-1.5 text-xs font-medium flex items-center justify-center transition-all rounded-lg ${autoGroupMethod === 'pixel' ? 'bg-primary-600 text-white shadow-md' : 'text-zinc-400 dark:text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800/50'}`}
                          onClick={() => setAutoGroupMethod('pixel')}
                        >
                          <LayoutGrid size={14} className="mr-1" /> Pixel
                        </button>
                        <button 
                          className={`flex-1 py-1.5 text-xs font-medium flex items-center justify-center transition-all rounded-lg ${autoGroupMethod === 'color' ? 'bg-primary-600 text-white shadow-md' : 'text-zinc-400 dark:text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800/50'}`}
                          onClick={() => setAutoGroupMethod('color')}
                        >
                          <Palette size={14} className="mr-1" /> Màu sắc
                        </button>
                      </div>
                    </div>
                    {autoGroupMethod === 'color' && (
                      <div className="sm:col-span-2 lg:col-span-4">
                        <TooltipLabel label="Dung sai màu" tooltip="Độ lệch màu tối đa để gộp (0-1020)" />
                        <input 
                          type="number" 
                          min="0" 
                          max="1020"
                          value={colorTolerance} 
                          onChange={(e) => setColorTolerance(e.target.value === '' ? '' : Math.max(0, parseInt(e.target.value) || 0))}
                          className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg p-2.5 text-sm transition-all focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none"
                        />
                      </div>
                    )}
                  </div>
                  <div className="mt-5">
                    <TooltipLabel label="Căn lề (Kích thước chuẩn)" tooltip="Cách căn lề các frame khi xuất ra ảnh động" className="mb-2" />
                    <div className="flex bg-white dark:bg-zinc-950 rounded-xl p-1.5 border border-zinc-200 dark:border-zinc-800/80 shadow-inner">
                      <button
                        className={`flex-1 py-2 text-xs sm:text-sm font-medium flex items-center justify-center transition-all rounded-lg ${autoAlign === 'bottom' ? 'bg-primary-600 text-white shadow-md' : 'text-zinc-400 dark:text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:bg-zinc-800/50'}`}
                        onClick={() => setAutoAlign('bottom')}
                      >
                        <ArrowDownToLine size={16} className="mr-1.5" /> Dưới đáy
                      </button>
                      <button
                        className={`flex-1 py-2 text-xs sm:text-sm font-medium flex items-center justify-center transition-all rounded-lg ${autoAlign === 'center' ? 'bg-primary-600 text-white shadow-md' : 'text-zinc-400 dark:text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:bg-zinc-800/50'}`}
                        onClick={() => setAutoAlign('center')}
                      >
                        <AlignCenter size={16} className="mr-1.5" /> Chính giữa
                      </button>
                    </div>
                  </div>

                  <div className="mt-5">
                    <label className="flex items-center space-x-2 cursor-pointer mb-2">
                      <input 
                        type="checkbox" 
                        checked={useCustomAutoCanvasSize}
                        onChange={(e) => setUseCustomAutoCanvasSize(e.target.checked)}
                        className="w-5 h-5 accent-primary-500"
                      />
                      <span className="text-sm font-medium text-zinc-400 dark:text-zinc-600 dark:text-zinc-300">Kích thước Canvas tùy chỉnh</span>
                      <div className="group relative ml-1.5 flex items-center">
                        <Info size={14} className="text-zinc-400 dark:text-zinc-500 hover:text-zinc-400 dark:text-zinc-600 dark:text-zinc-300 cursor-help transition-colors" />
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-zinc-100 dark:bg-zinc-800 text-xs text-zinc-700 dark:text-zinc-200 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 text-center pointer-events-none border border-zinc-300 dark:border-zinc-700">
                          Tự định nghĩa kích thước khung hình cho tất cả các frame
                          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-zinc-800"></div>
                        </div>
                      </div>
                    </label>
                    
                    {useCustomAutoCanvasSize && (
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <TooltipLabel label="Rộng (px)" tooltip="Chiều rộng khung hình (pixel)" />
                          <input 
                            type="number" 
                            min="1" 
                            value={autoCanvasWidth} 
                            onChange={(e) => setAutoCanvasWidth(e.target.value === '' ? '' : Math.max(1, parseInt(e.target.value) || 1))}
                            className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg p-2.5 text-sm transition-all focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none"
                          />
                        </div>
                        <div>
                          <TooltipLabel label="Cao (px)" tooltip="Chiều cao khung hình (pixel)" />
                          <input 
                            type="number" 
                            min="1" 
                            value={autoCanvasHeight} 
                            onChange={(e) => setAutoCanvasHeight(e.target.value === '' ? '' : Math.max(1, parseInt(e.target.value) || 1))}
                            className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg p-2.5 text-sm transition-all focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </>
              )}

              <div className="mt-5">
                <TooltipLabel label="Bộ lọc màu" tooltip="Áp dụng hiệu ứng màu sắc cho tất cả các frame" className="mb-2" />
                <select 
                  value={imageFilter} 
                  onChange={(e) => setImageFilter(e.target.value as FilterType)}
                  className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg p-2.5 text-sm transition-all focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none"
                >
                  <option value="none">Không có</option>
                  <option value="grayscale">Đen trắng (Grayscale)</option>
                  <option value="sepia">Nâu vàng (Sepia)</option>
                  <option value="invert">Đảo màu (Invert)</option>
                </select>
              </div>

              {(sliceMethod === 'grid' || sliceMethod === 'size') && (
                <div className="flex items-center mt-2">
                  <input 
                    type="checkbox" 
                    id="skipEmpty" 
                    checked={skipEmpty}
                    onChange={(e) => setSkipEmpty(e.target.checked)}
                    className="w-5 h-5 mr-2 accent-primary-500 shrink-0"
                  />
                  <label htmlFor="skipEmpty" className="text-sm font-medium text-zinc-400 dark:text-zinc-600 dark:text-zinc-300 cursor-pointer leading-tight">Bỏ qua các ảnh trống (trong suốt)</label>
                  <div className="group relative ml-1.5 flex items-center">
                    <Info size={14} className="text-zinc-400 dark:text-zinc-500 hover:text-zinc-400 dark:text-zinc-600 dark:text-zinc-300 cursor-help transition-colors" />
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-zinc-100 dark:bg-zinc-800 text-xs text-zinc-700 dark:text-zinc-200 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 text-center pointer-events-none border border-zinc-300 dark:border-zinc-700">
                      Tự động loại bỏ các frame không có điểm ảnh nào
                      <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-zinc-800"></div>
                    </div>
                  </div>
                </div>
              )}

              <div className="pt-5 border-t border-zinc-200 dark:border-zinc-800/50">
                <button
                  onClick={handleSlice}
                  disabled={!image || isSlicing}
                  className="w-full bg-primary-600 hover:bg-primary-500 text-white text-lg font-bold py-3 rounded-xl shadow-lg shadow-primary-500/20 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                  title="Cắt ảnh (Enter)"
                >
                  {isSlicing ? 'ĐANG CẮT...' : 'CẮT ẢNH!'}
                </button>
              </div>
            </div>
            ) : (
              <div className="space-y-6">
                <div>
                  <TooltipLabel label="Font chữ" tooltip="Chọn kiểu chữ cho toàn bộ ứng dụng" />
                  <select
                    value={uiFontFamily}
                    onChange={(e) => setUiFontFamily(e.target.value)}
                    className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg p-2.5 text-sm transition-all focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none"
                  >
                    <option value="font-sans">Inter (Sans-serif)</option>
                    <option value="font-serif">Playfair Display (Serif)</option>
                    <option value="font-mono">JetBrains Mono (Monospace)</option>
                  </select>
                </div>

                <div>
                  <TooltipLabel label="Kích thước font" tooltip="Điều chỉnh kích thước chữ cơ bản" />
                  <select
                    value={uiFontSize}
                    onChange={(e) => setUiFontSize(e.target.value)}
                    className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg p-2.5 text-sm transition-all focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none"
                  >
                    <option value="text-sm">Nhỏ</option>
                    <option value="text-base">Vừa (Mặc định)</option>
                    <option value="text-lg">Lớn</option>
                  </select>
                </div>

                <div>
                  <TooltipLabel label="Khoảng cách dòng" tooltip="Điều chỉnh khoảng cách giữa các dòng văn bản" />
                  <select
                    value={uiLineHeight}
                    onChange={(e) => setUiLineHeight(e.target.value)}
                    className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg p-2.5 text-sm transition-all focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none"
                  >
                    <option value="leading-tight">Hẹp</option>
                    <option value="leading-normal">Bình thường (Mặc định)</option>
                    <option value="leading-loose">Rộng</option>
                  </select>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Preview */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-zinc-50 dark:bg-zinc-900/80 backdrop-blur-sm border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-xl min-h-[500px] flex flex-col">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-5 border-b border-zinc-200 dark:border-zinc-800/50 pb-4 gap-3">
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-semibold flex items-center text-zinc-900 dark:text-white">
                  <ImageIcon className="mr-2" /> Xem trước
                </h2>
                
                <div className="flex bg-white dark:bg-zinc-950 rounded-xl p-1.5 border border-zinc-200 dark:border-zinc-800/80 shadow-inner">
                  <button
                    onClick={handleUndo}
                    disabled={historyIndex < 0 || isSlicing}
                    className={`px-2 py-1 flex items-center transition-colors ${historyIndex >= 0 && !isSlicing ? 'text-zinc-400 dark:text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:bg-zinc-800/50' : 'text-zinc-400 dark:text-zinc-600 cursor-not-allowed'}`}
                    title="Hoàn tác (Ctrl+Z)"
                  >
                    <Undo size={18} />
                  </button>
                  <div className="w-px bg-zinc-100 dark:bg-zinc-800 mx-1"></div>
                  <button
                    onClick={handleRedo}
                    disabled={historyIndex >= history.length - 1 || isSlicing}
                    className={`px-2 py-1 flex items-center transition-colors ${historyIndex < history.length - 1 && !isSlicing ? 'text-zinc-400 dark:text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:bg-zinc-800/50' : 'text-zinc-400 dark:text-zinc-600 cursor-not-allowed'}`}
                    title="Làm lại (Ctrl+Y hoặc Ctrl+Shift+Z)"
                  >
                    <Redo size={18} />
                  </button>
                </div>

                {frames.length > 0 && (
                  <div className="flex bg-white dark:bg-zinc-950 rounded-xl p-1.5 border border-zinc-200 dark:border-zinc-800/80 shadow-inner">
                    <button
                      className={`px-3 py-1 text-sm font-medium flex items-center transition-colors ${previewTab === 'frames' ? 'bg-primary-600 text-white shadow-md' : 'text-zinc-400 dark:text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:bg-zinc-800/50'}`}
                      onClick={() => setPreviewTab('frames')}
                    >
                      <Grid3X3 className="mr-1 md:mr-2" size={16} /> Từng ảnh
                    </button>
                    <button
                      className={`px-3 py-1 text-sm font-medium flex items-center transition-colors ${previewTab === 'animation' ? 'bg-primary-600 text-white shadow-md' : 'text-zinc-400 dark:text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:bg-zinc-800/50'}`}
                      onClick={() => setPreviewTab('animation')}
                    >
                      <Film className="mr-1 md:mr-2" size={16} /> Ảnh động
                    </button>
                  </div>
                )}
              </div>
              
              {frames.length > 0 && (
                <div className="relative">
                  <button
                    onClick={() => setShowExportMenu(!showExportMenu)}
                    className="bg-primary-600 hover:bg-primary-500 text-white px-4 py-2 flex items-center text-sm font-medium rounded-lg shadow-sm transition-all"
                  >
                    <Download className="mr-1 md:mr-2" size={18} /> Xuất file <ChevronDown size={16} className={`ml-1 transition-transform ${showExportMenu ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {showExportMenu && (
                    <>
                      <div 
                        className="fixed inset-0 z-40"
                        onClick={() => setShowExportMenu(false)}
                      ></div>
                      <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-xl z-50 overflow-hidden flex flex-col p-1.5">
                        <button
                          onClick={() => {
                            handleDownloadVideo();
                            setShowExportMenu(false);
                          }}
                          disabled={isGeneratingVideo}
                          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-left"
                        >
                          {isGeneratingVideo ? <Loader2 className="animate-spin text-primary-500" size={18} /> : <Video className="text-zinc-400" size={18} />} 
                          <span className="flex-1">{isGeneratingVideo ? 'Đang tạo...' : 'Video (MP4/WebM)'}</span>
                        </button>
                        <button
                          onClick={() => {
                            handleDownloadGif();
                            setShowExportMenu(false);
                          }}
                          disabled={isGeneratingGif}
                          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-left"
                        >
                          {isGeneratingGif ? <Loader2 className="animate-spin text-primary-500" size={18} /> : <Film className="text-zinc-400" size={18} />} 
                          <span className="flex-1">{isGeneratingGif ? 'Đang tạo...' : 'Ảnh động (GIF)'}</span>
                        </button>
                        <div className="h-px bg-zinc-100 dark:bg-zinc-800 my-1 mx-2"></div>
                        <button
                          onClick={() => {
                            handleDownloadZip('png');
                            setShowExportMenu(false);
                          }}
                          disabled={isGeneratingZip}
                          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-left"
                          title="Tải xuống (Ctrl+S)"
                        >
                          {isGeneratingZip ? <Loader2 className="animate-spin text-primary-500" size={18} /> : <FolderOpen className="text-zinc-400" size={18} />} 
                          <span className="flex-1">{isGeneratingZip ? 'Đang tạo...' : 'Tập tin ZIP (PNG)'}</span>
                        </button>
                        <button
                          onClick={() => {
                            handleDownloadZip('webp');
                            setShowExportMenu(false);
                          }}
                          disabled={isGeneratingZip}
                          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-left"
                        >
                          {isGeneratingZip ? <Loader2 className="animate-spin text-primary-500" size={18} /> : <FolderOpen className="text-zinc-400" size={18} />} 
                          <span className="flex-1">{isGeneratingZip ? 'Đang tạo...' : 'Tập tin ZIP (WebP)'}</span>
                        </button>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
            
            <div className="flex-1 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 overflow-y-auto flex flex-col">
              {frames.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center text-zinc-400 dark:text-zinc-500">
                  <Grid3X3 size={48} className="mb-5 opacity-50" />
                  <p className="text-lg font-medium text-zinc-400 dark:text-zinc-500 dark:text-zinc-400">Tải ảnh lên và nhấn Cắt</p>
                </div>
              ) : previewTab === 'frames' ? (
                <div className="flex flex-col h-full">
                  <div className="flex justify-between items-center mb-5 bg-white dark:bg-zinc-950 p-2 rounded-xl border border-zinc-200 dark:border-zinc-800/80 shadow-inner">
                    <div className="flex gap-2">
                      <button
                        onClick={selectAllFrames}
                        className="text-xs font-medium bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:bg-zinc-700 text-zinc-900 dark:text-white px-3 py-1.5 rounded-lg transition-colors shadow-sm"
                      >
                        Chọn tất cả
                      </button>
                      <button
                        onClick={deselectAllFrames}
                        className="text-xs font-medium bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:bg-zinc-700 text-zinc-900 dark:text-white px-3 py-1.5 rounded-lg transition-colors shadow-sm"
                        title="Phím tắt: Esc"
                      >
                        Bỏ chọn
                      </button>
                      <div className="w-px h-6 bg-zinc-300 dark:bg-zinc-700 mx-1"></div>
                      <button
                        onClick={() => flipFrames('horizontal')}
                        className="text-xs font-medium bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:bg-zinc-700 text-zinc-900 dark:text-white px-2 py-1.5 rounded-lg transition-colors shadow-sm flex items-center"
                        title="Lật ngang (Horizontal Flip)"
                      >
                        <FlipHorizontal size={14} />
                      </button>
                      <button
                        onClick={() => flipFrames('vertical')}
                        className="text-xs font-medium bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:bg-zinc-700 text-zinc-900 dark:text-white px-2 py-1.5 rounded-lg transition-colors shadow-sm flex items-center"
                        title="Lật dọc (Vertical Flip)"
                      >
                        <FlipVertical size={14} />
                      </button>
                    </div>
                    <div className="flex gap-2">
                      {selectedFrames.size > 0 && (
                        <button
                          onClick={() => setShowDeleteAllConfirm(true)}
                          className="text-xs font-medium bg-orange-500/90 hover:bg-orange-500 text-white px-3 py-1.5 rounded-lg flex items-center transition-colors shadow-sm"
                        >
                          <Trash2 size={14} className="mr-1" /> Xóa đã chọn ({selectedFrames.size})
                        </button>
                      )}
                      <button
                        onClick={() => {
                          if (frames.length === 0) return;
                          setShowDeleteAllConfirm(true);
                        }}
                        className="text-xs font-medium bg-red-500/90 hover:bg-red-500 text-white px-3 py-1.5 rounded-lg flex items-center transition-colors shadow-sm"
                      >
                        <Trash2 size={14} className="mr-1" /> Xóa tất cả
                      </button>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                    {frames.map((frame, index) => (
                      <div 
                        key={frame.id} 
                        className={`bg-zinc-50 dark:bg-zinc-900 border rounded-xl p-2 flex flex-col items-center group cursor-pointer transition-all duration-300 relative hover:scale-105 hover:shadow-2xl hover:shadow-primary-500/30 hover:z-10 ${selectedFrames.has(frame.id) ? 'border-primary-500 shadow-md shadow-primary-500/40 ring-2 ring-primary-500 ring-offset-2 dark:ring-offset-zinc-950' : 'border-zinc-200 dark:border-zinc-800 hover:border-primary-500/80'}`}
                        onClick={() => setPreviewFrame(frame)}
                      >
                        <button
                          onClick={(e) => toggleFrameSelection(e, frame.id)}
                          className="absolute top-1 left-1 bg-zinc-50 dark:bg-zinc-900/80 text-zinc-900 dark:text-white p-1 rounded-lg z-10 hover:text-primary-400 transition-colors"
                          title="Chọn frame"
                        >
                          {selectedFrames.has(frame.id) ? <CheckSquare size={18} className="text-primary-400" /> : <Square size={18} />}
                        </button>
                        <button
                          onClick={(e) => handleRemoveFrame(e, frame.id)}
                          className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity z-10"
                          title="Xóa frame"
                        >
                          <Trash2 size={14} />
                        </button>
                        <div className="w-full aspect-square flex items-center justify-center bg-zinc-50 dark:bg-zinc-900 mb-2 overflow-hidden checkerboard rounded-md">
                          <img 
                            src={frame.dataUrl} 
                            alt={`Frame ${index}`} 
                            className="max-w-full max-h-full object-contain pixelated group-hover:scale-110 transition-transform duration-200"
                          />
                        </div>
                        <span className="text-sm text-zinc-400 dark:text-zinc-500 dark:text-zinc-400">Frame {index}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center">
                  <div ref={animContainerRef} className="w-full max-w-md aspect-square flex items-center justify-center bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl mb-6 overflow-auto checkerboard relative">
                    {frames[currentAnimFrame % frames.length] && (
                      <img 
                        src={frames[currentAnimFrame % frames.length].dataUrl} 
                        alt={`Frame hoạt ảnh ${currentAnimFrame % frames.length}`} 
                        className="pixelated max-w-none m-auto transition-[width,height] duration-300 ease-out"
                        style={{
                          width: frames[currentAnimFrame % frames.length].width * animZoom,
                          height: frames[currentAnimFrame % frames.length].height * animZoom
                        }}
                      />
                    )}
                    <div className="absolute top-2 right-2 bg-zinc-50 dark:bg-zinc-900/80 backdrop-blur-sm border border-zinc-200 dark:border-zinc-800 px-2 py-1 rounded-lg text-sm z-10">
                      {frames[currentAnimFrame % frames.length]?.width}x{frames[currentAnimFrame % frames.length]?.height}
                    </div>
                    <div className="absolute bottom-2 right-2 bg-zinc-50 dark:bg-zinc-900/90 backdrop-blur-sm border border-zinc-200 dark:border-zinc-800 rounded-lg flex items-center p-1 z-10">
                      <button onClick={handleZoomToFitAnim} className="p-1 hover:text-primary-400 border-r border-zinc-300 dark:border-zinc-700/50 mr-1 pr-2" title="Vừa màn hình"><Maximize size={16}/></button>
                      <button onClick={() => setAnimZoom(z => Math.max(0.1, z - 0.5))} className="p-1 hover:text-primary-400" title="Thu nhỏ"><ZoomOut size={16}/></button>
                      <span className="text-xs font-bold px-1 w-12 text-center">{Math.round(animZoom * 100)}%</span>
                      <button onClick={() => setAnimZoom(z => Math.min(20, z + 0.5))} className="p-1 hover:text-primary-400" title="Phóng to"><ZoomIn size={16}/></button>
                    </div>
                  </div>
                  
                  <div className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 flex flex-col gap-4 shadow-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => setIsPlaying(!isPlaying)}
                          className="bg-primary-600 hover:bg-primary-500 text-white p-4 rounded-full shadow-lg shadow-primary-500/20 transition-all active:scale-95 flex items-center justify-center min-w-[56px]"
                        >
                          {isPlaying ? <Pause size={24} /> : <Play size={24} className="ml-1" />}
                        </button>
                        <div className="flex flex-col gap-1">
                          <div className="text-base font-semibold text-primary-400 font-mono">
                            Frame {(currentAnimFrame % frames.length) + 1} / {frames.length}
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-medium text-zinc-400 dark:text-zinc-500 dark:text-zinc-400">FPS: {fps}</span>
                            <input 
                              type="range" 
                              min="1" 
                              max="60" 
                              value={fps} 
                              onChange={(e) => setFps(parseInt(e.target.value))}
                              className="w-24 accent-primary-500"
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <div className="flex bg-zinc-100 dark:bg-zinc-800 rounded-lg p-1 mr-2">
                          <button
                            onClick={() => flipFrames('horizontal')}
                            className="p-1.5 rounded-md hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
                            title="Lật ngang toàn bộ (Horizontal Flip)"
                          >
                            <FlipHorizontal size={16} />
                          </button>
                          <button
                            onClick={() => flipFrames('vertical')}
                            className="p-1.5 rounded-md hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
                            title="Lật dọc toàn bộ (Vertical Flip)"
                          >
                            <FlipVertical size={16} />
                          </button>
                        </div>
                        <button
                          onClick={() => setAnimTimelineView('row')}
                          className={`p-2 rounded-lg transition-colors ${animTimelineView === 'row' ? 'bg-primary-600 text-white' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:text-white hover:bg-zinc-200 dark:bg-zinc-700'}`}
                          title="Hiển thị dạng hàng"
                        >
                          <List size={18} />
                        </button>
                        <button
                          onClick={() => setAnimTimelineView('grid')}
                          className={`p-2 rounded-lg transition-colors ${animTimelineView === 'grid' ? 'bg-primary-600 text-white' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:text-white hover:bg-zinc-200 dark:bg-zinc-700'}`}
                          title="Hiển thị dạng lưới"
                        >
                          <LayoutGrid size={18} />
                        </button>
                        <button
                          onClick={(e) => {
                            const frameToRemove = frames[currentAnimFrame % frames.length];
                            if (frameToRemove) {
                              handleRemoveFrame(e, frameToRemove.id);
                              setToastMessage('Đã xóa frame!');
                            }
                          }}
                          className="bg-red-500/90 hover:bg-red-500 text-white p-2 rounded-lg shadow-sm transition-all ml-2"
                          title="Xóa frame này"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                    
                    <div className={`mt-2 ${animTimelineView === 'row' ? 'overflow-x-auto hide-scrollbar pb-2' : 'overflow-y-auto max-h-48 custom-scrollbar pr-2'}`}>
                      <div className={`flex gap-2 ${animTimelineView === 'row' ? 'min-w-max' : 'flex-wrap'}`}>
                        {frames.map((frame, index) => (
                          <div 
                            key={`anim-frame-${frame.id}-${index}`}
                            onClick={() => {
                              setCurrentAnimFrame(index);
                              setIsPlaying(false);
                            }}
                            className={`w-14 h-14 rounded-lg border-2 cursor-pointer overflow-hidden flex items-center justify-center transition-all bg-white dark:bg-zinc-950 ${index === currentAnimFrame % frames.length ? 'border-primary-500 shadow-md shadow-primary-500/40 scale-105' : 'border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:border-zinc-600 opacity-70 hover:opacity-100'}`}
                          >
                            <img 
                              src={frame.dataUrl} 
                              alt={`Frame ${index}`} 
                              className="max-w-full max-h-full object-contain"
                              style={{ imageRendering: 'pixelated' }}
                            />
                          </div>
                        ))}
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

      {/* Crop Modal */}
      {isCropping && image && (
        <div 
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={() => setIsCropping(false)}
        >
          <div 
            className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full flex justify-between items-center mb-5 border-b border-zinc-200 dark:border-zinc-800/50 pb-4">
              <h3 className="text-xl font-bold text-zinc-900 dark:text-white flex items-center">
                <CropIcon className="mr-2 text-primary-400" /> Cắt vùng ảnh
              </h3>
              <button 
                onClick={() => setIsCropping(false)}
                className="text-zinc-400 dark:text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:bg-zinc-800/50 transition-colors rounded-lg p-1"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="flex-1 overflow-auto bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl flex items-center justify-center p-4 checkerboard min-h-[300px]">
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
                className="bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:bg-zinc-700 text-zinc-900 dark:text-white px-5 py-2.5 rounded-xl font-medium transition-colors"
              >
                Hủy
              </button>
              <button
                onClick={handleApplyCrop}
                disabled={!completedCrop?.width || !completedCrop?.height}
                className="bg-primary-600 hover:bg-primary-500 text-white px-6 py-2.5 rounded-xl font-semibold shadow-lg shadow-primary-500/20 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                <CheckSquare className="mr-2" size={18} /> Áp dụng
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Frame Preview Modal */}
      {previewFrame && (
        <div 
          className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={() => setPreviewFrame(null)}
        >
          <div 
            className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 max-w-3xl max-h-[90vh] flex flex-col items-center shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full flex justify-between items-center mb-5 border-b border-zinc-200 dark:border-zinc-800/50 pb-4">
              <h3 className="text-xl font-bold text-zinc-900 dark:text-white">Xem trước Frame</h3>
              <button 
                onClick={() => setPreviewFrame(null)}
                className="text-zinc-400 dark:text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:bg-zinc-800/50 transition-colors"
              >
                <X size={32} />
              </button>
            </div>
            
            <div ref={modalContainerRef} className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 overflow-auto max-h-[60vh] flex items-center justify-center checkerboard w-full min-h-[300px] relative">
              <img 
                src={previewFrame.dataUrl} 
                alt="Xem trước Frame" 
                className="pixelated max-w-none m-auto transition-[width,height] duration-300 ease-out"
                style={{
                  width: previewFrame.width * modalZoom,
                  height: previewFrame.height * modalZoom
                }}
              />
              <div className="absolute bottom-4 right-4 bg-zinc-50 dark:bg-zinc-900/90 backdrop-blur-sm border border-zinc-200 dark:border-zinc-800 rounded-lg flex items-center p-1 z-10">
                <button onClick={handleZoomToFitModal} className="p-2 hover:text-primary-400 border-r border-zinc-300 dark:border-zinc-700/50 mr-1 pr-3" title="Vừa màn hình"><Maximize size={20}/></button>
                <button onClick={() => setModalZoom(z => Math.max(0.1, z - 0.5))} className="p-2 hover:text-primary-400" title="Thu nhỏ"><ZoomOut size={20}/></button>
                <span className="text-sm font-bold px-2 w-16 text-center">{Math.round(modalZoom * 100)}%</span>
                <button onClick={() => setModalZoom(z => Math.min(20, z + 0.5))} className="p-2 hover:text-primary-400" title="Phóng to"><ZoomIn size={20}/></button>
              </div>
            </div>
            
            <div className="mt-6 flex gap-3 w-full justify-between items-center">
              <div className="text-sm text-zinc-400 dark:text-zinc-500 dark:text-zinc-400 bg-zinc-50 dark:bg-zinc-900 px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800">
                {previewFrame.width} x {previewFrame.height} px
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleShareFrame}
                  className="bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-900 dark:text-white px-4 py-2 flex items-center text-sm font-semibold rounded-xl shadow-sm transition-all active:scale-[0.98]"
                  title="Chia sẻ frame này"
                >
                  <Share2 className="mr-2" size={18} /> Chia sẻ
                </button>
                <button
                  onClick={(e) => {
                    handleRemoveFrame(e, previewFrame.id);
                    setPreviewFrame(null);
                    setToastMessage('Đã xóa frame!');
                  }}
                  className="bg-red-500/90 hover:bg-red-500 text-white px-4 py-2 flex items-center text-sm font-semibold rounded-xl shadow-lg shadow-red-500/20 transition-all active:scale-[0.98]"
                >
                  <Trash2 className="mr-2" size={18} /> Xóa
                </button>
                <button
                  onClick={() => {
                    saveAs(previewFrame.dataUrl, `${imageName || 'sprite'}_${previewFrame.id}.png`);
                  }}
                  className="bg-primary-600 hover:bg-primary-500 text-white px-4 py-2 flex items-center text-sm font-semibold rounded-xl shadow-lg shadow-primary-500/20 transition-all active:scale-[0.98]"
                >
                  <Download className="mr-2" size={18} /> Tải PNG
                </button>
                <button
                  onClick={async () => {
                    const webpDataUrl = await convertToWebP(previewFrame.dataUrl);
                    saveAs(webpDataUrl, `${imageName || 'sprite'}_${previewFrame.id}.webp`);
                  }}
                  className="bg-primary-600 hover:bg-primary-500 text-white px-4 py-2 flex items-center text-sm font-semibold rounded-xl shadow-lg shadow-primary-500/20 transition-all active:scale-[0.98]"
                >
                  <Download className="mr-2" size={18} /> Tải WebP
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Delete Confirmation Modal */}
      {showDeleteAllConfirm && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setShowDeleteAllConfirm(false)}
        >
          <div 
            className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 max-w-md w-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 mb-4 text-red-500">
              <Trash2 size={24} />
              <h3 className="text-xl font-bold">Xóa frame?</h3>
            </div>
            <p className="text-zinc-400 dark:text-zinc-500 dark:text-zinc-400 mb-6">
              {selectedFrames.size > 0 
                ? `Bạn muốn xóa ${selectedFrames.size} frame đã chọn hay xóa toàn bộ ${frames.length} frame?` 
                : `Bạn có chắc chắn muốn xóa tất cả ${frames.length} frame không?`} Hành động này có thể hoàn tác bằng nút Undo (Ctrl+Z).
            </p>
            <div className="flex justify-end gap-3 flex-wrap">
              <button
                onClick={() => setShowDeleteAllConfirm(false)}
                className="px-4 py-2 rounded-xl font-medium text-zinc-400 dark:text-zinc-600 dark:text-zinc-300 bg-zinc-50 dark:bg-zinc-900 hover:bg-zinc-100 dark:bg-zinc-800 transition-colors"
              >
                Hủy
              </button>
              {selectedFrames.size > 0 && (
                <button
                  onClick={() => {
                    handleDeleteSelected();
                    setShowDeleteAllConfirm(false);
                  }}
                  className="px-4 py-2 rounded-xl font-medium text-white bg-orange-600 hover:bg-orange-500 transition-colors shadow-lg shadow-orange-500/20"
                >
                  Xóa đã chọn ({selectedFrames.size})
                </button>
              )}
              <button
                onClick={() => {
                  const newHistory = history.slice(0, historyIndex + 1);
                  newHistory.push([]);
                  setHistory(newHistory);
                  setHistoryIndex(newHistory.length - 1);
                  setFrames([]);
                  setSelectedFrames(new Set());
                  setShowDeleteAllConfirm(false);
                }}
                className="px-4 py-2 rounded-xl font-medium text-white bg-red-600 hover:bg-red-500 transition-colors shadow-lg shadow-red-500/20"
              >
                Xóa tất cả
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Help Modal */}
      {showHelpModal && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setShowHelpModal(false)}
        >
          <div 
            className="bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 max-w-2xl w-full shadow-2xl max-h-[90vh] overflow-y-auto custom-scrollbar"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6 border-b border-zinc-200 dark:border-zinc-800 pb-4">
              <h3 className="text-2xl font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                <Info className="text-primary-500" /> Hướng dẫn sử dụng
              </h3>
              <button 
                onClick={() => setShowHelpModal(false)}
                className="p-2 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-full transition-colors text-zinc-500 dark:text-zinc-400"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="space-y-6 text-zinc-700 dark:text-zinc-300">
              <section>
                <h4 className="text-lg font-semibold text-zinc-900 dark:text-white mb-2 flex items-center gap-2">
                  <Grid3X3 size={18} className="text-primary-400" /> 1. Các phương pháp cắt ảnh
                </h4>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Chia theo lưới (Grid):</strong> Cắt ảnh thành các phần bằng nhau dựa trên số cột và số hàng bạn nhập. Thích hợp cho các sprite sheet được sắp xếp đều đặn.</li>
                  <li><strong>Kích thước cố định (Size):</strong> Cắt ảnh thành các frame có kích thước (chiều rộng x chiều cao) cố định.</li>
                  <li><strong>Tự động (Auto):</strong> Tự động phát hiện các sprite dựa trên các điểm ảnh liền kề. Rất hữu ích cho các sprite sheet được sắp xếp lộn xộn hoặc có kích thước khác nhau.</li>
                </ul>
              </section>

              <section>
                <h4 className="text-lg font-semibold text-zinc-900 dark:text-white mb-2 flex items-center gap-2">
                  <Settings size={18} className="text-primary-400" /> 2. Cài đặt nâng cao (Tự động)
                </h4>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Khoảng cách kết nối:</strong> Khoảng cách tối đa (tính bằng pixel) giữa các điểm ảnh để chúng được coi là thuộc cùng một sprite.</li>
                  <li><strong>Dung sai màu:</strong> Mức độ khác biệt màu sắc cho phép khi phát hiện viền.</li>
                  <li><strong>Căn chỉnh:</strong> Cách đặt sprite bên trong khung hình (Căn giữa hoặc Căn đáy).</li>
                  <li><strong>Kích thước Canvas:</strong> Bạn có thể để tự động (vừa khít với sprite lớn nhất) hoặc tự định nghĩa kích thước cố định cho tất cả các frame.</li>
                </ul>
              </section>

              <section>
                <h4 className="text-lg font-semibold text-zinc-900 dark:text-white mb-2 flex items-center gap-2">
                  <Film size={18} className="text-primary-400" /> 3. Xem trước & Chỉnh sửa
                </h4>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Tab Từng ảnh:</strong> Xem tất cả các frame đã cắt. Bạn có thể chọn nhiều frame để xóa hoặc tải xuống.</li>
                  <li><strong>Tab Ảnh động:</strong> Xem trước các frame dưới dạng hoạt ảnh. Bạn có thể điều chỉnh tốc độ (FPS), tạm dừng/phát, và xem dưới dạng hàng hoặc lưới.</li>
                  <li><strong>Undo/Redo:</strong> Sử dụng các nút hoặc phím tắt để hoàn tác/làm lại các thao tác cắt hoặc xóa.</li>
                </ul>
              </section>

              <section>
                <h4 className="text-lg font-semibold text-zinc-900 dark:text-white mb-2 flex items-center gap-2">
                  <Download size={18} className="text-primary-400" /> 4. Phím tắt (Shortcuts)
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                  <div className="bg-zinc-100 dark:bg-zinc-900 p-3 rounded-lg border border-zinc-200 dark:border-zinc-800">
                    <span className="font-mono bg-zinc-200 dark:bg-zinc-800 px-1.5 py-0.5 rounded text-zinc-900 dark:text-zinc-200">Enter</span> : Cắt ảnh
                  </div>
                  <div className="bg-zinc-100 dark:bg-zinc-900 p-3 rounded-lg border border-zinc-200 dark:border-zinc-800">
                    <span className="font-mono bg-zinc-200 dark:bg-zinc-800 px-1.5 py-0.5 rounded text-zinc-900 dark:text-zinc-200">Ctrl + Z</span> : Hoàn tác (Undo)
                  </div>
                  <div className="bg-zinc-100 dark:bg-zinc-900 p-3 rounded-lg border border-zinc-200 dark:border-zinc-800">
                    <span className="font-mono bg-zinc-200 dark:bg-zinc-800 px-1.5 py-0.5 rounded text-zinc-900 dark:text-zinc-200">Ctrl + Y</span> : Làm lại (Redo)
                  </div>
                  <div className="bg-zinc-100 dark:bg-zinc-900 p-3 rounded-lg border border-zinc-200 dark:border-zinc-800">
                    <span className="font-mono bg-zinc-200 dark:bg-zinc-800 px-1.5 py-0.5 rounded text-zinc-900 dark:text-zinc-200">Ctrl + S</span> : Tải file ZIP
                  </div>
                  <div className="bg-zinc-100 dark:bg-zinc-900 p-3 rounded-lg border border-zinc-200 dark:border-zinc-800">
                    <span className="font-mono bg-zinc-200 dark:bg-zinc-800 px-1.5 py-0.5 rounded text-zinc-900 dark:text-zinc-200">Delete</span> : Xóa frame đã chọn
                  </div>
                  <div className="bg-zinc-100 dark:bg-zinc-900 p-3 rounded-lg border border-zinc-200 dark:border-zinc-800">
                    <span className="font-mono bg-zinc-200 dark:bg-zinc-800 px-1.5 py-0.5 rounded text-zinc-900 dark:text-zinc-200">Space</span> : Phát/Tạm dừng hoạt ảnh
                  </div>
                </div>
              </section>
            </div>
            
            <div className="mt-8 flex justify-end">
              <button
                onClick={() => setShowHelpModal(false)}
                className="px-6 py-2 rounded-xl font-medium text-white bg-primary-600 hover:bg-primary-500 transition-colors shadow-lg shadow-primary-500/20"
              >
                Đã hiểu
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 z-50 toast-animate">
          <CheckSquare size={20} />
          <span className="font-medium text-base">{toastMessage}</span>
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
            linear-gradient(45deg, #18181b 25%, transparent 25%), 
            linear-gradient(-45deg, #18181b 25%, transparent 25%), 
            linear-gradient(45deg, transparent 75%, #18181b 75%), 
            linear-gradient(-45deg, transparent 75%, #18181b 75%);
          background-size: 10px 10px;
          background-position: 0 0, 0 5px, 5px -5px, -5px 0px;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #3f3f46;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: #52525b;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
