import { ContactSection } from "@/components/contact-section";
import { HeroExperience } from "@/components/hero-experience";
import { SelectedWorkIndex } from "@/components/post-hero-editorial";
import { ProcessSection } from "@/components/process-section";
import { ProjectShowcase } from "@/components/project-showcase";
import { ServicesEditorial } from "@/components/services-list";
import { StudioPhilosophy } from "@/components/studio-philosophy";
import { TrustedBySection } from "@/components/trusted-by";

export function HomeExperience() {
  return (
    <div className="home-page">
      <HeroExperience />

      <StudioPhilosophy />

      <section id="work" className="section section--work" aria-labelledby="work-title">
        <div className="site-container section-shell">
          <SelectedWorkIndex />
          <div className="hidden lg:block">
            <ProjectShowcase variant="desktop" />
          </div>
          <div className="block lg:hidden">
            <ProjectShowcase variant="mobile" />
          </div>
        </div>
      </section>

      <ServicesEditorial />

      <ProcessSection />

      <TrustedBySection />

      <ContactSection />
    </div>
  );
}
