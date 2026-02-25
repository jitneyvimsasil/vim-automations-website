'use client';

import { motion } from 'framer-motion';
import { Workflow, Bot, AppWindow, ArrowRight } from 'lucide-react';

const ease = [0.22, 1, 0.36, 1] as const;

interface Service {
  icon: typeof Workflow;
  title: string;
  description: string;
  examples: string;
}

const services: Service[] = [
  {
    icon: Workflow,
    title: 'Workflow Automation',
    description:
      'Custom n8n workflows that connect your tools, automate repetitive tasks, and run 24/7. From simple triggers to complex multi-step pipelines with AI.',
    examples: 'Email sequences, data sync, content pipelines, approval flows',
  },
  {
    icon: Bot,
    title: 'AI Agents & Chatbots',
    description:
      'Intelligent AI agents powered by Claude or GPT, deployed as chatbots, customer support tools, or internal assistants.',
    examples: 'Customer support bot, fitness coach, research assistant',
  },
  {
    icon: AppWindow,
    title: 'Full-Stack Web Apps',
    description:
      'Production-ready web applications built with Next.js and Tailwind. From n8n workflow to deployed product with auth, analytics, and mobile support.',
    examples: 'SaaS dashboards, client portals, internal tools',
  },
];

export function Services() {
  const PrimaryIcon = services[0].icon;

  return (
    <section id="services" className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease }}
          className="text-center mb-12"
        >
          <span className="text-xs font-bold uppercase tracking-[0.2em] bg-gradient-to-r from-[#e0ff4f] to-[#a0c830] bg-clip-text text-transparent">
            Services
          </span>
          <h2 className="text-3xl md:text-4xl font-semibold mt-3 bg-gradient-to-r from-[#e0ff4f] to-[#a0c830] bg-clip-text text-transparent">
            What I Can Build For You
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6, ease }}
          className="grid grid-cols-1 md:grid-cols-5 gap-6"
        >
          {/* Primary service — large card */}
          <div className="md:col-span-3 md:row-span-2 relative group p-8 rounded-2xl bg-gradient-to-br from-[#e0ff4f]/8 to-card border border-border overflow-hidden transition-all duration-300 hover:border-[#e0ff4f]/40 hover:shadow-lg hover:shadow-[#e0ff4f]/10">
            {/* Top accent line */}
            <div className="absolute top-0 left-8 right-8 h-0.5 bg-gradient-to-r from-[#e0ff4f]/60 via-[#e0ff4f] to-[#e0ff4f]/60" />
            {/* Background watermark */}
            <PrimaryIcon className="absolute -bottom-8 -right-8 w-36 h-36 text-[#e0ff4f]/[0.04] group-hover:text-[#e0ff4f]/[0.08] transition-colors duration-500" />

            <div className="relative z-10">
              <div className="w-12 h-12 rounded-xl bg-[#e0ff4f]/10 border border-[#e0ff4f]/20 flex items-center justify-center mb-5">
                <PrimaryIcon className="w-6 h-6 text-[#e0ff4f]" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:bg-gradient-to-r group-hover:from-[#e0ff4f] group-hover:to-[#a0c830] group-hover:bg-clip-text group-hover:text-transparent transition-all">
                {services[0].title}
              </h3>
              <p className="text-base text-muted-foreground leading-relaxed mb-4">
                {services[0].description}
              </p>
              <p className="text-sm text-muted-foreground/70 mb-6">
                <span className="font-medium text-muted-foreground">e.g.</span>{' '}
                {services[0].examples}
              </p>
              <a
                href="#contact"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#e0ff4f] hover:text-[#e0ff4f]/80 transition-colors duration-200"
              >
                Get a Quote
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Secondary services — stacked */}
          {services.slice(1).map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="md:col-span-2 group relative flex flex-col p-6 rounded-xl bg-card border border-border overflow-hidden transition-all duration-300 hover:border-[#e0ff4f]/40 hover:shadow-lg hover:shadow-[#e0ff4f]/10"
              >
                <div className="w-10 h-10 rounded-lg bg-[#e0ff4f]/10 border border-[#e0ff4f]/20 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-[#e0ff4f]" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:bg-gradient-to-r group-hover:from-[#e0ff4f] group-hover:to-[#a0c830] group-hover:bg-clip-text group-hover:text-transparent transition-all">
                  {service.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3 flex-1">
                  {service.description}
                </p>
                <p className="text-xs text-muted-foreground/70 mb-4">
                  <span className="font-medium text-muted-foreground">e.g.</span>{' '}
                  {service.examples}
                </p>
                <a
                  href="#contact"
                  className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-[#e0ff4f] hover:text-[#e0ff4f]/80 transition-colors duration-200"
                >
                  Get a Quote
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
