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

  // Calculate dock height - mobile: 64px (h-16), desktop: 56px (h-14)
  const dockHeight = isMobile ? 64 : 56;

  // Mobile: full screen windows
  if (isMobile) {
    return (
      <AnimatePresence>
        {!isMinimized && (
          <motion.div
            initial={{ opacity: 1, scale: 1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0 }}
            className="fixed inset-0 z-50 mobile-safe-area"
            style={{ 
              zIndex,
              bottom: dockHeight // Leave space for dock
            }}
            onClick={onFocus}
          >
            <div className="flex flex-col h-full bg-gray-900/95 backdrop-blur-xl border border-gray-700/50">
              {/* Mobile Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-700/30 bg-gray-800/80">
                <h3 className="text-gray-100 font-medium truncate flex-1 mr-4">
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
              <div className="flex-1 overflow-hidden bg-gray-900/50">
                <div className="h-full custom-scrollbar overflow-auto p-4 text-gray-100">
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
          initial={{ opacity: 1, scale: 1, y: 0 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0 }}
          style={{ 
            zIndex: Math.min(zIndex, 99999),
            willChange: 'transform' // Optimize for animations
          }}
          className="fixed top-0 left-0"
        >
          <Rnd
            ref={windowRef}
            size={isMaximized ? { 
              width: window.innerWidth, 
              height: window.innerHeight - dockHeight 
            } : size}
            position={isMaximized ? { x: 0, y: 0 } : position}
            bounds={isMaximized ? "window" : "window"}
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
              "bg-gray-900/90 border border-gray-700/50",
              "transform-gpu" // Use GPU acceleration for better performance
            )}
            style={{
              backdropFilter: 'blur(12px)', // Move backdrop blur to inline style for better performance
              WebkitBackdropFilter: 'blur(12px)'
            }}
          >
            {/* Window Header */}
            <div className="window-drag-handle flex items-center justify-between p-3 border-b border-gray-700/30 bg-gray-800/80">
              <h3 className="text-gray-100 font-medium truncate flex-1 mr-4 text-responsive">
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
            <div className="h-full overflow-hidden bg-gray-900/50" style={{ height: 'calc(100% - 49px)' }}>
              <div className="h-full custom-scrollbar overflow-auto p-4 text-gray-100">
                {children}
              </div>
            </div>
          </Rnd>
        </motion.div>
      )}
    </AnimatePresence>
  );
}