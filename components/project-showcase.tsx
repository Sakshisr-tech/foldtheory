"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { selectedProjects } from "@/data/projects";

const ease = [0.22, 1, 0.36, 1] as const;
const editorialLayouts = [
  "feature",
  "portrait",
  "square",
  "landscape",
  "campaign",
  "square",
  "landscape",
  "feature",
  "portrait",
] as const;

type ProjectShowcaseProps = {
  variant: "desktop" | "mobile";
};

export function ProjectShowcase({ variant }: ProjectShowcaseProps) {
  const reduceMotion = useReducedMotion();
  const wrapperClass = `selected-work__editorial-grid selected-work__editorial-grid--${variant}`;

  return (
    <div className={wrapperClass}>
      {selectedProjects.map((project, index) => {
        const editorialLayout = editorialLayouts[index] ?? "portrait-right";

        return (
          <motion.article
            className={`editorial-project editorial-project--${editorialLayout}`}
            data-project={project.id}
            key={project.id}
            initial={reduceMotion ? false : { opacity: 0, y: 28, scale: 0.98 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "0px 0px -8% 0px" }}
            transition={{
              delay: reduceMotion ? 0 : index * 0.08,
              duration: reduceMotion ? 0.01 : 0.7,
              ease,
            }}
          >
            <div className="editorial-project__frame">
              <motion.div
                className="editorial-project__mask"
                initial={reduceMotion ? false : { clipPath: "inset(100% 0 0 0)" }}
                whileInView={reduceMotion ? undefined : { clipPath: "inset(0% 0 0 0)" }}
                viewport={{ once: true, margin: "0px 0px -8% 0px" }}
                transition={{
                  delay: reduceMotion ? 0 : index * 0.08,
                  duration: reduceMotion ? 0.01 : 0.82,
                  ease,
                }}
              >
                <div className="editorial-project__media">
                  <Image
                    src={project.coverImage.src}
                    alt={project.coverImage.alt}
                    fill
                    sizes="(max-width: 720px) 100vw, (max-width: 1000px) 50vw, 70vw"
                    unoptimized
                  />
                  <span className="editorial-project__number" aria-hidden="true">{project.number}</span>
                </div>
              </motion.div>

              <div className="editorial-project__copy">
                <p className="editorial-project__category">{project.category}</p>
                <h3>{project.title}</h3>
                <p className="editorial-project__summary">{project.summary}</p>
              </div>
            </div>
          </motion.article>
        );
      })}
    </div>
  );
}
