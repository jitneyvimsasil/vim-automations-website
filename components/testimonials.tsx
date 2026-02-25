'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
  {
    quote:
      'The automation workflow saved us hours every week. What used to take a full day of manual work now runs completely on autopilot.',
    name: 'Client Name',
    role: 'Business Owner',
  },
  {
    quote:
      'Incredibly responsive and delivered ahead of schedule. The AI agent handles customer inquiries better than we expected.',
    name: 'Client Name',
    role: 'Startup Founder',
  },
  {
    quote:
      'Clean code, great documentation, and the workflow just works. Exactly what we needed to scale our content operations.',
    name: 'Client Name',
    role: 'Marketing Director',
  },
];

export function Testimonials() {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  // Auto-advance every 6 seconds
  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className="py-20 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="text-xs font-bold uppercase tracking-[0.2em] bg-gradient-to-r from-[#e0ff4f] to-[#a0c830] bg-clip-text text-transparent">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl font-semibold mt-3 mb-12 bg-gradient-to-r from-[#e0ff4f] to-[#a0c830] bg-clip-text text-transparent">
            What People Say
          </h2>
        </motion.div>

        <div className="relative">
          <Quote className="w-10 h-10 text-[#e0ff4f]/15 mx-auto mb-6" />

          <div className="min-h-[180px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={current}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
              >
                <p className="text-lg md:text-xl text-foreground leading-relaxed italic mb-8">
                  &ldquo;{testimonials[current].quote}&rdquo;
                </p>
                <footer>
                  <cite className="not-italic">
                    <span className="text-sm font-semibold text-[#e0ff4f]">
                      {testimonials[current].name}
                    </span>
                    <span className="text-sm text-muted-foreground ml-2">
                      &mdash; {testimonials[current].role}
                    </span>
                  </cite>
                </footer>
              </motion.blockquote>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="p-2 text-muted-foreground hover:text-[#e0ff4f] transition-colors duration-200"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrent(index)}
                  className={`transition-all duration-300 rounded-full ${
                    index === current
                      ? 'w-6 h-2 bg-gradient-to-r from-[#e0ff4f] to-[#a0c830]'
                      : 'w-2 h-2 bg-[#e0ff4f]/30 hover:bg-[#e0ff4f]/50'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="p-2 text-muted-foreground hover:text-[#e0ff4f] transition-colors duration-200"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
