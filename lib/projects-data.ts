export interface Project {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  videoUrl?: string;
  blogUrl?: string;
  category: string;
  tags: string[];
  date: string;
  featured: boolean;
}

export const allProjects: Project[] = [
  {
    id: '1',
    title: 'AI Trends Daily Publisher',
    description:
      'n8n workflow that researches daily AI trends, composes a write-up, generates an image, and automatically posts to Facebook via IFTTT webhooks.',
    thumbnail: '/projects/ai-trends-publisher.png',
    videoUrl: 'YOUR_YOUTUBE_VIDEO_ID_HERE',
    blogUrl: '/blog/ai-trends-daily-publisher',
    category: 'n8n Workflow',
    tags: ['n8n', 'Claude AI', 'Tavily', 'IFTTT', 'Facebook'],
    date: '2025-11-01',
    featured: true,
  },
  {
    id: '8',
    title: 'Fitness Coach AI',
    description:
      'Chat-based fitness coaching app powered by Claude AI with gamification — daily streaks, XP levels, badges, and personalized workout and nutrition guidance.',
    thumbnail: '/projects/fitness-coach.png',
    videoUrl: 'YOUR_YOUTUBE_VIDEO_ID_HERE',
    blogUrl: '/blog/fitness-coach-ai',
    category: 'Full-Stack App',
    tags: ['Next.js', 'Claude AI', 'n8n', 'Supabase', 'Tailwind CSS'],
    date: '2026-01-15',
    featured: true,
  },
  {
    id: '4',
    title: 'AI Bookmark Organizer',
    description:
      'Smart browser extension that automatically organizes bookmarks using AI-powered semantic categorization — no API key required.',
    thumbnail: '/placeholder.jpg',
    videoUrl: 'YOUR_YOUTUBE_VIDEO_ID_HERE',
    category: 'Browser Extension',
    tags: ['Browser Extension', 'AI', 'Automation', 'JavaScript'],
    date: '2025-12-10',
    featured: false,
  },
];

export const allCategories: string[] = [
  ...new Set(allProjects.map((p) => p.category)),
].sort();

export const allTags: string[] = [
  ...new Set(allProjects.flatMap((p) => p.tags)),
].sort();
