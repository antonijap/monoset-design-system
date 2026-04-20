// Monoset MCP server — stdio transport.
//
// Tools exposed to the agent:
//   - list_components               Names of all components in @monoset/react
//   - get_component(name)           One component's description + import path
//   - list_tokens                   All token groups (color, type, spacing, ...)
//   - get_token(name)               Value + intent for a specific token
//   - search_docs(query)            Full-text search across the docs
//
// Data sources:
//   - ../data/components.json       Generated from @monoset/react/src (names + first-line docstring)
//   - @monoset/tokens/src/tokens.json  The design tokens
//   - ../data/search-index.json     Copy of the website's Orama-shaped docs index
//
// Kept intentionally simple: one file, stdio transport, synchronous file loads.

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));

function loadJson(p) {
  try {
    return JSON.parse(readFileSync(p, "utf8"));
  } catch {
    return null;
  }
}

const components =
  loadJson(resolve(here, "..", "data", "components.json")) || [];
const tokens =
  loadJson(resolve(here, "..", "data", "tokens.json")) || {};
const searchIndex =
  loadJson(resolve(here, "..", "data", "search-index.json")) || [];

// --- helpers ----------------------------------------------------------------

function scoreHit(record, q) {
  const text = `${record.title} ${record.desc} ${record.body}`.toLowerCase();
  const terms = q.toLowerCase().split(/\s+/).filter(Boolean);
  let score = 0;
  for (const t of terms) {
    const i = text.indexOf(t);
    if (i >= 0) score += 1 + (record.title.toLowerCase().includes(t) ? 2 : 0);
  }
  return score;
}

function searchDocs(q, limit = 8) {
  const scored = searchIndex
    .map((r) => ({ r, s: scoreHit(r, q) }))
    .filter((x) => x.s > 0)
    .sort((a, b) => b.s - a.s)
    .slice(0, limit)
    .map(({ r }) => ({
      slug: r.slug,
      hash: r.hash,
      title: r.title,
      kind: r.kind,
      desc: r.desc,
      url: `https://monoset.design/${r.slug}${r.hash || ""}`,
    }));
  return scored;
}

function flattenTokens(obj, prefix = []) {
  const out = [];
  for (const [k, v] of Object.entries(obj || {})) {
    if (v && typeof v === "object" && !("value" in v)) {
      out.push(...flattenTokens(v, [...prefix, k]));
    } else {
      out.push({
        name: [...prefix, k].join("."),
        value: v?.value ?? v,
        type: v?.type ?? typeof v,
      });
    }
  }
  return out;
}

const allTokens = flattenTokens(tokens);

// --- server -----------------------------------------------------------------

export async function main() {
  const server = new Server(
    { name: "monoset-mcp", version: "0.1.0" },
    { capabilities: { tools: {} } },
  );

  server.setRequestHandler(ListToolsRequestSchema, async () => ({
    tools: [
      {
        name: "list_components",
        description:
          "List every component exported from @monoset/react with a one-line description.",
        inputSchema: { type: "object", properties: {}, additionalProperties: false },
      },
      {
        name: "get_component",
        description:
          "Describe one component: its import path, props surface, and a short example.",
        inputSchema: {
          type: "object",
          properties: { name: { type: "string" } },
          required: ["name"],
        },
      },
      {
        name: "list_tokens",
        description:
          "List every design token (color, type, spacing, radii, shadow, motion).",
        inputSchema: { type: "object", properties: {}, additionalProperties: false },
      },
      {
        name: "get_token",
        description: "Look up a single token by its dotted name (e.g. color.mono.900).",
        inputSchema: {
          type: "object",
          properties: { name: { type: "string" } },
          required: ["name"],
        },
      },
      {
        name: "search_docs",
        description:
          "Full-text search across the Monoset docs. Returns up to 8 hits with deep-linked URLs.",
        inputSchema: {
          type: "object",
          properties: { query: { type: "string" } },
          required: ["query"],
        },
      },
    ],
  }));

  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;

    switch (name) {
      case "list_components":
        return textResult(
          components.length
            ? components
                .map((c) => `- ${c.name}: ${c.description || "(no description)"}`)
                .join("\n")
            : "No component metadata bundled. Run `npm run build-data` in the mcp-server package to regenerate.",
        );

      case "get_component": {
        const needle = String(args?.name ?? "").toLowerCase();
        const hit =
          components.find((c) => c.name.toLowerCase() === needle) ||
          components.find((c) => c.name.toLowerCase().includes(needle));
        if (!hit) return textResult(`No component named '${args?.name}' found.`);
        return textResult(
          [
            `# ${hit.name}`,
            hit.description ? `\n${hit.description}` : "",
            `\n## Import\n\n\`\`\`ts\nimport { ${hit.name} } from "@monoset/react";\n\`\`\``,
            hit.example ? `\n## Example\n\n\`\`\`tsx\n${hit.example}\n\`\`\`` : "",
            hit.docUrl ? `\n## Docs\n\n${hit.docUrl}` : "",
          ]
            .filter(Boolean)
            .join("\n"),
        );
      }

      case "list_tokens":
        return textResult(
          allTokens.length
            ? allTokens.map((t) => `- ${t.name} = ${t.value}`).join("\n")
            : "No tokens found. Run `npm run build-data` to refresh bundled data.",
        );

      case "get_token": {
        const n = String(args?.name ?? "").toLowerCase();
        const hit = allTokens.find((t) => t.name.toLowerCase() === n);
        if (!hit) return textResult(`No token named '${args?.name}' found.`);
        return textResult(
          `${hit.name}\n  value: ${hit.value}\n  type: ${hit.type}`,
        );
      }

      case "search_docs": {
        const q = String(args?.query ?? "").trim();
        if (!q) return textResult("Provide a non-empty `query`.");
        const hits = searchDocs(q);
        if (hits.length === 0) return textResult(`No docs matched '${q}'.`);
        return textResult(
          hits
            .map((h) => `- [${h.title}](${h.url})\n  ${h.desc}`)
            .join("\n"),
        );
      }

      default:
        return textResult(`Unknown tool: ${name}`, true);
    }
  });

  const transport = new StdioServerTransport();
  await server.connect(transport);
}

function textResult(text, isError = false) {
  return {
    content: [{ type: "text", text }],
    isError,
  };
}
