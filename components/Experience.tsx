'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Briefcase, Globe, Database, Target } from 'lucide-react';

const JOBS = [
  {
    company: 'University of South Florida',
    logo: '/images/usf-logo.jpg',
    logoBg: '#ffffff',
    role: 'Data Analyst',
    period: 'Jan 2024 – Present',
    location: 'Tampa, FL',
    bullets: [
      'Designed Power BI dashboards tracking enrollment, financial aid, and graduation KPIs for [50,000+] students.',
      'Cut manual reporting time by [60%] through automated dashboards.',
      'Built SQL ETL pipelines consolidating [5] source systems (Salesforce, Banner, Canvas, Financial Edge, Excel), improving data accuracy by [35%].',
      "Cohort analysis on student retention adopted by the Dean's office for targeted intervention programs.",
    ],
    stack: ['Power BI', 'SQL', 'Python', 'DAX', 'Excel'],
  },
  {
    company: 'Centene Corporation',
    logo: '/images/centene-logo.jpg',
    logoBg: '#1b5276',
    role: 'IT Analyst',
    period: 'Jun 2022 – Dec 2023',
    location: 'Tampa, FL',
    bullets: [
      'Automated healthcare claims reconciliation (Medicare, Commercial) with Python, reducing processing time from [8 hours] to [45 minutes].',
      'Built Tableau dashboards tracking [12] operational KPIs, used directly in C-level quarterly reviews.',
      'A/B testing framework for member engagement campaigns improved CTR by [22%].',
    ],
    stack: ['Python', 'SQL', 'Tableau', 'A/B Testing', 'Excel'],
  },
  {
    company: 'Aditya Birla Capital',
    logo: '/images/abc-logo.jpg',
    logoBg: '#ffffff',
    role: 'Business Analyst',
    period: 'Mar 2020 – May 2022',
    location: 'Chennai, India',
    bullets: [
      'Built brokerage revenue intelligence platform across [10,000+] accounts. Top [20%] of clients drove [72%] of total revenue.',
      'Churn signal model using 90-day look-back on trade frequency. Attrition reduced by [18%] post-intervention.',
      'Financial forecasting at [91%] accuracy, adopted by finance for quarterly planning.',
    ],
    stack: ['SQL', 'Python', 'Power BI', 'Excel', 'Forecasting'],
  },
  {
    company: 'Sri Vijaya Durga Automotives',
    logo: '/images/vijayadurga_logo.png',
    logoBg: '#ffffff',
    role: 'Operational Analyst',
    period: 'Jan 2019 – Feb 2020',
    location: 'Cuddapah, India',
    bullets: [
      'Inventory analytics dashboard for [500+] SKUs reduced overstock situations by [30%].',
      'Seasonal demand analysis improved procurement planning and boosted margins by [15%].',
    ],
    stack: ['Excel', 'SQL', 'Power BI', 'Data Analysis'],
  },
];

const STATS = [
  { Icon: Briefcase, value: '4+',  label: 'Years of Experience'          },
  { Icon: Globe,     value: '4',   label: 'Industries Served'            },
  { Icon: Database,  value: '5+',  label: 'Systems Integrated'           },
  { Icon: Target,    value: '35%', label: 'Avg. Improvement in Accuracy' },
];

function highlight(text: string) {
  return text.split(/(\[[^\]]+\])/).map((part, i) =>
    part.startsWith('[') && part.endsWith(']') ? (
      <span key={i} className="text-blue-600 dark:text-orange-400 font-semibold">
        {part.slice(1, -1)}
      </span>
    ) : part
  );
}

function LogoBadge({ job }: { job: (typeof JOBS)[0] }) {
  const clickCount = useRef(0);
  const clickTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleClick = () => {
    if (job.company !== 'Aditya Birla Capital') return;
    clickCount.current += 1;
    if (clickTimer.current) clearTimeout(clickTimer.current);
    clickTimer.current = setTimeout(() => { clickCount.current = 0; }, 800);
    if (clickCount.current >= 5) {
      clickCount.current = 0;
      window.dispatchEvent(new CustomEvent('birla-tap'));
    }
  };

  return (
    <div className="relative w-[88px] h-[88px] flex-shrink-0 z-10" onClick={handleClick}>
      <div className="absolute inset-0 rounded-full border-2 border-blue-400 dark:border-orange-500 shadow-[0_0_18px_3px_rgba(99,102,241,0.20)] dark:shadow-[0_0_18px_3px_rgba(249,115,22,0.25)]" />
      <div
        className="absolute inset-[3px] rounded-full overflow-hidden"
        style={{ backgroundColor: job.logoBg }}
      >
        <Image
          src={job.logo}
          alt={job.company}
          fill
          className="object-contain p-[6px]"
          sizes="82px"
        />
      </div>
    </div>
  );
}

