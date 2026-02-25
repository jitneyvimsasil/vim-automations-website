'use client';

import { motion, type Variants } from 'framer-motion';
import { MessageSquare, PenTool, Code, Rocket } from 'lucide-react';

const ease = [0.22, 1, 0.36, 1] as const;

const stepVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.5, ease },
  }),
};

const lineVariants: Variants = {
  hidden: { scaleX: 0 },
  visible: (i: number) => ({
    scaleX: 1,
    transition: { delay: 0.3 + i * 0.15, duration: 0.6, ease },
  }),
};

const steps = [
  {
    num: 1,
    title: 'Discover',
    icon: MessageSquare,
    desc: 'We discuss your goals, pain points, and what you need automated.',
  },
  {
    num: 2,
    title: 'Design',
    icon: PenTool,
    desc: 'I map out the workflow architecture and choose the right tech stack.',
  },
  {
    num: 3,
    title: 'Build',
    icon: Code,
    desc: 'Rapid development with weekly demos and feedback loops.',
  },
  {
    num: 4,
    title: 'Launch',
    icon: Rocket,
    desc: 'Deploy, test, and hand off with documentation and support.',
  },
];

export function Process() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease }}
          className="text-center mb-14"
        >
          <span className="text-xs font-bold uppercase tracking-[0.2em] bg-gradient-to-r from-[#e0ff4f] to-[#a0c830] bg-clip-text text-transparent">
            Process
          </span>
          <h2 className="text-3xl md:text-4xl font-semibold mt-3 bg-gradient-to-r from-[#e0ff4f] to-[#a0c830] bg-clip-text text-transparent">
            How I Work
          </h2>
        </motion.div>

        {/* Desktop: horizontal timeline */}
        <div className="hidden md:grid grid-cols-4 gap-0 relative">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={step.num} className="relative flex flex-col items-center text-center px-4">
                {/* Connecting line (after step, except last) */}
                {i < steps.length - 1 && (
                  <motion.div
                    variants={lineVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    custom={i}
                    className="absolute top-7 left-[calc(50%+28px)] right-[calc(-50%+28px)] h-0.5 bg-gradient-to-r from-[#e0ff4f]/40 to-[#e0ff4f]/10 origin-left"
                  />
                )}

                {/* Step circle */}
                <motion.div
                  variants={stepVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  custom={i}
                  className="relative"
                >
                  <div className="w-14 h-14 rounded-full bg-[#e0ff4f]/10 border-2 border-[#e0ff4f]/30 flex items-center justify-center mb-5 group-hover:border-[#e0ff4f]/60 transition-colors">
                    <Icon className="w-6 h-6 text-[#e0ff4f]" strokeWidth={1.8} />
                  </div>
                  {/* Step number badge */}
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#e0ff4f] text-[#00272b] text-[10px] font-bold flex items-center justify-center">
                    {step.num}
                  </span>
                </motion.div>

                <motion.div
                  variants={stepVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  custom={i}
                >
                  <h3 className="text-base font-semibold text-foreground mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.desc}
                  </p>
                </motion.div>
              </div>
            );
          })}
        </div>

        {/* Mobile: vertical timeline */}
        <div className="md:hidden space-y-8">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.num}
                variants={stepVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                custom={i}
                className="relative pl-12 border-l-2 border-[#e0ff4f]/20 pb-2"
              >
                {/* Circle on timeline */}
                <div className="absolute -left-[17px] top-0 w-8 h-8 rounded-full bg-[#e0ff4f]/10 border-2 border-[#e0ff4f]/30 flex items-center justify-center">
                  <span className="text-xs font-bold text-[#e0ff4f]">{step.num}</span>
                </div>
                <div className="flex items-center gap-3 mb-2">
                  <Icon className="w-5 h-5 text-[#e0ff4f]" strokeWidth={1.8} />
                  <h3 className="text-base font-semibold text-foreground">{step.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
