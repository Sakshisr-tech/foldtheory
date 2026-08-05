"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { trustedClients, type TrustedClient } from "@/data/studio";

const ease = [0.22, 1, 0.36, 1] as const;

function logoClassName(client: TrustedClient) {
  const shape = client.shape ?? "default";
  return [
    "trusted-by__logo",
    shape === "wide" ? "trusted-by__logo--wide" : "",
    shape === "square" ? "trusted-by__logo--square" : "",
  ]
    .filter(Boolean)
    .join(" ");
}

function logoSize(client: TrustedClient) {
  if (client.shape === "square") return { width: 90, height: 90 };
  if (client.shape === "wide") return { width: 165, height: 64 };
  return { width: 150, height: 64 };
}

export function TrustedBySection() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="trusted-by" className="trusted-by" aria-labelledby="trusted-by-title">
      <div className="site-container trusted-by__shell">
        <motion.div
          className="section-label"
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -8% 0px" }}
          transition={{ duration: reduceMotion ? 0.01 : 0.6, ease }}
        >
          <span>06</span>
          <span>Trusted By</span>
        </motion.div>

        <motion.h2
          id="trusted-by-title"
          className="trusted-by__heading"
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -8% 0px" }}
          transition={{ delay: reduceMotion ? 0 : 0.05, duration: reduceMotion ? 0.01 : 0.6, ease }}
        >
          Brands we&apos;ve had the privilege to produce for.
        </motion.h2>

        <motion.ul
          className="trusted-by__grid"
          aria-label="Trusted clients"
          initial={reduceMotion ? false : "hidden"}
          whileInView={reduceMotion ? undefined : "visible"}
          viewport={{ once: true, margin: "0px 0px -6% 0px" }}
          variants={
            reduceMotion
              ? undefined
              : {
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.025, delayChildren: 0.06 } },
                }
          }
        >
          {trustedClients.map((client) => {
            const size = logoSize(client);

            return (
              <motion.li
                key={client.name}
                className="trusted-by__tile"
                variants={
                  reduceMotion
                    ? undefined
                    : {
                        hidden: { opacity: 0, y: 10 },
                        visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease } },
                      }
                }
              >
                <div className="trusted-by__frame">
                  {client.logo ? (
                    <Image
                      src={client.logo}
                      alt={`${client.name} logo`}
                      width={size.width}
                      height={size.height}
                      className={logoClassName(client)}
                      sizes="(max-width: 720px) 42vw, (max-width: 1100px) 22vw, 165px"
                    />
                  ) : (
                    <span className="trusted-by__fallback">{client.name}</span>
                  )}
                </div>
                <p className="trusted-by__name">{client.name}</p>
              </motion.li>
            );
          })}
        </motion.ul>

        <motion.p
          className="trusted-by__footnote"
          initial={reduceMotion ? false : { opacity: 0, y: 10 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -6% 0px" }}
          transition={{ delay: reduceMotion ? 0 : 0.14, duration: reduceMotion ? 0.01 : 0.5, ease }}
        >
          34+ years of trusted partnerships across hospitality, food, retail and lifestyle brands.
        </motion.p>
      </div>
    </section>
  );
}
