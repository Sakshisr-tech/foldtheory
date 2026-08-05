"use client";

import Image from "next/image";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";

const ease = [0.22, 1, 0.36, 1] as const;

const desktopHeadlineLines = [
  "Brands people",
  "remember",
  "before they’re",
  "opened.",
];

const mobileHeadlineLines = [
  "Brands people",
  "remember before",
  "they’re opened.",
];

type MagneticLinkProps = {
  href: string;
  variant: "primary" | "secondary";
  children: ReactNode;
};

function MagneticLink({
  href,
  variant,
  children,
}: MagneticLinkProps) {
  const reduceMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const smoothX = useSpring(x, {
    stiffness: 180,
    damping: 20,
    mass: 0.45,
  });

  const smoothY = useSpring(y, {
    stiffness: 180,
    damping: 20,
    mass: 0.45,
  });

  const handleMove = (
    event: ReactPointerEvent<HTMLAnchorElement>,
  ) => {
    if (reduceMotion || event.pointerType === "touch") {
      return;
    }

    const bounds = event.currentTarget.getBoundingClientRect();

    x.set(
      Math.max(
        -5,
        Math.min(
          5,
          (event.clientX - bounds.left - bounds.width / 2) * 0.1,
        ),
      ),
    );

    y.set(
      Math.max(
        -3,
        Math.min(
          3,
          (event.clientY - bounds.top - bounds.height / 2) * 0.1,
        ),
      ),
    );
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      className={`split-hero__cta split-hero__cta--${variant}`}
      href={href}
      style={reduceMotion ? undefined : { x: smoothX, y: smoothY }}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      onBlur={reset}
      whileHover={reduceMotion ? undefined : { scale: 1.015 }}
      whileTap={reduceMotion ? undefined : { scale: 0.985 }}
    >
      <span>{children}</span>
      <span aria-hidden="true">↗︎</span>
    </motion.a>
  );
}

