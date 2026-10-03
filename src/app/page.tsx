import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { SiteFooter } from "@/components/site-footer";

export default function Home() {
  return (
    <div className="flex min-h-dvh flex-col lg:h-dvh lg:max-h-dvh lg:overflow-hidden">
      <Header />
      <main className="flex min-h-0 flex-1 flex-col">
        <Hero />
      </main>
      <SiteFooter />
    </div>
  );
}