function ExperienceCard({ job }: { job: (typeof JOBS)[0] }) {
  return (
    <motion.div
      whileHover={{ y: -4, transition: { type: 'spring', stiffness: 350, damping: 25 } }}
      className="border border-blue-200 dark:border-orange-500/30 rounded-lg p-5 bg-white/75 backdrop-blur-sm dark:bg-[#100c00] dark:backdrop-blur-none w-full shadow-sm dark:shadow-none hover:shadow-lg dark:hover:shadow-[0_8px_28px_-4px_rgba(249,115,22,0.15)] transition-shadow duration-300 cursor-default"
    >
      <p className="text-blue-600 dark:text-orange-400 text-xs font-semibold tracking-wide mb-1.5">
        {job.period}
      </p>
      <h3 className="text-slate-900 dark:text-white font-poppins font-bold text-lg leading-snug mb-0.5">
        {job.company}
      </h3>
      <p className="text-blue-600 dark:text-orange-400 text-sm font-semibold mb-2">{job.role}</p>
      <div className="flex items-center gap-1 text-slate-400 dark:text-slate-500 text-xs mb-4">
        <MapPin size={11} className="flex-shrink-0" />
        <span>{job.location}</span>
      </div>
      <ul className="space-y-2 mb-4">
        {job.bullets.map((b, i) => (
          <li key={i} className="flex gap-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            <span className="text-blue-500 dark:text-orange-500 mt-1.5 flex-shrink-0 text-[10px]">●</span>
            <span>{highlight(b)}</span>
          </li>
        ))}
      </ul>
      <div>
        <p className="text-slate-400 dark:text-slate-500 text-xs mb-2">Tech Stack:</p>
        <div className="flex flex-wrap gap-1.5">
          {job.stack.map((s) => (
            <span
              key={s}
              className="text-[11px] px-2.5 py-0.5 rounded border border-blue-100 dark:border-slate-600/60 text-slate-600 dark:text-slate-300 bg-blue-50/60 dark:bg-[#0a0700]"
            >
              {s}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, delay },
});

export default function Experience() {
  return (
    <motion.section
      id="experience"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
      className="py-20 px-6 bg-transparent dark:bg-[#0d0900]"
    >
      <div className="max-w-6xl mx-auto">

        <motion.div {...fadeUp()} className="mb-16">
          <h2 className="font-poppins font-bold text-4xl text-slate-900 dark:text-white mb-2">
            Experience
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            My professional journey through data, insights, and impact.
          </p>
        </motion.div>

        <div className="hidden md:block relative">
          <div className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-px bg-blue-300/50 dark:bg-orange-500/40" />
          <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1 w-2.5 h-2.5 rounded-full bg-blue-500 dark:bg-orange-500 shadow-[0_0_8px_2px_rgba(99,102,241,0.5)] dark:shadow-[0_0_8px_2px_rgba(249,115,22,0.5)]" />

          {JOBS.map((job, i) => {
            const isLeft = i % 2 === 0;
            return (
              <motion.div
                key={job.company}
                {...fadeUp(i * 0.1)}
                className="grid grid-cols-[1fr_100px_1fr] items-center mb-10"
              >
                <div className="flex items-center justify-end">
                  {isLeft ? (
                    <>
                      <ExperienceCard job={job} />
                      <div className="w-8 flex-shrink-0 border-t-2 border-dashed border-blue-300/50 dark:border-orange-500/40" />
                    </>
                  ) : <div />}
                </div>

                <div className="flex items-center justify-center">
                  <LogoBadge job={job} />
                </div>

                <div className="flex items-center justify-start">
                  {!isLeft ? (
                    <>
                      <div className="w-8 flex-shrink-0 border-t-2 border-dashed border-blue-300/50 dark:border-orange-500/40" />
                      <ExperienceCard job={job} />
                    </>
                  ) : <div />}
                </div>
              </motion.div>
            );
          })}

          <div className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1 w-2.5 h-2.5 rounded-full bg-blue-500 dark:bg-orange-500 shadow-[0_0_8px_2px_rgba(99,102,241,0.5)] dark:shadow-[0_0_8px_2px_rgba(249,115,22,0.5)]" />
        </div>

        <div className="md:hidden relative pl-8">
          <div className="absolute left-3 top-0 bottom-0 w-px bg-blue-300/50 dark:bg-orange-500/40" />
          {JOBS.map((job, i) => (
            <motion.div key={job.company} {...fadeUp(i * 0.1)} className="relative mb-10">
              <div className="absolute -left-5 top-5 w-2.5 h-2.5 rounded-full bg-blue-500 dark:bg-orange-500 shadow-[0_0_8px_2px_rgba(99,102,241,0.4)] dark:shadow-[0_0_8px_2px_rgba(249,115,22,0.4)]" />
              <ExperienceCard job={job} />
            </motion.div>
          ))}
        </div>

        <motion.div
          {...fadeUp(0.3)}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-px bg-blue-200 dark:bg-orange-500/20 border border-blue-200 dark:border-orange-500/20 rounded-lg overflow-hidden"
        >
          {STATS.map(({ Icon, value, label }) => (
            <div key={label} className="flex items-center gap-4 px-6 py-5 bg-white/80 dark:bg-[#100c00]">
              <Icon size={22} className="text-blue-500 dark:text-orange-500 flex-shrink-0" />
              <div>
                <p className="text-slate-900 dark:text-white font-poppins font-bold text-xl leading-tight">
                  {value}
                </p>
                <p className="text-slate-500 dark:text-slate-400 text-xs mt-0.5">{label}</p>
              </div>
            </div>
          ))}
        </motion.div>

      </div>
    </motion.section>
  );
}
