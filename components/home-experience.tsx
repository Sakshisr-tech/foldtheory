import { ContactSection } from "@/components/contact-section";
import { GalleryArchive } from "@/components/gallery-archive";
import { HeroExperience } from "@/components/hero-experience";
import { PostHeroEditorial, SelectedWorkIndex } from "@/components/post-hero-editorial";
import { ProcessSection } from "@/components/process-section";
import { ProjectShowcase } from "@/components/project-showcase";
import { ServicesEditorial } from "@/components/services-list";
import { StudioPhilosophy } from "@/components/studio-philosophy";
import {
  studio,
  testimonials,
} from "@/data";

function SectionLabel({ number, children }: { number: string; children: React.ReactNode }) {
  return (
    <div className="section-label">
      <span>{number}</span>
      <span>{children}</span>
    </div>
  );
}

export function HomeExperience() {
  return (
    <div className="home-page">
      <HeroExperience />

      <PostHeroEditorial supportingCopy={studio.supportingCopy} location={studio.location} />

      <section id="work" className="section section--work" aria-labelledby="work-title">
        <div className="section-shell">
          <SelectedWorkIndex />
          <ProjectShowcase />
        </div>
      </section>

      <ServicesEditorial />

      <StudioPhilosophy />

      <GalleryArchive />

      <ProcessSection />

      {testimonials.length > 0 && (
        <section id="testimonial" className="section section--testimonial" aria-labelledby="testimonial-title">
          <div className="section-shell">
            <SectionLabel number="08">Client perspective</SectionLabel>
            <h2 id="testimonial-title" className="sr-only">Testimonial</h2>
            <blockquote>“{testimonials[0].quote}”</blockquote>
            <p>{testimonials[0].clientName} · {testimonials[0].brandName}</p>
          </div>
        </section>
      )}

      <ContactSection />
    </div>
  );
}
