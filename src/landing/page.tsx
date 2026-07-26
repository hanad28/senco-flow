import Navbar from "./sections/navbar";
import HeroSection from "./sections/hero-section";
import FeatureGridSection from "./sections/feature-grid-section";
import TellUnisenOnceSection from "./sections/tell-unisen-once-section";
import ProductGridSection from "./sections/product-grid-section";
import QuestionsAnsweredSection from "./sections/questions-answered-section";
import MeetYourAiSection from "./sections/meet-your-ai-section";
import SocialMediaYourSection from "./sections/social-media-your-section";
import Icon5 from "./svgs/svg-icon5";
import Icon6 from "./svgs/svg-icon6";
import Icon7 from "./svgs/svg-icon7";
import Icon8 from "./svgs/svg-icon8";
import Icon9 from "./svgs/svg-icon9";
import Icon10 from "./svgs/svg-icon10";
import Icon11 from "./svgs/svg-icon11";
import Icon12 from "./svgs/svg-icon12";
import Icon13 from "./svgs/svg-icon13";

export default function Page() {
  return (
    <>
      <div className="block" id="main">
        <div className="min-h-screen flex relative flex-col justify-start items-stretch content-start overflow-x-clip bg-background">
          <Navbar />
          <div className="w-px h-px block relative shrink-0 order-[-999]" name="Structured Data" />
          <div className="relative flex min-w-0 w-full flex-col justify-start items-stretch content-start">
            <HeroSection />
            <FeatureGridSection />
            <TellUnisenOnceSection />
            <ProductGridSection />
            <QuestionsAnsweredSection />
            <MeetYourAiSection />
          </div>
          <SocialMediaYourSection />
        </div>
        <div className="block" id="template-overlay" />
      </div>
      {" "}
      <div className="w-0 h-0 block absolute top-200 left-0 z-0 overflow-hidden" aria-hidden="true" id="svg-templates">
        <Icon5 />
        {" "}
        <Icon6 />
        {" "}
        <Icon7 />
        {" "}
        <Icon8 />
        {" "}
        <Icon9 />
        {" "}
        <Icon10 />
        <Icon11 />
        {" "}
        <Icon12 />
        {" "}
        <Icon13 />
        {" "}
      </div>
    </>
  );
}
