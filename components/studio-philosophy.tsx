"use client";

import { motion, useReducedMotion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

const introParagraphs = [
  "For over three decades, Sun Print & Packaging has been helping businesses bring their ideas to life through premium printing and packaging solutions. What began as a small operation with just a handful of clients has grown into a trusted production partner for some of the most recognized restaurants, hospitality brands, and businesses across India and beyond.",
  "As the industry continues to evolve, so does our responsibility. We believe great packaging should not come at the expense of the environment. That's why we focus on sustainable packaging solutions, working primarily with paper and cardboard while avoiding plastic wherever possible.",
] as const;

const facts = [
  { value: "34+", label: "Years of Experience" },
  { value: "India & Beyond", label: "International Reach" },
  { value: "Paper First", label: "Sustainable Materials" },
  { value: "Built for Brands", label: "Custom Production" },
] as const;

const storyBlocks = [
  {
    id: "journey",
    number: "01",
    label: "Our Journey",
    text: "Our journey began in event printing, where precision, deadlines, and execution were everything. As the industry evolved, so did we, expanding into premium food packaging, commercial printing, branding materials, and custom production solutions designed for businesses that value quality.",
  },
  {
    id: "reach",
    number: "02",
    label: "Global Reach",
    text: "Over the years, our work has travelled far beyond our workshop. From serving leading multi-location restaurant brands in Delhi to delivering projects for clients in the UK, Australia, Dubai, and other international markets, we've remained committed to quality without compromise, attention to detail, and reliable delivery.",
  },
  {
    id: "philosophy",
    number: "03",
    label: "Our Philosophy",
    text: "At Fold Theory by Sun Print & Packaging, every project is approached with the understanding that great packaging is more than a container. It represents a brand, creates memorable first impressions, and influences how customers experience a business.",
  },
] as const;

export function StudioPhilosophy() {
  const reduceMotion = useReducedMotion();

  const highlightContactAfterScroll = () => {
    window.setTimeout(() => {
      window.dispatchEvent(new Event("fold-theory:highlight-contact"));
    }, reduceMotion ? 0 : 850);
  };

  return (
    <section id="about" className="studio-about" aria-labelledby="studio-title">
      <div className="studio-about__watermark" aria-hidden="true">
        34
      </div>

      <div className="site-container studio-about__inner">
        <motion.div
          className="section-label studio-about__label"
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -8% 0px" }}
          transition={{ duration: reduceMotion ? 0.01 : 0.6, ease }}
        >
          <span>01</span>
          <span>About Fold Theory</span>
        </motion.div>

        <div className="studio-about__intro-row">
          <motion.div
            className="studio-about__lead"
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -8% 0px" }}
            transition={{ duration: reduceMotion ? 0.01 : 0.65, ease }}
          >
            <h2 id="studio-title" className="studio-about__heading">
              <span>Some brands see packaging as a finishing touch.</span>
              <span>We see it as the first impression.</span>
            </h2>
          </motion.div>

          <motion.div
            className="studio-about__intro"
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -8% 0px" }}
            transition={{
              delay: reduceMotion ? 0 : 0.1,
              duration: reduceMotion ? 0.01 : 0.65,
              ease,
            }}
          >
            {introParagraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
          </motion.div>
        </div>

        <ul className="studio-about__facts">
          {facts.map((fact, index) => (
            <motion.li
              key={fact.label}
              initial={reduceMotion ? false : { opacity: 0, y: 14 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -6% 0px" }}
              transition={{
                delay: reduceMotion ? 0 : 0.05 + index * 0.07,
                duration: reduceMotion ? 0.01 : 0.62,
                ease,
              }}
            >
              <strong className="studio-about__fact-value">{fact.value}</strong>
              <span className="studio-about__fact-label">{fact.label}</span>
            </motion.li>
          ))}
        </ul>

        <div className="studio-about__blocks">
          {storyBlocks.map((block, index) => (
            <motion.article
              key={block.id}
              className={`studio-about__block studio-about__block--${block.id}`}
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -5% 0px" }}
              transition={{
                delay: reduceMotion ? 0 : 0.06 + index * 0.08,
                duration: reduceMotion ? 0.01 : 0.65,
                ease,
              }}
            >
              <span className="studio-about__block-number" aria-hidden="true">
                {block.number}
              </span>
              <p className="studio-about__block-label">{block.label}</p>
              <span className="studio-about__block-rule" aria-hidden="true" />
              <p className="studio-about__block-copy">{block.text}</p>
            </motion.article>
          ))}
        </div>

        <motion.div
          className="studio-about__finale"
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -5% 0px" }}
          transition={{
            delay: reduceMotion ? 0 : 0.1,
            duration: reduceMotion ? 0.01 : 0.7,
            ease,
          }}
        >
          <p className="studio-about__closing">
            Thirty-four years later, that belief continues to guide everything we
            create.
          </p>

          <div className="studio-about__cta">
            <p className="studio-about__cta-heading">
              Let&apos;s create your next brand story.
            </p>
            <a
              className="studio-about__cta-link"
              href="#contact"
              onClick={highlightContactAfterScroll}
            >
              Start Your Project <span aria-hidden="true">→</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
