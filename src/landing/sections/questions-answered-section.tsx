import CtaButton from "../components/cta-button";
import MediaCard3 from "../components/media-card3";
import { mediaCard3Data as mediaCard3DataContent } from "../content";
/** Questions Answered section. */
export default function QuestionsAnsweredSection({ mediaCard3Data = mediaCard3DataContent } = {}) {
  return (
    <section className="w-full flex relative py-20 px-5 justify-center items-center content-center shrink-0 max-lg:pt-10 max-lg:pb-30 max-lg:px-4 max-lg:flex-col">
      <div className="w-full max-w-310 flex relative justify-center items-start content-start grow shrink-0 basis-0 gap-10 max-lg:flex-col max-lg:gap-5 max-lg:grow-[initial] max-lg:basis-[initial]">
        <div className="h-[7.8125rem] block absolute right-[44.3125rem] -bottom-[4.8125rem] left-0 z-0 min-w-0 shrink-0 overflow-hidden max-lg:right-0.5 max-lg:-bottom-[8.4375rem]">
          <div className="h-full block absolute top-0 inset-x-0">
            <img className="w-full h-[7.8125rem] block overflow-clip object-cover aspect-[auto_1062/250]" data-component="image" alt="Decorative mosaic texture in Unisen workspace" height="250" sizes="531px" src="/assets/cloned/images/76a63beb3a37.png" srcSet="/assets/cloned/images/48673e02bc45.png 512w, /assets/cloned/images/9565004ebd6a.png 1024w, /assets/cloned/images/76a63beb3a37.png 1062w" width="1062" />
          </div>
        </div>
        <div className="w-150 flex relative flex-col justify-end items-start content-start grow shrink-0 basis-0 gap-5 max-md:w-[21.4375rem] max-lg:justify-start max-lg:grow-[initial] max-lg:basis-[initial] md:max-lg:w-184">
          <div className="w-150 flex relative flex-col justify-start items-start content-start shrink-0 gap-3 max-md:w-[21.4375rem] md:max-lg:w-184">
            <div className="w-150 flex relative flex-col justify-start shrink-0 whitespace-pre-wrap [word-break:break-word] [overflow-wrap:break-word] max-md:w-[21.4375rem] md:max-lg:w-184">
              <p className="block text-accent [font-family:Geist,_'Geist_Placeholder',_sans-serif] text-[0.875rem] font-semibold text-balance [font-feature-settings:'blwf',_'cv03',_'cv04',_'cv09',_'cv11']" dir="auto">
                FAQ
              </p>
            </div>
            <div className="w-150 flex relative flex-col justify-start shrink-0 max-md:w-[21.4375rem] md:max-lg:w-184">
              <h2 className="block text-color-001 [font-family:'DM_Sans',_'DM_Sans_Placeholder',_sans-serif] text-[3.25rem] font-medium leading-[3.4375rem] text-balance [font-feature-settings:'blwf',_'cv03',_'cv04',_'cv09',_'cv11'] max-lg:text-[2rem] max-lg:leading-[2.125rem]" data-component="heading" dir="auto">
                Questions
                <br className="inline" />
                answered.
              </h2>
            </div>
          </div>
          <div className="w-full flex relative flex-col justify-start items-start content-start shrink-0 gap-5 overflow-clip">
            <div className="w-105 flex relative flex-col justify-start shrink-0 whitespace-pre-wrap [word-break:break-word] [overflow-wrap:break-word] max-md:w-[21.4375rem] md:max-lg:w-184">
              <p className="block text-muted-foreground [font-family:Geist,_'Geist_Placeholder',_sans-serif] text-base leading-[1.1875rem] text-balance [font-feature-settings:'blwf',_'cv03',_'cv04',_'cv09',_'cv11']" dir="auto">
                Still curious?
              </p>
            </div>
            <div className="block relative shrink-0">
              <CtaButton label="Sign in" />
            </div>
          </div>
        </div>
        <div className="w-150 flex relative flex-col justify-start items-end content-end grow shrink-0 basis-0 gap-2 max-md:w-[21.4375rem] max-lg:grow-[initial] max-lg:basis-[initial] md:max-lg:w-184">
          {mediaCard3Data.map((d, i) => <MediaCard3 key={i} d={d} />)}
        </div>
      </div>
    </section>
  );
}
