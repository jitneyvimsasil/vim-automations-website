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
  const [svgHeight, setSvgHeight] = useState(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  const y1 = useSpring(
    useTransform(scrollYProgress, [0, 1], [50, svgHeight]),
    { stiffness: 500, damping: 90 }
  );
  const y2 = useSpring(
    useTransform(scrollYProgress, [0, 1], [50, svgHeight - 50]),
    { stiffness: 500, damping: 90 }
  );

  useEffect(() => {
    if (contentRef.current) {
      setSvgHeight(contentRef.current.offsetHeight);
    }
  }, []);

  // Recalculate on resize
  useEffect(() => {
    const handleResize = () => {
      if (contentRef.current) {
        setSvgHeight(contentRef.current.offsetHeight);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
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
