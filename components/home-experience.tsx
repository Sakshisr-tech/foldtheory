"use client";

import Link from "next/link";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import { StillLife } from "./still-life";

const ease = [0.22, 1, 0.36, 1] as const;

const selectedProjects = [
  {
    number: "01",
    slug: "cecilia-pizzeria",
    title: "Cecilia Pizzeria",
    category: "Food & Beverage",
    year: "Delhi · Studio archive",
    description: "Custom pasta-kit boxes printed and produced for a playful cook-at-home ritual.",
    variant: "hero" as const,
    layout: "wide",
  },
  {
    number: "02",
    slug: "soda-shop",
    title: "Soda Shop",
    category: "Bottle Printing",
    year: "Hauz Khas · Studio archive",
    description: "Direct logo printing turns a simple glass bottle into a table signature.",
    variant: "bottle" as const,
    layout: "portrait",
  },
  {
    number: "03",
    slug: "bombaa",
    title: "Bombaa",
    category: "Printed Collateral",
    year: "Hospitality · Studio archive",
    description: "Custom coasters and printed butter paper complete the table experience.",
    variant: "print" as const,
    layout: "offset",
  },
  {
    number: "04",
    slug: "khoya",
    title: "Khoya",
    category: "Gifting & Merchandise",
    year: "Studio archive",
    description: "Presentation boxes and custom-printed objects composed for gifting.",
    variant: "gifting" as const,
    layout: "full",
  },
];

const services = [
  ["01", "Brand Strategy", "Positioning, naming direction, audience and a clear creative brief."],
  ["02", "Visual Identity", "Distinctive systems across typography, colour, image and voice."],
  ["03", "Packaging Design", "Structural thinking, range architecture, labels and shelf presence."],
  ["04", "Print & Collateral", "Menus, invitations, stationery and tactile brand touchpoints."],
  ["05", "Corporate Gifting", "Considered gifting concepts, custom boxes and memorable reveals."],
  ["06", "Hospitality Branding", "Joined-up identities for spaces, menus, service and takeaway."],
  ["07", "Art Direction", "Image worlds, still-life direction and cohesive product presentation."],
  ["08", "Production Support", "Artwork, prototypes, material guidance and vendor-ready delivery."],
];

const archive = [
  ["Ice Pop", "Food & Beverage", "Cartons, Embossing", "Archive"],
  ["Takeaway Systems", "Hospitality", "Carriers, Packaging", "Archive"],
  ["Secret Ingredient & Khoya", "Merchandise", "Custom Mug Printing", "Archive"],
  ["Custom Drink Stirrers", "Hospitality", "Specialty Production", "Archive"],
  ["Pinewood Cases", "Gifting", "Custom Packaging", "Archive"],
];

const process = [
  ["01", "Discover", "Research, objectives, audience and positioning."],
  ["02", "Define", "Strategy, direction and a purposeful visual language."],
  ["03", "Design", "Identity, packaging, typography and applications."],
  ["04", "Refine", "Mockups, prototypes, feedback and considered testing."],
  ["05", "Deliver", "Production-ready files and implementation support."],
];

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ duration: 0.85, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

function ArrowLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link className="arrow-link" href={href}>
      <span>{children}</span>
      <i aria-hidden="true">↗</i>
    </Link>
  );
}

