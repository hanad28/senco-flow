import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/app-shell";
import { useConsultations, formatDate, type NeedCapability } from "@/lib/consultations-store";
import { MatchScore } from "./consultations.$id.needs";
import { Paperclip, ArrowRight, ArrowLeft, FileText, Eye, Pencil } from "lucide-react";

export const Route = createFileRoute("/consultations/$id/draft")({
  head: ({ params }) => ({
    meta: [
      { title: `Draft response — ${params.id.toUpperCase()} — EHCP Response` },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: DraftView,
});

const capabilityLabel: Record<NeedCapability, string> = {
  full: "Can meet in full",
  partial: "Can meet in part",
  cannot: "Cannot meet",
};
const capabilityClass: Record<NeedCapability, string> = {
  full: "bg-ok/10 text-ok border-ok/30",
  partial: "bg-warn/15 text-warn-foreground border-warn/40",
  cannot: "bg-urgent/10 text-urgent border-urgent/30",
};

function DraftView() {
  const { id } = Route.useParams();
  const { get, setDraftResponse, addEvidence } = useConsultations();
  const c = get(id);
  if (!c) throw notFound();

  const [view, setView] = useState<"edit" | "letter">("edit");

  return (
    <AppShell
      breadcrumbs={[
        { label: "Dashboard", to: "/" },
        { label: c.pupilRef, to: `/consultations/${c.id}` },
        { label: "Draft response" },
      ]}
      actions={
        <Link
          to="/consultations/$id/submit"
          params={{ id: c.id }}
          className="inline-flex items-center gap-2 h-9 px-4 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90"
        >
          Review & submit <ArrowRight className="h-4 w-4" />
        </Link>
      }
    >
      <div className="max-w-5xl mx-auto px-6 py-8 space-y-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <Link to="/consultations/$id/needs" params={{ id: c.id }} className="text-xs text-muted-foreground hover:text-foreground inline-flex items-center gap-1">
              <ArrowLeft className="h-3 w-3" /> Back to needs
            </Link>
            <h1 className="text-2xl font-semibold tracking-tight mt-2">Response draft — Section F provision</h1>
            <p className="text-sm text-muted-foreground mt-1">
              For {c.pupilRef} · {c.localAuthority} · received {formatDate(c.receivedOn)}
            </p>
          </div>
          <MatchScore
            full={c.needs.filter((n) => n.capability === "full").length}
            total={c.needs.length}
          />
          <div className="inline-flex rounded-md border bg-surface p-1">
            <button
              onClick={() => setView("edit")}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded ${view === "edit" ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}
            >
              <Pencil className="h-3 w-3" /> Per-need
            </button>
            <button
              onClick={() => setView("letter")}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded ${view === "letter" ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}
            >
              <Eye className="h-3 w-3" /> Letter preview
            </button>
          </div>
        </div>

        {view === "edit" ? (
          <ol className="space-y-4">
            {c.needs.map((n, i) => (
              <li key={n.id} className="bg-surface border rounded-lg overflow-hidden">
                <header className="px-5 py-3 border-b bg-muted/20 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="h-6 w-6 rounded-full bg-muted grid place-items-center text-xs font-semibold text-muted-foreground shrink-0">
                      {i + 1}
                    </div>
                    <h3 className="text-sm font-medium truncate">{n.title}</h3>
                  </div>
                  <span className={`shrink-0 inline-flex items-center px-2 py-0.5 rounded-full border text-[11px] font-medium ${capabilityClass[n.capability]}`}>
                    {capabilityLabel[n.capability]}
                  </span>
                </header>
                <div className="p-5 space-y-3">
                  <label className="text-xs font-medium text-muted-foreground">School response</label>
                  <textarea
                    value={n.draftResponse}
                    onChange={(e) => setDraftResponse(c.id, n.id, e.target.value)}
                    rows={4}
                    className="w-full rounded-md border bg-surface p-3 text-sm leading-relaxed outline-none focus:ring-2 focus:ring-ring/40"
                  />
                  <div className="flex items-center justify-between flex-wrap gap-3">
                    <div className="flex items-center flex-wrap gap-2">
                      {n.evidence.map((e) => (
                        <span key={e} className="inline-flex items-center gap-1.5 px-2 py-1 rounded border bg-muted/40 text-xs">
                          <FileText className="h-3 w-3" /> {e}
                        </span>
                      ))}
                      {n.evidence.length === 0 && (
                        <span className="text-xs text-muted-foreground">No evidence attached</span>
                      )}
                    </div>
                    <button
                      onClick={() => addEvidence(c.id, n.id, `Evidence-${Math.floor(Math.random() * 900 + 100)}.pdf`)}
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:underline"
                    >
                      <Paperclip className="h-3 w-3" /> Attach evidence
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        ) : (
          <LetterPreview c={c} />
        )}
      </div>
    </AppShell>
  );
}

function LetterPreview({ c }: { c: ReturnType<ReturnType<typeof useConsultations>["get"]> & object }) {
  return (
    <article className="bg-surface border rounded-lg p-10 leading-relaxed text-sm shadow-sm max-w-3xl mx-auto">
      <div className="text-right text-xs text-muted-foreground">
        Millbrook Primary School<br />
        14 Willow Lane, London N1 4AA<br />
        {formatDate(new Date().toISOString())}
      </div>
      <div className="mt-8">
        <div className="font-medium">{c.caseOfficer}</div>
        <div className="text-muted-foreground">{c.localAuthority}</div>
      </div>
      <h2 className="mt-8 font-semibold">
        Re: EHC needs assessment consultation — {c.pupilRef} ({c.yearGroup})
      </h2>
      <p className="mt-4">Dear {c.caseOfficer.split(".")[1]?.trim() ?? c.caseOfficer},</p>
      <p className="mt-4">
        Thank you for consulting Millbrook Primary School regarding the above pupil. We have reviewed the assessment
        documentation and set out below our response against each identified need.
      </p>
      <ol className="mt-6 space-y-5 list-decimal pl-5">
        {c.needs.map((n) => (
          <li key={n.id}>
            <div className="font-medium">{n.title}</div>
            <div className="text-xs text-muted-foreground mt-0.5">{capabilityLabel[n.capability]}</div>
            <p className="mt-2 text-foreground/90">{n.draftResponse}</p>
          </li>
        ))}
      </ol>
      <p className="mt-8">
        We remain committed to working with the local authority and the family to ensure the pupil's needs are met.
        Please do not hesitate to contact us should you require any further information.
      </p>
      <div className="mt-8">
        Yours sincerely,<br />
        <span className="font-medium">S. Ahmed</span><br />
        SENCO, Millbrook Primary School
      </div>
    </article>
  );
}
