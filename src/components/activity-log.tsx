import { Inbox, FileText, ListChecks, PenSquare, Pencil, Paperclip, Sparkles, Send } from "lucide-react";
import type { ActivityAction, ActivityEntry } from "@/lib/consultations-store";
import { formatDateTime } from "@/lib/consultations-store";
import { useSchoolProfile } from "@/lib/school-profile-store";

const meta: Record<ActivityAction, { label: string; Icon: typeof Inbox; tone: string }> = {
  received:           { label: "Consultation received",  Icon: Inbox,      tone: "text-info" },
  document_opened:    { label: "Documents opened",       Icon: FileText,   tone: "text-muted-foreground" },
  needs_reviewed:     { label: "Needs reviewed",         Icon: ListChecks, tone: "text-primary" },
  draft_started:      { label: "Draft started",          Icon: PenSquare,  tone: "text-primary" },
  draft_edited:       { label: "Draft edited",           Icon: Pencil,     tone: "text-muted-foreground" },
  evidence_attached:  { label: "Evidence attached",      Icon: Paperclip,  tone: "text-muted-foreground" },
  template_inserted:  { label: "Template snippet inserted", Icon: Sparkles, tone: "text-primary" },
  submitted:          { label: "Response submitted",     Icon: Send,       tone: "text-ok" },
};

export function ActivityLog({ entries }: { entries: ActivityEntry[] }) {
  const { profile } = useSchoolProfile();
  const actor = profile.sendcoName;

  if (!entries || entries.length === 0) {
    return (
      <section className="bg-surface border rounded-lg p-5">
        <h3 className="text-sm font-semibold">Activity</h3>
        <p className="text-xs text-muted-foreground mt-1">No activity recorded yet.</p>
      </section>
    );
  }

  const sorted = [...entries].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
  );

  return (
    <section className="bg-surface border rounded-lg overflow-hidden">
      <header className="px-5 py-4 border-b">
        <h3 className="text-sm font-semibold">Activity</h3>
        <p className="text-[11px] text-muted-foreground mt-0.5">
          Attributed to {actor}
        </p>
      </header>
      <ol className="divide-y">
        {sorted.map((e) => {
          const m = meta[e.action];
          const Icon = m.Icon;
          return (
            <li key={e.id} className="px-5 py-3 flex items-start gap-3">
              <div className={`mt-0.5 h-7 w-7 rounded-full bg-muted grid place-items-center shrink-0 ${m.tone}`}>
                <Icon className="h-3.5 w-3.5" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline justify-between gap-3">
                  <div className="text-sm font-medium truncate">{m.label}</div>
                  <time
                    dateTime={e.timestamp}
                    className="text-[11px] text-muted-foreground tabular-nums shrink-0"
                  >
                    {formatDateTime(e.timestamp)}
                  </time>
                </div>
                {e.detail && (
                  <div className="text-xs text-muted-foreground mt-0.5 break-words">{e.detail}</div>
                )}
                <div className="text-[11px] text-muted-foreground/70 mt-0.5">by {actor}</div>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
