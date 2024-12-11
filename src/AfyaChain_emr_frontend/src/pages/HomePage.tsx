import { Hero } from '../components/Hero';
import { Features } from '../components/Features';
import { Benefits } from '../components/Benefits';
import { CTA } from '../components/CTA';

export function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <Features />
      <Benefits />
      <CTA />
    </div>
  );
}