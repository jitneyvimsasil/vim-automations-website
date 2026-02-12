import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Bot, Newspaper, Bookmark } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Blog | vim-automations',
  description: 'Write-ups and case studies on AI automation projects.',
};

interface BentoCard {
  title: string;
  description: string;
  href: string;
  tags: string[];
  icon: React.ReactNode;
  colSpan?: string;
  rowSpan?: string;
}

const posts: BentoCard[] = [
  {
    title: 'AI Fitness Coach',
    description:
      'How I turned a 5-node n8n workflow into a full-stack AI coaching app with chat, gamification (6 levels, 12 badges, daily streaks), animations, and mobile-first design.',
    href: '/blog/fitness-coach-ai',
    tags: ['Next.js', 'Claude AI', 'n8n', 'Supabase', 'Gamification'],
    icon: <Bot className="w-6 h-6" />,
    colSpan: 'md:col-span-2',
    rowSpan: 'md:row-span-2',
  },
  {
    title: 'AI Trends Daily Publisher',
    description:
      'Automated workflow that researches daily AI trends, generates images, sends approval emails, and publishes to Facebook — running at $1.40/month.',
    href: '/blog/ai-trends-daily-publisher',
    tags: ['n8n', 'Claude AI', 'Tavily', 'IFTTT', 'Facebook'],
    icon: <Newspaper className="w-6 h-6" />,
  },
  {
    title: 'AI Bookmark Organizer',
    description:
      'Smart browser extension that automatically organizes bookmarks using AI-powered semantic categorization.',
    href: '#',
    tags: ['Browser Extension', 'AI', 'Automation'],
    icon: <Bookmark className="w-6 h-6" />,
  },
];

export default function BlogIndex() {
  return (
    <>
      <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-[#e0ff4f] to-[#a0c830] bg-clip-text text-transparent">
        Blog
      </h1>
      <p className="text-muted-foreground mb-12">
        Write-ups and case studies from my automation projects.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 md:auto-rows-[14rem] gap-4">
        {posts.map((post) => (
          <Link
            key={post.title}
            href={post.href}
            className={`group relative rounded-2xl border border-[#e0ff4f]/15 bg-gradient-to-br from-[#e0ff4f]/5 via-transparent to-[#0d4f55]/20 p-6 flex flex-col justify-between overflow-hidden transition-all duration-300 hover:border-[#e0ff4f]/40 hover:shadow-lg hover:shadow-[#e0ff4f]/10 hover:-translate-y-0.5 ${post.colSpan ?? ''} ${post.rowSpan ?? ''}`}
          >
            {/* Hover glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#e0ff4f]/0 to-[#e0ff4f]/0 group-hover:from-[#e0ff4f]/5 group-hover:to-[#e0ff4f]/3 transition-all duration-300" />

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-[#e0ff4f]">{post.icon}</span>
                <h2 className="text-lg font-semibold text-foreground group-hover:bg-gradient-to-r group-hover:from-[#e0ff4f] group-hover:to-[#a0c830] group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                  {post.title}
                </h2>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                {post.description}
              </p>
            </div>

            <div className="relative z-10 mt-4">
              <div className="flex flex-wrap gap-1.5 mb-3">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded-full text-xs font-medium text-[#e0ff4f]/80 bg-[#e0ff4f]/10 border border-[#e0ff4f]/15"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <span className="inline-flex items-center gap-1 text-xs font-medium text-[#e0ff4f] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Read more <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
