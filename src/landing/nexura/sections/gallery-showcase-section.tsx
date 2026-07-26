import MediaCard, { type MediaCardData } from "../components/media-card";
import { MediaCard_styles } from "../_styles";
const MediaCard_data: MediaCardData[] = [
    { alt: "", imgSrc: "/assets/cloned/images/b384c25e9302.png", srcSet: "/assets/cloned/images/06445ec4a910.png 768w, /assets/cloned/images/b384c25e9302.png 900w", width: "900", kind: "image", alt2: "", imgSrc2: "/assets/cloned/images/f4d443694077.png", width2: "303", kind2: "heading", title: "\"Nexura cut our reporting time in half. We now spend that time actually optimizing campaigns instead.\"", description: "Sarah Chen, Head of Growth at Codecraft" },
    { alt: "Woman in Office Setting", imgSrc: "/assets/cloned/images/534d298e49e0.png", srcSet: "/assets/cloned/images/e7157f228faa.png 682w, /assets/cloned/images/534d298e49e0.png 800w", width: "800", alt2: "Logo", imgSrc2: "/assets/cloned/images/1a5a9dc5adbc.png", width2: "296", title: "\"Nexura flagged three underperforming campaigns in seconds. That insight alone made it a no-brainer.\"", description: "Emma Hartley, Marketing Lead at Acme" },
    { alt: "Woman in Office Setting", imgSrc: "/assets/cloned/images/4e442b06f18f.png", srcSet: "/assets/cloned/images/30c4649d042a.png 682w, /assets/cloned/images/4e442b06f18f.png 800w", width: "800", alt2: "Logo", imgSrc2: "/assets/cloned/images/b4d80e143f41.png", width2: "332", title: "\"Switching to Nexura was the easiest decision we made this quarter. Our ROAS improved by 30% in the first month alone.\"", description: "Claire Donovan, Marketing Lead at LaunchSimple" },
    { alt: "Man in Office Setting", imgSrc: "/assets/cloned/images/6891ed04a924.png", srcSet: "/assets/cloned/images/db0e67645112.png 682w, /assets/cloned/images/6891ed04a924.png 800w", width: "800", alt2: "Logo", imgSrc2: "/assets/cloned/images/09555eff81e5.png", width2: "246", title: "\"We manage 12 client accounts and Nexura keeps everything in one place. It's like an extra team member.\"", description: "James Walker, Founder at PictelAI" }
];
/** Gallery Showcase section. */
export default function GalleryShowcaseSection({ mediaCardData = MediaCard_data } = {}) {
  return (
    <div className="w-full h-80 block relative z-1 shrink-0 max-md:h-[195.3rem] md:max-lg:h-[95.55rem]">
      <div className="h-full flex relative justify-start items-center content-center gap-4 overflow-clip max-lg:flex-wrap max-lg:items-start max-lg:content-start max-lg:gap-y-16">
        {mediaCardData.map((d, i) => <MediaCard key={i} d={d} styles={MediaCard_styles[i]} />)}
      </div>
    </div>
  );
}
