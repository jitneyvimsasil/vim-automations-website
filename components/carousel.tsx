'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface CarouselSlide {
  title: string;
  description: string;
  tags: string[];
  link: string;
}

const slides: CarouselSlide[] = [
  {
    title: 'Fitness Coach AI',
    description:
      'A full-stack AI fitness coaching app with real-time chat, gamification system (6 levels, 12 badges, daily streaks), animations, and mobile-first design — built from a 5-node n8n workflow.',
    tags: ['Next.js', 'Claude AI', 'n8n', 'Supabase', 'Gamification'],
    link: '/blog/fitness-coach-ai',
  },
  {
    title: 'AI Trends Daily Publisher',
    description:
      'Automated n8n workflow that researches daily AI trends, generates images, sends approval emails, and publishes to Facebook — running at $1.40/month.',
    tags: ['n8n', 'Claude AI', 'Tavily', 'IFTTT', 'Facebook'],
    link: '/blog/ai-trends-daily-publisher',
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
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
          >
            <div className="relative bg-gradient-to-br from-[#e0ff4f]/5 via-[#00272b]/20 to-[#0d4f55]/30 dark:from-[#e0ff4f]/5 dark:via-[#003d42]/30 dark:to-[#00272b] border border-[#e0ff4f]/20 dark:border-[#e0ff4f]/20 rounded-2xl p-8 md:p-12 hover:shadow-lg hover:shadow-[#e0ff4f]/10 transition-all duration-300 overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-[#e0ff4f]/0 via-[#e0ff4f]/0 to-[#e0ff4f]/0 group-hover:from-[#e0ff4f]/5 group-hover:via-[#e0ff4f]/3 group-hover:to-[#e0ff4f]/5 transition-all duration-300" />
              <div className="relative z-10">
                <h3 className="text-2xl md:text-3xl font-semibold mb-4 bg-gradient-to-r from-primary to-[#a0c830] bg-clip-text text-transparent">
                  {slides[currentSlide].title}
                </h3>
                <p className="text-base md:text-lg text-muted-foreground mb-8 leading-relaxed max-w-2xl">
                  {slides[currentSlide].description}
                </p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {slides[currentSlide].tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 rounded-full text-sm font-medium text-primary bg-primary/10 border border-primary/20 hover:bg-primary/20 transition-all duration-200 hover:scale-105"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <Link
                  href={slides[currentSlide].link}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-semibold bg-[#e0ff4f] text-[#00272b] hover:shadow-lg hover:shadow-[#e0ff4f]/30 hover:scale-105 transition-all duration-200"
                >
                  View Project
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 md:-translate-x-20 p-3 text-primary hover:bg-primary/10 rounded-lg transition-all duration-200 hover:scale-110 hover:shadow-md"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 md:translate-x-20 p-3 text-primary hover:bg-primary/10 rounded-lg transition-all duration-200 hover:scale-110 hover:shadow-md"
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
                ? 'w-3 bg-gradient-to-r from-primary to-[#a0c830] shadow-md'
                : 'w-2 bg-primary/30 hover:bg-primary/50 hover:scale-110'
            }`}
            style={{ height: '8px' }}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
