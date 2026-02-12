import { Workflow, Bot, AppWindow, ArrowRight } from 'lucide-react';

interface Service {
  icon: React.ReactNode;
  title: string;
  description: string;
  examples: string;
}

const services: Service[] = [
  {
    icon: <Workflow className="w-10 h-10" />,
    title: 'Workflow Automation',
    description:
      'Custom n8n workflows that connect your tools, automate repetitive tasks, and run 24/7. From simple triggers to complex multi-step pipelines with AI.',
    examples: 'Email sequences, data sync, content pipelines, approval flows',
  },
  {
    icon: <Bot className="w-10 h-10" />,
    title: 'AI Agents & Chatbots',
    description:
      'Intelligent AI agents powered by Claude or GPT, deployed as chatbots, customer support tools, or internal assistants.',
    examples: 'Customer support bot, fitness coach, research assistant',
  },
  {
    icon: <AppWindow className="w-10 h-10" />,
    title: 'Full-Stack Web Apps',
    description:
      'Production-ready web applications built with Next.js and Tailwind. From n8n workflow to deployed product with auth, analytics, and mobile support.',
    examples: 'SaaS dashboards, client portals, internal tools',
  },
];

export function Services() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-[0.2em] bg-gradient-to-r from-[#e0ff4f] to-[#a0c830] bg-clip-text text-transparent">
            Services
          </span>
          <h2 className="text-3xl md:text-4xl font-semibold mt-3 bg-gradient-to-r from-[#e0ff4f] to-[#a0c830] bg-clip-text text-transparent">
            What I Can Build For You
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative flex flex-col p-6 rounded-xl bg-gradient-to-br from-[#e0ff4f]/10 to-[#00272b]/10 border border-[#e0ff4f]/30 hover:border-[#e0ff4f]/60 transition-all duration-300 hover:shadow-lg hover:shadow-[#e0ff4f]/20 hover:-translate-y-1"
            >
              <div className="text-[#e0ff4f] group-hover:text-[#a0c830] transition-colors duration-300 mb-4 group-hover:scale-110 transform duration-300">
                {service.icon}
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-3 group-hover:bg-gradient-to-r group-hover:from-[#e0ff4f] group-hover:to-[#a0c830] group-hover:bg-clip-text group-hover:text-transparent transition-all">
                {service.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                {service.description}
              </p>
              <p className="text-xs text-muted-foreground/70 mb-6">
                <span className="font-medium text-muted-foreground">e.g.</span>{' '}
                {service.examples}
              </p>
              <a
                href="#contact"
                className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-[#e0ff4f] hover:text-[#a0c830] transition-colors duration-200"
              >
                Get a Quote
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
