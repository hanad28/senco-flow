import Tile from "../components/tile";
import Illustration from "../svgs/svg-illustration";
import { Tile_styles } from "../_styles";
import { tileData as tileDataContent } from "../content";
/** Ask To Done section. */
export default function AskToDoneSection({ tileData = tileDataContent } = {}) {
  return (
    <section className="w-full flex relative py-20 px-5 flex-col justify-center items-center content-center shrink-0 max-lg:py-10 max-lg:px-4">
      <div className="w-full max-w-310 flex relative flex-col justify-center items-center content-center shrink-0 gap-10 overflow-clip max-lg:gap-5">
        <div className="w-full flex relative flex-col justify-center items-center content-center shrink-0 gap-5">
          <div className="w-[56.5%] flex relative flex-col justify-start items-center content-center shrink-0 gap-3 max-lg:w-full">
            <div className="w-[86.3px] flex relative flex-col justify-start shrink-0 whitespace-pre text-nowrap">
              <p className="block text-accent [font-family:Geist,_'Geist_Placeholder',_sans-serif] text-[0.875rem] font-semibold whitespace-pre-wrap text-balance [font-feature-settings:'blwf',_'cv03',_'cv04',_'cv09',_'cv11']" dir="auto">
                How it works
              </p>
            </div>
            <div className="w-175 flex relative flex-col justify-start shrink-0 whitespace-pre-wrap [word-break:break-word] [overflow-wrap:break-word] max-md:w-[21.4375rem] md:max-lg:w-184">
              <h2 className="block text-muted [font-family:'DM_Sans',_'DM_Sans_Placeholder',_sans-serif] text-[3.25rem] italic leading-[3.4375rem] text-center text-balance [font-feature-settings:'blwf',_'cv03',_'cv04',_'cv09',_'cv11'] max-lg:text-[2rem] max-lg:leading-[2.125rem]" data-component="heading" dir="auto">
                <span className="inline text-color-001 font-medium not-italic">
                  From consultation
                </span>
                {" to a drafted response (demo submit). "}
              </h2>
            </div>
          </div>
        </div>
        <div className="w-full block relative shrink-0">
          <div className="w-full flex relative max-w-310 py-10 px-5 rounded-3xl flex-col justify-center items-center content-center gap-10 overflow-hidden">
            <div className="w-310 h-full block absolute top-0 min-w-0 rounded-3xl max-md:w-[21.4375rem] md:max-lg:w-184">
              <img className="w-full h-[58.8125rem] block rounded-3xl overflow-clip object-cover aspect-[auto_2320/1600] max-md:h-89 md:max-lg:h-153" data-component="image" alt="Unisen product preview" height="1600" sizes="min(100vw - 40px, 1240px)" src="/assets/cloned/images/9633a764f79a.png" srcSet="/assets/cloned/images/dea10715fed0.png 512w, /assets/cloned/images/3a1df6929e0e.png 1024w, /assets/cloned/images/373c0df9e74b.png 2048w, /assets/cloned/images/9633a764f79a.png 2320w" width="2320" />
            </div>
            <div className="w-[44%] flex relative justify-center items-center content-center shrink-0 gap-4 max-lg:w-full max-lg:justify-start max-lg:overflow-x-auto max-lg:overflow-y-hidden" data-ditto-id="style-div-3">
              {tileData.map((d, i) => <Tile key={i} d={d} styles={Tile_styles[i]} />)}
            </div>
            <div className="w-300 flex relative rounded-[25px] flex-col justify-center items-center content-center shrink-0 gap-2.5 overflow-clip bg-background max-md:w-[18.9375rem] max-lg:rounded-[15px] md:max-lg:w-174">
              <div className="w-300 block relative shrink-0 aspect-[1.53425/1] max-md:w-[18.9375rem] md:max-lg:w-174">
                <div className="block">
                  <Illustration />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
