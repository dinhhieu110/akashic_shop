import { Plus } from "lucide-react";

type DisclosureProps = {
  title: string;
  /** Disclosures sharing a name act as an accordion (one open at a time). */
  name?: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
};

export function Disclosure({ title, name, defaultOpen, children }: DisclosureProps) {
  return (
    <details name={name} open={defaultOpen} className="group border-b border-line">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 font-bold transition-colors hover:text-accent [&::-webkit-details-marker]:hidden">
        {title}
        <span className="grid size-7 shrink-0 place-items-center rounded-full bg-surface transition-[transform,background-color] duration-200 group-open:rotate-45 group-open:bg-brand">
          <Plus aria-hidden className="size-4" />
        </span>
      </summary>
      <div className="pb-5 text-sm leading-relaxed text-ink/80">{children}</div>
    </details>
  );
}
