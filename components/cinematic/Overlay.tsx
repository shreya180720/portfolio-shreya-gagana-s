'use client';

import { useState, useEffect } from 'react';
import { motion, useTransform, useMotionValueEvent } from 'framer-motion';
import type { MotionValue } from 'framer-motion';
import VaporizeTextCycle, { Tag } from '@/components/ui/vapour-text-effect';

interface Props {
  scrollYProgress: MotionValue<number>;
}

function useSection(
  progress: MotionValue<number>,
  points: [number, number, number, number],
) {
  const [a, b, c, d] = points;
  const opacity = useTransform(progress, [a, b, c, d], [0, 1, 1, 0]);
  const y       = useTransform(progress, [a, b, c, d], [32, 0, 0, -32]);
  return { opacity, y };
}

export default function Overlay({ scrollYProgress }: Props) {
  const s1 = useSection(scrollYProgress, [0.00, 0.04, 0.17, 0.22]);
  const s2 = useSection(scrollYProgress, [0.26, 0.30, 0.46, 0.51]);
  const s3 = useSection(scrollYProgress, [0.53, 0.57, 0.71, 0.76]);
  const s4 = useSection(scrollYProgress, [0.79, 0.83, 0.95, 1.00]);

  const [vaporStarted, setVaporStarted] = useState(false);

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    if (v > 0.08) setVaporStarted(true);
    else if (v < 0.02) setVaporStarted(false);
  });

  const [nameFontSize, setNameFontSize] = useState('64px');
  useEffect(() => {
    const update = () => {
      const vw = window.innerWidth;
      const size = vw < 640 ? Math.max(28, Math.floor(vw / 11)) : 64;
      setNameFontSize(`${size}px`);
    };
    update();
    window.addEventListener('resize', update, { passive: true });
    return () => window.removeEventListener('resize', update);
  }, []);

  return (
    <div className="absolute inset-0 z-30 pointer-events-none select-none overflow-hidden">

      <motion.div
        style={{ opacity: s1.opacity, y: s1.y }}
        className="absolute inset-0 flex flex-col items-center justify-center text-center px-8"
      >
        <p className="mb-5 text-[9px] tracking-[0.55em] uppercase font-light text-white/40">
          Portfolio
        </p>

        <div className="w-[92vw] max-w-3xl flex items-center justify-center" style={{ height: '140px' }}>
          {vaporStarted ? (
            <VaporizeTextCycle
              texts={['Sri Shreya Danda']}
              font={{
                fontFamily: 'Poppins, sans-serif',
                fontSize:   nameFontSize,
                fontWeight: 900,
              }}
              color="rgb(255, 255, 255)"
              spread={4}
              density={7}
              animation={{ vaporizeDuration: 3.5, fadeInDuration: 1.5, waitDuration: 2.5 }}
              direction="left-to-right"
              alignment="center"
              tag={Tag.H1}
            />
          ) : (
            <h1
              className="font-poppins font-black text-white text-center leading-tight w-full"
              style={{
                fontSize:   nameFontSize,
                textShadow: '0 0 40px rgba(255,255,255,0.12)',
              }}
            >
              Sri Shreya Danda
            </h1>
          )}
        </div>

        <div className="w-10 h-px mb-5 -mt-2" style={{ background: 'rgba(249,115,22,0.5)' }} />

        <p className="text-sm sm:text-base tracking-[0.3em] font-light" style={{ color: 'rgba(253,186,116,0.65)' }}>
          Data Analyst &nbsp;·&nbsp; Business Analyst
        </p>
      </motion.div>

      <motion.div
        style={{ opacity: s2.opacity, y: s2.y }}
        className="absolute inset-0 flex flex-col items-start justify-center px-8 md:px-16 lg:px-24 xl:px-32"
      >
        <h2
          className="font-poppins text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.05] mb-6 max-w-xl"
          style={{ textShadow: '0 0 80px rgba(249,115,22,0.15), 0 2px 30px rgba(0,0,0,0.5)' }}
        >
          I build stories{' '}
          <br />
          <span style={{ color: '#fb923c' }}>from data.</span>
        </h2>
        <p className="text-sm sm:text-base max-w-xs leading-relaxed font-light text-white/40">
          Dashboards, SQL, analytics, and business intelligence shaped into decisions.
        </p>
      </motion.div>

      <motion.div
        style={{ opacity: s3.opacity, y: s3.y }}
        className="absolute inset-0 flex flex-col items-end justify-center px-8 md:px-16 lg:px-24 xl:px-32 text-right"
      >
        <h2
          className="font-poppins text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.05] mb-6 max-w-xl"
          style={{ textShadow: '0 0 80px rgba(249,115,22,0.15), 0 2px 30px rgba(0,0,0,0.5)' }}
        >
          Bridging analysis
          <br />
          <span style={{ color: '#fb923c' }}>and impact.</span>
        </h2>
        <p className="text-sm sm:text-base max-w-xs leading-relaxed font-light text-white/40">
          Turning raw numbers into clarity, strategy, and measurable business value.
        </p>
      </motion.div>

      <motion.div
        style={{ opacity: s4.opacity, y: s4.y }}
        className="absolute inset-0 flex flex-col items-center justify-end pb-24 sm:pb-28 text-center px-8"
      >
        <h2
          className="font-poppins text-2xl sm:text-3xl md:text-4xl font-black text-white text-center leading-tight mb-4"
          style={{ textShadow: '0 0 60px rgba(255,255,255,0.08)' }}
        >
          Welcome to the portfolio.
        </h2>

        <div className="w-10 h-px mb-4" style={{ background: 'rgba(249,115,22,0.4)' }} />

        <p className="text-sm tracking-[0.25em] font-light text-white/30">
          Built with precision.&nbsp;&nbsp;Designed with intent.
        </p>
      </motion.div>
    </div>
  );
}
