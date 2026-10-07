import { Header } from "@/components/header";
import { OppositeStory } from "@/components/opposite-story";
import { SiteFooter } from "@/components/site-footer";

export default function Home() {
  return (
    <div className="flex min-h-dvh flex-col">
      <Header />
      <main className="flex-1">
        <OppositeStory />
      </main>
      <SiteFooter />
    </div>
  );
}
