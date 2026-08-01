import Logo3, { type Logo3Data } from "../components/logo3";
import { Logo3_styles, Logo3_styles2 } from "../_styles";
const Logo3_data: Logo3Data[] = [
    { ariahidden: "false", ariaposinset: "1", ariasetsize: "8", kind: "image" },
    { ariahidden: "false", ariaposinset: "2", ariasetsize: "8", kind: "image" },
    { ariahidden: "false", ariaposinset: "3", ariasetsize: "8", kind: "image" },
    { ariahidden: "false", ariaposinset: "4", ariasetsize: "8", kind: "image" },
    { ariahidden: "false", ariaposinset: "5", ariasetsize: "8", kind: "image" },
    { ariahidden: "false", ariaposinset: "6", ariasetsize: "8", kind: "image" },
    { ariahidden: "false", ariaposinset: "7", ariasetsize: "8", kind: "image" },
    { ariahidden: "false", ariaposinset: "8", ariasetsize: "8", kind: "image" },
    { ariahidden: "true" },
    { ariahidden: "true" },
    { ariahidden: "true" },
    { ariahidden: "true" },
    { ariahidden: "true" },
    { ariahidden: "true" },
    { ariahidden: "true" },
    { ariahidden: "true" }
];
const Logo3_data2: Logo3Data[] = [
    { ariahidden: "false", ariaposinset: "1", ariasetsize: "8", kind: "image" },
    { ariahidden: "false", ariaposinset: "2", ariasetsize: "8", kind: "image" },
    { ariahidden: "false", ariaposinset: "3", ariasetsize: "8", kind: "image" },
    { ariahidden: "false", ariaposinset: "4", ariasetsize: "8", kind: "image" },
    { ariahidden: "false", ariaposinset: "5", ariasetsize: "8", kind: "image" },
    { ariahidden: "false", ariaposinset: "6", ariasetsize: "8", kind: "image" },
    { ariahidden: "false", ariaposinset: "7", ariasetsize: "8", kind: "image" },
    { ariahidden: "false", ariaposinset: "8", ariasetsize: "8", kind: "image" },
    { ariahidden: "true" },
    { ariahidden: "true" }
];
/** Logo Cloud section. */
export default function LogoCloudSection2({ logo3Data = Logo3_data, logo3Data2 = Logo3_data2 } = {}) {
  return (
    <section className="w-full flex relative py-20 px-5 flex-col justify-start items-center content-center shrink-0 max-lg:py-10 max-lg:px-4">
      <div className="w-full max-w-310 flex relative flex-col justify-center items-center content-center shrink-0 gap-10 overflow-clip max-lg:gap-5">
        <div className="w-full flex relative flex-col justify-center items-center content-center shrink-0 gap-5">
          <div className="w-[56.5%] flex relative flex-col justify-start items-center content-center shrink-0 gap-3 max-lg:w-full">
            <div className="w-[5.0625rem] flex relative flex-col justify-start shrink-0 whitespace-pre text-nowrap max-md:w-[21.4375rem] max-lg:whitespace-pre-wrap max-lg:[word-break:break-word] max-lg:[overflow-wrap:break-word] max-lg:[text-wrap:initial] md:max-lg:w-184">
              <p className="block text-accent [font-family:Geist,_'Geist_Placeholder',_sans-serif] text-[0.875rem] font-semibold whitespace-pre-wrap text-balance [font-feature-settings:'blwf',_'cv03',_'cv04',_'cv09',_'cv11'] max-lg:text-center max-lg:[white-space:inherit]" dir="auto">
                Workspaces
              </p>
            </div>
            <div className="w-175 flex relative flex-col justify-start shrink-0 whitespace-pre-wrap [word-break:break-word] [overflow-wrap:break-word] max-md:w-[21.4375rem] md:max-lg:w-184">
              <h2 className="block text-muted [font-family:'DM_Sans',_'DM_Sans_Placeholder',_sans-serif] text-[3.25rem] italic leading-[3.4375rem] text-center text-balance [font-feature-settings:'blwf',_'cv03',_'cv04',_'cv09',_'cv11'] max-lg:text-[2rem] max-lg:leading-[2.125rem]" data-component="heading" dir="auto">
                <span className="inline text-color-001 font-medium not-italic">
                  {"School today. "}
                </span>
                Multi-party tomorrow.
              </h2>
            </div>
          </div>
          <div className="w-105 flex relative flex-col justify-start shrink-0 whitespace-pre-wrap [word-break:break-word] [overflow-wrap:break-word] max-md:w-[21.4375rem] md:max-lg:w-184">
            <p className="block text-muted-foreground [font-family:Geist,_'Geist_Placeholder',_sans-serif] text-base leading-[1.1875rem] text-center text-balance [font-feature-settings:'blwf',_'cv03',_'cv04',_'cv09',_'cv11']" dir="auto">
              The prototype ships school and family demo workspaces today. Coordinating with councils, health, and live LA exchange is the longer-term direction.
            </p>
          </div>
        </div>
        <div className="w-200 h-[14.1875rem] flex relative rounded-xl flex-col justify-center items-center content-center shrink-0 gap-5 overflow-hidden max-md:w-[21.4375rem] md:max-lg:w-184" style={{ maskImage: "radial-gradient(50% 122%, var(--foreground) 0%, var(--clr-1) 80.6306%, var(--clr-2) 100%)" }}>
          <div className="w-full flex relative rounded-[10px] justify-start items-center content-center shrink-0 gap-5 overflow-hidden">
            <ul className="flex relative max-w-full max-h-full justify-start items-center gap-5 [list-style-type:none] list-outside transform-[matrix(1,0,0,1,-910.332,0)] max-md:transform-[matrix(1,0,0,1,-657.304,0)] md:max-lg:transform-[matrix(1,0,0,1,-656.666,0)] 2xl:transform-[matrix(1,0,0,1,-809.078,0)]" data-ditto-id="motion-ul">
              {logo3Data.map((d, i) => <Logo3 key={i} d={d} styles={Logo3_styles[i]} />)}
            </ul>
          </div>
          {" "}
          <div className="w-200 flex relative rounded-[10px] justify-start items-center content-center shrink-0 gap-5 overflow-hidden max-md:w-[21.4375rem] md:max-lg:w-184">
            <ul className="flex relative max-w-full max-h-full justify-start items-center gap-5 [list-style-type:none] list-outside transform-[matrix(1,0,0,1,-17.668,0)] max-md:transform-[matrix(1,0,0,1,-14.696,0)] md:max-lg:transform-[matrix(1,0,0,1,-15.334,0)] 2xl:transform-[matrix(1,0,0,1,-118.922,0)]">
              {logo3Data2.map((d, i) => <Logo3 key={i} d={d} styles={Logo3_styles2[i]} />)}
            </ul>
          </div>
          {" "}
        </div>
      </div>
    </section>
  );
}
