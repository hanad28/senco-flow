import { Link, useRouterState } from "@tanstack/react-router";
import { LayoutGrid, ClipboardList, Calendar, BarChart3, Settings, HelpCircle, Bell, AlertTriangle } from "lucide-react";
import { useMemo, useState, type ReactNode } from "react";
import { useSchoolProfile } from "@/lib/school-profile-store";
import { useConsultations, deadlineTone } from "@/lib/consultations-store";
import { calendarDaysRemaining } from "@/lib/working-days";

const nav = [
  { to: "/", label: "Dashboard", icon: LayoutGrid },
  { to: "/templates", label: "Templates", icon: ClipboardList },
  { to: "/calendar", label: "Calendar", icon: Calendar },
  { to: "/reports", label: "Reports", icon: BarChart3 },
  { to: "/settings", label: "Settings", icon: Settings },
] as const;

export function AppShell({
  children,
  breadcrumbs,
  actions,
}: {
  children: ReactNode;
  breadcrumbs?: { label: string; to?: string }[];
  actions?: ReactNode;
}) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { profile } = useSchoolProfile();
  const initials = profile.schoolName
    .split(/\s+/)
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const isActive = (to: string) => {
    if (to === "/") return pathname === "/" || pathname.startsWith("/consultations");
    return pathname === to || pathname.startsWith(to + "/");
  };

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <aside className="hidden md:flex w-64 shrink-0 flex-col bg-sidebar text-sidebar-foreground">
        <div className="px-5 py-6 border-b border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-md bg-sidebar-primary text-sidebar-primary-foreground grid place-items-center text-sm font-semibold tracking-tight">
              {initials || "MP"}
            </div>
            <div className="min-w-0">
              <div className="text-sm font-semibold truncate">{profile.schoolName}</div>
              <div className="text-xs text-sidebar-foreground/60 truncate">
                {profile.sendcoName}
              </div>
              <div className="text-[11px] text-sidebar-foreground/50 truncate">
                {profile.sendcoRole}
              </div>
            </div>
          </div>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-0.5">
          {nav.map((item) => {
            const active = isActive(item.to);
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${
                  active
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground/75 hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
        <div className="px-3 py-4 border-t border-sidebar-border">
          <a
            href="https://www.gov.uk/government/publications/send-code-of-practice-0-to-25"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-2 text-xs text-sidebar-foreground/60 hover:text-sidebar-foreground transition-colors"
          >
            <HelpCircle className="h-4 w-4" />
            <span>Statutory guidance</span>
          </a>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-14 border-b bg-surface flex items-center justify-between px-6">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            {(breadcrumbs ?? [{ label: "Dashboard" }]).map((b, i, arr) => (
              <span key={i} className="flex items-center gap-2">
                {b.to ? (
                  <a href={b.to} className="hover:text-foreground">
                    {b.label}
                  </a>
                ) : (
                  <span className={i === arr.length - 1 ? "text-foreground font-medium" : ""}>
                    {b.label}
                  </span>
                )}
                {i < arr.length - 1 && <span className="text-border">/</span>}
              </span>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            {actions}
            <NotificationsBell />
          </div>
        </header>
        <main className="flex-1 min-w-0">{children}</main>
      </div>
    </div>
  );
}

function NotificationsBell() {
  const { consultations } = useConsultations();
  const [open, setOpen] = useState(false);

  const items = useMemo(() => {
    return consultations
      .filter((c) => c.status !== "Submitted")
      .map((c) => {
        const days = calendarDaysRemaining(c.receivedOn);
        return { c, days, tone: deadlineTone(days) };
      })
      .filter((x) => x.tone !== "ok")
      .sort((a, b) => a.days - b.days);
  }, [consultations]);

  const badge = items.length;

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={`Notifications${badge ? ` (${badge})` : ""}`}
        aria-expanded={open}
        className="h-9 w-9 grid place-items-center rounded-md border hover:bg-accent relative"
      >
        <Bell className="h-4 w-4" />
        {badge > 0 && (
          <span
            className={`absolute -top-1 -right-1 min-w-4 h-4 px-1 rounded-full text-[10px] font-semibold grid place-items-center tabular-nums ${
              items.some((i) => i.tone === "urgent")
                ? "bg-urgent text-urgent-foreground"
                : "bg-warn text-warn-foreground"
            }`}
          >
            {badge}
          </span>
        )}
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-full mt-2 z-50 w-80 rounded-md border bg-surface shadow-lg overflow-hidden">
            <div className="px-4 py-3 border-b">
              <div className="text-sm font-semibold">Deadline notifications</div>
              <div className="text-[11px] text-muted-foreground mt-0.5">
                Open consultations approaching or past the 15-day window
              </div>
            </div>
            {items.length === 0 ? (
              <div className="px-4 py-6 text-center text-xs text-muted-foreground">
                No open consultations due within 5 days.
              </div>
            ) : (
              <ul className="max-h-96 overflow-y-auto divide-y">
                {items.map(({ c, days, tone }) => {
                  const label =
                    days < 0
                      ? `Overdue by ${Math.abs(days)} day${Math.abs(days) === 1 ? "" : "s"}`
                      : days === 0
                        ? "Due today"
                        : `${days} day${days === 1 ? "" : "s"} left`;
                  const toneClass =
                    tone === "urgent"
                      ? "text-urgent"
                      : "text-warn-foreground";
                  return (
                    <li key={c.id}>
                      <Link
                        to="/consultations/$id"
                        params={{ id: c.id }}
                        onClick={() => setOpen(false)}
                        className="block px-4 py-3 hover:bg-muted/40"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <div className="text-sm font-medium truncate">
                              {c.pupilRef} · {c.localAuthority}
                            </div>
                            <div className="text-[11px] text-muted-foreground mt-0.5 truncate">
                              {c.status} · {c.yearGroup}
                            </div>
                          </div>
                          <div className={`inline-flex items-center gap-1 text-[11px] font-medium shrink-0 ${toneClass}`}>
                            {tone === "urgent" && <AlertTriangle className="h-3 w-3" />}
                            {label}
                          </div>
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </>
      )}
    </div>
  );
}
