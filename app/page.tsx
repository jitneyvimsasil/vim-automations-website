import { Navbar } from "@/components/navbar";
import { Carousel } from "@/components/carousel";
import { Features } from "@/components/features";
import { LogoMarquee } from "@/components/logo-marquee";
import { Projects } from "@/components/projects";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="mb-16">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
              Automating Excellence
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
              Streamline your workflow with powerful automation solutions designed for modern teams.
            </p>
          </div>
          
          <Carousel />
        </div>
      </section>

      <Features />
      <LogoMarquee />
      <Projects />
      <Contact />
      <Footer />
    </main>
  );
}
