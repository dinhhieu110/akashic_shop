import Link from "next/link";

export function Logo({ inverted = false }: { inverted?: boolean }) {
  return (
    <Link
      href="/"
      className="inline-flex items-center gap-2"
      aria-label="Akashic Shop home"
    >
      <span
        aria-hidden
        className="grid size-8 place-items-center rounded-full bg-brand shadow-[inset_-4px_-4px_0_rgb(184_132_0/0.35)]"
      >
        <span className="size-2.5 rounded-full bg-ink" />
      </span>
      <span
        className={`font-display text-[1.375rem] leading-none font-bold tracking-tight ${inverted ? "text-white" : "text-ink"}`}
      >
        akashic
      </span>
    </Link>
  );
}
