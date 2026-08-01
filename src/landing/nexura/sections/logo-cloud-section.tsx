import Logo3, { type Logo3Data } from "../components/logo3";
import Logo4 from "../components/logo4";
import { Logo3_styles, Logo4_styles } from "../_styles";
import { logos as logosContent } from "../content";
const Logo3_data: Logo3Data[] = [
    { ariaposinset: "1", height: "391", imgSrc: "/assets/cloned/images/cecfc1d7f1cf.png" },
    { ariaposinset: "2", height: "309", imgSrc: "/assets/cloned/images/98058893f861.png" },
    { ariaposinset: "3", height: "268", imgSrc: "/assets/cloned/images/594cb98d06fe.png" },
    { ariaposinset: "4", height: "222", imgSrc: "/assets/cloned/images/86c4d071e9f3.png" },
    { ariaposinset: "5", height: "312", imgSrc: "/assets/cloned/images/6622ec112ad9.png" },
    { ariaposinset: "6", height: "400", imgSrc: "/assets/cloned/images/902e2395e323.png" },
    { ariaposinset: "7", height: "303", imgSrc: "/assets/cloned/images/19224ca1008d.png" },
    { ariaposinset: "8", height: "400", imgSrc: "/assets/cloned/images/be0767c0415f.png" }
];
/** Logo Cloud section. */
export default function LogoCloudSection({ logo3Data = Logo3_data, logos = logosContent } = {}) {
  return (
    <div className="w-112.5 h-112.5 block absolute top-0 left-0 z-1 min-w-0 shrink-0 max-md:w-full max-lg:w-full" data-ditto-id="style-div">
      <ul className="hidden max-lg:flex max-lg:relative max-lg:max-w-full max-lg:max-h-full max-lg:justify-start max-lg:items-center max-lg:gap-2.5 max-lg:[list-style-type:none] max-lg:list-outside max-md:transform-[matrix(1,0,0,1,-4.002,0)] md:max-lg:transform-[matrix(1,0,0,1,-7.506,0)]">
        {logo3Data.map((d, i) => <Logo3 key={i} d={d} styles={Logo3_styles[i]} />)}
      </ul>
      {logos.map((d, i) => <Logo4 key={i} d={d} styles={Logo4_styles[i]} />)}
    </div>
  );
}
