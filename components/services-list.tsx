"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { services } from "@/data/services";

export function ServicesList() {
  const [activeId, setActiveId] = useState(services[0].id);
  const [isMobile, setIsMobile] = useState(false);
  const activeService = services.find((service) => service.id === activeId) ?? services[0];

  useEffect(() => {
    const query = window.matchMedia("(max-width: 900px)");
    const update = () => setIsMobile(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return (
    <div className="services-experience">
      <div className="services-list">
        {services.map((service) => {
          const open = service.id === activeId;
          const panelId = `service-panel-${service.id}`;
          return (
            <article
              className={`service-row ${open ? "is-active" : ""}`}
              key={service.id}
              onMouseEnter={() => setActiveId(service.id)}
            >
              <button
                type="button"
                aria-expanded={isMobile ? open : undefined}
                aria-controls={isMobile ? panelId : undefined}
                onClick={() => setActiveId(service.id)}
                onFocus={() => setActiveId(service.id)}
              >
                <span className="service-row__number">{service.number}</span>
                <span className="service-row__title">{service.title}</span>
                <span className="service-row__capability">{service.capability}</span>
                <span className="service-row__icon" aria-hidden="true">{open ? "−" : "+"}</span>
              </button>
              <div id={panelId} className="service-row__panel">
                <div>
                  <p>{service.description}</p>
                  <span>{service.capability}</span>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <figure className="services-preview" aria-live="polite">
        <Image
          key={activeService.id}
          src={activeService.relatedImage.src}
          alt={activeService.relatedImage.alt}
          fill
          sizes="32vw"
          unoptimized
        />
        <figcaption>
          <span>Related studio detail</span>
          <span>{activeService.title}</span>
        </figcaption>
      </figure>
    </div>
  );
}
