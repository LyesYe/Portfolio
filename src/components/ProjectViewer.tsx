'use client';

import { Project } from '@/lib/types';
import { MarkdownRenderer } from './MarkdownRenderer';
import { ExternalLink, Github, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

interface ProjectViewerProps {
  project: Project;
}

export function ProjectViewer({ project }: ProjectViewerProps) {
  return (
    <div className="h-full overflow-auto">
      {/* Project Header */}
      <div className="p-6 border-b border-white/10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-2xl font-bold text-white mb-3">{project.title}</h1>
          
          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm font-medium border border-blue-500/30"
              >
                {tech}
              </span>
            ))}
          </div>
          
          {/* Tags */}
          {project.tags && project.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-white/10 text-white/70 rounded text-xs border border-white/20"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
          
          {/* Links */}
          {project.links && project.links.length > 0 && (
            <div className="flex flex-wrap gap-3">
              {project.links.map((link, index) => {
                const isGithub = link.label.toLowerCase().includes('github');
                const isDemo = link.label.toLowerCase().includes('demo') || link.label.toLowerCase().includes('live');
                const Icon = isGithub ? Github : isDemo ? Globe : ExternalLink;
                
                return (
                  <motion.a
                    key={index}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors border border-white/20 hover:border-white/40"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon className="w-4 h-4 text-white" />
                    <span className="text-white text-sm font-medium">{link.label}</span>
                  </motion.a>
                );
              })}
            </div>
          )}
        </motion.div>
      </div>
      
      {/* Project Cover Image */}
      {project.cover && (
        <div className="p-6 border-b border-white/10">
          <motion.img
            src={project.cover}
            alt={project.title}
            className="w-full h-64 object-cover rounded-lg border border-white/20"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        </div>
      )}
      
      {/* Project Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <MarkdownRenderer content={project.body} />
      </motion.div>
      
      {/* Project Gallery */}
      {project.gallery && project.gallery.length > 0 && (
        <div className="p-6 border-t border-white/10">
          <h3 className="text-xl font-semibold text-white mb-4">Gallery</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {project.gallery.map((image, index) => (
              <motion.img
                key={index}
                src={image}
                alt={`${project.title} gallery ${index + 1}`}
                className="w-full h-48 object-cover rounded-lg border border-white/20 hover:border-white/40 transition-colors cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}