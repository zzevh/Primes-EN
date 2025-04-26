import Hero from '@/components/Hero';
import HowWeWork from '@/components/HowWeWork';
import Services from '@/components/Services';
import Benefits from '@/components/Benefits';
import { HotOffers } from '@/components/HotOffers';
import FAQ from '@/components/FAQ';

function Home() {
  return (
    <main className="min-h-screen bg-black">
      <Hero />
      <HowWeWork />
      <Services />
      <Benefits />
      <HotOffers />
      <FAQ />
    </main>
  );
}

export default Home;
