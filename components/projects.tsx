'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Play, ExternalLink, ArrowRight } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog';
import { allProjects, type Project } from '@/lib/projects-data';

const featuredProjects = allProjects.filter((p) => p.featured);
const recentProjects = allProjects.filter((p) => !p.featured);

const projectSections = [
  { title: 'Featured Projects', projects: featuredProjects },
  ...(recentProjects.length > 0
    ? [{ title: 'Recent Projects', projects: recentProjects }]
    : []),
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
          {project.blogUrl ? (
            <Link href={project.blogUrl} className="flex items-start gap-2 group/link">
              <h3 className="text-base font-semibold text-foreground group-hover/link:bg-gradient-to-r group-hover/link:from-primary group-hover/link:to-[#a0c830] group-hover/link:bg-clip-text group-hover/link:text-transparent transition-all duration-300">
                {project.title}
              </h3>
              <ExternalLink
                className="w-4 h-4 text-primary transition-all duration-300 flex-shrink-0 mt-0.5 opacity-50 group-hover/link:opacity-100 group-hover/link:scale-125"
              />
            </Link>
          ) : (
            <h3 className="text-base font-semibold text-foreground">
              {project.title}
            </h3>
          )}
        </div>
        <p className="text-sm text-muted-foreground">{project.description}</p>

        {/* Tags */}
        {project.tags && project.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded-full text-xs font-medium text-primary/80 bg-primary/10 border border-primary/15"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
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
        <h2 className="text-3xl md:text-4xl font-semibold mb-16 bg-gradient-to-r from-primary to-[#a0c830] bg-clip-text text-transparent">
          Projects
        </h2>

        {projectSections.map((section, sectionIdx) => (
          <div key={sectionIdx} className="mb-20">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] bg-gradient-to-r from-primary to-[#a0c830] bg-clip-text text-transparent mb-8">
              {section.title}
            </h3>
            <div className="grid gap-8 grid-cols-1 md:grid-cols-2">
              {section.projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        ))}

        <div className="flex justify-center">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors duration-200 group"
          >
            View all projects
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
