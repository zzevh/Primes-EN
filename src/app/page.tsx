import Hero from '@/components/Hero';
import HowWeWork from '@/components/HowWeWork';
import Services from '@/components/Services';
import Benefits from '@/components/Benefits';
import FAQ from '@/components/FAQ';

function Home() {
  return (
    <main className="min-h-screen bg-black">
      <Hero />
      <HowWeWork />
      <Services />
      <Benefits />
      <FAQ />
    </main>
  );
}

export default Home;
