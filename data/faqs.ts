export type Faq = {
  id: string;
  question: string;
  answer: string;
};

export const faqs = [
  {
    id: "project-types",
    question: "What type of projects do you take on?",
    answer:
      "Brand strategy, visual identity, packaging, print, gifting, hospitality touchpoints, art direction and production support can be shaped into a focused scope.",
  },
  {
    id: "timeline",
    question: "How long does a branding or packaging project take?",
    answer:
      "Timing depends on scope, review rounds and production needs. Share your desired launch date so the studio can propose a realistic schedule.",
  },
  {
    id: "new-businesses",
    question: "Do you work with new businesses?",
    answer:
      "Yes. An early-stage brief can begin with strategy and identity before moving into packaging and launch applications.",
  },
  {
    id: "redesign",
    question: "Can you redesign existing packaging?",
    answer:
      "Yes. Existing ranges can be reviewed for clarity, consistency, shelf presence and practical production improvements.",
  },
  {
    id: "production",
    question: "Do you provide print and production support?",
    answer:
      "Production support can include artwork preparation, prototypes, material guidance and coordination-ready specifications, depending on the brief.",
  },
  {
    id: "starting-information",
    question: "What information is needed to begin?",
    answer:
      "Share what you are making, who it is for, the deliverables you need, your intended timeline, budget context and any useful references.",
  },
  {
    id: "remote",
    question: "Do you work with clients remotely?",
    answer:
      "Share your location in the enquiry. The studio can then confirm the most practical collaboration and production route for your project.",
  },
  {
    id: "fees",
    question: "How much does a project cost?",
    answer:
      "Project fees depend on scope, deliverables and production requirements. Share a brief to receive a tailored estimate.",
  },
] as const satisfies readonly Faq[];
