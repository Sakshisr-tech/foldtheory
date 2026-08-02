"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;
const archiveProjects = [
  { src: "/images/archive/namchef-green-boxes.jpg", alt: "Deep green luxury presentation boxes", category: "Luxury Packaging", project: "Namchef", size: "medium" },
  { src: "/images/archive/soda-table.jpg", alt: "Soda Shop bottle branding at a dining table", category: "Beverage Branding", project: "Soda Shop", size: "portrait" },
  { src: "/images/archive/branded-mugs.jpg", alt: "Secret Ingredient and Khoya identities on ceramic mugs", category: "Brand Applications", project: "Khoya × Secret Ingredient", size: "short" },
  { src: "/images/archive/cocktail-red.jpg", alt: "Metallic crane stirrer in a layered cocktail", category: "Hospitality Branding", project: "The Crane Detail", size: "portrait" },
  { src: "/images/archive/cecilia-sun.jpg", alt: "Illustrated pasta-kit boxes in warm directional light", category: "Food Packaging", project: "Cecilia's Pizzeria", size: "medium" },
  { src: "/images/archive/injectoplast-tubes.png", alt: "Custom printed cylindrical tea and retail packaging", category: "Premium Tubes", project: "Goodwyn × Matrix", size: "tall" },
  { src: "/images/archive/ice-pop-still.jpg", alt: "Colourful Ice Pop cartons arranged on a light table", category: "Retail Packaging", project: "Ice Pop", size: "medium" },
  { src: "/images/archive/coffee-carrier-study.jpg", alt: "Structural takeaway cup carriers in kraft and white board", category: "Structural Design", project: "Coffee Carrier Study", size: "short" },
  { src: "/images/archive/cocktail-pink.jpg", alt: "Crane cocktail stirrer with a pink highball", category: "Hospitality Detail", project: "Crane Stirrer", size: "short" },
  { src: "/images/archive/pizza-table.jpg", alt: "Pizza branding across wraps, coasters and tableware", category: "Restaurant Identity", project: "Bombaa", size: "medium" },
  { src: "/images/archive/khoya-boxes.jpg", alt: "Khoya gifting boxes arranged on a studio table", category: "Premium Retail", project: "Khoya Gifting", size: "short" },
  { src: "/images/archive/cecilia-close.jpg", alt: "Close crop of an illustrated Cecilia pasta-kit box", category: "Print Detail", project: "Cecilia's Pizzeria", size: "portrait" },
  { src: "/images/archive/ice-pop-shop.jpg", alt: "Ice Pop cartons in a colourful branded retail setting", category: "Packaging System", project: "Ice Pop", size: "tall" },
  { src: "/images/archive/cocktail-gold.jpg", alt: "Metallic crane stirrer and cocktail detail", category: "Branded Object", project: "The Crane Detail", size: "short" },
  { src: "/images/archive/coffee-carriers-light.jpg", alt: "Takeaway coffee carriers and cups in a bright café setting", category: "Food Service", project: "Carrier Collection", size: "medium" },
  { src: "/images/archive/pizza-close.jpg", alt: "Pizza, branded liner and colourful coaster applications", category: "Print Collateral", project: "Bombaa", size: "short" },
] as const;

export function GalleryArchive() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="archive" className="section section--archive project-archive" aria-labelledby="archive-title">
      <div className="section-shell">
        <header className="project-archive__header">
          <motion.span
            className="project-archive__ghost"
            aria-hidden="true"
            initial={reduceMotion ? false : { opacity: 0 }}
            whileInView={reduceMotion ? undefined : { opacity: 1 }}
            viewport={{ once: true, margin: "0px 0px -8% 0px" }}
            transition={{ duration: reduceMotion ? 0.01 : 1.15, ease }}
          >
            Archive
          </motion.span>

          <div className="project-archive__intro">
            <motion.span
              className="project-archive__number"
              initial={reduceMotion ? false : { opacity: 0, y: 14 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -8% 0px" }}
              transition={{ duration: reduceMotion ? 0.01 : 0.52, ease }}
            >
              06
            </motion.span>
            <motion.h2
              id="archive-title"
              initial={reduceMotion ? false : { opacity: 0, y: 30 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -8% 0px" }}
              transition={{ delay: reduceMotion ? 0 : 0.06, duration: reduceMotion ? 0.01 : 0.72, ease }}
            >
              Project Archive
            </motion.h2>
            <motion.p
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -8% 0px" }}
              transition={{ delay: reduceMotion ? 0 : 0.17, duration: reduceMotion ? 0.01 : 0.62, ease }}
            >
              A growing archive of custom packaging created to help brands become instantly recognizable.
            </motion.p>
          </div>

          <motion.aside
            className="project-archive__details"
            aria-label="Archive disciplines"
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -8% 0px" }}
            transition={{ delay: reduceMotion ? 0 : 0.24, duration: reduceMotion ? 0.01 : 0.62, ease }}
          >
            <div>
              <span>Disciplines</span>
              <p>Packaging<br />Brand Identity<br />Print Production</p>
            </div>
            <div>
              <span>Across</span>
              <p>Food &amp; Beverage<br />Hospitality<br />Retail &amp; Luxury</p>
            </div>
          </motion.aside>
        </header>

        <motion.div
          className="project-archive__divider"
          aria-hidden="true"
          initial={reduceMotion ? false : { scaleX: 0 }}
          whileInView={reduceMotion ? undefined : { scaleX: 1 }}
          viewport={{ once: true, margin: "0px 0px -8% 0px" }}
          transition={{ delay: reduceMotion ? 0 : 0.3, duration: reduceMotion ? 0.01 : 0.82, ease }}
        />

        <div className="project-archive__masonry" role="list" aria-label="Fold Theory project archive">
          {archiveProjects.map((project, index) => (
            <motion.figure
              className={`project-archive__item project-archive__item--${project.size}`}
              key={`${project.src}-${index}`}
              role="listitem"
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -5% 0px" }}
              transition={{ delay: reduceMotion ? 0 : (index % 6) * 0.075, duration: reduceMotion ? 0.01 : 0.58, ease }}
            >
              <Image
                src={project.src}
                alt={project.alt}
                fill
                sizes="(max-width: 720px) 92vw, (max-width: 1000px) 44vw, 18vw"
                unoptimized
              />
              <figcaption>
                <span>{project.category}</span>
                <strong>{project.project}</strong>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
