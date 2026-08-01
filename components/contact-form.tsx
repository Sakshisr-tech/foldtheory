"use client";

import { useEffect, useRef, useState } from "react";
import { projectTypeOptions } from "@/data/services";

type FormStatus = "idle" | "submitting" | "success" | "error";
type FieldErrors = Partial<Record<"name" | "email" | "company" | "projectTypes" | "description" | "reference", string>>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const summaryRef = useRef<HTMLDivElement>(null);
  const startedAt = useRef(0);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  const validate = (data: FormData): FieldErrors => {
    const nextErrors: FieldErrors = {};
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const company = String(data.get("company") ?? "").trim();
    const description = String(data.get("description") ?? "").trim();
    const reference = String(data.get("reference") ?? "").trim();
    const projectTypes = data.getAll("projectTypes");

    if (name.length < 2) nextErrors.name = "Please share your name.";
    if (!emailPattern.test(email)) nextErrors.email = "Enter a valid email address.";
    if (company.length < 2) nextErrors.company = "Please share your brand or company name.";
    if (projectTypes.length === 0) nextErrors.projectTypes = "Choose at least one project type.";
    if (description.length < 20) nextErrors.description = "Tell us a little more about the project (at least 20 characters).";
    if (reference) {
      try {
        const url = new URL(reference);
        if (!/^https?:$/.test(url.protocol)) throw new Error("Invalid protocol");
      } catch {
        nextErrors.reference = "Enter a full link beginning with http:// or https://.";
      }
    }
    return nextErrors;
  };

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const nextErrors = validate(data);
    setErrors(nextErrors);
    setStatus("idle");

    if (Object.keys(nextErrors).length > 0) {
      window.requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }

    setStatus("submitting");
    try {
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: String(data.get("name") ?? "").trim(),
          email: String(data.get("email") ?? "").trim(),
          company: String(data.get("company") ?? "").trim(),
          projectTypes: data.getAll("projectTypes").map(String),
          description: String(data.get("description") ?? "").trim(),
          budget: String(data.get("budget") ?? "").trim(),
          timeline: String(data.get("timeline") ?? "").trim(),
          reference: String(data.get("reference") ?? "").trim(),
          website: String(data.get("website") ?? ""),
          startedAt: startedAt.current,
        }),
      });
      if (!response.ok) throw new Error("Submission failed");
      setStatus("success");
      setErrors({});
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="form-success" role="status" tabIndex={-1}>
        <span aria-hidden="true">✓</span>
        <h3>Thank you. Your project enquiry has been received.</h3>
        <p>We have kept every detail you shared. You can also continue the conversation on Instagram.</p>
        <a className="button button--light" href="https://www.instagram.com/fold.theory2/" target="_blank" rel="noreferrer">
          Visit @fold.theory2 <span aria-hidden="true">↗</span>
        </a>
      </div>
    );
  }

  return (
    <form className="enquiry-form" noValidate onSubmit={submit} aria-busy={status === "submitting"}>
      {Object.keys(errors).length > 0 && (
        <div className="form-summary" role="alert" tabIndex={-1} ref={summaryRef}>
          <strong>Please review the highlighted fields.</strong>
          <ul>
            {Object.entries(errors).map(([field, message]) => (
              <li key={field}><a href={`#${field}`}>{message}</a></li>
            ))}
          </ul>
        </div>
      )}

      {status === "error" && (
        <div className="form-status form-status--error" role="alert">
          <strong>Your enquiry could not be sent yet.</strong>
          <p>Your details are still here. Please retry, or message <a href="https://www.instagram.com/fold.theory2/" target="_blank" rel="noreferrer">@fold.theory2</a>.</p>
        </div>
      )}

      <div className="form-trap" aria-hidden="true" hidden>
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="form-grid">
        <div className="field">
          <label htmlFor="name">Name <span aria-hidden="true">*</span></label>
          <input id="name" name="name" type="text" autoComplete="name" placeholder="Your name" aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "name-error" : undefined} />
          {errors.name && <span id="name-error" className="field-error">{errors.name}</span>}
        </div>
        <div className="field">
          <label htmlFor="email">Email <span aria-hidden="true">*</span></label>
          <input id="email" name="email" type="email" autoComplete="email" placeholder="you@brand.com" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "email-error" : undefined} />
          {errors.email && <span id="email-error" className="field-error">{errors.email}</span>}
        </div>
        <div className="field form-grid__wide">
          <label htmlFor="company">Brand or company <span aria-hidden="true">*</span></label>
          <input id="company" name="company" type="text" autoComplete="organization" placeholder="Brand, company or working name" aria-invalid={Boolean(errors.company)} aria-describedby={errors.company ? "company-error" : undefined} />
          {errors.company && <span id="company-error" className="field-error">{errors.company}</span>}
        </div>
      </div>

      <fieldset id="projectTypes" className="project-types" aria-describedby={errors.projectTypes ? "projectTypes-error" : undefined}>
        <legend>Project type <span aria-hidden="true">*</span> <small>Select all that apply</small></legend>
        <div className="project-types__grid">
          {projectTypeOptions.map((option) => (
            <label key={option.value}>
              <input type="checkbox" name="projectTypes" value={option.value} />
              <span>{option.label}<i aria-hidden="true">✓</i></span>
            </label>
          ))}
        </div>
        {errors.projectTypes && <span id="projectTypes-error" className="field-error">{errors.projectTypes}</span>}
      </fieldset>

      <div className="field">
        <label htmlFor="description">Project description <span aria-hidden="true">*</span></label>
        <textarea id="description" name="description" rows={5} placeholder="What are you making, what do you need, and what should the work achieve?" aria-invalid={Boolean(errors.description)} aria-describedby={errors.description ? "description-error" : undefined} />
        {errors.description && <span id="description-error" className="field-error">{errors.description}</span>}
      </div>

      <div className="form-grid form-grid--optional">
        <div className="field">
          <label htmlFor="budget">Estimated budget <small>Optional</small></label>
          <input id="budget" name="budget" type="text" placeholder="Share a range or say open" />
        </div>
        <div className="field">
          <label htmlFor="timeline">Desired timeline <small>Optional</small></label>
          <input id="timeline" name="timeline" type="text" placeholder="Launch date or preferred window" />
        </div>
        <div className="field form-grid__wide">
          <label htmlFor="reference">Inspiration or reference link <small>Optional</small></label>
          <input id="reference" name="reference" type="url" inputMode="url" placeholder="https://" aria-invalid={Boolean(errors.reference)} aria-describedby={errors.reference ? "reference-error" : undefined} />
          {errors.reference && <span id="reference-error" className="field-error">{errors.reference}</span>}
        </div>
      </div>

      <div className="enquiry-form__submit">
        <button className="button button--light" type="submit" disabled={status === "submitting"}>
          <span>{status === "submitting" ? "Sending enquiry…" : "Request a Project Estimate"}</span>
          <span aria-hidden="true">↗</span>
        </button>
        <p>Required fields are marked with an asterisk.</p>
      </div>
    </form>
  );
}
