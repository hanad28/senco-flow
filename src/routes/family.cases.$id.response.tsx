import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Download, FileText, Printer, CheckCircle2, AlertTriangle, Info } from "lucide-react";
import { FamilyShell, AiLabel } from "@/components/family-shell";
import { useFamilyI18n } from "@/lib/family-i18n";
import { useFamilyCase, readinessChecks, readinessScore } from "@/lib/family-case-store";
import { FAMILY_STATUTORY, familyDaysRemaining } from "@/lib/family-config";
import { downloadFamilyResponseEnglish, downloadFamilyResponseBilingual } from "@/lib/family-letter-export";

export const Route = createFileRoute("/family/cases/$id/response")({
  component: ResponseScreen,
});

function ResponseScreen() {
  const { t, lang, meta, formatDate } = useFamilyI18n();
  const { state, dispatch } = useFamilyCase();
  const [view, setView] = useState<"english" | "family" | "side">("english");
  const [downloading, setDownloading] = useState(false);
  const checks = readinessChecks(state);
  const score = readinessScore(state);
  const blocking = checks.filter((c) => c.blocking && !c.passed);
  const canConfirm = blocking.length === 0;

  const included = state.issues.filter((i) => i.status === "ready");
  const grouped: Record<string, typeof included> = {};
  for (const i of included) (grouped[i.section] ||= []).push(i);

  const p = state.placement;
  const daysLeft = familyDaysRemaining(state.draftReceivedIso);

  const doExportEnglish = async () => {
    setDownloading(true);
    try { await downloadFamilyResponseEnglish(state); } finally { setDownloading(false); }
  };
  const doExportBilingual = async () => {
    setDownloading(true);
    try { await downloadFamilyResponseBilingual(state, t, meta); } finally { setDownloading(false); }
  };

  return (
    <FamilyShell>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
        <div className="space-y-6 min-w-0">
          <header>
            <h1 className="text-2xl font-semibold tracking-tight">{t("response.title")}</h1>
            <p className="text-sm text-muted-foreground mt-1">
              {t("common.deadline")}: <strong>{formatDate(state.deadlineIso)}</strong> · {daysLeft} {t("common.daysLeft")}
            </p>
          </header>

          {/* View toggle */}
          <div role="tablist" aria-label="Response view" className="inline-flex flex-wrap gap-1 rounded-md border bg-surface p-1">
            {(["english", "family", "side"] as const).map((v) => (
              <button
                key={v}
                role="tab"
                aria-selected={view === v}
                onClick={() => setView(v)}
                disabled={v !== "english" && lang === "en"}
                className={`min-h-11 px-3 rounded-[5px] text-sm transition-colors ${view === v ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"} disabled:opacity-40 disabled:cursor-not-allowed`}
              >
                {v === "english" ? t("response.viewEnglish") : v === "family" ? t("response.viewFamily") : t("response.viewBilingual")}
              </button>
            ))}
          </div>

          {view !== "english" && lang !== "en" && (
            <div className="rounded-md bg-info/10 border border-info/30 p-3 text-xs text-info-foreground">
              <div className="flex items-start gap-2"><Info className="h-4 w-4 mt-0.5 shrink-0" aria-hidden="true" /><span>{FAMILY_STATUTORY.translationDisclosure} The formal response sent to the local authority remains in English.</span></div>
            </div>
          )}

          {/* Response preview */}
          <article className="rounded-lg border bg-surface p-6 print:border-0 print:p-0" aria-label={t("response.preview")}>
            <div className={view === "side" && lang !== "en" ? "grid grid-cols-1 md:grid-cols-2 gap-6" : ""}>
              <div dir="ltr">
                <ResponseBody state={state} />
              </div>
              {view === "side" && lang !== "en" && (
                <div dir={meta.dir} className="border-s ps-6">
                  <div className="mb-3 flex items-center gap-2"><AiLabel>Translated</AiLabel><span className="text-[11px] text-muted-foreground">{meta.nativeName}</span></div>
                  <p className="text-sm text-muted-foreground">Headings and section titles below are translated. Detailed clause wording is shown in English for accuracy: download the bilingual copy for a fuller family-language version.</p>
                  <div className="mt-4 space-y-3">
                    <div><strong>{t("response.title")}</strong></div>
                    <div>{t("nav.plan")}: {state.childName}</div>
                    {Object.keys(grouped).map((sec) => (
                      <div key={sec}>
                        <div className="font-semibold">Section {sec}</div>
                        <ul className="list-disc list-inside text-sm">
                          {grouped[sec].map((i) => <li key={i.id}>{i.title}</li>)}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </article>

          {/* Actions */}
          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={doExportEnglish} disabled={downloading || !canConfirm} className="inline-flex items-center gap-2 min-h-11 px-4 rounded-md bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 disabled:opacity-40">
              <Download className="h-4 w-4" aria-hidden="true" /> {t("response.download.en")}
            </button>
            {lang !== "en" && (
              <button type="button" onClick={doExportBilingual} disabled={downloading || !canConfirm} className="inline-flex items-center gap-2 min-h-11 px-4 rounded-md border text-sm font-medium hover:bg-accent disabled:opacity-40">
                <Download className="h-4 w-4" aria-hidden="true" /> {t("response.download.bi")}
              </button>
            )}
            <button type="button" onClick={() => window.print()} className="inline-flex items-center gap-2 min-h-11 px-4 rounded-md border text-sm font-medium hover:bg-accent">
              <Printer className="h-4 w-4" aria-hidden="true" /> {t("response.print")}
            </button>
            {canConfirm && (
              <Link
                to={`/family/cases/${state.id}/confirmation`}
                onClick={() => dispatch({ type: "logActivity", a: { actor: "family", message: "Marked response as ready." } })}
                className="inline-flex items-center gap-2 min-h-11 px-4 rounded-md bg-ok text-ok-foreground text-sm font-semibold hover:opacity-90"
              >
                <CheckCircle2 className="h-4 w-4" aria-hidden="true" /> {t("response.markReady")}
              </Link>
            )}
          </div>

          {/* Placement editor */}
          <section className="rounded-lg border bg-surface p-5 space-y-3">
            <h2 className="text-sm font-semibold">Preferred school or type of setting</h2>
            <p className="text-xs text-muted-foreground">Section I is often left blank in the draft. Your preference goes into your response.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label className="text-xs">Preferred school
                <input value={p.preferredSchool} onChange={(e) => dispatch({ type: "setPlacement", patch: { preferredSchool: e.target.value } })} className="mt-1 w-full rounded-md border bg-surface px-3 py-2 text-sm min-h-11" placeholder="e.g. Millbrook Primary" />
              </label>
              <label className="text-xs">Preferred type of setting
                <input value={p.preferredType} onChange={(e) => dispatch({ type: "setPlacement", patch: { preferredType: e.target.value } })} className="mt-1 w-full rounded-md border bg-surface px-3 py-2 text-sm min-h-11" placeholder="e.g. Mainstream primary with SEN support" />
              </label>
              <label className="text-xs col-span-full">Reasons
                <textarea value={p.reasons} onChange={(e) => dispatch({ type: "setPlacement", patch: { reasons: e.target.value } })} className="mt-1 w-full rounded-md border bg-surface px-3 py-2 text-sm" rows={3} />
              </label>
              <label className="text-xs col-span-full">Travel and accessibility notes
                <textarea value={p.travelNotes} onChange={(e) => dispatch({ type: "setPlacement", patch: { travelNotes: e.target.value } })} className="mt-1 w-full rounded-md border bg-surface px-3 py-2 text-sm" rows={2} />
              </label>
              <label className="inline-flex items-center gap-2 text-sm col-span-full">
                <input type="checkbox" checked={p.meetingRequested} onChange={(e) => dispatch({ type: "setPlacement", patch: { meetingRequested: e.target.checked } })} />
                <span>Request a meeting with the local authority to discuss this response.</span>
              </label>
            </div>
          </section>
        </div>

        {/* Readiness sidebar */}
        <aside className="lg:sticky lg:top-4 self-start rounded-lg border bg-surface p-4 space-y-3 h-fit">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold">{t("response.readiness")}</h2>
            <span className="text-xs font-semibold tabular-nums">{score}%</span>
          </div>
          <div className="h-2 rounded-full bg-muted overflow-hidden"><div className="h-full bg-primary" style={{ width: `${score}%` }} /></div>
          <ul className="space-y-2">
            {checks.map((c, i) => (
              <li key={i} className="flex items-start gap-2 text-xs">
                {c.passed ? <CheckCircle2 className="h-4 w-4 text-ok shrink-0" aria-hidden="true" /> : <AlertTriangle className={`h-4 w-4 shrink-0 ${c.blocking ? "text-urgent" : "text-warn-foreground"}`} aria-hidden="true" />}
                <span className={c.passed ? "text-muted-foreground" : c.blocking ? "text-urgent font-medium" : ""}>{c.label}</span>
              </li>
            ))}
          </ul>
          {blocking.length > 0 && <p className="text-[11px] text-urgent">Resolve the items above before marking your response ready.</p>}
        </aside>
      </div>
    </FamilyShell>
  );
}

function ResponseBody({ state }: { state: ReturnType<typeof useFamilyCase>["state"] }) {
  const grouped: Record<string, typeof state.issues> = {};
  for (const i of state.issues.filter((x) => x.status === "ready")) (grouped[i.section] ||= []).push(i);

  return (
    <div className="text-sm leading-relaxed space-y-4">
      <h2 className="text-lg font-semibold">Family response to draft EHC plan</h2>
      <dl className="grid grid-cols-2 gap-2 text-xs">
        <dt className="text-muted-foreground">For</dt><dd>{state.childName} ({state.yearGroup})</dd>
        <dt className="text-muted-foreground">Local authority</dt><dd>{state.localAuthority}</dd>
        <dt className="text-muted-foreground">Case officer</dt><dd>{state.caseOfficer}</dd>
        <dt className="text-muted-foreground">Draft received</dt><dd>{state.draftReceivedIso}</dd>
      </dl>
      <p>
        Thank you for the draft EHC plan for {state.childName}. We have reviewed the draft together with the supporting advice and set out below the amendments we would like the local authority to consider.
      </p>
      {Object.keys(grouped).length === 0 ? (
        <p className="text-muted-foreground italic">No requested amendments have been marked ready yet. Return to Issues to mark items as “Ready to include”.</p>
      ) : (
        Object.keys(grouped).sort().map((sec) => (
          <div key={sec}>
            <h3 className="font-semibold text-base mt-4">Section {sec}</h3>
            <ol className="list-decimal list-inside space-y-3">
              {grouped[sec].map((i) => (
                <li key={i.id}>
                  <div className="font-medium">{i.title}</div>
                  {i.currentDraft && <div className="text-xs text-muted-foreground mt-0.5">Current: {i.currentDraft}</div>}
                  <div className="mt-1"><span className="font-medium">Proposed: </span>{i.proposedAmendment}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">Reason: {i.why}</div>
                </li>
              ))}
            </ol>
          </div>
        ))
      )}
      <div>
        <h3 className="font-semibold text-base mt-4">School or setting preference</h3>
        {(state.placement.preferredSchool || state.placement.preferredType) ? (
          <p>{state.placement.preferredSchool || state.placement.preferredType}. {state.placement.reasons}</p>
        ) : (
          <p className="text-muted-foreground italic">Not yet recorded.</p>
        )}
      </div>
      <p className="italic text-xs text-muted-foreground pt-3 border-t">{FAMILY_STATUTORY.disclaimer}</p>
    </div>
  );
}
