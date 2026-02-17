'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Play, ExternalLink } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog';

interface Project {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
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
        thumbnail: '/projects/ai-trends-publisher.png',
        videoUrl: 'YOUR_YOUTUBE_VIDEO_ID_HERE',
        category: 'featured',
      },
      {
        id: '8',
        title: 'Fitness Coach AI',
        description:
          'Chat-based fitness coaching app powered by Claude AI with gamification — daily streaks, XP levels, badges, and personalized workout and nutrition guidance.',
        thumbnail: '/projects/fitness-coach.png',
        videoUrl: 'YOUR_YOUTUBE_VIDEO_ID_HERE',
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
        thumbnail: '/placeholder.jpg',
        videoUrl: 'YOUR_YOUTUBE_VIDEO_ID_HERE',
        category: 'recent',
      },
    ],
  },
];

export function ProjectCard({ project }: { project: Project }) {
  const [isHovered, setIsHovered] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);

  const youtubeEmbedUrl = project.videoUrl
    ? `https://www.youtube.com/embed/${project.videoUrl}?autoplay=1&rel=0`
    : null;

  return (
    <>
      <div
        className="group cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Thumbnail */}
        <div
          className="w-full aspect-video rounded-xl mb-4 relative overflow-hidden border border-[#e0ff4f]/20 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-[#e0ff4f]/20"
        >
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          {isHovered && youtubeEmbedUrl && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center backdrop-blur-sm">
              <button
                onClick={() => setVideoOpen(true)}
                className="p-4 rounded-full bg-[#e0ff4f] text-[#00272b] hover:bg-[#c8e63f] transition-all duration-200 hover:scale-110 shadow-lg"
                aria-label="Play video"
              >
                <Play className="w-6 h-6 fill-current" />
              </button>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-base font-semibold text-foreground group-hover:bg-gradient-to-r group-hover:from-[#e0ff4f] group-hover:to-[#a0c830] group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
            {project.title}
          </h3>
          <ExternalLink
            className={`w-4 h-4 text-[#e0ff4f] transition-all duration-300 flex-shrink-0 group-hover:scale-125 ${
              isHovered ? 'opacity-100' : 'opacity-50'
            }`}
          />
        </div>
        <p className="text-sm text-muted-foreground">{project.description}</p>
      </div>

      {/* Video Modal */}
      {youtubeEmbedUrl && (
        <Dialog open={videoOpen} onOpenChange={setVideoOpen}>
          <DialogContent
            showCloseButton
            className="sm:max-w-4xl p-0 overflow-hidden bg-black border-[#e0ff4f]/20"
          >
            <DialogTitle className="sr-only">{project.title}</DialogTitle>
            <div className="aspect-video w-full">
              {videoOpen && (
                <iframe
                  src={youtubeEmbedUrl}
                  title={project.title}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}

export function Projects() {
  return (
    <section id="projects" className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-semibold mb-16 bg-gradient-to-r from-[#e0ff4f] to-[#a0c830] bg-clip-text text-transparent">
          Projects
        </h2>

        {projectSections.map((section, sectionIdx) => (
          <div key={sectionIdx} className="mb-20">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] bg-gradient-to-r from-[#e0ff4f] to-[#a0c830] bg-clip-text text-transparent mb-8">
              {section.title}
            </h3>
            <div className={`grid gap-8 ${
              section.projects.length === 1
                ? 'grid-cols-1 max-w-md'
                : 'grid-cols-1 md:grid-cols-2'
            }`}>
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
