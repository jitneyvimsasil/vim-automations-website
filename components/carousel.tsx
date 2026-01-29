'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';

interface CarouselSlide {
  title: string;
  description: string;
  tags: string[];
}

const slides: CarouselSlide[] = [
  {
    title: 'Project Alpha',
    description: 'An innovative automation tool that streamlines workflow processes and increases productivity.',
    tags: ['Python', 'Automation', 'API'],
  },
  {
    title: 'Project Beta',
    description: 'A powerful script collection for system administration and DevOps tasks.',
    tags: ['Bash', 'DevOps', 'CI/CD'],
  },
  {
    title: 'Project Gamma',
    description: 'Custom vim plugins and configurations for enhanced development experience.',
    tags: ['VimScript', 'Productivity', 'Tools'],
  },
];

export function Carousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative">
      {/* Carousel Container */}
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div key={index} className="min-w-full">
              <div className="relative bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-100 dark:from-slate-800 dark:via-purple-900/30 dark:to-slate-900 border border-blue-200 dark:border-purple-500/30 rounded-2xl p-8 md:p-12 hover:shadow-lg hover:shadow-blue-200/50 dark:hover:shadow-purple-500/20 transition-all duration-300 overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/0 via-purple-400/0 to-indigo-400/0 group-hover:from-blue-400/10 group-hover:via-purple-400/10 group-hover:to-indigo-400/10 transition-all duration-300" />
                <div className="relative z-10">
                  <h3 className="text-2xl md:text-3xl font-semibold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                    {slide.title}
                  </h3>
                  <p className="text-base md:text-lg text-slate-700 dark:text-slate-300 mb-8 leading-relaxed max-w-2xl">
                    {slide.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {slide.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1.5 rounded-full text-sm font-medium text-blue-700 dark:text-blue-300 bg-blue-100/80 dark:bg-blue-500/20 border border-blue-300/50 dark:border-blue-400/30 hover:bg-blue-200 dark:hover:bg-blue-500/30 transition-all duration-200 hover:scale-105"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <a
                    href="#"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg hover:shadow-blue-400/50 hover:scale-105 transition-all duration-200"
                  >
                    View Project
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 md:-translate-x-20 p-3 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-500/20 rounded-lg transition-all duration-200 hover:scale-110 hover:shadow-md"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 md:translate-x-20 p-3 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-500/20 rounded-lg transition-all duration-200 hover:scale-110 hover:shadow-md"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-8">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 rounded-full ${
              index === currentSlide 
                ? 'w-3 bg-gradient-to-r from-blue-600 to-purple-600 shadow-md' 
                : 'w-2 bg-blue-300 dark:bg-purple-500/40 hover:bg-blue-400 dark:hover:bg-purple-500/60 hover:scale-110'
            }`}
            style={{ height: '8px' }}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
