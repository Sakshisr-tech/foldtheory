"use client";

import Image from "next/image";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

export function HeroExperience() {
  const reduceMotion = useReducedMotion();
  const [showScrollCue, setShowScrollCue] = useState(true);
  const frame = useRef<number | null>(null);
  const finePointer = useRef(false);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, { stiffness: 78, damping: 27, mass: 0.72 });
  const smoothY = useSpring(pointerY, { stiffness: 78, damping: 27, mass: 0.72 });
  const mainX = useTransform(smoothX, (value) => value * 4);
  const mainY = useTransform(smoothY, (value) => value * 4);
  const detailX = useTransform(smoothX, (value) => value * -7);
  const detailY = useTransform(smoothY, (value) => value * -7);
  const paperX = useTransform(smoothX, (value) => value * 8);
  const paperY = useTransform(smoothY, (value) => value * 8);
  const headlineX = useTransform(smoothX, (value) => value * 1.5);
  const headlineY = useTransform(smoothY, (value) => value * 1.5);

  useEffect(() => {
    finePointer.current = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    let cueFrame: number | null = null;
    let lastValue = window.scrollY < 100;

    const onScroll = () => {
      if (cueFrame !== null) return;
      cueFrame = window.requestAnimationFrame(() => {
        const nextValue = window.scrollY < 100;
        if (nextValue !== lastValue) {
          lastValue = nextValue;
          setShowScrollCue(nextValue);
        }
        cueFrame = null;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (cueFrame !== null) window.cancelAnimationFrame(cueFrame);
      if (frame.current !== null) window.cancelAnimationFrame(frame.current);
    };
  }, []);

  const handlePointerMove = (event: React.PointerEvent<HTMLElement>) => {
    if (reduceMotion || !finePointer.current || document.hidden || frame.current !== null) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const clientX = event.clientX;
    const clientY = event.clientY;

    frame.current = window.requestAnimationFrame(() => {
      pointerX.set(((clientX - bounds.left) / bounds.width - 0.5) * 2);
      pointerY.set(((clientY - bounds.top) / bounds.height - 0.5) * 2);
      frame.current = null;
    });
  };

  const resetPointer = () => {
    if (frame.current !== null) {
      window.cancelAnimationFrame(frame.current);
      frame.current = null;
    }
    pointerX.set(0);
    pointerY.set(0);
  };

  const openFeaturedProject = (event: React.MouseEvent<HTMLButtonElement>) => {
    document.documentElement.dataset.foldTheoryPendingProject = "cecilia-pizzeria";
    window.dispatchEvent(
      new CustomEvent("fold-theory:open-project", {
        detail: { projectId: "cecilia-pizzeria", trigger: event.currentTarget },
      }),
    );
  };

  return (
    <section
      id="home"
      className="hero"
      aria-labelledby="hero-title"
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
    >
      <div className="hero__visual" data-parallax="14" aria-label="Featured Cecilia Pizzeria packaging project">
        <motion.button
          type="button"
          className="hero__main-image"
          aria-label="View Cecilia Pizzeria project"
          aria-haspopup="dialog"
          style={{ x: mainX, y: mainY }}
          initial={reduceMotion ? false : { clipPath: "inset(0 0 100% 0)" }}
          animate={{ clipPath: "inset(0% 0 0% 0)" }}
          transition={{ delay: 0.08, duration: 1.05, ease }}
          onClick={openFeaturedProject}
        >
          <motion.span
            className="hero__main-media"
            initial={reduceMotion ? false : { scale: 1.08 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.08, duration: 1.18, ease }}
          >
            <Image
              src="/images/projects/cecilia-pasta-kit.jpg"
              alt="Illustrated blue and cream pasta-kit boxes produced for Cecilia Pizzeria"
              fill
              priority
              sizes="(max-width: 900px) 100vw, 64vw"
              unoptimized
            />
          </motion.span>
          <span className="hero__image-wash" aria-hidden="true" />
          <span className="hero__explore" aria-hidden="true">View project</span>
          <span className="hero__visible-action">
            View Project <i aria-hidden="true">↗</i>
          </span>
        </motion.button>

        <div className="hero__detail-depth" data-parallax="10">
          <motion.figure
            className="hero__detail-image"
            style={{ x: detailX, y: detailY }}
            initial={reduceMotion ? false : { opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.72, duration: 0.78, ease }}
            aria-hidden="true"
          >
            <Image
              src="/images/projects/cecilia-pasta-kit.jpg"
              alt=""
              fill
              sizes="(max-width: 900px) 40vw, 17vw"
              unoptimized
            />
          </motion.figure>
        </div>

        <div className="hero__paper-depth" data-parallax="16">
          <motion.figure
            className="hero__paper-detail"
            style={{ x: paperX, y: paperY }}
            initial={reduceMotion ? false : { opacity: 0, x: 14 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.92, duration: 0.7, ease }}
            aria-hidden="true"
          >
            <Image
              src="/images/projects/cecilia-pasta-kit.jpg"
              alt=""
              fill
              sizes="(max-width: 900px) 26vw, 11vw"
              unoptimized
            />
          </motion.figure>
        </div>

        <motion.div
          className="hero__caption"
          initial={reduceMotion ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.36, duration: 0.48, ease }}
        >
          <span>Featured project — 01</span>
          <strong>Cecilia Pizzeria</strong>
          <span>Custom packaging · Delhi</span>
        </motion.div>
      </div>

      <div className="hero__copy" data-parallax="-10">
        <motion.p
          className="eyebrow hero__eyebrow"
          initial={reduceMotion ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.16, duration: 0.56, ease }}
        >
          Independent Branding &amp; Packaging Studio
        </motion.p>

        <motion.h1 id="hero-title" className="hero__title" style={{ x: headlineX, y: headlineY }}>
          {["Brands people ", "remember before ", "they’re opened."].map((line, index) => (
            <span className="line-mask" key={line}>
              <motion.span
                initial={reduceMotion ? false : { y: "112%" }}
                animate={{ y: 0 }}
                transition={{ delay: 0.32 + index * 0.1, duration: 0.84, ease }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </motion.h1>

        <div className="hero__lower">
          <motion.p
            className="hero__description"
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.86, duration: 0.6, ease }}
          >
            We create thoughtful identities, packaging systems and printed
            experiences for food, hospitality, lifestyle and consumer brands.
          </motion.p>

          <motion.div
            className="hero__actions"
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.02, duration: 0.6, ease }}
          >
            <a className="button button--primary" href="#contact">
              <span>Start a Project</span>
              <span aria-hidden="true">↗</span>
            </a>
            <a className="button button--secondary" href="#work">
              <span>Explore Selected Work</span>
              <span aria-hidden="true">↓</span>
            </a>
          </motion.div>

          <motion.div
            className="hero__metadata"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.28, duration: 0.5 }}
          >
            <span>New Delhi, India</span>
            <span>Identity · Packaging · Print</span>
          </motion.div>
        </div>
      </div>

      <motion.div
        className={`scroll-cue ${showScrollCue ? "" : "scroll-cue--hidden"}`}
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.62, duration: 0.45 }}
        aria-hidden="true"
      >
        <span>Scroll to unfold</span>
        <i />
      </motion.div>
    </section>
  );
}
