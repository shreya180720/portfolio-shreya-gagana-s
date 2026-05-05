'use client';

import { motion } from 'framer-motion';
import { TestimonialCarousel } from '@/components/ui/testimonial';

const TESTIMONIALS = [
  {
    id: 1,
    name: 'Saleem',
    role: 'Senior Manager · Aditya Birla Group',
    avatar: '/images/saleem.jpg',
    description:
      "Shreya's ability to translate complex datasets into clear business insights was remarkable. She provided critical visibility into our primary revenue drivers across 10,000+ accounts. By developing a high-accuracy churn signal model and forecasting at 91% precision, she has directly reduced attrition and set a new standard for our quarterly financial planning. Her Power BI dashboards cut our reporting time by 30% in the first quarter.",
  },
  {
    id: 2,
    name: 'Han Reichgelt',
    role: 'Graduate coordinator · USF Muma College of Business',
    avatar: '/images/Han_rei.jpg',
    description:
      'Shreya was an exceptional Teaching Assistant who demonstrated incredible organizational skills by seamlessly managing four sections simultaneously. Her proactive support and dedication to the students made her an invaluable partner in delivering a high-quality educational experience.',
  },
  {
    id: 3,
    name: 'Susan Smith',
    role: 'Head of Analytics Department · Centene Corporation',
    avatar: '/images/susan.jpg',
    description:
      'Shreya is a standout professional who revolutionized our healthcare claims processing, delivering an incredible 90% reduction in turnaround time through her Python automation. Her expert blend of executive-level data visualization and high-impact A/B testing has directly optimized our operational efficiency and member engagement.',
  },
  {
    id: 4,
    name: 'Aruna Karthick',
    role: 'Area Manager · Sri Vijaya Durga Automotives',
    avatar: '/images/aruna_aunty.png',
    description:
      'Her Inventory analytics dashboard saved our team hours of manual work every week. Shreya delivered ahead of schedule and always went beyond what was asked.',
  },
  {
    id: 5,
    name: 'Varol Onur Kayhan',
    role: 'Data Analytics · USF Muma College of Business',
    avatar: '/images/varol.jpg',
    description:
      'Shreya is a highly skilled analyst who significantly improved our operational efficiency by streamlining complex data workflows and reducing manual effort by 30%. She excels at translating intricate statistical findings into compelling Power BI stories that empower leadership to make confident, data-driven decisions.',
  },
  {
    id: 6,
    name: 'Mokesh P',
    role: 'AI Engineer · Aditya Birla Capital',
    avatar: '/images/shiv.png',
    description:
      ' Shreya is an incredible collaborator whose SQL optimization skills and insightful dashboards have been instrumental in streamlining my AI engineering workflows. Her ability to translate complex data into clear, actionable visualizations consistently bridges the gap between raw backend metrics and high-level project goals.',
  },
];

export default function Testimonials() {
  return (
    <motion.section
      id="testimonials"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
      className="py-20 px-6 bg-transparent dark:bg-[#0f0a03]"
    >
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <h2 className="font-poppins font-bold text-4xl text-slate-900 dark:text-white">
            Testimonials
          </h2>
          <div className="w-10 h-0.5 bg-blue-500 dark:bg-orange-500 mt-3" />
          <p className="mt-4 text-slate-500 dark:text-orange-100/60 font-inter text-base max-w-md">
            What colleagues and managers have said about working together.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.15 }}
        >
          <TestimonialCarousel
            testimonials={TESTIMONIALS}
            className="max-w-sm mx-auto"
          />
        </motion.div>
      </div>
    </motion.section>
  );
}
