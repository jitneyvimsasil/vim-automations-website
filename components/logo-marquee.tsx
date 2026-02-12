'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Mail, Facebook } from 'lucide-react';

interface Logo {
  name: string;
  icon: React.ReactNode;
  color: string;
}

const row1Logos: Logo[] = [
  {
    name: 'Anthropic',
    color: '#d4a574',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
        <path d="M17.304 3.541h-3.48l6.696 16.918h3.48L17.304 3.541zM6.696 3.541 0 20.459h3.48l1.374-3.588h7.308l1.374 3.588h3.48L10.32 3.541H6.696zm.342 10.357L9.508 7.53l2.47 6.368H7.038z" />
      </svg>
    ),
  },
  {
    name: 'n8n',
    color: '#ea4b71',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
        <path d="M12.8 3.6a3.6 3.6 0 0 0-3.34 4.94L5.1 12.9a3.56 3.56 0 0 0-1.5-.33 3.6 3.6 0 1 0 3.34 4.94l4.36-4.36a3.56 3.56 0 0 0 3 0l4.36 4.36a3.6 3.6 0 1 0 1.5-2.57l-4.36-4.36a3.56 3.56 0 0 0 0-3l4.36-4.36A3.6 3.6 0 1 0 16.56 3.6a3.56 3.56 0 0 0 .33 1.5L12.53 9.46a3.6 3.6 0 0 0-3.34-4.94 3.56 3.56 0 0 0 3.6-1z" />
      </svg>
    ),
  },
  {
    name: 'Next.js',
    color: 'currentColor',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
        <path d="M11.572 0c-.176.001-.249.002-.352.012C7.505.198 4.101 2.07 1.9 5.118.298 7.37-.413 10.17.192 12.822c.604 2.65 2.283 4.964 4.605 6.333A11.963 11.963 0 0 0 12 21.6c.094 0 .197-.003.297-.007l.098-.004c3.405-.184 6.501-2.03 8.44-5.023l.06-.093c.253-.393.486-.806.699-1.23.057-.116.11-.234.162-.353a12.016 12.016 0 0 0-.657-10.892A12.012 12.012 0 0 0 12.574.002C12.312-.002 12.051 0 11.788 0h-.216zm1.167 2.4c.24-.004.478.003.717.02a9.6 9.6 0 0 1 7.128 4.454 9.612 9.612 0 0 1 .525 8.71c-.04.095-.083.187-.127.28-.17.35-.36.691-.57 1.02l-.048.074c-1.553 2.396-4.032 3.874-6.76 4.026l-.078.004c-.08.003-.163.005-.244.005a9.563 9.563 0 0 1-5.757-1.92l7.26-10.14V15.2l-4.8-7.404V17.5a9.6 9.6 0 0 1-4.45-5.364 9.6 9.6 0 0 1 1.098-7.884 9.6 9.6 0 0 1 5.35-3.724c.237-.056.477-.1.718-.128z" />
      </svg>
    ),
  },
  {
    name: 'React',
    color: '#61dafb',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
        <path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.31 0-.603.064-.862.19-1.14.557-1.496 2.186-.875 4.494.14.528.33 1.08.566 1.647C4.76 8.14 3.98 8.72 3.29 9.34c-1.53 1.375-2.29 2.88-2.29 4.06 0 1.18.76 2.684 2.29 4.06.69.62 1.47 1.2 2.37 1.73-.24.57-.43 1.12-.57 1.65-.62 2.31-.27 3.94.88 4.49.26.13.55.19.86.19 1.35 0 3.11-.95 4.89-2.6 1.78 1.65 3.54 2.6 4.89 2.6.31 0 .6-.06.86-.19 1.14-.55 1.5-2.18.88-4.49-.14-.53-.33-1.08-.57-1.65.9-.53 1.68-1.11 2.37-1.73 1.53-1.38 2.29-2.88 2.29-4.06 0-1.18-.76-2.685-2.29-4.06-.69-.62-1.47-1.2-2.37-1.73.24-.57.43-1.12.57-1.65.62-2.308.27-3.937-.88-4.493-.26-.127-.55-.19-.86-.19zm-.062 1.63c.068 0 .12.01.154.027.47.23.62 1.31.14 3.098-.1.38-.24.78-.4 1.2-.67-.2-1.38-.36-2.12-.49a20.562 20.562 0 0 0-1.48-1.83c1.52-1.42 2.95-2.09 3.71-2z M16.12 12c-.35.6-.73 1.2-1.14 1.77-.53.04-1.07.06-1.62.06s-1.09-.02-1.62-.06c-.41-.57-.79-1.17-1.14-1.77-.35-.6-.67-1.2-.95-1.8.28-.6.6-1.2.95-1.8.35-.6.73-1.2 1.14-1.77.53-.04 1.07-.06 1.62-.06s1.09.02 1.62.06c.41.57.79 1.17 1.14 1.77.35.6.67 1.2.95 1.8-.28.6-.6 1.2-.95 1.8z" />
      </svg>
    ),
  },
  {
    name: 'Tailwind CSS',
    color: '#06b6d4',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
        <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" />
      </svg>
    ),
  },
  {
    name: 'Vercel',
    color: 'currentColor',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
        <path d="M12 1L24 22H0L12 1z" />
      </svg>
    ),
  },
  {
    name: 'Supabase',
    color: '#3ecf8e',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
        <path d="M13.7 21.8c-.4.5-1.3.2-1.3-.5V13h8.6c.9 0 1.4 1 .8 1.7L13.7 21.8zM10.3 2.2c.4-.5 1.3-.2 1.3.5V11H3c-.9 0-1.4-1-.8-1.7L10.3 2.2z" />
      </svg>
    ),
  },
  {
    name: 'Gmail',
    color: '#ea4335',
    icon: <Mail className="w-8 h-8" />,
  },
];

