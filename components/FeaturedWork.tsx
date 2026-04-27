'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const OUTCOMES = [
  { stat: '72%', label: 'Revenue from top 20% of clients - identified and mapped to retention strategy' },
  { stat: '18%', label: 'Drop in client churn after outreach campaigns built on the churn signal model' },
  { stat: '91%', label: 'Forecast accuracy across 6-month rolling revenue windows' },
  { stat: '23%', label: 'Of all accounts flagged at-risk using trading inactivity and frequency signals' },
];

const TECH = ['SQL', 'Python', 'Power BI', 'DAX', 'Excel'];

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 14 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.45, delay },
});

export default function FeaturedWork() {
  return (
    <motion.section
      id="featured-work"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
      className="py-20 px-6 bg-transparent dark:bg-[#1c1108]"
    >
      <div className="max-w-5xl mx-auto">

        <motion.div {...fade()} className="mb-8">
          <p className="font-inter text-xs tracking-widest uppercase text-slate-400 dark:text-[#806040] mb-3">
            Case Study · Aditya Birla Capital, 2020–2022
          </p>
          <h2 className="font-poppins font-bold text-3xl sm:text-4xl text-slate-900 dark:text-[#fef3e2] leading-tight">
            Brokerage Revenue<br className="hidden sm:block" /> Intelligence Platform
          </h2>
        </motion.div>

        <motion.div
          {...fade(0.06)}
          className="relative w-full aspect-[16/8] bg-slate-100 dark:bg-[#251a09] rounded-xl overflow-hidden mb-10 border border-slate-200 dark:border-orange-900/20"
        >
          <Image
            src="/screenshots/dashboard-revenue-overview.png"
            alt="Brokerage Revenue Intelligence Dashboard"
            fill
            className="object-cover object-top"
            sizes="(max-width: 1024px) 100vw, 1024px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </motion.div>

        <div className="grid md:grid-cols-[1fr_260px] gap-12">

          <motion.div {...fade(0.1)}>
            <p className="font-inter text-sm text-slate-600 dark:text-[#c4956a] leading-relaxed mb-5">
              Aditya Birla Capital needed visibility into which clients were driving revenue, which showed early churn signals, and where settlement bottlenecks were building up. The data lived across five disconnected systems - trade logs, CRM, compliance records - with no unified view.
            </p>
            <p className="font-inter text-sm text-slate-600 dark:text-[#c4956a] leading-relaxed mb-5">
              I built four Power BI dashboards covering revenue performance, trading behavior, client lifecycle, and operational risk across 10,000+ accounts. The first two weeks were entirely SQL - pulling from five source systems into a single schema. The churn signal model ran on a 90-day look-back window, flagging accounts by declining trade frequency and rising support ticket volume.
            </p>
            <p className="font-inter text-sm text-slate-500 dark:text-[#a07850] leading-relaxed">
              The retention team built outreach campaigns directly on top of the at-risk segmentation. Finance adopted the 6-month rolling forecast for quarterly planning, replacing a manual Excel model that took two analysts a week to refresh.
            </p>

            <div className="mt-8 pt-6 border-t border-slate-100 dark:border-orange-900/20 flex flex-wrap items-center gap-x-4 gap-y-2">
              <span className="font-inter text-xs text-slate-400 dark:text-[#806040]">
                {TECH.join(' · ')}
              </span>
              <span className="text-slate-200 dark:text-orange-900/40 hidden sm:inline">·</span>
              <a
                href="https://github.com/shreya180720/trading-brokerage-revenue-intelligence"
                target="_blank"
                rel="noopener noreferrer"
                className="font-inter text-xs text-slate-400 dark:text-[#806040] hover:text-blue-500 dark:hover:text-orange-400 transition-colors"
              >
                GitHub ↗
              </a>
            </div>
          </motion.div>

          <motion.div {...fade(0.14)}>
            <p className="font-inter text-xs tracking-widest uppercase text-slate-400 dark:text-[#806040] mb-5">
              Outcomes
            </p>
            <div className="space-y-0">
              {OUTCOMES.map((o, i) => (
                <motion.div
                  key={o.stat}
                  whileHover={{ x: 4, transition: { type: 'spring', stiffness: 300, damping: 25 } }}
                  className={`py-5 cursor-default ${i < OUTCOMES.length - 1 ? 'border-b border-slate-100 dark:border-orange-900/20' : ''}`}
                >
                  <div className="font-poppins font-bold text-2xl text-blue-600 dark:text-orange-400 mb-1">
                    {o.stat}
                  </div>
                  <div className="font-inter text-xs text-slate-500 dark:text-[#a07850] leading-relaxed">
                    {o.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </motion.section>
  );
}
