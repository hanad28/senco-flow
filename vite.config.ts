// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig as defineLovableConfig } from "@lovable.dev/vite-tanstack-config";
import { mcpPlugin } from "@lovable.dev/mcp-js/stacks/tanstack/vite";
import type { ConfigEnv, PluginOption, UserConfig } from "vite";

const lovableConfig = defineLovableConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
  vite: {
    plugins: [mcpPlugin()],
    resolve: {
      // Vite 8+ native replacement for vite-tsconfig-paths
      tsconfigPaths: true,
    },
  },
});

// Lovable still injects vite-tsconfig-paths; strip it so Vite stops warning.
// Keep the dep until @lovable.dev/vite-tanstack-config drops the peer.
function withoutTsconfigPathsPlugin(plugins: PluginOption[] = []): PluginOption[] {
  return plugins.flatMap((plugin) => {
    if (Array.isArray(plugin)) return withoutTsconfigPathsPlugin(plugin);
    if (plugin && typeof plugin === "object" && "then" in plugin) {
      return [
        Promise.resolve(plugin).then((resolved) => {
          const next = withoutTsconfigPathsPlugin([resolved as PluginOption]);
          return next[0] ?? false;
        }),
      ];
    }
    if (
      plugin &&
      typeof plugin === "object" &&
      "name" in plugin &&
      plugin.name === "vite-tsconfig-paths"
    ) {
      return [];
    }
    return [plugin];
  });
}

export default async function defineConfig(env: ConfigEnv): Promise<UserConfig> {
  const config = await lovableConfig(env);
  return {
    ...config,
    plugins: withoutTsconfigPathsPlugin(config.plugins as PluginOption[]),
    resolve: {
      ...config.resolve,
      tsconfigPaths: true,
    },
  };
}
