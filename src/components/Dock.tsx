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
  Monitor,
  Search
} from 'lucide-react';

// Application definitions for the dock
const dockApps = [
  {
    id: 'education',
    title: 'Education',
    icon: GraduationCap,
    color: 'from-blue-500 to-purple-600',
    shadowColor: 'shadow-blue-500/50',
    hoverColor: 'hover:shadow-blue-400/70'
  },
  {
    id: 'experience',
    title: 'Experience', 
    icon: Briefcase,
    color: 'from-green-500 to-emerald-600',
    shadowColor: 'shadow-green-500/50',
    hoverColor: 'hover:shadow-green-400/70'
  },
  {
    id: 'info',
    title: 'About Me',
    icon: User,
    color: 'from-orange-500 to-red-600',
    shadowColor: 'shadow-orange-500/50',
    hoverColor: 'hover:shadow-orange-400/70'
  },
  {
    id: 'projects',
    title: 'Projects',
    icon: FolderOpen,
    color: 'from-cyan-500 to-blue-600',
    shadowColor: 'shadow-cyan-500/50',
    hoverColor: 'hover:shadow-cyan-400/70'
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
  const [hoveredApp, setHoveredApp] = useState<string | null>(null);

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
    <>
      {/* Enhanced Windows-style taskbar */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, type: "spring", stiffness: 300, damping: 30 }}
        className={cn(
          "fixed bottom-0 left-0 right-0 z-[100000]",
          "bg-gradient-to-r from-gray-900/98 via-gray-800/98 to-gray-900/98",
          "backdrop-blur-2xl border-t border-gradient-to-r from-gray-600/30 via-gray-500/50 to-gray-600/30",
          "shadow-2xl shadow-black/50",
          isMobile ? "h-20 pb-2" : "h-18 pb-1"
        )}
      >
        {/* Subtle animated background */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-purple-600/5 to-cyan-600/5 animate-pulse" />
        
        <div className={cn(
          "relative flex items-center h-full",
          isMobile ? "px-4 py-2" : "px-6 py-2"
        )}>
          {/* Windows Start Button */}
          <motion.button
            whileHover={{ scale: 1.1, rotateY: 5 }}
            whileTap={{ scale: 0.95 }}
            onMouseEnter={() => setHoveredApp('start')}
            onMouseLeave={() => setHoveredApp(null)}
            className={cn(
              "relative flex items-center justify-center transition-all duration-300",
              "bg-gradient-to-br from-blue-600/40 to-blue-800/60 hover:from-blue-500/50 hover:to-blue-700/70",
              "border border-blue-400/40 hover:border-blue-300/60 rounded-lg",
              "shadow-lg shadow-blue-500/30 hover:shadow-blue-400/50 hover:shadow-xl",
              isMobile ? "w-14 h-14 mr-4" : "w-12 h-12 mr-5",
              "backdrop-blur-sm"
            )}
            aria-label="Start Menu"
          >
            {/* Enhanced Windows Logo */}
            <motion.div 
              className={cn(
                "grid grid-cols-2 gap-0.5",
                isMobile ? "w-7 h-7" : "w-6 h-6"
              )}
              whileHover={{ rotate: 5 }}
            >
              <div className="bg-gradient-to-br from-blue-300 to-blue-400 rounded-sm shadow-sm" />
              <div className="bg-gradient-to-br from-blue-200 to-blue-300 rounded-sm shadow-sm" />
              <div className="bg-gradient-to-br from-blue-200 to-blue-300 rounded-sm shadow-sm" />
              <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-sm shadow-sm" />
            </motion.div>
            
            {/* Glow effect */}
            <div className="absolute inset-0 bg-blue-400/20 rounded-lg blur-md -z-10" />
          </motion.button>

          {/* Search Button */}
          <motion.button
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onMouseEnter={() => setHoveredApp('search')}
            onMouseLeave={() => setHoveredApp(null)}
            className={cn(
              "relative flex items-center justify-center transition-all duration-300",
              "hover:bg-gradient-to-br hover:from-white/15 hover:to-white/5",
              "border border-transparent hover:border-white/30 rounded-lg",
              "hover:shadow-lg hover:shadow-white/20",
              isMobile ? "w-14 h-14 mr-6" : "w-12 h-12 mr-8"
            )}
            aria-label="Search"
          >
            <Search className={cn(
              "text-white/70 hover:text-white transition-all duration-300",
              isMobile ? "w-7 h-7" : "w-6 h-6"
            )} />
          </motion.button>

          {/* ENHANCED Centered Application Icons */}
          <div className="flex-1 flex items-center justify-center">
            <div className={cn(
              "flex items-center",
              isMobile ? "space-x-4" : "space-x-6"
            )}>
              {/* Application Launchers with MAXIMUM ATTRACTION */}
              {dockApps.map((app, index) => {
                const IconComponent = app.icon;
                const isOpen = windows.some(w => w.id === app.id && w.open);
                const isMinimized = windows.some(w => w.id === app.id && w.open && w.minimized);
                const isHovered = hoveredApp === app.id;
                
                return (
                  <motion.div 
                    key={app.id} 
                    className="relative"
                    initial={{ opacity: 0, y: 50, scale: 0.5 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ 
                      delay: 0.5 + index * 0.1, 
                      type: "spring", 
                      stiffness: 400, 
                      damping: 25 
                    }}
                  >
                    {/* Floating animation for extra attention */}
                    <motion.button
                      animate={{
                        y: isHovered ? -8 : [-2, 2, -2],
                        rotateY: isHovered ? 10 : 0,
                        scale: isHovered ? 1.2 : 1
                      }}
                      transition={{
                        y: isHovered ? { duration: 0.3 } : { 
                          duration: 3, 
                          repeat: Infinity, 
                          ease: "easeInOut" 
                        },
                        rotateY: { duration: 0.3 },
                        scale: { duration: 0.3, type: "spring", stiffness: 400 }
                      }}
                      whileTap={{ scale: 0.9, rotateY: -5 }}
                      onMouseEnter={() => setHoveredApp(app.id)}
                      onMouseLeave={() => setHoveredApp(null)}
                      onClick={() => {
                        console.log('Dock icon clicked:', app.id);
                        const existingWindow = windows.find(w => w.id === app.id && w.open);
                        if (existingWindow) {
                          if (existingWindow.minimized) {
                            focusWindow(existingWindow.id);
                          } else {
                            minimizeWindow(existingWindow.id);
                          }
                        } else {
                          onAppLaunch(app.id);
                        }
                      }}
                      className={cn(
                        "relative flex items-center justify-center transition-all duration-300",
                        "rounded-2xl border-2 backdrop-blur-sm",
                        isMobile ? "w-16 h-16 p-3" : "w-16 h-16 p-3",
                        // Dynamic gradient backgrounds
                        !isOpen && `bg-gradient-to-br ${app.color} hover:scale-110`,
                        !isOpen && `border-white/20 hover:border-white/40`,
                        !isOpen && `${app.shadowColor} hover:${app.hoverColor} shadow-xl hover:shadow-2xl`,
                        // Active states
                        isOpen && !isMinimized && "bg-gradient-to-br from-blue-500/60 to-purple-600/60 border-blue-300/60 shadow-2xl shadow-blue-400/60",
                        isMinimized && "bg-gradient-to-br from-orange-500/60 to-red-600/60 border-orange-300/60 shadow-2xl shadow-orange-400/60"
                      )}
                      style={{
                        transformStyle: 'preserve-3d'
                      }}
                    >
                      {/* Icon with enhanced styling */}
                      <IconComponent className={cn(
                        "transition-all duration-300 drop-shadow-lg",
                        isMobile ? "w-8 h-8" : "w-8 h-8",
                        isOpen && !isMinimized && "text-blue-100",
                        isMinimized && "text-orange-100",
                        !isOpen && "text-white filter drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]"
                      )} />
                      
                      {/* Pulsing glow effect */}
                      <motion.div
                        className={cn(
                          "absolute inset-0 rounded-2xl blur-lg -z-10",
                          `bg-gradient-to-br ${app.color}`
                        )}
                        animate={{
                          opacity: isHovered ? [0.3, 0.6, 0.3] : [0.1, 0.3, 0.1],
                          scale: isHovered ? [1, 1.1, 1] : [0.9, 1, 0.9]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                      
                      {/* Active indicator with enhanced styling */}
                      {isOpen && (
                        <motion.div 
                          initial={{ scaleX: 0, opacity: 0 }}
                          animate={{ scaleX: 1, opacity: 1 }}
                          exit={{ scaleX: 0, opacity: 0 }}
                          className={cn(
                            "absolute -bottom-3 left-1/2 transform -translate-x-1/2 h-1 rounded-full",
                            "shadow-lg backdrop-blur-sm",
                            isMinimized 
                              ? "w-10 bg-gradient-to-r from-orange-400 to-red-400 shadow-orange-400/70" 
                              : "w-10 bg-gradient-to-r from-blue-400 to-purple-400 shadow-blue-400/70"
                          )}
                        />
                      )}
                      
                      {/* Sparkle effect on hover */}
                      {isHovered && (
                        <motion.div
                          className="absolute inset-0 pointer-events-none"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                        >
                          {[...Array(6)].map((_, i) => (
                            <motion.div
                              key={i}
                              className="absolute w-1 h-1 bg-white rounded-full"
                              style={{
                                left: `${20 + i * 10}%`,
                                top: `${15 + (i % 2) * 70}%`
                              }}
                              animate={{
                                opacity: [0, 1, 0],
                                scale: [0, 1, 0],
                                rotate: [0, 180, 360]
                              }}
                              transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                delay: i * 0.2
                              }}
                            />
                          ))}
                        </motion.div>
                      )}
                    </motion.button>
                    
                    {/* Enhanced tooltip */}
                    <AnimatePresence>
                      {isHovered && (
                        <motion.div
                          initial={{ opacity: 0, y: 20, scale: 0.8 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 20, scale: 0.8 }}
                          transition={{ duration: 0.2, type: "spring" }}
                          className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-6 z-50"
                        >
                          <div className={cn(
                            "px-3 py-2 rounded-lg border backdrop-blur-sm shadow-2xl",
                            "bg-gradient-to-br from-gray-800/95 to-gray-900/95",
                            "border-white/20 text-white text-sm font-medium",
                            "whitespace-nowrap"
                          )}>
                            {app.title}
                            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800/95" />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}

              {/* Enhanced separator */}
              {openWindows.some(w => !dockApps.some(app => w.id.includes(app.id))) && (
                <motion.div 
                  className="w-px h-12 bg-gradient-to-b from-transparent via-white/30 to-transparent mx-4"
                  animate={{ opacity: [0.3, 0.7, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}

              {/* Enhanced Additional Open Windows */}
              <AnimatePresence>
                {openWindows
                  .filter(w => !dockApps.some(app => w.id.includes(app.id)))
                  .map((window, index) => {
                    const IconComponent = getWindowIcon(window.id, window.title);
                    const isHovered = hoveredApp === `open-${window.id}`;
                    
                    return (
                      <motion.div 
                        key={`open-${window.id}`} 
                        className="relative"
                        initial={{ scale: 0, opacity: 0, rotateY: 90 }}
                        animate={{ scale: 1, opacity: 1, rotateY: 0 }}
                        exit={{ scale: 0, opacity: 0, rotateY: -90 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                      >
                        <motion.button
                          whileHover={{ scale: 1.15, y: -6, rotateY: 8 }}
                          whileTap={{ scale: 0.9 }}
                          onMouseEnter={() => setHoveredApp(`open-${window.id}`)}
                          onMouseLeave={() => setHoveredApp(null)}
                          onClick={() => focusWindow(window.id)}
                          className={cn(
                            "relative flex items-center justify-center transition-all duration-300",
                            "bg-gradient-to-br from-blue-500/60 to-purple-600/60 hover:from-blue-400/70 hover:to-purple-500/70",
                            "border-2 border-blue-300/60 hover:border-blue-200/80 rounded-2xl",
                            "shadow-xl shadow-blue-400/50 hover:shadow-2xl hover:shadow-blue-300/70",
                            "backdrop-blur-sm",
                            isMobile ? "w-14 h-14 p-2.5" : "w-14 h-14 p-2.5"
                          )}
                        >
                          <IconComponent className={cn(
                            "text-blue-100 drop-shadow-lg",
                            isMobile ? "w-7 h-7" : "w-7 h-7"
                          )} />
                          
                          {/* Enhanced active indicator */}
                          <motion.div 
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full shadow-lg shadow-blue-400/70"
                          />
                          
                          {/* Glow effect */}
                          <div className="absolute inset-0 bg-blue-400/30 rounded-2xl blur-lg -z-10" />
                        </motion.button>
                      </motion.div>
                    );
                  })
                }
              </AnimatePresence>
            </div>
          </div>

          {/* Right side spacer */}
          <div className={cn(
            isMobile ? "w-16" : "w-24"
          )} />
        </div>
      </motion.div>
    </>
  );
}