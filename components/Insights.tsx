'use client';

import { motion } from 'framer-motion';

const STATS = [
  {
    stat: '72%',
    title: 'Revenue concentration',
    context: 'Top 20% of brokerage clients drove nearly three-quarters of total revenue.',
  },
  {
    stat: '18%',
    title: 'Churn reduction',
    context: 'Outreach campaigns built on dormant account signals cut attrition by 18%.',
  },
  {
    stat: '91%',
    title: 'Forecast accuracy',
    context: '6-month rolling revenue forecasts replaced manual Excel models.',
  },
  {
    stat: '35%',
    title: 'Data accuracy lift',
    context: 'ETL pipeline consolidating 5 source systems improved downstream report quality.',
  },
];

export default function Insights() {
  return (
    <motion.section
      id="insights"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
      className="py-14 px-6 border-y border-slate-200/60 dark:border-orange-900/20 bg-transparent dark:bg-[#1c1108]"
    >
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {STATS.map((s, i) => (
            <motion.div
              key={s.stat}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              whileHover={{ y: -5, transition: { type: 'spring', stiffness: 350, damping: 25 } }}
              className="cursor-default"
            >
              <div className="font-poppins font-bold text-3xl text-blue-600 dark:text-orange-400 mb-1">
                {s.stat}
              </div>
              <div className="font-inter text-xs font-semibold text-slate-700 dark:text-[#d4a96a] mb-1">
                {s.title}
              </div>
              <div className="font-inter text-xs text-slate-400 dark:text-[#806040] leading-relaxed">
                {s.context}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
