import Navbar from "./sections/navbar";
import HeroSection from "./sections/hero-section";
import LandingBody from "./landing-body";
import "./landing-body.css";

/**
 * Landing: Unisen hero + nav, then body
 * (promise → product → outcomes → school flow → parties →
 * photo CTA → footer).
 */
export default function Page() {
  return (
    <div className="flex flex-1 flex-col" id="main">
      <div className="relative flex min-h-0 flex-1 flex-col items-stretch justify-start content-start overflow-x-clip">
        <Navbar />
        <HeroSection />
        <LandingBody />
      </div>
    </div>
  );
}
