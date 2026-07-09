import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/consultations/$id")({
  component: () => <Outlet />,
});
