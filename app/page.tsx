import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import FeaturedWork from '@/components/FeaturedWork';
import DashboardShowcase from '@/components/DashboardShowcase';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import Insights from '@/components/Insights';
import Skills from '@/components/Skills';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-transparent dark:bg-[#0f0a03]">
      <Navbar />
      <Hero />
      <FeaturedWork />
      <DashboardShowcase />
      <Experience />
      <Projects />
      <Insights />
      <Skills />
      <Contact />
      <Footer />
    </main>
  );
}
