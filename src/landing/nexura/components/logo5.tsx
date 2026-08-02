import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type Logo5Data = {
  href: string;
  icon: ReactNode;
  label: string;
};

/** Footer social pill: Nexura: 44px circle, translucent fill, monochrome icon. */
export default function Logo5({ d }: { d: Logo5Data }) {
  return (
    <div className="w-11 block relative shrink-0">
      <a
        className={cn(
          "nexura-social-pill h-11 w-11 flex relative p-3 rounded-[100px] justify-center items-center content-center gap-2.5",
          "cursor-pointer transition-colors duration-200",
        )}
        data-component="link"
        href={d.href}
        rel="noopener noreferrer"
        target="_blank"
        aria-label={d.label}
      >
        <span className="nexura-social-icon flex h-5 w-5 items-center justify-center [&_svg]:h-5 [&_svg]:w-5">
          {d.icon}
        </span>
      </a>
    </div>
  );
}
