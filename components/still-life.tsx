import Image from "next/image";

type StillLifeProps = {
  variant?: "hero" | "coffee" | "gifting" | "bottle" | "print" | "studio";
  className?: string;
  label?: string;
  priority?: boolean;
  image?: string | null;
  sizes?: string;
};

const sceneCopy: Record<NonNullable<StillLifeProps["variant"]>, string> = {
  hero: "Cecilia Pizzeria custom pasta-kit packaging by Fold Theory",
  coffee: "Premium takeaway coffee carrier packaging by Fold Theory",
  gifting: "Khoya presentation boxes produced by Fold Theory",
  bottle: "Soda Shop branded glass bottle produced by Fold Theory",
  print: "Bombaa printed butter paper and coasters by Fold Theory",
  studio: "Khoya rigid-box production study by Fold Theory",
};

const sceneImage: Record<NonNullable<StillLifeProps["variant"]>, string> = {
  hero: "/images/projects/cecilia-pasta-kit.jpg",
  coffee: "/images/projects/takeaway-carrier.jpg",
  gifting: "/images/projects/production-rigid-boxes.jpg",
  bottle: "/images/projects/soda-shop-bottle.jpg",
  print: "/images/projects/bombaa-print.jpg",
  studio: "/images/projects/production-rigid-boxes.jpg",
};

export function StillLife({
  variant = "hero",
  className = "",
  label,
  priority = false,
  image,
  sizes = "(max-width: 720px) 100vw, 55vw",
}: StillLifeProps) {
  const source = image === null ? null : (image ?? sceneImage[variant]);

  if (source) {
    return (
      <div className={`still-life still-life--photo ${className}`}>
        <Image
          src={source}
          alt={label ?? sceneCopy[variant]}
          fill
          priority={priority}
          sizes={sizes}
          className="still-life__photo"
          unoptimized
        />
        <span className="still-life__source">Fold Theory studio archive</span>
      </div>
    );
  }

  return (
    <div
      className={`still-life still-life--${variant} ${className}`}
      role="img"
      aria-label={label ?? sceneCopy[variant]}
    >
      <span className="still-life__surface" aria-hidden="true" />
      <span className="still-life__shadow still-life__shadow--one" aria-hidden="true" />
      <span className="still-life__shadow still-life__shadow--two" aria-hidden="true" />
      <span className="still-life__object still-life__box" aria-hidden="true">
        <span>FOLD</span>
        <i>THEORY</i>
      </span>
      <span className="still-life__object still-life__card" aria-hidden="true">
        <i>considered</i>
        <span>FORM / 01</span>
      </span>
      <span className="still-life__object still-life__cylinder" aria-hidden="true">
        <i />
        <span>FT</span>
      </span>
      <span className="still-life__object still-life__bottle" aria-hidden="true">
        <i />
        <b>01</b>
      </span>
      <span className="still-life__object still-life__ribbon" aria-hidden="true" />
      <span className="still-life__index" aria-hidden="true">
        {variant === "hero" ? "A quiet study in form" : "Portfolio study"}
      </span>
      <span className="still-life__notice">
        <b>Photography placeholder</b>
        <i>Replace with supplied portfolio image</i>
      </span>
    </div>
  );
}
