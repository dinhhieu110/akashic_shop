import { BestSellers } from "@/components/home/best-sellers";
import { CampaignBanner } from "@/components/home/campaign-banner";
import { CollectionTiles } from "@/components/home/collection-tiles";
import { EditorialStory } from "@/components/home/editorial-story";
import { Hero } from "@/components/home/hero";
import { NewArrivals } from "@/components/home/new-arrivals";
import { Newsletter } from "@/components/home/newsletter";
import { Perks } from "@/components/home/perks";
import { Reviews } from "@/components/home/reviews";

export default function Home() {
  return (
    <>
      <Hero />
      <Perks />
      <CollectionTiles />
      <BestSellers />
      <EditorialStory />
      <NewArrivals />
      <CampaignBanner />
      <Reviews />
      <Newsletter />
    </>
  );
}
