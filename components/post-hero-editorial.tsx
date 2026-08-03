"use client";

import { motion, useReducedMotion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

const capabilityList = [
  "Strategy",
  "Identity",
  "Packaging",
  "Print",
  "Art Direction",
  "Production",
] as const;

const listVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.12 } },
};

const cellVariants = {
  hidden: { opacity: 0, x: -12 },
  visible: { opacity: 1, x: 0 },
};

const headlineVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const headlineLineVariants = {
  hidden: { opacity: 0, y: "104%" },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.72, ease },
  },
};

export function PostHeroEditorial({
  supportingCopy,
  location,
}: {
  supportingCopy: string;
  location: string;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="introduction"
      className="section section--intro editorial-intro"
      aria-labelledby="introduction-title"
    >
      <div className="section-shell">
        <motion.div
          className="editorial-intro__index"
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -8% 0px" }}
          transition={{ duration: reduceMotion ? 0.01 : 0.52, ease }}
        >
          <span>01</span>
          <span>The studio, in brief</span>
        </motion.div>

        <div className="editorial-intro__grid">
          <motion.h2
            id="introduction-title"
            className="editorial-intro__statement"
            initial={reduceMotion ? false : "hidden"}
            whileInView={reduceMotion ? undefined : "visible"}
            viewport={{ once: true, margin: "0px 0px -8% 0px" }}
            variants={reduceMotion ? undefined : headlineVariants}
          >
            <span className="editorial-intro__line">
              <motion.span variants={reduceMotion ? undefined : headlineLineVariants}>
                We create <em>considered identities</em>
              </motion.span>
            </span>
            <span className="editorial-intro__line">
              <motion.span variants={reduceMotion ? undefined : headlineLineVariants}>
                and packaging systems that make brands
              </motion.span>
            </span>
            <span className="editorial-intro__line">
              <motion.span variants={reduceMotion ? undefined : headlineLineVariants}>
                tangible, memorable and meaningful.
              </motion.span>
            </span>
          </motion.h2>

          <motion.div
            className="editorial-intro__copy"
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -8% 0px" }}
            transition={{ delay: 0.18, duration: reduceMotion ? 0.01 : 0.64, ease }}
          >
            <p>{supportingCopy}</p>
            <span>{location}</span>
          </motion.div>
        </div>

        <motion.div
          className="capability-strip-shell"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "0px 0px -8% 0px" }}
          variants={reduceMotion ? undefined : listVariants}
        >
          <motion.i
            className="capability-strip__rule capability-strip__rule--top"
            aria-hidden="true"
            initial={reduceMotion ? false : { scaleX: 0 }}
            whileInView={reduceMotion ? undefined : { scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: reduceMotion ? 0.01 : 0.72, ease }}
          />
          <ul className="capability-strip" aria-label="Core capabilities">
            {capabilityList.map((capability, index) => (
              <motion.li
                key={capability}
                variants={reduceMotion ? undefined : cellVariants}
                transition={{ duration: reduceMotion ? 0.01 : 0.46, ease }}
              >
                <a href="#services" aria-label={`Explore ${capability} services`}>
                  <span className="capability-strip__number">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="capability-strip__label">{capability}</span>
                  <span className="capability-strip__arrow" aria-hidden="true">&#8599;</span>
                </a>
              </motion.li>
            ))}
          </ul>
          <motion.i
            className="capability-strip__rule capability-strip__rule--bottom"
            aria-hidden="true"
            initial={reduceMotion ? false : { scaleX: 0 }}
            whileInView={reduceMotion ? undefined : { scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08, duration: reduceMotion ? 0.01 : 0.72, ease }}
          />
        </motion.div>
      </div>
    </section>
  );
}

export function SelectedWorkIndex() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.header
      className="selected-work__index"
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: reduceMotion ? 0.01 : 0.58, ease }}
    >
      <div>
        <h2 id="work-title">Selected work</h2>
        <p className="selected-work__intro-copy">
          A curated selection of custom packaging, branding and print work.
        </p>
      </div>
      <a className="selected-work__all" href="#archive">
        View All Projects <span aria-hidden="true">&#8594;</span>
      </a>
    </motion.header>
  );
}
