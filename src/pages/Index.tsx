import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import BentoGrid from "@/components/BentoGrid";
import LiveGitHub from "@/components/LiveGitHub";
import AIInsights from "@/components/AIInsights";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import AboutSection from "@/components/AboutSection";
import TerminalTyping from "@/components/TerminalTyping";
import BlogsSection from "@/components/BlogsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import ParticleBackground from "@/components/ParticleBackground";
import CursorGlow from "@/components/CursorGlow";
import ScrollProgress from "@/components/ScrollProgress";
import IntroLoader from "@/components/IntroLoader";
import StatusBadge from "@/components/StatusBadge";
import BackToTop from "@/components/BackToTop";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <IntroLoader />
      <ScrollProgress />
      <ParticleBackground />
      <CursorGlow />
      <div className="relative z-10">
        <Navbar />
        <HeroSection />
        <BentoGrid />
        <AIInsights />
        <LiveGitHub />
        <SkillsSection />
        <ProjectsSection />
        <AboutSection />
        <TerminalTyping />
        <BlogsSection />
        <ContactSection />
        <Footer />
      </div>
      <StatusBadge />
      <BackToTop />
    </div>
  );
};

export default Index;
