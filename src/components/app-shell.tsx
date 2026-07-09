import { Link, useRouterState } from "@tanstack/react-router";
import { LayoutGrid, Inbox, FileCheck2, ClipboardList, HelpCircle, Bell } from "lucide-react";
import type { ReactNode } from "react";

const nav = [
  { to: "/", label: "Dashboard", icon: LayoutGrid, exact: true },
  { to: "/", label: "Inbox", icon: Inbox },
  { to: "/", label: "Submitted", icon: FileCheck2 },
  { to: "/", label: "Templates", icon: ClipboardList },
];

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

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <aside className="hidden md:flex w-64 shrink-0 flex-col bg-sidebar text-sidebar-foreground">
        <div className="px-5 py-6 border-b border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-md bg-sidebar-primary text-sidebar-primary-foreground grid place-items-center text-sm font-semibold tracking-tight">
              MP
            </div>
            <div className="min-w-0">
              <div className="text-sm font-semibold truncate">Millbrook Primary</div>
              <div className="text-xs text-sidebar-foreground/60 truncate">SENCO — S. Ahmed</div>
            </div>
          </div>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-0.5">
          {nav.map((item, i) => {
            const active = i === 0 && pathname === "/";
            const Icon = item.icon;
            return (
              <Link
                key={i}
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
          <div className="flex items-center gap-2 px-3 py-2 text-xs text-sidebar-foreground/60">
            <HelpCircle className="h-4 w-4" />
            <span>Statutory guidance</span>
          </div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-14 border-b bg-surface flex items-center justify-between px-6">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            {(breadcrumbs ?? [{ label: "Dashboard" }]).map((b, i, arr) => (
              <span key={i} className="flex items-center gap-2">
                {b.to ? (
                  <Link to={b.to} className="hover:text-foreground">
                    {b.label}
                  </Link>
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
            <button className="h-9 w-9 grid place-items-center rounded-md border hover:bg-accent">
              <Bell className="h-4 w-4" />
            </button>
          </div>
        </header>
        <main className="flex-1 min-w-0">{children}</main>
      </div>
    </div>
  );
}
