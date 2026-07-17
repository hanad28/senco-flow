// Family workspace layout shell. Separate from AppShell so the school
// SENDCO chrome does not appear here. Applies dir=rtl to its own root
// so RTL languages flip only inside /family.

import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import {
  Home,
  ClipboardList,
  AlertTriangle,
  MessageCircle,
  FileText,
  FolderOpen,
  Users,
  HelpCircle,
  Info,
  RotateCcw,
  Languages,
} from "lucide-react";
import { useFamilyI18n, FAMILY_LANGS, type FamilyLang } from "@/lib/family-i18n";
import { useFamilyCase, issueSectionCount } from "@/lib/family-case-store";
import { FAMILY_STATUTORY } from "@/lib/family-config";
import { WorkspaceSwitcher } from "@/components/workspace-switcher";

export function FamilyShell({ children }: { children: ReactNode }) {
  const { lang, meta, setLang, t } = useFamilyI18n();
  const { state, reset } = useFamilyCase();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const caseBase = `/family/cases/${state.id}`;

  const nav = [
    { to: `/family`, key: "nav.home", icon: Home, exact: true },
    { to: `${caseBase}/plan`, key: "nav.plan", icon: ClipboardList },
    { to: `${caseBase}/issues`, key: "nav.issues", icon: AlertTriangle, count: state.issues.filter((i) => i.status !== "dismissed" && i.status !== "ready").length },
    { to: `${caseBase}/assistant`, key: "nav.assistant", icon: MessageCircle },
    { to: `${caseBase}/response`, key: "nav.response", icon: FileText },
    { to: `${caseBase}/documents`, key: "nav.documents", icon: FolderOpen },
    { to: `${caseBase}/support`, key: "nav.support", icon: Users },
    { to: `/family/help`, key: "nav.help", icon: HelpCircle },
  ];

  const isActive = (to: string, exact?: boolean) => {
    if (exact) return pathname === to;
    return pathname === to || pathname.startsWith(to);
  };

  // Sync dir on the family root only (not the whole document).
  const dir = meta.dir;

  return (
    <div dir={dir} className="flex min-h-dvh flex-col bg-background text-foreground" data-family-lang={lang}>
      {/* Top banner */}
      <div className="bg-info/10 border-b border-info/30 text-info-foreground text-xs">
        <div className="max-w-7xl mx-auto px-4 py-2 flex flex-wrap items-center gap-x-4 gap-y-1">
          <Info className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          <span className="font-medium">{t("common.demoBanner")}</span>
          <span className="opacity-75">{FAMILY_STATUTORY.aiDisclosure}</span>
        </div>
      </div>

      <header className="border-b bg-surface">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <Link to="/family" className="flex items-center gap-2 font-semibold tracking-tight text-primary">
              <span aria-hidden="true" className="inline-grid h-8 w-8 place-items-center rounded-md bg-primary text-primary-foreground text-xs">EHC</span>
              <span className="truncate">{t("workspace.family")}</span>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <WorkspaceSwitcher current="family" />
            <LanguagePicker lang={lang} setLang={setLang} />
            <button
              type="button"
              onClick={() => {
                if (window.confirm(t("common.resetDemoConfirm"))) reset();
              }}
              className="hidden sm:inline-flex items-center gap-1.5 h-8 px-2.5 rounded-md border text-xs text-muted-foreground hover:text-foreground hover:bg-accent"
              aria-label={t("common.resetDemo")}
            >
              <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
              <span>{t("common.resetDemo")}</span>
            </button>
          </div>
        </div>
      </header>

      <div className="flex-1 flex flex-col md:flex-row min-w-0">
        <aside className="md:w-60 md:shrink-0 border-b md:border-b-0 md:border-e bg-surface">
          <nav className="p-2 md:p-3 flex md:block gap-1 overflow-x-auto md:overflow-visible" aria-label="Family workspace">
            {nav.map((item) => {
              const active = isActive(item.to, item.exact);
              const Icon = item.icon;
              const secIssueCount = item.key === "nav.plan" ? state.issues.filter((i) => i.status !== "dismissed").length : undefined;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`flex items-center gap-2.5 rounded-md text-sm px-3 py-2 min-h-11 min-w-11 shrink-0 transition-colors ${
                    active
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  }`}
                  aria-current={active ? "page" : undefined}
                >
                  <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span className="truncate">{t(item.key)}</span>
                  {"count" in item && item.count ? (
                    <span className="ms-auto inline-flex items-center justify-center min-w-5 h-5 px-1.5 rounded-full bg-warn text-warn-foreground text-[10px] font-semibold">
                      {item.count}
                    </span>
                  ) : secIssueCount && item.key === "nav.plan" ? (
                    <span className="ms-auto text-[10px] text-muted-foreground">{secIssueCount}</span>
                  ) : null}
                </Link>
              );
            })}
          </nav>
        </aside>

        <main className="flex-1 min-w-0">{children}</main>
      </div>

      <footer className="border-t bg-surface">
        <div className="max-w-7xl mx-auto px-4 py-3 text-[11px] text-muted-foreground flex flex-wrap items-center gap-x-4 gap-y-1">
          <span>{FAMILY_STATUTORY.jurisdiction}</span>
          <span aria-hidden="true">·</span>
          <span>{FAMILY_STATUTORY.framework}</span>
          <span aria-hidden="true">·</span>
          <span>Last reviewed {FAMILY_STATUTORY.lastReviewedIso}</span>
          <span className="ms-auto">{FAMILY_STATUTORY.disclaimer}</span>
        </div>
      </footer>
    </div>
  );
}

function LanguagePicker({ lang, setLang }: { lang: FamilyLang; setLang: (l: FamilyLang) => void }) {
  return (
    <label className="inline-flex items-center gap-1.5 h-8 px-2 rounded-md border bg-surface text-xs">
      <Languages className="h-3.5 w-3.5 text-muted-foreground" aria-hidden="true" />
      <span className="sr-only">Language</span>
      <select
        value={lang}
        onChange={(e) => setLang(e.target.value as FamilyLang)}
        className="bg-transparent outline-none text-xs pr-1"
        aria-label="Choose language"
      >
        {FAMILY_LANGS.map((l) => (
          <option key={l.code} value={l.code}>
            {l.nativeName} ({l.englishName})
          </option>
        ))}
      </select>
    </label>
  );
}

// A small helper for status tone → colour + icon + label. Used by pages.
export function StatusChip({ tone, label, Icon }: { tone: "ok" | "warn" | "info" | "muted"; label: string; Icon: React.ComponentType<{ className?: string }> }) {
  const cls = {
    ok: "bg-ok/10 text-ok border-ok/30",
    warn: "bg-warn/15 text-warn-foreground border-warn/40",
    info: "bg-info/10 text-info-foreground border-info/30",
    muted: "bg-muted text-muted-foreground border-border",
  }[tone];
  return (
    <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] ${cls}`}>
      <Icon className="h-3 w-3" aria-hidden="true" />
      <span>{label}</span>
    </span>
  );
}

// A generic AI-generated content badge.
export function AiLabel({ children }: { children?: ReactNode }) {
  const { t } = useFamilyI18n();
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-info/40 bg-info/10 px-1.5 py-0.5 text-[10px] text-info-foreground" title={t("common.aiDisclosure")}>
      <span className="h-1.5 w-1.5 rounded-full bg-info" aria-hidden="true" />
      <span>{children ?? "AI"}</span>
    </span>
  );
}

// Auto-focus fix helper (unused import guard)
export function _noop() {
  useEffect(() => {}, []);
}