const row2Logos: Logo[] = [
  {
    name: 'Facebook',
    color: '#1877f2',
    icon: <Facebook className="w-8 h-8" />,
  },
  {
    name: 'Tavily',
    color: '#6366f1',
    icon: (
      <span className="w-8 h-8 flex items-center justify-center rounded text-sm font-bold">
        T
      </span>
    ),
  },
  {
    name: 'IFTTT',
    color: 'currentColor',
    icon: (
      <span className="text-base font-black tracking-tight">IFTTT</span>
    ),
  },
  {
    name: 'Pollinations.ai',
    color: '#ec4899',
    icon: (
      <span className="w-8 h-8 flex items-center justify-center text-base font-bold">
        🌸
      </span>
    ),
  },
  {
    name: 'imgbb',
    color: '#0ea5e9',
    icon: (
      <span className="text-base font-bold tracking-tight">img</span>
    ),
  },
  {
    name: 'Railway',
    color: 'currentColor',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
        <path d="M.113 13.54c.157.627.384 1.224.67 1.783h5.05c.19-1.038.308-2.258.337-3.6H.08c0 .615.01 1.22.033 1.817zm9.93-5.416h7.788a11.47 11.47 0 0 0-1.663-2.014c-.753-.116-3.286-.466-6.125-.466-.02.813-.02 1.643 0 2.48zm-3.9 1.785H.415A11.92 11.92 0 0 0 0 11.723h6.17c.027-1.342.085-2.565.163-3.6H.415zM12.627.102c-.204-.03-.41-.053-.617-.072-.47.012-.936.05-1.398.112 0 0-.082.012-.237.042-.076.016-.191.037-.338.07a11.996 11.996 0 0 0-3.108 1.268c2.301.062 4.395.282 5.698.432C13.395 1.13 13.98.43 12.627.102zM6.063 17.108H.997a12.02 12.02 0 0 0 4.7 5.038c-.25-1.556-.485-3.277-.635-5.038zM17.77 8.124h-1.22c.602 1.04 1.059 2.248 1.358 3.6H24c-.083-3.318-2.676-8.66-6.766-10.24.282.717.48 1.565.553 2.578.1 1.373.015 2.753-.018 4.062zm-7.68 15.813a12.109 12.109 0 0 0 1.82.063c.2-.01.399-.028.597-.052 2.277-.361 2.16-1.391 1.55-2.195-.57.012-2.07.036-3.967.036v2.148zm3.967-3.933c1.283.005 2.497-.012 3.484-.04-.006-1.345-.192-3.792-.68-5.84h-2.82c-.032 1.63-.17 3.34-.4 4.933.149.622.306.867.416.947zm.416-7.665c-.347-1.695-.893-3.095-1.594-4.054-1.543-.177-4.165-.478-6.877-.478l-.062.003c-.12 1.026-.206 2.33-.237 3.814h6.252c0-.493.022-.91.057-1.285zm-.057 3.384H8.164c-.034 1.406-.158 2.685-.36 3.73 2.394.017 4.477-.003 5.253-.028.233-1.047.375-2.316.408-3.702h.951z" />
      </svg>
    ),
  },
  {
    name: 'shadcn/ui',
    color: 'currentColor',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-8 h-8">
        <path d="M12 22L2 12 12 2" />
        <path d="M22 22L12 12" />
      </svg>
    ),
  },
  {
    name: 'Motion',
    color: '#f0c000',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
        <circle cx="5" cy="12" r="3" />
        <circle cx="19" cy="12" r="3" opacity="0.4" />
        <circle cx="12" cy="12" r="3" opacity="0.7" />
      </svg>
    ),
  },
];

