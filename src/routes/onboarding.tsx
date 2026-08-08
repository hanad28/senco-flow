import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  useSchoolProfile,
  domainLabel,
  domainOrder,
  type NeedDomain,
} from "@/lib/school-profile-store";
import { isSchoolProfileComplete } from "@/lib/onboarding";
import { appNoIndexHead } from "@/lib/seo";
import { ArrowLeft, ArrowRight, Check, Plus, Trash2 } from "lucide-react";

export const Route = createFileRoute("/onboarding")({
  head: () =>
    appNoIndexHead(
      "Set up your school",
      "Set up your school profile before using the Unisen SENDCO workspace.",
    ),
  component: OnboardingPage,
});

type StepId = "welcome" | "identity" | "provision" | "staffing" | "done";

const STEPS: { id: StepId; label: string }[] = [
  { id: "welcome", label: "Welcome" },
  { id: "identity", label: "Identity" },
  { id: "provision", label: "Provision" },
  { id: "staffing", label: "Staffing" },
  { id: "done", label: "Done" },
];

const inputCls =
  "w-full rounded-md border bg-surface px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring/40";

function OnboardingPage() {
  const navigate = useNavigate();
  const {
    profile,
    update,
    updateStaffing,
    addProvision,
    updateProvision,
    removeProvision,
  } = useSchoolProfile();
  const [step, setStep] = useState<StepId>("welcome");
  const [activeDomain, setActiveDomain] = useState<NeedDomain>("communication");

  const stepIndex = STEPS.findIndex((s) => s.id === step);
  const identityOk = isSchoolProfileComplete(profile);
  const provisionCount = useMemo(
    () => domainOrder.reduce((n, d) => n + profile.provision[d].length, 0),
    [profile.provision],
  );

  // Returning visitors who already finished identity land on the final step.
  useEffect(() => {
    if (identityOk && step === "welcome") {
      setStep("done");
    }
  }, [identityOk, step]);

  const goNext = () => {
    const next = STEPS[stepIndex + 1];
    if (next) setStep(next.id);
  };
  const goBack = () => {
    const prev = STEPS[stepIndex - 1];
    if (prev) setStep(prev.id);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div
        className="pointer-events-none fixed inset-0 opacity-80"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% -10%, color-mix(in oklab, var(--primary) 14%, transparent), transparent 70%)",
        }}
      />
      <div className="relative mx-auto flex min-h-screen max-w-2xl flex-col px-6 py-10">
        <header className="mb-10">
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
            Unisen · School setup
          </p>
          <div className="mt-4 flex items-center gap-2" aria-label="Progress">
            {STEPS.map((s, i) => {
              const done = i < stepIndex;
              const current = i === stepIndex;
              return (
                <div key={s.id} className="flex flex-1 flex-col gap-1.5">
                  <div
                    className={`h-1 rounded-full transition-colors ${
                      done || current ? "bg-primary" : "bg-muted"
                    }`}
                  />
                  <span
                    className={`text-[10px] ${
                      current ? "text-foreground font-medium" : "text-muted-foreground"
                    }`}
                  >
                    {s.label}
                  </span>
                </div>
              );
            })}
          </div>
        </header>

        <main className="flex-1">
          {step === "welcome" && (
            <section className="space-y-5 animate-in fade-in duration-300">
              <h1 className="text-3xl font-semibold tracking-tight text-balance">
                Set up your school workspace
              </h1>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-prose">
                Before consultations and deadlines appear here, Unisen needs a clear picture of your
                school: who you are, what provision you offer, and how you staff SEND support.
                You can refine everything later in Settings.
              </p>
              <ul className="text-sm text-muted-foreground space-y-2 list-disc ps-5">
                <li>School identity for the sidebar and response letters</li>
                <li>Provision catalogue by area of need</li>
                <li>Staffing baseline for realistic draft responses</li>
              </ul>
            </section>
          )}

          {step === "identity" && (
            <section className="space-y-5 animate-in fade-in duration-300">
              <div>
                <h1 className="text-2xl font-semibold tracking-tight">School identity</h1>
                <p className="text-sm text-muted-foreground mt-1">
                  Feeds the sidebar, response letter header, and reports.
                </p>
              </div>
              <div className="space-y-4 rounded-lg border bg-surface p-5">
                <Field label="School name">
                  <input
                    value={profile.schoolName}
                    onChange={(e) => update({ schoolName: e.target.value })}
                    className={inputCls}
                    autoFocus
                    required
                  />
                </Field>
                <Field label="School address">
                  <textarea
                    value={profile.schoolAddress}
                    onChange={(e) => update({ schoolAddress: e.target.value })}
                    rows={2}
                    className={inputCls}
                  />
                </Field>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="SENDCO name">
                    <input
                      value={profile.sendcoName}
                      onChange={(e) => update({ sendcoName: e.target.value })}
                      className={inputCls}
                      required
                    />
                  </Field>
                  <Field label="Role / position">
                    <input
                      value={profile.sendcoRole}
                      onChange={(e) => update({ sendcoRole: e.target.value })}
                      placeholder="e.g. Assistant Head Teacher & SENDCO"
                      className={inputCls}
                      required
                    />
                  </Field>
                </div>
              </div>
            </section>
          )}

          {step === "provision" && (
            <section className="space-y-5 animate-in fade-in duration-300">
              <div>
                <h1 className="text-2xl font-semibold tracking-tight">Provision catalogue</h1>
                <p className="text-sm text-muted-foreground mt-1">
                  Add at least one offer if you can. Skip if you will fill this in Settings later.
                </p>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {domainOrder.map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setActiveDomain(d)}
                    className={`h-8 px-3 rounded-md text-xs font-medium border transition-colors ${
                      activeDomain === d
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-surface text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {domainLabel[d]}
                    {profile.provision[d].length > 0
                      ? ` (${profile.provision[d].length})`
                      : ""}
                  </button>
                ))}
              </div>
              <div className="rounded-lg border bg-surface overflow-hidden">
                <header className="px-4 py-3 border-b bg-muted/20 flex items-center justify-between">
                  <h2 className="text-sm font-medium">{domainLabel[activeDomain]}</h2>
                  <button
                    type="button"
                    onClick={() => addProvision(activeDomain)}
                    className="inline-flex items-center gap-1.5 h-7 px-2.5 rounded-md border bg-surface text-xs font-medium hover:bg-accent"
                  >
                    <Plus className="h-3.5 w-3.5" /> Add
                  </button>
                </header>
                <ul className="p-3 space-y-2">
                  {profile.provision[activeDomain].map((it) => (
                    <li key={it.id} className="flex items-start gap-2">
                      <textarea
                        value={it.description}
                        onChange={(e) => updateProvision(activeDomain, it.id, e.target.value)}
                        rows={2}
                        placeholder="Named programme, who delivers it, group size/ratio, frequency/duration."
                        className={`${inputCls} flex-1 text-sm leading-relaxed`}
                      />
                      <button
                        type="button"
                        onClick={() => removeProvision(activeDomain, it.id)}
                        aria-label="Remove item"
                        className="h-9 w-9 grid place-items-center rounded-md text-muted-foreground hover:text-urgent hover:bg-urgent/10"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </li>
                  ))}
                  {profile.provision[activeDomain].length === 0 && (
                    <li className="text-xs text-muted-foreground px-1 py-2">
                      No provision recorded yet for this area.
                    </li>
                  )}
                </ul>
              </div>
              <p className="text-xs text-muted-foreground">
                {provisionCount === 0
                  ? "None added yet — you can skip and continue."
                  : `${provisionCount} provision item${provisionCount === 1 ? "" : "s"} recorded.`}
              </p>
            </section>
          )}

          {step === "staffing" && (
            <section className="space-y-5 animate-in fade-in duration-300">
              <div>
                <h1 className="text-2xl font-semibold tracking-tight">Staffing baseline</h1>
                <p className="text-sm text-muted-foreground mt-1">
                  Optional context for draft responses. Skip if you prefer to set this later.
                </p>
              </div>
              <div className="space-y-4 rounded-lg border bg-surface p-5">
                <Field label="Teaching assistants (count)">
                  <input
                    type="number"
                    min={0}
                    value={profile.staffing.taCount}
                    onChange={(e) =>
                      updateStaffing({ taCount: Math.max(0, Number(e.target.value) || 0) })
                    }
                    className={inputCls}
                  />
                </Field>
                <Field label="Typical group size / ratios">
                  <input
                    value={profile.staffing.typicalGroupSize}
                    onChange={(e) => updateStaffing({ typicalGroupSize: e.target.value })}
                    placeholder="e.g. 1:1 to 1:4 for intervention"
                    className={inputCls}
                  />
                </Field>
                <Field label="Sensory / low-stimulus space">
                  <textarea
                    value={profile.staffing.sensorySpace}
                    onChange={(e) => updateStaffing({ sensorySpace: e.target.value })}
                    rows={2}
                    placeholder="e.g. One dedicated quiet room; sensory circuit in the hall"
                    className={inputCls}
                  />
                </Field>
              </div>
            </section>
          )}

          {step === "done" && (
            <section className="space-y-5 animate-in fade-in duration-300">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-md border bg-ok/10 text-ok">
                <Check className="h-5 w-5" />
              </div>
              <h1 className="text-2xl font-semibold tracking-tight">You’re ready</h1>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-prose">
                <span className="text-foreground font-medium">{profile.schoolName}</span> is set up
                for {profile.sendcoName}. Your dashboard starts empty — consultations will appear
                here as they arrive. You can expand provision and staffing anytime in Settings.
              </p>
            </section>
          )}
        </main>

        <footer className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t pt-6">
          <div>
            {stepIndex > 0 && step !== "done" && (
              <button
                type="button"
                onClick={goBack}
                className="inline-flex items-center gap-2 h-10 px-3 rounded-md text-sm text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="h-4 w-4" /> Back
              </button>
            )}
          </div>
          <div className="flex items-center gap-2">
            {step === "provision" || step === "staffing" ? (
              <button
                type="button"
                onClick={goNext}
                className="h-10 px-4 rounded-md text-sm text-muted-foreground hover:text-foreground"
              >
                Skip for now
              </button>
            ) : null}
            {step === "welcome" && (
              <button
                type="button"
                onClick={goNext}
                className="inline-flex items-center gap-2 h-10 px-5 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90"
              >
                Continue <ArrowRight className="h-4 w-4" />
              </button>
            )}
            {step === "identity" && (
              <button
                type="button"
                onClick={goNext}
                disabled={!identityOk}
                className="inline-flex items-center gap-2 h-10 px-5 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 disabled:opacity-40 disabled:pointer-events-none"
              >
                Continue <ArrowRight className="h-4 w-4" />
              </button>
            )}
            {(step === "provision" || step === "staffing") && (
              <button
                type="button"
                onClick={goNext}
                className="inline-flex items-center gap-2 h-10 px-5 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90"
              >
                Continue <ArrowRight className="h-4 w-4" />
              </button>
            )}
            {step === "done" && (
              <button
                type="button"
                onClick={() => void navigate({ to: "/" })}
                className="inline-flex items-center gap-2 h-10 px-5 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90"
              >
                Open dashboard <ArrowRight className="h-4 w-4" />
              </button>
            )}
          </div>
        </footer>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block space-y-1.5">
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}
