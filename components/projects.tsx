'use client';

import { useState } from 'react';
import { Play, Maximize2, ExternalLink } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  description: string;
  videoUrl?: string;
  category: string;
}

const projectSections = [
  {
    title: 'Featured Projects',
    category: 'featured',
    projects: [
      {
        id: '1',
        title: 'AI Trends Daily Publisher',
        description: 'n8n workflow that researches daily AI trends, composes a write-up, generates an image, and automatically posts to Facebook via IFTTT webhooks',
        category: 'featured',
      },
      {
        id: '2',
        title: 'Data Pipeline System',
        description: 'Real-time data processing and transformation',
        category: 'featured',
      },
      {
        id: '3',
        title: 'API Integration Manager',
        description: 'Seamless third-party API integration',
        category: 'featured',
      },
      {
        id: '8',
        title: 'Fitness Coach AI',
        description:
          'Chat-based fitness coaching app powered by Claude AI with gamification — daily streaks, XP levels, badges, and personalized workout and nutrition guidance.',
        category: 'featured',
      },
    ],
  },
  {
    title: 'Recent Projects',
    category: 'recent',
    projects: [
      {
        id: '4',
        title: 'AI Bookmark Organizer',
        description: 'Smart browser extension that automatically organizes bookmarks using AI-powered semantic categorization — no API key required',
        category: 'recent',
      },
      {
        id: '5',
        title: 'Email Automation Tool',
        description: 'Batch email processing and scheduling',
        category: 'recent',
      },
      {
        id: '6',
        title: 'File Management System',
        description: 'Automated file organization and backup',
        category: 'recent',
      },
      {
        id: '7',
        title: 'Monitoring Dashboard',
        description: 'Real-time system monitoring and alerts',
        category: 'recent',
      },
    ],
  },
];

export function ProjectCard({ project }: { project: Project }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Media Placeholder */}
      <div
        className="w-full aspect-video rounded-xl mb-4 flex items-center justify-center text-gray-400 relative overflow-hidden bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-400/30 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-blue-500/30"
      >
        {isHovered && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center gap-4 backdrop-blur-sm">
            <button
              className="p-3 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-all duration-200 hover:scale-110 shadow-lg"
              aria-label="Play video"
            >
              <Play className="w-5 h-5 fill-current" />
            </button>
            <button
              className="p-3 rounded-full bg-purple-500 text-white hover:bg-purple-600 transition-all duration-200 hover:scale-110 shadow-lg"
              aria-label="Fullscreen"
            >
              <Maximize2 className="w-5 h-5" />
            </button>
          </div>
        )}
        <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Video</span>
      </div>

      {/* Content */}
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-base font-semibold text-foreground group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
          {project.title}
        </h3>
        <ExternalLink
          className={`w-4 h-4 text-blue-400 transition-all duration-300 flex-shrink-0 group-hover:scale-125 ${
            isHovered ? 'opacity-100' : 'opacity-50'
          }`}
        />
      </div>
      <p className="text-sm text-muted-foreground">{project.description}</p>
    </div>
  );
}

export function Projects() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-semibold mb-16 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Projects
        </h2>

        {projectSections.map((section, sectionIdx) => (
          <div key={sectionIdx} className="mb-20">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-8">
              {section.title}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {section.projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
