import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/app-shell";
import {
  useSchoolProfile,
  domainLabel,
  domainOrder,
  type NeedDomain,
  type ResponseStyle,
} from "@/lib/school-profile-store";
import { pageTitle } from "@/lib/site";
import { Info, Plus, Trash2, Check, Save } from "lucide-react";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: pageTitle("Settings") },
      {
        name: "description",
        content:
          "School profile, provision catalogue, cohort baseline, staffing and response style: the source of truth for consultation responses.",
      },
    ],
  }),
  component: SettingsPage,
});

function SettingsPage() {
  const {
    profile,
    update,
    updateStaffing,
    setCohort,
    addProvision,
    updateProvision,
    removeProvision,
    addSpecialist,
    updateSpecialist,
    removeSpecialist,
  } = useSchoolProfile();

  const [savedAt, setSavedAt] = useState<Date | null>(null);
  const onSave = () => setSavedAt(new Date());

  return (
    <AppShell
      breadcrumbs={[{ label: "Settings" }]}
      actions={
        <div className="flex items-center gap-3">
          {savedAt && (
            <span className="text-xs text-muted-foreground inline-flex items-center gap-1">
              <Check className="h-3 w-3 text-ok" />
              Saved {savedAt.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}
            </span>
          )}
          <button
            onClick={onSave}
            className="inline-flex items-center gap-2 h-9 px-4 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90"
          >
            <Save className="h-4 w-4" /> Save changes
          </button>
        </div>
      }
    >
      <div className="max-w-4xl mx-auto px-6 py-8 space-y-10">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">School profile</h1>
          <p className="text-sm text-muted-foreground mt-1">
            The source of truth for how the school describes itself, what it offers, and who is on
            roll. Response drafts, templates and reports read from here.
          </p>
        </div>

        {/* 1. Identity */}
        <Section
          title="School identity"
          description="Feeds the sidebar, response letter header and reports."
        >
          <Field label="School name">
            <input
              value={profile.schoolName}
              onChange={(e) => update({ schoolName: e.target.value })}
              className={inputCls}
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="SENDCO name">
              <input
                value={profile.sendcoName}
                onChange={(e) => update({ sendcoName: e.target.value })}
                className={inputCls}
              />
            </Field>
            <Field label="Role / position">
              <input
                value={profile.sendcoRole}
                onChange={(e) => update({ sendcoRole: e.target.value })}
                placeholder="e.g. Assistant Head Teacher & SENDCO"
                className={inputCls}
              />
            </Field>
          </div>
        </Section>

        {/* 2. Provision catalogue */}
        <Section
          title="Provision catalogue"
          description="What the school currently offers, grouped by the four broad areas of need from the SEND Code of Practice."
        >
          <div className="rounded-md border bg-muted/20 px-4 py-3 flex items-start gap-2 text-xs text-muted-foreground">
            <Info className="h-4 w-4 mt-0.5 shrink-0 text-info" />
            <span>
              A child's needs often span more than one of these areas: treat them as a working
              structure, not a fixed classification.
            </span>
          </div>

          {domainOrder.map((d) => (
            <DomainProvision
              key={d}
              domain={d}
              items={profile.provision[d]}
              onAdd={() => addProvision(d)}
              onUpdate={(id, v) => updateProvision(d, id, v)}
              onRemove={(id) => removeProvision(d, id)}
            />
          ))}
        </Section>

        {/* 3. Cohort baseline */}
        <Section
          title="Current cohort baseline"
          description="Pupils already receiving support at the school, by area of need. Used later to compare existing caseload against new consultation demand."
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {domainOrder.map((d) => (
              <Field key={d} label={domainLabel[d]}>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min={0}
                    value={profile.cohort[d]}
                    onChange={(e) => setCohort(d, Math.max(0, parseInt(e.target.value || "0", 10)))}
                    className={`${inputCls} w-24`}
                  />
                  <span className="text-sm text-muted-foreground">pupils currently supported</span>
                </div>
              </Field>
            ))}
          </div>
        </Section>

        {/* 4. Staffing & capacity */}
        <Section title="Staffing & capacity">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="TAs / LSAs on roll">
              <input
                type="number"
                min={0}
                value={profile.staffing.taCount}
                onChange={(e) =>
                  updateStaffing({ taCount: Math.max(0, parseInt(e.target.value || "0", 10)) })
                }
                className={`${inputCls} w-32`}
              />
            </Field>
            <Field label="Typical group-size capacity">
              <input
                value={profile.staffing.typicalGroupSize}
                onChange={(e) => updateStaffing({ typicalGroupSize: e.target.value })}
                className={inputCls}
              />
            </Field>
          </div>
          <Field label="Sensory room / low-stimulus space">
            <textarea
              value={profile.staffing.sensorySpace}
              onChange={(e) => updateStaffing({ sensorySpace: e.target.value })}
              rows={2}
              className={inputCls}
            />
          </Field>

          <div className="pt-2">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h3 className="text-sm font-medium">Specialist staff on roll</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  In-house means employed by the school; external means commissioned or traded in.
                </p>
              </div>
              <button
                onClick={addSpecialist}
                className="inline-flex items-center gap-1.5 h-8 px-3 rounded-md border bg-surface text-xs font-medium hover:bg-accent"
              >
                <Plus className="h-3.5 w-3.5" /> Add specialist
              </button>
            </div>
            <ul className="space-y-2">
              {profile.specialists.map((s) => (
                <li key={s.id} className="grid grid-cols-12 gap-2 items-center">
                  <input
                    value={s.role}
                    placeholder="Role (e.g. Speech & Language Therapist)"
                    onChange={(e) => updateSpecialist(s.id, { role: e.target.value })}
                    className={`${inputCls} col-span-4`}
                  />
                  <select
                    value={s.arrangement}
                    onChange={(e) =>
                      updateSpecialist(s.id, {
                        arrangement: e.target.value as "in-house" | "external",
                      })
                    }
                    className={`${inputCls} col-span-3`}
                  >
                    <option value="in-house">In-house</option>
                    <option value="external">External / commissioned</option>
                  </select>
                  <input
                    value={s.detail}
                    placeholder="Detail (e.g. 0.5 day/week)"
                    onChange={(e) => updateSpecialist(s.id, { detail: e.target.value })}
                    className={`${inputCls} col-span-4`}
                  />
                  <button
                    onClick={() => removeSpecialist(s.id)}
                    aria-label="Remove specialist"
                    className="col-span-1 h-9 grid place-items-center rounded-md text-muted-foreground hover:text-urgent hover:bg-urgent/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </li>
              ))}
              {profile.specialists.length === 0 && (
                <li className="text-xs text-muted-foreground">No specialist staff added.</li>
              )}
            </ul>
          </div>
        </Section>

        {/* 5. Response style */}
        <Section
          title="Response style preference"
          description="Default tone for generated response drafts. Stored now, applied to drafts in a later release."
        >
          <div className="inline-flex rounded-md border bg-surface p-1">
            {(["formal", "plain"] as ResponseStyle[]).map((style) => {
              const active = profile.responseStyle === style;
              return (
                <button
                  key={style}
                  onClick={() => update({ responseStyle: style })}
                  className={`px-4 py-1.5 text-xs font-medium rounded ${
                    active
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {style === "formal" ? "Formal" : "Plain English"}
                </button>
              );
            })}
          </div>
        </Section>
      </div>
    </AppShell>
  );
}

const inputCls =
  "w-full rounded-md border bg-surface px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring/40";

function Section({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
        {description && <p className="text-sm text-muted-foreground mt-1">{description}</p>}
      </div>
      <div className="bg-surface border rounded-lg p-6 space-y-5">{children}</div>
    </section>
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

function DomainProvision({
  domain,
  items,
  onAdd,
  onUpdate,
  onRemove,
}: {
  domain: NeedDomain;
  items: { id: string; description: string }[];
  onAdd: () => void;
  onUpdate: (id: string, v: string) => void;
  onRemove: (id: string) => void;
}) {
  return (
    <div className="border rounded-lg overflow-hidden">
      <header className="px-4 py-3 bg-muted/20 border-b flex items-center justify-between">
        <h3 className="text-sm font-medium">{domainLabel[domain]}</h3>
        <button
          onClick={onAdd}
          className="inline-flex items-center gap-1.5 h-7 px-2.5 rounded-md border bg-surface text-xs font-medium hover:bg-accent"
        >
          <Plus className="h-3.5 w-3.5" /> Add
        </button>
      </header>
      <ul className="p-3 space-y-2">
        {items.map((it) => (
          <li key={it.id} className="flex items-start gap-2">
            <textarea
              value={it.description}
              onChange={(e) => onUpdate(it.id, e.target.value)}
              rows={2}
              placeholder="Named programme, who delivers it, group size/ratio, frequency/duration."
              className={`${inputCls} flex-1 text-sm leading-relaxed`}
            />
            <button
              onClick={() => onRemove(it.id)}
              aria-label="Remove item"
              className="h-9 w-9 grid place-items-center rounded-md text-muted-foreground hover:text-urgent hover:bg-urgent/10"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </li>
        ))}
        {items.length === 0 && (
          <li className="text-xs text-muted-foreground px-1 py-2">No provision recorded yet.</li>
        )}
      </ul>
    </div>
  );
}
