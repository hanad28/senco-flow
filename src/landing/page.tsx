import Navbar from "./sections/navbar";
import HeroSection from "./sections/hero-section";
import NexuraBody from "./nexura/nexura-body";
import "./nexura/nexura-body.css";

/**
 * Landing: Unisen hero + nav, then full Nexura body sections
 * (logo cloud → features → integrations → solutions → testimonials →
 * pricing → CTA → footer) with Unisen/SENCO copy.
 */
export default function Page() {
  return (
    <>
      <div className="block" id="main">
        <div className="min-h-screen flex relative flex-col justify-start items-stretch content-start overflow-x-clip bg-background">
          <Navbar />
          <HeroSection />
          <NexuraBody />
        </div>
      </div>
    </>
  );
}
