'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { Mail, Github, Linkedin, Facebook, Send, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

function ThreadsIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.783 3.631 2.698 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.29 3.275-1.908 2.37-5.517 2.565-7.465 1.635-1.127-.538-2.04-1.547-2.422-2.792-.566-1.84.098-3.782 1.741-5.098 1.188-.952 2.723-1.467 4.456-1.498.988-.018 1.873.1 2.655.352-.083-.984-.42-1.746-.99-2.267-.756-.695-1.896-1.055-3.388-1.07h-.058c-1.174.01-2.146.305-2.894.882l-1.252-1.64C7.835 3.592 9.27 3.13 10.975 3.108h.073c1.984.02 3.557.548 4.672 1.573.918.845 1.473 1.983 1.664 3.39.694.3 1.324.675 1.88 1.123 1.268 1.024 2.093 2.4 2.386 3.975.36 1.935.034 4.078-1.453 5.618C18.406 20.627 16.12 21.472 12.99 21.5h-.192c-3.138-.038-5.564-.91-7.213-2.596l1.437-1.437c1.28 1.312 3.26 1.996 5.887 2.033 2.668-.024 4.493-.664 5.745-2.013 1.047-1.127 1.133-2.494.883-3.533-.144-.6-.423-1.14-.814-1.606-.837 3.506-3.525 4.655-5.891 4.655-.084 0-.168-.001-.252-.004-1.97-.06-3.598-.776-4.466-1.96-.598-.815-.842-1.808-.68-2.74.272-1.563 1.625-2.878 3.578-3.303.812-.177 1.778-.24 2.783-.142.7.069 1.36.2 1.977.392v-.084c-.012-1.225-.27-2.15-.784-2.766-.62-.743-1.6-1.134-2.838-1.15h-.048c-.977.01-1.765.257-2.34.737l-1.252-1.639c.96-.757 2.206-1.15 3.62-1.173h.058c1.716.021 3.068.497 4.02 1.413.81.778 1.31 1.844 1.503 3.191.648.275 1.236.627 1.752 1.046 1.202.978 1.983 2.27 2.26 3.742.34 1.805.04 3.778-1.347 5.207-1.606 1.654-3.778 2.483-6.461 2.467h-.124zM8.684 16.965c.552.754 1.564 1.202 2.755 1.238 2.363.072 3.94-.876 4.64-2.786-.9-.428-1.944-.66-3.104-.694-1.337-.004-2.484.324-3.33.95-.66.49-.992 1.1-1.092 1.678-.048.276.02.558.13.614z" />
    </svg>
  );
}

const contactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Please enter a valid email'),
  projectType: z.string().min(1, 'Please select a project type'),
  message: z.string().max(2000, 'Message must be under 2000 characters').optional(),
  website: z.string().max(0).optional(), // honeypot — bots fill this, humans don't see it
});

const RATE_LIMIT = { max: 3, windowMs: 10 * 60 * 1000 } as const;

