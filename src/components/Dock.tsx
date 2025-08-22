'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWindowStore } from '@/store/useWindowStore';
import { cn } from '@/lib/utils';
import { 
  GraduationCap, 
  Briefcase, 
  User, 
  FolderOpen, 
  FileText,
  Monitor
} from 'lucide-react';

// Application definitions for the dock
const dockApps = [
  {
    id: 'education',
    title: 'Education',
    icon: GraduationCap,
  },
  {
    id: 'experience',
    title: 'Experience',
    icon: Briefcase,
  },
  {
    id: 'info',
    title: 'About Me',
    icon: User,
  },
  {
    id: 'projects',
    title: 'Projects',
    icon: FolderOpen,
  },
];

// Icon mapping for different window types
const getWindowIcon = (windowId: string, title: string) => {
  if (windowId.includes('education')) return GraduationCap;
  if (windowId.includes('experience')) return Briefcase;
  if (windowId.includes('info')) return User;
  if (windowId.includes('projects')) return FolderOpen;
  if (windowId.includes('project-')) return FileText;
  return Monitor; // Default icon
};

interface DockProps {
  onAppLaunch: (appId: string) => void;
}

export function Dock({ onAppLaunch }: DockProps) {
  const { windows, focusWindow, minimizeWindow } = useWindowStore();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const openWindows = windows.filter(w => w.open && !w.minimized);
  const minimizedWindows = windows.filter(w => w.open && w.minimized);

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3, type: "spring", stiffness: 300, damping: 30 }}
      className={cn(
        "fixed bottom-4 left-0 right-0 mx-auto w-fit z-[100000]",
        "glass rounded-2xl p-3",
        "border border-white/20 shadow-2xl backdrop-blur-xl",
        isMobile ? "w-[calc(100%-2rem)]" : "min-w-fit"
      )}
    >
      <div className="flex items-center justify-center space-x-3">
        {/* Application Launchers */}
        {dockApps.map((app) => {
          const IconComponent = app.icon;
          const isOpen = windows.some(w => w.id === app.id && w.open);
          const isMinimized = windows.some(w => w.id === app.id && w.open && w.minimized);
          
          return (
            <motion.button
              key={app.id}
              whileHover={{ 
                scale: isOpen && !isMinimized ? 1.2 : 1.2, 
                y: isOpen && !isMinimized ? -8 : -8 
              }}
              whileTap={{ scale: 0.9 }}
              animate={{
                scale: isOpen && !isMinimized ? 1.1 : (isMinimized ? 1.05 : 1),
                y: isOpen && !isMinimized ? -2 : (isMinimized ? -1 : 0)
              }}
              transition={{ duration: 0.2 }}
              onClick={() => {
                console.log('Dock icon clicked:', app.id);
                const existingWindow = windows.find(w => w.id === app.id && w.open);
                console.log('Existing window found:', existingWindow);
                if (existingWindow) {
                  if (existingWindow.minimized) {
                    // If window is minimized, restore and focus it
                    console.log('Restoring minimized window');
                    focusWindow(existingWindow.id);
                  } else {
                    // If window is open and focused, minimize it
                    console.log('Minimizing open window');
                    minimizeWindow(existingWindow.id);
                  }
                } else {
                  console.log('Calling onAppLaunch with:', app.id);
                  onAppLaunch(app.id);
                }
              }}
              className={cn(
                "relative p-3 rounded-xl transition-all duration-200",
                "bg-white/10 hover:bg-white/20",
                "border border-white/20 hover:border-white/30",
                "shadow-lg hover:shadow-xl",
                "focus-ring",
                isMobile && "p-2",
                // Enhanced styling for open windows
                isOpen && !isMinimized && "bg-white/20 border-white/30 shadow-xl",
                isMinimized && "bg-white/15 border-white/25 shadow-lg"
              )}
              aria-label={`Launch ${app.title}`}
              title={app.title}
            >
              <IconComponent className={cn(
                "text-white/90 transition-colors duration-200",
                isMobile ? "w-5 h-5" : "w-6 h-6",
                isOpen && !isMinimized && "text-blue-200",
                isMinimized && "text-amber-200"
              )} />
              
              {/* Modern status indicator bar */}
              {isOpen && (
                <motion.div 
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{ scaleX: 1, opacity: 1 }}
                  exit={{ scaleX: 0, opacity: 0 }}
                  className={cn(
                    "absolute bottom-2 left-1/2 transform -translate-x-1/2 h-1 rounded-full transition-all duration-200",
                    isMinimized 
                      ? "w-3 bg-gradient-to-r from-amber-400 to-orange-400 shadow-lg shadow-amber-400/50" 
                      : "w-3 bg-gradient-to-r from-blue-400 to-cyan-400 shadow-lg shadow-blue-400/50"
                  )}
                />
              )}
              
              {/* Subtle glow effect for active windows */}
              {isOpen && !isMinimized && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 rounded-xl bg-blue-400/10 blur-sm -z-10"
                />
              )}
            </motion.button>
          );
        })}

        {/* Separator for additional open windows */}
        {openWindows.some(w => !dockApps.some(app => w.id.includes(app.id))) && (
          <div className="w-px h-8 bg-white/20" />
        )}

        {/* Additional Open Windows (like project windows) */}
        <AnimatePresence>
          {openWindows
            .filter(w => !dockApps.some(app => w.id.includes(app.id)))
            .map((window) => {
              const IconComponent = getWindowIcon(window.id, window.title);
              return (
                <motion.button
                  key={`open-${window.id}`}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1.1, opacity: 1, y: -2 }}
                  exit={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 1.2, y: -8 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => focusWindow(window.id)}
                  className={cn(
                    "relative p-2 rounded-xl transition-all duration-200",
                    "bg-white/20 hover:bg-white/25",
                    "border border-white/30 hover:border-white/40",
                    "shadow-xl hover:shadow-2xl",
                    "focus-ring"
                  )}
                  aria-label={`Focus ${window.title}`}
                  title={window.title}
                >
                  <IconComponent className="w-5 h-5 text-blue-200" />
                  
                  {/* Active indicator bar for project windows */}
                  <motion.div 
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-4 h-1 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full shadow-lg shadow-blue-400/50"
                  />
                  
                  {/* Glow effect */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 rounded-xl bg-blue-400/10 blur-sm -z-10"
                  />
                </motion.button>
              );
            })
          }
        </AnimatePresence>
      </div>
    </motion.div>
  );
}