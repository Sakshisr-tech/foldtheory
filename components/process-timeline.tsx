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
        transition={{ duration: reduceMotion ? 0.01 : 1, ease }}
      />
      <motion.span
        className="process-journey__rail process-journey__rail--vertical"
        aria-hidden="true"
        initial={reduceMotion ? false : { scaleY: 0 }}
        whileInView={reduceMotion ? undefined : { scaleY: 1 }}
        viewport={{ once: true, margin: "0px 0px -8% 0px" }}
        transition={{ duration: reduceMotion ? 0.01 : 1.05, ease }}
      />
      <ol>
        {processSteps.map((step, index) => (
          <motion.li
            key={step.id}
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            transition={{
              delay: reduceMotion ? 0 : 0.08 + index * 0.1,
              duration: reduceMotion ? 0.01 : 0.65,
              ease,
            }}
          >
            <motion.span
              className="process-step__connector"
              aria-hidden="true"
              initial={reduceMotion ? false : { scaleX: 0 }}
              whileInView={reduceMotion ? undefined : { scaleX: 1 }}
              viewport={{ once: true }}
              transition={{
                delay: reduceMotion ? 0 : index * 0.1,
                duration: reduceMotion ? 0.01 : 0.65,
                ease,
              }}
            />
            <article>
              <div className="process-step__top">
                <span className="process-step__number">{step.number}</span>
              </div>
              <span className="process-step__node" aria-hidden="true" />
              <h3>{step.title}</h3>
              <i className="process-step__accent" aria-hidden="true" />
              <p>{step.description}</p>
            </article>
          </motion.li>
        ))}
      </ol>
    </div>
  );
}
