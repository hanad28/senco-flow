import DittoMotion from "./ditto/DittoMotion";
import LogoCloudSection from "./sections/logo-cloud-section";
import Icon from "./svgs/svg-icon";
import Tile, { type TileData } from "./components/tile";
import Icon2 from "./svgs/svg-icon2";
import Icon3 from "./svgs/svg-icon3";
import Icon4 from "./svgs/svg-icon4";
import Logo, { type LogoData } from "./components/logo";

import Illustration from "./svgs/svg-illustration";
import Icon9 from "./svgs/svg-icon9";
import Tile2, { type Tile2Data } from "./components/tile2";
import { type MediaTileData } from "./components/media-tile";
import SolutionsStickyNav from "./components/solutions-sticky-nav";
import Icon10 from "./svgs/svg-icon10";
import Illustration2 from "./svgs/svg-illustration2";
import Icon11 from "./svgs/svg-icon11";
import Icon12 from "./svgs/svg-icon12";
import FeatureAccordion from "./components/feature-accordion";
import MediaTileMarquee from "./components/media-tile-marquee";
import ScrollAppear from "./components/scroll-appear";
import ScrollRevealText from "./components/scroll-reveal-text";
import CtaButton from "../components/cta-button";
import FooterSection2 from "../sections/footer-section2";
import { Tile_styles, Logo_styles, Tile2_styles, MediaTile_styles } from "./_styles";

