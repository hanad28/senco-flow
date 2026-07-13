import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutGrid,
  ClipboardList,
  Calendar,
  BarChart3,
  Settings,
  HelpCircle,
  Bell,
  AlertTriangle,
  PanelLeftClose,
  PanelLeftOpen,
  Search,
} from "lucide-react";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import { useSchoolProfile } from "@/lib/school-profile-store";
import { useConsultations, deadlineTone } from "@/lib/consultations-store";
import { calendarDaysRemaining } from "@/lib/working-days";
import { useSidebarCollapsed } from "@/hooks/use-sidebar-collapsed";
import { useSearchOverlay } from "@/lib/search-store";
import { GlobalSearchOverlay } from "@/components/global-search";

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
  const [collapsed, , toggleCollapsed] = useSidebarCollapsed();
  const { openSearch } = useSearchOverlay();

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

  // Global Cmd/Ctrl+K to open search.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        openSearch();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openSearch]);

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <aside
        className={`hidden md:flex shrink-0 flex-col bg-sidebar text-sidebar-foreground transition-[width] duration-200 ease-out ${
          collapsed ? "w-16" : "w-64"
        }`}
      >
        <div className={`border-b border-sidebar-border ${collapsed ? "px-2 py-4" : "px-5 py-6"}`}>
          <div className={`flex items-center ${collapsed ? "justify-center" : "gap-3"}`}>
            <div
              className="h-9 w-9 rounded-md bg-sidebar-primary text-sidebar-primary-foreground grid place-items-center text-sm font-semibold tracking-tight shrink-0"
              title={collapsed ? `${profile.schoolName} — ${profile.sendcoName}` : undefined}
            >
              {initials || "MP"}
            </div>
            {!collapsed && (
              <div className="min-w-0">
                <div className="text-sm font-semibold truncate">{profile.schoolName}</div>
                <div className="text-xs text-sidebar-foreground/60 truncate">{profile.sendcoName}</div>
                <div className="text-[11px] text-sidebar-foreground/50 truncate">{profile.sendcoRole}</div>
              </div>
            )}
          </div>
        </div>

        <nav className={`flex-1 py-4 space-y-0.5 ${collapsed ? "px-2" : "px-3"}`}>
          {nav.map((item) => {
            const active = isActive(item.to);
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                title={collapsed ? item.label : undefined}
                aria-label={item.label}
                className={`flex items-center rounded-md text-sm transition-colors ${
                  collapsed ? "justify-center h-9 w-full" : "gap-3 px-3 py-2"
                } ${
                  active
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground/75 hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground"
                }`}
              >
                <Icon className="h-4 w-4 shrink-0" />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        <div className={`border-t border-sidebar-border ${collapsed ? "px-2 py-3" : "px-3 py-4"}`}>
          <a
            href="https://www.gov.uk/government/publications/send-code-of-practice-0-to-25"
            target="_blank"
            rel="noopener noreferrer"
            title={collapsed ? "Statutory guidance" : undefined}
            aria-label="Statutory guidance"
            className={`flex items-center text-xs text-sidebar-foreground/60 hover:text-sidebar-foreground transition-colors ${
              collapsed ? "justify-center h-9" : "gap-2 px-3 py-2"
            }`}
          >
            <HelpCircle className="h-4 w-4 shrink-0" />
            {!collapsed && <span>Statutory guidance</span>}
          </a>
          <button
            type="button"
            onClick={toggleCollapsed}
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            className={`mt-1 flex items-center text-xs text-sidebar-foreground/60 hover:text-sidebar-foreground transition-colors w-full ${
              collapsed ? "justify-center h-9" : "gap-2 px-3 py-2"
            }`}
          >
            {collapsed ? (
              <PanelLeftOpen className="h-4 w-4 shrink-0" />
            ) : (
              <PanelLeftClose className="h-4 w-4 shrink-0" />
            )}
            {!collapsed && <span>Collapse sidebar</span>}
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-14 border-b bg-surface flex items-center justify-between px-6 gap-4">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground min-w-0">
            {(breadcrumbs ?? [{ label: "Dashboard" }]).map((b, i, arr) => (
              <span key={i} className="flex items-center gap-2 min-w-0">
                {b.to ? (
                  <a href={b.to} className="hover:text-foreground truncate">
                    {b.label}
                  </a>
                ) : (
                  <span className={`truncate ${i === arr.length - 1 ? "text-foreground font-medium" : ""}`}>
                    {b.label}
                  </span>
                )}
                {i < arr.length - 1 && <span className="text-border">/</span>}
              </span>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => openSearch()}
              aria-label="Search (⌘K)"
              title="Search (⌘K)"
              className="hidden sm:inline-flex items-center gap-2 h-9 pl-3 pr-2 rounded-md border bg-surface text-xs text-muted-foreground hover:text-foreground hover:bg-accent"
            >
              <Search className="h-3.5 w-3.5" />
              <span>Search</span>
              <kbd className="ml-2 inline-flex items-center gap-0.5 rounded border bg-muted/40 px-1.5 py-0.5 text-[10px] font-medium">
                ⌘K
              </kbd>
            </button>
            {actions}
            <NotificationsBell />
          </div>
        </header>
        <main className="flex-1 min-w-0">{children}</main>
      </div>

      <GlobalSearchOverlay />
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
                Open consultations approaching or past the 15-day window (minimum)
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
                    tone === "urgent" ? "text-urgent" : "text-warn-foreground";
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
