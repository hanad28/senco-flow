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
    <>
      <div className="block" id="main">
        <div className="min-h-screen flex relative flex-col justify-start items-stretch content-start overflow-x-clip">
          <Navbar />
          <HeroSection />
          <LandingBody />
        </div>
      </div>
    </>
  );
}
