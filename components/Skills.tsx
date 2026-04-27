'use client';

import { motion } from 'framer-motion';
import {
  Database, BarChart3, FileSpreadsheet, LayoutGrid,
  Code2, Table2, Hash, Calculator, TrendingUp,
  Cloud, Server, HardDrive, Layers,
  GitBranch, Github, Clipboard, ArrowRightLeft, Settings,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

type Skill = { name: string; Icon: LucideIcon };

const CATEGORIES: { label: string; CatIcon: LucideIcon; skills: Skill[] }[] = [
  {
    label: 'Data Analytics & Visualization',
    CatIcon: BarChart3,
    skills: [
      { name: 'SQL',      Icon: Database        },
      { name: 'Power BI', Icon: BarChart3       },
      { name: 'Excel',    Icon: FileSpreadsheet },
      { name: 'Tableau',  Icon: LayoutGrid      },
    ],
  },
  {
    label: 'Programming & Libraries',
    CatIcon: Code2,
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
    CatIcon: Cloud,
    skills: [
      { name: 'AWS',        Icon: Cloud    },
      { name: 'PostgreSQL', Icon: Database },
      { name: 'SQL Server', Icon: Server   },
      { name: 'SQLite',     Icon: HardDrive},
    ],
  },
  {
    label: 'Tools & Workflow',
    CatIcon: Settings,
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

function SkillCard({ name, Icon }: Skill) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -2 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl
        bg-white/75 backdrop-blur-sm dark:bg-[#0d0900] dark:backdrop-blur-none
        border border-blue-200 dark:border-orange-500/20
        hover:border-blue-400 dark:hover:border-orange-500/55
        hover:shadow-md dark:hover:shadow-[0_0_14px_2px_rgba(249,115,22,0.12)]
        transition-all duration-200 cursor-default select-none"
    >
      <Icon size={17} className="text-blue-600 dark:text-orange-400 flex-shrink-0" />
      <span className="text-slate-800 dark:text-white font-inter font-semibold text-sm whitespace-nowrap">
        {name}
      </span>
    </motion.div>
  );
}

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, delay },
});

export default function Skills() {
  return (
    <section id="skills" className="py-20 px-6 bg-transparent dark:bg-[#0f0a03]">
      <div className="max-w-5xl mx-auto">

        <motion.div {...fadeUp()} className="mb-14">
          <h2 className="font-poppins font-bold text-4xl text-slate-900 dark:text-white">
            Skills &amp; Tools
          </h2>
          <div className="w-10 h-0.5 bg-blue-500 dark:bg-orange-500 mt-3" />
        </motion.div>

        <div className="space-y-12">
          {CATEGORIES.map(({ label, CatIcon, skills }, i) => (
            <motion.div key={label} {...fadeUp(i * 0.1)}>

              <div className="flex items-center justify-center gap-3 mb-7">
                <div className="flex items-center justify-center w-10 h-10 rounded-full
                  border-2 border-blue-500 dark:border-orange-500
                  bg-blue-50 dark:bg-orange-500/10
                  shadow-[0_0_16px_2px_rgba(99,102,241,0.15)] dark:shadow-[0_0_16px_2px_rgba(249,115,22,0.2)]
                  flex-shrink-0">
                  <CatIcon size={17} className="text-blue-600 dark:text-orange-400" />
                </div>
                <h3 className="font-poppins font-bold text-lg text-slate-900 dark:text-white">
                  {label}
                </h3>
              </div>

              <div className="flex flex-wrap justify-center gap-3">
                {skills.map(({ name, Icon }) => (
                  <SkillCard key={name} name={name} Icon={Icon} />
                ))}
              </div>

            </motion.div>
          ))}
        </div>

        <motion.div
          {...fadeUp(0.4)}
          className="mt-14 pt-6 border-t border-slate-200/80 dark:border-white/8 flex flex-wrap items-center gap-x-4 gap-y-2"
        >
          <span className="font-inter text-xs font-bold tracking-widest uppercase text-blue-600 dark:text-orange-400 mr-1">
            Methods:
          </span>
          {METHODS.map((m) => (
            <span key={m} className="flex items-center gap-3 text-slate-600 dark:text-slate-300 font-inter text-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 dark:bg-orange-500 flex-shrink-0" />
              {m}
            </span>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
