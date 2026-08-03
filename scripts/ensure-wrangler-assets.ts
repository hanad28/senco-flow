import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

/**
 * Nitro regenerates `.output/server/wrangler.json` and replaces the `assets`
 * object, dropping `run_worker_first`. Re-apply it after every production build.
 *
 * Note: even with this flag, Nitro's outer Cloudflare handler still serves
 * matching ASSETS before the nested TanStack SSR entry. Host-aware robots and
 * SSR security headers are handled in src/server.ts; static headers use
 * public/_headers; www/HTTP consolidation needs Cloudflare platform rules.
 */
const targets = [
  resolve("wrangler.jsonc"),
  resolve(".output/server/wrangler.json"),
];

function ensureRunWorkerFirst(path: string): boolean {
  if (!existsSync(path)) return false;
  const raw = readFileSync(path, "utf8");
  // Strip // line comments for jsonc, keep strings intact enough for our patch.
  let data: Record<string, unknown>;
  try {
    if (path.endsWith(".jsonc")) {
      // Minimal jsonc strip: remove // comments not inside strings (good enough here).
      const stripped = raw.replace(/^\s*\/\/.*$/gm, "");
      data = JSON.parse(stripped) as Record<string, unknown>;
    } else {
      data = JSON.parse(raw) as Record<string, unknown>;
    }
  } catch (error) {
    throw new Error(`Failed to parse ${path}: ${error}`);
  }

  const assets =
    data.assets && typeof data.assets === "object"
      ? { ...(data.assets as Record<string, unknown>) }
      : {};
  if (assets.run_worker_first === true) return false;

  assets.run_worker_first = true;
  if (!assets.binding) assets.binding = "ASSETS";
  data.assets = assets;

  if (path.endsWith(".jsonc")) {
    // Preserve hand-maintained wrangler.jsonc formatting via targeted replace.
    if (/"assets"\s*:\s*\{[^}]*"run_worker_first"\s*:\s*true/.test(raw)) return false;
    if (!raw.includes('"assets"')) {
      throw new Error(`${path} is missing an assets section`);
    }
    const next = raw.replace(
      /("assets"\s*:\s*\{)/,
      `$1\n    "run_worker_first": true,`,
    );
    if (next === raw) {
      throw new Error(`Could not insert run_worker_first into ${path}`);
    }
    writeFileSync(path, next);
  } else {
    writeFileSync(path, `${JSON.stringify(data, null, 2)}\n`);
  }
  return true;
}

let changed = false;
for (const target of targets) {
  if (ensureRunWorkerFirst(target)) {
    console.log(`ensure-wrangler-assets: set run_worker_first on ${target}`);
    changed = true;
  } else if (existsSync(target)) {
    console.log(`ensure-wrangler-assets: already set on ${target}`);
  }
}

if (!changed && !existsSync(resolve(".output/server/wrangler.json"))) {
  console.log(
    "ensure-wrangler-assets: no generated wrangler.json yet (run after bun run build)",
  );
}
