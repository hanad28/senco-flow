export type Tile2Data = {
  href: string;
  description: string;
};
/** A content tile. */
export default function Tile2({ d }: { d: Tile2Data }) {
  return (
    <div className="w-full flex relative pl-4 justify-start items-center content-center shrink-0 gap-2.5">
      <div className="w-[117.3px] flex relative flex-col justify-start grow shrink-0 basis-0 whitespace-pre-wrap [word-break:break-word] [overflow-wrap:break-word] max-md:w-[5.3125rem] md:max-lg:w-54">
        <p className="block text-color-001 [font-family:Geist,_'Geist_Placeholder',_sans-serif] leading-[0.875rem] [font-feature-settings:'blwf',_'cv03',_'cv04',_'cv09',_'cv11']" dir="auto">
          <a className="inline cursor-pointer hover:border-muted hover:text-muted hover:outline-muted hover:[text-decoration-color:var(--muted)]" data-component="link" href={d.href}>
            {d.description}
          </a>
        </p>
      </div>
    </div>
  );
}
