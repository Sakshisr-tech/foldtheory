"use client";

import { motion, useReducedMotion } from "framer-motion";
import { processSteps } from "@/data/process";

const ease = [0.22, 1, 0.36, 1] as const;

export function ProcessTimeline() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="process-timeline process-journey">
      <motion.span
        className="process-journey__rail process-journey__rail--horizontal"
        aria-hidden="true"
        initial={reduceMotion ? false : { scaleX: 0 }}
        whileInView={reduceMotion ? undefined : { scaleX: 1 }}
        viewport={{ once: true, margin: "0px 0px -12% 0px" }}
        transition={{ duration: reduceMotion ? 0.01 : 1.05, ease }}
      />
      <motion.span
        className="process-journey__rail process-journey__rail--vertical"
        aria-hidden="true"
        initial={reduceMotion ? false : { scaleY: 0 }}
        whileInView={reduceMotion ? undefined : { scaleY: 1 }}
        viewport={{ once: true, margin: "0px 0px -8% 0px" }}
        transition={{ duration: reduceMotion ? 0.01 : 1.15, ease }}
      />
      <ol>
        {processSteps.map((step, index) => (
          <motion.li
            key={step.id}
            initial={reduceMotion ? false : { opacity: 0, y: 28 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            transition={{
              delay: reduceMotion ? 0 : 0.1 + index * 0.11,
              duration: reduceMotion ? 0.01 : 0.66,
              ease,
            }}
          >
            <motion.span
              className="process-step__connector"
              aria-hidden="true"
              initial={reduceMotion ? false : { scaleX: 0 }}
              whileInView={reduceMotion ? undefined : { scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: reduceMotion ? 0 : index * 0.11, duration: reduceMotion ? 0.01 : 0.7, ease }}
            />
            <article>
              <div className="process-step__top">
                <motion.div
                  className="process-step__number-reveal"
                  initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                  whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: reduceMotion ? 0 : 0.08 + index * 0.11, duration: reduceMotion ? 0.01 : 0.58, ease }}
                >
                  <span className="process-step__number">{step.number}</span>
                </motion.div>
              </div>
              <motion.span
                className="process-step__node"
                aria-hidden="true"
                initial={reduceMotion ? false : { opacity: 0, scale: 0.5 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: reduceMotion ? 0 : 0.14 + index * 0.11, duration: reduceMotion ? 0.01 : 0.52, ease }}
              />
              <motion.h3
                initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: reduceMotion ? 0 : 0.19 + index * 0.11, duration: reduceMotion ? 0.01 : 0.58, ease }}
              >
                {step.title}
              </motion.h3>
              <motion.i
                className="process-step__accent"
                aria-hidden="true"
                initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: reduceMotion ? 0 : 0.23 + index * 0.11, duration: reduceMotion ? 0.01 : 0.52, ease }}
              />
              <motion.p
                initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: reduceMotion ? 0 : 0.27 + index * 0.11, duration: reduceMotion ? 0.01 : 0.55, ease }}
              >
                {step.description}
              </motion.p>
            </article>
          </motion.li>
        ))}
      </ol>
    </div>
  );
}
