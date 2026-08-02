export type ProcessStep = {
  id: string;
  number: string;
  title: string;
  description: string;
};

export const processSteps = [
  {
    id: "discover",
    number: "01",
    title: "Discover",
    description: "Understanding your brand, audience, product and goals.",
  },
  {
    id: "design",
    number: "02",
    title: "Design",
    description: "Exploring concepts, structure, materials and visual identity.",
  },
  {
    id: "refine",
    number: "03",
    title: "Refine",
    description: "Collaborative feedback, prototyping and production preparation.",
  },
  {
    id: "deliver",
    number: "04",
    title: "Deliver",
    description: "Premium production guidance and packaging ready for launch.",
  },
] as const satisfies readonly ProcessStep[];
