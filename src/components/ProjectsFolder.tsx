'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, FileText, ExternalLink } from 'lucide-react';
import { Project } from '@/lib/types';

interface ProjectsFolderProps {
  projects: Project[];
  onProjectOpen: (project: Project) => void;
  isLoading: boolean;
}

export function ProjectsFolder({ projects, onProjectOpen, isLoading }: ProjectsFolderProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.stack.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesTag = !selectedTag || (project.tags && project.tags.includes(selectedTag));
    return matchesSearch && matchesTag;
  });

  const allTags = Array.from(new Set(projects.flatMap(p => p.tags || [])));

  const openProject = (project: Project) => {
    onProjectOpen(project);
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-white/10">
        <h2 className="text-xl font-bold text-white mb-4">Projects</h2>
        
        {/* Search and Filter */}
        <div className="space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/50" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-blue-400 transition-colors"
            />
          </div>
          
          {/* Tag Filter */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedTag(null)}
              className={`px-3 py-1 rounded-full text-sm transition-colors ${
                !selectedTag 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-white/10 text-white/70 hover:bg-white/20'
              }`}
            >
              All
            </button>
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-3 py-1 rounded-full text-sm transition-colors ${
                  selectedTag === tag 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-white/10 text-white/70 hover:bg-white/20'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Projects Grid */}
      <div className="flex-1 overflow-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.slug}
              className="group cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              onClick={() => openProject(project)}
            >
              <div className="p-4 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 hover:border-white/30 transition-all duration-200 group-hover:scale-[1.02]">
                {/* Project Cover */}
                {project.cover && (
                  <div className="mb-3 overflow-hidden rounded-md">
                    <img
                      src={project.cover}
                      alt={project.title}
                      className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-200"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>
                )}
                
                {/* Project Info */}
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-white group-hover:text-blue-300 transition-colors">
                    {project.title}
                  </h3>
                  <FileText className="w-4 h-4 text-white/50 group-hover:text-white/70 transition-colors" />
                </div>
                
                {/* Tech Stack */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {project.stack.slice(0, 3).map(tech => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded text-xs border border-blue-500/30"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.stack.length > 3 && (
                    <span className="px-2 py-1 bg-white/10 text-white/50 rounded text-xs">
                      +{project.stack.length - 3}
                    </span>
                  )}
                </div>
                
                {/* Tags */}
                {project.tags && project.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {project.tags.slice(0, 2).map(tag => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-white/10 text-white/60 rounded text-xs"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
        
        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-12 h-12 text-white/30 mx-auto mb-4" />
            <p className="text-white/50">No projects found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}