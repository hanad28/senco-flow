import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { FileText, Upload, Trash2, Search, CheckCircle2, AlertTriangle, User, Info } from "lucide-react";
import { FamilyShell, StatusChip } from "@/components/family-shell";
import { useFamilyI18n } from "@/lib/family-i18n";
import { useFamilyCase } from "@/lib/family-case-store";

export const Route = createFileRoute("/family/cases/$id/documents")({
  component: DocumentsScreen,
});

function DocumentsScreen() {
  const { t } = useFamilyI18n();
  const { state, dispatch } = useFamilyCase();
  const [q, setQ] = useState("");
  const [addOpen, setAddOpen] = useState(false);
  const filtered = state.documents.filter((d) => d.title.toLowerCase().includes(q.toLowerCase()) || d.professional.toLowerCase().includes(q.toLowerCase()));

  return (
    <FamilyShell>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        <header className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">{t("nav.documents")}</h1>
            <p className="text-sm text-muted-foreground mt-1">All documents referenced in Maya's fictional case.</p>
          </div>
          <button type="button" onClick={() => setAddOpen(true)} className="inline-flex items-center gap-2 min-h-11 px-4 rounded-md bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90">
            <Upload className="h-4 w-4" aria-hidden="true" /> Add my own document
          </button>
        </header>

        <div className="rounded-md bg-info/10 border border-info/30 text-info-foreground text-xs p-3 flex items-start gap-2">
          <Info className="h-4 w-4 mt-0.5 shrink-0" aria-hidden="true" />
          <span>This is a demonstration. No files are uploaded or analysed. Document titles and metadata you add are saved with the fictional case snapshot in Unisen&apos;s cloud when you are signed in.</span>
        </div>

        <div className="relative">
          <Search className="absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" aria-hidden="true" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search documents" className="w-full min-h-11 rounded-md border bg-surface ps-9 pe-3 text-sm" />
        </div>

        <ul className="space-y-3">
          {filtered.map((d) => {
            const statusTone: "ok" | "warn" | "muted" | "info" = d.status === "reviewed" ? "ok" : d.status === "needs_attention" ? "warn" : d.status === "added_by_family" ? "info" : "muted";
            const StatusIcon = d.status === "reviewed" ? CheckCircle2 : d.status === "needs_attention" ? AlertTriangle : User;
            return (
              <li key={d.id} className="rounded-lg border bg-surface p-4 sm:p-5">
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-md bg-primary/10 text-primary grid place-items-center shrink-0"><FileText className="h-5 w-5" aria-hidden="true" /></div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="min-w-0">
                        <h2 className="text-sm font-semibold truncate">{d.title}</h2>
                        <div className="text-xs text-muted-foreground truncate">{d.professional} · {d.kind} · {d.date} · {d.pages}pp</div>
                      </div>
                      <StatusChip tone={statusTone} label={d.status.replace("_", " ")} Icon={StatusIcon} />
                    </div>
                    {d.extracts.length > 0 && (
                      <details className="mt-3">
                        <summary className="cursor-pointer text-xs text-primary hover:underline">Show {d.extractedCount} extracted excerpts</summary>
                        <ul className="mt-2 space-y-1">
                          {d.extracts.map((e, i) => (
                            <li key={i} className="rounded-md bg-muted/40 p-2 text-xs">
                              <span className="text-[10px] uppercase tracking-wide text-muted-foreground me-2">p.{e.page}</span>
                              {e.text}
                            </li>
                          ))}
                        </ul>
                      </details>
                    )}
                    {d.status === "added_by_family" && (
                      <button
                        type="button"
                        onClick={() => dispatch({ type: "removeDocument", id: d.id })}
                        className="mt-3 inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-urgent"
                      >
                        <Trash2 className="h-3 w-3" aria-hidden="true" /> Remove
                      </button>
                    )}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        {addOpen && (
          <AddDocDialog
            onClose={() => setAddOpen(false)}
            onAdd={(title) => {
              dispatch({
                type: "addDocument",
                d: {
                  title,
                  professional: "Added by family",
                  kind: "Family upload",
                  date: new Date().toISOString().slice(0, 10),
                  pages: 1,
                  status: "added_by_family",
                  extractedCount: 0,
                  issueRefs: [],
                  extracts: [],
                },
              });
              setAddOpen(false);
            }}
          />
        )}
      </div>
    </FamilyShell>
  );
}

function AddDocDialog({ onClose, onAdd }: { onClose: () => void; onAdd: (title: string) => void }) {
  const [title, setTitle] = useState("");
  return (
    <div role="dialog" aria-modal="true" aria-labelledby="add-doc-title" className="fixed inset-0 z-50 grid place-items-center bg-foreground/40 p-4">
      <div className="w-full max-w-md rounded-lg bg-surface border shadow-lg p-5 space-y-4">
        <h3 id="add-doc-title" className="text-base font-semibold">Add your own document</h3>
        <p className="text-xs text-muted-foreground">No file is uploaded. The title and metadata are saved to Unisen&apos;s cloud with the rest of this case when you are signed in.</p>
        <label className="text-xs block">Title
          <input autoFocus value={title} onChange={(e) => setTitle(e.target.value)} className="mt-1 w-full min-h-11 rounded-md border bg-surface px-3 text-sm" />
        </label>
        <div className="flex justify-end gap-2">
          <button type="button" onClick={onClose} className="min-h-11 px-3 rounded-md border text-sm hover:bg-accent">Cancel</button>
          <button type="button" onClick={() => title.trim() && onAdd(title.trim())} disabled={!title.trim()} className="min-h-11 px-4 rounded-md bg-primary text-primary-foreground text-sm font-medium disabled:opacity-40">Add</button>
        </div>
      </div>
    </div>
  );
}
