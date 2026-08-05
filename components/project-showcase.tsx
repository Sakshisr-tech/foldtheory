"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import {
  khoyaRowProjectIds,
  selectedProjects,
  type Project,
} from "@/data/projects";

const ease = [0.22, 1, 0.36, 1] as const;

/** Layout classes preserved for every Selected Work card outside the Khoya row. */
const editorialLayoutById: Record<string, string> = {
  "cecilia-pizzeria": "feature",
  "soda-shop": "portrait",
  "ice-pop": "square",
  bombaa: "landscape",
  khoya: "campaign",
  "coffee-carriers": "trio",
  "khoya-gifting": "trio",
  "secret-ingredient-khoya": "square",
  "presentation-gifting": "landscape",
  "heads-up-for-tails": "feature",
  "radisson-blu": "portrait",
};

const khoyaRowIdSet = new Set<string>(khoyaRowProjectIds);

type ProjectShowcaseProps = {
  variant: "desktop" | "mobile";
};

type EditorialProjectCardProps = {
  project: Project;
  index: number;
  number: string;
  reduceMotion: boolean | null;
};

function EditorialProjectCard({
  project,
  index,
  number,
  reduceMotion,
}: EditorialProjectCardProps) {
  const editorialLayout = editorialLayoutById[project.id] ?? "portrait";

  return (
    <motion.article
      className={`editorial-project editorial-project--${editorialLayout}`}
      data-project={project.id}
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
              sizes="(max-width: 720px) 100vw, (max-width: 1100px) 50vw, 33vw"
              unoptimized
            />
            <span className="editorial-project__number" aria-hidden="true">
              {number}
            </span>
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
}

export function ProjectShowcase({ variant }: ProjectShowcaseProps) {
  const reduceMotion = useReducedMotion();
  const wrapperClass = `selected-work__editorial-grid selected-work__editorial-grid--${variant}`;

  const beforeKhoyaRow: Project[] = [];
  const khoyaRow: Project[] = [];
  const afterKhoyaRow: Project[] = [];

  for (const project of selectedProjects) {
    if (khoyaRowIdSet.has(project.id)) {
      khoyaRow.push(project);
    } else if (khoyaRow.length > 0) {
      afterKhoyaRow.push(project);
    } else {
      beforeKhoyaRow.push(project);
    }
  }

  // Keep Khoya → Coffee Carriers → Khoya Gifting order regardless of data iteration.
  const orderedKhoyaRow = khoyaRowProjectIds
    .map((id) => khoyaRow.find((project) => project.id === id))
    .filter((project): project is Project => project !== undefined);

  // Continuous index across all Selected Work groups (before / Khoya row / after).
  let listIndex = 0;

  return (
    <div className={wrapperClass}>
      {beforeKhoyaRow.map((project) => {
        const index = listIndex++;
        const cardNumber = String(index + 1).padStart(2, "0");
        return (
          <EditorialProjectCard
            key={project.id}
            project={project}
            index={index}
            number={cardNumber}
            reduceMotion={reduceMotion}
          />
        );
      })}

      {orderedKhoyaRow.length > 0 && (
        <div className="selected-work__khoya-row">
          {orderedKhoyaRow.map((project) => {
            const index = listIndex++;
            const cardNumber = String(index + 1).padStart(2, "0");
            return (
              <EditorialProjectCard
                key={project.id}
                project={project}
                index={index}
                number={cardNumber}
                reduceMotion={reduceMotion}
              />
            );
          })}
        </div>
      )}

      {afterKhoyaRow.map((project) => {
        const index = listIndex++;
        const cardNumber = String(index + 1).padStart(2, "0");
        return (
          <EditorialProjectCard
            key={project.id}
            project={project}
            index={index}
            number={cardNumber}
            reduceMotion={reduceMotion}
          />
        );
      })}
    </div>
  );
}
