'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Desktop } from '@/components/Desktop';
import { Window } from '@/components/Window';
import { Dock } from '@/components/Dock';
import { ProjectsFolder } from '@/components/ProjectsFolder';
import { ProjectViewer } from '@/components/ProjectViewer';
import { MarkdownRenderer } from '@/components/MarkdownRenderer';
import { useWindowStore } from '@/store/useWindowStore';
import { getProjects } from '@/lib/projects';
import type { Project, WindowState } from '@/lib/types';
import { Clock } from '@/components/Clock';
import BootSequence from '@/components/BootSequence';
import LockScreen from '@/components/LockScreen';
import { FakeCursor } from '@/components/FakeCursor';

// Sample content for static windows
const educationContent = `# Education

## Master of Science in Computer Science
**University of Technology** | 2020 - 2022
- Specialization in Computer Graphics and Virtual Reality
- Thesis: "Real-time Ray Tracing in WebGL Applications"
- GPA: 3.8/4.0

### Relevant Coursework
- Advanced Computer Graphics
- Virtual and Augmented Reality
- Machine Learning
- Distributed Systems
- Human-Computer Interaction`;

const experienceContent = `# Professional Experience

## Senior XR Developer
**TechVision Studios** | Jan 2023 - Present

- Lead development of immersive VR/AR experiences for enterprise clients
- Architected and implemented WebXR applications using Three.js and A-Frame
- Collaborated with design teams to create intuitive 3D user interfaces
- Mentored junior developers and conducted code reviews
- **Technologies**: Unity, Unreal Engine, WebXR, Three.js, C#, JavaScript`;

const infoContent = `# About Me

Hello! I'm a passionate XR Developer and Computer Graphics enthusiast with a love for creating immersive digital experiences. I specialize in building cutting-edge applications that bridge the gap between the physical and digital worlds.

## What I Do

I focus on developing:
- **Virtual Reality (VR)** applications for training, education, and entertainment
- **Augmented Reality (AR)** experiences for mobile and web platforms
- **WebXR** applications that run seamlessly across devices
- **Interactive 3D** web experiences using modern web technologies`;

