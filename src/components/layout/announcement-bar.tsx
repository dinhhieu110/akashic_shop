import { Sparkles } from "lucide-react";

import { announcements } from "@/lib/navigation";

function Track({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {announcements.map((message) => (
        <li
          key={message}
          className="flex items-center gap-3 px-6 text-xs font-semibold tracking-[0.02em] whitespace-nowrap"
        >
          <Sparkles aria-hidden className="size-3.5 text-brand" />
          {message}
        </li>
      ))}
    </ul>
  );
}

export function AnnouncementBar() {
  return (
    <div className="overflow-hidden bg-ink py-2.5 text-white">
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
        <Track />
        <Track hidden />
      </div>
    </div>
  );
}
