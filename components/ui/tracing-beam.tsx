'use client';

import React, { useEffect, useRef, useState } from 'react';
import {
  motion,
  useTransform,
  useScroll,
  useSpring,
} from 'framer-motion';
import { cn } from '@/lib/utils';

export function TracingBeam({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const svgHeightRef = useRef(0);
  const [svgHeight, setSvgHeight] = useState(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  // Use function form so it reads the latest height from the ref on every scroll frame
  const y1 = useSpring(
    useTransform(scrollYProgress, (v) => 50 + v * (svgHeightRef.current - 50)),
    { stiffness: 500, damping: 90 }
  );
  const y2 = useSpring(
    useTransform(scrollYProgress, (v) => 50 + v * (svgHeightRef.current - 100)),
    { stiffness: 500, damping: 90 }
  );

  // ResizeObserver fires on initial paint (including after client-side navigation)
  // and on any subsequent size changes (window resize, dynamic content)
  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const height = entry.contentRect.height;
        svgHeightRef.current = height;
        setSvgHeight(height);
      }
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      ref={ref}
      className={cn('relative w-full max-w-5xl mx-auto h-full', className)}
    >
      <div className="absolute -left-4 lg:-left-20 top-3 hidden md:block">
        <svg
          viewBox={`0 0 20 ${svgHeight}`}
          width="20"
          height={svgHeight}
          className="ml-4 block"
          aria-hidden="true"
        >
          {/* Background track */}
          <motion.path
            d={`M 1 0V -36 l 18 24 V ${svgHeight - 50} l -18 24V ${svgHeight}`}
            fill="none"
            stroke="currentColor"
            strokeOpacity="0.12"
            transition={{ duration: 10 }}
          />
          {/* Animated gradient beam */}
          <motion.path
            d={`M 1 0V -36 l 18 24 V ${svgHeight - 50} l -18 24V ${svgHeight}`}
            fill="none"
            stroke="url(#tracing-beam-gradient)"
            strokeWidth="1.25"
            className="motion-reduce:hidden"
            transition={{ duration: 10 }}
          />
          <defs>
            <motion.linearGradient
              id="tracing-beam-gradient"
              gradientUnits="userSpaceOnUse"
              x1="0"
              x2="0"
              y1={y1}
              y2={y2}
            >
              <stop stopColor="#e0ff4f" stopOpacity="0" />
              <stop stopColor="#e0ff4f" />
              <stop offset="0.325" stopColor="#a0c830" />
              <stop offset="1" stopColor="#a0c830" stopOpacity="0" />
            </motion.linearGradient>
          </defs>
        </svg>
      </div>
      <div ref={contentRef}>{children}</div>
    </motion.div>
  );
}
