// Shared workspace switcher shown in both school and family shells.
import { Link } from "@tanstack/react-router";
import { Building2, HeartHandshake } from "lucide-react";

export function WorkspaceSwitcher({ current }: { current: "school" | "family" }) {
  return (
    <div className="inline-flex items-center rounded-md border bg-surface p-0.5 text-xs">
      <Link
        to="/"
        aria-current={current === "school" ? "page" : undefined}
        className={`inline-flex items-center gap-1.5 h-7 px-2.5 rounded-[5px] transition-colors ${
          current === "school" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
        }`}
      >
        <Building2 className="h-3.5 w-3.5" aria-hidden="true" />
        <span>School</span>
      </Link>
      <Link
        to="/family"
        aria-current={current === "family" ? "page" : undefined}
        className={`inline-flex items-center gap-1.5 h-7 px-2.5 rounded-[5px] transition-colors ${
          current === "family" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
        }`}
      >
        <HeartHandshake className="h-3.5 w-3.5" aria-hidden="true" />
        <span>Family</span>
      </Link>
    </div>
  );
}
