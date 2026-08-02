export type ProjectImage = {
  src: `/images/${string}`;
  alt: string;
  width: number;
  height: number;
};

export type Project = {
  id: string;
  number: string;
  title: string;
  category: string;
  industry: string;
  location?: string;
  year?: string;
  summary: string;
  overview: string;
  challenge: string;
  solution: string;
  outcome: string;
  services: readonly string[];
  packagingDetails: readonly string[];
  coverImage: ProjectImage;
  detailImages: readonly ProjectImage[];
  layout: "feature" | "portrait" | "split" | "fullBleed" | "layered" | "closing";
  selected: boolean;
  featured: boolean;
  sourceUrl?: `https://${string}`;
};

const ceciliaImage: ProjectImage = {
  src: "/images/projects/cecilia-pasta-kit.jpg",
  alt: "Blue and cream illustrated pasta-kit boxes produced for Cecilia Pizzeria",
  width: 1440,
  height: 1440,
};

const sodaShopImage: ProjectImage = {
  src: "/images/projects/soda-shop-bottle.jpg",
  alt: "Glass Soda Shop bottle printed with a red wordmark",
  width: 743,
  height: 929,
};

const bombaaImage: ProjectImage = {
  src: "/images/projects/bombaa-print.jpg",
  alt: "Bombaa food presentation with printed butter paper and illustrated coasters",
  width: 1440,
  height: 1440,
};

const khoyaBoxesImage: ProjectImage = {
  src: "/images/projects/production-rigid-boxes.jpg",
  alt: "Khoya presentation boxes arranged on a production worktable",
  width: 1440,
  height: 1440,
};

const khoyaMugsImage: ProjectImage = {
  src: "/images/projects/secret-ingredient-khoya-mugs.jpg",
  alt: "Custom-printed ceramic mugs for Secret Ingredient and Khoya",
  width: 1440,
  height: 1440,
};

const icePopImage: ProjectImage = {
  src: "/images/projects/ice-pop-cartons.jpg",
  alt: "Colourful printed Ice Pop cartons from the Fold Theory studio archive",
  width: 749,
  height: 937,
};

const presentationGiftingImage: ProjectImage = {
  src: "/images/projects/green-gift-boxes.jpg",
  alt: "Deep green rigid presentation boxes from the Fold Theory studio archive",
  width: 1440,
  height: 1440,
};

