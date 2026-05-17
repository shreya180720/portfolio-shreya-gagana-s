'use client';

import { motion } from 'framer-motion';
import { CinematicHeading } from '@/components/cinematic/CinematicHeading';

const STANDARD_PROJECTS = [
  {
    index: '01',
    title: 'A/B Testing Framework',
    metric: '22% CTR lift',
    context: 'Centene Corporation',
    description:
      'Statistical testing infrastructure for healthcare member engagement at Centene. Automated thresholds, report generation, and documented methodology reused across teams.',
    tags: ['Python', 'Pandas', 'NumPy', 'SQL'],
    github: 'https://github.com/shreya180720/a-b-testing-framework',
  },
  {
    index: '02',
    title: 'Sales Forecasting Model',
    metric: '91% accuracy',
    context: 'Aditya Birla Capital',
    description:
      '6-month rolling revenue forecast using regression and time-series methods. Automated monthly refresh replaced a two-analyst-week manual Excel process.',
    tags: ['Python', 'Scikit-learn', 'Power BI'],
    github: 'https://github.com/shreya180720/sales-forecasting-model',
  },
  {
    index: '03',
    title: 'Healthcare Data ETL Pipeline',
    metric: '95% faster',
    context: 'Centene Corporation',
    description:
      'Automated claims reconciliation across 500K+ records from 5 disparate systems. Eliminated manual data handoffs and reduced downstream reporting errors.',
    tags: ['Python', 'SQL', 'AWS', 'Pandas'],
    github: 'https://github.com/shreya180720/healthcare-data-etl-pipeline',
  },
];

const BROKERAGE_OUTCOMES = [
  { stat: '72%', label: 'Revenue from top 20% of clients — identified and mapped to retention strategy' },
  { stat: '18%', label: 'Drop in client churn after outreach campaigns built on the churn signal model' },
  { stat: '91%', label: 'Forecast accuracy across 6-month rolling revenue windows' },
  { stat: '23%', label: 'Of all accounts flagged at-risk using trading inactivity and frequency signals' },
];

const CARD_GLASS = {
  background: 'rgba(255,255,255,0.025)',
  border: '1px solid rgba(255,255,255,0.055)',
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
} as const;

const TAG_STYLE = {
  background: 'rgba(249,115,22,0.07)',
  border: '1px solid rgba(249,115,22,0.14)',
  color: 'rgba(253,186,116,0.6)',
} as const;

