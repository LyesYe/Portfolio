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
    {
      slug: 'share-xr',
      title: 'Share XR — Collaborative Mixed Reality',
      stack: ['Unity', 'Photon', 'OpenXR'],
      tags: ['MR', 'Real-time'],
      cover: '/images/projects/share-xr/cover.jpg',
      links: [{ label: 'GitHub', href: 'https://github.com/username/share-xr' }],
      body: '## Overview\nShare XR synchronizes anchors, object manipulation, and pointers across users in real time.'
    },
    {
      slug: 'galileo-ar',
      title: 'Galileo AR — Astronomical Visualization',
      stack: ['ARCore', 'Unity', 'C#'],
      tags: ['AR', 'Education'],
      cover: '/images/projects/galileo-ar/cover.jpg',
      links: [{ label: 'Demo', href: 'https://galileo-ar.demo' }],
      body: '## Overview\nInteractive AR experience for exploring celestial bodies and astronomical phenomena.'
    },
    {
      slug: 'mesh-morphing',
      title: 'Mesh Morphing — Real-time Deformation',
      stack: ['OpenGL', 'GLSL', 'C++'],
      tags: ['Graphics', 'Shaders'],
      cover: '/images/projects/mesh-morphing/cover.jpg',
      links: [{ label: 'Paper', href: 'https://research.paper' }],
      body: '## Overview\nReal-time mesh deformation system using advanced shader techniques and GPU computing.'
    }
  ];
}