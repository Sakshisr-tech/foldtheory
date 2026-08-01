import type { Metadata } from "next";
import Link from "next/link";
import { getProjectYearLabel, projects } from "@/lib/projects";
import { ProjectMedia } from "./ProjectMedia";

export const metadata: Metadata = {
  title: "Selected Work",
  description:
    "Explore Fold Theory's packaging, print, gifting, and hospitality work from the studio's official archive.",
};

export default function WorkPage() {
  return (
    <main className="work-page" id="main-content">
      <header className="work-intro">
        <div className="work-intro__grid">
          <p className="work-intro__eyebrow">Work / Portfolio index</p>
          <p className="work-intro__count" aria-label={`${projects.length} projects`}>
            00—0{projects.length}
          </p>
          <h1 className="work-intro__title">
            Selected work,
            <br />
            <em>thoughtfully framed.</em>
          </h1>
          <div className="work-intro__copy">
            <p>
              A working editorial archive for identity, packaging, print, and
              tactile brand experiences.
            </p>
            <p className="work-intro__disclosure">
              Every project and cover image below is verified from Fold Theory&apos;s
              official studio archive. Where a full brief or production detail has
              not been supplied, the page says so plainly.
            </p>
          </div>
        </div>
      </header>

      <section className="work-selection" aria-labelledby="work-selection-title">
        <div className="section-heading work-selection__heading">
          <p className="section-heading__index">01</p>
          <h2 id="work-selection-title" className="section-heading__title">
            Project studies
          </h2>
          <p className="section-heading__note">Official studio archive</p>
        </div>

        <div className="work-selection__grid">
          {projects.map((project) => (
            <article
              className={`work-card work-card--${project.cardLayout}`}
              key={project.slug}
            >
              <Link
                className="work-card__link"
                href={`/work/${project.slug}`}
                aria-label={`View ${project.title} case study`}
              >
                <figure className="work-card__figure">
                  <ProjectMedia
                    className="work-card__media"
                    media={project.cover}
                    sizes={
                      project.cardLayout === "portrait"
                        ? "(max-width: 768px) 100vw, 38vw"
                        : "(max-width: 768px) 100vw, 72vw"
                    }
                  />
                  <figcaption className="work-card__caption">
                    Official Fold Theory archive
                  </figcaption>
                </figure>

                <div className="work-card__details">
                  <div className="work-card__meta">
                    <span>{project.number}</span>
                    <span>{project.category}</span>
                    <span>{getProjectYearLabel(project)}</span>
                  </div>
                  <h3 className="work-card__title">{project.title}</h3>
                  <p className="work-card__description">{project.description}</p>
                  <span className="work-card__action" aria-hidden="true">
                    View case study <span>↗</span>
                  </span>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="work-archive" aria-labelledby="work-archive-title">
        <div className="section-heading work-archive__heading">
          <p className="section-heading__index">02</p>
          <h2 id="work-archive-title" className="section-heading__title">
            Archive at a glance
          </h2>
          <p className="section-heading__note">Verified public portfolio</p>
        </div>

        <div className="work-archive__table-wrap">
          <table className="work-archive__table">
            <thead>
              <tr>
                <th scope="col">Project</th>
                <th scope="col">Industry</th>
                <th scope="col">Services</th>
                <th scope="col">Year</th>
                <th scope="col">
                  <span className="sr-only">Open case study</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project.slug}>
                  <th scope="row">
                    <Link href={`/work/${project.slug}`}>{project.title}</Link>
                    <span className="work-archive__placeholder-label">
                      Official studio archive
                    </span>
                  </th>
                  <td>{project.industry}</td>
                  <td>{project.services.join(", ")}</td>
                  <td>{getProjectYearLabel(project)}</td>
                  <td aria-hidden="true">↗</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <aside className="work-note" aria-labelledby="work-note-title">
        <p className="work-note__eyebrow">A note on the archive</p>
        <h2 id="work-note-title" className="work-note__title">
          The real work, with room for the full story.
        </h2>
        <p className="work-note__copy">
          Each study uses verified official imagery and public project context.
          Unpublished specifications, dates, outcomes, and testimonials are left
          unclaimed until approved source material is available.
        </p>
        <Link className="work-note__link" href="/contact">
          Discuss a project <span aria-hidden="true">↗</span>
        </Link>
      </aside>
    </main>
  );
}