export function HeroExperience() {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const [imageReady, setImageReady] = useState(false);

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);

  const smoothPointerX = useSpring(pointerX, {
    stiffness: 58,
    damping: 24,
    mass: 0.85,
  });

  const smoothPointerY = useSpring(pointerY, {
    stiffness: 58,
    damping: 24,
    mass: 0.85,
  });

  const imageX = useTransform(
    smoothPointerX,
    (value) => value * 3,
  );

  const imageY = useTransform(
    smoothPointerY,
    (value) => value * 3,
  );

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const copyOpacity = useTransform(
    scrollYProgress,
    [0, 0.58, 0.94],
    [1, 0.88, 0],
  );

  const copyY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -38],
  );

  const visualScale = useTransform(
    scrollYProgress,
    [0, 1],
    [1, 0.96],
  );

  const visualY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, 28],
  );

  const handleImageMove = (
    event: ReactPointerEvent<HTMLDivElement>,
  ) => {
    if (reduceMotion || event.pointerType === "touch") {
      return;
    }

    const bounds = event.currentTarget.getBoundingClientRect();

    pointerX.set(
      ((event.clientX - bounds.left) / bounds.width - 0.5) * 2,
    );

    pointerY.set(
      ((event.clientY - bounds.top) / bounds.height - 0.5) * 2,
    );
  };

  const resetImagePosition = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative"
      aria-labelledby="hero-title"
    >
      {/* Desktop hero: keep this layout unchanged */}
      <div className="desktop-hero">
        <section
          className="split-hero split-hero--edge"
          aria-labelledby="hero-title"
        >
          <div
            className="split-hero__grain"
            aria-hidden="true"
          />

          <div
            className="split-hero__ghost-type"
            aria-hidden="true"
          >
            <span>Packaging</span>
            <span>Branding</span>
          </div>

          <motion.div
            className="split-hero__visual"
            style={
              reduceMotion
                ? undefined
                : {
                    scale: visualScale,
                    y: visualY,
                  }
            }
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                    x: 34,
                  }
            }
            animate={{
              opacity: imageReady ? 1 : 0,
              x: 0,
            }}
            transition={{
              duration: reduceMotion ? 0.01 : 1.2,
              delay: 0.16,
              ease,
            }}
            onPointerMove={handleImageMove}
            onPointerLeave={resetImagePosition}
          >
            <motion.div
              className="split-hero__float"
              animate={
                reduceMotion
                  ? { y: 0 }
                  : { y: [0, -3, 0] }
              }
              transition={
                reduceMotion
                  ? { duration: 0.01 }
                  : {
                      duration: 10.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }
              }
            >
              <motion.div
                className="split-hero__image-media"
                style={
                  reduceMotion
                    ? undefined
                    : {
                        x: imageX,
                        y: imageY,
                      }
                }
              >
                <Image
                  src="/images/projects/fold-theory-packaging-hero.png"
                  alt="Fold Theory branded paper bag and premium rigid packaging box"
                  fill
                  priority
                  sizes="(min-width: 1025px) 48vw, 100vw"
                  unoptimized
                  onLoad={() => setImageReady(true)}
                />
              </motion.div>
            </motion.div>
          </motion.div>

          <div className="site-container split-hero__shell">
            <motion.div
              className="split-hero__copy"
              style={
                reduceMotion
                  ? undefined
                  : {
                      opacity: copyOpacity,
                      y: copyY,
                    }
              }
            >
              <motion.p
                className="split-hero__eyebrow"
                initial={
                  reduceMotion
                    ? false
                    : {
                        opacity: 0,
                        y: 12,
                      }
                }
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.16,
                  duration: reduceMotion ? 0.01 : 0.66,
                  ease,
                }}
              >
                Independent Branding &amp; Packaging Studio
              </motion.p>

              <h1
                id="hero-title"
                className="split-hero__title"
              >
                {desktopHeadlineLines.map((line, index) => (
                  <span
                    className="split-hero__line"
                    key={line}
                  >
                    <motion.span
                      initial={
                        reduceMotion
                          ? false
                          : {
                              y: "112%",
                            }
                      }
                      animate={{
                        y: 0,
                      }}
                      transition={{
                        delay: 0.28 + index * 0.1,
                        duration: reduceMotion ? 0.01 : 0.86,
                        ease,
                      }}
                    >
                      {line}
                    </motion.span>
                  </span>
                ))}
              </h1>

              <motion.p
                className="split-hero__description"
                initial={
                  reduceMotion
                    ? false
                    : {
                        opacity: 0,
                        y: 16,
                      }
                }
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.78,
                  duration: reduceMotion ? 0.01 : 0.68,
                  ease,
                }}
              >
                Distinctive packaging for food, gifting and retail
                brands—crafted to make every first touch feel
                unforgettable.
              </motion.p>

              <motion.span
                className="split-hero__divider"
                initial={
                  reduceMotion
                    ? false
                    : {
                        opacity: 0,
                        scaleX: 0,
                      }
                }
                animate={{
                  opacity: 1,
                  scaleX: 1,
                }}
                transition={{
                  delay: 0.9,
                  duration: reduceMotion ? 0.01 : 0.56,
                  ease,
                }}
                aria-hidden="true"
              />

              <motion.div
                className="split-hero__actions"
                initial={
                  reduceMotion
                    ? false
                    : {
                        opacity: 0,
                        y: 18,
                      }
                }
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.98,
                  duration: reduceMotion ? 0.01 : 0.68,
                  ease,
                }}
              >
                <MagneticLink
                  href="#contact"
                  variant="primary"
                >
                  Start Your Project
                </MagneticLink>

                <MagneticLink
                  href="#work"
                  variant="secondary"
                >
                  View Our Work
                </MagneticLink>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </div>

      {/* Mobile hero: isolated from the desktop layout */}
      <div className="mobile-hero-wrapper">
  <section
    className="hero-mobile"
    aria-labelledby="hero-title-mobile"
  >
    <motion.div
      className="hero-mobile__ambient"
      aria-hidden="true"
      initial={
        reduceMotion
          ? false
          : {
              opacity: 0.85,
              scale: 1.04,
            }
      }
      animate={{
        opacity: 1,
        scale: 1,
      }}
      transition={{
        duration: reduceMotion ? 0.01 : 1.5,
        ease,
      }}
    >
      <div className="hero-mobile__image">
        <Image
          src="/images/projects/fold-theory-packaging-hero.png"
          alt="Fold Theory branded paper bag and premium rigid packaging box"
          fill
          priority
          sizes="100vw"
          className="object-cover"
          unoptimized
        />
      </div>

      <div className="hero-mobile__tint" />
      <div className="hero-mobile__overlay" />
    </motion.div>

    <div className="site-container hero-mobile__shell">
      <motion.div
        className="hero-mobile__copy"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: reduceMotion ? 0 : 0.1,
              delayChildren: reduceMotion ? 0 : 0.22,
            },
          },
        }}
      >
        <h1
          id="hero-title-mobile"
          className="hero-mobile__title"
        >
          {mobileHeadlineLines.map((line) => (
            <span
              className="hero-mobile__line"
              key={line}
            >
              <motion.span
                variants={{
                  hidden: {
                    opacity: 0,
                    y: reduceMotion ? 0 : 26,
                  },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: reduceMotion ? 0.01 : 0.72,
                      ease,
                    },
                  },
                }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          className="hero-mobile__description"
          variants={{
            hidden: {
              opacity: 0,
              y: reduceMotion ? 0 : 18,
            },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                duration: reduceMotion ? 0.01 : 0.65,
                ease,
              },
            },
          }}
        >
          Distinctive packaging for food, gifting and retail
          brands—crafted to make every first touch feel
          unforgettable.
        </motion.p>

        <motion.div
          className="hero-mobile__actions"
          variants={{
            hidden: {
              opacity: 0,
              y: reduceMotion ? 0 : 18,
            },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                duration: reduceMotion ? 0.01 : 0.65,
                ease,
              },
            },
          }}
        >
          <motion.a
            href="#contact"
            className="hero-mobile__cta hero-mobile__cta--primary"
            whileTap={
              reduceMotion
                ? undefined
                : {
                    scale: 0.985,
                  }
            }
          >
            <span>Start Your Project</span>
            <span aria-hidden="true">↗︎</span>
          </motion.a>

          <motion.a
            href="#work"
            className="hero-mobile__cta hero-mobile__cta--secondary"
            whileTap={
              reduceMotion
                ? undefined
                : {
                    scale: 0.985,
                  }
            }
          >
            <span>View Our Work</span>
            <span aria-hidden="true">↗︎</span>
          </motion.a>
        </motion.div>
      </motion.div>
    </div>
  </section>
</div>
    </section>
  );
}