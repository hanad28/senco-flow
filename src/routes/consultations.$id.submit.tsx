import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/app-shell";
import { useConsultations, formatDate, type NeedCapability } from "@/lib/consultations-store";
import { useSchoolProfile } from "@/lib/school-profile-store";
import { downloadResponseLetter } from "@/lib/letter-export";
import { CheckCircle2, ArrowLeft, Send, FileCheck2, AlertTriangle, XCircle, Download } from "lucide-react";

export const Route = createFileRoute("/consultations/$id/submit")({
  head: ({ params }) => ({
    meta: [
      { title: `Submit response — ${params.id.toUpperCase()} — EHCP Response` },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: SubmitView,
});

const capabilityLabel: Record<NeedCapability, string> = {
  full: "Can meet in full",
  partial: "Can meet in part",
  cannot: "Cannot meet",
};
const capabilityDot: Record<NeedCapability, string> = {
  full: "bg-ok",
  partial: "bg-warn",
  cannot: "bg-urgent",
};

function SubmitView() {
  const { id } = Route.useParams();
  const { get, setStatus } = useConsultations();
  const { profile } = useSchoolProfile();
  const navigate = useNavigate();
  const c = get(id);
  if (!c) throw notFound();

  const [submitted, setSubmitted] = useState(c.status === "Submitted");
  const [downloading, setDownloading] = useState(false);

  const missingRationale = c.needs.filter(
    (n) => n.capability === "cannot" && !(n.cannotRationale ?? "").trim(),
  );

  const school = {
    schoolName: profile.schoolName,
    schoolAddress: profile.schoolAddress,
    sendcoName: profile.sendcoName,
    sendcoRole: profile.sendcoRole,
  };

  const onDownload = async () => {
    setDownloading(true);
    try {
      await downloadResponseLetter(c, school);
    } finally {
      setDownloading(false);
    }
  };

  if (submitted) {
    return (
      <AppShell
        breadcrumbs={[
          { label: "Dashboard", to: "/" },
          { label: c.pupilRef, to: `/consultations/${c.id}` },
          { label: "Submitted" },
        ]}
      >
        <div className="max-w-2xl mx-auto px-6 py-24 text-center">
          <div className="mx-auto h-14 w-14 rounded-full bg-ok/15 text-ok grid place-items-center">
            <CheckCircle2 className="h-7 w-7" />
          </div>
          <h1 className="mt-6 text-2xl font-semibold tracking-tight">Response submitted</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Your response for {c.pupilRef} has been sent to {c.localAuthority}. A copy has been saved to the pupil's file.
          </p>

          <div className="mt-8 bg-surface border rounded-lg p-6 text-left">
            <div className="flex items-center gap-3">
              <FileCheck2 className="h-5 w-5 text-primary" />
              <div>
                <div className="text-sm font-medium">Consultation {c.id.toUpperCase()}</div>
                <div className="text-xs text-muted-foreground">
                  Submitted {formatDate(new Date().toISOString())} · Reference EHC-{c.id.toUpperCase()}-{new Date().getFullYear()}
                </div>
              </div>
            </div>
            <dl className="mt-5 grid grid-cols-2 gap-4 text-sm">
              <div>
                <dt className="text-xs text-muted-foreground">Pupil</dt>
                <dd className="mt-0.5">{c.pupilRef} ({c.yearGroup})</dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">Local authority</dt>
                <dd className="mt-0.5">{c.localAuthority}</dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">Needs addressed</dt>
                <dd className="mt-0.5">{c.needs.length}</dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">Response window</dt>
                <dd className="mt-0.5">Within 15 days (minimum)</dd>
              </div>
            </dl>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/"
              className="inline-flex items-center gap-2 h-10 px-5 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90"
            >
              Back to dashboard
            </Link>
            <button
              onClick={onDownload}
              disabled={downloading}
              className="inline-flex items-center gap-2 h-10 px-5 rounded-md border bg-surface text-sm font-medium hover:bg-accent disabled:opacity-60"
            >
              <Download className="h-4 w-4" />
              {downloading ? "Preparing…" : "Download .docx"}
            </button>
            <Link
              to="/consultations/$id"
              params={{ id: c.id }}
              className="inline-flex items-center gap-2 h-10 px-5 rounded-md border text-sm font-medium hover:bg-accent"
            >
              View consultation
            </Link>
          </div>
        </div>
      </AppShell>
    );
  }

  const summary = {
    full: c.needs.filter((n) => n.capability === "full").length,
    partial: c.needs.filter((n) => n.capability === "partial").length,
    cannot: c.needs.filter((n) => n.capability === "cannot").length,
  };

  return (
    <AppShell
      breadcrumbs={[
        { label: "Dashboard", to: "/" },
        { label: c.pupilRef, to: `/consultations/${c.id}` },
        { label: "Review & submit" },
      ]}
    >
      <div className="max-w-4xl mx-auto px-6 py-8 space-y-6">
        <div>
          <Link to="/consultations/$id/draft" params={{ id: c.id }} className="text-xs text-muted-foreground hover:text-foreground inline-flex items-center gap-1">
            <ArrowLeft className="h-3 w-3" /> Back to draft
          </Link>
          <h1 className="text-2xl font-semibold tracking-tight mt-2">Review and submit</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Confirm the summary below before submitting your response to {c.localAuthority}.
          </p>
        </div>

        <section className="bg-surface border rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b grid grid-cols-2 md:grid-cols-4 gap-4">
            <Meta label="Pupil" value={`${c.pupilRef} (${c.yearGroup})`} />
            <Meta label="Local authority" value={c.localAuthority} />
            <Meta label="Case officer" value={c.caseOfficer} />
            <Meta label="Received" value={formatDate(c.receivedOn)} />
          </div>
          <div className="px-6 py-5">
            <h3 className="text-sm font-semibold">Provision summary</h3>
            <div className="mt-3 grid grid-cols-3 gap-3">
              <SumCard label="In full" count={summary.full} tone="ok" />
              <SumCard label="In part" count={summary.partial} tone="warn" />
              <SumCard label="Cannot meet" count={summary.cannot} tone="urgent" />
            </div>
          </div>
          <div className="px-6 pb-6">
            <h3 className="text-sm font-semibold mb-3">Needs & response</h3>
            <ul className="space-y-2">
              {c.needs.map((n) => {
                const isCannot = n.capability === "cannot";
                return (
                  <li
                    key={n.id}
                    className={
                      isCannot
                        ? "border-2 border-urgent/50 bg-urgent/5 rounded-md p-4"
                        : "border rounded-md p-4"
                    }
                  >
                    <div className="flex items-start gap-3">
                      {isCannot ? (
                        <XCircle className="mt-0.5 h-5 w-5 text-urgent shrink-0" />
                      ) : (
                        <span className={`mt-1.5 h-2 w-2 rounded-full ${capabilityDot[n.capability]} shrink-0`} />
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-3">
                          <div className={`text-sm font-medium ${isCannot ? "text-urgent" : ""}`}>{n.title}</div>
                          <div
                            className={`text-xs shrink-0 ${
                              isCannot
                                ? "font-semibold uppercase tracking-wide text-urgent"
                                : "text-muted-foreground"
                            }`}
                          >
                            {capabilityLabel[n.capability]}
                          </div>
                        </div>
                        <p className="text-sm text-foreground/80 mt-1 leading-relaxed">{n.draftResponse}</p>
                        {isCannot && (
                          <div className="mt-2 rounded border border-urgent/30 bg-surface p-2.5">
                            <div className="text-[11px] font-semibold text-urgent uppercase tracking-wide">
                              Rationale
                            </div>
                            <p className="text-sm text-foreground/80 mt-0.5 leading-relaxed">
                              {(n.cannotRationale ?? "").trim() || (
                                <span className="italic text-urgent">Missing — required before submitting.</span>
                              )}
                            </p>
                          </div>
                        )}
                        {n.evidence.length > 0 && (
                          <div className="text-xs text-muted-foreground mt-2">
                            Evidence: {n.evidence.join(", ")}
                          </div>
                        )}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        {missingRationale.length > 0 && (
          <div className="flex items-start gap-3 rounded-lg border border-urgent/40 bg-urgent/10 px-4 py-3 text-sm text-urgent">
            <AlertTriangle className="h-4 w-4 mt-0.5 shrink-0" />
            <div>
              <div className="font-semibold">
                Cannot submit — {missingRationale.length} “Cannot meet” need{missingRationale.length === 1 ? "" : "s"} missing a rationale
              </div>
              <div className="text-xs opacity-90 mt-0.5">
                Return to the draft and add a short rationale for each need the school cannot meet.
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-wrap items-center justify-between gap-4 bg-surface border rounded-lg p-5">
          <div className="text-sm text-muted-foreground">
            By submitting, this response will be sent to {c.localAuthority} and recorded on the pupil's file.
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onDownload}
              disabled={downloading}
              className="inline-flex items-center gap-2 h-10 px-4 rounded-md border bg-surface text-sm font-medium hover:bg-accent disabled:opacity-60"
            >
              <Download className="h-4 w-4" />
              {downloading ? "Preparing…" : "Download .docx"}
            </button>
            <button
              disabled={missingRationale.length > 0}
              onClick={() => {
                setStatus(c.id, "Submitted");
                setSubmitted(true);
                window.scrollTo({ top: 0 });
                navigate({ to: "/consultations/$id/submit", params: { id: c.id } });
              }}
              className="inline-flex items-center gap-2 h-10 px-5 rounded-md bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="h-4 w-4" /> Submit response
            </button>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="text-sm mt-0.5">{value}</div>
    </div>
  );
}

function SumCard({ label, count, tone }: { label: string; count: number; tone: "ok" | "warn" | "urgent" }) {
  const cls = {
    ok: "bg-ok/10 border-ok/30 text-ok",
    warn: "bg-warn/15 border-warn/40 text-warn-foreground",
    urgent: "bg-urgent/10 border-urgent/30 text-urgent",
  }[tone];
  return (
    <div className={`border rounded-md px-4 py-3 ${cls}`}>
      <div className="text-xl font-semibold leading-none">{count}</div>
      <div className="text-xs mt-1 opacity-90">{label}</div>
    </div>
  );
}
