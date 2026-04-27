
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import {
  ArrowRight,
  Download,
  BarChart2,
  Database,
  Activity,
  Table2,
  Code2,
  LayoutGrid,
  Briefcase,
  TrendingUp,
  Target,
  Clock,
} from 'lucide-react';

const STATS = [
  { Icon: Briefcase, value: '4+',  label: 'Years of Data Analytics Experience' },
  { Icon: TrendingUp, value: '35%', label: 'Operational Efficiency Boost' },
  { Icon: Clock,     value: '22%', label: 'Reduction in Issue Resolution Time' },
  { Icon: Target,    value: '30%', label: 'Manual Reporting Eliminated' },
];

const BADGES = [
  {
    Icon: Code2,
    label: 'Python',
    bg: '#172554',
    color: 'text-blue-400',
    glow: 'rgba(59,130,246,0.62)',
  },
  {
    Icon: BarChart2,
    label: 'Power BI',
    bg: '#78350f',
    color: 'text-amber-400',
    glow: 'rgba(245,158,11,0.66)',
  },
  {
    Icon: Database,
    label: 'SQL',
    bg: '#0c4a6e',
    color: 'text-cyan-400',
    glow: 'rgba(6,182,212,0.66)',
  },
  {
    Icon: Table2,
    label: 'Excel',
    bg: '#14532d',
    color: 'text-green-400',
    glow: 'rgba(34,197,94,0.64)',
  },
  {
    Icon: LayoutGrid,
    label: 'Tableau',
    bg: '#3b0764',
    color: 'text-violet-400',
    glow: 'rgba(168,85,247,0.68)',
  },
  {
    Icon: Activity,
    label: 'Analytics',
    bg: '#500724',
    color: 'text-rose-400',
    glow: 'rgba(244,63,94,0.64)',
  },
];

const BADGE_SIZE = 64;
const BADGE_LABEL_WIDTH = 104;

const BADGE_POSITIONS = [
  { x: 64, y: 58 },
  { x: 648, y: 58 },
  { x: 740, y: 230 },
  { x: 680, y: 408 },
  { x: 390, y: 516 },
  { x: 52, y: 396 },
];

const fadeIn = (delay = 0) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay },
});

