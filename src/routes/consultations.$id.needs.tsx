import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { useConsultations, type NeedCapability } from "@/lib/consultations-store";
import { CheckCircle2, MinusCircle, XCircle, ArrowRight, ArrowLeft, Info } from "lucide-react";

export const Route = createFileRoute("/consultations/$id/needs")({
  head: ({ params }) => ({
    meta: [
      { title: `Consolidated needs — ${params.id.toUpperCase()} — EHCP Response` },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: NeedsView,
});

const options: { value: NeedCapability; label: string; icon: React.ReactNode; classes: string }[] = [
  { value: "full", label: "Can meet in full", icon: <CheckCircle2 className="h-4 w-4" />, classes: "bg-ok/10 text-ok border-ok/30 hover:bg-ok/15" },
  { value: "partial", label: "Can meet in part", icon: <MinusCircle className="h-4 w-4" />, classes: "bg-warn/15 text-warn-foreground border-warn/40 hover:bg-warn/25" },
  { value: "cannot", label: "Cannot meet", icon: <XCircle className="h-4 w-4" />, classes: "bg-urgent/10 text-urgent border-urgent/30 hover:bg-urgent/15" },
];

function NeedsView() {
  const { id } = Route.useParams();
  const { get, setCapability, setStatus } = useConsultations();
  const c = get(id);
  if (!c) throw notFound();

  const counts = {
    full: c.needs.filter((n) => n.capability === "full").length,
    partial: c.needs.filter((n) => n.capability === "partial").length,
    cannot: c.needs.filter((n) => n.capability === "cannot").length,
  };

  return (
    <AppShell
      breadcrumbs={[
        { label: "Dashboard", to: "/" },
        { label: c.pupilRef, to: `/consultations/${c.id}` },
        { label: "Consolidated needs" },
      ]}
      actions={
        <Link
          to="/consultations/$id/draft"
          params={{ id: c.id }}
          onClick={() => setStatus(c.id, "Drafting")}
          className="inline-flex items-center gap-2 h-9 px-4 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90"
        >
          Draft response <ArrowRight className="h-4 w-4" />
        </Link>
      }
    >
      <div className="max-w-5xl mx-auto px-6 py-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <Link to="/consultations/$id" params={{ id: c.id }} className="text-xs text-muted-foreground hover:text-foreground inline-flex items-center gap-1">
              <ArrowLeft className="h-3 w-3" /> Back to consultation
            </Link>
            <h1 className="text-2xl font-semibold tracking-tight mt-2">Consolidated needs</h1>
            <p className="text-sm text-muted-foreground mt-1">
              {c.needs.length} needs extracted from {c.documents.length} documents. Confirm what the school can provide.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <SummaryChip label="In full" count={counts.full} tone="ok" />
          <SummaryChip label="In part" count={counts.partial} tone="warn" />
          <SummaryChip label="Cannot meet" count={counts.cannot} tone="urgent" />
        </div>

        <ol className="space-y-3">
          {c.needs.map((n, i) => (
            <li key={n.id} className="bg-surface border rounded-lg p-5">
              <div className="flex items-start gap-4">
                <div className="h-7 w-7 rounded-full bg-muted grid place-items-center text-xs font-semibold text-muted-foreground shrink-0">
                  {i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium">{n.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1">Source: {n.source}</p>
                  <p className="text-sm text-foreground/80 mt-3 leading-relaxed">{n.detail}</p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {options.map((opt) => {
                      const active = n.capability === opt.value;
                      return (
                        <button
                          key={opt.value}
                          onClick={() => setCapability(c.id, n.id, opt.value)}
                          className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-md border text-xs font-medium transition-all ${
                            active ? opt.classes + " ring-2 ring-offset-1 ring-offset-surface ring-current/30" : "bg-surface text-muted-foreground border-border hover:text-foreground"
                          }`}
                        >
                          {opt.icon}
                          {opt.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </AppShell>
  );
}

function SummaryChip({ label, count, tone }: { label: string; count: number; tone: "ok" | "warn" | "urgent" }) {
  const cls = {
    ok: "bg-ok/10 border-ok/30 text-ok",
    warn: "bg-warn/15 border-warn/40 text-warn-foreground",
    urgent: "bg-urgent/10 border-urgent/30 text-urgent",
  }[tone];
  return (
    <div className={`border rounded-lg px-4 py-3 ${cls}`}>
      <div className="text-2xl font-semibold leading-none">{count}</div>
      <div className="text-xs mt-1 opacity-90">{label}</div>
    </div>
  );
}
