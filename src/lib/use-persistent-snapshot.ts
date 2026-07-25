import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export type SnapshotKind = "consultations" | "schoolProfile" | "templates" | "familyCase";

export function usePersistentSnapshot<T>(
  kind: SnapshotKind,
  initialValue: T,
): [T, Dispatch<SetStateAction<T>>] {
  const remote = useQuery(api.snapshots.get, { kind }) as T | null | undefined;
  const save = useMutation(api.snapshots.save);
  const [state, setLocalState] = useState(initialValue);
  const stateRef = useRef(state);

  useEffect(() => {
    if (remote === undefined) return;
    if (remote === null) {
      void save({ kind, value: initialValue });
      return;
    }
    stateRef.current = remote;
    setLocalState(remote);
  }, [initialValue, kind, remote, save]);

  const setState = useCallback<Dispatch<SetStateAction<T>>>(
    (update) => {
      const next =
        typeof update === "function" ? (update as (previous: T) => T)(stateRef.current) : update;
      stateRef.current = next;
      setLocalState(next);
      void save({ kind, value: next });
    },
    [kind, save],
  );

  return [state, setState];
}
