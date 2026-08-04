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
    description:
      "Understanding your business, product, packaging goals, quantities, and production requirements.",
  },
  {
    id: "plan",
    number: "02",
    title: "Plan",
    description:
      "Selecting the right packaging structure, materials, printing methods, finishes and production specifications.",
  },
  {
    id: "refine",
    number: "03",
    title: "Refine",
    description:
      "Sampling, prototyping, quality checks and final approvals before production.",
  },
  {
    id: "deliver",
    number: "04",
    title: "Deliver",
    description:
      "Premium production, careful finishing, quality assurance, and reliable delivery.",
  },
] as const satisfies readonly ProcessStep[];
