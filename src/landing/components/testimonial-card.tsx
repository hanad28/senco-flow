export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  avatar: string;
  avatarSrcSet?: string;
};

export default function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <article className="testimonial-card group/testimonial w-93 h-86.5 flex relative shrink-0 p-5 rounded-xl flex-col justify-between items-start content-start overflow-hidden bg-color-002 cursor-pointer max-md:w-[21.4375rem]">
      <div className="w-full h-full block absolute top-0 left-0 z-0 opacity-0 min-w-0 shrink-0 overflow-clip transition-opacity duration-500 group-hover/testimonial:opacity-25">
        <img
          className="w-full h-full block object-cover"
          alt=""
          height="958"
          sizes="372px"
          src="/assets/cloned/images/d2d44959d13b.jpg"
          srcSet="/assets/cloned/images/34e555e37802.jpg 512w, /assets/cloned/images/d2d44959d13b.jpg 970w"
          width="970"
          draggable={false}
        />
      </div>
      <div className="relative z-[1] w-full flex flex-col justify-start shrink-0 whitespace-pre-wrap [word-break:break-word] [overflow-wrap:break-word]">
        <p className="block opacity-80 [font-family:Inter,_'Inter_Placeholder',_sans-serif] text-base leading-[1.1875rem]">
          {t.quote}
        </p>
      </div>
      <div className="relative z-[1] w-full flex flex-col justify-start items-start content-start shrink-0 gap-2.5">
        <div className="w-13 h-13 block relative rounded-lg shrink-0 overflow-hidden">
          <img
            className="w-full h-full block rounded-lg object-cover"
            alt={t.name}
            height="364"
            src={t.avatar}
            srcSet={t.avatarSrcSet}
            width="364"
            draggable={false}
          />
        </div>
        <div className="w-full flex relative flex-col justify-start items-start content-start shrink-0 gap-[0.3125rem]">
          <h5 className="block text-color-001 [font-family:'DM_Sans',_'DM_Sans_Placeholder',_sans-serif] text-xl font-medium leading-5.5 text-balance max-lg:text-lg max-lg:leading-[1.25rem]">
            {t.name}
          </h5>
          <p className="block opacity-50 [font-family:Inter,_'Inter_Placeholder',_sans-serif] text-base leading-[1.1875rem]">
            {t.role}
          </p>
        </div>
      </div>
    </article>
  );
}
