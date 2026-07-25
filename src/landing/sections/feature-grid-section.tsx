import FeatureGridItem from "../components/feature-grid-item";
import { features as featuresContent } from "../content";
/** Feature Grid section. */
export default function FeatureGridSection({ features = featuresContent } = {}) {
  return (
    <section className="w-full flex relative py-20 px-5 flex-col justify-start items-center content-center shrink-0 max-lg:py-10 max-lg:px-4">
      <div className="w-full max-w-310 flex relative flex-col justify-center items-center content-center shrink-0 gap-10 max-lg:gap-5">
        <div className="w-full flex relative justify-between items-end content-end shrink-0 max-lg:flex-col max-lg:justify-start max-lg:gap-5">
          <div className="w-[43.5%] flex relative flex-col justify-start items-start content-start shrink-0 gap-3 max-lg:w-full">
            <div className="w-135 flex relative flex-col justify-start shrink-0 whitespace-pre-wrap [word-break:break-word] [overflow-wrap:break-word] max-md:w-[21.4375rem] md:max-lg:w-184">
              <p className="block text-accent [font-family:Geist,_'Geist_Placeholder',_sans-serif] text-[0.875rem] font-semibold text-balance [font-feature-settings:'blwf',_'cv03',_'cv04',_'cv09',_'cv11']" dir="auto">
                Why Unisen
              </p>
            </div>
            <div className="w-135 flex relative flex-col justify-start shrink-0 max-md:w-[21.4375rem] md:max-lg:w-184">
              <h2 className="block text-color-001 [font-family:'DM_Sans',_'DM_Sans_Placeholder',_sans-serif] text-[3.25rem] font-medium leading-[3.4375rem] text-balance [font-feature-settings:'blwf',_'cv03',_'cv04',_'cv09',_'cv11'] max-lg:text-[2rem] max-lg:leading-[2.125rem]" data-component="heading" dir="auto">
                Visibility, execution,
                <br className="inline" />
                and clear communication
              </h2>
            </div>
          </div>
          <div className="w-105 flex relative flex-col justify-start shrink-0 whitespace-pre-wrap [word-break:break-word] [overflow-wrap:break-word] max-md:w-[21.4375rem] md:max-lg:w-184">
            <p className="block text-muted-foreground [font-family:Geist,_'Geist_Placeholder',_sans-serif] text-base leading-[1.1875rem] text-balance [font-feature-settings:'blwf',_'cv03',_'cv04',_'cv09',_'cv11']" dir="auto">
              Most tools track cases or store documents. Unisen starts with the SENCO job: answer LA EHC consultations on time, then helps with the drafting work inside a calm school workspace.
            </p>
          </div>
        </div>
        <div className="w-full block relative shrink-0 max-lg:flex max-lg:flex-col max-lg:justify-start max-lg:items-start max-lg:content-start max-lg:gap-5 max-lg:overflow-clip">
          <div className="w-full max-w-310 h-105 flex relative flex-nowrap justify-start items-stretch content-stretch gap-3 overflow-visible max-md:w-[21.4375rem] max-md:h-auto max-lg:flex-col max-lg:h-auto max-lg:max-w-full max-lg:shrink-0 md:max-lg:w-184">
            {features.map((d) => <FeatureGridItem key={d.variant} d={d} />)}
          </div>
          <div className="hidden max-lg:block max-lg:relative max-lg:shrink-0">
            <div className="hidden max-md:h-[23.625rem] max-lg:flex max-lg:relative max-lg:p-2 max-lg:rounded-xl max-lg:flex-col max-lg:justify-center max-lg:items-start max-lg:content-start max-lg:overflow-clip max-lg:bg-color-002 md:max-lg:h-[594.9px]">
              <div className="hidden max-lg:w-full max-lg:block max-lg:relative max-lg:rounded-xl max-lg:shrink-0 max-lg:overflow-hidden max-lg:aspect-[1.56911/1]">
                <div className="hidden max-lg:h-full max-lg:block max-lg:absolute max-lg:top-0 max-lg:inset-x-0 max-lg:rounded-xl">
                  <img className="hidden max-lg:w-full max-md:h-52 max-lg:block max-lg:rounded-xl max-lg:overflow-clip max-lg:object-cover max-lg:aspect-[auto_772/492] md:max-lg:h-[28.6875rem]" alt="Unisen product preview" height="492" sizes="calc(min(100vw - 32px, 1240px) - 16px)" src="/assets/cloned/images/fd6ba2aa7f6c.png" srcSet="/assets/cloned/images/f1438ce833f0.png 512w, /assets/cloned/images/fd6ba2aa7f6c.png 772w" width="772" />
                </div>
              </div>
              <div className="hidden max-md:w-[20.4375rem] max-lg:flex max-lg:relative max-lg:p-5 max-lg:flex-col max-lg:justify-center max-lg:items-center max-lg:content-center max-lg:shrink-0 max-lg:gap-5 md:max-lg:w-180">
                <div className="hidden max-md:w-[17.9375rem] max-lg:flex max-lg:relative max-lg:flex-col max-lg:justify-start max-lg:shrink-0 max-lg:whitespace-pre-wrap max-lg:[word-break:break-word] max-lg:[overflow-wrap:break-word] md:max-lg:w-170">
                  <h3 className="hidden max-lg:block max-lg:text-color-001 max-lg:[font-family:'DM_Sans',_'DM_Sans_Placeholder',_sans-serif] max-lg:text-2xl max-lg:font-medium max-lg:leading-[1.625rem] max-lg:text-balance max-lg:[font-feature-settings:'blwf',_'cv03',_'cv04',_'cv09',_'cv11']" dir="auto">
                    Execution assistance
                  </h3>
                </div>
                <div className="hidden max-md:w-[17.9375rem] max-lg:flex max-lg:relative max-lg:flex-col max-lg:justify-start max-lg:shrink-0 max-lg:whitespace-pre-wrap max-lg:[word-break:break-word] max-lg:[overflow-wrap:break-word] md:max-lg:w-170">
                  <p className="hidden max-lg:block max-lg:text-muted-foreground max-lg:[font-family:Geist,_'Geist_Placeholder',_sans-serif] max-lg:text-sm max-lg:leading-[1.0625rem] max-lg:text-balance max-lg:[font-feature-settings:'blwf',_'cv03',_'cv04',_'cv09',_'cv11']" dir="auto">
                    Review needs and provision, structure your statutory response, and flag vague provision language. Structured drafting support in the prototype, not automated AI.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="hidden max-lg:w-full max-lg:block max-lg:relative max-lg:shrink-0">
            <div className="hidden max-md:h-[23.625rem] max-lg:flex max-lg:relative max-lg:p-2 max-lg:rounded-xl max-lg:flex-col max-lg:justify-center max-lg:items-start max-lg:content-start max-lg:overflow-clip max-lg:bg-color-002 md:max-lg:h-[594.9px]">
              <div className="hidden max-lg:w-full max-lg:block max-lg:relative max-lg:rounded-xl max-lg:shrink-0 max-lg:overflow-hidden max-lg:aspect-[1.56911/1]">
                <div className="hidden max-lg:h-full max-lg:block max-lg:absolute max-lg:top-0 max-lg:inset-x-0 max-lg:rounded-xl">
                  <img className="hidden max-lg:w-full max-md:h-52 max-lg:block max-lg:rounded-xl max-lg:overflow-clip max-lg:object-cover max-lg:aspect-[auto_772/492] md:max-lg:h-[28.6875rem]" alt="Unisen product preview" height="492" sizes="calc(min(100vw - 32px, 1240px) - 16px)" src="/assets/cloned/images/967ab053fa72.png" srcSet="/assets/cloned/images/ffbb785cd01b.png 512w, /assets/cloned/images/967ab053fa72.png 772w" width="772" />
                </div>
              </div>
              <div className="hidden max-md:w-[20.4375rem] max-lg:flex max-lg:relative max-lg:p-5 max-lg:flex-col max-lg:justify-center max-lg:items-center max-lg:content-center max-lg:shrink-0 max-lg:gap-5 md:max-lg:w-180">
                <div className="hidden max-md:w-[17.9375rem] max-lg:flex max-lg:relative max-lg:flex-col max-lg:justify-start max-lg:shrink-0 max-lg:whitespace-pre-wrap max-lg:[word-break:break-word] max-lg:[overflow-wrap:break-word] md:max-lg:w-170">
                  <h3 className="hidden max-lg:block max-lg:text-color-001 max-lg:[font-family:'DM_Sans',_'DM_Sans_Placeholder',_sans-serif] max-lg:text-2xl max-lg:font-medium max-lg:leading-[1.625rem] max-lg:text-balance max-lg:[font-feature-settings:'blwf',_'cv03',_'cv04',_'cv09',_'cv11']" dir="auto">
                    School & family workspaces
                  </h3>
                </div>
                <div className="hidden max-md:w-[17.9375rem] max-lg:flex max-lg:relative max-lg:flex-col max-lg:justify-start max-lg:shrink-0 max-lg:whitespace-pre-wrap max-lg:[word-break:break-word] max-lg:[overflow-wrap:break-word] md:max-lg:w-170">
                  <p className="hidden max-lg:block max-lg:text-muted-foreground max-lg:[font-family:Geist,_'Geist_Placeholder',_sans-serif] max-lg:text-sm max-lg:leading-[1.0625rem] max-lg:text-balance max-lg:[font-feature-settings:'blwf',_'cv03',_'cv04',_'cv09',_'cv11']" dir="auto">
                    The prototype includes separate school and family workspaces for consultation responses and draft-plan review. Live multi-party exchange with councils and health is on the roadmap.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="hidden max-lg:block max-lg:relative max-lg:shrink-0">
            <div className="hidden max-md:h-[23.625rem] max-lg:flex max-lg:relative max-lg:p-2 max-lg:rounded-xl max-lg:flex-col max-lg:justify-center max-lg:items-start max-lg:content-start max-lg:overflow-clip max-lg:bg-color-002 md:max-lg:h-[594.9px]">
              <div className="hidden max-lg:w-full max-lg:block max-lg:relative max-lg:rounded-xl max-lg:shrink-0 max-lg:overflow-hidden max-lg:aspect-[1.56911/1]">
                <div className="hidden max-lg:h-full max-lg:block max-lg:absolute max-lg:top-0 max-lg:inset-x-0 max-lg:rounded-xl">
                  <img className="hidden max-lg:w-full max-md:h-52 max-lg:block max-lg:rounded-xl max-lg:overflow-clip max-lg:object-cover max-lg:aspect-[auto_772/492] md:max-lg:h-[28.6875rem]" alt="Unisen product preview" height="492" sizes="calc(min(100vw - 32px, 1240px) - 16px)" src="/assets/cloned/images/b2e1d278df24.png" srcSet="/assets/cloned/images/f92da167a664.png 512w, /assets/cloned/images/b2e1d278df24.png 772w" width="772" />
                </div>
              </div>
              <div className="hidden max-md:w-[20.4375rem] max-lg:flex max-lg:relative max-lg:p-5 max-lg:flex-col max-lg:justify-center max-lg:items-center max-lg:content-center max-lg:shrink-0 max-lg:gap-5 md:max-lg:w-180">
                <div className="hidden max-md:w-[17.9375rem] max-lg:flex max-lg:relative max-lg:flex-col max-lg:justify-start max-lg:shrink-0 max-lg:whitespace-pre-wrap max-lg:[word-break:break-word] max-lg:[overflow-wrap:break-word] md:max-lg:w-170">
                  <h3 className="hidden max-lg:block max-lg:text-color-001 max-lg:[font-family:'DM_Sans',_'DM_Sans_Placeholder',_sans-serif] max-lg:text-2xl max-lg:font-medium max-lg:leading-[1.625rem] max-lg:text-balance max-lg:[font-feature-settings:'blwf',_'cv03',_'cv04',_'cv09',_'cv11']" dir="auto">
                    Protects the clocks
                  </h3>
                </div>
                <div className="hidden max-md:w-[17.9375rem] max-lg:flex max-lg:relative max-lg:flex-col max-lg:justify-start max-lg:shrink-0 max-lg:whitespace-pre-wrap max-lg:[word-break:break-word] max-lg:[overflow-wrap:break-word] md:max-lg:w-170">
                  <p className="hidden max-lg:block max-lg:text-muted-foreground max-lg:[font-family:Geist,_'Geist_Placeholder',_sans-serif] max-lg:text-sm max-lg:leading-[1.0625rem] max-lg:text-balance max-lg:[font-feature-settings:'blwf',_'cv03',_'cv04',_'cv09',_'cv11']" dir="auto">
                    Calendar-day countdowns for the 15-day EHC consultation window. Overdue work is visible before it becomes a crisis.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
