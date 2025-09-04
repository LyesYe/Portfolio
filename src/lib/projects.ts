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
      slug: 'handar',
      title: 'HandAR — Hand Tracking Augmented Reality',
      stack: ['Unity', 'ARCore', 'OpenCV', 'C#'],
      tags: ['AR', 'Hand Tracking', 'Computer Vision'],
      category: 'XR Projects',
      cover: '/images/projects/handar/cover.jpg',
      gallery: [
        '/images/projects/handar/demo-1.jpg',
        '/images/projects/handar/demo-2.jpg',
        '/images/projects/handar/video-demo.mp4'
      ],
      links: [
        { label: 'GitHub', href: '#' },
        { label: 'Demo Video', href: '#' }
      ],
      body: `## Overview

[Brief description of HandAR project - replace with your content]

## Key Features

- Feature 1
- Feature 2
- Feature 3

## Technical Implementation

[Technical details about implementation]

## Demo

![Demo Image](/images/projects/handar/demo-1.jpg)

[Description of the demo or screenshot]

## Video Demonstration

<video controls width="100%">
  <source src="/images/projects/handar/video-demo.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>

## Results & Impact

[Results and impact of the project]

![Results](/images/projects/handar/demo-2.jpg)`
    },
    {
      slug: 'galileoar',
      title: 'GalileoAR — Astronomical AR Experience',
      stack: ['Unity', 'ARKit', 'ARCore', 'C#'],
      tags: ['AR', 'Education', 'Astronomy'],
      category: 'XR Projects',
      cover: '/images/projects/galileoar/cover.jpg',
      gallery: [
        '/images/projects/galileoar/interface-1.jpg',
        '/images/projects/galileoar/interface-2.jpg',
        '/images/projects/galileoar/demo-video.mp4'
      ],
      links: [
        { label: 'GitHub', href: '#' },
        { label: 'App Store', href: '#' }
      ],
      body: `## Overview

[Brief description of GalileoAR project - replace with your content]

## Features

- Feature 1
- Feature 2
- Feature 3

## Educational Impact

[Educational aspects and impact]

## User Interface

![Interface Screenshot](/images/projects/galileoar/interface-1.jpg)

[Description of the user interface]

## AR Experience

<video controls width="100%">
  <source src="/images/projects/galileoar/demo-video.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>

## Technical Challenges

[Technical challenges and solutions]

![Technical Implementation](/images/projects/galileoar/interface-2.jpg)`
    },
    
    // Research Projects
    {
      slug: 'minecraft-texture-synthesis',
      title: 'Synthèse de Textures Minecraft',
      stack: ['Python', 'PyTorch', 'OpenCV', 'NumPy'],
      tags: ['Machine Learning', 'Computer Graphics', 'Texture Synthesis'],
      category: 'Research Projects',
      cover: '/images/projects/minecraft-texture-synthesis/cover.jpg',
      gallery: [
        '/images/projects/minecraft-texture-synthesis/results-1.jpg',
        '/images/projects/minecraft-texture-synthesis/results-2.jpg',
        '/images/projects/minecraft-texture-synthesis/process-video.mp4'
      ],
      links: [
        { label: 'Research Paper', href: '#' },
        { label: 'GitHub', href: '#' }
      ],
      body: `## Résumé

[Description du projet de synthèse de textures Minecraft - remplacez par votre contenu]

## Méthodologie

- Méthode 1
- Méthode 2
- Méthode 3

## Résultats

![Résultats de synthèse](/images/projects/minecraft-texture-synthesis/results-1.jpg)

[Description des résultats obtenus]

## Processus de génération

<video controls width="100%">
  <source src="/images/projects/minecraft-texture-synthesis/process-video.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>

## Comparaison

![Comparaison des textures](/images/projects/minecraft-texture-synthesis/results-2.jpg)

## Conclusions

[Conclusions et perspectives]`
    },
    {
      slug: '3d-mesh-morphing',
      title: '3D Mesh Morphing — Advanced Deformation Techniques',
      stack: ['C++', 'OpenGL', 'GLSL', 'Eigen'],
      tags: ['Computer Graphics', '3D Modeling', 'Mesh Processing'],
      category: 'Research Projects',
      cover: '/images/projects/3d-mesh-morphing/cover.jpg',
      gallery: [
        '/images/projects/3d-mesh-morphing/morphing-1.jpg',
        '/images/projects/3d-mesh-morphing/morphing-2.jpg',
        '/images/projects/3d-mesh-morphing/morphing-demo.mp4'
      ],
      links: [
        { label: 'Research Paper', href: '#' },
        { label: 'GitHub', href: '#' }
      ],
      body: `## Abstract

[Brief description of 3D Mesh Morphing research - replace with your content]

## Methodology

- Algorithm 1
- Algorithm 2
- Algorithm 3

## Implementation

![Morphing Process](/images/projects/3d-mesh-morphing/morphing-1.jpg)

[Description of the morphing process]

## Real-time Demonstration

<video controls width="100%">
  <source src="/images/projects/3d-mesh-morphing/morphing-demo.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>

## Results Analysis

![Results Comparison](/images/projects/3d-mesh-morphing/morphing-2.jpg)

## Future Work

[Future research directions and improvements]`
    },
    
    // GameDev Projects
    {
      slug: 'bastion-23',
      title: 'Bastion 23 — Tactical Strategy Game',
      stack: ['Unity', 'C#', 'Blender', 'Photoshop'],
      tags: ['Strategy', '3D', 'Tactical'],
      category: 'GameDev Projects',
      cover: '/images/projects/bastion-23/cover.jpg',
      gallery: [
        '/images/projects/bastion-23/gameplay-1.jpg',
        '/images/projects/bastion-23/gameplay-2.jpg',
        '/images/projects/bastion-23/trailer.mp4'
      ],
      links: [
        { label: 'Play Game', href: '#' },
        { label: 'Steam', href: '#' }
      ],
      body: `## Game Overview

[Brief description of Bastion 23 - replace with your content]

## Gameplay Features

- Feature 1
- Feature 2
- Feature 3

## Screenshots

![Gameplay Screenshot](/images/projects/bastion-23/gameplay-1.jpg)

[Description of gameplay mechanics]

## Game Trailer

<video controls width="100%">
  <source src="/images/projects/bastion-23/trailer.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>

## Level Design

![Level Design](/images/projects/bastion-23/gameplay-2.jpg)

## Development Process

[Development challenges and solutions]`
    },
    {
      slug: 'the-evil-with-inn',
      title: 'The Evil With Inn — Horror Adventure Game',
      stack: ['Unreal Engine', 'Blueprint', 'C++', 'Substance'],
      tags: ['Horror', 'Adventure', '3D'],
      category: 'GameDev Projects',
      cover: '/images/projects/the-evil-with-inn/cover.jpg',
      gallery: [
        '/images/projects/the-evil-with-inn/atmosphere-1.jpg',
        '/images/projects/the-evil-with-inn/atmosphere-2.jpg',
        '/images/projects/the-evil-with-inn/gameplay-video.mp4'
      ],
      links: [
        { label: 'Play Game', href: '#' },
        { label: 'itch.io', href: '#' }
      ],
      body: `## Game Concept

[Brief description of The Evil With Inn - replace with your content]

## Horror Elements

- Element 1
- Element 2
- Element 3

## Atmospheric Design

![Atmospheric Screenshot](/images/projects/the-evil-with-inn/atmosphere-1.jpg)

[Description of atmospheric design choices]

## Gameplay Video

<video controls width="100%">
  <source src="/images/projects/the-evil-with-inn/gameplay-video.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>

## Environment Art

![Environment Design](/images/projects/the-evil-with-inn/atmosphere-2.jpg)

## Technical Implementation

[Technical aspects and challenges]`
    }
  ];
}