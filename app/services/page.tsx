import type { Metadata } from "next";
import Link from "next/link";

import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Brand strategy, identity, packaging, print, gifting, hospitality branding, art direction, and production support from Fold Theory.",
};

const services = [
  {
    number: "01",
    title: "Brand Strategy",
    description:
      "A clear foundation for how the brand should be understood, positioned, and expressed before the visual language takes shape.",
    deliverables: ["Research direction", "Positioning", "Brand principles", "Creative brief"],
  },
  {
    number: "02",
    title: "Visual Identity",
    description:
      "Distinctive, flexible identity systems built to remain coherent across physical and digital encounters.",
    deliverables: ["Logo systems", "Typography", "Colour direction", "Identity guidelines"],
  },
  {
    number: "03",
    title: "Packaging Design",
    description:
      "Packaging concepts and systems that balance shelf presence, storytelling, information, and the tactile act of opening.",
    deliverables: ["Creative concepts", "Packaging systems", "Label design", "Presentation mockups"],
  },
  {
    number: "04",
    title: "Print & Collateral",
    description:
      "Considered printed pieces that carry the identity into menus, invitations, stationery, launch materials, and more.",
    deliverables: ["Menus", "Invitations", "Stationery", "Printed campaigns"],
  },
  {
    number: "05",
    title: "Corporate Gifting",
    description:
      "Branded gifting experiences developed as a complete journey, from the outer box to the smallest accompanying detail.",
    deliverables: ["Gift concepts", "Custom boxes", "Inserts & cards", "Unboxing direction"],
  },
  {
    number: "06",
    title: "Hospitality Branding",
    description:
      "Connected identity touchpoints for hospitality settings, designed to make every guest-facing detail feel part of one world.",
    deliverables: ["Identity applications", "Menus", "Tabletop details", "Takeaway packaging"],
  },
  {
    number: "07",
    title: "Art Direction",
    description:
      "A visual point of view for presenting the brand and its products with consistency, atmosphere, and intention.",
    deliverables: ["Campaign direction", "Still-life concepts", "Styling direction", "Shot planning"],
  },
  {
    number: "08",
    title: "Production Support",
    description:
      "Design stewardship through the practical stages of artwork, sampling, supplier conversations, and final production.",
    deliverables: ["Artwork preparation", "Material direction", "Sample review", "Production liaison"],
  },
];

const process = [
  ["01", "Discover", "Research, objectives, audience, and context."],
  ["02", "Define", "Strategy, direction, and visual language."],
  ["03", "Design", "Identity, packaging, typography, and applications."],
  ["04", "Refine", "Mockups, prototypes, feedback, and testing."],
  ["05", "Deliver", "Production-ready files and implementation support."],
];

export default function ServicesPage() {
  return (
    <main className={styles["page-shell"]} id="main-content">
      <section className={styles["page-hero"]} aria-labelledby="services-title">
        <p className={styles["page-kicker"]}>Services · From thought to touchpoint</p>
        <div className={styles["page-hero-grid"]}>
          <h1 id="services-title" className={styles["page-title"]}>
            One idea,
            <br />
            <em>fully unfolded.</em>
          </h1>
          <div className={styles["page-hero-copy"]}>
            <p>
              Fold Theory builds the strategic and visual systems that turn a
              product into a complete brand experience — from first premise to
              final printed detail.
            </p>
            <Link href="/contact" className={styles["page-text-link"]}>
              Discuss your project <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
      </section>

      <section className={styles["page-services"]} aria-labelledby="service-list-title">
        <div className={styles["page-section-heading"]}>
          <p className={styles["page-section-index"]}>01 / Capabilities</p>
          <h2 id="service-list-title">A connected studio practice.</h2>
          <p>Open a service to see its focus and typical outputs.</p>
        </div>

        <div className={styles["page-service-list"]}>
          {services.map((service, index) => (
            <details className={styles["page-service"]} key={service.number} open={index === 0}>
              <summary>
                <span className={styles["page-service-number"]}>{service.number}</span>
                <span className={styles["page-service-title"]}>{service.title}</span>
                <span className={styles["page-service-toggle"]} aria-hidden="true">
                  <span />
                  <span />
                </span>
              </summary>
              <div className={styles["page-service-detail"]}>
                <p>{service.description}</p>
                <ul aria-label={`Typical ${service.title} outputs`}>
                  {service.deliverables.map((deliverable) => (
                    <li key={deliverable}>{deliverable}</li>
                  ))}
                </ul>
              </div>
            </details>
          ))}
        </div>
      </section>

      <section className={styles["page-process"]} aria-labelledby="process-title">
        <div className={styles["page-process-intro"]}>
          <p className={styles["page-section-index"]}>02 / Process</p>
          <h2 id="process-title">A clear rhythm, shaped around the work.</h2>
          <p>
            Every engagement is scoped to the project. These stages provide a
            practical framework while leaving room for discovery and iteration.
          </p>
        </div>
        <ol>
          {process.map(([number, title, description]) => (
            <li key={number}>
              <span>{number}</span>
              <div>
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className={styles["page-scope"]} aria-labelledby="scope-title">
        <p className={styles["page-section-index"]}>03 / Scope</p>
        <div>
          <h2 id="scope-title">Start with the right question, not a fixed package.</h2>
          <p>
            The most useful combination of services depends on where your brand
            is today, what needs to change, and what must be ready at launch.
            Share that context in the project enquiry and Fold Theory can shape
            an appropriate scope.
          </p>
          <div className={styles["page-scope-links"]}>
            <Link href="/contact">Start a project <span aria-hidden="true">→</span></Link>
            <Link href="/about">Read about the studio <span aria-hidden="true">↗</span></Link>
          </div>
        </div>
      </section>
    </main>
  );
}
