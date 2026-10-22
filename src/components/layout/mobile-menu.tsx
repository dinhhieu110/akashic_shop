"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { ArrowRight, Menu, X } from "lucide-react";

import type { NavLink } from "@/lib/navigation";

export function MobileMenu({ links }: { links: NavLink[] }) {
  const [open, setOpen] = useState(false);
  // The drawer is portalled to <body> so the header's backdrop-filter and
  // z-index don't trap it. It mounts on first open (server HTML stays
  // identical) and stays mounted so the close transition can play.
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        className="-ml-2 grid size-10 place-items-center rounded-full hover:bg-surface lg:hidden"
        aria-label="Open menu"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => {
          setMounted(true);
          setOpen(true);
        }}
      >
        <Menu aria-hidden className="size-5.5" />
      </button>

      {mounted &&
        createPortal(
          <div
            className={`fixed inset-0 z-60 lg:hidden ${open ? "" : "pointer-events-none"}`}
            aria-hidden={!open}
          >
            <div
              className={`absolute inset-0 bg-night/50 transition-opacity duration-300 starting:opacity-0 ${open ? "opacity-100" : "opacity-0"}`}
              onClick={() => setOpen(false)}
            />
            <nav
              id="mobile-menu"
              aria-label="Mobile"
              inert={!open}
              className={`absolute inset-y-0 left-0 flex w-[min(22rem,86vw)] flex-col bg-canvas shadow-raised transition-transform duration-300 ease-out-soft starting:-translate-x-full ${open ? "translate-x-0" : "-translate-x-full"}`}
            >
              <div className="flex items-center justify-between border-b border-line px-5 py-4">
                <span className="eyebrow">Menu</span>
                <button
                  type="button"
                  className="icon-btn size-10 shadow-none"
                  aria-label="Close menu"
                  onClick={() => setOpen(false)}
                >
                  <X aria-hidden />
                </button>
              </div>

              <ul className="flex-1 overflow-y-auto px-5 py-3">
                {links.map((link) => (
                  <li key={link.href} className="border-b border-line">
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-between py-4 font-display text-lg font-semibold uppercase tracking-display"
                    >
                      {link.label}
                      <ArrowRight aria-hidden className="size-4.5 text-muted" />
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="stack border-t border-line p-5 [--stack:0.75rem]">
                <Link href="/account" className="btn btn-dark btn-block">
                  Sign in
                </Link>
                <Link href="/help" className="btn btn-soft btn-block">
                  Help & support
                </Link>
              </div>
            </nav>
          </div>,
          document.body,
        )}
    </>
  );
}
