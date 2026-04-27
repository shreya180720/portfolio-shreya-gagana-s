'use client';

import { motion } from 'framer-motion';
import { TrendingUp, Database, BarChart3, Layers } from 'lucide-react';

const STATS = [
  { icon: TrendingUp, value: '4+', label: 'Years of Experience', color: 'violet' },
  { icon: Database, value: '10+', label: 'Tools & Technologies', color: 'blue' },
  { icon: BarChart3, value: '15+', label: 'Projects Delivered', color: 'violet' },
  { icon: Layers, value: '3', label: 'Industries Served', color: 'blue' },
];

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.55, delay },
});

export default function About() {
  return (
    <section id="about" className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div {...fade()} className="text-center mb-16">
          <span className="inline-block px-3 py-1 rounded-full glass-card border border-violet-500/20 text-violet-400 text-xs font-inter tracking-wide mb-4">
            About Me
          </span>
          <h2 className="font-poppins font-bold text-3xl sm:text-4xl text-white">
            Data-Driven. Business-Focused.
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-14 items-center">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="grid grid-cols-2 gap-4"
          >
            {STATS.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, scale: 0.94 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 + i * 0.07 }}
                className={`glass-card rounded-2xl p-6 border border-white/[0.04] hover:border-${s.color === 'violet' ? 'violet' : 'blue'}-500/18 transition-all duration-300`}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${
                    s.color === 'violet' ? 'bg-violet-500/10' : 'bg-blue-500/10'
                  }`}
                >
                  <s.icon
                    size={20}
                    className={s.color === 'violet' ? 'text-violet-400' : 'text-blue-400'}
                  />
                </div>
                <div className="font-poppins font-black text-3xl gradient-text mb-1">{s.value}</div>
                <div className="font-inter text-xs text-slate-500">{s.label}</div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.14 }}
            className="space-y-5"
          >
            <p className="font-inter text-slate-300 text-lg leading-relaxed">
              I'm a <span className="text-white font-semibold">Data & Business Analyst</span> with
              4+ years of experience transforming raw data into strategic insights that drive
              measurable outcomes.
            </p>
            <p className="font-inter text-slate-400 leading-relaxed">
              From building a{' '}
              <span className="text-violet-400 font-medium">
                brokerage revenue intelligence platform
              </span>{' '}
              that surfaced hidden revenue patterns, to designing automated ETL pipelines and A/B
              testing frameworks - I specialize in bridging the gap between data and decisions.
            </p>
            <p className="font-inter text-slate-400 leading-relaxed">
              My background spans{' '}
              <span className="text-white/75 font-medium">
                financial services, healthcare IT, and automotive retail
              </span>
              , giving me the unique ability to adapt analytical thinking across domains and
              communicate complex findings to non-technical stakeholders.
            </p>

            <div className="flex flex-wrap gap-2.5 pt-2">
              {[
                'USF Graduate',
                'Tampa, FL',
                'Open to Relocate',
                'Finance + Healthcare + Retail',
              ].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full glass-card border border-white/[0.06] text-xs text-slate-400 font-inter"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
