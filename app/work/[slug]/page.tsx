import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getProjectById, projects } from "@/data/projects";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.id }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const project = getProjectById((await params).slug);
  if (!project) return {};

  return {
    title: project.title,
    description: project.summary,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const project = getProjectById((await params).slug);
  if (!project) notFound();

  const gallery = [
    project.coverImage,
    ...project.detailImages.filter((image) => image.src !== project.coverImage.src),
  ];

  return (
    <article className="work-detail">
      <div className="work-detail__shell">
        <a className="work-detail__back" href="/#work">
          <span aria-hidden="true">&#8592;</span> Selected Work
        </a>

        <header className="work-detail__header">
          <div>
            <p>{project.category}</p>
            <h1>{project.title}</h1>
          </div>
          <div>
            <p>{project.summary}</p>
            <ul aria-label="Project services">
              {project.services.map((service) => <li key={service}>{service}</li>)}
            </ul>
          </div>
        </header>

        <figure className="work-detail__hero">
          <Image
            src={project.coverImage.src}
            alt={project.coverImage.alt}
            fill
            priority
            sizes="100vw"
            unoptimized
          />
        </figure>

        <section className="work-detail__narrative" aria-label="Project story">
          <article>
            <span>Overview</span>
            <h2>The project</h2>
            <p>{project.overview}</p>
          </article>
          <article>
            <span>Challenge</span>
            <h2>What needed solving</h2>
            <p>{project.challenge}</p>
          </article>
          <article>
            <span>Approach</span>
            <h2>How the design responds</h2>
            <p>{project.solution}</p>
          </article>
          <article>
            <span>Outcome</span>
            <h2>What was produced</h2>
            <p>{project.outcome}</p>
          </article>
        </section>

        {gallery.length > 1 && (
          <div className="work-detail__gallery">
            {gallery.slice(1).map((image) => (
              <figure key={image.src}>
                <Image src={image.src} alt={image.alt} fill sizes="(max-width: 800px) 100vw, 50vw" unoptimized />
              </figure>
            ))}
          </div>
        )}

        <footer className="work-detail__footer">
          <p>Have a packaging story worth unfolding?</p>
          <a className="button button--primary" href="/#contact">
            Start Your Project <span aria-hidden="true">&#8599;</span>
          </a>
        </footer>
      </div>
    </article>
  );
}
