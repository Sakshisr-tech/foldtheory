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
    description: "Understand the business, audience, product and goals.",
  },
  {
    id: "define",
    number: "02",
    title: "Define",
    description: "Build positioning, creative direction and visual strategy.",
  },
  {
    id: "design",
    number: "03",
    title: "Design",
    description: "Develop identity, packaging and the applications that bring them to life.",
  },
  {
    id: "refine",
    number: "04",
    title: "Refine",
    description: "Test, prototype, review and prepare the production details.",
  },
  {
    id: "deliver",
    number: "05",
    title: "Deliver",
    description: "Provide final systems, files and practical implementation support.",
  },
] as const satisfies readonly ProcessStep[];
