'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
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
    className: 'left-[4%] top-[4%]',
    bg: '#172554',
    color: 'text-blue-400',
    connector: 'right-[-72px] top-[34px] w-[72px] border-t',
  },
  {
    Icon: BarChart2,
    label: 'Power BI',
    className: 'right-[10%] top-[0%]',
    bg: '#78350f',
    color: 'text-amber-400',
    connector: 'left-[-92px] top-[34px] w-[92px] border-t',
  },
  {
    Icon: Database,
    label: 'SQL',
    className: 'right-[0%] top-[36%]',
    bg: '#0c4a6e',
    color: 'text-cyan-400',
    connector: 'left-[-76px] top-[34px] w-[76px] border-t',
  },
  {
    Icon: Table2,
    label: 'Excel',
    className: 'right-[6%] bottom-[20%]',
    bg: '#14532d',
    color: 'text-green-400',
    connector: 'left-[-80px] top-[34px] w-[80px] border-t',
  },
  {
    Icon: LayoutGrid,
    label: 'Tableau',
    className: 'left-[50%] bottom-[-8%]',
    bg: '#3b0764',
    color: 'text-violet-400',
    connector: 'left-[34px] top-[-72px] h-[72px] border-l',
  },
  {
    Icon: Activity,
    label: 'Analytics',
    className: 'left-[-2%] bottom-[30%]',
    bg: '#500724',
    color: 'text-rose-400',
    connector: 'right-[-76px] top-[34px] w-[76px] border-t',
  },
];

const fadeIn = (delay = 0) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay },
});

export default function Hero() {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section className="relative min-h-screen overflow-hidden px-6 pt-24 pb-16 flex items-center">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 dark:bg-[#080401]" />
        <div className="absolute inset-0 hero-dots opacity-60" />
        <div className="absolute left-[-12%] bottom-[-20%] w-[720px] h-[720px] rounded-full bg-blue-400/10 dark:bg-orange-700/20 blur-[120px]" />
        <div className="absolute right-[-10%] top-[10%] w-[560px] h-[560px] rounded-full bg-violet-400/8 dark:bg-orange-900/15 blur-[110px]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <div className="grid lg:grid-cols-[420px_1fr] xl:grid-cols-[470px_1fr] items-center gap-16 xl:gap-24">

          <motion.div
            initial={{ opacity: 0, scale: 0.86 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.75, ease: 'easeOut' }}
            className="relative flex justify-center lg:justify-start"
          >
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-[340px] lg:h-[340px]">
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

              <div className="absolute inset-0 rounded-full border-[3px] border-blue-400 dark:border-orange-500 shadow-[0_0_70px_rgba(99,102,241,0.40)] dark:shadow-[0_0_70px_rgba(249,115,22,0.45)]" />

              <div className="absolute inset-[4px] overflow-hidden rounded-full">
                <Image
                  src="/images/GaaGa_img2.png"
                  alt="Sri Shreya Danda"
                  fill
                  priority
                  className="object-cover object-top scale-[1.08]"
                />
              </div>
            </div>
          </motion.div>

          <div className="relative min-h-[560px] flex items-center justify-center lg:justify-start">

            <div className="hidden xl:block absolute inset-0 pointer-events-none">
              {BADGES.map(({ Icon, label, className, bg, color, connector }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.45, delay: 0.4 + i * 0.12 }}
                  className={`absolute ${className}`}
                >
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 3 + i * 0.15, repeat: Infinity, ease: 'easeInOut' }}
                    className="relative flex flex-col items-center gap-2"
                  >
                    <span
                      className={`absolute ${connector} border-dashed border-blue-400/45 dark:border-orange-500/45`}
                    />
                    <div
                      className="relative z-10 w-16 h-16 rounded-2xl flex items-center justify-center border border-blue-500/20 dark:border-orange-500/25 shadow-[0_0_28px_rgba(99,102,241,0.18)] dark:shadow-[0_0_28px_rgba(249,115,22,0.16)]"
                      style={{ backgroundColor: bg }}
                    >
                      <Icon size={25} className={color} />
                    </div>
                    <span className="text-xs text-slate-500 dark:text-orange-100/80 font-medium">{label}</span>
                  </motion.div>
                </motion.div>
              ))}
            </div>

            <div className="relative z-10 w-full max-w-[560px] lg:ml-10 xl:ml-24 text-center lg:text-left">
              <motion.div {...fadeIn(0)} className="mb-5">
                <span className="inline-flex rounded-full border border-blue-400/50 dark:border-orange-500/50 bg-white/80 dark:bg-[#160a04]/80 px-4 py-1.5 text-sm text-blue-600 dark:text-orange-300">
                  Data Analyst · Tampa, FL · Available
                </span>
              </motion.div>

              <motion.h1
                {...fadeIn(0.08)}
                className="mb-4 font-poppins text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.02] tracking-tight"
              >
                <span className="gradient-text">Sri Shreya Danda</span>
              </motion.h1>

              <motion.p {...fadeIn(0.16)} className="mb-5 text-2xl font-semibold text-blue-600 dark:text-orange-400">
                Data Analyst &amp; Business Analyst
              </motion.p>

              <motion.p {...fadeIn(0.22)} className="mb-4 max-w-xl text-lg leading-relaxed text-slate-500 dark:text-orange-100/75">
                4 years across financial services, healthcare, and retail analytics.
              </motion.p>

              <motion.p {...fadeIn(0.28)} className="mb-9 text-lg text-slate-400 dark:text-orange-200/75">
                SQL · Python · Power BI · Financial Analytics
              </motion.p>

              <motion.div {...fadeIn(0.36)} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
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
