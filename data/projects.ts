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
  src: "/images/projects/soda-shop-bottle.png",
  alt: "Glass Soda Shop bottle filled with orange soda on a wooden table",
  width: 820,
  height: 1024,
};

const bombaaImage: ProjectImage = {
  src: "/images/projects/bombaa-print.jpg",
  alt: "Bombaa food presentation with printed butter paper and illustrated coasters",
  width: 1440,
  height: 1440,
};

const khoyaBoxesImage: ProjectImage = {
  src: "/images/projects/khoya-presentation-boxes.png",
  alt: "Pink sunburst and brown Khoya Skin Perfume presentation boxes on a production worktable",
  width: 1024,
  height: 768,
};

const coffeeCarriersImage: ProjectImage = {
  src: "/images/projects/coffee-carriers.png",
  alt: "Sustainable cardboard coffee cup carriers arranged on a stone surface",
  width: 824,
  height: 1024,
};

const khoyaGiftingImage: ProjectImage = {
  src: "/images/projects/khoya-gifting.png",
  alt: "White Khoya gift bags with gold rope handles in a pastel boutique setting",
  width: 824,
  height: 1024,
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
  src: "/images/projects/green-gift-boxes.png",
  alt: "Deep green Naanche rigid presentation box with gold foil logo on travertine",
  width: 1024,
  height: 1024,
};

const headsUpForTailsImage: ProjectImage = {
  src: "/images/projects/heads-up-for-tails-bag.png",
  alt: "Orange Heads Up For Tails branded retail shopping bag with black rope handles",
  width: 768,
  height: 1024,
};

const radissonBluImage: ProjectImage = {
  src: "/images/projects/radisson-blu-packaging.png",
  alt: "Yellow and brown Radisson BLU custom food packaging with illustrated pattern and carry handle",
  width: 819,
  height: 1024,
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
    id: "coffee-carriers",
    number: "10",
    title: "Coffee Carriers",
    category: "Sustainable Packaging",
    industry: "Food & Beverage",
    summary:
      "Thoughtfully engineered beverage carriers that combine functionality with clean, contemporary design.",
    overview:
      "A sustainable beverage carrier system designed to feel practical in hand while reading as clean, contemporary packaging.",
    challenge:
      "Create carriers that hold securely without adding visual clutter or excess material.",
    solution:
      "Structural die-cuts, kraft and white paper finishes, and restrained forms keep the carriers useful and refined.",
    outcome:
      "A produced family of coffee carriers suited to everyday takeaway and brand presentation.",
    services: ["Sustainable Packaging", "Structural Design", "Production"],
    packagingDetails: ["Cardboard carriers", "Die-cut handles", "Beverage takeaway formats"],
    coverImage: coffeeCarriersImage,
    detailImages: [coffeeCarriersImage],
    layout: "portrait",
    selected: true,
    featured: false,
  },
  {
    id: "khoya-gifting",
    number: "11",
    title: "Khoya Gifting",
    category: "Luxury Packaging",
    industry: "Food & Gifting",
    summary:
      "Elegant paper bags finished with premium detailing to elevate gifting and luxury retail experiences.",
    overview:
      "A luxury paper bag application for Khoya, finished to feel gift-ready across boutique and retail moments.",
    challenge:
      "Elevate a practical carry format into a premium gifting object without losing everyday usability.",
    solution:
      "Crisp white paper, gold rope handles and refined brand marking create a polished retail presence.",
    outcome:
      "A produced gifting bag that extends Khoya's luxury packaging language into the carry experience.",
    services: ["Luxury Packaging", "Retail Packaging", "Production"],
    packagingDetails: ["Premium paper bags", "Gold rope handles", "Foil brand detailing"],
    coverImage: khoyaGiftingImage,
    detailImages: [khoyaGiftingImage],
    layout: "portrait",
    selected: true,
    featured: false,
  },
  {
    id: "ice-pop",
    number: "03",
    title: "Ice Pop",
    category: "Food Packaging",
    industry: "Food & Beverage",
    summary: "Colour-forward retail packaging designed to stand out on the shelf while preserving product freshness and strengthening brand recognition.",
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
    layout: "split",
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
    layout: "fullBleed",
    selected: true,
    featured: false,
  },
  {
    id: "heads-up-for-tails",
    number: "08",
    title: "Heads Up For Tails",
    category: "Retail Packaging",
    industry: "Retail",
    summary:
      "Premium branded carry bag production with bold colour, refined print detailing, and a strong retail presence.",
    overview:
      "A branded retail carry bag produced for Heads Up For Tails, built around bold colour and clear print detailing for a strong shelf-to-street presence.",
    challenge:
      "Deliver a high-impact retail bag that feels premium while remaining practical for everyday brand use.",
    solution:
      "Saturated colour, confident brand placement and clean print finishing create a bag that reads clearly from a distance and holds up in hand.",
    outcome:
      "A produced retail carry bag that reinforces brand recognition across stores and customer journeys.",
    services: ["Retail Packaging", "Print", "Production"],
    packagingDetails: ["Branded paper carry bag", "Bold colour field", "Refined print detailing"],
    coverImage: headsUpForTailsImage,
    detailImages: [headsUpForTailsImage],
    layout: "feature",
    selected: true,
    featured: false,
  },
  {
    id: "radisson-blu",
    number: "09",
    title: "Radisson BLU",
    category: "Hospitality Packaging",
    industry: "Hospitality",
    summary:
      "Custom food packaging created for a refined hospitality experience, combining practical structure with premium presentation.",
    overview:
      "Custom hospitality food packaging for Radisson BLU, designed to feel considered at the table while remaining practical in service.",
    challenge:
      "Create a distinctive hospitality format that protects food and still feels premium in presentation.",
    solution:
      "A structured carry format, contrasting colour panels and illustrated detailing give the pack presence without sacrificing usability.",
    outcome:
      "A produced hospitality packaging piece that supports a refined in-hotel food experience.",
    services: ["Hospitality Packaging", "Print", "Production"],
    packagingDetails: ["Custom structured pack", "Illustrated panels", "Premium brand presentation"],
    coverImage: radissonBluImage,
    detailImages: [radissonBluImage],
    layout: "portrait",
    selected: true,
    featured: false,
  },
] as const satisfies readonly Project[];

export type ProjectId = (typeof projects)[number]["id"];

/** IDs rendered together in the Khoya three-column Selected Work row. */
export const khoyaRowProjectIds = ["khoya", "coffee-carriers", "khoya-gifting"] as const;

const selectedProjectOrder = [
  "cecilia-pizzeria",
  "soda-shop",
  "ice-pop",
  "bombaa",
  "khoya",
  "coffee-carriers",
  "khoya-gifting",
  "secret-ingredient-khoya",
  "presentation-gifting",
  "heads-up-for-tails",
  "radisson-blu",
] as const;

export const selectedProjects = selectedProjectOrder
  .map((id) => projects.find((project) => project.id === id))
  .filter(
    (project): project is NonNullable<typeof project> =>
      project !== undefined && project.selected
  );
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
