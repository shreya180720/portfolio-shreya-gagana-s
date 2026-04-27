'use client';

import { motion } from 'framer-motion';

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 14 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.45, delay },
});

export default function Contact() {
  return (
    <section id="contact" className="py-20 px-6 bg-transparent dark:bg-[#1c1108]">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 md:gap-20">

        <motion.div {...fade()}>
          <h2 className="font-poppins font-bold text-2xl sm:text-3xl text-slate-900 dark:text-[#fef3e2] mb-3">
            Open to work
          </h2>
          <p className="font-inter text-sm text-slate-500 dark:text-[#a07850] leading-relaxed">
            Looking for full-time Data Analyst or Business Analyst roles. Based in Tampa, FL. Open to remote and relocation.
          </p>
        </motion.div>

        <motion.div {...fade(0.08)}>
          <div className="divide-y divide-slate-100 dark:divide-orange-900/20">
            <a
              href="mailto:danda108@usf.edu"
              className="flex items-center justify-between py-4 group"
            >
              <span className="font-inter text-sm text-slate-700 dark:text-[#d4a96a] group-hover:text-blue-600 dark:group-hover:text-orange-400 transition-colors">
                danda108@usf.edu
              </span>
              <span className="font-inter text-xs text-slate-400 dark:text-[#806040] group-hover:text-blue-500 dark:group-hover:text-orange-400 transition-colors">
                Email ↗
              </span>
            </a>
            <a
              href="https://www.linkedin.com/in/srishreya-danda-2b27141a2/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between py-4 group"
            >
              <span className="font-inter text-sm text-slate-700 dark:text-[#d4a96a] group-hover:text-blue-600 dark:group-hover:text-orange-400 transition-colors">
                linkedin.com/in/srishreya-danda
              </span>
              <span className="font-inter text-xs text-slate-400 dark:text-[#806040] group-hover:text-blue-500 dark:group-hover:text-orange-400 transition-colors">
                LinkedIn ↗
              </span>
            </a>
            <a
              href="https://github.com/shreya180720"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between py-4 group"
            >
              <span className="font-inter text-sm text-slate-700 dark:text-[#d4a96a] group-hover:text-blue-600 dark:group-hover:text-orange-400 transition-colors">
                github.com/shreya180720
              </span>
              <span className="font-inter text-xs text-slate-400 dark:text-[#806040] group-hover:text-blue-500 dark:group-hover:text-orange-400 transition-colors">
                GitHub ↗
              </span>
            </a>
          </div>
          <p className="font-inter text-xs text-slate-400 dark:text-[#806040] mt-4">
            Tampa, FL · Open to remote &amp; relocation
          </p>
        </motion.div>

      </div>
    </section>
  );
}
