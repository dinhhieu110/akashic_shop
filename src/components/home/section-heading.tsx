type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  id?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  id,
}: SectionHeadingProps) {
  return (
    <div
      className={
        align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"
      }
    >
      <span className="eyebrow">{eyebrow}</span>
      <h2 id={id} className="heading-2 mt-2">
        {title}
      </h2>
      {description && <p className="lede mt-3">{description}</p>}
    </div>
  );
}
