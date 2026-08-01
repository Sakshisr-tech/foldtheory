"use client";

import Image from "next/image";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

export function HeroExperience() {
  const reduceMotion = useReducedMotion();
  const [showScrollCue, setShowScrollCue] = useState(true);
  const frame = useRef<number | null>(null);
  const finePointer = useRef(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mainX = useSpring(x, { stiffness: 75, damping: 26, mass: 0.7 });
  const mainY = useSpring(y, { stiffness: 75, damping: 26, mass: 0.7 });
  const detailX = useSpring(x, { stiffness: 54, damping: 22, mass: 0.75 });
  const detailY = useSpring(y, { stiffness: 54, damping: 22, mass: 0.75 });
  const captionX = useSpring(x, { stiffness: 90, damping: 30, mass: 0.65 });

  useEffect(() => {
    finePointer.current = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const onScroll = () => setShowScrollCue(window.scrollY < 100);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame.current !== null) window.cancelAnimationFrame(frame.current);
    };
  }, []);

  const handlePointerMove = (event: React.PointerEvent<HTMLElement>) => {
    if (reduceMotion || !finePointer.current || document.hidden || frame.current !== null) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const clientX = event.clientX;
    const clientY = event.clientY;
    frame.current = window.requestAnimationFrame(() => {
      x.set(((clientX - bounds.left) / bounds.width - 0.5) * 8);
      y.set(((clientY - bounds.top) / bounds.height - 0.5) * 8);
      frame.current = null;
    });
  };

  const resetPointer = () => {
    if (frame.current !== null) {
      window.cancelAnimationFrame(frame.current);
      frame.current = null;
    }
    x.set(0);
    y.set(0);
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
      <div className="hero__copy">
        <motion.p
          className="eyebrow hero__eyebrow"
          initial={reduceMotion ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18, duration: 0.58, ease }}
        >
          Independent Branding &amp; Packaging Studio
        </motion.p>

        <h1 id="hero-title" className="hero__title">
          {["We shape stories", "you can hold."].map((line, index) => (
            <span className="line-mask" key={line}>
              <motion.span
                initial={reduceMotion ? false : { y: "112%" }}
                animate={{ y: 0 }}
                transition={{ delay: 0.34 + index * 0.11, duration: 0.82, ease }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          className="hero__description"
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.78, duration: 0.62, ease }}
        >
          We build thoughtful brand identities, packaging systems and printed
          experiences for food, hospitality, lifestyle and consumer brands.
        </motion.p>

        <motion.div
          className="hero__actions"
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.94, duration: 0.62, ease }}
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

        <motion.p
          className="hero__availability"
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.55 }}
        >
          New Delhi, India · Working across locations
        </motion.p>
      </div>

      <div className="hero__visual" aria-label="Featured Fold Theory packaging project">
        <motion.button
          type="button"
          className="hero__main-image"
          aria-label="View Cecilia Pizzeria project"
          aria-haspopup="dialog"
          style={{ x: mainX, y: mainY }}
          initial={reduceMotion ? false : { clipPath: "inset(100% 0 0 0)" }}
          animate={{ clipPath: "inset(0% 0 0 0)" }}
          transition={{ delay: 0.08, duration: 1.05, ease }}
          onClick={openFeaturedProject}
        >
          <motion.span
            className="hero__main-media"
            initial={reduceMotion ? false : { scale: 1.08, filter: "brightness(.9)" }}
            animate={{ scale: 1, filter: "brightness(1)" }}
            transition={{ delay: 0.08, duration: 1.18, ease }}
          >
            <Image
              src="/images/projects/cecilia-pasta-kit.jpg"
              alt="Illustrated blue and cream pasta-kit boxes produced for Cecilia Pizzeria"
              fill
              priority
              sizes="(max-width: 900px) 100vw, 54vw"
              unoptimized
            />
          </motion.span>
          <span className="hero__explore" aria-hidden="true">Explore</span>
          <span className="hero__visible-action">View Project <i aria-hidden="true">↗</i></span>
        </motion.button>

        <motion.div
          className="hero__detail-image"
          style={{ x: detailX, y: detailY }}
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.68, duration: 0.8, ease }}
        >
          <Image
            src="/images/projects/bombaa-print.jpg"
            alt="Bombaa printed food paper and illustrated coasters"
            fill
            sizes="(max-width: 900px) 42vw, 18vw"
            unoptimized
          />
        </motion.div>

        <motion.div
          className="hero__caption"
          style={{ x: captionX }}
          initial={reduceMotion ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.18, duration: 0.55, ease }}
        >
          <span>Cecilia Pizzeria</span>
          <span>Custom packaging · Studio archive</span>
        </motion.div>

        <span className="hero__index" aria-hidden="true">FT / 01</span>
      </div>

      <motion.div
        className={`scroll-cue ${showScrollCue ? "" : "scroll-cue--hidden"}`}
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.58, duration: 0.5 }}
        aria-hidden="true"
      >
        <span>Scroll to discover</span>
        <i />
      </motion.div>
    </section>
  );
}
