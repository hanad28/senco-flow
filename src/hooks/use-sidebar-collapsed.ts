import { useEffect, useState } from "react";

const KEY = "ehcp:sidebar-collapsed";

// Persists sidebar collapsed/expanded across route changes via localStorage.
// SSR-safe: initial render is always "expanded", then rehydrates on mount.
export function useSidebarCollapsed(): [boolean, (v: boolean) => void, () => void] {
  const [collapsed, setCollapsedState] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw === "1") setCollapsedState(true);
    } catch {
      /* ignore */
    }
  }, []);

  const setCollapsed = (v: boolean) => {
    setCollapsedState(v);
    try {
      localStorage.setItem(KEY, v ? "1" : "0");
    } catch {
      /* ignore */
    }
  };

  const toggle = () => setCollapsed(!collapsed);

  return [collapsed, setCollapsed, toggle];
}
