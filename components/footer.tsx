import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 px-6">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-xs text-muted-foreground">
          &copy; {currentYear} vim-automations. All rights reserved.
        </p>
        <div className="flex gap-8">
          <Link
            href="/about"
            className="text-xs font-medium text-muted-foreground hover:text-[#e0ff4f] transition-colors duration-200"
          >
            About
          </Link>
          <Link
            href="/blog"
            className="text-xs font-medium text-muted-foreground hover:text-[#e0ff4f] transition-colors duration-200"
          >
            Blog
          </Link>
          <a
            href="#projects"
            className="text-xs font-medium text-muted-foreground hover:text-[#e0ff4f] transition-colors duration-200"
          >
            Projects
          </a>
          <a
            href="#contact"
            className="text-xs font-medium text-muted-foreground hover:text-[#e0ff4f] transition-colors duration-200"
          >
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}
