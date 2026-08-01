export type MediaCard3Data = {
  title: string;
};
/** A card with media + heading. */
export default function MediaCard3({ d }: { d: MediaCard3Data }) {
  return (
    <div className="w-full block relative shrink-0">
      <div className="group/faq flex relative p-5 rounded-xl flex-col justify-start items-start content-start gap-5 bg-surface-2 cursor-pointer transition-colors duration-200 hover:bg-surface-3">
        <div className="w-full flex relative justify-start items-center content-center shrink-0 gap-3">
          <div className="w-131 flex relative flex-col justify-start grow shrink-0 basis-0 whitespace-pre-wrap [word-break:break-word] [overflow-wrap:break-word] max-md:w-[16.6875rem] md:max-lg:w-165">
            <h5 className="block text-color-001 [font-family:'DM_Sans',_'DM_Sans_Placeholder',_sans-serif] text-xl font-medium leading-5.5 text-balance [font-feature-settings:'blwf',_'cv03',_'cv04',_'cv09',_'cv11'] max-lg:text-lg max-lg:leading-[1.25rem]" data-component="heading" dir="auto">
              {d.title}
            </h5>
          </div>
          <div className="w-6 h-6 block relative shrink-0" aria-hidden="true">
            <div className="h-full block">
              <svg className="w-6 h-6 block overflow-hidden transition-transform duration-300 group-hover/faq:rotate-45 focus:outline-clr-7 focus:[outline-style:auto] focus:outline-[5px]" data-component="icon" fill="currentColor">
                <use href="#svg11627934630" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
