'use client';

import { motion, type Variants } from 'framer-motion';
import { Zap, Bot, CheckCircle, ArrowRight, CircleCheck } from 'lucide-react';

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const nodeVariants: Variants = {
  hidden: { opacity: 0, scale: 0.7 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: 0.4 + i * 0.18,
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const lineDrawVariants: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (i: number) => ({
    pathLength: 1,
    opacity: 1,
    transition: {
      delay: 0.7 + i * 0.2,
      duration: 0.6,
      ease: 'easeOut',
    },
  }),
};

const nodes = [
  { label: 'Trigger', icon: Zap, x: 60, y: 50 },
  { label: 'AI Agent', icon: Bot, x: 200, y: 150 },
  { label: 'Output', icon: CheckCircle, x: 340, y: 50 },
];

const connections = [
  { from: nodes[0], to: nodes[1], index: 0 },
  { from: nodes[1], to: nodes[2], index: 1 },
];

function WorkflowVisual() {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="relative w-full mx-auto"
    >
      {/* Ambient glow behind the diagram */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#e0ff4f08_0%,_transparent_70%)]" />

      <svg
        viewBox="0 0 460 240"
        fill="none"
        className="w-full h-auto relative z-10"
        style={{ filter: 'drop-shadow(0 0 40px rgba(224,255,79,0.06))' }}
      >
        {/* Connection lines */}
        {connections.map((conn) => {
          const fromX = conn.from.x + 30;
          const fromY = conn.from.y + 30;
          const toX = conn.to.x + 30;
          const toY = conn.to.y + 30;
          const midX = (fromX + toX) / 2;

          return (
            <g key={`line-${conn.index}`}>
              {/* Track line (dim) */}
              <motion.path
                d={`M ${fromX} ${fromY} C ${midX} ${fromY}, ${midX} ${toY}, ${toX} ${toY}`}
                stroke="#0d4f55"
                strokeWidth="2"
                fill="none"
                variants={lineDrawVariants}
                custom={conn.index}
              />
              {/* Active line (lime) */}
              <motion.path
                d={`M ${fromX} ${fromY} C ${midX} ${fromY}, ${midX} ${toY}, ${toX} ${toY}`}
                stroke="url(#limeGradient)"
                strokeWidth="2"
                fill="none"
                variants={lineDrawVariants}
                custom={conn.index}
              />
              {/* Traveling pulse dot */}
              <motion.circle
                r="4"
                fill="#e0ff4f"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 1, 0] }}
                transition={{
                  delay: 1.4 + conn.index * 0.5,
                  duration: 2.4,
                  repeat: Infinity,
                  repeatDelay: 1.2,
                  ease: 'easeInOut',
                }}
                style={{ filter: 'drop-shadow(0 0 6px #e0ff4f)' }}
              >
                <animateMotion
                  dur="2.4s"
                  repeatCount="indefinite"
                  begin={`${1.4 + conn.index * 0.5}s`}
                  path={`M ${fromX} ${fromY} C ${midX} ${fromY}, ${midX} ${toY}, ${toX} ${toY}`}
                />
              </motion.circle>
            </g>
          );
        })}

        {/* Gradient definition */}
        <defs>
          <linearGradient id="limeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#e0ff4f" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#a0c830" stopOpacity="0.6" />
          </linearGradient>
        </defs>

        {/* Nodes */}
        {nodes.map((node, i) => {
          const Icon = node.icon;
          return (
            <motion.g
              key={node.label}
              variants={nodeVariants}
              custom={i}
            >
              {/* Node background */}
              <rect
                x={node.x}
                y={node.y}
                width="60"
                height="60"
                rx="14"
                fill="#003d42"
                stroke="#0d4f55"
                strokeWidth="1.5"
              />
              {/* Lime top-edge accent */}
              <rect
                x={node.x + 8}
                y={node.y}
                width="44"
                height="2"
                rx="1"
                fill="#e0ff4f"
                opacity="0.5"
              />
              {/* Icon - using foreignObject for lucide icons */}
              <foreignObject
                x={node.x + 14}
                y={node.y + 10}
                width="32"
                height="32"
              >
                <div className="flex items-center justify-center w-8 h-8 text-[#e0ff4f]">
                  <Icon size={20} strokeWidth={1.8} />
                </div>
              </foreignObject>
              {/* Label */}
              <text
                x={node.x + 30}
                y={node.y + 52}
                textAnchor="middle"
                fill="#7aaa9f"
                fontSize="9"
                fontWeight="500"
                fontFamily="Open Sans, sans-serif"
              >
                {node.label}
              </text>
            </motion.g>
          );
        })}
      </svg>

      {/* Floating status badges around the diagram */}
      <motion.div
        className="absolute top-4 right-8 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/8 border border-primary/15 text-[10px] text-primary/70 font-medium"
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.6, duration: 0.5 }}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-[#e0ff4f] animate-pulse" />
        Live
      </motion.div>

    </motion.div>
  );
}

export function Hero() {
  return (
    <section className="pt-32 pb-20 px-6 relative overflow-hidden">
      {/* Subtle radial glow behind hero */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[radial-gradient(ellipse_at_center,_#e0ff4f05_0%,_transparent_60%)] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Left column — Copy */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={fadeUp}>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold tracking-wide mb-6">
                <Zap className="w-3 h-3" />
                AI Automation Developer
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="text-4xl md:text-5xl lg:text-[3.4rem] font-bold leading-[1.1] mb-6 bg-gradient-to-r from-primary to-[#a0c830] bg-clip-text text-transparent"
            >
              I build AI-powered workflows that run your business on autopilot
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-base md:text-lg text-muted-foreground leading-relaxed mb-8 max-w-lg"
            >
              From idea to production &mdash; n8n workflows, AI agents, and
              custom web apps that save hours every week.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="flex flex-wrap gap-3 mb-8"
            >
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold bg-[#e0ff4f] text-[#00272b] hover:shadow-lg hover:shadow-[#e0ff4f]/30 hover:scale-105 transition-all duration-200"
              >
                Get in Touch
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold border border-primary/40 text-primary hover:bg-primary/10 hover:border-primary/60 transition-all duration-200"
              >
                See My Work
              </a>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="flex items-center gap-2 text-sm text-muted-foreground"
            >
              <CircleCheck className="w-4 h-4 text-primary/60" />
              <span>3 projects shipped &middot; n8n &middot; Claude AI &middot; Next.js</span>
            </motion.div>
          </motion.div>

          {/* Right column — Animated workflow diagram */}
          <div className="hidden md:block">
            <WorkflowVisual />
          </div>
        </div>
      </div>
    </section>
  );
}
