import React from "react"
import { Zap, Code, Workflow } from 'lucide-react';

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: <Zap className="w-10 h-10" />,
    title: 'Fast & Efficient',
    description: 'Automation solutions that save time and reduce manual work.',
  },
  {
    icon: <Code className="w-10 h-10" />,
    title: 'Clean Code',
    description: 'Well-structured, maintainable code following best practices.',
  },
  {
    icon: <Workflow className="w-10 h-10" />,
    title: 'Seamless Integration',
    description: 'Easy integration with existing systems and workflows.',
  },
];

export function Features() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="group p-6 rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-400/30 hover:border-purple-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 hover:-translate-y-1"
            >
              <div className="text-blue-400 group-hover:text-purple-400 transition-colors duration-300 mb-3 group-hover:scale-110 transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 group-hover:bg-clip-text group-hover:text-transparent transition-all">
                {feature.title}
              </h3>
              <p className="text-base text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