function MarqueeRow({ logos, reverse = false }: { logos: Logo[]; reverse?: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [contentWidth, setContentWidth] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (containerRef.current) {
      const firstHalf = containerRef.current.children[0] as HTMLElement;
      if (firstHalf) {
        setContentWidth(firstHalf.offsetWidth);
      }
    }
  }, []);

  return (
    <motion.div
      ref={containerRef}
      className="flex w-max"
      animate={
        prefersReducedMotion || contentWidth === 0
          ? {}
          : reverse
            ? { x: [-contentWidth, 0] }
            : { x: [0, -contentWidth] }
      }
      transition={{
        x: {
          repeat: Infinity,
          repeatType: 'loop',
          duration: 35,
          ease: 'linear',
        },
      }}
      whileHover={prefersReducedMotion ? {} : { animationPlayState: 'paused' }}
    >
      {/* First copy */}
      <div className="flex shrink-0 items-center gap-16 px-8">
        {logos.map((logo, i) => (
          <div
            key={`a-${i}`}
            className="flex items-center gap-3 transition-opacity duration-200 hover:opacity-100 opacity-80 shrink-0"
            style={{ color: logo.color === 'currentColor' ? undefined : logo.color }}
          >
            <span className="w-8 h-8 flex items-center justify-center">{logo.icon}</span>
            <span className="text-base font-semibold whitespace-nowrap">{logo.name}</span>
          </div>
        ))}
      </div>
      {/* Duplicate for seamless loop */}
      <div className="flex shrink-0 items-center gap-16 px-8" aria-hidden="true">
        {logos.map((logo, i) => (
          <div
            key={`b-${i}`}
            className="flex items-center gap-3 transition-opacity duration-200 hover:opacity-100 opacity-80 shrink-0"
            style={{ color: logo.color === 'currentColor' ? undefined : logo.color }}
          >
            <span className="w-8 h-8 flex items-center justify-center">{logo.icon}</span>
            <span className="text-base font-semibold whitespace-nowrap">{logo.name}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export function LogoMarquee() {
  return (
    <section className="py-16 px-6 overflow-hidden" aria-label="Technologies used">
      <div className="max-w-5xl mx-auto mb-10">
        <h3 className="text-xs font-bold uppercase tracking-[0.2em] bg-gradient-to-r from-[#e0ff4f] to-[#a0c830] bg-clip-text text-transparent text-center">
          Tools & Technologies
        </h3>
      </div>
      <div className="relative space-y-6">
        {/* Gradient fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[var(--background)] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[var(--background)] to-transparent z-10 pointer-events-none" />

        {/* Row 1: scrolls left */}
        <MarqueeRow logos={row1Logos} />

        {/* Row 2: scrolls right */}
        <MarqueeRow logos={row2Logos} reverse />
      </div>
    </section>
  );
}
