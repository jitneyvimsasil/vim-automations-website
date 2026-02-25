import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Process } from "@/components/process";
import { Services } from "@/components/services";
import { LogoMarquee } from "@/components/logo-marquee";
import { Stats } from "@/components/stats";
import { Projects } from "@/components/projects";
import { Testimonials } from "@/components/testimonials";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { SectionDivider, AngledDivider } from "@/components/section-divider";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <Hero />
      <SectionDivider />
      <Process />
      <SectionDivider />
      <Services />
      <LogoMarquee />
      <SectionDivider />
      <Stats />
      <SectionDivider />
      <Projects />
      <Testimonials />
      <AngledDivider />
      <Contact />
      <Footer />
    </main>
  );
}