export const projects = [
  {
    id: "cecilia-pizzeria",
    number: "01",
    title: "Cecilia Pizzeria",
    category: "Custom packaging",
    industry: "Food & Beverage",
    location: "Delhi",
    summary: "Custom pasta-kit boxes printed and produced for a playful cook-at-home ritual.",
    overview:
      "A custom packaging system for Cecilia Pizzeria's pasta kits, bringing practical structure and expressive storytelling into one tactile format.",
    challenge:
      "Organise and protect the kit while making the first interaction feel as inviting as the meal itself.",
    solution:
      "Illustration, instructions and conversational copy move across the box faces in a restrained blue-and-cream visual language.",
    outcome:
      "A produced family of illustrated pasta-kit boxes, documented in Fold Theory's official studio archive.",
    services: ["Custom Packaging", "Print", "Production"],
    packagingDetails: ["Corrugated box format", "Illustrated panels", "Printed side details"],
    coverImage: ceciliaImage,
    detailImages: [ceciliaImage],
    layout: "feature",
    selected: true,
    featured: false,
    sourceUrl: "https://www.instagram.com/p/DbUvP9mErpB/",
  },
  {
    id: "soda-shop",
    number: "02",
    title: "Soda Shop",
    category: "Bottle printing",
    industry: "Hospitality",
    location: "Hauz Khas",
    summary: "Direct logo printing turns a simple glass bottle into a recognisable table signature.",
    overview:
      "A focused production project that carries Soda Shop's identity directly onto the glass bottle used at the table.",
    challenge:
      "Create a clear brand presence while preserving the simplicity and transparency of the bottle.",
    solution:
      "A confidently placed red wordmark lets the drink supply the colour and keeps the object visually clean.",
    outcome:
      "A produced branded bottle documented in Fold Theory's official studio archive.",
    services: ["Logo Printing", "Glass Bottles", "Production"],
    packagingDetails: ["Direct glass printing", "Single-colour wordmark", "Hospitality application"],
    coverImage: sodaShopImage,
    detailImages: [sodaShopImage],
    layout: "portrait",
    selected: true,
    featured: false,
    sourceUrl: "https://www.instagram.com/p/DauQHuykpV4/",
  },
  {
    id: "bombaa",
    number: "04",
    title: "Bombaa",
    category: "Printed collateral",
    industry: "Hospitality",
    summary: "Custom coasters and printed butter paper complete the brand experience at the table.",
    overview:
      "A set of practical printed details that carries Bombaa's visual identity through the food presentation.",
    challenge:
      "Make everyday service materials feel considered without distracting from the food.",
    solution:
      "A repeating wordmark builds recognition while colourful illustrated coasters bring warmth and character.",
    outcome:
      "A cohesive set of table applications documented in Fold Theory's official studio archive.",
    services: ["Print & Collateral", "Custom Coasters", "Production"],
    packagingDetails: ["Printed butter paper", "Illustrated coasters", "Table presentation"],
    coverImage: bombaaImage,
    detailImages: [bombaaImage],
    layout: "fullBleed",
    selected: true,
    featured: false,
    sourceUrl: "https://www.instagram.com/p/DXyEDpBD5I-/",
  },
  {
    id: "khoya",
    number: "05",
    title: "Khoya",
    category: "Gifting & merchandise",
    industry: "Food & Gifting",
    summary: "Presentation boxes and custom-printed objects composed for a warm, gift-ready experience.",
    overview:
      "A family of tactile brand objects that carries Khoya's identity from presentation packaging into merchandise.",
    challenge:
      "Bring different forms and production methods together in one recognisable, gift-ready visual world.",
    solution:
      "Distinctive colour, pattern and consistent brand placement connect rigid boxes, ribbon and printed ceramics.",
    outcome:
      "Produced presentation boxes and custom-printed objects documented in Fold Theory's official studio archive.",
    services: ["Presentation Packaging", "Custom Print", "Merchandise"],
    packagingDetails: ["Rigid presentation boxes", "Printed ribbon", "Custom ceramic mugs"],
    coverImage: khoyaBoxesImage,
    detailImages: [khoyaBoxesImage, khoyaMugsImage],
    layout: "layered",
    selected: true,
    featured: true,
    sourceUrl: "https://www.instagram.com/p/DXgiOlYEhha/",
  },
  {
    id: "ice-pop",
    number: "03",
    title: "Ice Pop",
    category: "Carton packaging",
    industry: "Food & Beverage",
    summary: "Colour-forward cartons with a tactile, shelf-ready presentation.",
    overview:
      "A printed carton application from Fold Theory's official studio archive for Ice Pop.",
    challenge:
      "Create a compact packaging format with enough visual presence to feel distinctive at first glance.",
    solution:
      "Strong colour, clear typography and tactile print detail give the cartons an energetic, product-led character.",
    outcome:
      "Produced Ice Pop cartons documented in Fold Theory's official studio archive.",
    services: ["Packaging", "Print", "Production"],
    packagingDetails: ["Printed cartons", "Tactile detailing", "Compact product format"],
    coverImage: icePopImage,
    detailImages: [icePopImage],
    layout: "split",
    selected: true,
    featured: false,
  },
  {
    id: "secret-ingredient-khoya",
    number: "06",
    title: "Secret Ingredient & Khoya",
    category: "Custom merchandise",
    industry: "Food & Gifting",
    summary: "Custom mug printing that brings two food brands into practical, giftable objects.",
    overview:
      "A custom printing application for Secret Ingredient and Khoya, documented in Fold Theory's official studio archive.",
    challenge:
      "Translate each identity onto a compact ceramic surface while keeping the objects clear and useful.",
    solution:
      "Simple, confident graphics respond to the circular mug format and preserve the individual character of each brand.",
    outcome:
      "A produced set of custom-printed ceramic mugs for Secret Ingredient and Khoya.",
    services: ["Custom Printing", "Merchandise", "Production"],
    packagingDetails: ["Ceramic mugs", "Custom surface printing", "Giftable brand objects"],
    coverImage: khoyaMugsImage,
    detailImages: [khoyaMugsImage],
    layout: "closing",
    selected: true,
    featured: false,
  },
  {
    id: "presentation-gifting",
    number: "07",
    title: "Presentation Gifting",
    category: "Rigid packaging",
    industry: "Gifting & Retail",
    summary: "Deep green presentation boxes shaped into a quiet, tactile gifting experience.",
    overview:
      "A restrained presentation packaging study from Fold Theory's studio archive, focused on proportion, material and opening experience.",
    challenge:
      "Create a gift-ready format that feels substantial and premium without relying on decorative excess.",
    solution:
      "A rich green paper wrap, precise rigid construction and understated mark keep attention on touch, weight and reveal.",
    outcome:
      "A refined family of presentation boxes photographed as part of the Fold Theory studio archive.",
    services: ["Presentation Packaging", "Material Direction", "Production"],
    packagingDetails: ["Rigid box construction", "Textured paper wrap", "Foil brand detail"],
    coverImage: presentationGiftingImage,
    detailImages: [presentationGiftingImage],
    layout: "portrait",
    selected: true,
    featured: false,
  },
] as const satisfies readonly Project[];

export type ProjectId = (typeof projects)[number]["id"];

const selectedProjectOrder = [
  "cecilia-pizzeria",
  "soda-shop",
  "ice-pop",
  "bombaa",
  "khoya",
  "secret-ingredient-khoya",
  "presentation-gifting",
] as const;

export const selectedProjects = selectedProjectOrder
  .map((id) => projects.find((project) => project.id === id))
  .filter((project): project is Project => Boolean(project?.selected));
export const featuredProject = projects.find((project) => project.featured) ?? projects[0];

export function getProjectById(id: string): Project | undefined {
  return projects.find((project) => project.id === id);
}

export function getAdjacentProjects(id: string): { previous: Project; next: Project } {
  const currentIndex = projects.findIndex((project) => project.id === id);
  const index = currentIndex < 0 ? 0 : currentIndex;

  return {
    previous: projects[(index - 1 + projects.length) % projects.length],
    next: projects[(index + 1) % projects.length],
  };
}
