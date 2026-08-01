"use client";

import Link from "next/link";
import { FormEvent, useRef, useState } from "react";

import styles from "./page.module.css";

const projectOptions = [
  "Brand Identity",
  "Packaging Design",
  "Printed Collateral",
  "Corporate Gifting",
  "Hospitality Branding",
  "Art Direction",
  "Other",
];

type FieldName =
  | "name"
  | "email"
  | "projectTypes"
  | "budget"
  | "timeline"
  | "description"
  | "references";

type FormErrors = Partial<Record<FieldName, string>>;

const errorLabels: Record<FieldName, string> = {
  name: "Name",
  email: "Email",
  projectTypes: "Project type",
  budget: "Estimated budget",
  timeline: "Desired timeline",
  description: "Project description",
  references: "Inspiration or reference URLs",
};

const fieldTargets: Record<FieldName, string> = {
  name: "name",
  email: "email",
  projectTypes: "project-type-0",
  budget: "budget",
  timeline: "timeline",
  description: "description",
  references: "references",
};

function isValidWebUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

export default function ContactPage() {
  const [projectTypes, setProjectTypes] = useState<string[]>([]);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isComplete, setIsComplete] = useState(false);
  const [submittedName, setSubmittedName] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const errorSummaryRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLElement>(null);

  function clearError(field: FieldName) {
    setErrors((current) => {
      if (!current[field]) return current;
      const next = { ...current };
      delete next[field];
      return next;
    });
  }

  function toggleProjectType(option: string) {
    setProjectTypes((current) =>
      current.includes(option)
        ? current.filter((item) => item !== option)
        : [...current, option],
    );
    clearError("projectTypes");
  }

  function validate(formData: FormData) {
    const nextErrors: FormErrors = {};
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const budget = String(formData.get("budget") ?? "").trim();
    const timeline = String(formData.get("timeline") ?? "").trim();
    const description = String(formData.get("description") ?? "").trim();
    const references = String(formData.get("references") ?? "").trim();

    if (!name) nextErrors.name = "Enter your name.";
    if (!email) {
      nextErrors.email = "Enter your email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = "Enter an email address in the format name@example.com.";
    }
    if (projectTypes.length === 0) {
      nextErrors.projectTypes = "Choose at least one project type.";
    }
    if (!budget) nextErrors.budget = "Share a budget range or enter “To be discussed”.";
    if (!timeline) nextErrors.timeline = "Choose a desired timeline.";
    if (!description) {
      nextErrors.description = "Tell us a little about the project.";
    } else if (description.length < 20) {
      nextErrors.description = "Add a little more detail — at least 20 characters.";
    }

    if (references) {
      const urls = references
        .split(/[\n,]+/)
        .map((value) => value.trim())
        .filter(Boolean);
      if (urls.some((url) => !isValidWebUrl(url))) {
        nextErrors.references = "Use complete links beginning with http:// or https://.";
      }
    }

    return { nextErrors, name };
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const { nextErrors, name } = validate(new FormData(event.currentTarget));

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      requestAnimationFrame(() => errorSummaryRef.current?.focus());
      return;
    }

    setErrors({});
    setSubmittedName(name);
    setIsComplete(true);
    requestAnimationFrame(() => successRef.current?.focus());
  }

  function resetForm() {
    formRef.current?.reset();
    setProjectTypes([]);
    setErrors({});
    setSubmittedName("");
    setIsComplete(false);
    requestAnimationFrame(() => document.getElementById("name")?.focus());
  }

  const errorEntries = Object.entries(errors) as [FieldName, string][];

  return (
    <main className={styles["page-shell"]} id="main-content">
      <section className={styles["page-intro"]} aria-labelledby="contact-title">
        <div className={styles["page-intro-copy"]}>
          <p className={styles["page-kicker"]}>Start a project · Fold Theory</p>
          <h1 id="contact-title" className={styles["page-title"]}>
            Have something worth <em>unfolding?</em>
          </h1>
          <p className={styles["page-lead"]}>
            Tell us about your brand, product, or next packaging project. The
            useful details are the honest ones — where you are now, what needs
            to change, and what you hope to make possible.
          </p>
        </div>

        <aside className={styles["page-contact-details"]} aria-label="Studio contact details">
          <p className={styles["page-detail-label"]}>Direct contact</p>
          <dl>
            <div>
              <dt>Email</dt>
              <dd>To be confirmed</dd>
            </div>
            <div>
              <dt>Instagram</dt>
              <dd>
                <a href="https://www.instagram.com/fold.theory2/" target="_blank" rel="noreferrer">
                  @fold.theory2
                </a>
              </dd>
            </div>
            <div>
              <dt>Location</dt>
              <dd>New Delhi, India</dd>
            </div>
            <div>
              <dt>Availability</dt>
              <dd>Project enquiries via Instagram DM</dd>
            </div>
          </dl>
          <Link href="/about" className={styles["page-text-link"]}>
            Meet the studio <span aria-hidden="true">↗</span>
          </Link>
        </aside>
      </section>

      <section className={styles["page-form-section"]} aria-labelledby="enquiry-title">
        <div className={styles["page-form-heading"]}>
          <p className={styles["page-section-index"]}>Project enquiry</p>
          <h2 id="enquiry-title">Begin with the brief.</h2>
          <p>
            Fields marked <span aria-hidden="true">*</span>
            <span className={styles["page-visually-hidden"]}>with an asterisk</span> are required.
          </p>
        </div>

        {isComplete ? (
          <section
            className={styles["page-success"]}
            ref={successRef}
            role="status"
            aria-live="polite"
            tabIndex={-1}
          >
            <p className={styles["page-success-mark"]} aria-hidden="true">✓</p>
            <p className={styles["page-section-index"]}>Form complete</p>
            <h2>Thank you{submittedName ? `, ${submittedName}` : ""}.</h2>
            <p>
              Your enquiry is ready. This preview does not transmit or store
              form data, so no message has been sent. Connect a secure form
              delivery service before launch.
            </p>
            <div className={styles["page-success-actions"]}>
              <button type="button" onClick={resetForm}>Start another enquiry</button>
              <Link href="/">Return home</Link>
            </div>
          </section>
        ) : (
          <form
            className={styles["page-form"]}
            ref={formRef}
            onSubmit={handleSubmit}
            noValidate
          >
            {errorEntries.length > 0 && (
              <div
                className={styles["page-error-summary"]}
                ref={errorSummaryRef}
                role="alert"
                tabIndex={-1}
                aria-labelledby="error-summary-title"
              >
                <h3 id="error-summary-title">
                  Please check {errorEntries.length === 1 ? "one field" : `${errorEntries.length} fields`}.
                </h3>
                <ul>
                  {errorEntries.map(([field, message]) => (
                    <li key={field}>
                      <a href={`#${fieldTargets[field]}`}>
                        {errorLabels[field]}: {message}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className={styles["page-form-row"]}>
              <div className={styles["page-field"]}>
                <label htmlFor="name">Name <span aria-hidden="true">*</span></label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? "name-error" : undefined}
                  onChange={() => clearError("name")}
                />
                {errors.name && <p className={styles["page-field-error"]} id="name-error">{errors.name}</p>}
              </div>

              <div className={styles["page-field"]}>
                <label htmlFor="email">Email <span aria-hidden="true">*</span></label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  required
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  onChange={() => clearError("email")}
                />
                {errors.email && <p className={styles["page-field-error"]} id="email-error">{errors.email}</p>}
              </div>
            </div>

            <div className={styles["page-field"]}>
              <label htmlFor="company">Company or brand</label>
              <input id="company" name="company" type="text" autoComplete="organization" />
            </div>

            <fieldset
              className={styles["page-project-types"]}
              aria-describedby={`project-types-help${errors.projectTypes ? " project-types-error" : ""}`}
            >
              <legend>Project type <span aria-hidden="true">*</span></legend>
              <p id="project-types-help">Choose all that apply.</p>
              <div className={styles["page-options"]}>
                {projectOptions.map((option, index) => {
                  const checked = projectTypes.includes(option);
                  return (
                    <label key={option} className={checked ? styles["page-option-selected"] : undefined}>
                      <input
                        id={`project-type-${index}`}
                        name="projectType"
                        type="checkbox"
                        value={option}
                        checked={checked}
                        aria-invalid={Boolean(errors.projectTypes)}
                        onChange={() => toggleProjectType(option)}
                      />
                      <span>{option}</span>
                      <span aria-hidden="true">{checked ? "×" : "+"}</span>
                    </label>
                  );
                })}
              </div>
              {errors.projectTypes && (
                <p className={styles["page-field-error"]} id="project-types-error">{errors.projectTypes}</p>
              )}
            </fieldset>

            <div className={styles["page-form-row"]}>
              <div className={styles["page-field"]}>
                <label htmlFor="budget">Estimated budget <span aria-hidden="true">*</span></label>
                <input
                  id="budget"
                  name="budget"
                  type="text"
                  placeholder="A range, or ‘To be discussed’"
                  required
                  aria-invalid={Boolean(errors.budget)}
                  aria-describedby={errors.budget ? "budget-error" : undefined}
                  onChange={() => clearError("budget")}
                />
                {errors.budget && <p className={styles["page-field-error"]} id="budget-error">{errors.budget}</p>}
              </div>

              <div className={styles["page-field"]}>
                <label htmlFor="timeline">Desired timeline <span aria-hidden="true">*</span></label>
                <select
                  id="timeline"
                  name="timeline"
                  defaultValue=""
                  required
                  aria-invalid={Boolean(errors.timeline)}
                  aria-describedby={errors.timeline ? "timeline-error" : undefined}
                  onChange={() => clearError("timeline")}
                >
                  <option value="" disabled>Select an option</option>
                  <option>As soon as feasible</option>
                  <option>Within 1–3 months</option>
                  <option>Within 3–6 months</option>
                  <option>More than 6 months away</option>
                  <option>Flexible / to be discussed</option>
                </select>
                {errors.timeline && <p className={styles["page-field-error"]} id="timeline-error">{errors.timeline}</p>}
              </div>
            </div>

            <div className={styles["page-field"]}>
              <label htmlFor="description">Project description <span aria-hidden="true">*</span></label>
              <textarea
                id="description"
                name="description"
                rows={7}
                minLength={20}
                required
                placeholder="What are you making, what needs to change, and what would a successful outcome feel like?"
                aria-invalid={Boolean(errors.description)}
                aria-describedby={errors.description ? "description-help description-error" : "description-help"}
                onChange={() => clearError("description")}
              />
              <p className={styles["page-help"]} id="description-help">A short paragraph is plenty to begin.</p>
              {errors.description && <p className={styles["page-field-error"]} id="description-error">{errors.description}</p>}
            </div>

            <div className={styles["page-field"]}>
              <label htmlFor="references">Inspiration or reference URLs</label>
              <textarea
                id="references"
                name="references"
                rows={3}
                inputMode="url"
                placeholder="https://example.com — one link per line"
                aria-invalid={Boolean(errors.references)}
                aria-describedby={errors.references ? "references-help references-error" : "references-help"}
                onChange={() => clearError("references")}
              />
              <p className={styles["page-help"]} id="references-help">Use complete links beginning with http:// or https://.</p>
              {errors.references && <p className={styles["page-field-error"]} id="references-error">{errors.references}</p>}
            </div>

            <div className={styles["page-field"]}>
              <label htmlFor="referral">How did you hear about us?</label>
              <select id="referral" name="referral" defaultValue="">
                <option value="">Select an option</option>
                <option>Instagram</option>
                <option>Referral</option>
                <option>Search</option>
                <option>Previous collaboration</option>
                <option>Other</option>
              </select>
            </div>

            <div className={styles["page-form-footer"]}>
              <p>
                Preview note: nothing entered here leaves your browser or is
                stored. A secure submission service has not been connected.
              </p>
              <button type="submit">
                Complete enquiry <span aria-hidden="true">→</span>
              </button>
            </div>
          </form>
        )}
      </section>
    </main>
  );
}
