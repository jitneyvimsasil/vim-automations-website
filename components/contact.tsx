import { Mail, Github, Linkedin, Twitter } from 'lucide-react';

export function Contact() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-semibold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Let's work together
        </h2>
        <p className="text-base text-gray-300 mb-12 leading-relaxed">
          Have a project in mind? Get in touch and let's discuss your automation needs.
        </p>

        <a
          href="mailto:hello@vim-automations.com"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-lg hover:shadow-blue-500/50 hover:scale-105 transition-all duration-200 mb-12"
        >
          <Mail className="w-5 h-5" />
          Send an email
        </a>

        <div className="flex gap-4 justify-center">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 text-blue-400 bg-blue-500/20 rounded-lg hover:bg-blue-500/30 transition-all duration-200 hover:scale-110"
            aria-label="GitHub"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 text-purple-400 bg-purple-500/20 rounded-lg hover:bg-purple-500/30 transition-all duration-200 hover:scale-110"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-5 h-5" />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 text-indigo-400 bg-indigo-500/20 rounded-lg hover:bg-indigo-500/30 transition-all duration-200 hover:scale-110"
            aria-label="Twitter"
          >
            <Twitter className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
}