type ContactFormData = z.infer<typeof contactSchema>;

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      projectType: '',
      message: '',
      website: '',
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    // Honeypot check — bots fill this hidden field, humans never see it
    if (data.website) {
      toast.success("Message sent! I'll get back to you soon.");
      reset();
      return;
    }

    // Rate limiting — max 3 submissions per 10 minutes
    const now = Date.now();
    const stored: number[] = JSON.parse(localStorage.getItem('contact_submissions') || '[]');
    const recent = stored.filter((t) => now - t < RATE_LIMIT.windowMs);
    if (recent.length >= RATE_LIMIT.max) {
      toast.error("You've sent too many messages. Please wait a few minutes.");
      return;
    }

    setIsSubmitting(true);
    try {
      const webhookUrl = process.env.NEXT_PUBLIC_N8N_CONTACT_WEBHOOK_URL;
      if (!webhookUrl) {
        toast.error('Contact form is not configured yet. Please email me directly.');
        return;
      }

      const { website: _, ...formData } = data;
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to send');

      recent.push(now);
      localStorage.setItem('contact_submissions', JSON.stringify(recent));

      toast.success("Message sent! I'll get back to you soon.");
      reset();
    } catch {
      toast.error('Something went wrong. Please try emailing me directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          {/* Left column — Info + Social */}
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] bg-gradient-to-r from-primary to-[#a0c830] bg-clip-text text-transparent">
              Contact
            </span>
            <h2 className="text-3xl md:text-4xl font-semibold mt-3 mb-4 bg-gradient-to-r from-primary to-[#a0c830] bg-clip-text text-transparent">
              Let&apos;s Build Something Together
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed mb-8">
              Have a workflow to automate, an AI agent to build, or an app idea
              to bring to life? Tell me about your project and I&apos;ll get
              back to you within 24 hours.
            </p>

            <div className="flex gap-3 mb-8">
              <a
                href="https://github.com/jitneyvimsasil"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 text-primary bg-primary/10 rounded-lg hover:bg-primary/20 transition-all duration-200 hover:scale-110"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/jitneyvimsasil/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 text-primary bg-primary/10 rounded-lg hover:bg-primary/20 transition-all duration-200 hover:scale-110"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61587438807218"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 text-primary bg-primary/10 rounded-lg hover:bg-primary/20 transition-all duration-200 hover:scale-110"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://www.threads.com/@jitneeey"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 text-primary bg-primary/10 rounded-lg hover:bg-primary/20 transition-all duration-200 hover:scale-110"
                aria-label="Threads"
              >
                <ThreadsIcon className="w-5 h-5" />
              </a>
              <a
                href="mailto:jitneyvimsasil@gmail.com"
                className="p-3 text-primary bg-primary/10 rounded-lg hover:bg-primary/20 transition-all duration-200 hover:scale-110"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Right column — Form */}
          <div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-5 p-6 rounded-xl bg-gradient-to-br from-[#e0ff4f]/5 to-[#00272b]/10 border border-[#e0ff4f]/20"
            >
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="Your name"
                  aria-invalid={!!errors.name}
                  {...register('name')}
                />
                {errors.name && (
                  <p className="text-xs text-destructive">{errors.name.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  aria-invalid={!!errors.email}
                  {...register('email')}
                />
                {errors.email && (
                  <p className="text-xs text-destructive">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="projectType">Project Type</Label>
                <Select
                  onValueChange={(value) => setValue('projectType', value)}
                >
                  <SelectTrigger className="w-full" aria-invalid={!!errors.projectType}>
                    <SelectValue placeholder="Select a project type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="workflow-automation">
                      Workflow Automation
                    </SelectItem>
                    <SelectItem value="ai-agent">
                      AI Agent / Chatbot
                    </SelectItem>
                    <SelectItem value="web-app">
                      Full-Stack Web App
                    </SelectItem>
                    <SelectItem value="content-automation">
                      Content Automation
                    </SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                {errors.projectType && (
                  <p className="text-xs text-destructive">{errors.projectType.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">
                  Message{' '}
                  <span className="text-muted-foreground font-normal">(optional)</span>
                </Label>
                <Textarea
                  id="message"
                  placeholder="Tell me about your project..."
                  rows={4}
                  maxLength={2000}
                  {...register('message')}
                />
                <div className="flex justify-between">
                  {errors.message ? (
                    <p className="text-xs text-destructive">{errors.message.message}</p>
                  ) : (
                    <span />
                  )}
                  <p className="text-xs text-muted-foreground">
                    {watch('message')?.length || 0}/2000
                  </p>
                </div>
              </div>

              {/* Honeypot — invisible to humans, bots auto-fill it */}
              <input
                type="text"
                {...register('website')}
                className="sr-only"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg font-semibold bg-[#e0ff4f] text-[#00272b] hover:shadow-lg hover:shadow-[#e0ff4f]/30 hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:hover:scale-100 disabled:hover:shadow-none"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
