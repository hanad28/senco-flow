import type { LucideIcon } from "lucide-react";
import { AppShell } from "@/components/app-shell";

export function ComingSoon({
  title,
  description,
  icon: Icon,
}: {
  title: string;
  description: string;
  icon: LucideIcon;
}) {
  return (
    <AppShell breadcrumbs={[{ label: title }]}>
      <div className="max-w-3xl mx-auto px-6 py-24 text-center">
        <div className="mx-auto h-14 w-14 rounded-full bg-primary/10 text-primary grid place-items-center">
          <Icon className="h-7 w-7" />
        </div>
        <h1 className="mt-6 text-2xl font-semibold tracking-tight">{title}</h1>
        <p className="mt-2 text-sm text-muted-foreground max-w-md mx-auto">{description}</p>
        <div className="mt-6 inline-flex items-center gap-2 px-3 py-1.5 rounded-full border bg-surface text-xs font-medium text-muted-foreground">
          Coming soon
        </div>
      </div>
    </AppShell>
  );
}
