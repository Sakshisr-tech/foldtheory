"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { services } from "@/data/services";

const ease = [0.22, 1, 0.36, 1] as const;
const serviceCopy: Record<string, string> = {
  "brand-strategy": "Helping brands discover a clear position before design begins.",
  "visual-identity": "Building timeless visual systems with lasting recognition.",
  "packaging-design": "Crafting premium packaging that feels as remarkable as the product inside.",
  "production-support": "Ensuring every detail translates beautifully into manufacturing.",
};
const featuredServiceIds = [
  "brand-strategy",
  "visual-identity",
  "packaging-design",
  "production-support",
] as const;
const editorialServices = featuredServiceIds
  .map((id) => services.find((service) => service.id === id))
  .filter((service): service is (typeof services)[number] => Boolean(service));
const defaultServiceId = "packaging-design";

export function ServicesEditorial() {
  const reduceMotion = useReducedMotion();
  const [activeId, setActiveId] = useState(defaultServiceId);
  const activeService = editorialServices.find((service) => service.id === activeId) ?? editorialServices[0];

  return (
    <section id="services" className="section services-editorial" aria-labelledby="services-title">
      <div className="section-shell">
        <motion.div
          className="section-label services-editorial__label"
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -8% 0px" }}
          transition={{ duration: reduceMotion ? 0.01 : 0.58, ease }}
        >
          <span>03</span>
          <span>Services</span>
        </motion.div>

        <div className="services-editorial__grid">
          <div className="services-editorial__content">
            <span className="services-editorial__watermark" aria-hidden="true">CRAFT</span>

            <h2 id="services-title">
              {["Designing", "packaging that", "people remember."].map((line, index) => (
                <motion.span
                  key={line}
                  initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                  whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "0px 0px -8% 0px" }}
                  transition={{ delay: reduceMotion ? 0 : index * 0.07, duration: reduceMotion ? 0.01 : 0.66, ease }}
                >
                  {line}
                </motion.span>
              ))}
            </h2>

            <motion.p
              className="services-editorial__intro"
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -8% 0px" }}
              transition={{ delay: reduceMotion ? 0 : 0.16, duration: reduceMotion ? 0.01 : 0.6, ease }}
            >
              From strategy and identity to structural packaging and production, every decision is
              made to create memorable physical brand experiences.
            </motion.p>

            <ol className="services-editorial__list">
              {editorialServices.map((service, index) => {
                const active = service.id === activeId;

                return (
                  <motion.li
                    className={active ? "is-active" : ""}
                    key={service.id}
                    onMouseEnter={() => setActiveId(service.id)}
                    initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                    whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "0px 0px -5% 0px" }}
                    transition={{ delay: reduceMotion ? 0 : index * 0.065, duration: reduceMotion ? 0.01 : 0.55, ease }}
                  >
                    <button
                      type="button"
                      aria-pressed={active}
                      onClick={() => setActiveId(service.id)}
                      onFocus={() => setActiveId(service.id)}
                    >
                      <span className="services-editorial__number">{service.number}</span>
                      <span className="services-editorial__service-copy">
                        <strong>{service.title}</strong>
                        <small>{serviceCopy[service.id]}</small>
                      </span>
                      <i aria-hidden="true">&#8594;</i>
                    </button>

                    {active && (
                      <figure className="services-editorial__mobile-image">
                        <Image
                          src={service.relatedImage.src}
                          alt={service.relatedImage.alt}
                          fill
                          sizes="92vw"
                          unoptimized
                        />
                      </figure>
                    )}
                  </motion.li>
                );
              })}
            </ol>

            <motion.a
              className="services-editorial__link"
              href="#process"
              initial={reduceMotion ? false : { opacity: 0, y: 10 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: reduceMotion ? 0 : 0.2, duration: reduceMotion ? 0.01 : 0.54, ease }}
            >
              Explore Our Process <span aria-hidden="true">&#8594;</span>
            </motion.a>
          </div>

          <motion.figure
            className="services-editorial__visual"
            initial={reduceMotion ? false : { opacity: 0, scale: 1.018 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "0px 0px -8% 0px" }}
            transition={{ duration: reduceMotion ? 0.01 : 0.78, ease }}
            aria-live="polite"
          >
            {editorialServices.map((service) => {
              const active = service.id === activeService.id;

              return (
                <div
                  className={`services-editorial__visual-image ${active ? "is-active" : ""}`}
                  key={service.id}
                  aria-hidden={!active}
                >
                  <Image
                    src={service.relatedImage.src}
                    alt={active ? service.relatedImage.alt : ""}
                    fill
                    sizes="(max-width: 1000px) 92vw, 42vw"
                    unoptimized
                  />
                </div>
              );
            })}

            <figcaption>
              <span>Related studio detail</span>
              <span>{activeService.title}</span>
            </figcaption>
          </motion.figure>
        </div>
      </div>
    </section>
  );
}
