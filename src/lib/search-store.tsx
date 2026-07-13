import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

type Ctx = {
  open: boolean;
  query: string;
  setQuery: (q: string) => void;
  openSearch: (initialQuery?: string) => void;
  closeSearch: () => void;
};

const SearchContext = createContext<Ctx | null>(null);

export function SearchProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const openSearch = useCallback((initialQuery?: string) => {
    if (typeof initialQuery === "string") setQuery(initialQuery);
    setOpen(true);
  }, []);

  const closeSearch = useCallback(() => setOpen(false), []);

  const value = useMemo<Ctx>(
    () => ({ open, query, setQuery, openSearch, closeSearch }),
    [open, query, openSearch, closeSearch],
  );

  return <SearchContext.Provider value={value}>{children}</SearchContext.Provider>;
}

export function useSearchOverlay() {
  const ctx = useContext(SearchContext);
  if (!ctx) throw new Error("useSearchOverlay must be used within SearchProvider");
  return ctx;
}
