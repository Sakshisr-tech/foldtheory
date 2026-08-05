"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { products } from "@/data/products";
import "./products-grid.css";

const ease = [0.22, 1, 0.36, 1] as const;

export function ProductsGrid() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="products"
      className="products-editorial"
      aria-labelledby="products-title"
    >
      <div className="site-container products-editorial__shell">
        <motion.div
          className="products-editorial__label"
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -8% 0px" }}
          transition={{ duration: reduceMotion ? 0.01 : 0.6, ease }}
        >
          <span>04</span>
          <span>Products</span>
        </motion.div>

        <div className="products-editorial__intro-block">
          <motion.h2
            id="products-title"
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -8% 0px" }}
            transition={{ duration: reduceMotion ? 0.01 : 0.65, ease }}
          >
            <span>Packaging solutions,</span>
            <span>crafted for every brand.</span>
          </motion.h2>

          <motion.p
            className="products-editorial__intro"
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -8% 0px" }}
            transition={{
              delay: reduceMotion ? 0 : 0.08,
              duration: reduceMotion ? 0.01 : 0.6,
              ease,
            }}
          >
            Explore our range of custom packaging products, thoughtfully designed to
            deliver functionality, durability, and a premium brand experience.
          </motion.p>
        </div>

        <ul className="products-editorial__grid">
          {products.map((product, index) => (
            <motion.li
              className="products-editorial__card"
              key={product.id}
              initial={reduceMotion ? false : { opacity: 0, y: 28, scale: 0.98 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "0px 0px -6% 0px" }}
              transition={{
                delay: reduceMotion ? 0 : index * 0.06,
                duration: reduceMotion ? 0.01 : 0.7,
                ease,
              }}
            >
              <div className="products-editorial__media">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  sizes="(max-width: 720px) 100vw, (max-width: 1100px) 50vw, 33vw"
                  unoptimized
                />
              </div>
              <h3 className="products-editorial__title">{product.title}</h3>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
