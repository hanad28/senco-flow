import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { UserPlus, ShieldCheck, Users } from "lucide-react";
import { FamilyShell } from "@/components/family-shell";
import { useFamilyI18n } from "@/lib/family-i18n";
import { useFamilyCase } from "@/lib/family-case-store";

export const Route = createFileRoute("/family/cases/$id/support")({
  component: SupportScreen,
});

function SupportScreen() {
  const { t } = useFamilyI18n();
  const { state, dispatch } = useFamilyCase();
  const [name, setName] = useState("");
  const [role, setRole] = useState("");

  return (
    <FamilyShell>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        <header>
          <h1 className="text-2xl font-semibold tracking-tight">{t("nav.support")}</h1>
          <p className="text-sm text-muted-foreground mt-1 max-w-3xl">
            Everyone involved in Maya&apos;s fictional case. Support contacts are part of this demo
            workspace view and are not shared automatically with other organisations.
          </p>
        </header>

        <div className="rounded-lg border bg-info/10 border-info/30 p-3 text-xs text-info-foreground flex items-start gap-2">
          <ShieldCheck className="h-4 w-4 mt-0.5 shrink-0" aria-hidden="true" />
          <span>
            Demo only: when you are signed in, names, roles and private notes you add here are saved
            with the fictional case snapshot in Unisen&apos;s cloud (not browser-only / session-only).
            Do not enter real children&apos;s data.
          </span>
        </div>

        <ul className="space-y-2">
          {state.support.map((s) => (
            <li key={s.id} className="rounded-lg border bg-surface p-4 flex flex-wrap items-start gap-3">
              <div className="h-10 w-10 rounded-full bg-primary/10 text-primary grid place-items-center shrink-0"><Users className="h-5 w-5" aria-hidden="true" /></div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium">{s.name}</div>
                <div className="text-xs text-muted-foreground">{s.role} · {s.access}{s.addedByFamily ? " · added by family" : ""}</div>
                <label className="mt-2 inline-flex items-center gap-2 text-xs">
                  <input type="checkbox" checked={!!s.wantsContact} onChange={(e) => dispatch({ type: "updateSupport", id: s.id, patch: { wantsContact: e.target.checked } })} />
                  <span>Family would like to contact this person</span>
                </label>
                <textarea
                  placeholder="Private note (for you only)"
                  value={s.privateNote ?? ""}
                  onChange={(e) => dispatch({ type: "updateSupport", id: s.id, patch: { privateNote: e.target.value } })}
                  className="mt-2 w-full rounded-md border bg-surface px-3 py-2 text-xs"
                  rows={2}
                />
              </div>
            </li>
          ))}
        </ul>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!name.trim() || !role.trim()) return;
            dispatch({ type: "addSupport", m: { name: name.trim(), role: role.trim(), access: "Family contact" } });
            setName(""); setRole("");
          }}
          className="rounded-lg border bg-surface p-4 space-y-3"
        >
          <h2 className="text-sm font-semibold flex items-center gap-2"><UserPlus className="h-4 w-4" aria-hidden="true" /> Add someone to my support network</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <label className="text-xs">Name
              <input value={name} onChange={(e) => setName(e.target.value)} className="mt-1 w-full min-h-11 rounded-md border bg-surface px-3 text-sm" />
            </label>
            <label className="text-xs">Role
              <input value={role} onChange={(e) => setRole(e.target.value)} className="mt-1 w-full min-h-11 rounded-md border bg-surface px-3 text-sm" placeholder="e.g. Grandmother, GP, advocate" />
            </label>
          </div>
          <button type="submit" className="inline-flex items-center gap-2 min-h-11 px-4 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90">
            <UserPlus className="h-4 w-4" aria-hidden="true" /> Add contact
          </button>
        </form>
      </div>
    </FamilyShell>
  );
}
