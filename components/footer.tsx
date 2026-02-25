import Link from 'next/link';
import Image from 'next/image';
import { Github, Linkedin, Facebook, Mail } from 'lucide-react';

function ThreadsIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.783 3.631 2.698 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.29 3.275-1.908 2.37-5.517 2.565-7.465 1.635-1.127-.538-2.04-1.547-2.422-2.792-.566-1.84.098-3.782 1.741-5.098 1.188-.952 2.723-1.467 4.456-1.498.988-.018 1.873.1 2.655.352-.083-.984-.42-1.746-.99-2.267-.756-.695-1.896-1.055-3.388-1.07h-.058c-1.174.01-2.146.305-2.894.882l-1.252-1.64C7.835 3.592 9.27 3.13 10.975 3.108h.073c1.984.02 3.557.548 4.672 1.573.918.845 1.473 1.983 1.664 3.39.694.3 1.324.675 1.88 1.123 1.268 1.024 2.093 2.4 2.386 3.975.36 1.935.034 4.078-1.453 5.618C18.406 20.627 16.12 21.472 12.99 21.5h-.192c-3.138-.038-5.564-.91-7.213-2.596l1.437-1.437c1.28 1.312 3.26 1.996 5.887 2.033 2.668-.024 4.493-.664 5.745-2.013 1.047-1.127 1.133-2.494.883-3.533-.144-.6-.423-1.14-.814-1.606-.837 3.506-3.525 4.655-5.891 4.655-.084 0-.168-.001-.252-.004-1.97-.06-3.598-.776-4.466-1.96-.598-.815-.842-1.808-.68-2.74.272-1.563 1.625-2.878 3.578-3.303.812-.177 1.778-.24 2.783-.142.7.069 1.36.2 1.977.392v-.084c-.012-1.225-.27-2.15-.784-2.766-.62-.743-1.6-1.134-2.838-1.15h-.048c-.977.01-1.765.257-2.34.737l-1.252-1.639c.96-.757 2.206-1.15 3.62-1.173h.058c1.716.021 3.068.497 4.02 1.413.81.778 1.31 1.844 1.503 3.191.648.275 1.236.627 1.752 1.046 1.202.978 1.983 2.27 2.26 3.742.34 1.805.04 3.778-1.347 5.207-1.606 1.654-3.778 2.483-6.461 2.467h-.124zM8.684 16.965c.552.754 1.564 1.202 2.755 1.238 2.363.072 3.94-.876 4.64-2.786-.9-.428-1.944-.66-3.104-.694-1.337-.004-2.484.324-3.33.95-.66.49-.992 1.1-1.092 1.678-.048.276.02.558.13.614z" />
    </svg>
  );
}

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/#projects', label: 'Projects' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'About' },
  { href: '/#contact', label: 'Contact' },
];

const socialLinks = [
  { href: 'https://github.com/jitneyvimsasil', icon: Github, label: 'GitHub' },
  { href: 'https://www.linkedin.com/in/jitneyvimsasil/', icon: Linkedin, label: 'LinkedIn' },
  { href: 'https://www.facebook.com/profile.php?id=61587438807218', icon: Facebook, label: 'Facebook' },
  { href: 'https://www.threads.com/@jitneeey', icon: ThreadsIcon, label: 'Threads' },
  { href: 'mailto:jitneyvimsasil@gmail.com', icon: Mail, label: 'Email' },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-card/50">
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-3">
              <Image
                src="/vim-automations-logo-1.png"
                alt="vim-automations logo"
                width={24}
                height={24}
                className="rounded-sm"
              />
              <span className="font-bold bg-gradient-to-r from-[#e0ff4f] to-[#a0c830] bg-clip-text text-transparent">
                vim-automations
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Building intelligent automation solutions &mdash; n8n workflows,
              AI agents, and production web apps.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">Navigation</h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-[#e0ff4f] transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">Connect</h4>
            <div className="flex gap-2 mb-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target={social.href.startsWith('mailto') ? undefined : '_blank'}
                    rel={social.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                    className="p-2 text-muted-foreground hover:text-[#e0ff4f] transition-colors duration-200"
                    aria-label={social.label}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
            <a
              href="mailto:jitneyvimsasil@gmail.com"
              className="text-sm text-muted-foreground hover:text-[#e0ff4f] transition-colors duration-200"
            >
              jitneyvimsasil@gmail.com
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-border/50 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            &copy; {currentYear} vim-automations. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Built with Next.js, Tailwind CSS, and too much coffee.
          </p>
        </div>
      </div>
    </footer>
  );
}