export default function HomePage() {
  const { windows, openWindow, closeWindow, minimizeWindow, maximizeWindow, focusWindow, updateWindow } = useWindowStore();
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isBooting, setIsBooting] = useState(true);
  const [showLockScreen, setShowLockScreen] = useState(false);
  const [showDesktop, setShowDesktop] = useState(false);
  const [showFakeCursor, setShowFakeCursor] = useState(false);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const response = await fetch('/api/projects');
        if (!response.ok) {
          throw new Error('Failed to fetch projects');
        }
        const projectData = await response.json();
        setProjects(projectData);
      } catch (error) {
        console.error('Failed to load projects:', error);
        setProjects([]);
      } finally {
        setIsLoading(false);
      }
    };
  
    // Only load projects after login
    if (showDesktop) {
      loadProjects();
    }
  }, [showDesktop]);

  const handleBootComplete = () => {
    setIsBooting(false);
    setShowLockScreen(true);
  };

  const handleLogin = () => {
    setShowLockScreen(false);
    setShowDesktop(true);
  };

  const handleIconDoubleClick = (iconId: string) => {
    const centerX = Math.max(50, (window.innerWidth - 900) / 2);
    const centerY = Math.max(50, (window.innerHeight - 500) / 2);
    const windowCount = windows.filter(w => w.open).length;
    const offsetX = windowCount * 50;
    const verticalVariations = [-60, -30, 0, 30, 60];
    const offsetY = verticalVariations[windowCount % verticalVariations.length];
  
    switch (iconId) {
      case 'education':
        openWindow({
          id: 'education',
          title: 'Education',
          content: 'education',
          open: true,
          minimized: false,
          maximized: false,
          x: centerX + offsetX,
          y: centerY + offsetY,
          width: 900,
          height: 500,
        });
        break;
      case 'experience':
        openWindow({
          id: 'experience',
          title: 'Experience',
          content: 'experience',
          open: true,
          minimized: false,
          maximized: false,
          x: centerX + offsetX,
          y: centerY + offsetY,
          width: 900,
          height: 500,
        });
        break;
      case 'info':
        openWindow({
          id: 'info',
          title: 'About Me',
          content: 'info',
          open: true,
          minimized: false,
          maximized: false,
          x: centerX + offsetX,
          y: centerY + offsetY,
          width: 900,
          height: 500,
        });
        break;
      case 'projects':
        openWindow({
          id: 'projects',
          title: 'Projects',
          content: 'projects',
          open: true,
          minimized: false,
          maximized: false,
          x: (window.innerWidth - 800) / 2,  // Center horizontally (800 is the width)
          y: (window.innerHeight - 800) / 2, // Center vertically (800 is the height)
          width: 800,
          height: 800,
        });
        break;
    }
  };

  const handleProjectOpen = (project: Project) => {
    const centerX = window.innerWidth / 2 - 500;  // Updated to match new width
    const centerY = window.innerHeight / 2 - 300; // Updated to match new height
  
    const windowCount = windows.filter(w => w.open).length;
    const offsetX = windowCount * 50;
    const verticalVariations = [-60, -30, 0, 30, 60];
    const offsetY = verticalVariations[windowCount % verticalVariations.length];
  
    const windowId = `project-${project.slug}`;
    
    openWindow({
      id: windowId,
      title: project.title,
      content: 'project',
      open: true,
      minimized: false,
      maximized: false,
      x: centerX + offsetX,
      y: centerY +  4*offsetY,
      width: 800,  // Increased from 800
      height: 800,  // Increased from 450
      data: project,
    });
    
    focusWindow(windowId);
  };

  const renderWindowContent = (window: WindowState) => {
    switch (window.content) {
      case 'education':
        return (
          <div className="h-full">
            <MarkdownRenderer content={educationContent} />
          </div>
        );
      case 'experience':
        return (
          <div className="h-full overflow-auto">
            <MarkdownRenderer content={experienceContent} />
          </div>
        );
      case 'info':
        return (
          <div className="h-full overflow-auto">
            <MarkdownRenderer content={infoContent} />
          </div>
        );
      case 'projects':
        return (
          <ProjectsFolder
            projects={projects}
            onProjectOpen={handleProjectOpen}
            isLoading={isLoading}
          />
        );
      case 'project':
        return window.data ? (
          <ProjectViewer project={window.data} />
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-muted-foreground">Project data not found</p>
          </div>
        );
      default:
        return (
          <div className="flex items-center justify-center h-full">
            <p className="text-white">Content not found for: {typeof window.content === 'string' ? window.content : 'unknown'}</p>
          </div>
        );
    }
  };

  // Show fake cursor after desktop is fully loaded
  useEffect(() => {
    if (showDesktop && !isLoading) {
      const timer = setTimeout(() => {
        setShowFakeCursor(true);
      }, 1000); // Wait 1 second after desktop loads
      
      return () => clearTimeout(timer);
    }
  }, [showDesktop, isLoading]);

  const handleFakeCursorProjectsClick = () => {
    handleIconDoubleClick('projects');
  };

  const handleFakeCursorComplete = () => {
    setShowFakeCursor(false);
  };

  return (
    <main className="h-screen w-screen overflow-hidden bg-black">
      <AnimatePresence mode="wait">
        {isBooting && (
          <BootSequence key="boot" onComplete={handleBootComplete} />
        )}
        
        {!isBooting && showLockScreen && (
          <LockScreen key="lock" onLogin={handleLogin} />
        )}
        
        {!isBooting && !showLockScreen && showDesktop && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="relative w-full h-full"
          >
            <Desktop onIconDoubleClick={handleIconDoubleClick} />
            
            {/* Windows */}
            <AnimatePresence>
              {windows
                .filter(window => window.open)
                .map((window) => {
                  const content = renderWindowContent(window);
                  return (
                    <div key={window.id} className="relative w-full h-full">
                      <Window
                        key={window.id}
                        id={window.id}
                        title={window.title}
                        position={{ x: window.x, y: window.y }}
                        size={{ width: window.width, height: window.height }}
                        isMinimized={window.minimized}
                        isMaximized={window.maximized}
                        zIndex={window.zIndex}
                        onClose={() => closeWindow(window.id)}
                        onMinimize={() => minimizeWindow(window.id)}
                        onMaximize={() => maximizeWindow(window.id)}
                        onFocus={() => focusWindow(window.id)}
                        onPositionChange={(position) => updateWindow(window.id, { x: position.x, y: position.y })}
                        onSizeChange={(size) => updateWindow(window.id, { width: size.width, height: size.height })}
                      >
                        {content}
                      </Window>
                    </div>
                  );
                })}
            </AnimatePresence>
            
            {/* Clock */}
            <Clock />
        
            {/* Dock */}
            <Dock onAppLaunch={handleIconDoubleClick} />
            
            {/* Fake Cursor Animation */}
            {showFakeCursor && (
              <FakeCursor 
                onComplete={handleFakeCursorComplete}
                onProjectsClick={handleFakeCursorProjectsClick}
              />
            )}
        
            {/* Loading Overlay for Projects */}
            <AnimatePresence>
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[9999]"
                >
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    className="bg-white/10 backdrop-blur-md rounded-lg p-8 flex flex-col items-center space-y-4"
                  >
                    <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <p className="text-white text-sm">Loading portfolio...</p>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}