import { Star } from "lucide-react";

type StarsProps = {
  rating: number;
  size?: number;
  className?: string;
};

export function Stars({ rating, size = 14, className = "" }: StarsProps) {
  const rounded = Math.round(rating);

  return (
    <span
      className={`inline-flex items-center gap-0.5 ${className}`}
      role="img"
      aria-label={`Rated ${rating} out of 5`}
    >
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          aria-hidden
          width={size}
          height={size}
          strokeWidth={0}
          className={i < rounded ? "fill-brand-600" : "fill-line-strong"}
        />
      ))}
    </span>
  );
}
