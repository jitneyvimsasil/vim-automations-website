import type { Metadata } from 'next';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { User, Mail, MapPin, Briefcase, GraduationCap, Wrench } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About — Jitneyvim Sasil | vim-automations',
  description: 'About Jitneyvim Sasil — AI automation developer and builder.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <div className="pt-28 pb-20 px-6">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8 mb-12">
            {/* Photo placeholder */}
            <div className="w-32 h-32 rounded-2xl border-2 border-[#e0ff4f]/30 bg-[#e0ff4f]/5 flex items-center justify-center shrink-0">
              <User className="w-12 h-12 text-[#e0ff4f]/40" />
            </div>
            <div className="text-center sm:text-left">
              <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-[#e0ff4f] to-[#a0c830] bg-clip-text text-transparent">
                Jitneyvim Sasil
              </h1>
              <p className="text-lg text-muted-foreground mb-3">
                AI Automation Developer
              </p>
              <div className="flex flex-wrap justify-center sm:justify-start gap-4 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-[#e0ff4f]" />
                  your.email@example.com
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#e0ff4f]" />
                  Location
                </span>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-[#e0ff4f]/20 to-transparent mb-12" />

          {/* Summary */}
          <section className="mb-12">
            <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.2em] bg-gradient-to-r from-[#e0ff4f] to-[#a0c830] bg-clip-text text-transparent mb-4">
              <User className="w-4 h-4 text-[#e0ff4f]" />
              Summary
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Placeholder — Add a brief professional summary here describing your background,
              expertise, and what drives you in AI automation.
            </p>
          </section>

          {/* Experience */}
          <section className="mb-12">
            <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.2em] bg-gradient-to-r from-[#e0ff4f] to-[#a0c830] bg-clip-text text-transparent mb-6">
              <Briefcase className="w-4 h-4 text-[#e0ff4f]" />
              Experience
            </h2>
            <div className="space-y-8">
              <div className="relative pl-6 border-l border-[#e0ff4f]/20">
                <div className="absolute -left-1.5 top-1 w-3 h-3 rounded-full bg-[#e0ff4f]/30 border border-[#e0ff4f]" />
                <h3 className="text-base font-semibold text-foreground">Job Title</h3>
                <p className="text-sm text-[#e0ff4f]/70 mb-2">Company Name &middot; 2024 &ndash; Present</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Placeholder — Describe your role, responsibilities, and key achievements.
                </p>
              </div>
              <div className="relative pl-6 border-l border-[#e0ff4f]/20">
                <div className="absolute -left-1.5 top-1 w-3 h-3 rounded-full bg-[#e0ff4f]/15 border border-[#e0ff4f]/40" />
                <h3 className="text-base font-semibold text-foreground">Previous Role</h3>
                <p className="text-sm text-[#e0ff4f]/70 mb-2">Company Name &middot; 2022 &ndash; 2024</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Placeholder — Describe your role, responsibilities, and key achievements.
                </p>
              </div>
            </div>
          </section>

          {/* Skills */}
          <section className="mb-12">
            <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.2em] bg-gradient-to-r from-[#e0ff4f] to-[#a0c830] bg-clip-text text-transparent mb-4">
              <Wrench className="w-4 h-4 text-[#e0ff4f]" />
              Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {[
                'n8n', 'Next.js', 'React', 'TypeScript', 'Tailwind CSS',
                'Claude AI', 'Supabase', 'Node.js', 'Python', 'Vercel',
                'Railway', 'Git', 'REST APIs', 'Workflow Automation',
              ].map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1.5 rounded-full text-sm font-medium text-[#e0ff4f] bg-[#e0ff4f]/10 border border-[#e0ff4f]/20"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>

          {/* Education */}
          <section className="mb-12">
            <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.2em] bg-gradient-to-r from-[#e0ff4f] to-[#a0c830] bg-clip-text text-transparent mb-6">
              <GraduationCap className="w-4 h-4 text-[#e0ff4f]" />
              Education
            </h2>
            <div className="relative pl-6 border-l border-[#e0ff4f]/20">
              <div className="absolute -left-1.5 top-1 w-3 h-3 rounded-full bg-[#e0ff4f]/30 border border-[#e0ff4f]" />
              <h3 className="text-base font-semibold text-foreground">Degree / Program</h3>
              <p className="text-sm text-[#e0ff4f]/70 mb-2">University Name &middot; Year</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Placeholder — Add details about your education.
              </p>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
}
