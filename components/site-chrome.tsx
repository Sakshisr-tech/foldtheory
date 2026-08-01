"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type Lenis from "lenis";
import { useCallback, useEffect, useRef, useState } from "react";

const links = [
  { href: "#work", id: "work", label: "Work" },
  { href: "#services", id: "services", label: "Services" },
  { href: "#studio", id: "studio", label: "Studio" },
  { href: "#process", id: "process", label: "Process" },
  { href: "#faq", id: "faq", label: "FAQ" },
  { href: "#contact", id: "contact", label: "Contact" },
] as const;

const observedSections = [
  ["home", "home"],
  ["introduction", "home"],
  ["work", "work"],
  ["services", "services"],
  ["featured", "studio"],
  ["studio", "studio"],
  ["archive", "work"],
  ["process", "process"],
  ["about", "process"],
  ["trust", "process"],
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
      <small>PRINTING &amp; PACKAGING</small>
    </span>
  );
}

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const reduceMotion = useReducedMotion();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [showPersistentCta, setShowPersistentCta] = useState(false);
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
    const services = document.getElementById("services");
    const contact = document.getElementById("contact");
    if (!services || !contact) return;

    let frame: number | null = null;
    let lastValue = false;
    const updateCta = () => {
      const servicesRect = services.getBoundingClientRect();
      const contactRect = contact.getBoundingClientRect();
      const hasPassedServices = servicesRect.bottom < window.innerHeight * 0.2;
      const contactVisible = contactRect.top < window.innerHeight * 0.82 && contactRect.bottom > 0;
      const nextValue = hasPassedServices && !contactVisible;
      if (nextValue !== lastValue) {
        lastValue = nextValue;
        setShowPersistentCta(nextValue);
      }
      frame = null;
    };
    const schedule = () => {
      if (frame === null) frame = window.requestAnimationFrame(updateCta);
    };
    updateCta();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame !== null) window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    const mapping = new Map(observedSections);
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
        if (nearest) setActiveSection(mapping.get(nearest.target.id) ?? "home");
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
        else lenisRef.current.scrollTo(target, { offset: -72, duration: 1.02 });
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
      <a className="skip-link" href="#main-content">Skip to content</a>
      <div className="scroll-progress" aria-hidden="true"><span ref={progressRef} /></div>

      <header className={`site-header ${scrolled ? "site-header--scrolled" : ""}`}>
        <a href="#home" className="site-header__brand" aria-label="Fold Theory home" onClick={anchorHandler("#home")}>
          <Image className="site-header__logo-tile" src="/images/projects/fold-theory-wordmark.jpg" alt="" width={38} height={38} aria-hidden="true" unoptimized />
          <Wordmark />
        </a>
        <nav className="site-header__nav" aria-label="Primary navigation">
          {links.map((item) => (
            <a
              key={item.id}
              href={item.href}
              onClick={anchorHandler(item.href)}
              className={activeSection === item.id ? "is-active" : ""}
              aria-current={activeSection === item.id ? "location" : undefined}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <a className="button button--header" href="#contact" onClick={anchorHandler("#contact")}>Start a Project <span aria-hidden="true">↗</span></a>
        <button
          ref={menuTriggerRef}
          className="menu-trigger"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          onClick={() => setMenuOpen((value) => !value)}
        >
          <span>{menuOpen ? "Close" : "Menu"}</span><i aria-hidden="true" />
        </button>
      </header>

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
                    href={item.href}
                    onClick={anchorHandler(item.href, true)}
                    initial={reduceMotion ? { opacity: 0 } : { y: "112%" }}
                    animate={reduceMotion ? { opacity: 1 } : { y: 0 }}
                    transition={{ delay: reduceMotion ? 0 : 0.1 + index * 0.055, duration: reduceMotion ? 0.01 : 0.58, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <small>{String(index + 1).padStart(2, "0")}</small>{item.label}
                  </motion.a>
                </div>
              ))}
            </nav>
            <a className="button button--light mobile-menu__cta" href="#contact" onClick={anchorHandler("#contact", true)}>Start a Project <span aria-hidden="true">↗</span></a>
            <div className="mobile-menu__meta">
              <span>New Delhi, India</span>
              <a href="https://www.instagram.com/fold.theory2/" target="_blank" rel="noreferrer">@fold.theory2 ↗</a>
              <span>Branding · Packaging · Print</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main id="main-content" tabIndex={-1}>{children}</main>

      <AnimatePresence>
        {showPersistentCta && (
          <motion.a
            className="persistent-project-cta"
            href="#contact"
            onClick={anchorHandler("#contact")}
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
            transition={{ duration: reduceMotion ? 0.01 : 0.38, ease: [0.22, 1, 0.36, 1] }}
          >
            <span>Start a Project</span><i aria-hidden="true">↗</i>
          </motion.a>
        )}
      </AnimatePresence>

      <footer className="site-footer">
        <div className="site-footer__top">
          <div className="site-footer__brand">
            <Image className="site-footer__logo" src="/images/projects/fold-theory-wordmark.jpg" alt="Fold Theory — Printing and Packaging" width={104} height={104} unoptimized />
            <p>Brand identities, thoughtfully unfolded.</p>
          </div>
          <div className="site-footer__links">
            <div><span>Explore</span>{links.map((item) => <a href={item.href} key={item.id} onClick={anchorHandler(item.href)}>{item.label}</a>)}</div>
            <div><span>Connect</span><a href="https://www.instagram.com/fold.theory2/" target="_blank" rel="noreferrer">Instagram ↗</a><small>New Delhi, India</small></div>
          </div>
        </div>
        <div className="site-footer__bottom"><span>© {new Date().getFullYear()} Fold Theory</span><span>All rights reserved</span></div>
        <div className="site-footer__crop" aria-hidden="true">FOLD THEORY</div>
      </footer>
    </>
  );
}
