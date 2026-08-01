import Image from "next/image";
import { ContactForm } from "@/components/contact-form";
import { HeroExperience } from "@/components/hero-experience";
import { ProcessTimeline } from "@/components/process-timeline";
import { ProjectShowcase } from "@/components/project-showcase";
import { ServicesList } from "@/components/services-list";
import { ProjectTrigger } from "@/components/ui/project-trigger";
import { Reveal } from "@/components/ui/reveal";
import {
  capabilities,
  contactCopy,
  contactLinks,
  faqs,
  featuredProject,
  industries,
  projects,
  selectedClients,
  studio,
  testimonials,
  trustItems,
  verifiedMetrics,
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
  const featuredDetail = featuredProject.detailImages.find(
    (image) => image.src !== featuredProject.coverImage.src,
  ) ?? featuredProject.coverImage;

  return (
    <div className="home-page">
      <HeroExperience />

      <section id="introduction" className="section section--intro" aria-labelledby="introduction-title">
        <div className="section-shell">
          <SectionLabel number="01">The studio, in brief</SectionLabel>
          <div className="introduction-grid">
            <Reveal>
              <h2 id="introduction-title" className="display-statement">
                We create <em>considered identities</em> and packaging systems
                that make brands tangible, memorable and meaningful.
              </h2>
            </Reveal>
            <Reveal className="introduction-copy" delay={0.06}>
              <p>{studio.supportingCopy}</p>
              <span>{studio.location}</span>
            </Reveal>
          </div>
          <ul className="capability-strip" aria-label="Core capabilities">
            {studio.capabilityStrip.map((capability, index) => (
              <li key={capability}><span>{String(index + 1).padStart(2, "0")}</span>{capability}</li>
            ))}
          </ul>
        </div>
      </section>

      <section id="work" className="section section--work" aria-labelledby="work-title">
        <div className="section-shell">
          <SectionLabel number="02">Selected work</SectionLabel>
          <div className="section-heading section-heading--split">
            <Reveal><h2 id="work-title">Objects with a point of view.</h2></Reveal>
            <p>Selected packaging, print and branded objects from Fold Theory&apos;s public studio archive.</p>
          </div>
          <ProjectShowcase />
        </div>
      </section>

      <section id="services" className="section section--services" aria-labelledby="services-title">
        <div className="section-shell">
          <SectionLabel number="03">Services</SectionLabel>
          <div className="section-heading section-heading--split">
            <Reveal><h2 id="services-title">From first thought to final finish.</h2></Reveal>
            <p>Strategy, identity, packaging and production shaped as one connected brand experience.</p>
          </div>
          <ServicesList />
          <div className="section-cta">
            <p>Every engagement is scoped around what the product and brand genuinely need.</p>
            <a href="#contact" className="button button--primary">Discuss Your Project <span aria-hidden="true">↗</span></a>
          </div>
        </div>
      </section>

      <section id="featured" className="featured-story" aria-labelledby="featured-title">
        <div className="section-shell featured-story__shell">
          <SectionLabel number="04">Featured project story</SectionLabel>
          <div className="featured-story__copy">
            <p className="eyebrow">{featuredProject.category} · {featuredProject.industry}</p>
            <h2 id="featured-title">{featuredProject.title}</h2>
            <p className="featured-story__lead">{featuredProject.summary}</p>
            <dl>
              <div><dt>Challenge</dt><dd>{featuredProject.challenge}</dd></div>
              <div><dt>Design response</dt><dd>{featuredProject.solution}</dd></div>
              <div><dt>Services</dt><dd>{featuredProject.services.join(" · ")}</dd></div>
              {featuredProject.year && <div><dt>Year</dt><dd>{featuredProject.year}</dd></div>}
            </dl>
            <ProjectTrigger projectId={featuredProject.id} className="button button--light" ariaLabel={`View full ${featuredProject.title} project`}>
              View full project <span aria-hidden="true">↗</span>
            </ProjectTrigger>
          </div>
          <div className="featured-story__media">
            <figure className="featured-story__main" data-parallax="18">
              <Image src={featuredProject.coverImage.src} alt={featuredProject.coverImage.alt} fill sizes="(max-width: 900px) 100vw, 58vw" unoptimized />
            </figure>
            <figure className="featured-story__detail" data-parallax="10">
              <Image src={featuredDetail.src} alt={featuredDetail.alt} fill sizes="(max-width: 900px) 46vw, 20vw" unoptimized />
            </figure>
          </div>
        </div>
      </section>

      <section id="studio" className="section section--philosophy" aria-labelledby="studio-title">
        <div className="section-shell">
          <SectionLabel number="05">Studio philosophy</SectionLabel>
          <div className="philosophy-grid">
            <div className="philosophy-copy">
              <Reveal>
                <h2 id="studio-title">“{studio.philosophy}”</h2>
              </Reveal>
              <p>{studio.approach}</p>
              <ul>
                <li>Thoughtful strategy</li>
                <li>Strong visual systems</li>
                <li>Tactile material choices</li>
                <li>Practical production support</li>
              </ul>
            </div>
            <div className="philosophy-media">
              <figure className="philosophy-media__main" data-parallax="14">
                <Image src="/images/projects/production-rigid-boxes.jpg" alt="Khoya packaging samples arranged on a production worktable" fill sizes="(max-width: 800px) 100vw, 42vw" unoptimized />
              </figure>
              <figure className="philosophy-media__detail">
                <Image src="/images/projects/pinewood-cases.jpg" alt="Pinewood presentation cases from the Fold Theory studio archive" fill sizes="(max-width: 800px) 42vw, 16vw" unoptimized />
              </figure>
            </div>
          </div>
        </div>
      </section>

      <section id="archive" className="section section--archive" aria-labelledby="archive-title">
        <div className="section-shell">
          <SectionLabel number="06">Project archive</SectionLabel>
          <div className="section-heading section-heading--split">
            <Reveal><h2 id="archive-title">The wider studio archive.</h2></Reveal>
            <p>Every row opens its project story without taking you away from the page.</p>
          </div>
          <div className="archive-table" role="list">
            <div className="archive-table__head" aria-hidden="true">
              <span>Project</span><span>Industry</span><span>Services</span><span>Year</span><span />
            </div>
            {projects.map((project) => (
              <ProjectTrigger key={project.id} projectId={project.id} className="archive-row" ariaLabel={`Open ${project.title} project`}>
                <span className="archive-row__project"><i>{project.number}</i><strong>{project.title}</strong></span>
                <span>{project.industry}</span>
                <span>{project.services.slice(0, 2).join(", ")}</span>
                <span>{project.year ?? "Studio archive"}</span>
                <span className="archive-row__arrow" aria-hidden="true">↗</span>
                <span className="archive-row__mobile-image">
                  <Image src={project.coverImage.src} alt="" fill sizes="84px" unoptimized />
                </span>
                <span className="archive-row__preview" aria-hidden="true">
                  <Image src={project.coverImage.src} alt="" fill sizes="220px" unoptimized />
                </span>
              </ProjectTrigger>
            ))}
          </div>
        </div>
      </section>

      <section id="process" className="section section--process" aria-labelledby="process-title">
        <div className="section-shell">
          <SectionLabel number="07">How projects unfold</SectionLabel>
          <div className="section-heading section-heading--split">
            <Reveal><h2 id="process-title">A clear path from idea to production.</h2></Reveal>
            <p>Enough structure to keep momentum; enough openness to let the strongest idea emerge.</p>
          </div>
          <ProcessTimeline />
          <div className="section-cta">
            <p>Planning a launch or packaging refresh?</p>
            <a href="#contact" className="text-link">Request a project estimate <span aria-hidden="true">↗</span></a>
          </div>
        </div>
      </section>

      <section id="about" className="section section--industries" aria-labelledby="industries-title">
        <div className="section-shell">
          <SectionLabel number="08">Industries &amp; capabilities</SectionLabel>
          <div className="industries-grid">
            <div>
              <h2 id="industries-title">Brands made for physical life.</h2>
              <p>Fold Theory works where identity, product and experience meet—in hand, on shelf and at the table.</p>
            </div>
            <div className="type-lists">
              <div><span>Industries</span><ul>{industries.map((industry) => <li key={industry.id}>{industry.label}</li>)}</ul></div>
              <div><span>Capabilities</span><ul>{capabilities.map((capability) => <li key={capability.id}>{capability.label}</li>)}</ul></div>
            </div>
          </div>
        </div>
      </section>

      <section id="trust" className="section section--trust" aria-labelledby="trust-title">
        <div className="section-shell">
          <SectionLabel number="09">Trust &amp; credibility</SectionLabel>
          <div className="trust-grid">
            <div>
              <h2 id="trust-title">Clarity in the work. Honesty in the proof.</h2>
              <p>Only publicly verified studio details and archive clients are shown here. Unavailable metrics and testimonials remain hidden.</p>
            </div>
            <dl className="trust-facts">
              {[...trustItems, ...verifiedMetrics].map((item) => <div key={item.label}><dt>{item.label}</dt><dd>{item.value}</dd></div>)}
            </dl>
          </div>
          <div className="client-list">
            <span>Selected archive clients</span>
            <ul>{selectedClients.map((client) => <li key={client}>{client}</li>)}</ul>
          </div>
        </div>
      </section>

      {testimonials.length > 0 && (
        <section id="testimonial" className="section section--testimonial" aria-labelledby="testimonial-title">
          <div className="section-shell">
            <SectionLabel number="10">Client perspective</SectionLabel>
            <h2 id="testimonial-title" className="sr-only">Testimonial</h2>
            <blockquote>“{testimonials[0].quote}”</blockquote>
            <p>{testimonials[0].clientName} · {testimonials[0].brandName}</p>
          </div>
        </section>
      )}

      <section id="faq" className="section section--faq" aria-labelledby="faq-title">
        <div className="section-shell faq-grid">
          <div>
            <SectionLabel number={testimonials.length > 0 ? "11" : "10"}>Frequently asked</SectionLabel>
            <h2 id="faq-title">Before we begin.</h2>
            <p>Useful context for scope, timing, production and starting a conversation.</p>
          </div>
          <div className="faq-list">
            {faqs.map((faq, index) => (
              <details key={faq.id} open={index === 0}>
                <summary><span>{String(index + 1).padStart(2, "0")}</span>{faq.question}<i aria-hidden="true" /></summary>
                <div><p>{faq.answer}</p></div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="contact-section" aria-labelledby="contact-title">
        <div className="section-shell">
          <SectionLabel number={testimonials.length > 0 ? "12" : "11"}>Begin a conversation</SectionLabel>
          <div className="contact-heading">
            <h2 id="contact-title">{contactCopy.heading}</h2>
            <div>
              <p>{contactCopy.supportingText}</p>
              <dl>
                {contactLinks.map((link) => (
                  <div key={link.label}>
                    <dt>{link.label}</dt>
                    <dd>{link.href ? <a href={link.href} target="_blank" rel="noreferrer">{link.value} ↗</a> : link.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
          <ContactForm />
        </div>
      </section>
    </div>
  );
}
