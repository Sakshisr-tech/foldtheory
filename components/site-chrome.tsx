"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type Lenis from "lenis";
import { useCallback, useEffect, useRef, useState } from "react";
import { ResetScrollOnReload } from "@/components/reset-scroll-on-reload";

const links = [
  { href: "#about", id: "about", label: "About" },
  { href: "#work", id: "work", label: "Work" },
  { href: "#services", id: "services", label: "Services" },
  { href: "#contact", id: "contact", label: "Contact" },
] as const;

type SectionId =
  | "home"
  | "introduction"
  | "work"
  | "services"
  | "products"
  | "featured"
  | "studio"
  | "process"
  | "about"
  | "trust"
  | "trusted-by"
  | "faq"
  | "contact";

const observedSections = [
  ["home", "home"],
  ["introduction", "about"],
  ["about", "about"],
  ["studio", "about"],
  ["work", "work"],
  ["services", "services"],
  ["products", "services"],
  ["featured", "about"],
  ["process", "services"],
  ["trusted-by", "services"],
  ["trust", "services"],
  ["faq", "faq"],
  ["contact", "contact"],
] as const;

const focusableSelector = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "[tabindex]:not([tabindex='-1'])",
].join(",");

function Wordmark({ light = false }: { light?: boolean }) {
  return (
    <span className={`wordmark ${light ? "wordmark--light" : ""}`}>
      <span>FOLD THEORY</span>
      <small>BY SUN PRINT &amp; PACKAGING</small>
    </span>
  );
}

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<SectionId>("home");
  const [currentYear] = useState(() => new Date().getFullYear());
  const lenisRef = useRef<Lenis | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuTriggerRef = useRef<HTMLButtonElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const onVisibility = () => {
      document.documentElement.classList.toggle("is-tab-hidden", document.hidden);
    };
    onVisibility();
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  useEffect(() => {
    if (reduceMotion) return;
    let cancelled = false;
    let dispose = () => {};
    void Promise.all([import("lenis"), import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([lenisModule, gsapModule, scrollTriggerModule]) => {
        if (cancelled) return;
        const LenisConstructor = lenisModule.default;
        const gsap = gsapModule.gsap;
        const ScrollTrigger = scrollTriggerModule.ScrollTrigger;
        gsap.registerPlugin(ScrollTrigger);
        const lenis = new LenisConstructor({ duration: 1.02, smoothWheel: true });
        lenisRef.current = lenis;
        const update = (time: number) => lenis.raf(time * 1000);
        lenis.on("scroll", ScrollTrigger.update);
        gsap.ticker.add(update);
        gsap.ticker.lagSmoothing(0);

        const media = gsap.matchMedia();
        media.add("(min-width: 901px) and (prefers-reduced-motion: no-preference)", () => {
          gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((element) => {
            const amount = Number(element.dataset.parallax ?? 12);
            gsap.fromTo(
              element,
              { y: -amount / 2 },
              {
                y: amount / 2,
                ease: "none",
                scrollTrigger: {
                  trigger: element,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: 0.65,
                },
              },
            );
          });
        });
        ScrollTrigger.refresh();

        dispose = () => {
          media.revert();
          gsap.ticker.remove(update);
          lenis.destroy();
          lenisRef.current = null;
        };
      },
    );
    return () => {
      cancelled = true;
      dispose();
    };
  }, [reduceMotion]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 34);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    let frame: number | null = null;
    const updateProgress = () => {
      const scrollRange = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollRange > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollRange)) : 0;
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${progress})`;
      frame = null;
    };
    const schedule = () => {
      if (frame === null) frame = window.requestAnimationFrame(updateProgress);
    };
    updateProgress();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame !== null) window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    const mapping = new Map<string, SectionId>(observedSections);
    const visible = new Map<string, IntersectionObserverEntry>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) visible.set(entry.target.id, entry);
          else visible.delete(entry.target.id);
        });
        const nearest = [...visible.values()].sort(
          (a, b) => Math.abs(a.boundingClientRect.top - window.innerHeight * 0.28) - Math.abs(b.boundingClientRect.top - window.innerHeight * 0.28),
        )[0];
        const nextSection = nearest ? (mapping.has(nearest.target.id) ? mapping.get(nearest.target.id)! : "home") : "home";
        setActiveSection(nextSection);
      },
      { rootMargin: "-18% 0px -58% 0px", threshold: [0, 0.2, 0.6] },
    );
    observedSections.forEach(([id]) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const menu = menuRef.current;
    const trigger = menuTriggerRef.current;
    lenisRef.current?.stop();
    document.body.style.overflow = "hidden";

    const focusFirst = window.setTimeout(() => {
      menu?.querySelector<HTMLElement>(focusableSelector)?.focus();
    }, reduceMotion ? 0 : 140);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setMenuOpen(false);
        return;
      }
      if (event.key !== "Tab" || !menu) return;
      const focusable = [...menu.querySelectorAll<HTMLElement>(focusableSelector)].filter(
        (element) => !element.hasAttribute("disabled") && element.offsetParent !== null,
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      window.clearTimeout(focusFirst);
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
      lenisRef.current?.start();
      window.requestAnimationFrame(() => trigger?.focus());
    };
  }, [menuOpen, reduceMotion]);

  const navigateTo = useCallback(
    (href: string, closeMenu = false) => {
      const id = href.replace("#", "");
      const performScroll = () => {
        const target = document.getElementById(id);
        if (!target) return;
        window.history.replaceState(null, "", href);
        if (reduceMotion || !lenisRef.current) target.scrollIntoView({ behavior: "auto", block: "start" });
        else lenisRef.current.scrollTo(target, { offset: id === "contact" ? 0 : -72, duration: 1.02 });
      };
      if (closeMenu) {
        setMenuOpen(false);
        window.setTimeout(performScroll, reduceMotion ? 0 : 90);
      } else performScroll();
    },
    [reduceMotion],
  );

  const anchorHandler = (href: string, closeMenu = false) => (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    navigateTo(href, closeMenu);
  };

  useEffect(() => {
    const onInternalAnchor = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const target = event.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest<HTMLAnchorElement>("a[href^='#']");
      const href = anchor?.getAttribute("href");
      if (!href || href === "#" || anchor?.classList.contains("skip-link")) return;
      event.preventDefault();
      navigateTo(href);
    };
    document.addEventListener("click", onInternalAnchor);
    return () => document.removeEventListener("click", onInternalAnchor);
  }, [navigateTo]);

  return (
    <>
      <ResetScrollOnReload />
      <a className="skip-link" href="#main-content">Skip to content</a>
      <div className="scroll-progress" aria-hidden="true"><span ref={progressRef} /></div>

      <motion.header
        className={`site-header ${scrolled ? "site-header--scrolled" : ""}`}
        initial={reduceMotion ? false : { opacity: 0, y: -28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduceMotion ? 0.01 : 0.78, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
      >
        <a href={pathname === "/" ? "#home" : "/#home"} className="site-header__brand" aria-label="Fold Theory home" onClick={pathname === "/" ? anchorHandler("#home") : undefined}>
          <Image className="site-header__logo-tile" src="/images/projects/fold-theory-wordmark.jpg" alt="" width={38} height={38} aria-hidden="true" unoptimized />
          <Wordmark />
        </a>
        <nav className="site-header__nav" aria-label="Primary navigation">
          {links.map((item) => (
            <a
              key={item.id}
              href={pathname === "/" ? item.href : `/${item.href}`}
              onClick={pathname === "/" ? anchorHandler(item.href) : undefined}
              className={activeSection === item.id ? "is-active" : ""}
              aria-current={activeSection === item.id ? "location" : undefined}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <a className="site-header__project-cta" href={pathname === "/" ? "#contact" : "/#contact"} onClick={pathname === "/" ? anchorHandler("#contact") : undefined}>
          Start Your Project <span aria-hidden="true">↗︎</span>
        </a>
<button
  ref={menuTriggerRef}
  className={`menu-trigger ${menuOpen ? "is-open" : ""}`}
  type="button"
  aria-expanded={menuOpen}
  aria-controls="mobile-menu"
  aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
  onClick={() => setMenuOpen((value) => !value)}
>
  <span className="sr-only">
    {menuOpen ? "Close menu" : "Open menu"}
  </span>

  <span
    className="menu-trigger__lines"
    aria-hidden="true"
  >
    <i />
    <i />
  </span>
</button>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            ref={menuRef}
            className="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            initial={reduceMotion ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
            animate={reduceMotion ? { opacity: 1 } : { clipPath: "inset(0 0 0% 0)" }}
            exit={reduceMotion ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: reduceMotion ? 0.01 : 0.58, ease: [0.22, 1, 0.36, 1] }}
          >
            <nav aria-label="Mobile navigation">
              {links.map((item, index) => (
                <div className="mobile-menu__mask" key={item.id}>
                  <motion.a
                    href={pathname === "/" ? item.href : `/${item.href}`}
                    onClick={pathname === "/" ? anchorHandler(item.href, true) : undefined}
                    initial={reduceMotion ? { opacity: 0 } : { y: "112%" }}
                    animate={reduceMotion ? { opacity: 1 } : { y: 0 }}
                    transition={{ delay: reduceMotion ? 0 : 0.1 + index * 0.055, duration: reduceMotion ? 0.01 : 0.58, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <small>{String(index + 1).padStart(2, "0")}</small>{item.label}
                  </motion.a>
                </div>
              ))}
            </nav>
            <a className="button button--light mobile-menu__cta" href={pathname === "/" ? "#contact" : "/#contact"} onClick={pathname === "/" ? anchorHandler("#contact", true) : undefined}>Start a Project <span aria-hidden="true">↗</span></a>
            <div className="mobile-menu__meta">
              <span>C 29, Okhla Phase 1, New Delhi, India</span>
              <a href="https://www.instagram.com/fold.theory2/" target="_blank" rel="noreferrer">@fold.theory2 ↗</a>
              <span>Branding · Packaging · Print</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main id="main-content" tabIndex={-1}>{children}</main>

      <footer className="site-footer" aria-labelledby="footer-cta-title">
        <div className="site-footer__monogram" aria-hidden="true">FT</div>
        <div className="site-container site-footer__inner">
          <div className="site-footer__cta">
            <motion.h2
              id="footer-cta-title"
              initial={reduceMotion ? false : { opacity: 0, y: 28 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -8% 0px" }}
              transition={{ duration: reduceMotion ? 0.01 : 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <span>Ready to create packaging</span>
              <span>people remember?</span>
            </motion.h2>
            <motion.a
              className="site-footer__cta-button"
              href={pathname === "/" ? "#contact" : "/#contact"}
              onClick={pathname === "/" ? anchorHandler("#contact") : undefined}
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -8% 0px" }}
              transition={{ delay: reduceMotion ? 0 : 0.15, duration: reduceMotion ? 0.01 : 0.58, ease: [0.22, 1, 0.36, 1] }}
            >
              <span>Start Your Project</span><i aria-hidden="true">↗︎</i>
            </motion.a>
          </div>

          <div className="site-footer__main">
            <motion.div
              className="site-footer__brand"
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -5% 0px" }}
              transition={{ duration: reduceMotion ? 0.01 : 0.56, ease: [0.22, 1, 0.36, 1] }}
            >
              <a className="site-footer__logo" href={pathname === "/" ? "#home" : "/#home"} onClick={pathname === "/" ? anchorHandler("#home") : undefined} aria-label="Fold Theory home">
                <Wordmark light />
              </a>
              <p className="site-footer__descriptor">Independent Branding &amp;<br />Packaging Studio.</p>
              <p>Helping brands create thoughtful packaging experiences through strategy, design and production.</p>
            </motion.div>

            <div className="site-footer__mobile-columns">
              <motion.div
                className="site-footer__column site-footer__nav"
                initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -5% 0px" }}
                transition={{ delay: reduceMotion ? 0 : 0.08, duration: reduceMotion ? 0.01 : 0.56, ease: [0.22, 1, 0.36, 1] }}
              >
                <h3>Navigation</h3>
                <nav aria-label="Footer navigation">
                  {links.map((item) => (
                    <a href={pathname === "/" ? item.href : `/${item.href}`} key={item.id} onClick={pathname === "/" ? anchorHandler(item.href) : undefined}>{item.label}</a>
                  ))}
                </nav>
              </motion.div>

              <motion.div
                className="site-footer__column site-footer__contact"
                initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -5% 0px" }}
                transition={{ delay: reduceMotion ? 0 : 0.16, duration: reduceMotion ? 0.01 : 0.56, ease: [0.22, 1, 0.36, 1] }}
              >
                <h3>Contact</h3>
                <a href="mailto:foldtheory2@gmail.com">foldtheory2@gmail.com</a>
                <a href="https://www.instagram.com/fold.theory2/" target="_blank" rel="noreferrer">Instagram ↗</a>
                <span>C 29, Okhla Phase 1, New Delhi, India</span>
                <small>Response within<br />1–2 business days</small>
              </motion.div>
            </div>

            <motion.div
              className="site-footer__column site-footer__statement"
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -5% 0px" }}
              transition={{ delay: reduceMotion ? 0 : 0.24, duration: reduceMotion ? 0.01 : 0.56, ease: [0.22, 1, 0.36, 1] }}
            >
              <p>Thoughtfully crafted.<br />Beautifully produced.<br />Made to be remembered.</p>
              <a className="site-footer__secondary-cta" href={pathname === "/" ? "#contact" : "/#contact"} onClick={pathname === "/" ? anchorHandler("#contact") : undefined}>
                Start a Project <span aria-hidden="true">→</span>
              </a>
            </motion.div>
          </div>

          <div className="site-footer__bottom">
            <span>© {currentYear} Fold Theory</span>
            <span>Designed with intention.</span>
            <span>All rights reserved.</span>
          </div>
        </div>
      </footer>
    </>
  );
}
