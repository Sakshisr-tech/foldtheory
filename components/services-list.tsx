"use client";

import Image from "next/image";
import { useState } from "react";
import { services, type Service } from "@/data/services";

const defaultServiceId: Service["id"] = services[0].id;

export function ServicesEditorial() {
  const [activeId, setActiveId] = useState<Service["id"]>(defaultServiceId);
  const activeService = services.find((service) => service.id === activeId) ?? services[0];

  return (
    <section id="services" className="services-editorial" aria-labelledby="services-title">
      <div className="site-container services-editorial__shell">
        <div className="services-editorial__label">
          <span>03</span>
          <span>Services</span>
        </div>

        <div className="services-editorial__grid">
          <div className="services-editorial__content">
            <h2 id="services-title">
              <span>Premium printing and packaging,</span>
              <span>crafted with precision.</span>
            </h2>

            <p className="services-editorial__intro">
              From custom boxes and paper bags to specialist printing and premium finishes, we help
              businesses produce packaging that feels considered, practical, and memorable.
            </p>

            <ul className="services-editorial__list">
              {services.map((service, index) => {
                const isActive = service.id === activeId;
                const number = String(index + 1).padStart(2, "0");
                const mobileImageId = `service-mobile-image-${service.id}`;

                return (
                  <li
                    className={isActive ? "is-active" : undefined}
                    key={service.id}
                    onMouseEnter={() => setActiveId(service.id)}
                    onFocusCapture={() => setActiveId(service.id)}
                  >
                    <button
                      type="button"
                      aria-expanded={isActive}
                      aria-controls={mobileImageId}
                      onClick={() => setActiveId(service.id)}
                    >
                      <span className="services-editorial__number">{number}</span>

                      <span className="services-editorial__service-copy">
                        <strong>{service.title}</strong>
                        <small>{service.description}</small>
                      </span>
                    </button>

                    {isActive && (
                      <div
                        id={mobileImageId}
                        className="services-editorial__mobile-visual"
                      >
                        <div className="services-editorial__mobile-image">
                          <Image
                            src={service.relatedImage.src}
                            alt={service.relatedImage.alt}
                            fill
                            sizes="100vw"
                            unoptimized
                          />
                        </div>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>

            <a className="services-editorial__link" href="#process">
              Explore Our Process <span aria-hidden="true">→</span>
            </a>
          </div>

          <figure className="services-editorial__visual" aria-live="polite">
            <div className="services-editorial__image">
              {services.map((service) => {
                const active = service.id === activeService.id;

                return (
                  <div
                    className={`services-editorial__visual-image${active ? " is-active" : ""}`}
                    key={service.id}
                    aria-hidden={!active}
                  >
                    <Image
                      src={service.relatedImage.src}
                      alt={active ? service.relatedImage.alt : ""}
                      fill
                      sizes="(max-width: 767px) 100vw, (max-width: 1100px) 45vw, 50vw"
                      priority={service.id === defaultServiceId}
                      unoptimized
                    />
                  </div>
                );
              })}
            </div>
          </figure>
        </div>
      </div>
    </section>
  );
}