function HeroOrbit() {
  return (
    <div className="pointer-events-none absolute left-1/2 top-1/2 hidden h-[540px] w-[760px] -translate-x-1/2 -translate-y-1/2 xl:block">
      <svg
        className="absolute inset-0 z-0 h-full w-full overflow-visible text-blue-500 dark:text-orange-500"
        viewBox="0 0 760 540"
        aria-hidden="true"
      >
        <defs>
          <filter id="hero-orbit-glow" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="hero-dot-glow" x="-120%" y="-120%" width="340%" height="340%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="hero-orbit-fade" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.26" />
            <stop offset="18%" stopColor="currentColor" stopOpacity="0.78" />
            <stop offset="76%" stopColor="currentColor" stopOpacity="0.82" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0.36" />
          </linearGradient>
        </defs>

        <motion.path
          d="M 64 76 C 158 76 198 132 300 126 C 420 118 516 68 648 78 C 748 86 786 166 764 252 C 744 332 716 398 648 438 C 568 485 470 506 390 504 C 268 501 152 470 52 412 C 2 382 30 306 104 276 C 178 247 255 250 322 242"
          fill="none"
          stroke="url(#hero-orbit-fade)"
          strokeWidth="1.65"
          strokeLinecap="round"
          strokeDasharray="3.5 10"
          animate={{ strokeDashoffset: [0, -64] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          className="hero-orbit-path opacity-75"
        />

        {[
          [64, 76],
          [300, 126],
          [648, 78],
          [764, 252],
          [648, 438],
          [390, 504],
          [52, 412],
          [104, 276],
        ].map(([cx, cy], index) => (
          <motion.circle
            key={`${cx}-${cy}`}
            cx={cx}
            cy={cy}
            r={index === 0 || index === 6 ? 6.5 : 4.5}
            className="hero-orbit-dot fill-blue-500 dark:fill-orange-500"
            initial={{ opacity: 0, scale: 0.55 }}
            animate={{ opacity: 1, scale: [0.9, 1.18, 0.9] }}
            transition={{
              opacity: { duration: 0.35, delay: index * 0.08 },
              scale: { duration: 2.6, delay: index * 0.18, repeat: Infinity, ease: 'easeInOut' },
            }}
          />
        ))}
      </svg>

      {BADGES.map(({ Icon, label, bg, color, glow }, i) => (
        <motion.div
          key={label}
          initial={{ opacity: 0, scale: 0.72, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: [-6, 6, -6] }}
          transition={{
            opacity: { duration: 0.45, delay: 0.35 + i * 0.1 },
            scale: { duration: 0.45, delay: 0.35 + i * 0.1 },
            y: { duration: 4 + i * 0.22, repeat: Infinity, ease: 'easeInOut' },
          }}
          className="absolute z-20 flex flex-col items-center gap-3"
          style={{
            left: BADGE_POSITIONS[i].x,
            top: BADGE_POSITIONS[i].y,
            width: BADGE_LABEL_WIDTH,
            marginLeft: -BADGE_LABEL_WIDTH / 2,
            marginTop: -44,
          }}
        >
          <div
            className="relative flex items-center justify-center rounded-2xl border border-blue-400/35 shadow-[0_0_24px_rgba(37,99,235,0.2)] dark:border-orange-400/35 dark:shadow-[0_0_28px_rgba(249,115,22,0.28)]"
            style={{
              width: BADGE_SIZE,
              height: BADGE_SIZE,
              backgroundColor: bg,
              boxShadow: `0 0 18px ${glow}, inset 0 0 18px ${glow.replace('0.', '0.2')}`,
            }}
          >
            <Icon size={25} className={color} />
          </div>
          <span className="text-xs font-semibold text-slate-500 dark:text-orange-100/80">{label}</span>
        </motion.div>
      ))}
    </div>
  );
}

export default function Hero() {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
    setIsDesktop(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], ['12deg', '-12deg']), { stiffness: 350, damping: 28 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], ['-12deg', '12deg']), { stiffness: 350, damping: 28 });

  function handleImageMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent<HTMLDivElement>) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    mouseX.set((clientX - left) / width - 0.5);
    mouseY.set((clientY - top) / height - 0.5);
  }

  function handleImageMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <section className="relative min-h-screen overflow-hidden px-6 pt-24 pb-16 flex items-center">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 dark:bg-[#080401]" />
        <div className="absolute inset-0 hero-dots opacity-60" />
        <div className="absolute left-[-12%] bottom-[-20%] w-[720px] h-[720px] rounded-full bg-blue-400/10 dark:bg-orange-700/20 blur-[120px]" />
        <div className="absolute right-[-10%] top-[10%] w-[560px] h-[560px] rounded-full bg-violet-400/8 dark:bg-orange-900/15 blur-[110px]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <div className="relative z-10 grid lg:grid-cols-[390px_1fr] xl:grid-cols-[430px_1fr] items-center gap-12 xl:gap-20">

          <motion.div
            initial={{ opacity: 0, scale: 0.86 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.75, ease: 'easeOut' }}
            style={isDesktop ? { perspective: '1200px' } : undefined}
            className="relative flex justify-center lg:justify-start lg:-translate-x-10 xl:-translate-x-16"
            onMouseMove={isDesktop ? handleImageMouseMove : undefined}
            onMouseLeave={isDesktop ? handleImageMouseLeave : undefined}
          >
            <motion.div
              style={isDesktop ? { rotateX, rotateY, transformStyle: 'preserve-3d' } : undefined}
              whileHover={isDesktop ? { scale: 1.05 } : undefined}
              transition={{ type: 'spring', stiffness: 350, damping: 28 }}
              className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-[305px] lg:h-[305px] xl:w-[340px] xl:h-[340px] group cursor-default"
            >
              {isDesktop && (
                <div className="profile-spin-ring absolute inset-[-12px] rounded-full border-2 border-dashed border-blue-400/60 dark:border-orange-500/60 pointer-events-none" />
              )}

              <svg
                className="absolute inset-0 text-blue-500 dark:text-orange-500 pointer-events-none"
                style={{ overflow: 'visible' }}
                viewBox="0 0 340 340"
              >
                <line x1="265" y1="35" x2="390" y2="-45" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.75" />
                <circle cx="390" cy="-45" r="6" fill="currentColor" />
                <line x1="70" y1="295" x2="-70" y2="390" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.75" />
                <circle cx="-70" cy="390" r="6" fill="currentColor" />
              </svg>

              <div className={`absolute inset-0 rounded-full border-[3px] border-blue-400 dark:border-orange-500
                shadow-[0_0_70px_rgba(99,102,241,0.40)] dark:shadow-[0_0_70px_rgba(249,115,22,0.45)]
                pointer-events-none${isDesktop ? ' group-hover:shadow-[0_0_130px_rgba(99,102,241,0.72)] dark:group-hover:shadow-[0_0_130px_rgba(249,115,22,0.78)] transition-shadow duration-500' : ''}`} />

              <div className="absolute inset-[4px] overflow-hidden rounded-full">
                <Image
                  src="/images/GaaGa_img2.png"
                  alt="Sri Shreya Danda"
                  fill
                  priority
                  className={`object-cover object-top scale-[1.08]${isDesktop ? ' group-hover:scale-[1.15] transition-transform duration-500 ease-out' : ''}`}
                />
                {isDesktop && <div className="profile-shimmer absolute inset-0 pointer-events-none" />}
              </div>
            </motion.div>
          </motion.div>

          <div className="relative min-h-[560px] flex items-center justify-center lg:justify-start">

            {isDesktop && <HeroOrbit />}

            <div className="relative z-10 mx-auto w-full max-w-[600px] text-center">
              <motion.div {...fadeIn(0)} className="mb-5">
                <span className="inline-flex rounded-full border border-blue-400/50 dark:border-orange-500/50 bg-white/80 dark:bg-[#160a04]/80 px-4 py-1.5 text-sm text-blue-600 dark:text-orange-300">
                  Data Analyst · Tampa, FL · Available
                </span>
              </motion.div>

              <motion.h1
                {...fadeIn(0.08)}
                className="mb-4 font-poppins text-5xl sm:text-6xl lg:text-[50px] xl:text-[56px] font-black leading-[1.02] tracking-tight"
              >
                <span className="gradient-text lg:whitespace-nowrap">Sri Shreya Danda</span>
              </motion.h1>

              <motion.p {...fadeIn(0.16)} className="mb-5 text-2xl font-semibold text-blue-600 dark:text-orange-400">
                Data Analyst &amp; Business Analyst
              </motion.p>

              <motion.p {...fadeIn(0.22)} className="mx-auto mb-4 max-w-xl text-lg leading-relaxed text-slate-500 dark:text-orange-100/75">
                4 years across financial services, healthcare, and retail analytics.
              </motion.p>

              <motion.p {...fadeIn(0.28)} className="mb-9 text-lg text-slate-400 dark:text-orange-200/75">
                SQL · Python · Power BI · Financial Analytics
              </motion.p>

              <motion.div {...fadeIn(0.36)} className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => scrollTo('projects')}
                  className="group flex items-center justify-center gap-2 rounded-xl bg-blue-600 dark:bg-orange-500 px-8 py-4 text-base font-semibold text-white shadow-[0_0_28px_rgba(37,99,235,0.30)] dark:shadow-[0_0_28px_rgba(249,115,22,0.32)] transition hover:bg-blue-500 dark:hover:bg-orange-400"
                >
                  View Projects
                  <ArrowRight size={18} className="transition group-hover:translate-x-1" />
                </button>

                <a
                  href="/resume/shreya_resume_DAgt.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-xl border border-blue-200 dark:border-orange-500/40 bg-white/80 dark:bg-[#150904]/70 px-8 py-4 text-base font-semibold text-blue-600 dark:text-orange-300 transition hover:border-blue-400 dark:hover:border-orange-400 hover:text-blue-700 dark:hover:text-orange-200"
                >
                  <Download size={18} />
                  Download Resume
                </a>
              </motion.div>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.55 }}
          className="mt-14 rounded-2xl border border-blue-200 dark:border-orange-500/25 bg-white/70 dark:bg-[#0f0703]/70 px-8 py-7 shadow-sm dark:shadow-[0_0_40px_rgba(249,115,22,0.08)]"
        >
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {STATS.map(({ Icon, value, label }) => (
              <div key={label} className="flex items-center justify-center gap-4 border-blue-100 dark:border-orange-500/20 md:border-r last:border-r-0">
                <Icon size={34} className="text-blue-500 dark:text-orange-500" />
                <div>
                  <div className="text-3xl font-black text-blue-600 dark:text-orange-500">{value}</div>
                  <div className="text-sm text-slate-500 dark:text-orange-100/70">{label}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
