"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useMemo, useState } from "react";

const links = [
  { href: "/work", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "Studio" },
  { href: "/contact", label: "Contact" },
];

function Wordmark({ light = false }: { light?: boolean }) {
  return (
    <span className={`wordmark ${light ? "wordmark--light" : ""}`}>
      <span>FOLD THEORY</span>
      <small>PRINTING &amp; PACKAGING</small>
    </span>
  );
}

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const visited = window.sessionStorage.getItem("fold-theory-visited");
    const timer = window.setTimeout(() => {
      setLoading(false);
      if (!visited) window.sessionStorage.setItem("fold-theory-visited", "true");
    }, visited || reduceMotion ? 0 : 1450);
    return () => window.clearTimeout(timer);
  }, [reduceMotion]);

  useEffect(() => {
    if (reduceMotion) return;
    gsap.registerPlugin(ScrollTrigger);
    const lenis = new Lenis({ duration: 1.05, smoothWheel: true });
    const update = (time: number) => lenis.raf(time * 1000);
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(update);
      lenis.destroy();
    };
  }, [reduceMotion]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 36);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const activePath = useMemo(
    () => links.find((item) => pathname.startsWith(item.href))?.href,
    [pathname],
  );

  return (
    <>
      <AnimatePresence>
        {loading && (
          <motion.div
            className="loader"
            initial={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
            >
              <Image
                className="loader__logo"
                src="/images/projects/fold-theory-wordmark.jpg"
                alt="Fold Theory — Printing and Packaging"
                width={180}
                height={180}
                unoptimized
              />
              <p>Unfolding the studio</p>
              <span className="loader__track">
                <motion.i
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
                />
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <header className={`site-header ${scrolled ? "site-header--scrolled" : ""}`}>
        <Link href="/" aria-label="Fold Theory home" className="site-header__brand">
          <Image
            className="site-header__logo-tile"
            src="/images/projects/fold-theory-wordmark.jpg"
            alt=""
            width={36}
            height={36}
            aria-hidden="true"
            unoptimized
          />
          <Wordmark />
        </Link>
        <nav className="site-header__nav" aria-label="Primary navigation">
          {links.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={activePath === item.href ? "is-active" : ""}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Link className="text-cta site-header__cta" href="/contact">
          Start a project <span aria-hidden="true">↗</span>
        </Link>
        <button
          className="menu-trigger"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((value) => !value)}
        >
          <span>{menuOpen ? "Close" : "Menu"}</span>
          <i aria-hidden="true" />
        </button>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            className="mobile-menu"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <nav aria-label="Mobile navigation">
              {links.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ y: "115%" }}
                  animate={{ y: 0 }}
                  transition={{ delay: 0.12 + index * 0.07, duration: 0.6 }}
                >
                  <Link href={item.href} onClick={() => setMenuOpen(false)}>
                    <small>0{index + 1}</small>
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div className="mobile-menu__meta">
              <span>Bespoke Branding &amp; Packaging</span>
              <a href="https://www.instagram.com/fold.theory2/" target="_blank" rel="noreferrer">
                @fold.theory2
              </a>
              <span>New Delhi, India</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!reduceMotion && (
        <motion.div
          key={`curtain-${pathname}`}
          className="route-curtain"
          initial={{ scaleY: 1 }}
          animate={{ scaleY: 0 }}
          transition={{ duration: 0.78, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden="true"
        />
      )}

      <AnimatePresence mode="wait" initial={false}>
        <motion.main
          key={pathname}
          initial={reduceMotion ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduceMotion ? undefined : { opacity: 0, y: -6 }}
          transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
        >
          {children}
        </motion.main>
      </AnimatePresence>

      <footer className="site-footer">
        <div className="site-footer__top">
          <div>
            <Image
              className="site-footer__logo"
              src="/images/projects/fold-theory-wordmark.jpg"
              alt="Fold Theory — Printing and Packaging"
              width={112}
              height={112}
              unoptimized
            />
            <p>Brand identities, thoughtfully unfolded.</p>
          </div>
          <div className="site-footer__links">
            <div>
              <span>Explore</span>
              {links.map((item) => (
                <Link href={item.href} key={item.href}>
                  {item.label}
                </Link>
              ))}
            </div>
            <div>
              <span>Connect</span>
              <span className="site-footer__pending">Email to be confirmed</span>
              <a href="https://www.instagram.com/fold.theory2/" target="_blank" rel="noreferrer">
                Instagram
              </a>
              <small>New Delhi, India</small>
            </div>
          </div>
        </div>
        <div className="site-footer__bottom">
          <span>© {new Date().getFullYear()} Fold Theory</span>
          <span>All rights reserved</span>
        </div>
        <div className="site-footer__crop" aria-hidden="true">
          FOLD THEORY
        </div>
      </footer>
    </>
  );
}
