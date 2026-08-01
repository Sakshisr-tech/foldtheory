"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  getAdjacentProjects,
  getProjectById,
  selectedProjects,
  type Project,
} from "@/data/projects";

const ease = [0.22, 1, 0.36, 1] as const;
const projectReveal: Record<Project["layout"], { opacity: number; x?: number; y?: number; scale?: number }> = {
  feature: { opacity: 0, y: 24 },
  portrait: { opacity: 0, x: 22 },
  split: { opacity: 0, y: 14 },
  fullBleed: { opacity: 0, scale: 1.012 },
  layered: { opacity: 0, x: -18 },
  closing: { opacity: 0, y: 20 },
};

type OpenProjectEvent = CustomEvent<{
  projectId: string;
  trigger?: HTMLElement;
}>;

export function ProjectShowcase() {
  const reduceMotion = useReducedMotion();
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const modalScrollRef = useRef<HTMLDivElement>(null);
  const originRef = useRef<HTMLElement | null>(null);
  const pageScrollRef = useRef(0);

  const lockPage = useCallback(() => {
    pageScrollRef.current = window.scrollY;
    document.body.style.position = "fixed";
    document.body.style.top = `-${pageScrollRef.current}px`;
    document.body.style.width = "100%";
    document.body.style.overflow = "hidden";
  }, []);

  const unlockPage = useCallback(() => {
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.width = "";
    document.body.style.overflow = "";
    window.scrollTo(0, pageScrollRef.current);
  }, []);

  const openProject = useCallback((projectId: string, trigger?: HTMLElement) => {
    const project = getProjectById(projectId);
    if (!project) return;
    if (trigger) originRef.current = trigger;
    setActiveProject(project);
  }, []);

  const closeProject = useCallback(() => {
    const dialog = dialogRef.current;
    if (dialog?.open) dialog.close();
    setActiveProject(null);
    unlockPage();
    window.requestAnimationFrame(() => originRef.current?.focus());
  }, [unlockPage]);

  useEffect(() => {
    const onOpenProject = (event: Event) => {
      const customEvent = event as OpenProjectEvent;
      delete document.documentElement.dataset.foldTheoryPendingProject;
      openProject(customEvent.detail.projectId, customEvent.detail.trigger);
    };
    window.addEventListener("fold-theory:open-project", onOpenProject);
    const pendingProject = document.documentElement.dataset.foldTheoryPendingProject;
    let pendingTimer: number | undefined;
    if (pendingProject) {
      delete document.documentElement.dataset.foldTheoryPendingProject;
      const pendingTrigger = document.activeElement instanceof HTMLElement ? document.activeElement : undefined;
      pendingTimer = window.setTimeout(() => openProject(pendingProject, pendingTrigger), 0);
    }
    return () => {
      window.removeEventListener("fold-theory:open-project", onOpenProject);
      if (pendingTimer !== undefined) window.clearTimeout(pendingTimer);
    };
  }, [openProject]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!activeProject || !dialog || dialog.open) return;
    lockPage();
    dialog.showModal();
    window.requestAnimationFrame(() => {
      modalScrollRef.current?.scrollTo({ top: 0 });
      dialog.querySelector<HTMLButtonElement>(".project-modal__close")?.focus();
    });
  }, [activeProject, lockPage]);

  useEffect(() => {
    if (!activeProject) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      event.preventDefault();
      closeProject();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [activeProject, closeProject]);

  useEffect(
    () => () => {
      if (dialogRef.current?.open) dialogRef.current.close();
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
    },
    [],
  );

  const moveProject = (direction: "previous" | "next") => {
    if (!activeProject) return;
    const adjacent = getAdjacentProjects(activeProject.id)[direction];
    setActiveProject(adjacent);
    modalScrollRef.current?.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  };

  const openFromTrigger = (projectId: string) =>
    (event: React.MouseEvent<HTMLButtonElement>) => {
      openProject(projectId, event.currentTarget);
    };

  return (
    <>
      <div className="selected-work__continuum">
        {selectedProjects.map((project, index) => (
          <motion.article
            className={`project-story project-story--${project.layout}`}
            key={project.id}
            initial={reduceMotion ? false : projectReveal[project.layout]}
            whileInView={reduceMotion ? undefined : { opacity: 1, x: 0, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "0px 0px 12% 0px" }}
            transition={{ duration: 0.76, ease }}
          >
            <div className="project-story__media-composition">
              <button
                type="button"
                className="project-story__main-media"
                aria-label={`View ${project.title} project`}
                aria-haspopup="dialog"
                onClick={openFromTrigger(project.id)}
              >
                <Image
                  src={project.coverImage.src}
                  alt={project.coverImage.alt}
                  fill
                  sizes={project.layout === "portrait" ? "(max-width: 800px) 100vw, 42vw" : "(max-width: 800px) 100vw, 74vw"}
                  unoptimized
                />
                <span className="project-story__explore" aria-hidden="true">Explore</span>
              </button>

              <figure className="project-story__detail-crop" aria-hidden="true">
                <Image
                  src={project.coverImage.src}
                  alt=""
                  fill
                  sizes="(max-width: 800px) 38vw, 24vw"
                  unoptimized
                />
              </figure>

              <span className="project-story__floating-number" aria-hidden="true">
                {project.number}
              </span>
            </div>

            <div className="project-story__narrative">
              <p className="project-story__kicker">
                <span>{project.industry}</span>
                <span>{project.category}</span>
              </p>
              <h3>{project.title}</h3>
              <p className="project-story__summary">{project.summary}</p>
              <p className="project-story__services">{project.services.join(" · ")}</p>
              <button
                type="button"
                className="project-story__view"
                aria-haspopup="dialog"
                onClick={openFromTrigger(project.id)}
              >
                View Project <span aria-hidden="true">↗</span>
              </button>
            </div>

            {index < selectedProjects.length - 1 && (
              <span className="project-story__connector" aria-hidden="true" />
            )}
          </motion.article>
        ))}
      </div>

      <div className="selected-work__closing">
        <p className="eyebrow">Your product, thoughtfully unfolded</p>
        <h3>Have a product worth remembering?</h3>
        <div>
          <a className="button button--primary" href="#contact">Discuss Your Project <span aria-hidden="true">↗</span></a>
          <a className="text-link" href="#archive">Explore the Full Archive <span aria-hidden="true">↓</span></a>
        </div>
      </div>

      <dialog
        ref={dialogRef}
        className="project-modal"
        aria-labelledby={activeProject ? `project-modal-title-${activeProject.id}` : undefined}
        aria-describedby={activeProject ? `project-modal-summary-${activeProject.id}` : undefined}
        onCancel={(event) => {
          event.preventDefault();
          closeProject();
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeProject();
        }}
      >
        {activeProject && (
          <motion.div
            className="project-modal__panel"
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.52, ease }}
          >
            <div className="project-modal__bar">
              <span>Project {activeProject.number} / {String(selectedProjects.length).padStart(2, "0")}</span>
              <button className="project-modal__close" type="button" onClick={closeProject}>
                Close <span aria-hidden="true">×</span>
              </button>
            </div>

            <div ref={modalScrollRef} className="project-modal__scroll">
              <header className="project-modal__header">
                <p className="eyebrow">{activeProject.category} · {activeProject.industry}</p>
                <h2 id={`project-modal-title-${activeProject.id}`}>{activeProject.title}</h2>
                <p id={`project-modal-summary-${activeProject.id}`}>{activeProject.summary}</p>
                <ul aria-label="Services provided">
                  {activeProject.services.map((service) => <li key={service}>{service}</li>)}
                </ul>
              </header>

              <div className="project-modal__gallery">
                {[activeProject.coverImage, ...activeProject.detailImages.filter((image) => image.src !== activeProject.coverImage.src)].map((image, index) => (
                  <figure key={`${image.src}-${index}`} className={index === 0 ? "project-modal__image project-modal__image--lead" : "project-modal__image"}>
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(max-width: 800px) 100vw, 78vw"
                      unoptimized
                    />
                  </figure>
                ))}
              </div>

              <div className="project-modal__narrative">
                <article>
                  <span>Overview</span>
                  <h3>The project</h3>
                  <p>{activeProject.overview}</p>
                </article>
                <article>
                  <span>Challenge</span>
                  <h3>What needed solving</h3>
                  <p>{activeProject.challenge}</p>
                </article>
                <article>
                  <span>Approach</span>
                  <h3>How the design responds</h3>
                  <p>{activeProject.solution}</p>
                </article>
                <article>
                  <span>Outcome</span>
                  <h3>What was produced</h3>
                  <p>{activeProject.outcome}</p>
                </article>
              </div>

              <div className="project-modal__details">
                <span>Packaging details</span>
                <ul>
                  {activeProject.packagingDetails.map((detail) => <li key={detail}>{detail}</li>)}
                </ul>
                {activeProject.sourceUrl && (
                  <a href={activeProject.sourceUrl} target="_blank" rel="noreferrer" className="text-link">
                    View the official studio archive <span aria-hidden="true">↗</span>
                  </a>
                )}
              </div>

              <nav className="project-modal__nav" aria-label="Browse projects">
                <button type="button" onClick={() => moveProject("previous")}>
                  <span aria-hidden="true">←</span> Previous project
                </button>
                <button type="button" onClick={() => moveProject("next")}>
                  Next project <span aria-hidden="true">→</span>
                </button>
                <a
                  href="#work"
                  onClick={() => {
                    originRef.current = null;
                    closeProject();
                  }}
                >
                  Return to Selected Work <span aria-hidden="true">↑</span>
                </a>
              </nav>
              <p className="sr-only" aria-live="polite">Showing {activeProject.title}</p>
            </div>
          </motion.div>
        )}
      </dialog>
    </>
  );
}
