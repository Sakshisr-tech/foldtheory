import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Studio",
  description:
    "The thinking behind Fold Theory's considered approach to brand identity, packaging, print, and product presentation.",
};

const principles = [
  {
    number: "01",
    title: "Begin with meaning",
    text: "Every visual choice should grow from a clear idea: what the brand stands for, who it speaks to, and how it needs to feel in hand.",
  },
  {
    number: "02",
    title: "Design the whole encounter",
    text: "Identity, structure, materials, typography, and photography are considered as one connected experience rather than isolated deliverables.",
  },
  {
    number: "03",
    title: "Make restraint work harder",
    text: "Careful hierarchy, tactility, and detail can create distinction without relying on noise or novelty for its own sake.",
  },
];

const industries = [
  "Food & beverage",
  "Hospitality",
  "Beauty",
  "Lifestyle",
  "Corporate",
  "Retail",
  "Events",
  "Consumer products",
];

export default function AboutPage() {
  return (
    <main className={styles["page-shell"]} id="main-content">
      <section className={styles["page-hero"]} aria-labelledby="about-title">
        <div className={styles["page-hero-copy"]}>
          <p className={styles["page-kicker"]}>The studio · Fold Theory</p>
          <h1 id="about-title" className={styles["page-title"]}>
            Ideas become <em>objects.</em>
          </h1>
          <p className={styles["page-intro"]}>
            Fold Theory is a creative studio shaping brand identities and
            packaging for products, places, and moments that live in the
            physical world.
          </p>
          <Link className={styles["page-text-link"]} href="/services">
            Explore our services <span aria-hidden="true">↗</span>
          </Link>
        </div>

        <aside className={styles["page-studio-note"]} aria-label="Studio details">
          <div className={styles["page-note-rule"]} aria-hidden="true" />
          <dl className={styles["page-facts"]}>
            <div>
              <dt>Focus</dt>
              <dd>Bespoke branding &amp; packaging</dd>
            </div>
            <div>
              <dt>Approach</dt>
              <dd>Strategic, tactile, and collaborative</dd>
            </div>
            <div>
              <dt>Location</dt>
              <dd>New Delhi, India</dd>
            </div>
          </dl>
        </aside>
      </section>

      <section className={styles["page-philosophy"]} aria-labelledby="philosophy-title">
        <p className={styles["page-section-index"]}>01 / Philosophy</p>
        <div className={styles["page-philosophy-grid"]}>
          <h2 id="philosophy-title" className={styles["page-statement"]}>
            Good packaging is more than a container. It is the first physical
            conversation between a brand and its audience.
          </h2>
          <div className={styles["page-body-copy"]}>
            <p>
              We think beyond the mark on the front. The opening gesture, the
              weight of paper, the rhythm of information, and the way an object
              sits in a room all contribute to the story.
            </p>
            <p>
              Our practice brings strategy, identity, packaging, printed
              collateral, product presentation, and art direction into one
              considered system.
            </p>
          </div>
        </div>
      </section>

      <section className={styles["page-image-placeholder"]} aria-labelledby="imagery-note">
        <Image
          src="/images/projects/production-rigid-boxes.jpg"
          alt="Khoya presentation-box production from the Fold Theory studio archive"
          fill
          sizes="100vw"
          unoptimized
        />
        <div>
          <p id="imagery-note">From the studio archive</p>
          <p>Presentation packaging · New Delhi</p>
        </div>
      </section>

      <section className={styles["page-principles"]} aria-labelledby="principles-title">
        <div className={styles["page-section-heading"]}>
          <p className={styles["page-section-index"]}>02 / Working principles</p>
          <h2 id="principles-title">Considered from first thought to final touch.</h2>
        </div>
        <ol className={styles["page-principle-list"]}>
          {principles.map((principle) => (
            <li key={principle.number}>
              <span>{principle.number}</span>
              <h3>{principle.title}</h3>
              <p>{principle.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className={styles["page-industries"]} aria-labelledby="industries-title">
        <div>
          <p className={styles["page-section-index"]}>03 / Fields of interest</p>
          <h2 id="industries-title">Designed to move across categories.</h2>
        </div>
        <ul aria-label="Industries Fold Theory works across">
          {industries.map((industry) => (
            <li key={industry}>{industry}</li>
          ))}
        </ul>
      </section>

      <section className={styles["page-content-note"]} aria-labelledby="content-note-title">
        <p className={styles["page-section-index"]}>Content note</p>
        <h2 id="content-note-title">No borrowed stories.</h2>
        <p>
          A full studio history, team details, awards, and complete client roster
          have not been supplied, so they are intentionally not presented here.
          Verified information can be added when approved.
        </p>
      </section>

      <section className={styles["page-cta"]} aria-labelledby="about-cta-title">
        <p className={styles["page-kicker"]}>A project in mind?</p>
        <h2 id="about-cta-title">Let&apos;s make something worth holding.</h2>
        <Link className={styles["page-cta-link"]} href="/contact">
          Start a conversation <span aria-hidden="true">→</span>
        </Link>
      </section>
    </main>
  );
}
