'use client';

import { useState, useEffect } from 'react';
import { Sun, Moon, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState('dark');
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem('theme');
      const validTheme = savedTheme === 'light' ? 'light' : 'dark';
      setTheme(validTheme);
      document.documentElement.classList.remove('dark', 'light');
      document.documentElement.classList.add(validTheme);
    } catch {
      setTheme('dark');
    }

    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.remove('dark', 'light');
    document.documentElement.classList.add(newTheme);
  };

  const scrollToSection = (id: string) => {
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = `/#${id}`;
    }
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled || menuOpen
          ? 'border-b border-border bg-background/95 backdrop-blur-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-5 flex justify-between items-center">
        <Link
          href="/"
          className="relative z-10 flex items-center gap-2 text-sm font-bold tracking-tight hover:opacity-80 transition-opacity duration-200"
        >
          <Image
            src="/vim-automations-logo-1.png"
            alt="vim-automations logo"
            width={28}
            height={28}
            className="rounded-sm"
          />
          <span className="bg-gradient-to-r from-[#e0ff4f] to-[#a0c830] bg-clip-text text-transparent">
            vim-automations
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          <button
            onClick={() => scrollToSection('projects')}
            className="text-sm text-muted-foreground hover:text-[#e0ff4f] transition-colors duration-200"
          >
            Projects
          </button>
          <button
            onClick={() => scrollToSection('services')}
            className="text-sm text-muted-foreground hover:text-[#e0ff4f] transition-colors duration-200"
          >
            Services
          </button>
          <Link
            href="/blog"
            className="text-sm text-muted-foreground hover:text-[#e0ff4f] transition-colors duration-200"
          >
            Blog
          </Link>
          <Link
            href="/about"
            className="text-sm text-muted-foreground hover:text-[#e0ff4f] transition-colors duration-200"
          >
            About
          </Link>
          <button
            onClick={() => scrollToSection('contact')}
            className="px-4 py-1.5 rounded-lg text-sm font-semibold bg-[#e0ff4f] text-[#00272b] hover:shadow-lg hover:shadow-[#e0ff4f]/30 hover:scale-105 transition-all duration-200"
          >
            Get in Touch
          </button>
          <button
            onClick={toggleTheme}
            className="p-2 text-foreground hover:bg-secondary rounded-lg transition-colors duration-200"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? (
              <Moon className="w-4 h-4" />
            ) : (
              <Sun className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* Mobile nav controls */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={toggleTheme}
            className="p-2 text-foreground hover:bg-secondary rounded-lg transition-colors duration-200"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? (
              <Moon className="w-4 h-4" />
            ) : (
              <Sun className="w-4 h-4" />
            )}
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 text-foreground hover:bg-secondary rounded-lg transition-colors duration-200"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            {menuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden border-t border-border bg-background/95 backdrop-blur-sm overflow-hidden"
          >
            <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col gap-4">
              <button
                onClick={() => scrollToSection('projects')}
                className="text-sm text-muted-foreground hover:text-[#e0ff4f] transition-colors duration-200 text-left"
              >
                Projects
              </button>
              <button
                onClick={() => scrollToSection('services')}
                className="text-sm text-muted-foreground hover:text-[#e0ff4f] transition-colors duration-200 text-left"
              >
                Services
              </button>
              <Link
                href="/blog"
                className="text-sm text-muted-foreground hover:text-[#e0ff4f] transition-colors duration-200"
              >
                Blog
              </Link>
              <Link
                href="/about"
                className="text-sm text-muted-foreground hover:text-[#e0ff4f] transition-colors duration-200"
              >
                About
              </Link>
              <button
                onClick={() => scrollToSection('contact')}
                className="w-full mt-2 px-4 py-2 rounded-lg text-sm font-semibold bg-[#e0ff4f] text-[#00272b] hover:shadow-lg hover:shadow-[#e0ff4f]/30 transition-all duration-200 text-center"
              >
                Get in Touch
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
