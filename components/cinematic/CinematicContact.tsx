'use client';

import { motion } from 'framer-motion';
import { Mail, Linkedin, Github, MapPin } from 'lucide-react';
import { CinematicHeading } from '@/components/cinematic/CinematicHeading';

const LINKS = [
  {
    label: 'Email',
    href: 'mailto:shreyadanda18@gmail.com',
    display: 'shreyadanda18@gmail.com',
    Icon: Mail,
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/srishreya-danda-2b27141a2/',
    display: 'linkedin.com/in/srishreya-danda',
    Icon: Linkedin,
  },
  {
    label: 'GitHub',
    href: 'https://github.com/shreya180720',
    display: 'github.com/shreya180720',
    Icon: Github,
  },
];

export default function CinematicContact() {
  return (
    <section
      className="relative px-6 pb-0"
      style={{ background: '#0e0e0e' }}
    >
      <div
        className="mx-auto max-w-6xl mb-0"
        style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}
      />

      <div className="mx-auto max-w-6xl py-28 md:py-36">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: '-60px' }}
          className="mb-12 flex justify-center"
        >
          <a
            href="mailto:shreyadanda18@gmail.com"
            className="group inline-flex transition-all duration-300"
            style={{
              padding: '1.5px',
              background: 'linear-gradient(135deg, rgba(249,115,22,0.72) 0%, rgba(249,115,22,0.42) 100%)',
              clipPath: 'polygon(14px 0%, calc(100% - 14px) 0%, 100% 14px, 100% calc(100% - 14px), calc(100% - 14px) 100%, 14px 100%, 0% calc(100% - 14px), 0% 14px)',
              boxShadow: '0 0 32px rgba(249,115,22,0.18)',
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = 'linear-gradient(135deg, rgba(249,115,22,0.95) 0%, rgba(249,115,22,0.72) 100%)';
              el.style.boxShadow = '0 0 52px rgba(249,115,22,0.38)';
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = 'linear-gradient(135deg, rgba(249,115,22,0.72) 0%, rgba(249,115,22,0.42) 100%)';
              el.style.boxShadow = '0 0 32px rgba(249,115,22,0.18)';
            }}
          >
            <span
              className="inline-flex items-center gap-4 px-10 py-4"
              style={{
                background: 'linear-gradient(135deg, rgba(249,115,22,0.07) 0%, rgba(11,5,2,0.97) 100%)',
                backdropFilter: 'blur(14px)',
                WebkitBackdropFilter: 'blur(14px)',
                color: '#fb923c',
              }}
            >
              <span className="text-sm font-semibold tracking-[0.35em] uppercase">
                Open to Work
              </span>
              <span className="text-base leading-none">→</span>
            </span>
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: '-60px' }}
          className="mb-6 max-w-2xl mx-auto"
        >
          <CinematicHeading text="Let's work together." />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: '-60px' }}
          className="text-center text-base md:text-lg mb-16 max-w-lg mx-auto font-light leading-relaxed"
          style={{ color: 'rgba(255,255,255,0.4)' }}
        >
          Looking for full-time Data Analyst or Business Analyst roles.
          Based in Tampa, FL. Open to remote and relocation.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: '-60px' }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          {LINKS.map(({ label, href, display, Icon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('mailto') ? undefined : '_blank'}
              rel={href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
              className="group flex items-center gap-3 rounded-xl px-6 py-3.5 transition-all duration-250"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)',
                border: '1px solid rgba(255,255,255,0.10)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.09)',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = 'rgba(249,115,22,0.35)';
                el.style.background = 'linear-gradient(135deg, rgba(249,115,22,0.14) 0%, rgba(249,115,22,0.04) 100%)';
                el.style.boxShadow = '0 4px 28px rgba(249,115,22,0.18), inset 0 1px 0 rgba(255,255,255,0.12)';
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = 'rgba(255,255,255,0.10)';
                el.style.background = 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)';
                el.style.boxShadow = '0 4px 20px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.09)';
              }}
            >
              <Icon size={15} style={{ color: 'rgba(249,115,22,0.7)', flexShrink: 0 }} />
              <div>
                <p className="text-[10px] tracking-widest uppercase font-light mb-0.5" style={{ color: 'rgba(255,255,255,0.25)' }}>
                  {label}
                </p>
                <p className="text-sm font-medium" style={{ color: 'rgba(255,255,255,0.7)' }}>
                  {display} <span className="text-[10px] ml-0.5" style={{ color: 'rgba(249,115,22,0.5)' }}>↗</span>
                </p>
              </div>
            </a>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.24 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-2 mb-0"
        >
          <MapPin size={12} style={{ color: 'rgba(249,115,22,0.4)' }} />
          <span className="text-xs font-light" style={{ color: 'rgba(255,255,255,0.25)' }}>
            Tampa, FL &nbsp;·&nbsp; Open to remote &amp; relocation
          </span>
        </motion.div>
      </div>

      <footer
        className="border-t"
        style={{ borderColor: 'rgba(255,255,255,0.05)', background: '#0e0e0e' }}
      >
        <div className="mx-auto max-w-6xl px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-poppins font-bold text-lg tracking-tight" style={{ color: 'rgba(255,255,255,0.85)' }}>
            Shreya<span style={{ color: '#fb923c' }}>.</span>
          </span>

          <p className="text-xs text-center font-light" style={{ color: 'rgba(255,255,255,0.2)' }}>
            Sri Shreya Danda &nbsp;·&nbsp; Data Analyst &nbsp;·&nbsp; Tampa, FL
          </p>

          <p className="text-[11px] font-light" style={{ color: 'rgba(255,255,255,0.18)' }}>
            © 2026 All rights reserved.
          </p>
        </div>
      </footer>
    </section>
  );
}
