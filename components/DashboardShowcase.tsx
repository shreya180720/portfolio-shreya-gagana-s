'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const DASHBOARDS = [
  {
    title: 'Revenue Overview',
    purpose: 'Tracks brokerage revenue trends, top clients, and segment performance.',
    image: '/screenshots/dashboard-revenue-overview.png',
  },
  {
    title: 'Trading Behavior',
    purpose: 'Surfaces trade frequency patterns and at-risk client activity signals.',
    image: '/screenshots/dashboard-trading-behavior.png',
  },
  {
    title: 'Client Lifecycle',
    purpose: 'Maps client journey from onboarding to retention and churn risk.',
    image: '/screenshots/dashboard-client-lifecycle.png',
  },
  {
    title: 'Operational Intelligence',
    purpose: 'Monitors settlement delays, compliance flags, and workflow bottlenecks.',
    image: '/screenshots/dashboard-operational-intelligence.png',
  },
];

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 14 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.45, delay },
});

export default function DashboardShowcase() {
  const [featured, ...rest] = DASHBOARDS;

  return (
    <motion.section
      id="dashboards"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
      className="py-20 px-6 bg-transparent dark:bg-[#0f0a03]"
    >
      <div className="max-w-5xl mx-auto">

        <motion.div {...fade()} className="mb-8">
          <p className="font-inter text-xs tracking-widest uppercase text-slate-400 dark:text-[#806040] mb-2">
            Power BI · Aditya Birla Capital
          </p>
          <h2 className="font-poppins font-bold text-2xl text-slate-900 dark:text-[#fef3e2]">
            Dashboards
          </h2>
        </motion.div>

        <motion.div {...fade(0.06)} className="mb-4 group cursor-default">
          <div className="relative w-full aspect-[16/9] bg-slate-200 dark:bg-[#1c1108] rounded-xl overflow-hidden border border-slate-200 dark:border-orange-900/20 mb-3">
            <Image
              src={featured.image}
              alt={featured.title}
              fill
              className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
              sizes="100vw"
            />
          </div>
          <div className="flex items-baseline justify-between">
            <p className="font-inter font-medium text-sm text-slate-900 dark:text-[#fef3e2]">{featured.title}</p>
            <p className="font-inter text-xs text-slate-400 dark:text-[#806040]">{featured.purpose}</p>
          </div>
        </motion.div>

        <div className="grid grid-cols-3 gap-4 mt-4">
          {rest.map((d, i) => (
            <motion.div
              key={d.title}
              {...fade(0.1 + i * 0.06)}
              whileHover={{ y: -5, transition: { type: 'spring', stiffness: 350, damping: 25 } }}
              className="group cursor-default"
            >
              <div className="relative w-full aspect-[4/3] bg-slate-200 dark:bg-[#1c1108] rounded-lg overflow-hidden border border-slate-200 dark:border-orange-900/20 mb-2 transition-shadow duration-300 group-hover:shadow-lg dark:group-hover:shadow-[0_8px_28px_-4px_rgba(249,115,22,0.15)]">
                <Image
                  src={d.image}
                  alt={d.title}
                  fill
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  sizes="33vw"
                />
              </div>
              <p className="font-inter font-medium text-xs text-slate-700 dark:text-[#c4956a]">{d.title}</p>
              <p className="font-inter text-[10px] text-slate-400 dark:text-[#806040] mt-0.5 leading-relaxed">{d.purpose}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </motion.section>
  );
}
