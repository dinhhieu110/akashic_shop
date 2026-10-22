import type { Metadata, Viewport } from "next";
import { Baloo_2, DM_Sans } from "next/font/google";
import { AnnouncementBar } from "@/components/layout/announcement-bar";
import { MobileTabBar } from "@/components/layout/mobile-tab-bar";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

import "./globals.css";

const displayFont = Baloo_2({
  variable: "--font-baloo",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const bodyFont = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Akashic Shop | Everyday goods, thoughtfully made",
  description:
    "Apparel, audio, home goods and carry essentials designed in-house and made in small batches.",
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${displayFont.variable} ${bodyFont.variable} h-full`}
    >
      <body className="pb-bottom-bar flex min-h-full flex-col has-data-buy-bar:pb-[calc(8.5rem+env(safe-area-inset-bottom))] lg:pb-0 lg:has-data-buy-bar:pb-0">
        <a
          href="#main"
          className="btn btn-dark sr-only fixed top-3 left-3 z-70 focus:not-sr-only focus:fixed"
        >
          Skip to content
        </a>
        <AnnouncementBar />
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <MobileTabBar />
      </body>
    </html>
  );
}
