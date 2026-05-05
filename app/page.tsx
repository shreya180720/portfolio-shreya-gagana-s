import SiteLoader from '@/components/SiteLoader';
import UserInteractions from '@/components/UserInteractions';

import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import FeaturedWork from '@/components/FeaturedWork';
import DashboardShowcase from '@/components/DashboardShowcase';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import Insights from '@/components/Insights';
import Skills from '@/components/Skills';
import Testimonials from '@/components/Testimonials';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';

export default function Home() {
  return (
    <SiteLoader>
      <UserInteractions />
      <main className="min-h-screen bg-transparent dark:bg-[#0f0a03]">
        <Navbar />
        <Hero />
        <FeaturedWork />
        <DashboardShowcase />
        <Experience />
        <Projects />
        <Insights />
        <Skills />
        <Testimonials />
        <Contact />
        <Footer />
      </main>
      <BackToTop />
    </SiteLoader>
  );
}