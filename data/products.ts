export type Product = {
  id: string;
  title: string;
  image: `/images/${string}`;
};

export const products = [
  {
    id: "corrugated-boxes",
    title: "Corrugated Boxes",
    image: "/images/productlist/corrugated-boxes.jpeg",
  },
  {
    id: "hardboard-boxes",
    title: "Hardboard Boxes",
    image: "/images/productlist/hardboard-boxes.jpeg",
  },
  {
    id: "paper-bags",
    title: "Paper Bags",
    image: "/images/productlist/paper-bags.jpeg",
  },
  {
    id: "coasters",
    title: "Coasters",
    image: "/images/productlist/coasters.jpeg",
  },
  {
    id: "cafe-packaging",
    title: "Café Packaging",
    image: "/images/productlist/cafe-packaging.jpeg",
  },
  {
    id: "gift-boxes",
    title: "Gift Boxes",
    image: "/images/productlist/gift-boxes.jpeg",
  },
  {
    id: "paper-cup-holders",
    title: "Paper Cup Holders",
    image: "/images/productlist/paper-cup-holders.jpeg",
  },
] as const satisfies readonly Product[];

export type ProductId = (typeof products)[number]["id"];
