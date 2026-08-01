import type { ProjectImage } from "./projects";

export type Testimonial = {
  quote: string;
  clientName: string;
  brandName: string;
  projectType: string;
  image: ProjectImage;
};

// Intentionally empty: the production section should remain hidden until approved client copy is supplied.
export const testimonials: readonly Testimonial[] = [];
