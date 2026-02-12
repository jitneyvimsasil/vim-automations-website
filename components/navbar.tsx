'use client';

import { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import Link from 'next/link';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem('theme');
      const validTheme = savedTheme === 'dark' ? 'dark' : 'light';
      setTheme(validTheme);
      document.documentElement.classList.toggle('dark', validTheme === 'dark');
    } catch {
      setTheme('light');
    }

    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'border-b border-border bg-background/95 backdrop-blur-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-5 flex justify-between items-center">
        <Link
          href="/"
          className="text-sm font-bold tracking-tight bg-gradient-to-r from-[#e0ff4f] to-[#a0c830] bg-clip-text text-transparent hover:opacity-80 transition-opacity duration-200"
        >
          vim-automations
        </Link>
        <div className="flex items-center gap-6">
          <button
            onClick={() => {
              const el = document.getElementById('projects');
              if (el) {
                el.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="text-sm text-muted-foreground hover:text-[#e0ff4f] transition-colors duration-200"
          >
            Projects
          </button>
          <Link
            href="/blog"
            target="_blank"
            className="text-sm text-muted-foreground hover:text-[#e0ff4f] transition-colors duration-200"
          >
            Blog
          </Link>
          <Link
            href="/about"
            target="_blank"
            className="text-sm text-muted-foreground hover:text-[#e0ff4f] transition-colors duration-200"
          >
            About
          </Link>
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
      </div>
    </nav>
  );
}
