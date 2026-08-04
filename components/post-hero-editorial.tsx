"use client";

import { motion, useReducedMotion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

const capabilities = [
  "Planning",
  "Packaging",
  "Printing",
  "Finishing",
  "Production",
] as const;

const listVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
};

const cellVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
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
    transition: { duration: 0.65, ease },
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
          transition={{ duration: reduceMotion ? 0.01 : 0.5, ease }}
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
                We bring <em>great</em> packaging ideas
              </motion.span>
            </span>
            <span className="editorial-intro__line">
              <motion.span variants={reduceMotion ? undefined : headlineLineVariants}>
                to life with precision and craftsmanship.
              </motion.span>
            </span>
          </motion.h2>

          <motion.div
            className="editorial-intro__copy"
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -8% 0px" }}
            transition={{ delay: 0.14, duration: reduceMotion ? 0.01 : 0.58, ease }}
          >
            <p>{supportingCopy}</p>
            <span>{location}</span>
          </motion.div>
        </div>

        <motion.ul
          className="capability-strip"
          aria-label="Core capabilities"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "0px 0px -8% 0px" }}
          variants={reduceMotion ? undefined : listVariants}
        >
          {capabilities.map((capability, index) => (
            <motion.li
              key={capability}
              variants={reduceMotion ? undefined : cellVariants}
              transition={{ duration: reduceMotion ? 0.01 : 0.42, ease }}
            >
              <div className="capability-strip__item">
                <span className="capability-strip__number">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="capability-strip__label">{capability}</span>
              </div>
            </motion.li>
          ))}
        </motion.ul>
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
    </motion.header>
  );
}
