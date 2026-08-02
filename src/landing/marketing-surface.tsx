import { Outlet, useRouterState } from "@tanstack/react-router";
import { LandingPage } from "./landing-page";

/** Cold marketing host: home landing, or router Outlet for other public pages. */
export function MarketingSurface() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  if (pathname === "/" || pathname === "") {
    return <LandingPage />;
  }
  return <Outlet />;
}
