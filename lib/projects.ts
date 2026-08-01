export type ProjectMediaAspect = "landscape" | "portrait" | "square" | "panoramic";
export type ProjectMediaTone = "burgundy" | "paper" | "taupe" | "blush" | "espresso" | "charcoal";

export type ProjectMedia = {
  id: string;
  src?: `/${string}`;
  alt: string;
  label: string;
  description: string;
  aspect: ProjectMediaAspect;
  tone: ProjectMediaTone;
};

export type ProjectNarrative = {
  heading: string;
  body: readonly string[];
};

export type ProjectContentBlock =
  | { type: "text"; eyebrow: string; heading: string; body: readonly string[]; layout?: "narrow" | "offset" }
  | { type: "media"; media: ProjectMedia; caption: string; layout?: "full" | "inset" }
  | { type: "media-pair"; media: readonly [ProjectMedia, ProjectMedia]; caption: string; layout?: "balanced" | "portrait-lead" | "landscape-lead" }
  | { type: "statement"; eyebrow: string; quote: string; note: string }
  | { type: "palette"; heading: string; description: string; colors: readonly { name: string; hex: `#${string}` }[] }
  | { type: "applications"; heading: string; description: string; items: readonly string[] };

export type Project = {
  slug: string;
  number: string;
  title: string;
  isPlaceholder: boolean;
  category: string;
  industry: string;
  year?: string;
  description: string;
  statement: string;
  services: readonly string[];
  cover: ProjectMedia;
  cardLayout: "wide" | "portrait" | "offset" | "full";
  placeholderNotice: string;
  sourceUrl: string;
  overview: ProjectNarrative;
  challenge: ProjectNarrative;
  approach: ProjectNarrative;
  outcome: ProjectNarrative;
  blocks: readonly ProjectContentBlock[];
};

const awaitingDetails =
  "Project and image are verified from Fold Theory's official studio archive. A full approved brief, date, specifications, and outcome have not yet been supplied.";

function photo(
  id: string,
  src: `/${string}` | undefined,
  label: string,
  alt: string,
  aspect: ProjectMediaAspect,
  tone: ProjectMediaTone,
  description = "Additional approved photography can be added here.",
): ProjectMedia {
  return { id, src, label, alt, aspect, tone, description };
}

