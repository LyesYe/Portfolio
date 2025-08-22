'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Rnd } from 'react-rnd';
import { X, Minus, Square, Maximize2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface WindowProps {
  id: string;
  title: string;
  children: React.ReactNode;
  position: { x: number; y: number };
  size: { width: number; height: number };
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onFocus: () => void;
  onPositionChange?: (position: { x: number; y: number }) => void;
  onSizeChange?: (size: { width: number; height: number }) => void;
}

export function Window({
  id,
  title,
  children,
  position,
  size,
  isMinimized,
  isMaximized,
  zIndex,
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
  onPositionChange,
  onSizeChange,
}: WindowProps) {
  console.log('Window component rendering:', { id, title, position, size, isMinimized, zIndex });
  console.log('isMinimized value:', isMinimized, 'type:', typeof isMinimized);
  const [isMobile, setIsMobile] = useState(false);
  const windowRef = useRef<Rnd>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Mobile: full screen windows
  if (isMobile) {
    return (
      <AnimatePresence>
        {!isMinimized && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 z-50 mobile-safe-area"
            style={{ zIndex }}
            onClick={onFocus}
          >
            <div className="flex flex-col h-full bg-slate-900/95 backdrop-blur-lg">
              {/* Mobile Header */}
              <div className="flex items-center justify-between p-4 border-b border-white/10">
                <h3 className="text-white font-medium truncate flex-1 mr-4">
                  {title}
                </h3>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={onMinimize}
                    className="touch-target flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                    aria-label="Minimize"
                  >
                    <Minus className="w-4 h-4 text-white" />
                  </button>
                  <button
                    onClick={onClose}
                    className="touch-target flex items-center justify-center w-10 h-10 rounded-full bg-red-500/20 hover:bg-red-500/30 transition-colors"
                    aria-label="Close"
                  >
                    <X className="w-4 h-4 text-white" />
                  </button>
                </div>
              </div>
              
              {/* Mobile Content */}
              <div className="flex-1 overflow-hidden">
                <div className="h-full custom-scrollbar overflow-auto p-4">
                  {children}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }

  // Desktop: resizable windows
  return (
    <AnimatePresence>
      {!isMinimized && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          style={{ zIndex: zIndex }}
          className="fixed top-0 left-0"
        >
          <Rnd
            ref={windowRef}
            size={isMaximized ? { width: window.innerWidth, height: window.innerHeight } : size}
            position={isMaximized ? { x: 0, y: 0 } : position}
            bounds="window"
            onDragStop={(e, d) => {
              if (!isMaximized && onPositionChange) {
                onPositionChange({ x: d.x, y: d.y });
              }
            }}
            onResizeStop={(e, direction, ref, delta, position) => {
              if (!isMaximized) {
                if (onSizeChange) {
                  onSizeChange({
                    width: parseInt(ref.style.width),
                    height: parseInt(ref.style.height)
                  });
                }
                if (onPositionChange) {
                  onPositionChange({ x: position.x, y: position.y });
                }
              }
            }}
            minWidth={320}
            minHeight={200}
            dragHandleClassName="window-drag-handle"
            enableResizing={!isMaximized}
            disableDragging={isMaximized}
            onClick={onFocus}
            key={isMaximized ? 'maximized' : 'normal'}
            className={cn(
              "window-shadow rounded-lg overflow-hidden",
              "bg-white/10 backdrop-blur-lg border border-white/20"
            )}
          >
            {/* Window Header */}
            <div className="window-drag-handle flex items-center justify-between p-3 border-b border-white/10 bg-white/5">
              <h3 className="text-white font-medium truncate flex-1 mr-4 text-responsive">
                {title}
              </h3>
              <div className="flex items-center space-x-1">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onMinimize();
                  }}
                  className="flex items-center justify-center w-6 h-6 rounded hover:bg-white/20 transition-colors focus-ring"
                  aria-label="Minimize"
                >
                  <Minus className="w-3 h-3 text-white" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onMaximize();
                  }}
                  className="flex items-center justify-center w-6 h-6 rounded hover:bg-white/20 transition-colors focus-ring"
                  aria-label={isMaximized ? 'Restore' : 'Maximize'}
                >
                  {isMaximized ? (
                    <Square className="w-3 h-3 text-white" />
                  ) : (
                    <Maximize2 className="w-3 h-3 text-white" />
                  )}
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onClose();
                  }}
                  className="flex items-center justify-center w-6 h-6 rounded hover:bg-red-500/30 transition-colors focus-ring"
                  aria-label="Close"
                >
                  <X className="w-3 h-3 text-white" />
                </button>
              </div>
            </div>
            
            {/* Window Content */}
            <div className="h-full overflow-hidden" style={{ height: 'calc(100% - 49px)' }}>
              <div className="h-full custom-scrollbar overflow-auto p-4">
                {children}
              </div>
            </div>
          </Rnd>
        </motion.div>
      )}
    </AnimatePresence>
  );
}