"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ProcessTimeline } from "@/components/process-timeline";

const ease = [0.22, 1, 0.36, 1] as const;

export function ProcessSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="process" className="section section--process process-editorial" aria-labelledby="process-title">
      <motion.span
        className="process-background-word"
        aria-hidden="true"
        initial={reduceMotion ? false : { opacity: 0 }}
        whileInView={reduceMotion ? undefined : { opacity: 1 }}
        viewport={{ once: true, margin: "0px 0px -8% 0px" }}
        transition={{ duration: reduceMotion ? 0.01 : 1.2, ease }}
      >
        PROCESS
      </motion.span>
      <div className="section-shell">
        <motion.div
          className="section-label process-section__label"
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -8% 0px" }}
          transition={{ duration: reduceMotion ? 0.01 : 0.6, ease }}
        >
          <span>07</span>
          <span>Studio process</span>
        </motion.div>

        <div className="process-section__heading">
          <motion.h2
            id="process-title"
            initial={reduceMotion ? false : { opacity: 0, y: 30 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -8% 0px" }}
            transition={{ duration: reduceMotion ? 0.01 : 0.7, ease }}
          >
            From Vision to Production
          </motion.h2>
          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -8% 0px" }}
            transition={{ delay: reduceMotion ? 0 : 0.16, duration: reduceMotion ? 0.01 : 0.62, ease }}
          >
            Every project follows a carefully considered journey—from the first conversation to final production—ensuring every detail is crafted with intention.
          </motion.p>
        </div>

        <ProcessTimeline />

        <motion.footer
          className="process-section__closing"
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -6% 0px" }}
          transition={{ delay: reduceMotion ? 0 : 0.12, duration: reduceMotion ? 0.01 : 0.62, ease }}
        >
          <p>Ready to begin your packaging journey?</p>
          <a href="#contact">Start Your Project <span aria-hidden="true">→</span></a>
        </motion.footer>
      </div>
    </section>
  );
}
