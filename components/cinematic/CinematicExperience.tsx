'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { CinematicHeading } from '@/components/cinematic/CinematicHeading';

const JOBS = [
  {
    company: 'University of South Florida',
    logo: '/images/usf-logo.jpg',
    logoBg: '#ffffff',
    role: 'Data Analyst',
    period: 'Jan 2024 – Present',
    location: 'Tampa, FL',
    bullets: [
      'Designed Power BI dashboards tracking enrollment, financial aid, and graduation KPIs for 50,000+ students.',
      'Cut manual reporting time by 60% through automated dashboards.',
      'Built SQL ETL pipelines consolidating 5 source systems, improving data accuracy by 35%.',
      "Cohort analysis on student retention adopted by the Dean's office for targeted intervention programs.",
    ],
    stack: ['Power BI', 'SQL', 'Python', 'DAX', 'Excel'],
  },
  {
    company: 'Centene Corporation',
    logo: '/images/centene-logo.jpg',
    logoBg: '#1b5276',
    role: 'IT Data Analyst',
    period: 'Jun 2022 – Dec 2023',
    location: 'Tampa, FL',
    bullets: [
      'Automated healthcare claims reconciliation with Python, reducing processing time from 8 hours to 45 minutes.',
      'Built Tableau dashboards tracking 12 operational KPIs, used directly in C-level quarterly reviews.',
      'A/B testing framework for member engagement campaigns improved CTR by 22%.',
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
      'Built brokerage revenue intelligence platform across 10,000+ accounts. Top 20% of clients drove 72% of total revenue.',
      'Churn signal model using 90-day look-back on trade frequency. Attrition reduced by 18% post-intervention.',
      'Financial forecasting at 91% accuracy, adopted by finance for quarterly planning.',
    ],
    stack: ['SQL', 'Python', 'Power BI', 'Excel', 'Forecasting'],
  },
  {
    company: 'Sri Vijaya Durga Automotives',
    logo: '/images/vijayadurga_logo.png',
    logoBg: '#ffffff',
    role: 'Business & Operational Analyst',
    period: 'Jan 2019 – Feb 2020',
    location: 'Cuddapah, India',
    bullets: [
      'Inventory analytics dashboard for 500+ SKUs reduced overstock situations by 30%.',
      'Seasonal demand analysis improved procurement planning and boosted margins by 15%.',
    ],
    stack: ['Excel', 'SQL', 'Power BI', 'Data Analysis'],
  },
];

const CARD_GLASS = {
  background: 'rgba(255,255,255,0.028)',
  border: '1px solid rgba(255,255,255,0.06)',
  backdropFilter: 'blur(10px)',
  WebkitBackdropFilter: 'blur(10px)',
} as const;

export default function CinematicExperience() {
  return (
    <section className="px-6 py-28 md:py-36" style={{ background: '#0e0e0e' }}>
      <div className="mx-auto max-w-4xl">

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: '-80px' }}
          className="mb-20 text-center"
        >
          <p className="mb-4 text-[9px] tracking-[0.55em] uppercase font-light text-white/40">
            Journey
          </p>
          <CinematicHeading text="Experience" />
        </motion.div>

        <div className="relative">
          <div
            className="absolute left-[22px] top-4 bottom-4 w-px md:left-[27px]"
            style={{ background: 'linear-gradient(to bottom, rgba(249,115,22,0.5), rgba(249,115,22,0.08))' }}
          />

          <div className="space-y-8">
            {JOBS.map((job, i) => (
              <motion.div
                key={job.company}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.65, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true, margin: '-50px' }}
                className="relative flex gap-6 md:gap-8"
              >
                <div className="flex flex-col items-center flex-shrink-0">
                  <div
                    className="relative z-10 w-[46px] h-[46px] md:w-[56px] md:h-[56px] rounded-full flex-shrink-0 overflow-hidden"
                    style={{
                      border: '1px solid rgba(249,115,22,0.3)',
                      boxShadow: '0 0 16px rgba(249,115,22,0.15)',
                      backgroundColor: job.logoBg,
                    }}
                  >
                    <Image
                      src={job.logo}
                      alt={job.company}
                      fill
                      className="object-contain p-1.5"
                      sizes="56px"
                    />
                  </div>
                </div>

                <div
                  className="flex-1 rounded-2xl p-6 mb-2"
                  style={CARD_GLASS}
                >
                  <p className="mb-1 text-[10px] tracking-[0.3em] uppercase font-light" style={{ color: '#fb923c' }}>
                    {job.period}
                  </p>

                  <h3 className="font-poppins font-bold text-lg text-white leading-snug">
                    {job.company}
                  </h3>
                  <p className="text-sm font-semibold mb-1" style={{ color: 'rgba(251,146,60,0.8)' }}>
                    {job.role}
                  </p>

                  <div className="flex items-center gap-1 mb-4">
                    <MapPin size={10} style={{ color: 'rgba(255,255,255,0.25)' }} />
                    <span className="text-[10px] font-light" style={{ color: 'rgba(255,255,255,0.25)' }}>
                      {job.location}
                    </span>
                  </div>

                  <ul className="space-y-2 mb-5">
                    {job.bullets.map((b, j) => (
                      <li key={j} className="flex gap-2 text-sm leading-relaxed">
                        <span className="mt-[7px] flex-shrink-0 w-1 h-1 rounded-full" style={{ background: 'rgba(249,115,22,0.6)' }} />
                        <span style={{ color: 'rgba(255,255,255,0.5)' }}>{b}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-1.5">
                    {job.stack.map(s => (
                      <span
                        key={s}
                        className="rounded-full px-2.5 py-0.5 text-[10px] tracking-wide"
                        style={{
                          background: 'rgba(249,115,22,0.06)',
                          border: '1px solid rgba(249,115,22,0.12)',
                          color: 'rgba(253,186,116,0.55)',
                        }}
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
