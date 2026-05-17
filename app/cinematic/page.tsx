'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { useScroll, useTransform, motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import ScrollyCanvas from '@/components/cinematic/ScrollyCanvas';
import Overlay from '@/components/cinematic/Overlay';
import CinematicProjects from '@/components/cinematic/CinematicProjects';
import CinematicExperience from '@/components/cinematic/CinematicExperience';
import CinematicSkills from '@/components/cinematic/CinematicSkills';
import CinematicContact from '@/components/cinematic/CinematicContact';

export default function CinematicPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const scrollHintOpacity = useTransform(scrollYProgress, [0, 0.06], [1, 0]);

  return (
    <main style={{ background: '#0e0e0e', minHeight: '100vh' }}>

      <Link
        href="/"
        className="group fixed top-6 left-6 z-[100] flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium tracking-wide"
        style={{
          background: 'rgba(0,0,0,0.55)',
          border: '1px solid rgba(249,115,22,0.18)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          color: 'rgba(253,186,116,0.75)',
          transition: 'border-color 0.3s, color 0.3s, background 0.3s, box-shadow 0.3s',
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLElement;
          el.style.borderColor = 'rgba(249,115,22,0.45)';
          el.style.color = 'rgba(253,186,116,1)';
          el.style.background = 'rgba(0,0,0,0.75)';
          el.style.boxShadow = '0 0 20px rgba(249,115,22,0.12)';
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget as HTMLElement;
          el.style.borderColor = 'rgba(249,115,22,0.18)';
          el.style.color = 'rgba(253,186,116,0.75)';
          el.style.background = 'rgba(0,0,0,0.55)';
          el.style.boxShadow = 'none';
        }}
      >
        <ArrowLeft
          size={14}
          className="transition-transform duration-300 group-hover:-translate-x-0.5"
        />
        Back to Portfolio
      </Link>

      <div ref={containerRef} className="relative" style={{ height: '500vh' }}>
        <div
          className="sticky top-0 w-full overflow-hidden"
          style={{ height: '100vh', background: '#0e0e0e' }}
        >
          <ScrollyCanvas scrollYProgress={scrollYProgress} />
          <Overlay scrollYProgress={scrollYProgress} />

          <div
            className="pointer-events-none absolute inset-0 z-20"
            style={{
              background:
                'radial-gradient(ellipse at center, transparent 28%, rgba(0,0,0,0.60) 100%)',
            }}
          />

          <div
            className="pointer-events-none absolute bottom-0 left-0 right-0 z-20"
            style={{
              height: '120px',
              background: 'linear-gradient(to bottom, transparent, #0e0e0e)',
            }}
          />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.2, duration: 1.2 }}
            style={{ opacity: scrollHintOpacity }}
            className="pointer-events-none absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2"
          >
            <span
              className="text-[9px] tracking-[0.5em] uppercase font-light"
              style={{ color: 'rgba(255,255,255,0.2)' }}
            >
              Scroll
            </span>
            <div
              className="w-px h-8"
              style={{
                background: 'linear-gradient(to bottom, rgba(249,115,22,0.5), transparent)',
              }}
            />
          </motion.div>
        </div>
      </div>

      <CinematicProjects />
      <CinematicExperience />
      <CinematicSkills />
      <CinematicContact />
    </main>
  );
}
