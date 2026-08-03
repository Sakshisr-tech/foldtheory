"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ContactForm } from "@/components/contact-form";

const ease = [0.22, 1, 0.36, 1] as const;

export function ContactSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="contact" className="contact-section contact-experience" aria-labelledby="contact-title">
      <motion.span
        className="contact-experience__ghost"
        aria-hidden="true"
        initial={reduceMotion ? false : { opacity: 0 }}
        whileInView={reduceMotion ? undefined : { opacity: 1 }}
        viewport={{ once: true, margin: "0px 0px -8% 0px" }}
        transition={{ duration: reduceMotion ? 0.01 : 1.15, ease }}
      >
        BEGIN
      </motion.span>

      <div className="section-shell contact-experience__shell">
        <motion.div
          className="section-label contact-experience__label"
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -8% 0px" }}
          transition={{ duration: reduceMotion ? 0.01 : 0.58, ease }}
        >
          <span>08</span>
          <span>Begin a conversation</span>
        </motion.div>

        <div className="contact-experience__layout">
          <aside className="contact-experience__intro">
            <h2 id="contact-title">
              {["Let’s create", "packaging people", "remember."].map((line, index) => (
                <motion.span
                  key={line}
                  initial={reduceMotion ? false : { opacity: 0, y: 28 }}
                  whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "0px 0px -8% 0px" }}
                  transition={{ delay: reduceMotion ? 0 : 0.06 + index * 0.09, duration: reduceMotion ? 0.01 : 0.68, ease }}
                >
                  {line}
                </motion.span>
              ))}
            </h2>

            <motion.p
              className="contact-experience__copy"
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -8% 0px" }}
              transition={{ delay: reduceMotion ? 0 : 0.24, duration: reduceMotion ? 0.01 : 0.58, ease }}
            >
              Tell us about your brand, product and what you want the packaging to achieve.
            </motion.p>

            <motion.dl
              className="contact-experience__details"
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -8% 0px" }}
              transition={{ delay: reduceMotion ? 0 : 0.31, duration: reduceMotion ? 0.01 : 0.58, ease }}
            >
              <div>
                <dt>Email</dt>
                <dd><a href="mailto:foldtheory2@gmail.com">foldtheory2@gmail.com</a></dd>
              </div>
              <div>
                <dt>Instagram</dt>
                <dd><a href="https://www.instagram.com/fold.theory2/" target="_blank" rel="noreferrer">@fold.theory2</a></dd>
              </div>
              <div>
                <dt>Location</dt>
                <dd>New Delhi, India</dd>
              </div>
            </motion.dl>

            <motion.p
              className="contact-experience__reassurance"
              initial={reduceMotion ? false : { opacity: 0, y: 14 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -8% 0px" }}
              transition={{ delay: reduceMotion ? 0 : 0.38, duration: reduceMotion ? 0.01 : 0.56, ease }}
            >
              Every enquiry is reviewed personally.<br />We usually respond within 1–2 business days.
            </motion.p>
          </aside>

          <ContactForm />
        </div>
      </div>
    </section>
  );
}
