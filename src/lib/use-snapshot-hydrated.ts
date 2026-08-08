import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import type { SnapshotKind } from "@/lib/use-persistent-snapshot";

/** True once Convex has answered for this snapshot kind (null or value). */
export function useSnapshotHydrated(kind: SnapshotKind): boolean {
  const remote = useQuery(api.snapshots.get, { kind });
  return remote !== undefined;
}