export const projects = [
  {
    slug: "cecilia-pizzeria",
    number: "01",
    title: "Cecilia Pizzeria",
    isPlaceholder: false,
    category: "Custom packaging",
    industry: "Food & beverage",
    description:
      "Custom pasta-kit boxes printed and produced for Cecilia Pizzeria in Delhi.",
    statement: "A playful pasta ritual, packed and ready for the table.",
    services: ["Custom packaging", "Printing", "Production"],
    cover: photo(
      "cecilia-cover",
      "/images/projects/cecilia-pasta-kit.jpg",
      "Cecilia Pizzeria pasta-kit boxes",
      "Blue and cream illustrated pasta-kit boxes produced for Cecilia Pizzeria",
      "landscape",
      "paper",
    ),
    cardLayout: "wide",
    placeholderNotice: awaitingDetails,
    sourceUrl: "https://www.instagram.com/p/DbUvP9mErpB/",
    overview: {
      heading: "Custom packaging for a cook-at-home moment.",
      body: [
        "Fold Theory's official archive identifies this as a custom pasta-kit box project printed and produced for Cecilia Pizzeria, Delhi.",
        "The boxes combine a cream field, vivid blue edges, hand-drawn food imagery, and conversational copy to give a practical corrugated format a generous sense of occasion.",
      ],
    },
    challenge: {
      heading: "Make utility feel like an invitation.",
      body: [
        "The public project view shows a pack that must protect and organise a pasta kit while still feeling expressive enough to begin the dining experience before the box is opened.",
      ],
    },
    approach: {
      heading: "Illustration, instructions, and structure in one voice.",
      body: [
        "The visible system uses multiple box faces as a storytelling surface, balancing product information with playful illustrations and a restrained blue-and-cream palette.",
      ],
    },
    outcome: {
      heading: "A cohesive family of pasta-kit boxes.",
      body: [
        "The approved studio image verifies the produced box family. Client results and production specifications are intentionally omitted until supplied.",
      ],
    },
    blocks: [
      {
        type: "media",
        media: photo(
          "cecilia-detail",
          "/images/projects/cecilia-pasta-kit.jpg",
          "Cecilia packaging details",
          "Illustrated details across the Cecilia Pizzeria pasta-kit packaging",
          "panoramic",
          "paper",
        ),
        caption: "Official Fold Theory studio archive. Cecilia Pizzeria, Delhi.",
        layout: "full",
      },
      {
        type: "palette",
        heading: "Visible colour language",
        description: "An editorial sampling from the supplied photograph, not a production specification.",
        colors: [
          { name: "Pasta blue", hex: "#33467B" },
          { name: "Warm cream", hex: "#E9DDC6" },
          { name: "Tomato", hex: "#B34C32" },
          { name: "Studio ivory", hex: "#FAF8F2" },
        ],
      },
      {
        type: "applications",
        heading: "Verified application",
        description: "Only touchpoints visible in the official post are listed.",
        items: ["Corrugated pasta-kit boxes", "Printed side panels", "Illustrated lid graphics"],
      },
    ],
  },
  {
    slug: "soda-shop",
    number: "02",
    title: "Soda Shop",
    isPlaceholder: false,
    category: "Glass bottle printing",
    industry: "Hospitality",
    description:
      "Logo printing on glass bottles supplied for Soda Shop in Hauz Khas.",
    statement: "A simple glass bottle turned into a recognisable table signature.",
    services: ["Logo printing", "Glass bottles", "Production"],
    cover: photo(
      "soda-shop-cover",
      "/images/projects/soda-shop-bottle.jpg",
      "Soda Shop branded bottle",
      "Orange soda in a glass bottle printed with the red Soda Shop wordmark",
      "portrait",
      "blush",
    ),
    cardLayout: "portrait",
    placeholderNotice: awaitingDetails,
    sourceUrl: "https://www.instagram.com/p/DauQHuykpV4/",
    overview: {
      heading: "Brand presence built into the serve.",
      body: [
        "Fold Theory's public archive identifies this as logo printing on glass bottles supplied for Soda Shop, Hauz Khas.",
        "The red wordmark sits directly on the clear bottle, letting the drink colour become part of the visual identity at the table.",
      ],
    },
    challenge: {
      heading: "Create recognition without adding another label.",
      body: [
        "The visible solution keeps the bottle clean and reusable-looking while giving the hospitality brand a strong, camera-ready presence.",
      ],
    },
    approach: {
      heading: "One mark, placed with confidence.",
      body: [
        "Direct logo printing maintains the clarity of the glass form and creates strong contrast against the bright drink inside.",
      ],
    },
    outcome: {
      heading: "A branded object made for the table.",
      body: [
        "The finished bottle is verified in Fold Theory's official post. Quantities, process specifications, and commercial results are not publicly provided.",
      ],
    },
    blocks: [
      {
        type: "statement",
        eyebrow: "Visible design principle",
        quote: "Let the product bring the colour; let the mark bring recognition.",
        note: "Editorial observation, not a client quotation.",
      },
      {
        type: "media",
        media: photo(
          "soda-shop-serve",
          "/images/projects/soda-shop-bottle.jpg",
          "Soda Shop bottle in context",
          "Branded Soda Shop glass bottle presented alongside food",
          "panoramic",
          "blush",
        ),
        caption: "Official Fold Theory studio archive. Soda Shop, Hauz Khas.",
        layout: "full",
      },
      {
        type: "applications",
        heading: "Verified application",
        description: "Based only on the supplied official project image and caption.",
        items: ["Printed glass bottle", "Hospitality table presentation"],
      },
    ],
  },
  {
    slug: "bombaa",
    number: "03",
    title: "Bombaa",
    isPlaceholder: false,
    category: "Printed collateral",
    industry: "Hospitality",
    description:
      "Custom coasters and printed butter paper designed to make food presentation feel complete.",
    statement: "The brand continues all the way to the table.",
    services: ["Custom coasters", "Butter paper", "Print production"],
    cover: photo(
      "bombaa-cover",
      "/images/projects/bombaa-print.jpg",
      "Bombaa table presentation",
      "Pizza served on Bombaa printed butter paper beside colourful custom coasters",
      "panoramic",
      "espresso",
    ),
    cardLayout: "full",
    placeholderNotice: awaitingDetails,
    sourceUrl: "https://www.instagram.com/p/DXyEDpBD5I-/",
    overview: {
      heading: "Printed details that frame the food.",
      body: [
        "Fold Theory's official archive identifies custom coasters and butter paper created for Bombaa.",
        "The repeated wordmark on the food paper builds consistency, while colourful illustrated coasters add a lively, collectable detail to the table.",
      ],
    },
    challenge: {
      heading: "Make service materials feel intentional.",
      body: [
        "Small-format hospitality print has to work hard: protect surfaces, support service, and reinforce the identity without competing with the food.",
      ],
    },
    approach: {
      heading: "Repetition for recognition, illustration for warmth.",
      body: [
        "The visible system pairs a quiet repeating mark with more expressive circular coasters, giving each element a distinct role.",
      ],
    },
    outcome: {
      heading: "A more complete tabletop experience.",
      body: [
        "The finished print applications are verified in the studio archive. Substrate, run size, and performance details remain to be confirmed.",
      ],
    },
    blocks: [
      {
        type: "media",
        media: photo(
          "bombaa-table",
          "/images/projects/bombaa-print.jpg",
          "Bombaa print applications",
          "Bombaa butter paper and illustrated coasters used in a restaurant table setting",
          "panoramic",
          "espresso",
        ),
        caption: "Official Fold Theory studio archive. Printed collateral for Bombaa.",
        layout: "full",
      },
      {
        type: "applications",
        heading: "Verified applications",
        description: "Touchpoints named by Fold Theory in the official post.",
        items: ["Custom coasters", "Printed butter paper", "Table presentation"],
      },
    ],
  },
  {
    slug: "khoya",
    number: "04",
    title: "Khoya",
    isPlaceholder: false,
    category: "Gifting & merchandise",
    industry: "Food & gifting",
    description:
      "Printed presentation boxes and custom mug production for a warm, gift-ready brand experience.",
    statement: "Presentation designed to carry warmth beyond the product.",
    services: ["Presentation packaging", "Custom printing", "Merchandise"],
    cover: photo(
      "khoya-cover",
      "/images/projects/production-rigid-boxes.jpg",
      "Khoya presentation boxes",
      "Pink radial and brown Khoya presentation boxes displayed on a worktable",
      "landscape",
      "burgundy",
    ),
    cardLayout: "offset",
    placeholderNotice: awaitingDetails,
    sourceUrl: "https://www.instagram.com/p/DXgiOlYEhha/",
    overview: {
      heading: "A family of tactile brand objects.",
      body: [
        "Fold Theory's public archive includes Khoya-branded presentation boxes and confirms custom mug printing for Khoya alongside Secret Ingredient.",
        "Together, the visible pieces show how colour, print, and presentation can extend one brand across gifting and everyday use.",
      ],
    },
    challenge: {
      heading: "Carry the identity across very different forms.",
      body: [
        "Rigid boxes and ceramic mugs require different production methods, yet the final objects still need to feel part of one considered world.",
      ],
    },
    approach: {
      heading: "Let each object keep its character.",
      body: [
        "The visible archive uses the Khoya name consistently while allowing the box pattern, ribbon, and circular mug motif to respond to their individual formats.",
      ],
    },
    outcome: {
      heading: "A gift-ready collection of branded touchpoints.",
      body: [
        "The produced objects are visible in Fold Theory's official feed. Further specifications, dates, and client outcomes are intentionally not inferred.",
      ],
    },
    blocks: [
      {
        type: "media-pair",
        media: [
          photo(
            "khoya-boxes",
            "/images/projects/production-rigid-boxes.jpg",
            "Khoya presentation boxes",
            "Khoya presentation packaging shown on a production worktable",
            "square",
            "burgundy",
          ),
          photo(
            "khoya-mugs",
            "/images/projects/secret-ingredient-khoya-mugs.jpg",
            "Khoya and Secret Ingredient mugs",
            "Custom printed Khoya and Secret Ingredient ceramic mugs",
            "square",
            "paper",
          ),
        ],
        caption: "Official Fold Theory archive: Khoya packaging and custom mug printing.",
        layout: "balanced",
      },
      {
        type: "palette",
        heading: "Visible material palette",
        description: "An editorial sampling from the official images, not a production specification.",
        colors: [
          { name: "Khoya red", hex: "#B7354A" },
          { name: "Cocoa", hex: "#4D332D" },
          { name: "Warm white", hex: "#F4EFE5" },
          { name: "Soft gold", hex: "#B69856" },
        ],
      },
      {
        type: "applications",
        heading: "Verified applications",
        description: "Objects visible or named in Fold Theory's public archive.",
        items: ["Presentation boxes", "Printed ribbon", "Custom ceramic mugs"],
      },
    ],
  },
] as const satisfies readonly Project[];

export type ProjectSlug = (typeof projects)[number]["slug"];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getNextProject(slug: string): Project {
  const currentIndex = projects.findIndex((project) => project.slug === slug);
  return projects[currentIndex < 0 ? 0 : (currentIndex + 1) % projects.length];
}

export function getProjectYearLabel(project: Project): string {
  return project.year ?? "Studio archive";
}