export function HomeExperience() {
  const root = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [activeService, setActiveService] = useState(2);
  const [scrollCue, setScrollCue] = useState(true);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const mainX = useSpring(pointerX, { stiffness: 65, damping: 24 });
  const mainY = useSpring(pointerY, { stiffness: 65, damping: 24 });
  const detailX = useSpring(pointerX, { stiffness: 45, damping: 20 });
  const detailY = useSpring(pointerY, { stiffness: 45, damping: 20 });

  useEffect(() => {
    const onScroll = () => setScrollCue(window.scrollY < 100);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (reduceMotion || !root.current) return;
    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((element) => {
        const amount = Number(element.dataset.parallax ?? 30);
        gsap.fromTo(
          element,
          { y: -amount / 2 },
          {
            y: amount / 2,
            ease: "none",
            scrollTrigger: {
              trigger: element,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.8,
            },
          },
        );
      });
    }, root);
    return () => context.revert();
  }, [reduceMotion]);

  const handleHeroPointer = (event: React.PointerEvent<HTMLElement>) => {
    if (event.pointerType === "touch" || reduceMotion) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    pointerX.set(((event.clientX - bounds.left) / bounds.width - 0.5) * 8);
    pointerY.set(((event.clientY - bounds.top) / bounds.height - 0.5) * 8);
  };

  return (
    <div ref={root} className="home-page">
      <section
        className="hero"
        aria-labelledby="hero-title"
        onPointerMove={handleHeroPointer}
        onPointerLeave={() => {
          pointerX.set(0);
          pointerY.set(0);
        }}
      >
        <div className="hero__coordinate" aria-hidden="true">
          FT / 01
        </div>
        <div className="hero__ghost" aria-hidden="true">
          F
        </div>
        <div className="hero__copy">
          <motion.p
            className="eyebrow"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.55, duration: 0.6, ease }}
          >
            Independent creative studio · Bespoke branding &amp; packaging
          </motion.p>
          <h1 id="hero-title" className="hero__title">
            {["We shape", "stories you", "can hold."].map((line, index) => (
              <span className="line-mask" key={line}>
                <motion.span
                  initial={{ y: "112%" }}
                  animate={{ y: 0 }}
                  transition={{ delay: 1.62 + index * 0.11, duration: 0.85, ease }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>
          <motion.div
            className="hero__support"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.08, duration: 0.7, ease }}
          >
            <p>
              Identities and packaging systems that turn everyday products into
              lasting, tangible experiences.
            </p>
            <ArrowLink href="/work">Explore selected work</ArrowLink>
          </motion.div>
        </div>

        <div className="hero__visual">
          <motion.div
            className="hero__main-image"
            style={{ x: mainX, y: mainY }}
            initial={{ clipPath: "inset(100% 0 0 0)" }}
            animate={{ clipPath: "inset(0% 0 0 0)" }}
            transition={{ delay: 1.34, duration: 1.05, ease }}
          >
            <motion.div
              initial={{ scale: 1.08 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1.34, duration: 1.25, ease }}
            >
              <StillLife variant="hero" priority sizes="(max-width: 720px) 100vw, 52vw" />
            </motion.div>
            <Link
              href="/work/cecilia-pizzeria"
              className="project-cursor-target"
              aria-label="View Cecilia Pizzeria case study"
            >
              <span>View project</span>
            </Link>
          </motion.div>
          <motion.div
            className="hero__detail-image"
            style={{ x: detailX, y: detailY }}
            initial={{ opacity: 0, x: 28, y: 20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ delay: 2.2, duration: 0.82, ease }}
          >
            <StillLife variant="print" />
          </motion.div>
          <motion.div
            className="hero__caption"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.3, duration: 0.6 }}
          >
            <span>Featured study</span>
            <span>Packaging · Art direction</span>
          </motion.div>
        </div>

        <motion.div
          className={`scroll-cue ${scrollCue ? "" : "scroll-cue--hidden"}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
        >
          <span>Scroll to discover</span>
          <i aria-hidden="true" />
        </motion.div>
      </section>

      <section className="intro section-shell" aria-labelledby="intro-title">
        <div className="section-tag">
          <span>01</span>
          <span>Our point of view</span>
        </div>
        <div className="intro__grid">
          <Reveal>
            <h2 id="intro-title" className="display-statement">
              We create <em>considered identities</em> and packaging systems that
              make brands tangible, memorable, and meaningful.
            </h2>
          </Reveal>
          <Reveal className="intro__aside" delay={0.08}>
            <p>
              From first thought to final finish, every decision is made to give a
              product presence—on shelf, in hand, and in memory.
            </p>
            <div className="discipline-stack" aria-label="Studio disciplines">
              <span>Strategy</span>
              <span>Identity</span>
              <span>Packaging</span>
              <span>Print</span>
              <span>Production</span>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="selected-work section-shell" aria-labelledby="work-title">
        <div className="section-heading">
          <div>
            <div className="section-tag">
              <span>02</span>
              <span>A considered selection</span>
            </div>
            <h2 id="work-title">Selected work</h2>
          </div>
          <ArrowLink href="/work">View all work</ArrowLink>
        </div>

        <div className="project-composition">
          {selectedProjects.map((project, index) => (
            <Reveal
              key={project.slug}
              className={`project-entry project-entry--${project.layout}`}
              delay={index % 2 ? 0.08 : 0}
            >
              <Link href={`/work/${project.slug}`} className="project-entry__media">
                <div data-parallax={index % 2 ? "26" : "38"}>
                  <StillLife variant={project.variant} label={`${project.title} project from the official Fold Theory archive`} />
                </div>
                <span className="project-entry__explore">Explore</span>
              </Link>
              <div className="project-entry__info">
                <span>{project.number}</span>
                <div>
                  <h3>
                    <Link href={`/work/${project.slug}`}>{project.title}</Link>
                  </h3>
                  <p>{project.description}</p>
                </div>
                <div className="project-entry__meta">
                  <span>{project.category}</span>
                  <span>{project.year}</span>
                </div>
                <Link href={`/work/${project.slug}`} aria-label={`View ${project.title}`}>
                  ↗
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="services section-shell" aria-labelledby="services-title">
        <div className="section-heading section-heading--services">
          <div>
            <div className="section-tag section-tag--light">
              <span>03</span>
              <span>How we can help</span>
            </div>
            <h2 id="services-title">Services, shaped around the idea.</h2>
          </div>
          <p>
            We assemble the right mix of strategy, identity, packaging and
            production for each brief.
          </p>
        </div>
        <div className="services__layout">
          <div className="services__list">
            {services.map(([number, title, description], index) => (
              <button
                type="button"
                className={activeService === index ? "is-active" : ""}
                key={number}
                onMouseEnter={() => setActiveService(index)}
                onFocus={() => setActiveService(index)}
                onClick={() => setActiveService(index)}
                aria-expanded={activeService === index}
              >
                <span>{number}</span>
                <span>{title}</span>
                <span className="services__description">{description}</span>
                <i aria-hidden="true">↗</i>
              </button>
            ))}
          </div>
          <div className="services__visual" aria-live="polite">
            <StillLife
              variant={(["print", "hero", "gifting", "coffee"] as const)[activeService % 4]}
              label={`${services[activeService][1]} example from the official Fold Theory archive`}
            />
            <span>{services[activeService][0]} / {services[activeService][1]}</span>
          </div>
        </div>
      </section>

      <section className="featured" aria-labelledby="featured-title">
        <div className="featured__copy">
          <div className="section-tag section-tag--light">
            <span>04</span>
            <span>Featured case study</span>
          </div>
          <h2 id="featured-title">Khoya</h2>
          <p>
            Printed presentation boxes and branded objects designed to carry a
            warm, gift-ready identity beyond the product itself.
          </p>
          <dl>
            <div>
              <dt>Services</dt>
              <dd>Packaging, Custom Print, Merchandise</dd>
            </div>
            <div>
              <dt>Source</dt>
              <dd>Official Fold Theory studio archive</dd>
            </div>
          </dl>
          <ArrowLink href="/work/khoya">View the case study</ArrowLink>
        </div>
        <div className="featured__visual" data-parallax="54">
          <StillLife variant="gifting" />
        </div>
        <span className="featured__ghost" aria-hidden="true">UNFOLD</span>
      </section>

      <section className="archive section-shell" aria-labelledby="archive-title">
        <div className="section-heading section-heading--compact">
          <div>
            <div className="section-tag">
              <span>05</span>
              <span>The wider archive</span>
            </div>
            <h2 id="archive-title">Project index</h2>
          </div>
          <ArrowLink href="/work">View all work</ArrowLink>
        </div>
        <div className="archive__table" role="table" aria-label="Project archive">
          <div className="archive__head" role="row">
            <span role="columnheader">Project</span>
            <span role="columnheader">Industry</span>
            <span role="columnheader">Services</span>
            <span role="columnheader">Year</span>
          </div>
          {archive.map((row, index) => (
            <Link href="/work" className="archive__row" role="row" key={row[0]}>
              <span role="cell"><small>0{index + 1}</small>{row[0]}</span>
              <span role="cell">{row[1]}</span>
              <span role="cell">{row[2]}</span>
              <span role="cell">{row[3]}</span>
              <span className="archive__thumb" aria-hidden="true">
                <StillLife variant={(["print", "gifting", "coffee", "bottle", "studio"] as const)[index]} />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="philosophy section-shell" aria-labelledby="philosophy-title">
        <div className="section-tag">
          <span>06</span>
          <span>Studio philosophy</span>
        </div>
        <div className="philosophy__layout">
          <Reveal className="philosophy__statement">
            <p className="quote-mark" aria-hidden="true">“</p>
            <h2 id="philosophy-title">
              Good packaging is more than a container. It is the first physical
              conversation between a brand and its audience.
            </h2>
            <ArrowLink href="/about">Inside the studio</ArrowLink>
          </Reveal>
          <Reveal className="philosophy__image" delay={0.08}>
            <div data-parallax="32">
              <StillLife variant="studio" />
            </div>
            <p>
              Working across industries with emerging and established brands.
              <span>Based in New Delhi, India.</span>
            </p>
          </Reveal>
        </div>
      </section>

      <section className="process section-shell" aria-labelledby="process-title">
        <div className="section-heading section-heading--compact">
          <div>
            <div className="section-tag">
              <span>07</span>
              <span>From thought to touch</span>
            </div>
            <h2 id="process-title">A deliberate process</h2>
          </div>
          <p>Clear thinking, close collaboration, careful making.</p>
        </div>
        <div className="process__timeline">
          {process.map(([number, title, copy], index) => (
            <Reveal className="process__step" delay={index * 0.05} key={number}>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
              <i aria-hidden="true" />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="industries" aria-label="Industries we work with">
        <div className="industries__label">Across industries</div>
        <div className="industries__marquee">
          <div>
            {["Hospitality", "Food & Beverage", "Beauty", "Lifestyle", "Corporate", "Retail", "Events", "Consumer Products"].concat(
              ["Hospitality", "Food & Beverage", "Beauty", "Lifestyle", "Corporate", "Retail", "Events", "Consumer Products"],
            ).map((item, index) => (
              <span key={`${item}-${index}`}>{item}<i>✳</i></span>
            ))}
          </div>
        </div>
      </section>

      <section className="testimonial section-shell" aria-labelledby="testimonial-title">
        <span className="testimonial__mark" aria-hidden="true">“</span>
        <p className="eyebrow">Placeholder testimonial · awaiting approved client quote</p>
        <blockquote id="testimonial-title">
          “Fold Theory understood that the smallest details carry the biggest part
          of the story.”
        </blockquote>
        <p className="testimonial__credit">Name and company to be confirmed</p>
      </section>

      <section className="contact-band" aria-labelledby="contact-title">
        <div className="section-tag section-tag--light">
          <span>08</span>
          <span>Begin a conversation</span>
        </div>
        <h2 id="contact-title">Have something worth unfolding?</h2>
        <div className="contact-band__bottom">
          <p>Tell us about your brand, product, or next packaging project.</p>
          <Link href="/contact" className="contact-band__link">
            Start a project <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
