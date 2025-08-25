import { Project } from './types';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export async function getProjects(): Promise<Project[]> {
  const projectsDirectory = path.join(process.cwd(), 'src/content/projects');
  
  try {
    const filenames = fs.readdirSync(projectsDirectory);
    const projects = filenames
      .filter(name => name.endsWith('.mdx'))
      .map(name => {
        const filePath = path.join(projectsDirectory, name);
        const fileContents = fs.readFileSync(filePath, 'utf8');
        const { data, content } = matter(fileContents);
        
        return {
          ...data,
          body: content,
        } as Project;
      });
    
    return projects;
  } catch (error) {
    console.warn('Projects directory not found, returning sample data');
    return getSampleProjects();
  }
}

export function getSampleProjects(): Project[] {
  return [
    // XR Projects
    {
      slug: 'share-xr',
      title: 'Share XR — Collaborative Mixed Reality',
      stack: ['Unity', 'Photon', 'OpenXR'],
      tags: ['MR', 'Real-time'],
      category: 'XR Projects',
      cover: '/images/projects/share-xr/cover.jpg',
      links: [{ label: 'GitHub', href: 'https://github.com/username/share-xr' }],
      body: '## Overview\nShare XR synchronizes anchors, object manipulation, and pointers across users in real time.'
    },
    {
      slug: 'galileo-ar',
      title: 'Galileo AR — Astronomical Visualization',
      stack: ['ARCore', 'Unity', 'C#'],
      tags: ['AR', 'Education'],
      category: 'XR Projects',
      cover: '/images/projects/galileo-ar/cover.jpg',
      links: [{ label: 'Demo', href: 'https://galileo-ar.demo' }],
      body: '## Overview\nInteractive AR experience for exploring celestial bodies and astronomical phenomena.'
    },
    {
      slug: 'vr-workspace',
      title: 'VR Workspace — Virtual Office Environment',
      stack: ['Unity', 'SteamVR', 'Networking'],
      tags: ['VR', 'Productivity'],
      category: 'XR Projects',
      cover: '/images/projects/vr-workspace/cover.jpg',
      links: [{ label: 'Demo', href: 'https://vr-workspace.demo' }],
      body: '## Overview\nA virtual reality workspace for remote collaboration and productivity.'
    },
    
    // Research Projects
    {
      slug: 'mesh-morphing',
      title: 'Mesh Morphing — Real-time Deformation',
      stack: ['OpenGL', 'GLSL', 'C++'],
      tags: ['Graphics', 'Shaders'],
      category: 'Research Projects',
      cover: '/images/projects/mesh-morphing/cover.jpg',
      links: [{ label: 'Paper', href: 'https://research.paper' }],
      body: '## Overview\nReal-time mesh deformation system using advanced shader techniques and GPU computing.'
    },
    {
      slug: 'neural-networks',
      title: 'Neural Network Visualization',
      stack: ['Python', 'TensorFlow', 'D3.js'],
      tags: ['AI', 'Visualization'],
      category: 'Research Projects',
      cover: '/images/projects/neural-networks/cover.jpg',
      links: [{ label: 'Demo', href: 'https://neural-viz.demo' }],
      body: '## Overview\nInteractive visualization tool for understanding neural network architectures and training processes.'
    },
    {
      slug: 'quantum-sim',
      title: 'Quantum Circuit Simulator',
      stack: ['Python', 'NumPy', 'Qiskit'],
      tags: ['Quantum', 'Simulation'],
      category: 'Research Projects',
      cover: '/images/projects/quantum-sim/cover.jpg',
      links: [{ label: 'GitHub', href: 'https://github.com/username/quantum-sim' }],
      body: '## Overview\nA quantum circuit simulator for educational and research purposes.'
    },
    
    // Game Dev Projects
    {
      slug: 'pixel-adventure',
      title: 'Pixel Adventure — 2D Platformer',
      stack: ['Unity', 'C#', 'Aseprite'],
      tags: ['2D', 'Platformer'],
      category: 'Game Dev Projects',
      cover: '/images/projects/pixel-adventure/cover.jpg',
      links: [{ label: 'Play', href: 'https://pixel-adventure.game' }],
      body: '## Overview\nA retro-style 2D platformer with pixel art graphics and smooth gameplay mechanics.'
    },
    {
      slug: 'space-shooter',
      title: 'Cosmic Defender — Space Shooter',
      stack: ['Godot', 'GDScript', 'Blender'],
      tags: ['3D', 'Action'],
      category: 'Game Dev Projects',
      cover: '/images/projects/space-shooter/cover.jpg',
      links: [{ label: 'Play', href: 'https://cosmic-defender.game' }],
      body: '## Overview\nA fast-paced 3D space shooter with procedural enemy waves and power-ups.'
    },
    {
      slug: 'puzzle-game',
      title: 'Mind Bender — Logic Puzzle Game',
      stack: ['React', 'TypeScript', 'Canvas'],
      tags: ['Puzzle', 'Web'],
      category: 'Game Dev Projects',
      cover: '/images/projects/puzzle-game/cover.jpg',
      links: [{ label: 'Play', href: 'https://mind-bender.game' }],
      body: '## Overview\nA challenging logic puzzle game with 100+ levels and intuitive touch controls.'
    },
    
    // Web Development
    {
      slug: 'portfolio-site',
      title: 'Interactive Portfolio — This Site!',
      stack: ['Next.js', 'TypeScript', 'Tailwind'],
      tags: ['Portfolio', 'Desktop'],
      category: 'Web Development',
      cover: '/images/projects/portfolio-site/cover.jpg',
      links: [{ label: 'GitHub', href: 'https://github.com/username/portfolio' }],
      body: '## Overview\nA desktop-inspired portfolio website built with modern web technologies.'
    },
    {
      slug: 'task-manager',
      title: 'TaskFlow — Project Management Tool',
      stack: ['React', 'Node.js', 'PostgreSQL'],
      tags: ['Productivity', 'SaaS'],
      category: 'Web Development',
      cover: '/images/projects/task-manager/cover.jpg',
      links: [{ label: 'Demo', href: 'https://taskflow.demo' }],
      body: '## Overview\nA comprehensive project management tool with real-time collaboration features.'
    },
    
    // Mobile Development
    {
      slug: 'fitness-tracker',
      title: 'FitTrack — Health & Fitness App',
      stack: ['React Native', 'Firebase', 'HealthKit'],
      tags: ['Health', 'Mobile'],
      category: 'Mobile Development',
      cover: '/images/projects/fitness-tracker/cover.jpg',
      links: [{ label: 'App Store', href: 'https://apps.apple.com/fittrack' }],
      body: '## Overview\nA comprehensive fitness tracking app with workout plans and progress analytics.'
    },
    {
      slug: 'recipe-app',
      title: 'ChefMate — Recipe Discovery App',
      stack: ['Flutter', 'Dart', 'Firebase'],
      tags: ['Food', 'Social'],
      category: 'Mobile Development',
      cover: '/images/projects/recipe-app/cover.jpg',
      links: [{ label: 'Google Play', href: 'https://play.google.com/chefmate' }],
      body: '## Overview\nA social recipe sharing app with AI-powered meal planning and grocery lists.'
    }
  ];
}