const Tile_data: TileData[] = [
    { href: "/product", description: "Product" },
    { href: "/integration", description: "Integration" }
];
const Logo_data: LogoData[] = [
    { imgSrc: "/assets/nexura/images/f4d443694077.png", width: "303" },
    { imgSrc: "/assets/nexura/images/bf89200758a3.png", width: "218" },
    { imgSrc: "/assets/nexura/images/121c9f218f68.png", width: "276" },
    { imgSrc: "/assets/nexura/images/09555eff81e5.png", width: "246" }
];
const Tile2_data: Tile2Data[] = [
    { description: "1", description2: "Open an EHC consultation or draft-plan case" },
    { description: "2", description2: "Attach advice, views and school evidence" },
    { description: "3", description2: "Draft, check, and submit with the clock in view" }
];
const MediaTile_data: MediaTileData[] = [
    { ariahidden: "true", name: "Banner", name2: "Banner", kind: "icon", icon: <>
              <use href="#3154199424" />
              </>, description: "LA portal", description2: "Consultation open" },
    { ariahidden: "true", kind: "icon", icon: <>
              <use href="#361860326" />
              </>, description: "School advice", description2: "Advice attached today" },
    { ariahidden: "true", kind: "icon", icon: <>
              <use href="#3571911165" />
              </>, description: "Days left", description2: "12 days remaining" },
    { ariahidden: "true", kind: "icon", icon: <>
              <use href="#2758010082" />
              </>, description: "Clock risk", description2: "Due this week" },
    { ariahidden: "true", kind: "icon", icon: <>
              <use href="#1028000027" />
              </>, description: "Case status", description2: "Draft in progress" },
    { ariahidden: "false", name: "Banner", name2: "Banner", kind: "icon", icon: <>
              <use href="#3154199424" />
              </>, description: "LA portal", description2: "Consultation open" },
    { ariahidden: "true", kind: "icon", icon: <>
              <use href="#361860326" />
              </>, description: "School advice", description2: "Advice attached today" },
    { ariahidden: "true", kind: "icon", icon: <>
              <use href="#3571911165" />
              </>, description: "Days left", description2: "12 days remaining" },
    { ariahidden: "true", kind: "icon", icon: <>
              <use href="#2758010082" />
              </>, description: "Clock risk", description2: "Due this week" },
    { ariahidden: "true", kind: "icon", icon: <>
              <use href="#1028000027" />
              </>, description: "Case status", description2: "Draft in progress" },
    { ariahidden: "true", name: "Banner", name2: "Banner", kind: "icon", icon: <>
              <use href="#3154199424" />
              </>, description: "LA portal", description2: "Consultation open" },
    { ariahidden: "true", kind: "icon", icon: <>
              <use href="#361860326" />
              </>, description: "School advice", description2: "Advice attached today" },
    { ariahidden: "true", kind: "icon", icon: <>
              <use href="#3571911165" />
              </>, description: "Days left", description2: "12 days remaining" },
    { ariahidden: "true", kind: "icon", icon: <>
              <use href="#2758010082" />
              </>, description: "Clock risk", description2: "Due this week" },
    { ariahidden: "true", kind: "icon", icon: <>
              <use href="#1028000027" />
              </>, description: "Case status", description2: "Draft in progress" },
    { ariahidden: "true", name: "Banner", name2: "Banner", kind: "icon", icon: <>
              <use href="#3154199424" />
              </>, description: "LA portal", description2: "Consultation open" },
    { ariahidden: "true", icon: <>
              <use href="#361860326" />
              </>, description: "School advice", description2: "Advice attached today" },
    { ariahidden: "true", icon: <>
              <use href="#3571911165" />
              </>, description: "Days left", description2: "12 days remaining" },
    { ariahidden: "true", icon: <>
              <use href="#2758010082" />
              </>, description: "Clock risk", description2: "Due this week" },
    { ariahidden: "true", icon: <>
              <use href="#1028000027" />
              </>, description: "Case status", description2: "Draft in progress" }
];
export default function UnisenBody() {
  return (
    <>
      <div className="block nexura-body w-full" id="nexura-main">
        <div className="min-h-0 flex relative w-full flex-col justify-start items-center content-center overflow-x-clip bg-background">
          <div className="hidden" aria-hidden="true" data-nexura-hidden-nav="true">
            <div className="contents">
              <nav className="h-[4.5625rem] flex relative px-5 justify-center items-center content-center gap-20 bg-background max-lg:pb-3 max-lg:px-1.5 max-lg:flex-col max-lg:justify-start" data-component="nav">
                <div className="w-full max-w-312.5 flex relative py-4 px-16 justify-between items-center content-center grow shrink-0 basis-0 max-lg:px-5 max-lg:grow-[initial] max-lg:basis-[initial]">
                  <div className="basis-0 shrink-0 h-[2.5625rem] flex relative z-1 justify-between items-center content-center grow">
                    <a className="h-7 flex relative justify-center items-center content-center shrink-0 gap-0.5 text-primary cursor-pointer" data-component="link" href="/">
                      <div className="w-7 h-7 block relative shrink-0" aria-hidden="true">
                        <div className="h-full block">
                          <Icon />
                        </div>
                      </div>
                      <div className="w-[64.5px] flex relative flex-col justify-start shrink-0 whitespace-pre text-nowrap max-lg:w-[3.625rem]">
                        <h6 className="block text-foreground [font-family:Inter,_'Inter_Placeholder',_sans-serif] text-xl font-medium leading-7 tracking-[-0.8px] [font-feature-settings:'blwf',_'cv03',_'cv04',_'cv09',_'cv11'] max-lg:text-lg max-lg:leading-[1.5625rem] max-lg:tracking-[-0.72px]" data-component="heading" dir="auto">
                          Unisen
                        </h6>
                      </div>
                    </a>
                    <div className="flex relative justify-center items-center content-center shrink-0 gap-3 max-lg:hidden">
                      {Tile_data.map((d, i) => <Tile key={i} d={d} styles={Tile_styles[i]} />)}
                      <div className="w-[120.3px] block relative shrink-0 max-lg:hidden" id="undefined-ynrokg">
                        <a className="w-[120.3px] h-[2.4rem] flex relative py-2 pr-2.5 pl-3 rounded-[30px] justify-center items-center content-center gap-1 bg-clr-0 cursor-pointer max-lg:hidden" data-ditto-id="menu-trigger-a">
                          <div className="w-[76.3px] flex relative flex-col justify-start shrink-0 whitespace-pre text-nowrap max-lg:hidden">
                            <p className="block [font-family:Inter,_'Inter_Placeholder',_sans-serif] text-base font-medium leading-[1.375rem] tracking-[-0.48px] [font-feature-settings:'blwf',_'cv03',_'cv04',_'cv09',_'cv11'] max-lg:hidden" dir="auto">
                              Resources
                            </p>
                          </div>
                          <div className="w-4.5 block relative shrink-0 aspect-square bg-color-003 max-lg:hidden" style={{ maskImage: "url(\"data:image/svg+xml,<svg display=\\\"block\\\" role=\\\"presentation\\\" viewBox=\\\"0 0 24 24\\\" xmlns=\\\"http://www.w3.org/2000/svg\\\"><path d=\\\"M 1.41 0 L 6 4.58 L 10.59 0 L 12 1.41 L 6 7.41 L 0 1.41 Z\\\" fill=\\\"var(--esondr, var(--foreground))\\\" height=\\\"7.409980000000001px\\\" id=\\\"pChJ7liEU\\\" transform=\\\"translate(6 8.295)\\\" width=\\\"12px\\\"/></svg>\"), none" }} />
                        </a>
                      </div>
                    </div>
                    <div className="flex relative justify-end items-center content-center shrink-0 gap-3 max-lg:order-[2]">
                      <div className="basis-full shrink-0 h-[2.55rem] block relative z-2 max-lg:h-10 max-lg:flex max-lg:p-2 max-lg:justify-center max-lg:items-center max-lg:content-center max-lg:order-[1] max-lg:gap-2.5 max-lg:cursor-pointer max-lg:z-[initial]">
                        <Icon2 />
                        <a className="h-[2.55rem] flex relative py-2.5 px-4 rounded-[40px] justify-center items-center content-center gap-1.5 text-primary cursor-pointer max-lg:hidden" data-component="link" href="/contact">
                          <div className="w-[5.0375rem] flex relative justify-center items-center content-center shrink-0 gap-2.5 overflow-clip max-lg:hidden">
                            <div className="w-[5.0375rem] flex relative z-2 flex-col justify-start shrink-0 whitespace-pre text-nowrap max-lg:hidden">
                              <p className="block text-background [font-family:Inter,_'Inter_Placeholder',_sans-serif] text-base font-medium leading-[1.3125rem] tracking-[-0.48px] [font-feature-settings:'blwf',_'cv03',_'cv04',_'cv09',_'cv11'] max-lg:hidden" dir="auto">
                                Get started
                              </p>
                            </div>
                            <div className="w-[5.0375rem] h-full flex absolute top-6 z-2 min-w-0 flex-col justify-start shrink-0 whitespace-pre text-nowrap max-lg:hidden">
                              <p className="block text-background [font-family:Inter,_'Inter_Placeholder',_sans-serif] text-base font-medium leading-[1.3125rem] tracking-[-0.48px] [font-feature-settings:'blwf',_'cv03',_'cv04',_'cv09',_'cv11'] max-lg:hidden" dir="auto">
                                Get started
                              </p>
                            </div>
                          </div>
                          <div className="w-[7.0375rem] h-full block absolute top-0 left-0 z-1 min-w-0 rounded-[100px] shrink-0 bg-foreground shadow-[var(--clr-1)_0px_2px_10px_0px] max-lg:hidden after:content-[''] after:block after:absolute after:inset-0 after:w-[7.0375rem] after:h-[2.55rem] after:rounded-tl-[100px] max-lg:after:hidden" />
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="w-310 h-full block absolute top-0 left-0 z-0 min-w-0 shrink-0 max-md:w-full md:max-lg:w-189 2xl:w-312.5">
                    <div className="h-[4.5625rem] block relative">
                      <div className="w-px h-[4.0625rem] block absolute top-1 left-1 z-8 shrink-0">
                        <div className="w-px h-[4.0625rem] block relative overflow-hidden after:content-[''] after:block after:absolute after:inset-y-0 after:-right-px after:left-0 after:w-0.5 after:h-[4.0625rem]" />
                      </div>
                      <div className="w-px h-[4.0625rem] block absolute top-1 right-1 z-8 shrink-0">
                        <div className="w-px h-[4.0625rem] block relative overflow-hidden after:content-[''] after:block after:absolute after:inset-y-0 after:-right-px after:left-0 after:w-0.5 after:h-[4.0625rem]" />
                      </div>
                      <div className="h-px block absolute bottom-0 inset-x-0 z-9 shrink-0">
                        <div className="h-px flex relative justify-center items-center content-center">
                          <div className="w-2.5 h-2.5 block relative shrink-0 overflow-hidden bg-background after:content-[''] after:block after:absolute after:inset-0 after:w-2.5 after:h-2.5" />
                          <div className="w-[98.5%] h-full block relative grow shrink-0 basis-0 overflow-hidden max-md:w-[94.5%] md:max-lg:w-[97.5%] after:content-[''] after:block after:absolute after:top-0 after:-bottom-px after:inset-x-0 after:h-0.5" />
                          <div className="w-2.5 h-2.5 block relative shrink-0 overflow-hidden bg-background after:content-[''] after:block after:absolute after:inset-0 after:w-2.5 after:h-2.5" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </nav>
            </div>
          </div>
          <div className="h-[min-content] min-h-screen contents relative min-w-0 flex-col justify-start items-center content-center overflow-clip bg-background">
            <header hidden className="w-full h-200 min-h-screen flex relative max-h-256 pb-6 px-5 flex-col justify-start items-center content-center shrink-0 overflow-clip max-md:h-[46.9625rem] max-lg:pb-3 max-lg:px-1.5 max-lg:min-h-0 max-lg:max-h-none md:max-lg:h-[39.7125rem] 2xl:h-256 2xl:min-h-200">
              <div className="contents min-w-0">
                <div className="w-full block relative shrink-0">
                  <div className="h-[4.5625rem] block relative overflow-clip" />
                </div>
              </div>
              <div className="w-full max-w-312.5 h-[43.9375rem] flex relative px-16 flex-col justify-start items-center content-center grow shrink-0 basis-0 gap-2.5 max-md:h-[41.65rem] max-lg:px-5 max-lg:grow-[initial] max-lg:basis-[initial] md:max-lg:h-[34.4rem] 2xl:h-[57.9375rem]">
                <div className="w-full h-full flex relative z-1 py-16 flex-col justify-between items-center content-center grow shrink-0 basis-0 max-lg:pb-20 max-lg:justify-start max-lg:gap-16 max-lg:grow-[initial] max-lg:basis-[initial]">
                  <div className="w-full max-w-150 h-[21.5625rem] flex relative flex-col justify-center items-center content-center shrink-0 gap-10 max-md:h-[18.65rem] max-lg:gap-8 md:max-lg:h-[11.4rem] 2xl:h-[29.9625rem]">
                    <div className="w-150 flex relative flex-col justify-center items-center content-center shrink-0 gap-6 max-md:w-full">
                      <div className="w-150 flex relative flex-col justify-start shrink-0 max-md:w-full">
                        <h1 className="block [font-family:Inter,_'Inter_Placeholder',_sans-serif] text-[3.375rem] font-medium leading-[4.0625rem] tracking-[-2.16px] text-center text-balance [font-feature-settings:'blwf',_'cv03',_'cv04',_'cv09',_'cv11'] max-lg:text-[2.125rem] max-lg:leading-[2.5625rem] max-lg:tracking-[-1.36px]" data-component="heading" dir="auto">
                          <span className="inline whitespace-nowrap [text-wrap:nowrap_balance]">
                            <span className="inline-block">
                              S
                            </span>
                            <span className="inline-block">
                              c
                            </span>
                            <span className="inline-block">
                              a
                            </span>
                            <span className="inline-block">
                              l
                            </span>
                            <span className="inline-block">
                              e
                            </span>
                          </span>
                          {" "}
                          <span className="inline whitespace-nowrap [text-wrap:nowrap_balance]">
                            <span className="inline-block">
                              f
                            </span>
                            <span className="inline-block">
                              a
                            </span>
                            <span className="inline-block">
                              s
                            </span>
                            <span className="inline-block">
                              t
                            </span>
                            <span className="inline-block">
                              e
                            </span>
                            <span className="inline-block">
                              r
                            </span>
                          </span>
                          {" "}
                          <span className="inline whitespace-nowrap [text-wrap:nowrap_balance]">
                            <span className="inline-block">
                              w
                            </span>
                            <span className="inline-block">
                              i
                            </span>
                            <span className="inline-block">
                              t
                            </span>
                            <span className="inline-block">
                              h
                            </span>
                          </span>
                          {" "}
                          <span className="inline whitespace-nowrap [text-wrap:nowrap_balance]">
                            <span className="inline-block">
                              y
                            </span>
                            <span className="inline-block">
                              o
                            </span>
                            <span className="inline-block">
                              u
                            </span>
                            <span className="inline-block">
                              r
                            </span>
                          </span>
                          {" "}
                          <span className="inline whitespace-nowrap [text-wrap:nowrap_balance]">
                            <span className="inline-block">
                              A
                            </span>
                            <span className="inline-block">
                              I
                            </span>
                          </span>
                          {" "}
                          <span className="inline whitespace-nowrap [text-wrap:nowrap_balance]">
                            <span className="inline-block">
                              A
                            </span>
                            <span className="inline-block">
                              g
                            </span>
                            <span className="inline-block">
                              e
                            </span>
                            <span className="inline-block">
                              n
                            </span>
                            <span className="inline-block">
                              t
                            </span>
                          </span>
                        </h1>
                      </div>
                      <div className="w-150 flex relative flex-col justify-start shrink-0 max-md:w-full" data-ditto-id="motion-div">
                        <p className="block text-muted-foreground [font-family:Inter,_'Inter_Placeholder',_sans-serif] text-lg leading-[1.5625rem] tracking-[-0.54px] text-center text-balance [font-feature-settings:'blwf',_'cv03',_'cv04',_'cv09',_'cv11'] max-lg:text-base max-lg:leading-[1.375rem] max-lg:tracking-[-0.48px]" dir="auto">
                          Spend less time on logistics and more on strategy while Unisen handles the execution of your global marketing operations.
                        </p>
                      </div>
                    </div>
                    <div className="w-[43.5%] flex relative justify-center items-center content-center shrink-0 gap-4 max-lg:w-full max-lg:flex-wrap max-lg:gap-3" data-ditto-id="motion-div-2">
                      <div className="contents min-w-0">
                        <div className="w-[123.5px] block relative z-2 shrink-0 max-md:w-full max-lg:min-w-50 max-lg:flex-1 md:max-lg:w-73.5">
                          <a className="h-[2.55rem] flex relative py-2.5 px-4 rounded-[40px] justify-center items-center content-center gap-1.5 text-primary cursor-pointer" data-component="link" href="/contact">
                            <div className="w-[91.5px] flex relative justify-center items-center content-center shrink-0 gap-2.5 overflow-clip">
                              <div className="w-[91.5px] flex relative z-2 flex-col justify-start shrink-0 whitespace-pre text-nowrap">
                                <p className="block text-background [font-family:Inter,_'Inter_Placeholder',_sans-serif] text-base font-medium leading-[1.3125rem] tracking-[-0.48px] [font-feature-settings:'blwf',_'cv03',_'cv04',_'cv09',_'cv11']" dir="auto">
                                  Get started
                                </p>
                              </div>
                              <div className="w-[91.5px] h-full flex absolute top-6 z-2 min-w-0 flex-col justify-start shrink-0 whitespace-pre text-nowrap">
                                <p className="block text-background [font-family:Inter,_'Inter_Placeholder',_sans-serif] text-base font-medium leading-[1.3125rem] tracking-[-0.48px] [font-feature-settings:'blwf',_'cv03',_'cv04',_'cv09',_'cv11']" dir="auto">
                                  Get started
                                </p>
                              </div>
                            </div>
                            <div className="w-[123.5px] h-full block absolute top-0 left-0 z-1 min-w-0 rounded-[100px] shrink-0 bg-foreground shadow-[var(--clr-1)_0px_2px_10px_0px] max-md:w-full md:max-lg:w-73.5 after:content-[''] after:block after:absolute after:inset-0 after:h-[2.55rem] after:rounded-tl-[100px]" />
                          </a>
                        </div>
                      </div>
                      <div className="contents min-w-0">
                        <div className="w-[121.9px] block relative z-2 shrink-0 max-md:w-full max-lg:min-w-50 max-lg:flex-1 md:max-lg:w-73.5">
                          <a className="h-[2.55rem] flex relative py-2.5 px-4 rounded-[40px] justify-center items-center content-center gap-1.5 text-primary cursor-pointer" data-component="link" href="/contact">
                            <div className="w-[89.9px] flex relative justify-center items-center content-center shrink-0 gap-2.5 overflow-clip">
                              <div className="w-[89.9px] flex relative z-2 flex-col justify-start shrink-0 whitespace-pre text-nowrap">
                                <p className="block text-foreground [font-family:Inter,_'Inter_Placeholder',_sans-serif] text-base font-medium leading-[1.3125rem] tracking-[-0.48px] [font-feature-settings:'blwf',_'cv03',_'cv04',_'cv09',_'cv11']" dir="auto">
                                  Talk to us
                                </p>
                              </div>
                              <div className="w-[89.9px] h-full flex absolute top-6 z-2 min-w-0 flex-col justify-start shrink-0 whitespace-pre text-nowrap">
                                <p className="block text-foreground [font-family:Inter,_'Inter_Placeholder',_sans-serif] text-base font-medium leading-[1.3125rem] tracking-[-0.48px] [font-feature-settings:'blwf',_'cv03',_'cv04',_'cv09',_'cv11']" dir="auto">
                                  Talk to us
                                </p>
                              </div>
                            </div>
                            <div className="w-[121.9px] h-full block absolute top-0 left-0 z-1 min-w-0 rounded-[100px] shrink-0 bg-background max-md:w-full md:max-lg:w-73.5 after:content-[''] after:block after:absolute after:inset-0 after:h-[2.55rem] after:rounded-tl-[100px]" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-full max-w-125 h-40 flex relative z-1 p-5 rounded-xl justify-start items-start content-start shrink-0 gap-2.5 bg-background shadow-[var(--clr-1)_0px_15px_30px_5px] [backdrop-filter:blur(5px)] max-lg:shadow-[var(--clr-2)_0px_8px_20px_2px] after:content-[''] after:block after:absolute after:inset-0 after:h-40 after:rounded-tl-xl">
                    <div className="block relative shrink-0 max-lg:max-w-full">
                      <div className="contents">
                        <div className="w-[20.4375rem] h-6 min-h-[0.3125rem] flex relative min-w-[0.3125rem] items-center max-md:w-[17.6875rem] max-md:h-10.5 max-lg:max-w-full md:max-lg:w-[286.7px] md:max-lg:h-[1.3125rem] 2xl:w-[11.125rem]">
                          <span className="h-full block text-color-003 [font-family:Inter,_'Inter_Placeholder',_sans-serif] text-base leading-6 tracking-[-0.48px] whitespace-pre-wrap [word-break:break-word] max-lg:text-sm max-lg:leading-[1.3125rem] max-lg:tracking-[-0.42px]">
                            Show me how marketing spend is performing
                            <span className="h-[1.2rem] inline-block ml-0.5 align-middle bg-clr-3 [animation-name:blink] [animation-duration:1s] [animation-timing-function:steps(1)] [animation-iteration-count:infinite]" />
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="w-10 h-10 flex absolute right-5 bottom-5 z-1 min-w-0 p-3 rounded-[100px] justify-center items-center content-center shrink-0 gap-2.5 bg-foreground shadow-[var(--clr-1)_0px_4px_20px_0px] after:content-[''] after:block after:absolute after:inset-0 after:w-10 after:h-10 after:rounded-tl-[100px]">
                      <div className="basis-full shrink-0 block relative aspect-square bg-background" style={{ maskImage: "url(\"data:image/svg+xml,<svg display=\\\"block\\\" role=\\\"presentation\\\" viewBox=\\\"0 0 24 24\\\" xmlns=\\\"http://www.w3.org/2000/svg\\\"><path d=\\\"M 8 0 L 6.59 1.41 L 12.17 7 L 0 7 L 0 9 L 12.17 9 L 6.59 14.59 L 8 16 L 16 8 Z\\\" fill=\\\"var(--esondr, var(--foreground))\\\" height=\\\"16px\\\" id=\\\"cNUVKl8Cd\\\" transform=\\\"translate(4 4)\\\" width=\\\"16px\\\"/></svg>\"), none" }} />
                    </div>
                  </div>
                </div>
                <div className="contents min-w-0">
                  <div className="w-16 h-11 flex absolute top-[20.65rem] right-64.5 z-1 flex-col justify-center items-start content-start shrink-0 transform-[matrix(1,0,0,1,18.4,-14.7416)] max-md:top-[23.7375rem] max-lg:right-[2.3125rem] max-md:transform-[matrix(1,0,0,1,68.9667,5.4851)] md:max-lg:top-[313.7px] md:max-lg:transform-[matrix(1,0,0,1,64.9333,3.87177)] 2xl:top-[435.7px] 2xl:transform-[matrix(1,0,0,1,89.1,13.5384)]" data-ditto-id="motion-div-3">
                    <div className="w-4.5 h-4.5 block relative shrink-0 transform-[matrix(0.97437,0.224951,-0.224951,0.97437,0,0)] origin-[9px_9px]" aria-hidden="true">
                      <div className="h-full block">
                        <Icon3 />
                      </div>
                    </div>
                    <div className="w-full flex relative flex-col justify-center items-end content-end shrink-0 gap-2.5">
                      <div className="w-[51.1px] flex relative py-1 px-2 rounded-[100px] justify-center items-center content-center shrink-0 gap-2.5 overflow-clip bg-clr-4 shadow-[var(--clr-1)_2px_2px_5px_0px] after:content-[''] after:block after:absolute after:inset-0 after:w-[51.1px] after:h-[1.6375rem] after:rounded-tl-[100px]">
                        <div className="w-[35.1px] flex relative flex-col justify-start shrink-0 whitespace-pre text-nowrap">
                          <p className="block text-background [font-family:Inter,_'Inter_Placeholder',_sans-serif] text-[0.8125rem] leading-[1.125rem] tracking-[-0.39px] [font-feature-settings:'blwf',_'cv03',_'cv04',_'cv09',_'cv11']" dir="auto">
                            Aaron
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="contents min-w-0">
                  <div className="w-16 h-11 flex absolute top-[365.5px] left-54 z-1 flex-col justify-center items-end content-end shrink-0 transform-[matrix(1,0,0,1,-66.1091,-55.1561)] max-md:top-[32.2625rem] max-lg:left-[1.6875rem] max-md:transform-[matrix(1,0,0,1,-58.6909,-29.3455)] md:max-lg:top-[25.0125rem] md:max-lg:transform-[matrix(1,0,0,1,-80,-40)] 2xl:top-[30.125rem] 2xl:transform-[matrix(1,0,0,1,0,-22.1016)]" data-ditto-id="motion-div-4">
                    <div className="w-4.5 h-4.5 block relative shrink-0 transform-[matrix(0,1,-1,0,0,0)] origin-[9px_9px]" aria-hidden="true">
                      <div className="block">
                        <Icon4 />
                      </div>
                    </div>
                    <div className="w-full flex relative flex-col justify-center items-start content-start shrink-0 gap-2.5">
                      <div className="flex relative py-1 px-2 rounded-[100px] justify-center items-center content-center shrink-0 gap-2.5 overflow-clip bg-color-002 shadow-[var(--clr-1)_2px_2px_5px_0px] after:content-[''] after:block after:absolute after:inset-0 after:w-[50.7px] after:h-[1.6375rem] after:rounded-tl-[100px]">
                        <div className="w-[34.7px] flex relative flex-col justify-start shrink-0 whitespace-pre text-nowrap">
                          <p className="block text-background [font-family:Inter,_'Inter_Placeholder',_sans-serif] text-[0.8125rem] leading-[1.125rem] tracking-[-0.39px] [font-feature-settings:'blwf',_'cv03',_'cv04',_'cv09',_'cv11']" dir="auto">
                            Sarah
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="contents min-w-0">
                  <div className="h-[43.9375rem] block absolute top-0 inset-x-0 z-0 shrink-0 max-md:h-[41.65rem] md:max-lg:h-[34.4rem] 2xl:h-[57.9375rem]">
                    <div className="h-full block relative">
                      <div className="w-px h-[43.4375rem] block absolute top-1 left-1 z-8 shrink-0 max-md:h-[41.15rem] md:max-lg:h-[33.9rem] 2xl:h-[57.4375rem]">
                        <div className="w-px h-full block relative overflow-hidden after:content-[''] after:block after:absolute after:inset-y-0 after:-right-px after:left-0 after:w-0.5" />
                      </div>
                      <div className="w-px h-[43.4375rem] block absolute top-1 right-1 z-8 shrink-0 max-md:h-[41.15rem] md:max-lg:h-[33.9rem] 2xl:h-[57.4375rem]">
                        <div className="w-px h-full block relative overflow-hidden after:content-[''] after:block after:absolute after:inset-y-0 after:-right-px after:left-0 after:w-0.5" />
                      </div>
                      <div className="h-px block absolute bottom-0 inset-x-0 z-9 shrink-0">
                        <div className="h-px flex relative justify-center items-center content-center">
                          <div className="w-2.5 h-2.5 block relative shrink-0 overflow-hidden bg-background after:content-[''] after:block after:absolute after:inset-0 after:w-2.5 after:h-2.5" />
                          <div className="w-[98.5%] h-full block relative grow shrink-0 basis-0 overflow-hidden max-md:w-[94.5%] md:max-lg:w-[97.5%] after:content-[''] after:block after:absolute after:top-0 after:-bottom-px after:inset-x-0 after:h-0.5" />
                          <div className="w-2.5 h-2.5 block relative shrink-0 overflow-hidden bg-background after:content-[''] after:block after:absolute after:inset-0 after:w-2.5 after:h-2.5" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="contents min-w-0">
                  <div className="h-[43.9375rem] block absolute top-0 inset-x-0 z-0 opacity-2 shrink-0 overflow-clip max-md:h-[41.65rem] md:max-lg:h-[34.4rem] 2xl:h-[57.9375rem]" style={{ maskImage: "radial-gradient(50% 59% at 49.2% 39.6%, var(--foreground) 0%, var(--clr-5) 100%)" }}>
                    <div className="h-full block absolute top-0 inset-x-0 [background-size:189px] max-lg:[background-size:94.5px]" style={{ backgroundImage: "url(\"/assets/nexura/svg/7f677b46bd48.svg\")" }} />
                  </div>
                </div>
                <div className="w-302 h-[42.4375rem] block absolute top-3 left-4 z-0 opacity-90 min-w-0 shrink-0 max-md:w-full max-md:h-[40.65rem] max-lg:top-2 max-lg:left-3 md:max-lg:w-183 md:max-lg:h-[33.4rem] 2xl:w-304.5 2xl:h-[56.4375rem]">
                  <div className="contents">
                    <div className="h-full block relative overflow-hidden">
                      <div className="h-full block transform-[matrix(1,0,0,1,0,-2.15348)] max-md:transform-[matrix(1,0,0,1,0,-0.0152788)] md:max-lg:transform-[matrix(1,0,0,1,0,11.5616)] 2xl:transform-[matrix(1,0,0,1,0,0.22945)]">
                        <img className="w-full h-[42.4375rem] block overflow-clip object-contain object-[50%_100%] max-md:h-162.5 md:max-lg:h-133.5 2xl:h-[56.4375rem]" data-component="image" alt="Serene Rural Landscape with Couple" src="/assets/nexura/images/793c7d1c395c.jpg" width={1600} height={446} loading="lazy" decoding="async" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </header>
            <section className="w-full flex relative px-5 justify-center items-center content-center shrink-0 gap-2.5 max-lg:px-4 max-lg:flex-col" id="product">
              <div className="w-full max-w-312.5 flex relative py-25 px-16 flex-col justify-start items-start content-start grow shrink-0 basis-0 gap-16 max-lg:py-12 max-lg:px-0 max-lg:gap-10 max-lg:grow-[initial] max-lg:basis-[initial]">
                <div className="w-162.5 flex relative max-w-162.5 flex-col justify-center items-center content-center shrink-0 gap-4 max-md:w-full max-lg:max-w-none md:max-lg:w-137.5">
                  <div className="block relative shrink-0 w-full">
                    <div className="contents">
                      <div className="min-h-full block relative w-full">
                        {/* Nexura Scroll Text: word colour paints in on scroll */}
                        <ScrollRevealText
                          text="Unisen turns each LA EHC consultation into a guided response: deadlines on one timeline, evidence with the case, and wording checked against IPSEA so schools can submit on time."
                          className="block [font-family:Inter,_'Inter_Placeholder',_sans-serif] text-[1.75rem] leading-[2.4375rem] tracking-[-1.12px] text-left max-lg:text-lg max-lg:leading-[1.55] max-lg:tracking-[-0.02em]"
                          initialColor="#999999"
                          activeColor="#244a70"
                          startOffsetPct={80}
                          scrollDistancePx={100}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <FeatureAccordion />
                <div className="contents min-w-0">
                  <div className="h-[51.975rem] block absolute top-0 inset-x-0 z-0 shrink-0 max-md:h-[61.25rem] md:max-lg:h-[37.5625rem]">
                    <div className="h-full block relative">
                      <div className="w-px h-[51.475rem] block absolute top-1 left-1 z-8 shrink-0 max-md:h-[60.75rem] md:max-lg:h-[37.0625rem]">
                        <div className="w-px h-full block relative overflow-hidden after:content-[''] after:block after:absolute after:inset-y-0 after:-right-px after:left-0 after:w-0.5" />
                      </div>
                      <div className="w-px h-[51.475rem] block absolute top-1 right-1 z-8 shrink-0 max-md:h-[60.75rem] md:max-lg:h-[37.0625rem]">
                        <div className="w-px h-full block relative overflow-hidden after:content-[''] after:block after:absolute after:inset-y-0 after:-right-px after:left-0 after:w-0.5" />
                      </div>
                      <div className="h-px block absolute bottom-0 inset-x-0 z-9 shrink-0">
                        <div className="h-px flex relative justify-center items-center content-center">
                          <div className="w-2.5 h-2.5 block relative shrink-0 overflow-hidden bg-background after:content-[''] after:block after:absolute after:inset-0 after:w-2.5 after:h-2.5" />
                          <div className="w-[98.5%] h-full block relative grow shrink-0 basis-0 overflow-hidden max-md:w-[94.5%] md:max-lg:w-[97.5%] after:content-[''] after:block after:absolute after:top-0 after:-bottom-px after:inset-x-0 after:h-0.5" />
                          <div className="w-2.5 h-2.5 block relative shrink-0 overflow-hidden bg-background after:content-[''] after:block after:absolute after:inset-0 after:w-2.5 after:h-2.5" />
                        </div>
                      </div>
                      <div className="h-px block absolute inset-x-0 z-9 shrink-0">
                        <div className="h-px flex relative justify-center items-center content-center">
                          <div className="w-2.5 h-2.5 block relative shrink-0 overflow-hidden bg-background after:content-[''] after:block after:absolute after:inset-0 after:w-2.5 after:h-2.5" />
                          <div className="w-[98.5%] h-full block relative grow shrink-0 basis-0 overflow-hidden max-md:w-[94.5%] md:max-lg:w-[97.5%] after:content-[''] after:block after:absolute after:top-0 after:-bottom-px after:inset-x-0 after:h-0.5" />
                          <div className="w-2.5 h-2.5 block relative shrink-0 overflow-hidden bg-background after:content-[''] after:block after:absolute after:inset-0 after:w-2.5 after:h-2.5" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            {/* Hidden for now — keep markup for later video section restore */}
            <section hidden className="w-full flex relative px-5 justify-center items-center content-center shrink-0 gap-2.5 overflow-clip max-lg:py-12 max-lg:px-4 max-lg:flex-col" id="demo">
              <div className="w-full max-w-312.5 flex relative p-16 flex-col justify-start items-center content-center grow shrink-0 basis-0 gap-16 overflow-clip max-lg:py-6 max-lg:px-0 max-lg:grow-[initial] max-lg:basis-[initial]">
                <div className="contents min-w-0">
                  <div className="w-full block relative z-1 shrink-0">
                    <div className="flex relative max-h-162.5 rounded-2xl justify-start items-start content-start gap-2.5 overflow-clip bg-background shadow-[var(--clr-7)_4px_4px_30px_0px] cursor-pointer max-lg:rounded-xl max-lg:max-h-none">
                      <div className="w-278 h-[654.1px] block relative z-3 opacity-0 grow shrink-0 basis-0 aspect-[1.7/1] max-lg:w-full max-lg:h-auto max-lg:aspect-[16/10]">
                        <article className="h-full block relative rounded-xl overflow-hidden" role="presentation">
                          <img className="w-full h-full block absolute top-0 left-0 overflow-clip object-cover" data-component="image" src="/assets/nexura/images/c110789b4f0c.webp" loading="lazy" decoding="async" alt="" />
                          <button className="w-17 h-12 block absolute top-[clamp(96.2px,_50%,_calc(100%_-_96.2px))] left-[clamp(163.5px,_50%,_calc(100%_-_163.5px))] text-center transform-[matrix(1,0,0,1,-34,-24)]" data-component="button" aria-label="Play">
                            <Illustration />
                          </button>
                        </article>
                      </div>
                      <div className="w-14 h-14 flex absolute top-[clamp(96.2px,_50%,_calc(100%_-_96.2px))] left-[clamp(163.5px,_50%,_calc(100%_-_163.5px))] z-2 min-w-0 p-3 rounded-[100px] justify-center items-center content-center shrink-0 gap-2.5 overflow-clip bg-foreground shadow-[var(--clr-8)_0px_4px_20px_0px] transform-[matrix(1,0,0,1,-28,-28)] after:content-[''] after:block after:absolute after:inset-0 after:w-14 after:h-14 after:rounded-tl-[100px] max-lg:top-1/2 max-lg:left-1/2 max-lg:transform-[translate(-50%,-50%)]">
                        <Icon9 />
                      </div>
                      <div className="h-161.5 block absolute top-0.5 inset-x-0.5 z-0 min-w-0 rounded-[14px] shrink-0 max-md:h-auto max-lg:relative max-lg:inset-auto max-lg:top-auto max-lg:h-auto max-lg:rounded-xl md:max-lg:h-auto">
                        <div className="h-full block absolute top-0 inset-x-0 rounded-[14px] max-lg:relative max-lg:rounded-xl">
                          <img className="w-full h-161.5 block rounded-[14px] overflow-clip object-cover object-[50%_0%] aspect-[auto_2880/1920] max-md:h-auto max-lg:rounded-xl max-lg:aspect-[16/10] md:max-lg:h-auto" data-component="image" alt="Unisen consultation dashboard (fictional seed data)" height="1920" sizes="(max-width: 1023px) calc(100vw - 2rem), calc(calc(min(max(100vw - 40px, 1px), 1250px) - 128px) - 4px)" src="/assets/nexura/images/4c4da0ccccd6.png" srcSet="/assets/nexura/images/d34dbdc41ccc.png 512w, /assets/nexura/images/511cd48e847b.png 1024w, /assets/nexura/images/ef10884890e7.png 2048w, /assets/nexura/images/4c4da0ccccd6.png 2880w" width="2880" loading="lazy" decoding="async" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-310 h-full block absolute top-0 left-0 z-0 min-w-0 shrink-0 max-lg:hidden 2xl:w-312.5">
                  <div className="h-194.5 block relative max-lg:hidden">
                    <div className="w-px h-192.5 block absolute top-1 left-1 z-8 shrink-0 max-lg:hidden">
                      <div className="w-px h-192.5 block relative overflow-hidden max-lg:hidden after:content-[''] after:block after:absolute after:inset-y-0 after:-right-px after:left-0 after:w-0.5 after:h-192.5 max-lg:after:hidden" />
                    </div>
                    <div className="w-px h-192.5 block absolute top-1 right-1 z-8 shrink-0 max-lg:hidden">
                      <div className="w-px h-192.5 block relative overflow-hidden max-lg:hidden after:content-[''] after:block after:absolute after:inset-y-0 after:-right-px after:left-0 after:w-0.5 after:h-192.5 max-lg:after:hidden" />
                    </div>
                  </div>
                </div>
                <div className="w-302 h-188.5 block absolute top-3 left-4 z-0 opacity-90 min-w-0 shrink-0 max-md:w-full max-md:h-[272.3px] max-lg:top-0 max-lg:left-0 md:max-lg:w-188 md:max-lg:h-[503.5px] 2xl:w-304.5">
                  <div className="contents">
                    <div className="h-full block relative overflow-hidden">
                      <div className="h-full block transform-[matrix(1.1,0,0,1.1,0,61.1845)] origin-[604px_377px] max-md:transform-[matrix(1.1,0,0,1.1,0,21.5457)] max-md:origin-[179.5px_136.172px] md:max-lg:transform-[matrix(1.1,0,0,1.1,0,27.785)] md:max-lg:origin-[376px_251.758px] 2xl:transform-[matrix(1.1,0,0,1.1,0,48.1575)] 2xl:origin-[609px_377px]">
                        <img className="w-302 h-188.5 block overflow-clip object-[50%_100%] max-md:w-full max-md:h-68 md:max-lg:w-188 md:max-lg:h-126 2xl:w-304.5" data-component="image" alt="Countryside Serenity" src="/assets/nexura/images/394b09f2f4e8.jpg" width={1600} height={895} loading="lazy" decoding="async" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section className="w-full flex relative px-5 justify-center items-center content-center shrink-0 gap-2.5 max-lg:px-4 max-lg:flex-col" id="integration">
              <div className="w-full max-w-312.5 flex relative py-25 px-16 justify-center items-center content-center grow shrink-0 basis-0 gap-10 max-lg:py-12 max-lg:px-0 max-lg:flex-col max-lg:justify-start max-lg:items-stretch max-lg:content-start max-lg:gap-10 max-lg:grow-[initial] max-lg:basis-[initial]">
                <div className="w-[45%] flex relative z-1 max-w-125 px-6 flex-col justify-start items-start content-start grow shrink-0 basis-0 gap-10 max-md:w-full max-lg:max-w-none max-lg:px-0 max-lg:grow-[initial] max-lg:basis-[initial] md:max-lg:w-full 2xl:w-[44.5%]">
                  <div className="contents min-w-0">
                    <div className="w-113 block relative z-1 shrink-0 max-md:w-full max-lg:w-full md:max-lg:w-full">
                      <div className="flex relative flex-col justify-center items-start content-start gap-5">
                        <div className="w-113 flex relative flex-col justify-start shrink-0 max-md:w-full max-lg:w-full md:max-lg:w-full">
                          <h2 className="block [font-family:Inter,_'Inter_Placeholder',_sans-serif] text-[2.5rem] font-medium leading-12 tracking-[-1.6px] text-left text-balance [font-feature-settings:'blwf',_'cv03',_'cv04',_'cv09',_'cv11'] max-lg:text-[1.75rem] max-lg:leading-[2.125rem] max-lg:tracking-[-1.12px]" data-component="heading" dir="auto">
                            Works with the evidence you already collect.
                          </h2>
                        </div>
                        <div className="w-[22.6rem] flex relative flex-col justify-start shrink-0 max-md:w-full max-lg:w-full md:max-lg:w-full">
                          <p className="block text-muted-foreground [font-family:Inter,_'Inter_Placeholder',_sans-serif] text-lg leading-[1.5625rem] tracking-[-0.54px] text-left text-pretty [font-feature-settings:'blwf',_'cv03',_'cv04',_'cv09',_'cv11'] max-lg:text-base max-lg:leading-[1.45] max-lg:tracking-[-0.48px]" dir="auto">
                            Bring LA portals, professional advice and school forms into one case, with no forced migration.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="contents min-w-0">
                    <div className="w-[25.425rem] block relative shrink-0 max-md:w-full max-lg:w-full md:max-lg:w-full">
                      <div className="flex relative justify-center items-center content-center">
                        <div className="basis-0 shrink-0 h-full block relative grow overflow-hidden after:content-[''] after:block after:absolute after:top-0 after:-bottom-px after:inset-x-0 after:h-0.5" />
                      </div>
                    </div>
                  </div>
                  <div className="w-113 flex relative flex-col justify-start items-start content-start shrink-0 gap-4 max-md:w-full max-lg:w-full md:max-lg:w-full">
                    {Tile2_data.map((d, i) => <Tile2 key={i} d={d} styles={Tile2_styles[i]} />)}
                  </div>
                </div>
                <div className="w-[51%] flex relative z-1 p-10 justify-center items-center content-center shrink-0 gap-2.5 aspect-square bg-surface max-lg:w-full max-lg:p-0 max-lg:aspect-[initial] max-lg:bg-[initial]">
                  <div className="w-[92.5%] h-112.5 flex relative flex-col justify-center items-center content-center shrink-0 gap-6 max-lg:w-full max-lg:h-[8.425rem] max-lg:flex-1 2xl:w-[91.5%]">
                    <div className="contents min-w-0">
                      <div className="w-112.5 h-112.5 block absolute top-0 left-0 z-1 shrink-0 max-md:w-full max-lg:relative max-lg:right-0 max-lg:bottom-0 max-lg:h-auto md:max-lg:w-179">
                        <div className="h-full flex relative flex-col justify-center items-center content-center gap-6 max-lg:items-start max-lg:content-start">
                          <LogoCloudSection />
                          <div className="w-[12.2375rem] block relative z-2 shrink-0">
                            <a className="w-[12.2375rem] h-[2.55rem] flex relative py-2.5 px-4 rounded-[40px] justify-center items-center content-center gap-1.5 text-primary cursor-pointer" data-component="link" href="/integration">
                              <div className="w-[10.2375rem] flex relative justify-center items-center content-center shrink-0 gap-2.5 overflow-clip">
                                <div className="w-[10.2375rem] flex relative z-2 flex-col justify-start shrink-0 whitespace-pre text-nowrap">
                                  <p className="block text-background [font-family:Inter,_'Inter_Placeholder',_sans-serif] text-base font-medium leading-[1.3125rem] tracking-[-0.48px] [font-feature-settings:'blwf',_'cv03',_'cv04',_'cv09',_'cv11']" dir="auto">
                                    Explore the workspace
                                  </p>
                                </div>
                                <div className="w-[10.2375rem] h-full flex absolute top-6 z-2 min-w-0 flex-col justify-start shrink-0 whitespace-pre text-nowrap">
                                  <p className="block text-background [font-family:Inter,_'Inter_Placeholder',_sans-serif] text-base font-medium leading-[1.3125rem] tracking-[-0.48px] [font-feature-settings:'blwf',_'cv03',_'cv04',_'cv09',_'cv11']" dir="auto">
                                    Explore the workspace
                                  </p>
                                </div>
                              </div>
                              <div className="w-[12.2375rem] h-full block absolute top-0 left-0 z-1 min-w-0 rounded-[100px] shrink-0 bg-foreground shadow-[var(--clr-1)_0px_2px_10px_0px] after:content-[''] after:block after:absolute after:inset-0 after:w-[12.2375rem] after:h-[2.55rem] after:rounded-tl-[100px]" />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-[567.1px] h-full block absolute top-0 left-0 z-0 opacity-3 min-w-0 shrink-0 overflow-clip max-lg:hidden 2xl:w-[35.7625rem]" style={{ maskImage: "radial-gradient(50% 50%, var(--foreground) 0%, var(--clr-5) 100%)" }}>
                    <div className="w-[567.1px] h-full block absolute top-0 left-0 [background-size:189px] max-lg:hidden 2xl:w-[35.7625rem]" style={{ backgroundImage: "url(\"/assets/nexura/svg/7f677b46bd48.svg\")" }} />
                  </div>
                </div>
                <div className="contents min-w-0">
                  <div className="h-[767.1px] block absolute top-0 inset-x-0 z-0 shrink-0 max-md:h-[41.6375rem] md:max-lg:h-[38.1375rem] 2xl:h-[48.2625rem]">
                    <div className="h-full block relative">
                      <div className="w-px h-[759.1px] block absolute top-1 left-1 z-8 shrink-0 max-md:h-[41.1375rem] md:max-lg:h-[37.6375rem] 2xl:h-[47.7625rem]">
                        <div className="w-px h-full block relative overflow-hidden after:content-[''] after:block after:absolute after:inset-y-0 after:-right-px after:left-0 after:w-0.5" />
                      </div>
                      <div className="w-px h-[759.1px] block absolute top-1 right-1 z-8 shrink-0 max-md:h-[41.1375rem] md:max-lg:h-[37.6375rem] 2xl:h-[47.7625rem]">
                        <div className="w-px h-full block relative overflow-hidden after:content-[''] after:block after:absolute after:inset-y-0 after:-right-px after:left-0 after:w-0.5" />
                      </div>
                      <div className="h-px block absolute inset-x-0 z-9 shrink-0">
                        <div className="h-px flex relative justify-center items-center content-center">
                          <div className="w-2.5 h-2.5 block relative shrink-0 overflow-hidden bg-background after:content-[''] after:block after:absolute after:inset-0 after:w-2.5 after:h-2.5" />
                          <div className="w-[98.5%] h-full block relative grow shrink-0 basis-0 overflow-hidden max-md:w-[94.5%] md:max-lg:w-[97.5%] after:content-[''] after:block after:absolute after:top-0 after:-bottom-px after:inset-x-0 after:h-0.5" />
                          <div className="w-2.5 h-2.5 block relative shrink-0 overflow-hidden bg-background after:content-[''] after:block after:absolute after:inset-0 after:w-2.5 after:h-2.5" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section className="w-full flex relative px-5 justify-center items-center content-center shrink-0 gap-2.5 max-lg:px-4 max-lg:flex-col" id="solution">
              <div className="w-full max-w-312.5 flex relative z-2 py-25 px-16 flex-col justify-start items-center content-center grow shrink-0 basis-0 gap-16 max-lg:py-12 max-lg:px-0 max-lg:gap-10 max-lg:grow-[initial] max-lg:basis-[initial]">
                <ScrollAppear className="block relative z-1 w-full max-w-150 shrink-0 max-lg:max-w-none">
                  <div className="flex relative max-w-full flex-col justify-center items-center content-center gap-5">
                    <div className="w-150 flex relative flex-col justify-start shrink-0 max-md:w-full">
                      <h2 className="block [font-family:Inter,_'Inter_Placeholder',_sans-serif] text-[2.5rem] font-medium leading-12 tracking-[-1.6px] text-center text-balance [font-feature-settings:'blwf',_'cv03',_'cv04',_'cv09',_'cv11'] max-lg:text-[1.75rem] max-lg:leading-[2.125rem] max-lg:tracking-[-1.12px]" data-component="heading" dir="auto">
                        Four parties, one EHC workspace.
                      </h2>
                    </div>
                    <div className="w-120 flex relative flex-col justify-start shrink-0 max-md:w-full">
                      <p className="block text-muted-foreground [font-family:Inter,_'Inter_Placeholder',_sans-serif] text-lg leading-[1.5625rem] tracking-[-0.54px] text-center text-pretty [font-feature-settings:'blwf',_'cv03',_'cv04',_'cv09',_'cv11'] max-lg:text-base max-lg:leading-[1.45] max-lg:tracking-[-0.48px]" dir="auto">
                        Schools, families, specialists, and councils. The school consultation tool ships first; the other workspaces are on the roadmap.
                      </p>
                    </div>
                  </div>
                </ScrollAppear>
                <div className="w-full flex relative z-1 justify-start items-start content-start shrink-0 gap-10 max-lg:flex-col max-lg:gap-4">
                  <SolutionsStickyNav />
                  <div className="w-[52.8rem] flex relative flex-col justify-start items-center content-center grow-[4] shrink-0 basis-0 gap-10 overflow-clip max-md:w-full max-lg:w-full max-lg:gap-16 md:max-lg:w-179 2xl:w-[53.3rem]">
                    <ScrollAppear className="w-[52.8rem] grid relative justify-center shrink-0 gap-10 [grid-auto-rows:minmax(0px,_1fr)] overflow-clip grid-cols-2 max-md:w-full max-lg:flex max-lg:flex-col max-lg:items-start max-lg:content-start max-lg:gap-6 max-lg:grid-cols-[repeat(2,_minmax(50px,_1fr))] md:max-lg:w-179 2xl:w-[53.3rem]" id="solution-1" style={{ scrollMarginTop: "7rem" }}>
                      <div className="w-full flex relative flex-col justify-center items-start content-start self-center shrink-0 gap-4 overflow-clip max-lg:[align-self:initial]">
                        {/* Per-section audience badge — desktop only; mobile uses sticky tabs */}
                        <div className="hidden">
                          <div className="hidden">
                            <div className="hidden">
                              <p className="hidden" dir="auto">
                                For schools
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="w-[25.15rem] flex relative flex-col justify-start shrink-0 max-md:w-full md:max-lg:w-179 2xl:w-[25.4rem]">
                          <h4 className="block [font-family:Inter,_'Inter_Placeholder',_sans-serif] text-[1.75rem] font-medium leading-[2.4375rem] tracking-[-1.12px] text-balance [font-feature-settings:'blwf',_'cv03',_'cv04',_'cv09',_'cv11'] max-lg:text-xl max-lg:leading-7 max-lg:tracking-[-0.8px]" data-component="heading" dir="auto">
                            Answer LA EHC consultations within 15 calendar days.
                          </h4>
                        </div>
                        <div className="w-[25.15rem] flex relative flex-col justify-start shrink-0 max-md:w-full md:max-lg:w-179 2xl:w-[25.4rem]">
                          <p className="block text-muted-foreground [font-family:Inter,_'Inter_Placeholder',_sans-serif] text-base leading-[1.375rem] tracking-[-0.48px] text-balance [font-feature-settings:'blwf',_'cv03',_'cv04',_'cv09',_'cv11']" dir="auto">
                            Unisen surfaces the clock, consolidates needs advice, flags vague provision, and helps SENCOs draft a clear statutory response.
                          </p>
                        </div>
                      </div>
                      <div className="w-[25.15rem] h-80 flex relative flex-col justify-center items-center content-center [align-self:start] shrink-0 gap-2.5 overflow-clip bg-surface max-md:w-full max-lg:[align-self:initial] md:max-lg:w-179 2xl:w-[25.4rem]">
                        <div className="w-[25.15rem] h-80 flex relative z-2 p-6 flex-col justify-center items-center content-center grow shrink-0 basis-0 gap-2 max-md:w-full md:max-lg:w-179 2xl:w-[25.4rem]" style={{ maskImage: "linear-gradient(var(--clr-8) 15%, var(--foreground) 36%, var(--foreground) 63%, var(--clr-8) 85%)" }}>
                          <div className="w-[22.15rem] h-full block relative shrink-0 max-md:w-full md:max-lg:w-167 2xl:w-[22.4rem]">
                            <MediaTileMarquee tiles={MediaTile_data} styles={MediaTile_styles} />
                          </div>
                        </div>
                      </div>
                    </ScrollAppear>
                    <ScrollAppear className="w-[52.8rem] grid relative justify-center shrink-0 gap-10 [grid-auto-rows:minmax(0px,_1fr)] overflow-clip grid-cols-2 max-md:w-full max-lg:flex max-lg:flex-col max-lg:items-start max-lg:content-start max-lg:gap-6 max-lg:grid-cols-[repeat(2,_minmax(50px,_1fr))] md:max-lg:w-179 2xl:w-[53.3rem]" id="solution-2" style={{ scrollMarginTop: "7rem" }} delay={0.05}>
                      <div className="w-full flex relative flex-col justify-center items-start content-start self-center shrink-0 gap-2.5 max-lg:[align-self:initial]">
                        <div className="w-[25.15rem] flex relative flex-col justify-start shrink-0 max-md:w-full max-lg:order-[1] md:max-lg:w-179 2xl:w-[25.4rem]">
                          <h4 className="block [font-family:Inter,_'Inter_Placeholder',_sans-serif] text-[1.75rem] font-medium leading-[2.4375rem] tracking-[-1.12px] text-balance [font-feature-settings:'blwf',_'cv03',_'cv04',_'cv09',_'cv11'] max-lg:text-xl max-lg:leading-7 max-lg:tracking-[-0.8px]" data-component="heading" dir="auto">
                            Review a draft EHC plan with the same shared timeline.
                          </h4>
                        </div>
                        <div className="w-[25.15rem] flex relative flex-col justify-start shrink-0 max-md:w-full max-lg:order-[2] md:max-lg:w-179 2xl:w-[25.4rem]">
                          <p className="block text-muted-foreground [font-family:Inter,_'Inter_Placeholder',_sans-serif] text-base leading-[1.375rem] tracking-[-0.48px] text-balance [font-feature-settings:'blwf',_'cv03',_'cv04',_'cv09',_'cv11']" dir="auto">
                            Parents and carers see what is due, capture issues and evidence, and prepare comments on draft provision without chasing paper.
                          </p>
                        </div>
                        <div className="hidden">
                          <div className="hidden">
                            <div className="hidden">
                              <p className="hidden" dir="auto">
                                For families
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="w-full h-80 flex relative justify-center items-center content-center [align-self:start] shrink-0 gap-2.5 overflow-clip bg-surface max-lg:[align-self:initial]">
                        <div className="basis-0 shrink-0 h-full flex relative z-2 flex-col justify-center items-center content-center grow gap-2.5">
                          <div className="w-46.5 h-64 flex absolute top-8 left-[clamp(161.5px,_50%,_calc(100%_-_161.5px))] z-1 min-w-0 flex-col justify-center items-center content-center shrink-0 transform-[matrix(1,0,0,1,-93,0)]">
                            <ScrollAppear className="w-46.5 block relative z-1 shrink-0" delay={0.1}>
                              <div className="w-46.5 flex relative p-3 rounded-xl flex-col justify-start items-start content-start gap-2.5 bg-background shadow-[var(--clr-10)_0px_1px_20px_0px] after:content-[''] after:block after:absolute after:inset-0 after:w-46.5 after:h-[2.975rem] after:rounded-tl-xl">
                                <div className="w-full flex relative justify-between items-center content-center shrink-0">
                                  <div className="w-[7.1625rem] flex relative pr-3 justify-start items-center content-center grow shrink-0 basis-0 gap-2">
                                    <Icon10 />
                                    <div className="w-[5.1125rem] flex relative flex-col justify-start shrink-0 whitespace-pre text-nowrap">
                                      <p className="block [font-family:Inter,_'Inter_Placeholder',_sans-serif] text-base leading-[1.375rem] tracking-[-0.48px] [font-feature-settings:'blwf',_'cv03',_'cv04',_'cv09',_'cv11']" dir="auto">
                                        Advice in
                                      </p>
                                    </div>
                                  </div>
                                  <div className="w-[2.9625rem] flex relative py-0.5 px-2 rounded-[20px] flex-col justify-center items-center content-center shrink-0 gap-2.5 bg-clr-11">
                                    <div className="w-[1.9625rem] flex relative flex-col justify-start shrink-0 whitespace-pre text-nowrap">
                                      <p className="block text-muted-foreground [font-family:Inter,_'Inter_Placeholder',_sans-serif] text-sm leading-[1.25rem] tracking-[-0.42px] [font-feature-settings:'blwf',_'cv03',_'cv04',_'cv09',_'cv11']" dir="auto">
                                        Input
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </ScrollAppear>
                            <div className="w-0.5 h-[10.05rem] flex relative justify-center items-center content-center grow shrink-0 basis-0 gap-2.5">
                              <div className="w-0.5 h-full block absolute top-0 left-0 z-1 min-w-0 shrink-0 overflow-clip" style={{ backgroundImage: "linear-gradient(var(--clr-12) 0%, var(--clr-0) 100%)" }} />
                              <div className="w-0.5 h-[11.1875rem] block relative shrink-0">
                                <div className="h-full flex relative justify-center items-center content-center justify-items-center overflow-hidden">
                                  <div className="w-full h-full flex relative justify-center items-center content-center justify-items-center">
                                    <Illustration2 />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <ScrollAppear className="w-46.5 block relative z-1 shrink-0" delay={0.2}>
                              <div className="w-46.5 flex relative p-3 rounded-xl flex-col justify-start items-start content-start gap-2.5 bg-background shadow-[var(--clr-10)_0px_1px_20px_0px] after:content-[''] after:block after:absolute after:inset-0 after:w-46.5 after:h-[2.975rem] after:rounded-tl-xl">
                                <div className="w-full flex relative justify-between items-center content-center shrink-0">
                                  <div className="w-[103.5px] flex relative pr-3 justify-start items-center content-center grow shrink-0 basis-0 gap-2">
                                    <Icon11 />
                                    <div className="w-[2.9625rem] flex relative flex-col justify-start shrink-0 whitespace-pre text-nowrap">
                                      <p className="block [font-family:Inter,_'Inter_Placeholder',_sans-serif] text-base leading-[1.375rem] tracking-[-0.48px] [font-feature-settings:'blwf',_'cv03',_'cv04',_'cv09',_'cv11']" dir="auto">
                                        Report
                                      </p>
                                    </div>
                                  </div>
                                  <div className="w-[58.5px] flex relative py-0.5 px-2 rounded-[20px] flex-col justify-center items-center content-center shrink-0 gap-2.5 bg-clr-11">
                                    <div className="w-[42.5px] flex relative flex-col justify-start shrink-0 whitespace-pre text-nowrap">
                                      <p className="block text-muted-foreground [font-family:Inter,_'Inter_Placeholder',_sans-serif] text-sm leading-[1.25rem] tracking-[-0.42px] [font-feature-settings:'blwf',_'cv03',_'cv04',_'cv09',_'cv11']" dir="auto">
                                        Output
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </ScrollAppear>
                          </div>
                          <ScrollAppear className="flex relative z-1 p-5 rounded-[100px] justify-center items-center content-center shrink-0 gap-2.5 shadow-[var(--clr-1)_0px_2px_10px_0px] after:content-[''] after:block after:absolute after:inset-0 after:w-18 after:h-18 after:rounded-tl-[100px]" style={{ backgroundImage: "linear-gradient(141deg, var(--clr-13) 0%, var(--foreground) 100%)" }} delay={0.15}>
                            <div className="w-8 h-8 block relative shrink-0" aria-hidden="true">
                              <div className="h-full block">
                                <Icon12 />
                              </div>
                            </div>
                          </ScrollAppear>
                        </div>
                        <div className="contents min-w-0">
                          <div className="h-80 block absolute top-0 inset-x-0 z-1 opacity-2 shrink-0 gap-2.5 overflow-clip">
                            <div className="h-full block absolute top-0 inset-x-0 [background-size:94.5px] [background-position:50%_50%]" style={{ backgroundImage: "url(\"/assets/nexura/svg/7f677b46bd48.svg\")" }} />
                          </div>
                        </div>
                      </div>
                    </ScrollAppear>
                    <ScrollAppear className="w-[52.8rem] grid relative justify-center shrink-0 gap-10 [grid-auto-rows:minmax(0px,_1fr)] overflow-clip grid-cols-2 max-md:w-full max-lg:flex max-lg:flex-col max-lg:items-start max-lg:content-start max-lg:gap-6 max-lg:grid-cols-[repeat(2,_minmax(50px,_1fr))] md:max-lg:w-179 2xl:w-[53.3rem]" id="solution-3" style={{ scrollMarginTop: "7rem" }} delay={0.05}>
                      <div className="w-full flex relative flex-col justify-center items-start content-start self-center shrink-0 gap-2.5 max-lg:[align-self:initial]">
                        <div className="w-[25.15rem] flex relative flex-col justify-start shrink-0 max-md:w-full max-lg:order-[1] md:max-lg:w-179 2xl:w-[25.4rem]">
                          <h4 className="block [font-family:Inter,_'Inter_Placeholder',_sans-serif] text-[1.75rem] font-medium leading-[2.4375rem] tracking-[-1.12px] text-balance [font-feature-settings:'blwf',_'cv03',_'cv04',_'cv09',_'cv11'] max-lg:text-xl max-lg:leading-7 max-lg:tracking-[-0.8px]" data-component="heading" dir="auto">
                            Submit advice that meets the statutory specificity bar.
                          </h4>
                        </div>
                        <div className="w-[25.15rem] flex relative flex-col justify-start shrink-0 max-md:w-full max-lg:order-[2] md:max-lg:w-179 2xl:w-[25.4rem]">
                          <p className="block text-muted-foreground [font-family:Inter,_'Inter_Placeholder',_sans-serif] text-base leading-[1.375rem] tracking-[-0.48px] text-balance [font-feature-settings:'blwf',_'cv03',_'cv04',_'cv09',_'cv11']" dir="auto">
                            EP, SaLT, OT and other professionals share quantified advice on-platform, tied to the case clock, instead of vague reports lost in email.
                          </p>
                        </div>
                        <div className="hidden">
                          <div className="hidden">
                            <div className="hidden">
                              <p className="hidden" dir="auto">
                                For specialists
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="contents min-w-0">
                        <div className="w-full h-80 block relative [align-self:start] shrink-0 max-lg:[align-self:initial]">
                          <div className="h-80 flex relative p-6 flex-col justify-center items-center content-center gap-2.5 overflow-clip bg-surface cursor-default">
                            <ScrollAppear className="w-55 h-[18.05rem] flex absolute top-12.5 right-11.5 min-w-0 rounded-[11px] justify-center items-center content-center shrink-0 gap-2.5 shadow-[var(--clr-7)_-2px_5px_30px_0px] transform-[matrix(0.990268,0.139173,-0.139173,0.990268,0,0)] origin-[110px_144.398px] max-lg:h-71.5 max-lg:top-[2.5625rem] max-lg:right-[2.6875rem] max-lg:origin-[110px_143px]" delay={0.1}>
                              <div className="basis-full shrink-0 block relative z-2">
                                <div className="w-55 flex relative p-5 rounded-xl flex-col justify-start items-center content-center gap-5 overflow-clip bg-background after:content-[''] after:block after:absolute after:inset-0 after:w-55 after:h-[18.05rem] after:rounded-tl-xl max-lg:after:h-71.5">
                                  <div className="w-full flex relative flex-col justify-center items-start content-start shrink-0 gap-1">
                                    <div className="w-28 flex relative flex-col justify-start shrink-0 whitespace-pre text-nowrap max-lg:w-[99.5px]">
                                      <p className="block [font-family:Inter,_'Inter_Placeholder',_sans-serif] text-lg leading-[1.5625rem] tracking-[-0.54px] [font-feature-settings:'blwf',_'cv03',_'cv04',_'cv09',_'cv11'] max-lg:text-base max-lg:leading-[1.375rem] max-lg:tracking-[-0.48px]" dir="auto">
                                        Case activity
                                      </p>
                                    </div>
                                    <div className="w-[64.3px] flex relative flex-col justify-start shrink-0 whitespace-pre text-nowrap">
                                      <p className="block text-muted-foreground [font-family:Inter,_'Inter_Placeholder',_sans-serif] text-sm leading-[1.25rem] tracking-[-0.42px] [font-feature-settings:'blwf',_'cv03',_'cv04',_'cv09',_'cv11']" dir="auto">
                                        April 2026
                                      </p>
                                    </div>
                                  </div>
                                  <div className="w-full block relative shrink-0 aspect-square">
                                    <div className="w-45 h-full block absolute top-0">
                                      <img className="w-full h-45 block overflow-clip object-cover aspect-[auto_540/540]" data-component="image" alt="Chart UI" height="540" sizes="calc(220px - 40px)" src="/assets/nexura/images/6cda4b092417.png" srcSet="/assets/nexura/images/db6f8c07154b.png 512w, /assets/nexura/images/6cda4b092417.png 540w" width="540" />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </ScrollAppear>
                            <ScrollAppear className="w-55 h-[14.3rem] flex absolute top-[7.0625rem] left-9.5 z-2 min-w-0 rounded-[11px] flex-col justify-center items-center content-center shrink-0 gap-2.5 shadow-[var(--clr-7)_-2px_5px_30px_0px] transform-[matrix(0.997564,-0.0697565,0.0697565,0.997564,0,0)] origin-[110px_114.398px] max-lg:h-56.5 max-lg:origin-[110px_113px]" delay={0.2}>
                              <div className="w-55 block relative z-2 shrink-0">
                                <div className="w-55 flex relative p-5 rounded-xl flex-col justify-start items-center content-center gap-5 overflow-clip bg-background after:content-[''] after:block after:absolute after:inset-0 after:w-55 after:h-[14.3rem] after:rounded-tl-xl max-lg:after:h-56.5">
                                  <div className="w-full flex relative flex-col justify-center items-start content-start shrink-0 gap-1">
                                    <div className="w-[142.3px] flex relative flex-col justify-start shrink-0 whitespace-pre text-nowrap max-lg:w-[126.5px]">
                                      <p className="block [font-family:Inter,_'Inter_Placeholder',_sans-serif] text-lg leading-[1.5625rem] tracking-[-0.54px] [font-feature-settings:'blwf',_'cv03',_'cv04',_'cv09',_'cv11'] max-lg:text-base max-lg:leading-[1.375rem] max-lg:tracking-[-0.48px]" dir="auto">
                                        Deadline trend
                                      </p>
                                    </div>
                                    <div className="w-[5.5125rem] flex relative flex-col justify-start shrink-0 whitespace-pre text-nowrap">
                                      <p className="block text-muted-foreground [font-family:Inter,_'Inter_Placeholder',_sans-serif] text-sm leading-[1.25rem] tracking-[-0.42px] [font-feature-settings:'blwf',_'cv03',_'cv04',_'cv09',_'cv11']" dir="auto">
                                        Last 6 months
                                      </p>
                                    </div>
                                  </div>
                                  <div className="w-full block relative shrink-0 aspect-[1.5/1]">
                                    <div className="w-45 h-full block absolute top-0">
                                      <img className="w-full h-30 block overflow-clip object-cover aspect-[auto_540/360]" data-component="image" alt="" height="360" sizes="calc(220px - 40px)" src="/assets/nexura/images/5c45c3d8fa0e.png" srcSet="/assets/nexura/images/5328bd1474ed.png 512w, /assets/nexura/images/5c45c3d8fa0e.png 540w" width="540" />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </ScrollAppear>
                          </div>
                        </div>
                      </div>
                    </ScrollAppear>
                    <ScrollAppear className="w-[52.8rem] grid relative justify-center shrink-0 gap-10 [grid-auto-rows:minmax(0px,_1fr)] overflow-clip grid-cols-2 max-md:w-full max-lg:flex max-lg:flex-col max-lg:items-start max-lg:content-start max-lg:gap-6 max-lg:grid-cols-[repeat(2,_minmax(50px,_1fr))] md:max-lg:w-179 2xl:w-[53.3rem]" id="solution-4" style={{ scrollMarginTop: "7rem" }} delay={0.05}>
                      <div className="w-full flex relative flex-col justify-center items-start content-start self-center shrink-0 gap-2.5 max-lg:[align-self:initial]">
                        <div className="w-[25.15rem] flex relative flex-col justify-start shrink-0 max-md:w-full max-lg:order-[1] md:max-lg:w-179 2xl:w-[25.4rem]">
                          <h4 className="block [font-family:Inter,_'Inter_Placeholder',_sans-serif] text-[1.75rem] font-medium leading-[2.4375rem] tracking-[-1.12px] text-balance [font-feature-settings:'blwf',_'cv03',_'cv04',_'cv09',_'cv11'] max-lg:text-xl max-lg:leading-7 max-lg:tracking-[-0.8px]" data-component="heading" dir="auto">
                            See every open consultation and response in one place.
                          </h4>
                        </div>
                        <div className="w-[25.15rem] flex relative flex-col justify-start shrink-0 max-md:w-full max-lg:order-[2] md:max-lg:w-179 2xl:w-[25.4rem]">
                          <p className="block text-muted-foreground [font-family:Inter,_'Inter_Placeholder',_sans-serif] text-base leading-[1.375rem] tracking-[-0.48px] text-balance [font-feature-settings:'blwf',_'cv03',_'cv04',_'cv09',_'cv11']" dir="auto">
                            Local authority teams issue consultations, track school responses against statutory clocks, and reduce chasing for missing advice or evidence.
                          </p>
                        </div>
                        <div className="hidden">
                          <div className="hidden">
                            <div className="hidden">
                              <p className="hidden" dir="auto">
                                For councils
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="w-[25.15rem] h-80 flex relative flex-col justify-center items-center content-center [align-self:start] shrink-0 gap-2.5 overflow-clip bg-surface max-md:w-full max-lg:[align-self:initial] md:max-lg:w-179 2xl:w-[25.4rem]">
                        <div
                          className="w-[25.15rem] h-80 flex relative z-2 p-6 flex-col justify-center items-stretch content-center grow shrink-0 basis-0 gap-3 max-md:w-full md:max-lg:w-179 2xl:w-[25.4rem]"
                          style={{ maskImage: "linear-gradient(var(--clr-8) 8%, var(--foreground) 22%, var(--foreground) 78%, var(--clr-8) 92%)" }}
                        >
                          {[
                            { school: "Riverside Primary", status: "Due in 3 days" },
                            { school: "Oakfield Academy", status: "Responded" },
                            { school: "St Mary's Secondary", status: "Advice missing" },
                          ].map((row, i) => (
                            <ScrollAppear
                              key={row.school}
                              className="w-full flex relative p-3 rounded-xl justify-between items-center content-center gap-2 bg-background shadow-[var(--clr-10)_0px_1px_20px_0px]"
                              delay={0.1 + i * 0.08}
                            >
                              <p className="block min-w-0 truncate [font-family:Inter,_'Inter_Placeholder',_sans-serif] text-base leading-[1.375rem] tracking-[-0.48px] [font-feature-settings:'blwf',_'cv03',_'cv04',_'cv09',_'cv11']" dir="auto">
                                {row.school}
                              </p>
                              <div className="shrink-0 flex relative py-0.5 px-2 rounded-[20px] flex-col justify-center items-center content-center gap-2.5 bg-clr-11">
                                <p className="block text-muted-foreground [font-family:Inter,_'Inter_Placeholder',_sans-serif] text-sm leading-[1.25rem] tracking-[-0.42px] [font-feature-settings:'blwf',_'cv03',_'cv04',_'cv09',_'cv11'] whitespace-nowrap" dir="auto">
                                  {row.status}
                                </p>
                              </div>
                            </ScrollAppear>
                          ))}
                        </div>
                      </div>
                    </ScrollAppear>
                  </div>
                </div>
                <div className="contents min-w-0">
                  <div className="block absolute inset-0 z-0 shrink-0">
                    <div className="h-full block relative">
                      <div className="w-px h-full block absolute top-1 left-1 z-8 shrink-0">
                        <div className="w-px h-full block relative overflow-hidden after:content-[''] after:block after:absolute after:inset-y-0 after:-right-px after:left-0 after:w-0.5" />
                      </div>
                      <div className="w-px h-full block absolute top-1 right-1 z-8 shrink-0">
                        <div className="w-px h-full block relative overflow-hidden after:content-[''] after:block after:absolute after:inset-y-0 after:-right-px after:left-0 after:w-0.5" />
                      </div>
                      <div className="h-px block absolute bottom-0 inset-x-0 z-9 shrink-0">
                        <div className="h-px flex relative justify-center items-center content-center">
                          <div className="w-2.5 h-2.5 block relative shrink-0 overflow-hidden bg-background after:content-[''] after:block after:absolute after:inset-0 after:w-2.5 after:h-2.5" />
                          <div className="w-[98.5%] h-full block relative grow shrink-0 basis-0 overflow-hidden max-md:w-[94.5%] md:max-lg:w-[97.5%] after:content-[''] after:block after:absolute after:top-0 after:-bottom-px after:inset-x-0 after:h-0.5" />
                          <div className="w-2.5 h-2.5 block relative shrink-0 overflow-hidden bg-background after:content-[''] after:block after:absolute after:inset-0 after:w-2.5 after:h-2.5" />
                        </div>
                      </div>
                      <div className="h-px block absolute inset-x-0 z-9 shrink-0">
                        <div className="h-px flex relative justify-center items-center content-center">
                          <div className="w-2.5 h-2.5 block relative shrink-0 overflow-hidden bg-background after:content-[''] after:block after:absolute after:inset-0 after:w-2.5 after:h-2.5" />
                          <div className="w-[98.5%] h-full block relative grow shrink-0 basis-0 overflow-hidden max-md:w-[94.5%] md:max-lg:w-[97.5%] after:content-[''] after:block after:absolute after:top-0 after:-bottom-px after:inset-x-0 after:h-0.5" />
                          <div className="w-2.5 h-2.5 block relative shrink-0 overflow-hidden bg-background after:content-[''] after:block after:absolute after:inset-0 after:w-2.5 after:h-2.5" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <div className="contents">
              <div className="w-full h-120 block relative shrink-0 mb-12 max-lg:h-112.5 max-lg:mb-10">
                <section className="h-full flex relative px-5 justify-center items-center content-center gap-2.5 max-lg:px-1.5">
                  <div className="w-full max-w-312.5 h-full flex relative py-25 px-16 flex-col justify-start items-start content-start grow shrink-0 basis-0 gap-16 max-lg:py-16 max-lg:px-5">
                    <div className="w-full max-w-150 flex relative z-1 flex-col justify-center items-start content-start shrink-0 gap-5">
                      <div className="w-full block relative shrink-0">
                        <div className="w-150 flex relative flex-col justify-start shrink-0 max-md:w-[20.1875rem]">
                          <h2 className="block [font-family:Inter,_'Inter_Placeholder',_sans-serif] text-[2.5rem] font-medium leading-12 tracking-[-1.6px] text-left text-balance [font-feature-settings:'blwf',_'cv03',_'cv04',_'cv09',_'cv11'] max-lg:text-[1.75rem] max-lg:leading-[2.125rem] max-lg:tracking-[-1.12px]" data-component="heading" dir="auto">
                            Your next EHC consultation starts here.
                          </h2>
                        </div>
                      </div>
                      <div className="w-full flex relative justify-start items-center content-center shrink-0 gap-3 max-lg:flex-wrap">
                        <CtaButton label="Get started" variant="glass" brandSlide href="/contact" />
                        <CtaButton label="Talk to us" variant="glass" brandSlide href="/contact" />
                      </div>
                    </div>
                    <div className="w-310 h-full block absolute top-0 left-0 z-0 min-w-0 shrink-0 max-md:w-[22.6875rem] md:max-lg:w-189 2xl:w-312.5">
                      <div className="h-full block relative">
                        <div className="w-px h-118 block absolute top-1 left-1 z-8 shrink-0 max-lg:h-110.5">
                          <div className="w-px h-full block relative overflow-hidden after:content-[''] after:block after:absolute after:inset-y-0 after:-right-px after:left-0 after:w-0.5" />
                        </div>
                        <div className="w-px h-118 block absolute top-1 right-1 z-8 shrink-0 max-lg:h-110.5">
                          <div className="w-px h-full block relative overflow-hidden after:content-[''] after:block after:absolute after:inset-y-0 after:-right-px after:left-0 after:w-0.5" />
                        </div>
                        <div className="h-px block absolute bottom-0 inset-x-0 z-9 shrink-0">
                          <div className="h-px flex relative justify-center items-center content-center">
                            <div className="w-2.5 h-2.5 block relative shrink-0 overflow-hidden bg-background after:content-[''] after:block after:absolute after:inset-0 after:w-2.5 after:h-2.5" />
                            <div className="w-[98.5%] h-full block relative grow shrink-0 basis-0 overflow-hidden max-md:w-[94.5%] md:max-lg:w-[97.5%] after:content-[''] after:block after:absolute after:top-0 after:-bottom-px after:inset-x-0 after:h-0.5" />
                            <div className="w-2.5 h-2.5 block relative shrink-0 overflow-hidden bg-background after:content-[''] after:block after:absolute after:inset-0 after:w-2.5 after:h-2.5" />
                          </div>
                        </div>
                        <div className="h-px block absolute inset-x-0 z-9 shrink-0">
                          <div className="h-px flex relative justify-center items-center content-center">
                            <div className="w-2.5 h-2.5 block relative shrink-0 overflow-hidden bg-background after:content-[''] after:block after:absolute after:inset-0 after:w-2.5 after:h-2.5" />
                            <div className="w-[98.5%] h-full block relative grow shrink-0 basis-0 overflow-hidden max-md:w-[94.5%] md:max-lg:w-[97.5%] after:content-[''] after:block after:absolute after:top-0 after:-bottom-px after:inset-x-0 after:h-0.5" />
                            <div className="w-2.5 h-2.5 block relative shrink-0 overflow-hidden bg-background after:content-[''] after:block after:absolute after:inset-0 after:w-2.5 after:h-2.5" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="w-304 h-116 block absolute top-2 left-3 z-0 min-w-0 shrink-0 overflow-clip rounded-[1.25rem] max-md:w-[21.1875rem] max-md:rounded-xl max-lg:h-108.5 md:max-lg:w-183 2xl:w-306.5">
                      <div className="h-full block absolute top-0 inset-x-0">
                        <img className="w-full h-full block overflow-clip object-cover object-[42%_58%] max-lg:h-full" data-component="image" alt="Park path by a river with city skyline" height="930" sizes="calc(min(max(100vw - 40px, 1px), 1250px) - 24px)" src="/assets/nexura/images/cta-park-2387.jpg?v=5" srcSet="/assets/nexura/images/cta-park-512.jpg?v=5 512w, /assets/nexura/images/cta-park-1024.jpg?v=5 1024w, /assets/nexura/images/cta-park-2048.jpg?v=5 2048w, /assets/nexura/images/cta-park-2387.jpg?v=5 2432w" width="2432" />
                      </div>
                    </div>
                    <div className="w-310 h-full block absolute top-0 left-0 z-0 opacity-2 min-w-0 shrink-0 overflow-clip max-md:w-[22.6875rem] md:max-lg:w-189 2xl:w-312.5" style={{ maskImage: "linear-gradient(270deg, var(--clr-14) 3%, var(--clr-5) 86%)" }}>
                      <div className="h-full block absolute top-0 inset-x-0 [background-size:189px] max-lg:[background-size:94.5px] max-lg:[background-position:50%_50%]" style={{ backgroundImage: "url(\"/assets/nexura/svg/7f677b46bd48.svg\")" }} />
                    </div>
                  </div>
                </section>
              </div>
            </div>

          </div>
          <FooterSection2 />
        </div>
        <div className="block" id="template-overlay" />
      </div>
      {" "}
      <DittoMotion spec={{"waapi":[{"anchor":"motion-div","keyframes":[{"offset":null,"easing":"linear","composite":"auto","transform":"translateY(80px)","computedOffset":0},{"offset":null,"easing":"linear","composite":"auto","transform":"none","computedOffset":1}],"duration":800,"delay":600,"easing":"cubic-bezier(0.2, 0, 0.2, 1)","iterations":1,"direction":"normal","fill":"both"},{"anchor":"motion-div-2","keyframes":[{"offset":null,"easing":"linear","composite":"auto","transform":"translateY(80px)","computedOffset":0},{"offset":null,"easing":"linear","composite":"auto","transform":"none","computedOffset":1}],"duration":800,"delay":800,"easing":"cubic-bezier(0.2, 0, 0.2, 1)","iterations":1,"direction":"normal","fill":"both"},{"anchor":"motion-div-3","keyframes":[{"offset":null,"easing":"linear","composite":"auto","opacity":"0.001","computedOffset":0},{"offset":null,"easing":"linear","composite":"auto","opacity":"1","computedOffset":1}],"duration":800,"delay":800,"easing":"cubic-bezier(0.6, 0, 0.4, 1)","iterations":1,"direction":"normal","fill":"both"},{"anchor":"motion-div-4","keyframes":[{"offset":null,"easing":"linear","composite":"auto","opacity":"0.001","computedOffset":0},{"offset":null,"easing":"linear","composite":"auto","opacity":"1","computedOffset":1}],"duration":800,"delay":800,"easing":"cubic-bezier(0.6, 0, 0.4, 1)","iterations":1,"direction":"normal","fill":"both"}],"rotators":[],"reveals":[],"marquees":[]}} />
    </>
  );
}
