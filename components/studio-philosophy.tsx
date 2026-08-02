"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;
const statementLines = [
  "Good packaging is",
  "the first physical",
  "conversation between",
  "a brand and its audience.",
] as const;
const principles = [
  {
    number: "01",
    title: "Thoughtful Strategy",
    description: "Every decision begins with clarity, context and purpose.",
  },
  {
    number: "02",
    title: "Visual Identity",
    description: "Distinctive systems designed for recognition and longevity.",
  },
  {
    number: "03",
    title: "Material Craft",
    description: "Packaging that feels as considered as it looks.",
  },
  {
    number: "04",
    title: "Production Support",
    description: "Creative intent carried faithfully into manufacturing.",
  },
] as const;

export function StudioPhilosophy() {
  const reduceMotion = useReducedMotion();

  const highlightContactAfterScroll = () => {
    window.setTimeout(() => {
      window.dispatchEvent(new Event("fold-theory:highlight-contact"));
    }, reduceMotion ? 0 : 1050);
  };

  return (
    <section id="studio" className="section section--philosophy studio-about" aria-labelledby="studio-title">
      <div className="section-shell">
        <div className="studio-about__intro-grid">
          <div className="studio-about__copy">
            <motion.div
              className="section-label studio-about__label"
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -8% 0px" }}
              transition={{ duration: reduceMotion ? 0.01 : 0.6, ease }}
            >
              <span>04</span>
              <span>Studio philosophy</span>
            </motion.div>

            <h2 id="studio-title">
              {statementLines.map((line, index) => (
                <motion.span
                  key={line}
                  initial={reduceMotion ? false : { opacity: 0, y: 30 }}
                  whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "0px 0px -7% 0px" }}
                  transition={{
                    delay: reduceMotion ? 0 : index * 0.065,
                    duration: reduceMotion ? 0.01 : 0.64,
                    ease,
                  }}
                >
                  {line}
                </motion.span>
              ))}
            </h2>

            <motion.p
              className="studio-about__introduction"
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -7% 0px" }}
              transition={{ delay: reduceMotion ? 0 : 0.2, duration: reduceMotion ? 0.01 : 0.6, ease }}
            >
              Fold Theory is an independent branding and packaging studio creating thoughtful
              identities and physical brand experiences for ambitious businesses.
            </motion.p>

            <motion.a
              className="studio-about__link"
              href="#contact"
              onClick={highlightContactAfterScroll}
              initial={reduceMotion ? false : { opacity: 0, y: 10 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: reduceMotion ? 0 : 0.26, duration: reduceMotion ? 0.01 : 0.52, ease }}
            >
              Start Your Project <span aria-hidden="true">&#8599;</span>
            </motion.a>
          </div>

          <motion.figure
            className="studio-about__feature"
            initial={reduceMotion ? false : { opacity: 0, scale: 1.03 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "0px 0px -8% 0px" }}
            transition={{ delay: reduceMotion ? 0 : 0.1, duration: reduceMotion ? 0.01 : 0.78, ease }}
          >
            <Image
              src="/images/services/soda-bottle.jpg"
              alt="Fold Theory beverage identity applied to a glass soda bottle"
              fill
              sizes="(max-width: 900px) 92vw, 42vw"
              unoptimized
            />
          </motion.figure>
        </div>

        <div className="studio-about__principles-section">
          <motion.div
            className="studio-about__principles-heading"
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -8% 0px" }}
            transition={{ duration: reduceMotion ? 0.01 : 0.58, ease }}
          >
            <span>Our approach</span>
            <h3>Considered from first idea to final finish.</h3>
          </motion.div>

          <ol className="studio-about__principles">
            {principles.map((principle, index) => (
              <motion.li
                key={principle.number}
                initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -6% 0px" }}
                transition={{
                  delay: reduceMotion ? 0 : index * 0.075,
                  duration: reduceMotion ? 0.01 : 0.56,
                  ease,
                }}
              >
                <span>{principle.number}</span>
                <h4>{principle.title}</h4>
                <p>{principle.description}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
