#!/usr/bin/env bun
/**
 * Export a Notion page tree to markdown files under docs/notion/.
 *
 * Setup:
 * 1. Create an internal integration: https://www.notion.so/my-integrations
 * 2. Share the root page (and child pages) with the integration
 * 3. Add NOTION_API_KEY=secret_... to .env.local
 * 4. bun scripts/export-notion.mjs [page-id-or-url]
 */

import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const OUTPUT_DIR = path.join(ROOT, "docs", "notion");

const DEFAULT_PAGE_ID = "3807ee67-9ffa-81e4-aa2c-dba5ab0f7398";
const NOTION_VERSION = "2022-06-28";

function parsePageId(input) {
  if (!input) return DEFAULT_PAGE_ID;
  const match = input.match(/([0-9a-f]{32}|[0-9a-f-]{36})/i);
  if (!match) throw new Error(`Could not parse Notion page id from: ${input}`);
  const raw = match[1].replace(/-/g, "");
  if (raw.length !== 32) throw new Error(`Invalid Notion page id: ${input}`);
  return `${raw.slice(0, 8)}-${raw.slice(8, 12)}-${raw.slice(12, 16)}-${raw.slice(16, 20)}-${raw.slice(20)}`;
}

function sanitizeFilename(name) {
  const cleaned = name
    .trim()
    .replace(/[<>:"/\\|?*\u0000-\u001f]/g, "")
    .replace(/\s+/g, " ")
    .slice(0, 120);
  return cleaned || "untitled";
}

function richTextToPlain(richText = []) {
  return richText.map((part) => part.plain_text ?? "").join("");
}

function getPageTitle(page) {
  const props = page.properties ?? {};
  for (const value of Object.values(props)) {
    if (value?.type === "title" && value.title?.length) {
      return richTextToPlain(value.title);
    }
  }
  return "untitled";
}

function getBlockTitle(block) {
  if (block.type === "child_page") return block.child_page?.title ?? "untitled";
  if (block.type === "child_database") return block.child_database?.title ?? "untitled";
  return "untitled";
}

async function notionFetch(token, endpoint, options = {}) {
  const response = await fetch(`https://api.notion.com/v1${endpoint}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      "Notion-Version": NOTION_VERSION,
      "Content-Type": "application/json",
      ...(options.headers ?? {}),
    },
  });

  const body = await response.json();
  if (!response.ok) {
    const detail = body?.message ?? response.statusText;
    throw new Error(`Notion API ${response.status}: ${detail}`);
  }
  return body;
}

async function getPageMarkdown(token, pageId) {
  try {
    const result = await notionFetch(token, `/pages/${pageId}/markdown`);
    if (typeof result.markdown === "string") return result.markdown;
  } catch (error) {
    if (!String(error.message).includes("404")) throw error;
  }

  return blocksToMarkdown(token, pageId);
}

async function listAllBlockChildren(token, blockId) {
  const results = [];
  let cursor;

  do {
    const query = cursor ? `?start_cursor=${encodeURIComponent(cursor)}` : "";
    const page = await notionFetch(token, `/blocks/${blockId}/children${query}`);
    results.push(...(page.results ?? []));
    cursor = page.has_more ? page.next_cursor : undefined;
  } while (cursor);

  return results;
}

async function blocksToMarkdown(token, blockId, depth = 0) {
  const blocks = await listAllBlockChildren(token, blockId);
  const lines = [];

  for (const block of blocks) {
    const indent = "  ".repeat(depth);
    const type = block.type;
    const payload = block[type] ?? {};

    if (type === "child_page" || type === "child_database") {
      lines.push(`${indent}- [${getBlockTitle(block)}](./${sanitizeFilename(getBlockTitle(block))}.md)`);
      continue;
    }

    if (type === "paragraph") {
      const text = richTextToPlain(payload.rich_text);
      if (text) lines.push(`${indent}${text}`);
      continue;
    }

    if (type === "heading_1") {
      lines.push(`${indent}# ${richTextToPlain(payload.rich_text)}`);
      continue;
    }

    if (type === "heading_2") {
      lines.push(`${indent}## ${richTextToPlain(payload.rich_text)}`);
      continue;
    }

    if (type === "heading_3") {
      lines.push(`${indent}### ${richTextToPlain(payload.rich_text)}`);
      continue;
    }

    if (type === "bulleted_list_item") {
      lines.push(`${indent}- ${richTextToPlain(payload.rich_text)}`);
      if (block.has_children) {
        lines.push(await blocksToMarkdown(token, block.id, depth + 1));
      }
      continue;
    }

    if (type === "numbered_list_item") {
      lines.push(`${indent}1. ${richTextToPlain(payload.rich_text)}`);
      if (block.has_children) {
        lines.push(await blocksToMarkdown(token, block.id, depth + 1));
      }
      continue;
    }

    if (type === "to_do") {
      const checked = payload.checked ? "x" : " ";
      lines.push(`${indent}- [${checked}] ${richTextToPlain(payload.rich_text)}`);
      continue;
    }

    if (type === "quote") {
      lines.push(`${indent}> ${richTextToPlain(payload.rich_text)}`);
      continue;
    }

    if (type === "code") {
      const language = payload.language ?? "";
      lines.push(`${indent}\`\`\`${language}`);
      lines.push(`${indent}${richTextToPlain(payload.rich_text)}`);
      lines.push(`${indent}\`\`\``);
      continue;
    }

    if (type === "divider") {
      lines.push(`${indent}---`);
      continue;
    }

    if (block.has_children) {
      lines.push(await blocksToMarkdown(token, block.id, depth));
    }
  }

  return lines.filter(Boolean).join("\n");
}

async function listDatabasePages(token, databaseId) {
  const pages = [];
  let cursor;

  do {
    const body = cursor ? { start_cursor: cursor } : {};
    const result = await notionFetch(token, `/databases/${databaseId}/query`, {
      method: "POST",
      body: JSON.stringify(body),
    });
    pages.push(...(result.results ?? []));
    cursor = result.has_more ? result.next_cursor : undefined;
  } while (cursor);

  return pages;
}

async function exportPageTree(token, pageId, outputDir, seen = new Set()) {
  if (seen.has(pageId)) return [];
  seen.add(pageId);

  const page = await notionFetch(token, `/pages/${pageId}`);
  const title = getPageTitle(page);
  const safeTitle = sanitizeFilename(title);
  const filePath = path.join(outputDir, `${safeTitle}.md`);

  await mkdir(outputDir, { recursive: true });

  const markdown = await getPageMarkdown(token, pageId);
  const header = `# ${title}\n\n> Exported from Notion page \`${pageId}\`\n\n`;
  await writeFile(filePath, `${header}${markdown}\n`, "utf8");

  const exported = [{ title, filePath, pageId }];
  const blocks = await listAllBlockChildren(token, pageId);

  for (const block of blocks) {
    if (block.type === "child_page") {
      const childTitle = sanitizeFilename(getBlockTitle(block));
      const childExports = await exportPageTree(
        token,
        block.id,
        path.join(outputDir, childTitle),
        seen,
      );
      exported.push(...childExports);
      continue;
    }

    if (block.type === "child_database") {
      const dbTitle = sanitizeFilename(getBlockTitle(block));
      const dbDir = path.join(outputDir, dbTitle);
      const dbPages = await listDatabasePages(token, block.id);

      for (const dbPage of dbPages) {
        const childExports = await exportPageTree(token, dbPage.id, dbDir, seen);
        exported.push(...childExports);
      }
    }
  }

  return exported;
}

async function loadToken() {
  const fromEnv = process.env.NOTION_API_KEY ?? process.env.NOTION_TOKEN;
  if (fromEnv) return fromEnv;

  const envPath = path.join(ROOT, ".env.local");
  const file = await Bun.file(envPath).text().catch(() => "");
  const match = file.match(/^NOTION_(?:API_KEY|TOKEN)=(.+)$/m);
  if (match) return match[1].trim().replace(/^["']|["']$/g, "");

  throw new Error(
    "Missing NOTION_API_KEY. Create a Notion integration, share the page with it, and add NOTION_API_KEY to .env.local.",
  );
}

async function main() {
  const token = await loadToken();
  const pageId = parsePageId(process.argv[2] ?? DEFAULT_PAGE_ID);

  console.log(`Exporting Notion page ${pageId} -> ${OUTPUT_DIR}`);
  const exported = await exportPageTree(token, pageId, OUTPUT_DIR);

  const indexLines = [
    "# Notion export",
    "",
    `Root page: \`${pageId}\``,
    `Exported: ${new Date().toISOString()}`,
    "",
    "## Pages",
    "",
    ...exported.map((item) => `- [${item.title}](${path.relative(OUTPUT_DIR, item.filePath)})`),
    "",
  ];

  await writeFile(path.join(OUTPUT_DIR, "INDEX.md"), indexLines.join("\n"), "utf8");

  console.log(`Exported ${exported.length} page(s).`);
  for (const item of exported) {
    console.log(`- ${path.relative(ROOT, item.filePath)}`);
  }
}

main().catch((error) => {
  console.error(error.message ?? error);
  process.exit(1);
});
