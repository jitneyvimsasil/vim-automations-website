'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, X, ArrowLeft } from 'lucide-react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { ProjectCard } from '@/components/projects';
import { allProjects, allCategories, allTags } from '@/lib/projects-data';

export default function ProjectsPage() {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');

  const filtered = useMemo(() => {
    let result = [...allProjects];

    if (query.trim()) {
      const q = query.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    if (selectedCategory) {
      result = result.filter((p) => p.category === selectedCategory);
    }

    if (selectedTag) {
      result = result.filter((p) => p.tags.includes(selectedTag));
    }

    result.sort((a, b) => {
      const diff = new Date(b.date).getTime() - new Date(a.date).getTime();
      return sortOrder === 'newest' ? diff : -diff;
    });

    return result;
  }, [query, selectedCategory, selectedTag, sortOrder]);

  const hasActiveFilters = selectedCategory || selectedTag;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <div className="pt-28 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-[#e0ff4f] transition-colors duration-200 mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>

          <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-[#e0ff4f] to-[#a0c830] bg-clip-text text-transparent">
            Projects
          </h1>
          <p className="text-muted-foreground mb-10">
            All automation projects, apps, and experiments.
          </p>

          {/* Filter bar */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search projects..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-9 pr-9 py-2 rounded-md text-sm bg-background border border-[#e0ff4f]/15 focus:border-[#e0ff4f]/40 focus:outline-none text-foreground placeholder:text-muted-foreground"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  <X className="w-4 h-4 text-muted-foreground hover:text-foreground" />
                </button>
              )}
            </div>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 rounded-md text-sm bg-background border border-[#e0ff4f]/15 focus:border-[#e0ff4f]/40 focus:outline-none text-foreground min-w-[160px]"
            >
              <option value="">All categories</option>
              {allCategories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            <select
              value={selectedTag}
              onChange={(e) => setSelectedTag(e.target.value)}
              className="px-3 py-2 rounded-md text-sm bg-background border border-[#e0ff4f]/15 focus:border-[#e0ff4f]/40 focus:outline-none text-foreground min-w-[160px]"
            >
              <option value="">All tags</option>
              {allTags.map((tag) => (
                <option key={tag} value={tag}>
                  {tag}
                </option>
              ))}
            </select>

            <select
              value={sortOrder}
              onChange={(e) =>
                setSortOrder(e.target.value as 'newest' | 'oldest')
              }
              className="px-3 py-2 rounded-md text-sm bg-background border border-[#e0ff4f]/15 focus:border-[#e0ff4f]/40 focus:outline-none text-foreground min-w-[140px]"
            >
              <option value="newest">Newest first</option>
              <option value="oldest">Oldest first</option>
            </select>
          </div>

          {/* Active filter pills */}
          {hasActiveFilters && (
            <div className="flex items-center gap-2 mb-6 flex-wrap">
              <span className="text-xs text-muted-foreground">
                Active filters:
              </span>
              {selectedCategory && (
                <button
                  onClick={() => setSelectedCategory('')}
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium text-[#e0ff4f]/80 bg-[#e0ff4f]/10 border border-[#e0ff4f]/30 hover:bg-[#e0ff4f]/20 transition-colors"
                >
                  {selectedCategory} <X className="w-3 h-3" />
                </button>
              )}
              {selectedTag && (
                <button
                  onClick={() => setSelectedTag('')}
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium text-[#e0ff4f]/80 bg-[#e0ff4f]/10 border border-[#e0ff4f]/30 hover:bg-[#e0ff4f]/20 transition-colors"
                >
                  {selectedTag} <X className="w-3 h-3" />
                </button>
              )}
            </div>
          )}

          {/* Results count */}
          <p className="text-sm text-muted-foreground mb-6">
            {filtered.length} project{filtered.length !== 1 ? 's' : ''}
          </p>

          {/* Grid */}
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((project) => (
                <div
                  key={project.id}
                  className="rounded-2xl border border-[#e0ff4f]/15 bg-gradient-to-br from-[#e0ff4f]/5 via-transparent to-[#0d4f55]/20 p-4 flex flex-col overflow-hidden transition-all duration-300 hover:border-[#e0ff4f]/40 hover:shadow-lg hover:shadow-[#e0ff4f]/10 hover:-translate-y-0.5"
                >
                  <ProjectCard project={project} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-muted-foreground">
              <p className="text-lg font-medium mb-2">
                No projects match your filters
              </p>
              <button
                onClick={() => {
                  setQuery('');
                  setSelectedCategory('');
                  setSelectedTag('');
                }}
                className="text-sm text-[#e0ff4f] hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
