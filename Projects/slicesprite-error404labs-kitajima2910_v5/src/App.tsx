/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { useDropzone } from 'react-dropzone';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import GIF from 'gif.js';
import { Upload, Download, Image as ImageIcon, Settings, Trash2, Grid3X3, Maximize, X, Wand2, Play, Pause, Film, Undo, Redo, CheckSquare, Square, ZoomIn, ZoomOut, Video, Crop as CropIcon, Info, LayoutGrid, List, Sun, Moon, FolderOpen, FlipHorizontal, FlipVertical, Palette, Loader2, ArrowDownToLine, AlignCenter, Code2, Check, ChevronDown, Share2, Search, Edit2, ChevronLeft, ChevronRight, HelpCircle } from 'lucide-react';
import ReactCrop, { type Crop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { get, set } from 'idb-keyval';
import { HexColorPicker, HexColorInput } from 'react-colorful';
import { driver } from "driver.js";
import "driver.js/dist/driver.css";

type SliceMethod = 'grid' | 'size' | 'auto';

interface Frame {
  id: string;
  dataUrl: string;
  width: number;
  height: number;
  name?: string;
}

type FilterType = 'none' | 'grayscale' | 'sepia' | 'invert' | 'brightness' | 'contrast' | 'hue-rotate' | 'tint';


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

const CustomColorPicker = ({ color, onChange, label }: { color: string, onChange: (color: string) => void, label: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={containerRef}>
      <div className="flex items-center gap-2 mb-1.5">
        <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{label}</span>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-10 h-10 rounded-lg border-2 border-zinc-200 dark:border-zinc-800 shadow-sm flex-shrink-0 transition-transform active:scale-95"
          style={{ backgroundColor: color }}
          title="Chọn màu"
        />
        <div className="flex-1">
          <HexColorInput
            color={color}
            onChange={onChange}
            className="w-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg px-3 py-2 text-sm font-mono focus:outline-none focus:ring-1 focus:ring-primary-500 uppercase"
          />
        </div>
      </div>
      {isOpen && (
        <div className="absolute bottom-full left-0 mb-2 z-[100] p-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-2xl animate-in fade-in slide-in-from-bottom-2 duration-200">
          <HexColorPicker color={color} onChange={onChange} />
          <div className="mt-3 grid grid-cols-5 gap-1.5">
            {['#ffffff', '#000000', '#ff0000', '#00ff00', '#0000ff', '#ffff00', '#00ffff', '#ff00ff', '#ff8800', '#8800ff'].map(c => (
              <button
                key={c}
                onClick={() => onChange(c)}
                className="w-6 h-6 rounded-md border border-zinc-200 dark:border-zinc-800 transition-transform hover:scale-110 active:scale-90"
                style={{ backgroundColor: c }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const AlignmentSettings = ({ 
  sliceMethod, 
  useAlignmentForGridSize, 
  setUseAlignmentForGridSize, 
  autoAlign, 
  setAutoAlign 
}: { 
  sliceMethod: SliceMethod, 
  useAlignmentForGridSize: boolean, 
  setUseAlignmentForGridSize: (val: boolean) => void, 
  autoAlign: 'center' | 'bottom', 
  setAutoAlign: (val: 'center' | 'bottom') => void 
}) => (
  <div className="mt-4">
    <div className="flex items-center justify-between mb-2">
      <TooltipLabel label="Căn lề (Kích thước chuẩn)" tooltip="Cách căn lề các sprite bên trong frame" />
      {sliceMethod !== 'auto' && (
        <label className="flex items-center space-x-2 cursor-pointer">
          <input 
            type="checkbox" 
            checked={useAlignmentForGridSize}
            onChange={(e) => setUseAlignmentForGridSize(e.target.checked)}
            className="w-4 h-4 accent-primary-500"
          />
          <span className="text-xs font-medium text-zinc-500">Kích hoạt</span>
        </label>
      )}
    </div>
    <div className={`flex bg-white dark:bg-zinc-950 rounded-xl p-1.5 border border-zinc-200 dark:border-zinc-800/80 shadow-inner transition-opacity ${sliceMethod !== 'auto' && !useAlignmentForGridSize ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
      <button
        className={`flex-1 py-2 text-xs sm:text-sm font-bold flex items-center justify-center transition-all rounded-lg hover:shadow-md active:scale-95 ${autoAlign === 'bottom' ? 'bg-primary-600 text-white shadow-md' : 'text-zinc-400 dark:text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-800/30'}`}
        onClick={() => setAutoAlign('bottom')}
      >
        <ArrowDownToLine size={16} className="mr-1.5" /> Dưới đáy
      </button>
      <button
        className={`flex-1 py-2 text-xs sm:text-sm font-bold flex items-center justify-center transition-all rounded-lg hover:shadow-md active:scale-95 ${autoAlign === 'center' ? 'bg-primary-600 text-white shadow-md' : 'text-zinc-400 dark:text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-800/30'}`}
        onClick={() => setAutoAlign('center')}
      >
        <AlignCenter size={16} className="mr-1.5" /> Chính giữa
      </button>
    </div>
  </div>
);

const FrameCard = React.memo(({ 
  frame, 
  index, 
  isSelected, 
  onToggle, 
  onRename, 
  onDelete, 
  onPreview, 
  onCrop,
  isRenaming,
  tempName,
  setTempName,
  onSaveName,
  onCancelRename
}: { 
  frame: Frame, 
  index: number, 
  isSelected: boolean, 
  onToggle: (id: string, e: React.MouseEvent) => void,
  onRename: (id: string, name: string) => void,
  onDelete: (id: string) => void,
  onPreview: (frame: Frame) => void,
  onCrop: (frame: Frame) => void,
  isRenaming: boolean,
  tempName: string,
  setTempName: (name: string) => void,
  onSaveName: () => void,
  onCancelRename: () => void
}) => {
  return (
    <div 
      className={`group relative bg-white dark:bg-zinc-900 border ${isSelected ? 'border-primary-500 ring-2 ring-primary-500/20' : 'border-zinc-200 dark:border-zinc-800'} rounded-xl overflow-hidden transition-all hover:shadow-lg`}
    >
      <div 
        className="aspect-square flex items-center justify-center p-3 cursor-pointer checkerboard relative overflow-hidden"
        onClick={(e) => onToggle(frame.id, e)}
      >
        <img 
          src={frame.dataUrl} 
          alt={frame.name || `Frame ${index}`} 
          className="max-w-full max-h-full object-contain pixelated transition-transform group-hover:scale-110" 
        />
        <div className="absolute top-1.5 left-1.5 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1.5">
          <button 
            onClick={(e) => { e.stopPropagation(); onPreview(frame); }}
            className="p-2 sm:p-1.5 bg-white/90 dark:bg-zinc-800/90 backdrop-blur-sm rounded-lg shadow-sm hover:text-primary-500 active:scale-90 transition-transform"
            title="Xem trước"
          >
            <Maximize size={16} className="sm:w-3.5 sm:h-3.5" />
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); onCrop(frame); }}
            className="p-2 sm:p-1.5 bg-white/90 dark:bg-zinc-800/90 backdrop-blur-sm rounded-lg shadow-sm hover:text-primary-500 active:scale-90 transition-transform"
            title="Cắt sườn"
          >
            <CropIcon size={16} className="sm:w-3.5 sm:h-3.5" />
          </button>
        </div>
        <div className="absolute top-1.5 right-1.5">
          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${isSelected ? 'bg-primary-500 border-primary-500 text-white' : 'bg-white/50 border-white/80 dark:bg-zinc-800/50 dark:border-zinc-700/80'}`}>
            {isSelected && <Check size={12} strokeWidth={3} />}
          </div>
        </div>
      </div>
      
      <div className="p-3 border-t border-zinc-100 dark:border-zinc-800/50">
        <div className="flex items-center justify-between mb-2">
          {isRenaming ? (
            <div className="flex-1 flex gap-1" onClick={e => e.stopPropagation()}>
              <input
                autoFocus
                type="text"
                value={tempName}
                onChange={e => setTempName(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter') onSaveName();
                  if (e.key === 'Escape') onCancelRename();
                }}
                className="flex-1 bg-zinc-100 dark:bg-zinc-800 border-none rounded px-1.5 py-0.5 text-xs focus:ring-1 focus:ring-primary-500"
              />
              <button onClick={onSaveName} className="text-primary-500"><Check size={14}/></button>
            </div>
          ) : (
            <span className="text-[10px] sm:text-xs font-bold text-zinc-900 dark:text-zinc-100 truncate flex-1" title={frame.name || `Frame ${index}`}>
              {frame.name || `Frame ${index}`}
            </span>
          )}
          <div className="flex items-center gap-2 ml-2">
            {!isRenaming && (
              <button 
                onClick={(e) => { e.stopPropagation(); onRename(frame.id, frame.name || `Frame ${index}`); }}
                className="p-2 sm:p-1 text-zinc-400 hover:text-primary-500 transition-colors active:scale-90"
              >
                <Edit2 size={16} className="sm:w-3 sm:h-3" />
              </button>
            )}
            <button 
              onClick={(e) => { e.stopPropagation(); onDelete(frame.id); }}
              className="p-2 sm:p-1 text-zinc-400 hover:text-red-500 transition-colors active:scale-90"
            >
              <Trash2 size={16} className="sm:w-3 sm:h-3" />
            </button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-[10px] font-medium text-zinc-400 dark:text-zinc-500">
            {frame.width} × {frame.height}
          </span>
          <span className="text-[10px] font-bold text-zinc-300 dark:text-zinc-700">#{index}</span>
        </div>
      </div>
    </div>
  );
});

const FrameGrid = React.memo(({ 
  paginatedFrames, 
  selectedFrames, 
  toggleFrameSelection, 
  handleDeleteFrame,
  setPreviewFrame,
  handleCropFrame,
  renamingFrameId,
  startRenaming,
  tempName,
  setTempName,
  saveRename,
  setRenamingFrameId
}: { 
  paginatedFrames: any[], 
  selectedFrames: Set<string>, 
  toggleFrameSelection: (id: string, e: React.MouseEvent) => void,
  handleDeleteFrame: (id: string) => void,
  setPreviewFrame: (frame: Frame) => void,
  handleCropFrame: (frame: Frame) => void,
  renamingFrameId: string | null,
  startRenaming: (id: string, name: string) => void,
  tempName: string,
  setTempName: (name: string) => void,
  saveRename: () => void,
  setRenamingFrameId: (id: string | null) => void
}) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 pb-4">
      {paginatedFrames.map((frame) => (
        <FrameCard 
          key={frame.id}
          frame={frame}
          index={frame.originalIndex}
          isSelected={selectedFrames.has(frame.id)}
          onToggle={toggleFrameSelection}
          onRename={startRenaming}
          onDelete={handleDeleteFrame}
          onPreview={setPreviewFrame}
          onCrop={handleCropFrame}
          isRenaming={renamingFrameId === frame.id}
          tempName={tempName}
          setTempName={setTempName}
          onSaveName={saveRename}
          onCancelRename={() => setRenamingFrameId(null)}
        />
      ))}
    </div>
  );
});

const AnimationPlayer = ({ 
  frames, 
  isPlaying, 
  setIsPlaying, 
  fps, 
  setFps, 
  animZoom,
  setAnimZoom,
  handleRemoveFrame,
  flipFrames,
  animTimelineView,
  setAnimTimelineView
}: { 
  frames: Frame[], 
  isPlaying: boolean, 
  setIsPlaying: (val: boolean) => void,
  fps: number,
  setFps: (val: number) => void,
  animZoom: number,
  setAnimZoom: React.Dispatch<React.SetStateAction<number>>,
  handleRemoveFrame: (id: string, e?: React.MouseEvent) => void,
  flipFrames: (direction: 'horizontal' | 'vertical') => void,
  animTimelineView: 'row' | 'grid',
  setAnimTimelineView: (val: 'row' | 'grid') => void
}) => {
  const animContainerRef = useRef<HTMLDivElement>(null);
  const [currentAnimFrame, setCurrentAnimFrame] = useState(0);

  useEffect(() => {
    let requestRef: number;
    let lastTime = 0;
    
    const animate = (time: number) => {
      if (lastTime !== 0) {
        const deltaTime = time - lastTime;
        if (deltaTime >= 1000 / fps) {
          setCurrentAnimFrame((prev) => (prev + 1) % frames.length);
          lastTime = time;
        }
      } else {
        lastTime = time;
      }
      requestRef = requestAnimationFrame(animate);
    };

    if (isPlaying && frames.length > 0) {
      requestRef = requestAnimationFrame(animate);
    }
    
    return () => cancelAnimationFrame(requestRef);
  }, [isPlaying, frames.length, fps]);

  const handleZoomToFitAnim = useCallback(() => {
    if (!animContainerRef.current || frames.length === 0) return;
    const frame = frames[currentAnimFrame % frames.length];
    if (!frame) return;
    const container = animContainerRef.current;
    const padding = 40;
    const scaleX = (container.clientWidth - padding) / frame.width;
    const scaleY = (container.clientHeight - padding) / frame.height;
    setAnimZoom(Math.max(0.1, Math.min(scaleX, scaleY, 20)));
  }, [frames, currentAnimFrame, setAnimZoom]);

  const currentFrameData = useMemo(() => {
    if (frames.length === 0) return null;
    return frames[currentAnimFrame % frames.length];
  }, [frames, currentAnimFrame]);

  return (
    <div className="flex-1 flex flex-col items-center justify-center">
      <div ref={animContainerRef} className="w-full max-w-md aspect-square flex items-center justify-center bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl mb-6 overflow-auto checkerboard relative">
        {currentFrameData && (
          <img 
            src={currentFrameData.dataUrl} 
            alt={`Frame hoạt ảnh ${currentAnimFrame % frames.length}`} 
            className="pixelated max-w-none m-auto"
            style={{
              width: currentFrameData.width * animZoom,
              height: currentFrameData.height * animZoom
            }}
          />
        )}
        <div className="absolute top-2 right-2 bg-zinc-50 dark:bg-zinc-900/80 backdrop-blur-sm border border-zinc-200 dark:border-zinc-800 px-2 py-1 rounded-lg text-sm z-10">
          {currentFrameData?.width}x{currentFrameData?.height}
        </div>
        <div className="absolute bottom-2 right-2 bg-zinc-50 dark:bg-zinc-900/90 backdrop-blur-sm border border-zinc-200 dark:border-zinc-800 rounded-lg flex items-center p-1 z-10">
          <button 
            onClick={handleZoomToFitAnim} 
            className="px-2 py-1 hover:text-primary-400 border-r border-zinc-300 dark:border-zinc-700/50 mr-1 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider transition-colors" 
            title="Vừa khung hình (Fit to screen)"
          >
            <Maximize size={14}/> Fit
          </button>
          <button onClick={() => setAnimZoom(z => Math.max(0.1, z - 0.5))} className="p-1 hover:text-primary-400 transition-colors" title="Thu nhỏ"><ZoomOut size={16}/></button>
          <span className="text-xs font-bold px-1 w-12 text-center">{Math.round(animZoom * 100)}%</span>
          <button onClick={() => setAnimZoom(z => Math.min(20, z + 0.5))} className="p-1 hover:text-primary-400 transition-colors" title="Phóng to"><ZoomIn size={16}/></button>
        </div>
      </div>
      
      <div className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 flex flex-col gap-4 shadow-lg">
        {/* Timeline Scrubber */}
        <div className="w-full flex flex-col gap-2 pb-2 border-b border-zinc-200 dark:border-zinc-800/50">
          <div className="flex items-center justify-between text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest px-1">
            <span>Timeline</span>
            <span className="text-primary-500">Frame {(currentAnimFrame % frames.length) + 1} / {frames.length}</span>
          </div>
          <div className="relative group/timeline h-8 flex items-center">
            <input 
              type="range" 
              min="0" 
              max={Math.max(0, frames.length - 1)} 
              value={currentAnimFrame % frames.length} 
              onChange={(e) => {
                setCurrentAnimFrame(parseInt(e.target.value));
                setIsPlaying(false);
              }}
              className="w-full h-2 bg-zinc-200 dark:bg-zinc-800 rounded-full appearance-none cursor-pointer accent-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 z-10"
            />
            {/* Tick marks for frames */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none flex justify-between items-center px-[2px]">
              {frames.length > 1 && frames.length <= 60 && Array.from({ length: frames.length }).map((_, i) => (
                <div key={i} className={`w-0.5 h-3 rounded-full ${i === (currentAnimFrame % frames.length) ? 'bg-primary-500' : 'bg-zinc-300 dark:bg-zinc-700'}`} />
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-center gap-4 justify-between sm:justify-start">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="bg-primary-600 hover:bg-primary-500 text-white p-4 rounded-full shadow-lg shadow-primary-500/20 transition-all active:scale-95 flex items-center justify-center min-w-[56px] h-14 w-14"
            >
              {isPlaying ? <Pause size={28} /> : <Play size={28} className="ml-1" />}
            </button>
            <div className="flex flex-col gap-1.5 flex-1 max-w-[200px]">
              <div className="flex flex-col gap-0.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase">Tốc độ</span>
                  <span className="text-xs font-bold text-primary-500">{fps} FPS</span>
                </div>
                <input 
                  type="range" 
                  min="1" 
                  max="60" 
                  value={fps} 
                  onChange={(e) => setFps(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-zinc-200 dark:bg-zinc-800 rounded-full appearance-none cursor-pointer accent-primary-500"
                />
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none justify-between sm:justify-end">
            <div className="flex bg-zinc-100 dark:bg-zinc-800 rounded-lg p-1 mr-2">
              <button
                onClick={handleZoomToFitAnim}
                className="p-1.5 rounded-md hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider"
                title="Vừa khung hình (Fit to screen)"
              >
                <Maximize size={14} /> Fit
              </button>
            </div>
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
                  handleRemoveFrame(frameToRemove.id, e);
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
                className={`w-14 h-14 rounded-lg border-2 cursor-pointer overflow-hidden flex items-center justify-center bg-white dark:bg-zinc-950 ${index === currentAnimFrame % frames.length ? 'border-primary-500' : 'border-zinc-200 dark:border-zinc-800 opacity-70'}`}
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
  );
};

const PreviewCanvas = ({ img, filter, tintColor, removeBg, bgColor, tolerance, onColorPick }: { img: HTMLImageElement, filter: FilterType, tintColor: string, removeBg: boolean, bgColor: string, tolerance: number, onColorPick: (hex: string) => void }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) * (canvas.width / rect.width);
    const y = (e.clientY - rect.top) * (canvas.height / rect.height);
    
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;
    
    // We need a clean draw to pick the original color
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = img.width;
    tempCanvas.height = img.height;
    const tempCtx = tempCanvas.getContext('2d');
    if (!tempCtx) return;
    tempCtx.drawImage(img, 0, 0);
    
    const pixel = tempCtx.getImageData(x, y, 1, 1).data;
    const hex = `#${((1 << 24) + (pixel[0] << 16) + (pixel[1] << 8) + pixel[2]).toString(16).slice(1)}`;
    onColorPick(hex);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    // 1. Create a clean canvas to apply background removal on original pixels
    const cleanCanvas = document.createElement('canvas');
    cleanCanvas.width = img.width;
    cleanCanvas.height = img.height;
    const cleanCtx = cleanCanvas.getContext('2d', { willReadFrequently: true });
    if (!cleanCtx) return;
    cleanCtx.drawImage(img, 0, 0);

    if (removeBg) {
      const imageData = cleanCtx.getImageData(0, 0, cleanCanvas.width, cleanCanvas.height);
      const data = imageData.data;
      const rTarget = parseInt(bgColor.slice(1, 3), 16);
      const gTarget = parseInt(bgColor.slice(3, 5), 16);
      const bTarget = parseInt(bgColor.slice(5, 7), 16);

      for (let i = 0; i < data.length; i += 4) {
        const r = data[i], g = data[i + 1], b = data[i + 2], a = data[i + 3];
        if (a === 0) continue;
        const diff = Math.sqrt(Math.pow(r - rTarget, 2) + Math.pow(g - gTarget, 2) + Math.pow(b - bTarget, 2));
        if (diff <= tolerance * 4.42) data[i + 3] = 0;
      }
      cleanCtx.putImageData(imageData, 0, 0);
    }

    // 2. Apply filters and draw to main canvas
    canvas.width = img.width;
    canvas.height = img.height;

    switch (filter) {
      case 'grayscale': ctx.filter = 'grayscale(100%)'; break;
      case 'sepia': ctx.filter = 'sepia(100%)'; break;
      case 'invert': ctx.filter = 'invert(100%)'; break;
      case 'brightness': ctx.filter = 'brightness(150%)'; break;
      case 'contrast': ctx.filter = 'contrast(150%)'; break;
      case 'hue-rotate': ctx.filter = 'hue-rotate(90deg)'; break;
      default: ctx.filter = 'none'; break;
    }

    ctx.drawImage(cleanCanvas, 0, 0);

    if (filter === 'tint') {
      ctx.globalCompositeOperation = 'source-atop';
      ctx.fillStyle = tintColor;
      ctx.globalAlpha = 0.35;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = 'source-over';
      ctx.globalAlpha = 1.0;
    }
  }, [img, filter, tintColor, removeBg, bgColor, tolerance]);

  return (
    <canvas 
      ref={canvasRef} 
      onClick={handleCanvasClick}
      className={`max-w-full max-h-full object-contain pixelated transition-all duration-300 cursor-crosshair ${removeBg ? 'checkerboard' : ''}`}
    />
  );
};

export default function App() {
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [imageName, setImageName] = useState<string>('');
  const [sliceMethod, setSliceMethod] = useState<SliceMethod>('grid');
  const [imageFilter, setImageFilter] = useState<FilterType>('none');
  const [tintColor, setTintColor] = useState<string>('#3b82f6');
  
  // Background removal settings
  const [removeBackground, setRemoveBackground] = useState<boolean>(false);
  const [bgRemovalColor, setBgRemovalColor] = useState<string>('#ffffff');
  const [bgRemovalTolerance, setBgRemovalTolerance] = useState<number>(10);
  
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
  const [useAlignmentForGridSize, setUseAlignmentForGridSize] = useState<boolean>(() => {
    return localStorage.getItem('useAlignmentForGridSize') === 'true';
  });
  const [autoGroupMethod, setAutoGroupMethod] = useState<'pixel' | 'bbox' | 'color'>('bbox');
  const [useCustomAutoCanvasSize, setUseCustomAutoCanvasSize] = useState<boolean>(false);
  const [autoCanvasWidth, setAutoCanvasWidth] = useState<number | ''>('');
  const [autoCanvasHeight, setAutoCanvasHeight] = useState<number | ''>('');
  
  // General settings
  const [skipEmpty, setSkipEmpty] = useState<boolean>(true);
  
  const [frames, setFrames] = useState<Frame[]>([]);
  const [selectedFrames, setSelectedFrames] = useState<Set<string>>(new Set());
  const [history, setHistory] = useState<Frame[][]>([]);
  
  const detectBackgroundColor = () => {
    if (!image) return;
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.drawImage(image, 0, 0, 1, 1, 0, 0, 1, 1);
    const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
    const hex = `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
    setBgRemovalColor(hex);
    setRemoveBackground(true);
    setToastMessage('Đã tự động nhận diện màu nền!');
  };

  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [isSlicing, setIsSlicing] = useState<boolean>(false);
  const [isGeneratingGif, setIsGeneratingGif] = useState<boolean>(false);
  const [isGeneratingVideo, setIsGeneratingVideo] = useState<boolean>(false);
  const [isGeneratingZip, setIsGeneratingZip] = useState<boolean>(false);
  const [loadingProgress, setLoadingProgress] = useState<number>(0);
  const [loadingStatus, setLoadingStatus] = useState<string>('');
  const [previewFrame, setPreviewFrame] = useState<Frame | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  const filteredFrames = useMemo(() => {
    const framesWithIndex = frames.map((f, i) => ({ ...f, originalIndex: i }));
    if (!searchQuery) return framesWithIndex;
    const query = searchQuery.toLowerCase();
    return framesWithIndex.filter(frame => {
      const indexMatch = frame.originalIndex.toString().includes(query);
      const sizeMatch = `${frame.width}x${frame.height}`.includes(query) || 
                       `${frame.width} x ${frame.height}`.includes(query);
      const nameMatch = frame.name?.toLowerCase().includes(query);
      return indexMatch || sizeMatch || nameMatch;
    });
  }, [frames, searchQuery]);

  // Pagination settings
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(40);

  const totalPages = Math.ceil(filteredFrames.length / itemsPerPage);
  
  const paginatedFrames = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredFrames.slice(start, start + itemsPerPage);
  }, [filteredFrames, currentPage, itemsPerPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filteredFrames.length, itemsPerPage]);
  
  const [renamingFrameId, setRenamingFrameId] = useState<string | null>(null);
  const [isBulkRenaming, setIsBulkRenaming] = useState<boolean>(false);
  const [tempName, setTempName] = useState<string>('');

  const [isCropping, setIsCropping] = useState<boolean>(false);
  const [crop, setCrop] = useState<Crop>(() => {
    const savedCrop = localStorage.getItem('spriteCropSettings');
    try {
      return savedCrop ? JSON.parse(savedCrop) : undefined;
    } catch (e) {
      return undefined;
    }
  });
  const [completedCrop, setCompletedCrop] = useState<Crop | null>(null);

  useEffect(() => {
    if (crop) {
      localStorage.setItem('spriteCropSettings', JSON.stringify(crop));
    }
  }, [crop]);
  const imgRef = useRef<HTMLImageElement>(null);

  
  // Animation settings
  const [previewTab, setPreviewTab] = useState<'frames' | 'animation'>('frames');
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [fps, setFps] = useState<number>(12);
  
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
  const [showMobileSearch, setShowMobileSearch] = useState(false);
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
    localStorage.setItem('useAlignmentForGridSize', String(useAlignmentForGridSize));
  }, [useAlignmentForGridSize]);

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
  const processingCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const sourceCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const cleanCanvasRef = useRef<HTMLCanvasElement | null>(null);
  
  const getProcessingCanvas = (w: number, h: number) => {
    if (!processingCanvasRef.current) processingCanvasRef.current = document.createElement('canvas');
    processingCanvasRef.current.width = w;
    processingCanvasRef.current.height = h;
    return processingCanvasRef.current;
  };

  const getSourceCanvas = (w: number, h: number) => {
    if (!sourceCanvasRef.current) sourceCanvasRef.current = document.createElement('canvas');
    sourceCanvasRef.current.width = w;
    sourceCanvasRef.current.height = h;
    return sourceCanvasRef.current;
  };

  const getCleanCanvas = (w: number, h: number) => {
    if (!cleanCanvasRef.current) cleanCanvasRef.current = document.createElement('canvas');
    cleanCanvasRef.current.width = w;
    cleanCanvasRef.current.height = h;
    return cleanCanvasRef.current;
  };

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
          if (savedState.tintColor) setTintColor(savedState.tintColor);
          if (savedState.removeBackground !== undefined) setRemoveBackground(savedState.removeBackground);
          if (savedState.bgRemovalColor) setBgRemovalColor(savedState.bgRemovalColor);
          if (savedState.bgRemovalTolerance !== undefined) setBgRemovalTolerance(savedState.bgRemovalTolerance);
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
          tintColor,
          removeBackground,
          bgRemovalColor,
          bgRemovalTolerance,
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
    tintColor,
    removeBackground,
    bgRemovalColor,
    bgRemovalTolerance,
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

  // Reset animation when frames change
  useEffect(() => {
    if (frames.length === 0) {
      setPreviewTab('frames');
    }
  }, [frames]);

  const framesRef = useRef(frames);
  const historyRef = useRef(history);
  useEffect(() => { framesRef.current = frames; }, [frames]);
  useEffect(() => { historyRef.current = history; }, [history]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (sliceTimeoutRef.current) {
        clearTimeout(sliceTimeoutRef.current);
      }
      // Revoke all blob URLs on unmount
      const allFrames = [...framesRef.current, ...historyRef.current.flat()];
      allFrames.forEach(f => {
        if (f.dataUrl.startsWith('blob:')) URL.revokeObjectURL(f.dataUrl);
      });
    };
  }, []);

  const addToHistory = useCallback((newFrames: Frame[]) => {
    setHistory(prev => {
      const next = prev.slice(0, historyIndex + 1);
      next.push(newFrames);
      if (next.length > 50) next.shift(); // Limit history
      return next;
    });
    setHistoryIndex(prev => Math.min(prev + 1, 49));
  }, [historyIndex]);

  const handleRemoveFrame = useCallback((id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setFrames(prev => {
      const newFrames = prev.filter(f => f.id !== id);
      addToHistory(newFrames);
      return newFrames;
    });
    setSelectedFrames(prev => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  }, [addToHistory]);

  const handleRename = useCallback((id: string, newName: string) => {
    setFrames(prev => {
      const newFrames = prev.map(f => f.id === id ? { ...f, name: newName } : f);
      addToHistory(newFrames);
      return newFrames;
    });
    setRenamingFrameId(null);
  }, [addToHistory]);

  const startRenaming = useCallback((id: string, name: string) => {
    setRenamingFrameId(id);
    setTempName(name);
  }, []);

  const saveRename = useCallback(() => {
    if (renamingFrameId) {
      handleRename(renamingFrameId, tempName);
    }
  }, [renamingFrameId, tempName, handleRename]);

  const toggleFrameSelection = useCallback((id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedFrames(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  const selectAllFrames = useCallback(() => {
    setSelectedFrames(new Set(frames.map(f => f.id)));
  }, [frames]);

  const deselectAllFrames = useCallback(() => {
    setSelectedFrames(new Set());
  }, []);

  const handleBulkRename = useCallback((baseName: string) => {
    setFrames(prev => {
      let count = 1;
      const newFrames = prev.map(f => {
        if (selectedFrames.has(f.id)) {
          return { ...f, name: selectedFrames.size > 1 ? `${baseName}_${count++}` : baseName };
        }
        return f;
      });
      addToHistory(newFrames);
      return newFrames;
    });
    setIsBulkRenaming(false);
    setTempName('');
    setToastMessage(`Đã đổi tên ${selectedFrames.size} frame!`);
  }, [selectedFrames, addToHistory]);

  const handleShareFrame = useCallback(async () => {
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
  }, [previewFrame, imageName]);

  const handleCropFrame = useCallback((frame: Frame) => {
    setPreviewFrame(frame);
    setIsCropping(true);
  }, []);

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

  const toBlobUrl = (cvs: HTMLCanvasElement): Promise<string> => {
    return new Promise((resolve) => {
      cvs.toBlob((blob) => {
        if (blob) resolve(URL.createObjectURL(blob));
        else resolve('');
      }, 'image/png');
    });
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
      img.onload = async () => {
        const canvas = getProcessingCanvas(frame.width, frame.height);
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        
        ctx.clearRect(0, 0, frame.width, frame.height);
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
          dataUrl: await toBlobUrl(canvas)
        };
        
        processedCount++;
        if (processedCount === newFrames.length) {
          setFrames(newFrames);
          addToHistory(newFrames);
          setToastMessage(`Đã lật ${targetIds.size} frames.`);
        }
      };
      img.src = frame.dataUrl;
    });
  };

  const handleSlice = async () => {
    if (!image || !canvasRef.current) return;
    
    setIsSlicing(true);
    
    if (sliceTimeoutRef.current) {
      clearTimeout(sliceTimeoutRef.current);
    }
    
    sliceTimeoutRef.current = setTimeout(async () => {
      const canvas = canvasRef.current!;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      const newFrames: Frame[] = [];
      
      const sourceCanvas = getSourceCanvas(image.width, image.height);
      const sourceCtx = sourceCanvas.getContext('2d', { willReadFrequently: true });
      if (!sourceCtx) return;
      
      const cleanCanvas = getCleanCanvas(image.width, image.height);
      const cleanCtx = cleanCanvas.getContext('2d', { willReadFrequently: true });
      if (!cleanCtx) return;
      cleanCtx.drawImage(image, 0, 0);

      if (removeBackground) {
        const imageData = cleanCtx.getImageData(0, 0, image.width, image.height);
        const data = imageData.data;
        const rTarget = parseInt(bgRemovalColor.slice(1, 3), 16);
        const gTarget = parseInt(bgRemovalColor.slice(3, 5), 16);
        const bTarget = parseInt(bgRemovalColor.slice(5, 7), 16);
        
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i], g = data[i + 1], b = data[i + 2], a = data[i + 3];
          if (a === 0) continue;
          const diff = Math.sqrt(Math.pow(r - rTarget, 2) + Math.pow(g - gTarget, 2) + Math.pow(b - bTarget, 2));
          if (diff <= bgRemovalTolerance * 4.42) data[i + 3] = 0;
        }
        cleanCtx.putImageData(imageData, 0, 0);
      }

      switch (imageFilter) {
        case 'grayscale': sourceCtx.filter = 'grayscale(100%)'; break;
        case 'sepia': sourceCtx.filter = 'sepia(100%)'; break;
        case 'invert': sourceCtx.filter = 'invert(100%)'; break;
        case 'brightness': sourceCtx.filter = 'brightness(150%)'; break;
        case 'contrast': sourceCtx.filter = 'contrast(150%)'; break;
        case 'hue-rotate': sourceCtx.filter = 'hue-rotate(90deg)'; break;
        default: sourceCtx.filter = 'none'; break;
      }
      sourceCtx.drawImage(cleanCanvas, 0, 0);

      if (imageFilter === 'tint') {
        sourceCtx.globalCompositeOperation = 'source-atop';
        sourceCtx.fillStyle = tintColor;
        sourceCtx.globalAlpha = 0.35;
        sourceCtx.fillRect(0, 0, image.width, image.height);
        sourceCtx.globalCompositeOperation = 'source-over';
        sourceCtx.globalAlpha = 1.0;
      }
      
      // Get source image data once for all methods
      const sourceImageData = sourceCtx.getImageData(0, 0, image.width, image.height);
      const sourceData = sourceImageData.data;

      if (sliceMethod === 'auto') {
        const minSize = Number(minAutoFrameSize) || 1;
        const connDist = Number(connectionDistance) || 0;
        const colTol = Number(colorTolerance) || 0;
        
        const width = image.width;
        const height = image.height;
        
        const visited = new Uint8Array(width * height);
        let boxes: {x: number, y: number, w: number, h: number}[] = [];
        
        const floodFillDist = (autoGroupMethod === 'pixel' || autoGroupMethod === 'color') ? Math.max(1, connDist) : 1;
        const stack = new Int32Array(width * height);
        
        for (let y = 0; y < height; y++) {
          for (let x = 0; x < width; x++) {
            const i = y * width + x;
            if (visited[i]) continue;
            
            const alpha = sourceData[i * 4 + 3];
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
                    const nAlpha = sourceData[ni * 4 + 3];
                    
                    if (nAlpha === 0) {
                      isBoundary = true;
                    } else {
                      let sameComponent = false;
                      if (autoGroupMethod === 'color') {
                        const r1 = sourceData[ci * 4], g1 = sourceData[ci * 4 + 1], b1 = sourceData[ci * 4 + 2], a1 = sourceData[ci * 4 + 3];
                        const r2 = sourceData[ni * 4], g2 = sourceData[ni * 4 + 1], b2 = sourceData[ni * 4 + 2], a2 = sourceData[ni * 4 + 3];
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
                      if (!visited[ni] && sourceData[ni * 4 + 3] > 0) {
                        let shouldAdd = false;
                        if (autoGroupMethod === 'color') {
                          const r1 = sourceData[ci * 4], g1 = sourceData[ci * 4 + 1], b1 = sourceData[ci * 4 + 2], a1 = sourceData[ci * 4 + 3];
                          const r2 = sourceData[ni * 4], g2 = sourceData[ni * 4 + 1], b2 = sourceData[ni * 4 + 2], a2 = sourceData[ni * 4 + 3];
                          const diff = Math.abs(r1 - r2) + Math.abs(g1 - g2) + Math.abs(b1 - b2) + Math.abs(a1 - a2);
                          if (diff <= colTol) shouldAdd = true;
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
          const parent = new Int32Array(boxes.length);
          for (let i = 0; i < boxes.length; i++) parent[i] = i;
          const find = (i: number): number => {
            if (parent[i] === i) return i;
            return parent[i] = find(parent[i]);
          };
          const union = (i: number, j: number) => {
            const rootI = find(i);
            const rootJ = find(j);
            if (rootI !== rootJ) parent[rootI] = rootJ;
          };
          for (let i = 0; i < boxes.length; i++) {
            for (let j = i + 1; j < boxes.length; j++) {
              const b1 = boxes[i], b2 = boxes[j];
              const b1Right = b1.x + b1.w, b1Bottom = b1.y + b1.h;
              const b2Right = b2.x + b2.w, b2Bottom = b2.y + b2.h;
              const dx = Math.max(0, Math.max(b1.x - b2Right, b2.x - b1Right));
              const dy = Math.max(0, Math.max(b1.y - b2Bottom, b2.y - b1Bottom));
              if (dx <= connDist && dy <= connDist) union(i, j);
            }
          }
          const mergedBoxesMap = new Map<number, {x: number, y: number, w: number, h: number}>();
          for (let i = 0; i < boxes.length; i++) {
            const root = find(i), b = boxes[i];
            if (!mergedBoxesMap.has(root)) mergedBoxesMap.set(root, { ...b });
            else {
              const mb = mergedBoxesMap.get(root)!;
              const newX = Math.min(mb.x, b.x), newY = Math.min(mb.y, b.y);
              const newRight = Math.max(mb.x + mb.w, b.x + b.w), newBottom = Math.max(mb.y + mb.h, b.y + b.h);
              mb.x = newX; mb.y = newY; mb.w = newRight - newX; mb.h = newBottom - newY;
            }
          }
          boxes = Array.from(mergedBoxesMap.values()).filter(b => b.w >= minSize && b.h >= minSize);
        }
        
        boxes.sort((a, b) => Math.abs(a.y - b.y) > Math.min(a.h, b.h) / 2 ? a.y - b.y : a.x - b.x);

        let maxWidth = 0, maxHeight = 0;
        if (useCustomAutoCanvasSize && autoCanvasWidth && autoCanvasHeight) {
          maxWidth = Number(autoCanvasWidth); maxHeight = Number(autoCanvasHeight);
        } else {
          boxes.forEach(box => {
            if (box.w > maxWidth) maxWidth = box.w;
            if (box.h > maxHeight) maxHeight = box.h;
          });
        }

        for (let index = 0; index < boxes.length; index++) {
          const box = boxes[index];
          canvas.width = maxWidth;
          canvas.height = maxHeight;
          ctx.clearRect(0, 0, maxWidth, maxHeight);
          const dx = Math.floor((maxWidth - box.w) / 2);
          const dy = autoAlign === 'bottom' ? maxHeight - box.h : Math.floor((maxHeight - box.h) / 2);
          ctx.drawImage(sourceCanvas, box.x, box.y, box.w, box.h, dx, dy, box.w, box.h);
          newFrames.push({
            id: `frame_auto_${index}_${Date.now()}`,
            dataUrl: await toBlobUrl(canvas),
            width: maxWidth,
            height: maxHeight
          });
        }
      } else {
        let cols = Number(columns) || 1, rws = Number(rows) || 1;
        let fw = Number(frameWidth) || 32, fh = Number(frameHeight) || 32;
        if (sliceMethod === 'grid') { fw = image.width / cols; fh = image.height / rws; }
        else { cols = Math.floor(image.width / fw) || 1; rws = Math.floor(image.height / fh) || 1; }
        
        canvas.width = fw;
        canvas.height = fh;
        
        for (let y = 0; y < rws; y++) {
          for (let x = 0; x < cols; x++) {
            ctx.clearRect(0, 0, fw, fh);
            if (useAlignmentForGridSize) {
              let minX = fw, minY = fh, maxX = -1, maxY = -1, hasContent = false;
              const startX = Math.floor(x * fw), startY = Math.floor(y * fh);
              const cellW = Math.floor(fw), cellH = Math.floor(fh);
              
              for (let cy = 0; cy < cellH; cy++) {
                for (let cx = 0; cx < cellW; cx++) {
                  const px = (startY + cy) * image.width + (startX + cx);
                  if (sourceData[px * 4 + 3] > 0) {
                    if (cx < minX) minX = cx; if (cx > maxX) maxX = cx;
                    if (cy < minY) minY = cy; if (cy > maxY) maxY = cy;
                    hasContent = true;
                  }
                }
              }
              
              if (hasContent) {
                const bw = maxX - minX + 1, bh = maxY - minY + 1;
                const dx = Math.floor((fw - bw) / 2);
                const dy = autoAlign === 'bottom' ? fh - bh : Math.floor((fh - bh) / 2);
                ctx.drawImage(sourceCanvas, startX + minX, startY + minY, bw, bh, dx, dy, bw, bh);
                newFrames.push({
                  id: `frame_${y}_${x}_${Date.now()}`,
                  dataUrl: await toBlobUrl(canvas),
                  width: fw,
                  height: fh
                });
              }
            } else {
              ctx.drawImage(sourceCanvas, x * fw, y * fh, fw, fh, 0, 0, fw, fh);
              let isEmpty = false;
              if (skipEmpty) {
                const frameData = ctx.getImageData(0, 0, fw, fh).data;
                isEmpty = true;
                for (let i = 3; i < frameData.length; i += 4) { if (frameData[i] > 0) { isEmpty = false; break; } }
              }
              if (!isEmpty) {
                newFrames.push({
                  id: `frame_${y}_${x}_${Date.now()}`,
                  dataUrl: await toBlobUrl(canvas),
                  width: fw,
                  height: fh
                });
              }
            }
          }
        }
      }
      
      setFrames(newFrames);
      setSelectedFrames(new Set());
      addToHistory(newFrames);
      setIsSlicing(false);
    }, 50);
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
    setLoadingProgress(0);
    setLoadingStatus(`Đang chuẩn bị nén ${frames.length} ảnh (${format.toUpperCase()})...`);
    
    try {
      const zip = new JSZip();
      const folderName = imageName || 'sprites';
      const folder = zip.folder(folderName);
      
      if (!folder) {
        setIsGeneratingZip(false);
        return;
      }
      
      for (let i = 0; i < frames.length; i++) {
        setLoadingProgress(Math.floor((i / frames.length) * 90));
        setLoadingStatus(`Đang nén: ${i + 1}/${frames.length}`);
        
        const frame = frames[i];
        let imageUrl = frame.dataUrl;
        
        if (format === 'webp') {
          imageUrl = await convertToWebP(frame.dataUrl);
        }
        
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        
        const paddedIndex = i.toString().padStart(3, '0');
        folder.file(`${folderName}_${paddedIndex}.${format}`, blob);
      }
      
      setLoadingStatus('Đang hoàn tất file ZIP...');
      setLoadingProgress(95);
      const content = await zip.generateAsync({ type: 'blob' });
      saveAs(content, `${folderName}_${format}.zip`);
      setToastMessage(`Đã tải xuống ZIP (${format.toUpperCase()})!`);
    } catch (error) {
      console.error("Error generating ZIP:", error);
      setToastMessage('Có lỗi xảy ra khi tạo ZIP.');
    } finally {
      setIsGeneratingZip(false);
      setLoadingProgress(0);
      setLoadingStatus('');
    }
  };

  const handleDownloadGif = async () => {
    if (frames.length === 0) return;
    setIsGeneratingGif(true);
    setLoadingProgress(0);
    setLoadingStatus('Đang khởi tạo trình tạo GIF...');
    
    let workerBlobUrl: string | null = null;
    
    try {
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

      setLoadingStatus(`Đang tải ${frames.length} frames...`);
      const imagePromises = frames.map((frame, idx) => {
        return new Promise<HTMLImageElement>((resolve, reject) => {
          const img = new Image();
          img.onload = () => {
            setLoadingProgress(Math.floor(((idx + 1) / frames.length) * 40));
            resolve(img);
          };
          img.onerror = reject;
          img.src = frame.dataUrl;
        });
      });

      const loadedImages = await Promise.all(imagePromises);

      setLoadingStatus('Đang render các frame GIF...');
      loadedImages.forEach((img, idx) => {
        gif.addFrame(img, { delay: 1000 / fps });
      });

      gif.on('progress', (p: number) => {
        setLoadingProgress(40 + Math.floor(p * 55));
        setLoadingStatus(`Đang xuất GIF: ${Math.round(p * 100)}%`);
      });

      gif.on('finished', (blob: Blob) => {
        saveAs(blob, `${imageName || 'animation'}.gif`);
        setIsGeneratingGif(false);
        setLoadingProgress(0);
        setLoadingStatus('');
        setToastMessage('Đã tạo và tải xuống ảnh GIF!');
        if (workerBlobUrl) {
          URL.revokeObjectURL(workerBlobUrl);
        }
      });

      gif.render();
    } catch (error) {
      console.error("Error generating GIF:", error);
      setIsGeneratingGif(false);
      setLoadingProgress(0);
      setLoadingStatus('');
      setToastMessage('Có lỗi xảy ra khi tạo GIF.');
      if (workerBlobUrl) {
        URL.revokeObjectURL(workerBlobUrl);
      }
    }
  };

  const handleDownloadVideo = async () => {
    if (frames.length === 0) return;
    setIsGeneratingVideo(true);
    setLoadingProgress(0);
    setLoadingStatus('Đang chuẩn bị bộ thu video...');
    
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

      setLoadingStatus(`Đang nén ${frames.length} frames vào video...`);
      const imagePromises = frames.map((frame, idx) => {
        return new Promise<HTMLImageElement>((resolve, reject) => {
          const img = new Image();
          img.onload = () => {
            resolve(img);
          };
          img.onerror = reject;
          img.src = frame.dataUrl;
        });
      });
      const loadedImages = await Promise.all(imagePromises);

      for (let i = 0; i < loadedImages.length; i++) {
        setLoadingProgress(Math.floor((i / loadedImages.length) * 95));
        setLoadingStatus(`Đang quay: ${i + 1}/${loadedImages.length}`);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(loadedImages[i], 0, 0);
        await new Promise(r => setTimeout(r, 1000 / fpsRate));
      }

      await new Promise(r => setTimeout(r, 100));

      setLoadingStatus('Đang mã hóa video...');
      setLoadingProgress(98);
      mediaRecorder.stop();
      await recordingPromise;
      
      setIsGeneratingVideo(false);
      setLoadingProgress(0);
      setLoadingStatus('');
      setToastMessage(`Đã tạo và tải xuống Video!`);
    } catch (error) {
      console.error("Error generating video:", error);
      setIsGeneratingVideo(false);
      setLoadingProgress(0);
      setLoadingStatus('');
      setToastMessage('Có lỗi xảy ra khi tạo Video.');
    }
  };

  
  const handleApplyCrop = async () => {
    if (!completedCrop || !imgRef.current) return;

    const scaleX = imgRef.current.naturalWidth / imgRef.current.width;
    const scaleY = imgRef.current.naturalHeight / imgRef.current.height;
    
    const canvas = getProcessingCanvas(completedCrop.width * scaleX, completedCrop.height * scaleY);
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

    const croppedImageUrl = await toBlobUrl(canvas);
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
    // Revoke all blob URLs in current frames and history
    const allFrames = [...frames, ...history.flat()];
    allFrames.forEach(f => {
      if (f.dataUrl.startsWith('blob:')) URL.revokeObjectURL(f.dataUrl);
    });

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
    setTintColor('#3b82f6');
    setRemoveBackground(false);
    setBgRemovalColor('#ffffff');
    setBgRemovalTolerance(10);
    setPreviewTab('frames');
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
  }, [historyIndex, history, image, isSlicing, selectedFrames, renamingFrameId, isBulkRenaming, previewTab]);

  const startTour = () => {
    const driverObj = driver({
      showProgress: true,
      nextBtnText: 'Tiếp theo',
      prevBtnText: 'Quay lại',
      doneBtnText: 'Xong',
      steps: [
        { 
          element: '#tour-welcome', 
          popover: { 
            title: 'Chào mừng!', 
            description: 'Chào mừng bạn đến với SliceSprite - công cụ cắt sprite sheet pixel art chuyên nghiệp nhất.' 
          } 
        },
        { 
          element: '#tour-upload', 
          popover: { 
            title: 'Tải ảnh lên', 
            description: 'Kéo thả file ảnh của bạn vào đây hoặc click để chọn từ máy tính.' 
          } 
        },
        { 
          element: '#tour-settings', 
          popover: { 
            title: 'Cài đặt cắt', 
            description: 'Tại đây bạn có thể chọn phương pháp cắt và cấu hình các thông số như số hàng/cột, kích thước frame.' 
          } 
        },
        { 
          element: '#tour-slice-methods', 
          popover: { 
            title: 'Phương pháp cắt', 
            description: 'Chọn cắt theo Lưới, theo Kích cỡ cố định hoặc Tự động (AI sẽ tự tìm sprite cho bạn).' 
          } 
        },
        { 
          element: '#tour-slice-btn', 
          popover: { 
            title: 'Thực thi', 
            description: 'Sau khi đã sẵn sàng, nhấn nút này để bắt đầu cắt sprite sheet.' 
          } 
        },
        { 
          element: '#tour-preview-tabs', 
          popover: { 
            title: 'Xem kết quả', 
            description: 'Bạn có thể chuyển đổi giữa xem từng frame riêng lẻ hoặc xem dưới dạng hoạt ảnh (animation).' 
          } 
        },
        { 
          element: '#tour-export', 
          popover: { 
            title: 'Xuất file', 
            description: 'Cuối cùng, hãy tải kết quả của bạn về máy dưới dạng ZIP, GIF hoặc Video chất lượng cao.' 
          } 
        },
      ]
    });
    driverObj.drive();
  };

  const startCropTour = () => {
    const driverObj = driver({
      showProgress: true,
      nextBtnText: 'Tiếp theo',
      prevBtnText: 'Quay lại',
      doneBtnText: 'Xong',
      steps: [
        { 
          element: '#tour-crop-header', 
          popover: { 
            title: 'Công cụ cắt ảnh', 
            description: 'Bạn có thể cắt bớt các khoảng trống thừa hoặc chọn một vùng cụ thể của sprite sheet để làm việc.' 
          } 
        },
        { 
          element: '#tour-crop-selection', 
          popover: { 
            title: 'Chọn vùng cắt', 
            description: 'Dùng chuột kéo trên ảnh này để khoanh vùng vùng mà bạn muốn giữ lại.' 
          } 
        },
        { 
          element: '#tour-crop-apply-btn', 
          popover: { 
            title: 'Xác nhận', 
            description: 'Sau khi chọn xong, nhấn "Áp dụng" để thực hiện cắt. Ảnh gốc của bạn sẽ được thay thế bằng vùng đã chọn.' 
          } 
        },
      ]
    });
    driverObj.drive();
  };

  useEffect(() => {
    const hasSeenTour = localStorage.getItem('hasSeenTourV1');
    if (isStateLoaded && !hasSeenTour && frames.length === 0) {
      const timer = setTimeout(() => {
        startTour();
        localStorage.setItem('hasSeenTourV1', 'true');
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isStateLoaded]);

  useEffect(() => {
    if (isCropping) {
      const hasSeenCropTour = localStorage.getItem('hasSeenCropTourV1');
      if (!hasSeenCropTour) {
        const timer = setTimeout(() => {
          startCropTour();
          localStorage.setItem('hasSeenCropTourV1', 'true');
        }, 800);
        return () => clearTimeout(timer);
      }
    }
  }, [isCropping]);

  if (!isStateLoaded) {
    return (
      <div className="min-h-screen bg-white dark:bg-zinc-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-200 ${uiFontFamily} ${uiFontSize} ${uiLineHeight} p-3 md:p-6 lg:p-8 flex flex-col items-center overflow-x-hidden`}>
      <header className="w-full max-w-7xl mb-6 md:mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="w-full md:w-auto flex flex-row md:flex-col justify-between items-center md:items-start" id="tour-welcome">
          <div className="flex items-center gap-2 md:gap-3">
            <h1 className="text-2xl md:text-5xl font-extrabold text-zinc-900 dark:text-white tracking-tight flex items-center gap-2 md:gap-3">
              <span className="bg-primary-600 text-white p-1.5 md:p-2.5 rounded-lg md:rounded-xl shadow-lg shadow-primary-500/20">
                <Grid3X3 size={20} className="md:w-8 md:h-8" />
              </span>
              SliceSprite
            </h1>
            <div className="md:hidden flex items-center text-[10px] font-medium text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-900/80 backdrop-blur-sm px-2 py-1 border border-zinc-200 dark:border-zinc-800 rounded-full">
              V5
            </div>
          </div>
          <p className="hidden md:block text-sm font-medium text-zinc-400 dark:text-zinc-500 dark:text-zinc-400 mt-2">
            Công cụ cắt Sprite Sheet Pixel Art
          </p>
        </div>
        <div className="flex items-center justify-between w-full md:w-auto gap-2 md:gap-3 relative">
          <div className={`${showMobileSearch ? 'flex absolute inset-0 z-50 bg-white dark:bg-zinc-950 p-2' : 'hidden'} md:flex items-center relative group w-full md:w-auto transition-all duration-300`}>
            <Search className="absolute left-3 md:left-3 text-zinc-400 group-focus-within:text-primary-500 transition-colors" size={16} />
            <input 
              type="text" 
              placeholder="Tìm frame..." 
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (e.target.value && previewTab !== 'frames') setPreviewTab('frames');
              }}
              className="pl-10 pr-10 py-2.5 md:py-2 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 w-full md:w-64 transition-all"
            />
            {searchQuery ? (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-12 md:right-3 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 p-1"
              >
                <X size={14} />
              </button>
            ) : null}
            <button 
              onClick={() => setShowMobileSearch(false)}
              className="md:hidden ml-2 p-2 text-zinc-400"
            >
              <X size={20} />
            </button>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setShowMobileSearch(true)}
              className="p-2.5 rounded-full bg-zinc-100 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400"
            >
              <Search size={18} />
            </button>
          </div>

          <div className="hidden md:flex items-center text-xs font-medium text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-900/80 backdrop-blur-sm px-4 py-2 border border-zinc-200 dark:border-zinc-800 rounded-full">
            <Code2 size={14} className="mr-1.5 text-primary-500" /> Error404 Labs • Kitajima2910 • V5
          </div>
          <div className="md:hidden flex-1"></div>
          
          <div className="flex items-center gap-2">
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
            onClick={startTour}
            className="p-2.5 rounded-full bg-zinc-100 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-primary-600 dark:hover:text-primary-400 hover:border-primary-200 dark:hover:border-primary-800 transition-all shadow-sm"
            title="Hướng dẫn từng bước"
          >
            <HelpCircle size={18} />
          </button>
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
          <div className="bg-zinc-50 dark:bg-zinc-900/80 backdrop-blur-sm border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-xl" id="tour-upload">
            <h2 className="text-xl font-semibold mb-5 flex items-center text-zinc-900 dark:text-white">
              <Upload className="mr-2 text-primary-400" size={20} /> Tải ảnh lên
            </h2>
            
            {!image && frames.length === 0 ? (
              <>
                <div 
                  {...getRootProps()} 
                  className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-300 group/upload ${
                    isDragActive 
                      ? 'border-primary-500 bg-primary-500/10 scale-[1.02] shadow-xl shadow-primary-500/10' 
                      : 'border-zinc-300 dark:border-zinc-700 hover:border-primary-400 hover:bg-zinc-100 dark:hover:bg-zinc-800/50 hover:shadow-lg hover:-translate-y-1'
                  }`}
                >
                  <input {...getInputProps()} />
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5 transition-all duration-300 ${isDragActive ? 'bg-primary-500 text-white scale-110' : 'bg-zinc-100 dark:bg-zinc-800/50 text-primary-400 group-hover/upload:bg-primary-100 dark:group-hover/upload:bg-primary-900/30 group-hover/upload:scale-110'}`}>
                    <ImageIcon className="h-8 w-8" />
                  </div>
                  <p className="text-sm font-bold text-zinc-500 dark:text-zinc-300 transition-colors group-hover/upload:text-primary-600 dark:group-hover/upload:text-primary-400">Kéo & thả sprite sheet vào đây</p>
                  <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-2">hoặc click để chọn file</p>
                </div>
                
                <div className="mt-4 text-center">
                  <label className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800/50 cursor-pointer transition-all hover:bg-primary-100 dark:hover:bg-primary-900/40 hover:shadow-md hover:-translate-y-0.5 active:scale-95 active:translate-y-0">
                    <FolderOpen size={18} /> Hoặc tải lên thư mục chứa các frame
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
                    className="flex items-center px-4 py-2 rounded-lg text-sm font-bold text-red-500 hover:text-white bg-red-50 dark:bg-red-900/10 hover:bg-red-500 border border-red-200 dark:border-red-900/30 transition-all hover:shadow-lg hover:-translate-y-0.5 active:scale-95"
                  >
                    <Trash2 size={16} className="mr-2" /> Xóa và tải lên lại
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="bg-white dark:bg-zinc-950 p-4 border border-zinc-200 dark:border-zinc-800 rounded-xl flex justify-center overflow-hidden max-h-48 relative group">
                  <PreviewCanvas 
                    img={image} 
                    filter={imageFilter} 
                    tintColor={tintColor}
                    removeBg={removeBackground} 
                    bgColor={bgRemovalColor} 
                    tolerance={bgRemovalTolerance} 
                    onColorPick={(hex) => {
                      setBgRemovalColor(hex);
                      setRemoveBackground(true);
                      setToastMessage(`Đã chọn màu: ${hex.toUpperCase()}`);
                    }}
                  />
                  <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                    <button 
                      onClick={() => setIsCropping(true)}
                      className="bg-primary-600/90 hover:bg-primary-600 text-white px-3 py-2 rounded-xl shadow-xl flex items-center text-xs font-bold backdrop-blur-sm border border-white/20 hover:scale-105 active:scale-95 transition-all"
                      title="Cắt vùng ảnh"
                    >
                      <CropIcon size={14} className="mr-1.5" /> Cắt ảnh
                    </button>
                    <button 
                      onClick={clearImage}
                      className="bg-red-500/90 hover:bg-red-500 text-white px-3 py-2 rounded-xl shadow-xl flex items-center text-xs font-bold backdrop-blur-sm border border-white/20 hover:scale-105 active:scale-95 transition-all"
                      title="Xóa ảnh"
                    >
                      <Trash2 size={14} className="mr-1.5" /> Xóa ảnh
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
          <div className={`bg-zinc-50 dark:bg-zinc-900/80 backdrop-blur-sm border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-xl transition-all duration-300 ${!image ? 'opacity-50 pointer-events-none grayscale-[0.5]' : 'opacity-100'}`} id="tour-settings">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <h2 className="text-xl font-semibold flex items-center text-zinc-900 dark:text-white">
                <Settings className="mr-2 text-primary-400" size={20} /> Cài đặt
              </h2>
              <div className="flex bg-white dark:bg-zinc-950 rounded-xl p-1 border border-zinc-200 dark:border-zinc-800/80 shadow-inner w-full md:w-auto overflow-x-auto scrollbar-none">
                <button
                  className={`flex-1 md:flex-none px-4 py-2 text-xs font-bold transition-all rounded-lg hover:shadow-md active:scale-95 whitespace-nowrap flex items-center justify-center gap-2 ${settingsTab === 'slice' ? 'bg-primary-600 text-white shadow-md' : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-800/30'}`}
                  onClick={() => setSettingsTab('slice')}
                >
                  <LayoutGrid size={14} /> Cắt ảnh
                </button>
                <div className="w-px bg-zinc-100 dark:bg-zinc-800 mx-1 shrink-0"></div>
                <button
                  className={`flex-1 md:flex-none px-4 py-2 text-xs font-bold transition-all rounded-lg hover:shadow-md active:scale-95 whitespace-nowrap flex items-center justify-center gap-2 ${settingsTab === 'ui' ? 'bg-primary-600 text-white shadow-md' : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-800/30'}`}
                  onClick={() => setSettingsTab('ui')}
                >
                  <Sun size={14} /> Giao diện
                </button>
              </div>
            </div>
            
            {settingsTab === 'slice' ? (
              <div className="space-y-4">
                <div className="flex bg-white dark:bg-zinc-950 rounded-xl p-1.5 border border-zinc-200 dark:border-zinc-800/80 shadow-inner" id="tour-slice-methods">
                  <button
                    className={`flex-1 py-2 text-xs sm:text-sm font-medium flex items-center justify-center transition-all rounded-lg ${sliceMethod === 'grid' ? 'bg-primary-600 text-white shadow-md' : 'text-zinc-400 dark:text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-800/30'}`}
                    onClick={() => setSliceMethod('grid')}
                  >
                    <Grid3X3 className="mr-1" size={16} /> Lưới
                  </button>
                  <button
                    className={`flex-1 py-2 text-xs sm:text-sm font-medium flex items-center justify-center transition-all rounded-lg ${sliceMethod === 'size' ? 'bg-primary-600 text-white shadow-md' : 'text-zinc-400 dark:text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-800/30'}`}
                    onClick={() => setSliceMethod('size')}
                  >
                    <Maximize className="mr-1" size={16} /> Kích cỡ
                  </button>
                  <button
                    className={`flex-1 py-2 text-xs sm:text-sm font-medium flex items-center justify-center transition-all rounded-lg ${sliceMethod === 'auto' ? 'bg-primary-600 text-white shadow-md' : 'text-zinc-400 dark:text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-800/30'}`}
                    onClick={() => setSliceMethod('auto')}
                  >
                    <Wand2 className="mr-1" size={16} /> Tự động
                  </button>
                </div>

              {sliceMethod === 'grid' && (
                <>
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
                <AlignmentSettings 
                  sliceMethod={sliceMethod}
                  useAlignmentForGridSize={useAlignmentForGridSize}
                  setUseAlignmentForGridSize={setUseAlignmentForGridSize}
                  autoAlign={autoAlign}
                  setAutoAlign={setAutoAlign}
                />
                </>
              )}
              
              {sliceMethod === 'size' && (
                <>
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
                <AlignmentSettings 
                  sliceMethod={sliceMethod}
                  useAlignmentForGridSize={useAlignmentForGridSize}
                  setUseAlignmentForGridSize={setUseAlignmentForGridSize}
                  autoAlign={autoAlign}
                  setAutoAlign={setAutoAlign}
                />
                </>
              )}

              {sliceMethod === 'auto' && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                      <TooltipLabel label="Phương pháp gộp" tooltip="Cách thuật toán gộp các phần rời rạc thành một frame" className="mb-2" />
                      <div className="flex bg-white dark:bg-zinc-950 rounded-xl p-1 border border-zinc-200 dark:border-zinc-800/80 shadow-inner">
                        <button 
                          className={`flex-1 py-2 text-[10px] sm:text-xs font-bold flex items-center justify-center transition-all rounded-lg gap-1 hover:shadow-md hover:-translate-y-0.5 active:scale-95 ${autoGroupMethod === 'bbox' ? 'bg-primary-600 text-white shadow-md' : 'text-zinc-400 dark:text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-800/30'}`}
                          onClick={() => setAutoGroupMethod('bbox')}
                        >
                          <Square size={14} /> <span className="truncate">Vùng bao</span>
                        </button>
                        <button 
                          className={`flex-1 py-2 text-[10px] sm:text-xs font-bold flex items-center justify-center transition-all rounded-lg gap-1 hover:shadow-md hover:-translate-y-0.5 active:scale-95 ${autoGroupMethod === 'pixel' ? 'bg-primary-600 text-white shadow-md' : 'text-zinc-400 dark:text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-800/30'}`}
                          onClick={() => setAutoGroupMethod('pixel')}
                        >
                          <LayoutGrid size={14} /> <span className="truncate">Pixel</span>
                        </button>
                        <button 
                          className={`flex-1 py-2 text-[10px] sm:text-xs font-bold flex items-center justify-center transition-all rounded-lg gap-1 hover:shadow-md hover:-translate-y-0.5 active:scale-95 ${autoGroupMethod === 'color' ? 'bg-primary-600 text-white shadow-md' : 'text-zinc-400 dark:text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-800/30'}`}
                          onClick={() => setAutoGroupMethod('color')}
                        >
                          <Palette size={14} /> <span className="truncate">Màu sắc</span>
                        </button>
                      </div>
                    </div>
                    {autoGroupMethod === 'color' && (
                      <div className="sm:col-span-2">
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
                  
                  <AlignmentSettings 
                    sliceMethod={sliceMethod}
                    useAlignmentForGridSize={useAlignmentForGridSize}
                    setUseAlignmentForGridSize={setUseAlignmentForGridSize}
                    autoAlign={autoAlign}
                    setAutoAlign={setAutoAlign}
                  />

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

              <div className="mt-5 pt-5 border-t border-zinc-200 dark:border-zinc-800/50">
                <div className="flex items-center justify-between mb-3">
                  <TooltipLabel label="Xóa nền (Remove BG)" tooltip="Tự động làm trong suốt màu nền được chọn" className="mb-0" />
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer"
                      checked={removeBackground}
                      onChange={(e) => setRemoveBackground(e.target.checked)}
                    />
                    <div className="w-11 h-6 bg-zinc-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-zinc-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-zinc-600 peer-checked:bg-primary-600"></div>
                  </label>
                </div>

                {removeBackground && (
                  <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
                    <p className="text-[10px] text-zinc-500 dark:text-zinc-400 italic">Mẹo: Click vào ảnh xem trước để chọn màu nền trực tiếp.</p>
                    <div className="flex gap-3">
                      <div className="flex-1">
                        <CustomColorPicker 
                          label="Màu nền" 
                          color={bgRemovalColor} 
                          onChange={setBgRemovalColor} 
                        />
                      </div>
                      <div className="flex items-end pb-0.5">
                        <button 
                          onClick={detectBackgroundColor}
                          className="h-10 px-3 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-600 dark:text-zinc-300 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 border border-zinc-200 dark:border-zinc-700"
                          title="Tự động lấy màu từ pixel góc trên bên trái"
                        >
                          <Palette size={14} /> Tự lấy
                        </button>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between mb-1.5">
                        <label className="block text-[10px] uppercase tracking-wider font-bold text-zinc-400">Độ sai lệch (Tolerance)</label>
                        <span className="text-[10px] font-mono text-primary-500 font-bold">{bgRemovalTolerance}</span>
                      </div>
                      <input 
                        type="range" 
                        min="0" 
                        max="100" 
                        value={bgRemovalTolerance}
                        onChange={(e) => setBgRemovalTolerance(parseInt(e.target.value))}
                        className="w-full h-2 bg-zinc-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-primary-600"
                      />
                    </div>
                  </div>
                )}
              </div>

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
                  <option value="brightness">Tăng sáng (Brightness)</option>
                  <option value="contrast">Tăng tương phản (Contrast)</option>
                  <option value="hue-rotate">Đổi tông màu (Hue Rotate)</option>
                  <option value="tint">Phủ màu (Color Tint)</option>
                </select>
              </div>

              {imageFilter === 'tint' && (
                <div className="mt-3 animate-in fade-in slide-in-from-top-2 duration-300">
                  <CustomColorPicker 
                    label="Màu phủ (Tint Color)" 
                    color={tintColor} 
                    onChange={setTintColor} 
                  />
                </div>
              )}

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
                  id="tour-slice-btn"
                  onClick={handleSlice}
                  disabled={!image || isSlicing}
                  className="w-full bg-primary-600 hover:bg-primary-700 text-white text-lg font-bold py-3.5 rounded-xl shadow-lg shadow-primary-500/20 hover:shadow-primary-500/40 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  title="Cắt ảnh (Enter)"
                >
                  {isSlicing ? (
                    <>
                      <Loader2 className="animate-spin" size={20} />
                      <span>ĐANG CẮT...</span>
                    </>
                  ) : (
                    <>
                      <Wand2 size={20} />
                      <span>CẮT ẢNH NGAY!</span>
                    </>
                  )}
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
                    className={`px-3 py-1.5 flex items-center transition-all rounded-lg hover:shadow-sm active:scale-95 ${historyIndex >= 0 && !isSlicing ? 'text-zinc-500 dark:text-zinc-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20' : 'text-zinc-300 dark:text-zinc-700 cursor-not-allowed'}`}
                    title="Hoàn tác (Ctrl+Z)"
                  >
                    <Undo size={18} />
                  </button>
                  <div className="w-px bg-zinc-100 dark:bg-zinc-800 mx-1"></div>
                  <button
                    onClick={handleRedo}
                    disabled={historyIndex >= history.length - 1 || isSlicing}
                    className={`px-3 py-1.5 flex items-center transition-all rounded-lg hover:shadow-sm active:scale-95 ${historyIndex < history.length - 1 && !isSlicing ? 'text-zinc-500 dark:text-zinc-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20' : 'text-zinc-300 dark:text-zinc-700 cursor-not-allowed'}`}
                    title="Làm lại (Ctrl+Y hoặc Ctrl+Shift+Z)"
                  >
                    <Redo size={18} />
                  </button>
                </div>

                {frames.length > 0 && (
                  <div className="flex bg-white dark:bg-zinc-950 rounded-xl p-1.5 border border-zinc-200 dark:border-zinc-800/80 shadow-inner" id="tour-preview-tabs">
                    <button
                      className={`px-4 py-1.5 text-sm font-bold flex items-center transition-all rounded-lg hover:shadow-md active:scale-95 ${previewTab === 'frames' ? 'bg-primary-600 text-white shadow-md' : 'text-zinc-400 dark:text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-800/30'}`}
                      onClick={() => setPreviewTab('frames')}
                    >
                      <Grid3X3 className="mr-1 md:mr-2" size={16} /> Từng ảnh
                    </button>
                    <button
                      className={`px-4 py-1.5 text-sm font-bold flex items-center transition-all rounded-lg hover:shadow-md active:scale-95 ${previewTab === 'animation' ? 'bg-primary-600 text-white shadow-md' : 'text-zinc-400 dark:text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-800/30'}`}
                      onClick={() => setPreviewTab('animation')}
                    >
                      <Film className="mr-1 md:mr-2" size={16} /> Ảnh động
                    </button>
                  </div>
                )}
              </div>
              
              {frames.length > 0 && (
                <div className="relative" id="tour-export">
                  <button
                    onClick={() => setShowExportMenu(!showExportMenu)}
                    className="bg-primary-600 hover:bg-primary-500 text-white px-4 py-2.5 flex items-center text-sm font-bold rounded-xl shadow-lg shadow-primary-500/20 hover:shadow-primary-500/40 transition-all hover:-translate-y-0.5 active:scale-95 active:translate-y-0"
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
// Frame Tab Controls
<div className="flex flex-col h-full">
  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-5 bg-white dark:bg-zinc-950 p-2 rounded-xl border border-zinc-200 dark:border-zinc-800/80 shadow-inner gap-4 overflow-hidden">
    <div className="flex gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
      <button
        onClick={selectAllFrames}
        className="whitespace-nowrap text-[10px] sm:text-xs font-bold bg-zinc-100 dark:bg-zinc-800 hover:bg-primary-500 hover:text-white text-zinc-900 dark:text-white px-3 py-1.5 rounded-lg transition-all shadow-sm active:scale-95"
      >
        Chọn tất cả
      </button>
      <button
        onClick={deselectAllFrames}
        className="whitespace-nowrap text-[10px] sm:text-xs font-bold bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-900 dark:text-white px-3 py-1.5 rounded-lg transition-all shadow-sm active:scale-95"
        title="Phím tắt: Esc"
      >
        Bỏ chọn
      </button>
      <div className="w-px h-6 bg-zinc-300 dark:bg-zinc-700 shrink-0 mx-1"></div>
      <button
        onClick={() => flipFrames('horizontal')}
        className="shrink-0 text-xs font-medium bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-900 dark:text-white px-2.5 py-1.5 rounded-lg transition-colors shadow-sm flex items-center"
        title="Lật ngang"
      >
        <FlipHorizontal size={14} />
      </button>
      <button
        onClick={() => flipFrames('vertical')}
        className="shrink-0 text-xs font-medium bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-900 dark:text-white px-2.5 py-1.5 rounded-lg transition-colors shadow-sm flex items-center"
        title="Lật dọc"
      >
        <FlipVertical size={14} />
      </button>
    </div>
    <div className="flex gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0 scrollbar-none justify-end">
      {selectedFrames.size > 0 && (
        <>
          <button
            onClick={() => {
              setTempName('');
              setIsBulkRenaming(true);
            }}
            className="whitespace-nowrap text-[10px] sm:text-xs font-bold bg-primary-50 dark:bg-primary-900/20 hover:bg-primary-600 hover:text-white text-primary-600 dark:text-primary-400 px-3 py-1.5 rounded-lg flex items-center transition-all shadow-sm active:scale-95"
          >
            <Edit2 size={12} className="mr-1.5" /> Đổi tên ({selectedFrames.size})
          </button>
          <button
            onClick={handleDeleteSelected}
            className="whitespace-nowrap text-[10px] sm:text-xs font-bold bg-red-50 dark:bg-red-900/10 hover:bg-red-500 hover:text-white text-red-500 px-3 py-1.5 rounded-lg flex items-center transition-all shadow-sm active:scale-95"
          >
            <Trash2 size={12} className="mr-1.5" /> Xóa ({selectedFrames.size})
          </button>
        </>
      )}
      <button
        onClick={() => {
          if (frames.length === 0) return;
          setShowDeleteAllConfirm(true);
        }}
        className="whitespace-nowrap text-[10px] sm:text-xs font-bold bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-lg flex items-center transition-all shadow-sm active:scale-95"
      >
        <Trash2 size={12} className="mr-1.5" /> Xóa hết
      </button>
    </div>
  </div>
                  <FrameGrid 
                    paginatedFrames={paginatedFrames}
                    selectedFrames={selectedFrames}
                    toggleFrameSelection={toggleFrameSelection}
                    handleDeleteFrame={handleRemoveFrame}
                    setPreviewFrame={setPreviewFrame}
                    handleCropFrame={handleCropFrame}
                    renamingFrameId={renamingFrameId}
                    startRenaming={startRenaming}
                    tempName={tempName}
                    setTempName={setTempName}
                    saveRename={saveRename}
                    setRenamingFrameId={setRenamingFrameId}
                  />

                  {searchQuery && filteredFrames.length === 0 && (
                    <div className="col-span-full py-12 text-center">
                      <Search className="mx-auto text-zinc-300 dark:text-zinc-700 mb-3" size={48} />
                      <p className="text-zinc-500">Không tìm thấy frame nào khớp với "{searchQuery}"</p>
                    </div>
                  )}


                  {totalPages > 1 && (
                    <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 py-4 border-t border-zinc-200 dark:border-zinc-800/50">
                      <div className="flex flex-col sm:flex-row items-center gap-4">
                        <div className="text-xs font-bold text-zinc-500 uppercase tracking-widest">
                          Hiển thị <span className="text-primary-500">{((currentPage - 1) * itemsPerPage) + 1}</span> - <span className="text-primary-500">{Math.min(currentPage * itemsPerPage, filteredFrames.length)}</span> trên <span className="text-primary-500">{filteredFrames.length}</span> frame
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-tighter">Mỗi trang:</span>
                          <select 
                            value={itemsPerPage}
                            onChange={(e) => setItemsPerPage(parseInt(e.target.value))}
                            className="bg-zinc-100 dark:bg-zinc-800 border-none rounded px-2 py-1 text-[10px] font-bold text-zinc-600 dark:text-zinc-400 focus:ring-1 focus:ring-primary-500 outline-none"
                          >
                            {[20, 40, 60, 80, 100].map(val => (
                              <option key={val} value={val}>{val}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                          disabled={currentPage === 1}
                          className="p-2 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-zinc-50 dark:hover:bg-zinc-800/30 transition-all active:scale-95"
                        >
                          <ChevronLeft size={18} />
                        </button>
                        
                        <div className="flex items-center gap-1.5">
                          {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => {
                            let pageNum: number;
                            if (totalPages <= 5) {
                              pageNum = i + 1;
                            } else if (currentPage <= 3) {
                              pageNum = i + 1;
                            } else if (currentPage >= totalPages - 2) {
                              pageNum = totalPages - 4 + i;
                            } else {
                              pageNum = currentPage - 2 + i;
                            }
                            
                            return (
                              <button
                                key={pageNum}
                                onClick={() => setCurrentPage(pageNum)}
                                className={`w-9 h-9 flex items-center justify-center rounded-lg text-xs font-bold transition-all shadow-sm ${currentPage === pageNum ? 'bg-primary-600 text-white shadow-primary-500/30' : 'bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800/30'}`}
                              >
                                {pageNum}
                              </button>
                            );
                          })}
                        </div>

                        <button
                          onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                          disabled={currentPage === totalPages}
                          className="p-2 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-zinc-50 dark:hover:bg-zinc-800/30 transition-all active:scale-95"
                        >
                          <ChevronRight size={18} />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <AnimationPlayer 
                  frames={frames}
                  isPlaying={isPlaying}
                  setIsPlaying={setIsPlaying}
                  fps={fps}
                  setFps={setFps}
                  animZoom={animZoom}
                  setAnimZoom={setAnimZoom}
                  handleRemoveFrame={handleRemoveFrame}
                  flipFrames={flipFrames}
                  animTimelineView={animTimelineView}
                  setAnimTimelineView={setAnimTimelineView}
                />
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
            <div className="w-full flex justify-between items-center mb-5 border-b border-zinc-200 dark:border-zinc-800/50 pb-4" id="tour-crop-header">
              <h3 className="text-xl font-bold text-zinc-900 dark:text-white flex items-center">
                <CropIcon className="mr-2 text-primary-400" /> Cắt vùng ảnh 
                <button 
                  onClick={startCropTour}
                  className="ml-3 text-zinc-400 hover:text-primary-500 transition-colors"
                  title="Xem hướng dẫn cắt"
                >
                  <HelpCircle size={18} />
                </button>
              </h3>
              <button 
                onClick={() => setIsCropping(false)}
                className="text-zinc-400 dark:text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:bg-zinc-800/50 transition-colors rounded-lg p-1"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="flex-1 overflow-auto bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl flex items-center justify-center p-4 checkerboard min-h-[300px]" id="tour-crop-selection">
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
                id="tour-crop-apply-btn"
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
                <button 
                  onClick={handleZoomToFitModal} 
                  className="px-3 py-1.5 hover:text-primary-400 border-r border-zinc-300 dark:border-zinc-700/50 mr-1 flex items-center gap-2 text-xs font-bold uppercase tracking-wider transition-colors" 
                  title="Vừa khung hình (Fit to screen)"
                >
                  <Maximize size={16}/> Fit
                </button>
                <button onClick={() => setModalZoom(z => Math.max(0.1, z - 0.5))} className="p-2 hover:text-primary-400 transition-colors" title="Thu nhỏ"><ZoomOut size={20}/></button>
                <span className="text-sm font-bold px-2 w-16 text-center">{Math.round(modalZoom * 100)}%</span>
                <button onClick={() => setModalZoom(z => Math.min(20, z + 0.5))} className="p-2 hover:text-primary-400 transition-colors" title="Phóng to"><ZoomIn size={20}/></button>
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
      
      {/* Bulk Rename Modal */}
      {isBulkRenaming && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 w-full max-w-md shadow-2xl border border-zinc-200 dark:border-zinc-800 animate-in zoom-in-95 duration-200">
            <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
              <Edit2 className="text-primary-500" size={20} /> Đổi tên hàng loạt
            </h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6">
              Nhập tên cơ sở cho {selectedFrames.size} frame đã chọn. Nếu chọn nhiều frame, hệ thống sẽ tự động thêm số thứ tự (ví dụ: name_1, name_2).
            </p>
            <input 
              autoFocus
              type="text" 
              placeholder="Nhập tên mới..."
              value={tempName}
              onChange={(e) => setTempName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && tempName.trim()) handleBulkRename(tempName.trim());
                if (e.key === 'Escape') setIsBulkRenaming(false);
              }}
              className="w-full bg-zinc-100 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl p-3 mb-6 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
            />
            <div className="flex gap-3">
              <button
                onClick={() => setIsBulkRenaming(false)}
                className="flex-1 px-4 py-2.5 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-900 dark:text-white font-semibold rounded-xl transition-all"
              >
                Hủy
              </button>
              <button
                disabled={!tempName.trim()}
                onClick={() => handleBulkRename(tempName.trim())}
                className="flex-1 px-4 py-2.5 bg-primary-600 hover:bg-primary-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl shadow-lg shadow-primary-500/20 transition-all"
              >
                Đổi tên
              </button>
            </div>
          </div>
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
