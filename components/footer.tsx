export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 px-6">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-xs text-muted-foreground">
          © {currentYear} vim-automations. All rights reserved.
        </p>
        <div className="flex gap-8">
          <a
            href="#"
            className="text-xs font-medium text-muted-foreground hover:text-blue-400 transition-colors duration-200"
          >
            About
          </a>
          <a
            href="#"
            className="text-xs font-medium text-muted-foreground hover:text-purple-400 transition-colors duration-200"
          >
            Projects
          </a>
          <a
            href="#"
            className="text-xs font-medium text-muted-foreground hover:text-indigo-400 transition-colors duration-200"
          >
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}
