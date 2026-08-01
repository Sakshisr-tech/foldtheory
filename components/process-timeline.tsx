"use client";

import { useEffect, useRef, useState } from "react";
import { processSteps } from "@/data/process";

export function ProcessTimeline() {
  const [activeIndex, setActiveIndex] = useState(0);
  const itemRefs = useRef<Array<HTMLElement | null>>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const index = Number((visible.target as HTMLElement).dataset.index ?? 0);
        setActiveIndex(index);
      },
      { rootMargin: "-30% 0px -52% 0px", threshold: [0.1, 0.4, 0.75] },
    );

    itemRefs.current.forEach((item) => item && observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="process-timeline" style={{ "--process-active": activeIndex } as React.CSSProperties}>
      <div className="process-timeline__rail" aria-hidden="true">
        <span style={{ transform: `scaleX(${(activeIndex + 1) / processSteps.length})` }} />
      </div>
      <ol>
        {processSteps.map((step, index) => (
          <li
            key={step.id}
            ref={(node) => { itemRefs.current[index] = node; }}
            data-index={index}
            className={index <= activeIndex ? "is-active" : ""}
          >
            <article>
              <span className="process-step__number">{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </article>
          </li>
        ))}
      </ol>
    </div>
  );
}
