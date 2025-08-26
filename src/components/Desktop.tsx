'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Icon } from './Icon';
import { 
  FolderOpen, 
  FileText, 
  Image, 
  Music, 
  Video,
  Settings,
  Trash2,
  Monitor,
  Wifi,
  Battery
} from 'lucide-react';

interface DesktopProps {
  onIconDoubleClick: (iconId: string) => void;
}

const desktopIcons = [
  { id: 'projects', title: 'Projects', icon: 'FolderOpen', x: 50, y: 50 },
  { id: 'documents', title: 'Documents', icon: 'FileText', x: 50, y: 150 },
  { id: 'pictures', title: 'Pictures', icon: 'Image', x: 50, y: 250 },
  { id: 'music', title: 'Music', icon: 'Music', x: 50, y: 350 },
  { id: 'videos', title: 'Videos', icon: 'Video', x: 150, y: 50 },
  { id: 'settings', title: 'Settings', icon: 'Settings', x: 150, y: 150 },
  { id: 'trash', title: 'Recycle Bin', icon: 'Trash2', x: 150, y: 250 },
];

export function Desktop({ onIconDoubleClick }: DesktopProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isClient, setIsClient] = useState(false);

  // Generate static star data that won't change on re-renders
  const starData = useMemo(() => {
    return [...Array(80)].map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 70,
      size: Math.random() * 3 + 1,
      brightness: Math.random() * 0.7 + 0.3,
      twinkleSpeed: Math.random() * 4 + 2,
      delay: Math.random() * 5,
    }));
  }, []);

  // Generate static shooting star data
  const shootingStarData = useMemo(() => {
    return [...Array(3)].map((_, i) => ({
      id: i,
      left: Math.random() * 50,
      top: Math.random() * 30,
      delay: i * 15 + Math.random() * 10,
    }));
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    setIsClient(true);
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Desktop Wallpaper */}
      <div className="absolute inset-0">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-green-900/30 to-black" />
        
        {/* Mountain silhouette */}
        <div className="absolute bottom-0 left-0 right-0 h-1/3">
          <svg viewBox="0 0 1200 400" className="w-full h-full">
            <path 
              d="M0,400 L0,200 L200,100 L400,150 L600,80 L800,120 L1000,60 L1200,100 L1200,400 Z" 
              fill="rgba(0,0,0,0.3)"
            />
            <path 
              d="M0,400 L0,250 L150,180 L350,220 L550,160 L750,200 L950,140 L1200,180 L1200,400 Z" 
              fill="rgba(0,0,0,0.2)"
            />
          </svg>
        </div>
        
        {/* Stars */}
        <div className="absolute inset-0">
          {starData.map((star) => (
            <motion.div
              key={star.id}
              className="absolute rounded-full"
              style={{
                left: `${star.left}%`,
                top: `${star.top}%`,
                width: `${star.size}px`,
                height: `${star.size}px`,
                background: `radial-gradient(circle, rgba(255,255,255,${star.brightness}) 0%, rgba(200,220,255,${star.brightness * 0.8}) 50%, transparent 100%)`,
                boxShadow: `0 0 ${star.size * 2}px rgba(255,255,255,${star.brightness * 0.5})`,
              }}
              animate={{
                opacity: [0.2, 1, 0.2],
                scale: [0.8, 1.2, 0.8],
                filter: [
                  `brightness(${star.brightness})`,
                  `brightness(${star.brightness * 1.5})`,
                  `brightness(${star.brightness})`
                ]
              }}
              transition={{
                duration: star.twinkleSpeed,
                repeat: Infinity,
                delay: star.delay,
                ease: "easeInOut"
              }}
            />
          ))}
          
          {/* Shooting stars */}
          {shootingStarData.map((shootingStar) => (
            <motion.div
              key={`shooting-${shootingStar.id}`}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                left: `${shootingStar.left}%`,
                top: `${shootingStar.top}%`,
              }}
              animate={{
                x: [0, 200],
                y: [0, 100],
                opacity: [0, 1, 0],
                scale: [0, 1, 0]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: shootingStar.delay,
                ease: "easeOut"
              }}
            />
          ))}
        </div>
        
        {/* Clouds */}
        <div className="absolute inset-0 opacity-20">
          <motion.div
            className="absolute top-20 left-10 w-32 h-16 bg-white rounded-full blur-sm"
            animate={{ x: [0, 100, 0] }}
            transition={{ duration: 20, repeat: Infinity }}
          />
          <motion.div
            className="absolute top-40 right-20 w-24 h-12 bg-white rounded-full blur-sm"
            animate={{ x: [0, -80, 0] }}
            transition={{ duration: 25, repeat: Infinity, delay: 5 }}
          />
        </div>
      </div>

      {/* Desktop Icons - REMOVED */}
      {/* Commented out the desktop icons section
      {!isMobile && (
        <div className="absolute inset-0 pointer-events-none">
          {desktopIcons.map((iconData) => (
            <motion.div
              key={iconData.id}
              className="absolute pointer-events-auto"
              style={{ left: iconData.x, top: iconData.y }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + Math.random() * 0.5 }}
            >
              <Icon
                id={iconData.id}
                title={iconData.title}
                icon={iconData.icon}
                onDoubleClick={() => onIconDoubleClick(iconData.id)}
              />
            </motion.div>
          ))}
        </div>
      )}
      */}

      {/* Main content area with name and title */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        {/* Name */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent mb-4 drop-shadow-2xl">
            Lyes KHOUMERI
          </h1>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 1, delay: 1.5 }}
            className="h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto"
          />
        </motion.div>

        {/* Professional title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="text-center"
        >
          <h2 className="text-xl md:text-2xl lg:text-3xl font-light text-gray-300 mb-2 drop-shadow-lg">
            XR & Computer Graphics Developer
          </h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2 }}
            className="text-base md:text-lg text-gray-400 font-light tracking-wider drop-shadow-lg"
          >
            Creating Immersive Digital Experiences
          </motion.p>
        </motion.div>
      </div>

      {/* Desktop Grid (subtle) */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div 
          className="w-full h-full" 
          style={{
            backgroundImage: `
              linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px'
          }} 
        />
      </div>

      {/* Mobile Instructions */}
      {isMobile && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5 }}
          className="absolute bottom-20 left-4 right-4 z-10"
        >
          <div className="bg-black/30 backdrop-blur-sm rounded-lg p-4 text-center border border-white/20">
            <p className="text-gray-300 text-sm">
              Use the dock below to access applications
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
}