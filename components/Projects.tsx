'use client';

import { motion } from 'framer-motion';

const PROJECTS = [
  {
    title: 'A/B Testing Framework',
    description:
      'Statistical testing infrastructure for healthcare member engagement at Centene. Automated thresholds, report generation, and documented methodology reused across teams.',
    keyMetric: '22% CTR lift',
    context: 'Centene Corporation',
    tech: ['Python', 'Pandas', 'NumPy', 'SQL'],
    github: 'https://github.com/shreya180720/a-b-testing-framework',
  },
  {
    title: 'Sales Forecasting Model',
    description:
      '6-month rolling revenue forecast using regression and time-series methods. Automated monthly refresh replaced a two-analyst-week manual Excel process.',
    keyMetric: '91% accuracy',
    context: 'Aditya Birla Capital',
    tech: ['Python', 'Scikit-learn', 'Power BI'],
    github: 'https://github.com/shreya180720/sales-forecasting-model',
  },
  {
    title: 'Healthcare Data ETL Pipeline',
    description:
      'Automated claims reconciliation across 500K+ records from 5 disparate systems. Eliminated manual data handoffs and reduced downstream reporting errors.',
    keyMetric: '95% faster',
    context: 'Centene Corporation',
    tech: ['Python', 'SQL', 'AWS', 'Pandas'],
    github: 'https://github.com/shreya180720/healthcare-data-etl-pipeline',
  },
];

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 14 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.45, delay },
});

export default function Projects() {
  return (
    <section id="projects" className="py-20 px-6 bg-transparent dark:bg-[#0f0a03]">
      <div className="max-w-5xl mx-auto">

        <motion.div {...fade()} className="mb-10">
          <h2 className="font-poppins font-bold text-2xl text-slate-900 dark:text-[#fef3e2]">
            Other Projects
          </h2>
        </motion.div>

        <div className="divide-y divide-slate-200 dark:divide-orange-900/20">
          {PROJECTS.map((p, i) => (
            <motion.div
              key={p.title}
              {...fade(i * 0.06)}
              className="py-7 flex items-start gap-6 md:gap-10"
            >
              <span className="font-inter text-xs text-slate-300 dark:text-[#604830] flex-shrink-0 pt-1 tabular-nums w-5 text-right">
                {String(i + 1).padStart(2, '0')}
              </span>

              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-2">
                  <p className="font-poppins font-bold text-base text-slate-900 dark:text-[#fef3e2]">
                    {p.title}
                  </p>
                  <div className="flex items-baseline gap-3 flex-shrink-0">
                    <span className="font-poppins font-bold text-sm text-blue-600 dark:text-orange-400">
                      {p.keyMetric}
                    </span>
                    <a
                      href={p.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-inter text-xs text-slate-400 dark:text-[#806040] hover:text-blue-500 dark:hover:text-orange-400 transition-colors"
                    >
                      GitHub ↗
                    </a>
                  </div>
                </div>
                <p className="font-inter text-sm text-slate-500 dark:text-[#a07850] leading-relaxed mb-3">
                  {p.description}
                </p>
                <div className="flex flex-wrap gap-3">
                  {p.tech.map((t) => (
                    <span key={t} className="font-inter text-[10px] text-slate-400 dark:text-[#806040]">
                      {t}
                    </span>
                  ))}
                  <span className="font-inter text-[10px] text-slate-300 dark:text-[#604830]">·</span>
                  <span className="font-inter text-[10px] text-slate-400 dark:text-[#806040]">{p.context}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
