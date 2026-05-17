'use client';

import { motion } from 'framer-motion';
import { CinematicHeading } from '@/components/cinematic/CinematicHeading';
import {
  Database, BarChart3, FileSpreadsheet, LayoutGrid,
  Code2, Table2, Hash, Calculator, TrendingUp,
  Cloud, Server, HardDrive,
  GitBranch, Github, Clipboard, ArrowRightLeft, Layers,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

type Skill = { name: string; Icon: LucideIcon };

const CATEGORIES: { label: string; skills: Skill[] }[] = [
  {
    label: 'Data Analytics & Visualization',
    skills: [
      { name: 'SQL',      Icon: Database        },
      { name: 'Power BI', Icon: BarChart3       },
      { name: 'Excel',    Icon: FileSpreadsheet },
      { name: 'Tableau',  Icon: LayoutGrid      },
    ],
  },
  {
    label: 'Programming & Libraries',
    skills: [
      { name: 'Python',     Icon: Code2      },
      { name: 'Pandas',     Icon: Table2     },
      { name: 'NumPy',      Icon: Hash       },
      { name: 'SciPy',      Icon: Calculator },
      { name: 'Matplotlib', Icon: TrendingUp },
    ],
  },
  {
    label: 'Data Platforms & Cloud',
    skills: [
      { name: 'AWS',        Icon: Cloud    },
      { name: 'PostgreSQL', Icon: Database },
      { name: 'SQL Server', Icon: Server   },
      { name: 'SQLite',     Icon: HardDrive},
    ],
  },
  {
    label: 'Tools & Workflow',
    skills: [
      { name: 'Git',              Icon: GitBranch      },
      { name: 'GitHub',           Icon: Github         },
      { name: 'Jira',             Icon: Clipboard      },
      { name: 'ETL',              Icon: ArrowRightLeft },
      { name: 'Data Warehousing', Icon: Layers         },
    ],
  },
];

const METHODS = [
  'A/B Testing', 'Forecasting', 'Cohort Analysis',
  'Regression', 'ETL', 'Data Warehousing',
];

const CARD_GLASS = {
  background: 'rgba(255,255,255,0.025)',
  border: '1px solid rgba(255,255,255,0.055)',
  backdropFilter: 'blur(10px)',
  WebkitBackdropFilter: 'blur(10px)',
} as const;

function SkillPill({ name, Icon }: Skill) {
  return (
    <motion.div
      whileHover={{ y: -2, scale: 1.03, transition: { duration: 0.18, ease: 'easeOut' } }}
      className="flex items-center gap-2 px-4 py-2.5 rounded-xl cursor-default"
      style={{
        background: 'rgba(249,115,22,0.06)',
        border: '1px solid rgba(249,115,22,0.12)',
      }}
    >
      <Icon size={15} style={{ color: '#fb923c', flexShrink: 0 }} />
      <span className="text-sm font-medium whitespace-nowrap" style={{ color: 'rgba(255,255,255,0.75)' }}>
        {name}
      </span>
    </motion.div>
  );
}

export default function CinematicSkills() {
  return (
    <section className="px-6 py-28 md:py-36" style={{ background: '#0e0e0e' }}>
      <div className="mx-auto max-w-5xl">

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: '-80px' }}
          className="mb-20 text-center"
        >
          <p className="mb-4 text-[9px] tracking-[0.55em] uppercase font-light text-white/40">
            Toolkit
          </p>
          <CinematicHeading text="Skills & Tools" />
        </motion.div>

        <div className="grid gap-5 md:grid-cols-2">
          {CATEGORIES.map((cat, i) => (
            <motion.div
              key={cat.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true, margin: '-50px' }}
              className="rounded-2xl p-6"
              style={CARD_GLASS}
            >
              <h3 className="font-poppins text-xs font-semibold mb-5 tracking-wide" style={{ color: 'rgba(249,115,22,0.7)' }}>
                {cat.label}
              </h3>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map(skill => (
                  <SkillPill key={skill.name} {...skill} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: '-50px' }}
          className="mt-8 rounded-2xl px-6 py-5 flex flex-wrap items-center gap-x-5 gap-y-3"
          style={CARD_GLASS}
        >
          <span className="text-[10px] font-bold tracking-[0.3em] uppercase" style={{ color: '#fb923c' }}>
            Methods
          </span>
          {METHODS.map(m => (
            <span key={m} className="flex items-center gap-2 text-sm font-light" style={{ color: 'rgba(255,255,255,0.45)' }}>
              <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: 'rgba(249,115,22,0.5)' }} />
              {m}
            </span>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
