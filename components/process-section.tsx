"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ProcessTimeline } from "@/components/process-timeline";

const ease = [0.22, 1, 0.36, 1] as const;

export function ProcessSection() {
  const reduceMotion = useReducedMotion();

  const highlightContactAfterScroll = () => {
    window.setTimeout(() => {
      window.dispatchEvent(new Event("fold-theory:highlight-contact"));
    }, reduceMotion ? 0 : 850);
  };

  return (
    <section
      id="process"
      className="section section--process process-editorial"
      aria-labelledby="process-title"
    >
      <motion.span
        className="process-background-word"
        aria-hidden="true"
        initial={reduceMotion ? false : { opacity: 0 }}
        whileInView={reduceMotion ? undefined : { opacity: 1 }}
        viewport={{ once: true, margin: "0px 0px -8% 0px" }}
        transition={{ duration: reduceMotion ? 0.01 : 1.1, ease }}
      >
        PROCESS
      </motion.span>

      <div className="site-container section-shell">
        <motion.div
          className="section-label process-section__label"
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -8% 0px" }}
          transition={{ duration: reduceMotion ? 0.01 : 0.6, ease }}
        >
          <span>05</span>
          <span>Our Process</span>
        </motion.div>

        <div className="process-section__heading">
          <motion.h2
            id="process-title"
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -8% 0px" }}
            transition={{ duration: reduceMotion ? 0.01 : 0.65, ease }}
          >
            From Idea to Delivery
          </motion.h2>
          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -8% 0px" }}
            transition={{
              delay: reduceMotion ? 0 : 0.1,
              duration: reduceMotion ? 0.01 : 0.6,
              ease,
            }}
          >
            A clear production journey—from brief to finished packaging—built around
            materials, craft, and reliable delivery.
          </motion.p>
        </div>

        <ProcessTimeline />

        <motion.footer
          className="process-section__closing"
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -6% 0px" }}
          transition={{
            delay: reduceMotion ? 0 : 0.1,
            duration: reduceMotion ? 0.01 : 0.6,
            ease,
          }}
        >
          <p>Ready to bring your packaging to life?</p>
          <a href="#contact" onClick={highlightContactAfterScroll}>
            Start Your Project <span aria-hidden="true">→</span>
          </a>
        </motion.footer>
      </div>
    </section>
  );
}
