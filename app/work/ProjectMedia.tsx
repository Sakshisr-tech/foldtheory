import Image from "next/image";
import type { ProjectMedia as ProjectMediaData } from "@/lib/projects";

type ProjectMediaProps = {
  media: ProjectMediaData;
  className?: string;
  priority?: boolean;
  sizes?: string;
};

export function ProjectMedia({
  media,
  className,
  priority = false,
  sizes = "(max-width: 768px) 100vw, 70vw",
}: ProjectMediaProps) {
  const classes = ["project-media", className].filter(Boolean).join(" ");

  return (
    <div
      className={classes}
      data-aspect={media.aspect}
      data-tone={media.tone}
      data-media-status={media.src ? "available" : "awaiting-asset"}
    >
      {media.src ? (
        <Image
          className="project-media__image"
          src={media.src}
          alt={media.alt}
          fill
          priority={priority}
          sizes={sizes}
          unoptimized
        />
      ) : (
        <div
          className="project-media__placeholder"
          role="img"
          aria-label={media.alt}
        >
          <span className="project-media__registration" aria-hidden="true">
            FT / {media.id}
          </span>
          <span className="project-media__availability">
            Portfolio photography pending
          </span>
          <span className="project-media__rule" aria-hidden="true" />
          <span className="project-media__label">{media.label}</span>
          <span className="project-media__description">{media.description}</span>
        </div>
      )}
    </div>
  );
}
