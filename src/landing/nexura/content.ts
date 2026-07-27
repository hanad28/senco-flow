// Semantic page content extracted from recognized recipe sections.

export type TileDataItem = {
  href: string;
  description: string;
};
export const tileData: TileDataItem[] = [
    { href: "/product", description: "Product" },
    { href: "/pricing", description: "Pricing" },
    { href: "/integration", description: "Integration" }
];

export type LogoDataItem = {
  imgSrc: string;
  width: string;
};
export const logoData: LogoDataItem[] = [
    { imgSrc: "/assets/nexura/images/f4d443694077.png", width: "303" },
    { imgSrc: "/assets/nexura/images/bf89200758a3.png", width: "218" },
    { imgSrc: "/assets/nexura/images/121c9f218f68.png", width: "276" },
    { imgSrc: "/assets/nexura/images/09555eff81e5.png", width: "246" }
];

export type Logo2DataItem = {
  imgSrc: string;
  srcSet: string;
};
export const logo2Data: Logo2DataItem[] = [
    { imgSrc: "/assets/nexura/images/b82b7b40401d.png", srcSet: "/assets/nexura/images/b00e8652ddd0.png 512w, /assets/nexura/images/334ea838e731.png 1024w, /assets/nexura/images/b82b7b40401d.png 1600w" },
    { imgSrc: "/assets/nexura/images/a8be68743346.png", srcSet: "/assets/nexura/images/7f8142532bd1.png 512w, /assets/nexura/images/00590ae47303.png 1024w, /assets/nexura/images/a8be68743346.png 1600w" },
    { imgSrc: "/assets/nexura/images/c0fd2fc412e0.png", srcSet: "/assets/nexura/images/01c1424f2fca.png 512w, /assets/nexura/images/bb7bee0f8baf.png 1024w, /assets/nexura/images/c0fd2fc412e0.png 1600w" },
    { imgSrc: "/assets/nexura/images/1326bc88be38.png", srcSet: "/assets/nexura/images/08167f6f6a5e.png 512w, /assets/nexura/images/2bf9491f9d2d.png 1024w, /assets/nexura/images/1326bc88be38.png 1600w" }
];

export type LogosItem = {
  height: string;
  imgSrc: string;
};
export const logos: LogosItem[] = [
    { height: "391", imgSrc: "/assets/nexura/images/cecfc1d7f1cf.png" },
    { height: "309", imgSrc: "/assets/nexura/images/98058893f861.png" },
    { height: "268", imgSrc: "/assets/nexura/images/594cb98d06fe.png" },
    { height: "222", imgSrc: "/assets/nexura/images/86c4d071e9f3.png" },
    { height: "312", imgSrc: "/assets/nexura/images/6622ec112ad9.png" },
    { height: "400", imgSrc: "/assets/nexura/images/902e2395e323.png" },
    { height: "303", imgSrc: "/assets/nexura/images/19224ca1008d.png" },
    { height: "400", imgSrc: "/assets/nexura/images/be0767c0415f.png" }
];

export type Tile3DataItem = {
  href: string;
  description: string;
};
export const tile3Data: Tile3DataItem[] = [
    { href: "/#solution-1", description: "For schools" },
    { href: "/#solution-2", description: "For families" },
    { href: "/#solution-3", description: "For specialists" },
    { href: "/#solution-4", description: "For councils" }
];

export type ProductsItem = {
  variant: string;
  title: string;
  description: string;
  label?: string;
  badge?: string;
  stat?: string;
};
export const products: ProductsItem[] = [
    { variant: "starter", title: "Starter", description: "For a single school SENCO team getting started", label: "Get started" },
    { variant: "pro", badge: "Most Popular", title: "Pro", description: "Unlimited open consultations", stat: "49" },
    { variant: "agency", title: "Agency", description: "For trusts managing multiple schools", stat: "149" }
];

export type Tile4DataItem = {
  href: string;
  description: string;
};
export const tile4Data: Tile4DataItem[] = [
    { href: "/", description: "Home" },
    { href: "/product", description: "Product" },
    { href: "/integration", description: "Integration" },
    { href: "/pricing", description: "Pricing" },
    { href: "/#demo", description: "Demo" }
];

export type Tile4Data2Item = {
  href: string;
  description: string;
};
export const tile4Data2: Tile4Data2Item[] = [
    { href: "/blog", description: "Blog" },
    { href: "/contact", description: "Contact" },
    { href: "/#solution", description: "Solutions" }
];

