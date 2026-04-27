'use client';

import { useState, useEffect, useRef } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';

const NAV_LINKS = [
  { href: '#featured-work', label: 'Work' },
  { href: '#dashboards', label: 'Dashboards' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#insights', label: 'Insights' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const logoClickCount = useRef(0);
  const logoClickTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (href: string) => {
    setOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const isDark = resolvedTheme === 'dark';

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/50 dark:bg-[#1c1108]/80 backdrop-blur-md border-b border-slate-200/40 dark:border-orange-900/30 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <button
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            logoClickCount.current += 1;
            if (logoClickTimer.current) clearTimeout(logoClickTimer.current);
            logoClickTimer.current = setTimeout(() => { logoClickCount.current = 0; }, 800);
            if (logoClickCount.current >= 5) {
              logoClickCount.current = 0;
              window.dispatchEvent(new CustomEvent('header-tap'));
            }
          }}
          className="font-poppins font-bold text-lg text-slate-900 dark:text-[#fef3e2] tracking-tight"
        >
          Shreya<span className="text-blue-500 dark:text-orange-400">.</span>
        </button>

        <nav className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map((l) => (
            <button
              key={l.href}
              onClick={() => scrollTo(l.href)}
              className="font-inter text-sm text-slate-500 dark:text-[#a07850] hover:text-slate-900 dark:hover:text-[#fef3e2] transition-colors duration-200"
            >
              {l.label}
            </button>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          {mounted && (
            <button
              onClick={() => setTheme(isDark ? 'light' : 'dark')}
              className="p-2 rounded-lg text-slate-500 dark:text-[#a07850] hover:text-slate-900 dark:hover:text-[#fef3e2] hover:bg-slate-100 dark:hover:bg-[#2a1a0a] transition-colors"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun size={17} /> : <Moon size={17} />}
            </button>
          )}
          <a
            href="mailto:shreyadanda18@gmail.com"
            className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-inter font-medium text-white bg-blue-600 dark:bg-orange-500 hover:bg-blue-500 dark:hover:bg-orange-400 transition-colors"
          >
            Hire Me
          </a>
        </div>

        <div className="md:hidden flex items-center gap-2">
          {mounted && (
            <button
              onClick={() => setTheme(isDark ? 'light' : 'dark')}
              className="p-2 rounded-lg text-slate-500 dark:text-[#a07850] hover:bg-slate-100 dark:hover:bg-[#2a1a0a] transition-colors"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun size={17} /> : <Moon size={17} />}
            </button>
          )}
          <button
            onClick={() => setOpen(!open)}
            className="text-slate-500 dark:text-[#a07850] hover:text-slate-900 dark:hover:text-[#fef3e2] transition-colors"
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-white/60 dark:bg-[#1c1108]/90 backdrop-blur-md border-t border-slate-200/40 dark:border-orange-900/30 px-6 py-5">
          <nav className="flex flex-col gap-4">
            {NAV_LINKS.map((l) => (
              <button
                key={l.href}
                onClick={() => scrollTo(l.href)}
                className="text-left font-inter text-sm text-slate-500 dark:text-[#a07850] hover:text-slate-900 dark:hover:text-[#fef3e2] transition-colors"
              >
                {l.label}
              </button>
            ))}
            <a
              href="mailto:danda108@usf.edu"
              className="mt-1 px-4 py-2.5 rounded-lg text-sm font-inter font-medium text-white text-center bg-blue-600 dark:bg-orange-500"
            >
              Hire Me
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