export default function CinematicProjects() {
  return (
    <section className="relative px-6 py-28 md:py-36" style={{ background: '#0e0e0e' }}>

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true, margin: '-80px' }}
        className="mx-auto max-w-6xl mb-20 text-center"
      >
        <p className="mb-4 text-[9px] tracking-[0.55em] uppercase font-light text-white/40">
          Case Studies
        </p>
        <CinematicHeading text="Selected Work" />
      </motion.div>

      <div className="mx-auto max-w-6xl space-y-4">

        <div className="grid gap-4 md:grid-cols-3">
          {STANDARD_PROJECTS.map((p, i) => (
            <motion.article
              key={p.title}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true, margin: '-60px' }}
              whileHover={{ y: -5, transition: { duration: 0.22, ease: 'easeOut' } }}
              className="group relative rounded-2xl p-6 cursor-default"
              style={CARD_GLASS}
            >
              <div
                className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ boxShadow: '0 0 0 1px rgba(249,115,22,0.2), 0 0 40px rgba(249,115,22,0.06) inset' }}
              />

              <span className="mb-4 block text-[10px] tracking-[0.45em] font-light"
                style={{ color: 'rgba(249,115,22,0.35)' }}>
                {p.index}
              </span>

              <div className="flex items-start justify-between gap-3 mb-3">
                <h3 className="font-poppins text-base font-bold text-white leading-snug group-hover:text-orange-50 transition-colors duration-300">
                  {p.title}
                </h3>
                <span className="flex-shrink-0 text-xs font-bold" style={{ color: '#fb923c' }}>
                  {p.metric}
                </span>
              </div>

              <a
                href={p.github}
                target="_blank"
                rel="noopener noreferrer"
                className="mb-4 inline-flex items-center gap-1 text-[11px] transition-colors duration-200"
                style={{ color: 'rgba(253,186,116,0.4)' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'rgba(253,186,116,0.8)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(253,186,116,0.4)')}
              >
                GitHub ↗
              </a>

              <p className="text-sm leading-relaxed mb-5 font-light" style={{ color: 'rgba(255,255,255,0.36)' }}>
                {p.description}
              </p>

              <div className="flex flex-wrap gap-1.5 mb-3">
                {p.tags.map(tag => (
                  <span key={tag} className="rounded-full px-2.5 py-0.5 text-[10px] tracking-wide" style={TAG_STYLE}>
                    {tag}
                  </span>
                ))}
              </div>
              <p className="text-[10px]" style={{ color: 'rgba(255,255,255,0.2)' }}>{p.context}</p>

              <div
                className="pointer-events-none absolute bottom-0 left-6 right-6 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: 'linear-gradient(to right, transparent, rgba(249,115,22,0.3), transparent)' }}
              />
            </motion.article>
          ))}
        </div>

        <motion.article
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: '-60px' }}
          whileHover={{ y: -3, transition: { duration: 0.22, ease: 'easeOut' } }}
          className="group relative rounded-2xl p-7 md:p-9 cursor-default"
          style={CARD_GLASS}
        >
          <div
            className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{ boxShadow: '0 0 0 1px rgba(249,115,22,0.2), 0 0 60px rgba(249,115,22,0.05) inset' }}
          />

          <div className="relative grid md:grid-cols-[1fr_1.2fr] gap-8 md:gap-12">
            <div className="flex flex-col">
              <span className="mb-4 text-[10px] tracking-[0.45em] font-light" style={{ color: 'rgba(249,115,22,0.35)' }}>
                04
              </span>

              <h3 className="font-poppins text-2xl md:text-3xl font-black text-white leading-tight mb-2 group-hover:text-orange-50 transition-colors duration-300">
                Brokerage Revenue
                <br />
                Intelligence Platform
              </h3>

              <a
                href="https://github.com/shreya180720/brokerage-revenue-intelligence"
                target="_blank"
                rel="noopener noreferrer"
                className="mb-5 inline-flex items-center gap-1 text-[11px] transition-colors duration-200 w-fit"
                style={{ color: 'rgba(253,186,116,0.4)' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'rgba(253,186,116,0.8)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(253,186,116,0.4)')}
              >
                GitHub ↗
              </a>

              <p className="text-sm leading-relaxed mb-6 font-light flex-1" style={{ color: 'rgba(255,255,255,0.36)' }}>
                Revenue intelligence platform for 10,000+ brokerage accounts at Aditya Birla Capital. Modeled client value tiers, built a churn signal model using 90-day trading look-back, and delivered financial forecasting for quarterly planning.
              </p>

              <div className="flex flex-wrap gap-1.5">
                {['SQL', 'Python', 'Power BI', 'DAX', 'Excel'].map(tag => (
                  <span key={tag} className="rounded-full px-2.5 py-0.5 text-[10px] tracking-wide" style={TAG_STYLE}>
                    {tag}
                  </span>
                ))}
                <span className="text-[10px] ml-1" style={{ color: 'rgba(255,255,255,0.2)' }}>
                  · Aditya Birla Capital
                </span>
              </div>
            </div>

            <div>
              <p className="mb-4 text-[9px] tracking-[0.45em] uppercase font-light" style={{ color: 'rgba(249,115,22,0.45)' }}>
                Outcomes
              </p>
              <div className="grid grid-cols-2 gap-3">
                {BROKERAGE_OUTCOMES.map(({ stat, label }) => (
                  <div
                    key={stat}
                    className="rounded-xl p-4"
                    style={{
                      background: 'rgba(249,115,22,0.05)',
                      border: '1px solid rgba(249,115,22,0.1)',
                    }}
                  >
                    <div
                      className="font-poppins text-3xl font-black mb-2 leading-none"
                      style={{ color: '#fb923c' }}
                    >
                      {stat}
                    </div>
                    <p className="text-[11px] leading-relaxed font-light" style={{ color: 'rgba(255,255,255,0.38)' }}>
                      {label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div
            className="pointer-events-none absolute bottom-0 left-8 right-8 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{ background: 'linear-gradient(to right, transparent, rgba(249,115,22,0.3), transparent)' }}
          />
        </motion.article>
      </div>
    </section>
  );
}
