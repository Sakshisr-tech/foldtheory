"use client";

import { motion, useReducedMotion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

export function FinalCta() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="final-cta" aria-labelledby="final-cta-title">
      <motion.div
        className="final-cta__watermark"
        aria-hidden="true"
        initial={reduceMotion ? false : { opacity: 0 }}
        whileInView={reduceMotion ? undefined : { opacity: 0.05 }}
        viewport={{ once: true, margin: "0px 0px -10% 0px" }}
        transition={{ duration: reduceMotion ? 0.01 : 1.2, ease }}
      >
        <span>FOLD</span>
        <span>CREATE</span>
        <span>REMEMBER</span>
      </motion.div>

      <div className="section-shell final-cta__shell">
        <motion.div
          className="final-cta__label"
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          transition={{ duration: reduceMotion ? 0.01 : 0.58, ease }}
        >
          <span>Start a project</span>
          <i aria-hidden="true" />
        </motion.div>

        <h2 id="final-cta-title">
          {["Every memorable package", "starts with a conversation."].map((line, index) => (
            <motion.span
              key={line}
              initial={reduceMotion ? false : { opacity: 0, y: 28 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              transition={{ delay: reduceMotion ? 0 : 0.08 + index * 0.1, duration: reduceMotion ? 0.01 : 0.7, ease }}
            >
              {line}
            </motion.span>
          ))}
        </h2>

        <div className="final-cta__lower">
          <motion.div
            className="final-cta__copy"
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            transition={{ delay: reduceMotion ? 0 : 0.26, duration: reduceMotion ? 0.01 : 0.62, ease }}
          >
            <p>Tell us what you are creating, where it needs to live and what you want people to remember.</p>
            <a href="#process">View Our Process <span aria-hidden="true">&#8594;</span></a>
          </motion.div>

          <motion.div
            className="final-cta__button-wrap"
            initial={reduceMotion ? false : { opacity: 0, scale: 0.98 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            transition={{ delay: reduceMotion ? 0 : 0.32, duration: reduceMotion ? 0.01 : 0.58, ease }}
          >
            <a className="final-cta__button" href="#contact">
              <span>Discuss Your Project</span>
              <i aria-hidden="true">&#8599;</i>
            </a>
          </motion.div>
        </div>

        <motion.div
          className="final-cta__meta"
          initial={reduceMotion ? false : { opacity: 0, y: 10 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: reduceMotion ? 0 : 0.4, duration: reduceMotion ? 0.01 : 0.56, ease }}
        >
          <span>New Delhi, India</span>
          <a href="https://www.instagram.com/fold.theory2/" target="_blank" rel="noreferrer">Instagram</a>
          <span>Independent branding &amp; packaging studio</span>
        </motion.div>
      </div>
    </section>
  );
}
