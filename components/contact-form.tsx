"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { projectTypeOptions } from "@/data/services";

type FormStatus = "idle" | "submitting" | "success" | "error";
type FieldName = "name" | "email" | "company" | "phone" | "projectTypes" | "budget" | "timeline" | "description" | "reference";
type FieldErrors = Partial<Record<FieldName, string>>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ease = [0.22, 1, 0.36, 1] as const;

const budgetOptions = [
  "Under ₹25,000",
  "₹25,000–₹50,000",
  "₹50,000–₹1,00,000",
  "₹1,00,000+",
  "Not sure yet",
] as const;

const timelineOptions = [
  "As soon as possible",
  "Within 1 month",
  "1–3 months",
  "3+ months",
  "Flexible",
] as const;

function RevealField({
  children,
  className = "field",
  index,
  reduceMotion,
}: {
  children: ReactNode;
  className?: string;
  index: number;
  reduceMotion: boolean | null;
}) {
  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 14 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -5% 0px" }}
      transition={{ delay: reduceMotion ? 0 : 0.08 + index * 0.045, duration: reduceMotion ? 0.01 : 0.52, ease }}
    >
      {children}
    </motion.div>
  );
}

function RequiredMark() {
  return <span aria-hidden="true">*</span>;
}

export function ContactForm() {
  const reduceMotion = useReducedMotion();
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [arrivalHighlighted, setArrivalHighlighted] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const startedAt = useRef(0);
  const arrivalTimerRef = useRef<ReturnType<typeof window.setTimeout> | null>(null);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  useEffect(() => {
    const highlight = () => {
      if (arrivalTimerRef.current !== null) window.clearTimeout(arrivalTimerRef.current);
      setArrivalHighlighted(false);
      window.requestAnimationFrame(() => {
        setArrivalHighlighted(true);
        arrivalTimerRef.current = window.setTimeout(() => setArrivalHighlighted(false), 1100);
      });
    };

    window.addEventListener("fold-theory:highlight-contact", highlight);
    return () => {
      window.removeEventListener("fold-theory:highlight-contact", highlight);
      if (arrivalTimerRef.current !== null) window.clearTimeout(arrivalTimerRef.current);
    };
  }, []);

  const validate = (data: FormData): FieldErrors => {
    const nextErrors: FieldErrors = {};
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const company = String(data.get("company") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const projectType = String(data.get("projectTypes") ?? "").trim();
    const budget = String(data.get("budget") ?? "").trim();
    const timeline = String(data.get("timeline") ?? "").trim();
    const description = String(data.get("description") ?? "").trim();
    const reference = String(data.get("reference") ?? "").trim();

    if (name.length < 2) nextErrors.name = "Please share your name.";
    if (!emailPattern.test(email)) nextErrors.email = "Enter a valid email address.";
    if (company.length < 2) nextErrors.company = "Please share your brand or company name.";
    if (phone.replace(/\D/g, "").length < 7) nextErrors.phone = "Enter a valid phone or WhatsApp number.";
    if (!projectType) nextErrors.projectTypes = "Choose a project type.";
    if (!budget) nextErrors.budget = "Choose a budget range.";
    if (!timeline) nextErrors.timeline = "Choose a preferred timeline.";
    if (description.length < 20) nextErrors.description = "Please add at least 20 characters of project detail.";
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
      window.requestAnimationFrame(() => form.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus());
      return;
    }

    setStatus("submitting");
    try {
      const projectType = String(data.get("projectTypes") ?? "").trim();
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: String(data.get("name") ?? "").trim(),
          email: String(data.get("email") ?? "").trim(),
          company: String(data.get("company") ?? "").trim(),
          phone: String(data.get("phone") ?? "").trim(),
          projectTypes: projectType ? [projectType] : [],
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
      <motion.div
        className="form-success contact-success"
        role="status"
        tabIndex={-1}
        initial={reduceMotion ? false : { opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduceMotion ? 0.01 : 0.62, ease }}
      >
        <span className="contact-success__eyebrow">Enquiry received</span>
        <h3>Thank you.</h3>
        <p>Your project enquiry has been received.<br />We’ll get back to you within 1–2 business days.</p>
        <a href="#work">Return to Work <span aria-hidden="true">→</span></a>
      </motion.div>
    );
  }

  return (
    <form
      ref={formRef}
      className={`enquiry-form contact-brief ${arrivalHighlighted ? "enquiry-form--arrival" : ""}`}
      noValidate
      onSubmit={submit}
      aria-busy={status === "submitting"}
    >
      {status === "error" && (
        <div className="form-status form-status--error" role="alert">
          <strong>Your enquiry could not be sent yet.</strong>
          <p>Your details are still here. Please retry or email <a href="mailto:hello@foldtheory.com">hello@foldtheory.com</a>.</p>
        </div>
      )}

      <div className="form-trap" aria-hidden="true" hidden>
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="contact-brief__grid">
        <RevealField index={0} reduceMotion={reduceMotion}>
          <label htmlFor="name">Name <RequiredMark /></label>
          <div className="field__control">
            <input id="name" name="name" type="text" autoComplete="name" placeholder="Your name" aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "name-error" : undefined} />
          </div>
          {errors.name && <span id="name-error" className="field-error">{errors.name}</span>}
        </RevealField>

        <RevealField index={1} reduceMotion={reduceMotion}>
          <label htmlFor="email">Email <RequiredMark /></label>
          <div className="field__control">
            <input id="email" name="email" type="email" autoComplete="email" placeholder="you@brand.com" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "email-error" : undefined} />
          </div>
          {errors.email && <span id="email-error" className="field-error">{errors.email}</span>}
        </RevealField>

        <RevealField index={2} reduceMotion={reduceMotion}>
          <label htmlFor="company">Brand / Company <RequiredMark /></label>
          <div className="field__control">
            <input id="company" name="company" type="text" autoComplete="organization" placeholder="Your brand or company" aria-invalid={Boolean(errors.company)} aria-describedby={errors.company ? "company-error" : undefined} />
          </div>
          {errors.company && <span id="company-error" className="field-error">{errors.company}</span>}
        </RevealField>

        <RevealField index={3} reduceMotion={reduceMotion}>
          <label htmlFor="phone">Phone / WhatsApp <RequiredMark /></label>
          <div className="field__control">
            <input id="phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="+91 00000 00000" aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? "phone-error" : undefined} />
          </div>
          {errors.phone && <span id="phone-error" className="field-error">{errors.phone}</span>}
        </RevealField>

        <RevealField index={4} reduceMotion={reduceMotion}>
          <label htmlFor="projectTypes">Project Type <RequiredMark /></label>
          <div className="field__control field__control--select">
            <select id="projectTypes" name="projectTypes" defaultValue="" aria-invalid={Boolean(errors.projectTypes)} aria-describedby={errors.projectTypes ? "projectTypes-error" : undefined}>
              <option value="" disabled>Select a project type</option>
              {projectTypeOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
            </select>
          </div>
          {errors.projectTypes && <span id="projectTypes-error" className="field-error">{errors.projectTypes}</span>}
        </RevealField>

        <RevealField index={5} reduceMotion={reduceMotion}>
          <label htmlFor="budget">Budget Range <RequiredMark /></label>
          <div className="field__control field__control--select">
            <select id="budget" name="budget" defaultValue="" aria-invalid={Boolean(errors.budget)} aria-describedby={errors.budget ? "budget-error" : undefined}>
              <option value="" disabled>Select a range</option>
              {budgetOptions.map((option) => <option key={option} value={option}>{option}</option>)}
            </select>
          </div>
          {errors.budget && <span id="budget-error" className="field-error">{errors.budget}</span>}
        </RevealField>

        <RevealField index={6} reduceMotion={reduceMotion}>
          <label htmlFor="timeline">Timeline <RequiredMark /></label>
          <div className="field__control field__control--select">
            <select id="timeline" name="timeline" defaultValue="" aria-invalid={Boolean(errors.timeline)} aria-describedby={errors.timeline ? "timeline-error" : undefined}>
              <option value="" disabled>Select a timeline</option>
              {timelineOptions.map((option) => <option key={option} value={option}>{option}</option>)}
            </select>
          </div>
          {errors.timeline && <span id="timeline-error" className="field-error">{errors.timeline}</span>}
        </RevealField>

        <RevealField index={7} reduceMotion={reduceMotion}>
          <label htmlFor="reference">Reference / Inspiration URL <small>Optional</small></label>
          <div className="field__control">
            <input id="reference" name="reference" type="url" inputMode="url" placeholder="https://" aria-invalid={Boolean(errors.reference)} aria-describedby={errors.reference ? "reference-error" : undefined} />
          </div>
          {errors.reference && <span id="reference-error" className="field-error">{errors.reference}</span>}
        </RevealField>

        <RevealField className="field contact-brief__details" index={8} reduceMotion={reduceMotion}>
          <label htmlFor="description">Project Details <RequiredMark /></label>
          <div className="field__control field__control--textarea">
            <textarea id="description" name="description" rows={4} placeholder="Briefly describe your product, audience and packaging goals." aria-invalid={Boolean(errors.description)} aria-describedby={errors.description ? "description-error" : undefined} />
          </div>
          {errors.description && <span id="description-error" className="field-error">{errors.description}</span>}
        </RevealField>
      </div>

      <motion.div
        className="contact-brief__submit"
        initial={reduceMotion ? false : { opacity: 0, y: 14 }}
        whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px 0px -5% 0px" }}
        transition={{ delay: reduceMotion ? 0 : 0.48, duration: reduceMotion ? 0.01 : 0.54, ease }}
      >
        <p>Your details stay private.<br />No spam, only a thoughtful response.</p>
        <button type="submit" disabled={status === "submitting"}>
          <span>{status === "submitting" ? "Sending…" : "Start Your Project"}</span>
          <span aria-hidden="true">↗︎</span>
        </button>
      </motion.div>
    </form>
  );
}
