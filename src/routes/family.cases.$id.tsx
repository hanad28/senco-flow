import { createFileRoute, Outlet, notFound } from "@tanstack/react-router";
import { useFamilyCase } from "@/lib/family-case-store";

export const Route = createFileRoute("/family/cases/$id")({
  component: FamilyCaseLayout,
});

function FamilyCaseLayout() {
  const { id } = Route.useParams();
  const { state } = useFamilyCase();
  if (id !== state.id) throw notFound();
  return <Outlet />;
}
