import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getNextProject,
  getProjectBySlug,
  getProjectYearLabel,
  projects,
  type ProjectContentBlock,
  type ProjectNarrative,
} from "@/lib/projects";
import { ProjectMedia } from "../ProjectMedia";

type WorkCaseStudyPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: WorkCaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return { title: "Project not found" };
  }

  return {
    title: project.title,
    description: `${project.description} From Fold Theory's official studio archive.`,
  };
}

function NarrativeSection({
  id,
  index,
  label,
  narrative,
}: {
  id: string;
  index: string;
  label: string;
  narrative: ProjectNarrative;
}) {
  return (
    <section className="case-study-narrative" aria-labelledby={id}>
      <div className="case-study-narrative__label">
        <span>{index}</span>
        <span>{label}</span>
      </div>
      <div className="case-study-narrative__content">
        <h2 id={id}>{narrative.heading}</h2>
        {narrative.body.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </section>
  );
}

function ProjectBlock({ block }: { block: ProjectContentBlock }) {
  switch (block.type) {
    case "text":
      return (
        <section
          className={`case-study-block case-study-block--text case-study-block--${block.layout ?? "narrow"}`}
        >
          <p className="case-study-block__eyebrow">{block.eyebrow}</p>
          <h2>{block.heading}</h2>
          <div className="case-study-block__copy">
            {block.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </section>
      );

    case "media":
      return (
        <figure
          className={`case-study-block case-study-block--media case-study-block--${block.layout ?? "full"}`}
        >
          <ProjectMedia
            media={block.media}
            sizes={block.layout === "inset" ? "(max-width: 768px) 100vw, 72vw" : "100vw"}
          />
          <figcaption>{block.caption}</figcaption>
        </figure>
      );

    case "media-pair":
      return (
        <figure
          className={`case-study-block case-study-block--media-pair case-study-block--${block.layout ?? "balanced"}`}
        >
          <div className="case-study-block__media-grid">
            {block.media.map((item) => (
              <ProjectMedia
                key={item.id}
                media={item}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            ))}
          </div>
          <figcaption>{block.caption}</figcaption>
        </figure>
      );

    case "statement":
      return (
        <aside className="case-study-block case-study-block--statement">
          <p className="case-study-block__eyebrow">{block.eyebrow}</p>
          <blockquote>{block.quote}</blockquote>
          <p className="case-study-block__note">{block.note}</p>
        </aside>
      );

    case "palette":
      return (
        <section className="case-study-block case-study-block--palette">
          <div className="case-study-block__intro">
            <p className="case-study-block__eyebrow">Typography &amp; colour system</p>
            <h2>{block.heading}</h2>
            <p>{block.description}</p>
          </div>
          <ul className="case-study-palette" aria-label="Illustrative colour palette">
            {block.colors.map((color) => (
              <li className="case-study-palette__item" key={color.hex}>
                <span
                  className="case-study-palette__swatch"
                  style={{ backgroundColor: color.hex }}
                  aria-hidden="true"
                />
                <span>{color.name}</span>
                <span>{color.hex}</span>
              </li>
            ))}
          </ul>
        </section>
      );

    case "applications":
      return (
        <section className="case-study-block case-study-block--applications">
          <div className="case-study-block__intro">
            <p className="case-study-block__eyebrow">Applications</p>
            <h2>{block.heading}</h2>
            <p>{block.description}</p>
          </div>
          <ol className="case-study-applications">
            {block.items.map((item, index) => (
              <li key={item}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <span>{item}</span>
              </li>
            ))}
          </ol>
        </section>
      );
  }
}

export default async function WorkCaseStudyPage({
  params,
}: WorkCaseStudyPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const nextProject = getNextProject(project.slug);

  return (
    <main className={`case-study case-study--${project.slug}`} id="main-content">
      <article>
        <header className="case-study-hero">
          <div className="case-study-hero__heading">
            <div className="case-study-hero__kicker">
              <p>Case study / {project.number}</p>
              <p className="case-study-hero__status">
                Official studio archive
              </p>
            </div>
            <h1>{project.title}</h1>
            <p className="case-study-hero__statement">{project.statement}</p>
          </div>

          <dl className="case-study-hero__facts">
            <div>
              <dt>Category</dt>
              <dd>{project.category}</dd>
            </div>
            <div>
              <dt>Industry</dt>
              <dd>{project.industry}</dd>
            </div>
            <div>
              <dt>Year</dt>
              <dd>{getProjectYearLabel(project)}</dd>
            </div>
          </dl>
        </header>

        <figure className="case-study-hero__figure">
          <ProjectMedia
            className="case-study-hero__media"
            media={project.cover}
            priority
            sizes="100vw"
          />
          <figcaption>
            <span>{project.cover.label}</span>
            <span>Official Fold Theory portfolio photography</span>
          </figcaption>
        </figure>

        <div className="case-study-body">
          <aside className="case-study-meta" aria-label="Project information">
            <div className="case-study-meta__inner">
              <p className="case-study-meta__label">Services</p>
              <ul>
                {project.services.map((service) => (
                  <li key={service}>{service}</li>
                ))}
              </ul>
              <p className="case-study-meta__disclosure" role="note">
                {project.placeholderNotice}
              </p>
              <a
                className="case-study-meta__back"
                href={project.sourceUrl}
                target="_blank"
                rel="noreferrer"
              >
                View official post <span aria-hidden="true">↗</span>
              </a>
              <Link className="case-study-meta__back" href="/work">
                <span aria-hidden="true">←</span> All work
              </Link>
            </div>
          </aside>

          <div className="case-study-content">
            <NarrativeSection
              id="project-overview"
              index="01"
              label="Overview"
              narrative={project.overview}
            />

            <div className="case-study-narratives">
              <NarrativeSection
                id="creative-challenge"
                index="02"
                label="Creative challenge"
                narrative={project.challenge}
              />
              <NarrativeSection
                id="design-approach"
                index="03"
                label="Design approach"
                narrative={project.approach}
              />
            </div>

            <section
              className="case-study-system-note"
              aria-labelledby="system-note-title"
            >
              <p className="case-study-system-note__index">04</p>
              <div>
                <p className="case-study-system-note__eyebrow">
                  Packaging details / typography / colour
                </p>
                <h2 id="system-note-title">Specifications awaiting source material.</h2>
                <p>
                  Approved dielines, typefaces, colour values, substrates, and
                  finishing notes were not included with the portfolio reference.
                  This section is reserved for those verified details.
                </p>
              </div>
            </section>

            <div className="case-study-blocks">
              {project.blocks.map((block, index) => (
                <ProjectBlock block={block} key={`${block.type}-${index}`} />
              ))}
            </div>

            <section
              className="case-study-production"
              aria-labelledby="production-title"
            >
              <p className="case-study-production__eyebrow">
                Behind the scenes / production
              </p>
              <h2 id="production-title">The making belongs in the story.</h2>
              <p>
                Process photography, prototypes, press checks, and approved
                production notes have not been supplied. The layout intentionally
                holds space for them without suggesting work that cannot be
                verified.
              </p>
            </section>

            <NarrativeSection
              id="project-outcome"
              index="05"
              label="Outcome"
              narrative={project.outcome}
            />
          </div>
        </div>
      </article>

      <nav className="next-project" aria-label="Next project">
        <Link className="next-project__link" href={`/work/${nextProject.slug}`}>
          <div className="next-project__heading">
            <p>Next project / {nextProject.number}</p>
            <h2>{nextProject.title}</h2>
            <span aria-hidden="true">↗</span>
          </div>
          <ProjectMedia
            className="next-project__media"
            media={nextProject.cover}
            sizes="(max-width: 768px) 100vw, 38vw"
          />
        </Link>
      </nav>
    </main>
  );
}
