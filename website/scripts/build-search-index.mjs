#!/usr/bin/env node
// Build-time search index for the Cmd+K palette.
// Reads the mapped React docs route groups, pulls <Lead>, <H2 id="...">,
// <H3 id="...">, and <P> text per page component, then emits the search index.

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { REACT_DOC_ROUTES } from "../src/pages/react-docs/routes.js";

const here = dirname(fileURLToPath(import.meta.url));
const rootWebsite = resolve(here, "..");
const routeRoot = resolve(rootWebsite, "src/pages/react-docs");
const meta = resolve(rootWebsite, "src/pages/docs-meta.js");
const out = resolve(rootWebsite, "public/search-index.json");

const metaSrc = readFileSync(meta, "utf8");

// ---- parse PAGE_META (title, desc) per slug ------------------------------
const pageMeta = {};
// match: <slug>: { title: "X", desc: "Y" },
const metaRe = /(\w+):\s*\{\s*title:\s*"((?:\\"|[^"])+)",\s*desc:\s*"((?:\\"|[^"])+)"/g;
for (const m of metaSrc.matchAll(metaRe)) {
  pageMeta[m[1]] = { title: m[2].replace(/\\"/g, '"'), desc: m[3].replace(/\\"/g, '"') };
}

// ---- load each unique group once in stable route-map order ---------------
const groupSources = new Map();
for (const modulePath of new Set(Object.values(REACT_DOC_ROUTES))) {
  const sourcePath = resolve(routeRoot, modulePath);
  groupSources.set(modulePath, readFileSync(sourcePath, "utf8"));
}

const slugToPage = new Map();
for (const [slug, modulePath] of Object.entries(REACT_DOC_ROUTES)) {
  const src = groupSources.get(modulePath);
  const pagesBlock = src.match(/export const PAGES\s*=\s*\{([\s\S]*?)\};/);
  if (!pagesBlock) throw new Error(`Missing PAGES export in ${modulePath}`);
  const owner = pagesBlock[1].match(new RegExp(`(?:^|\\n)\\s*${slug}:\\s*(Page\\w+),?`));
  if (!owner) throw new Error(`Missing page owner for ${slug} in ${modulePath}`);
  if (!pageMeta[slug]) throw new Error(`Missing metadata for ${slug}`);
  slugToPage.set(slug, { fn: owner[1], src });
}

// ---- extract each Page* function body -----------------------------------
function findFunctionBody(src, name) {
  const i = src.indexOf(`function ${name}(`);
  if (i < 0) return null;
  // find the opening { of the function body (skip param-destructure braces)
  let p = src.indexOf("{", src.indexOf(")", i));
  let depth = 0;
  for (let k = p; k < src.length; k++) {
    if (src[k] === "{") depth++;
    else if (src[k] === "}") {
      depth--;
      if (depth === 0) return src.slice(p + 1, k);
    }
  }
  return null;
}

// strip tags / jsx, return plain text
function stripJsx(x) {
  return x
    .replace(/<[^>]+>/g, " ")     // tags
    .replace(/\{[^}]+\}/g, " ")    // JSX expressions
    .replace(/\s+/g, " ")
    .trim();
}

function extractTagged(body, tag) {
  const re = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, "g");
  const out = [];
  for (const m of body.matchAll(re)) {
    const txt = stripJsx(m[1]);
    if (txt) out.push(txt);
  }
  return out;
}

function extractHeadings(body) {
  const re = /<(H2|H3)[^>]*\bid="([^"]+)"[^>]*>([\s\S]*?)<\/\1>/g;
  const out = [];
  for (const m of body.matchAll(re)) {
    const text = stripJsx(m[3]);
    if (text) out.push({ level: m[1].toLowerCase(), id: m[2], text });
  }
  return out;
}

// ---- build records ------------------------------------------------------
const records = [];
let docId = 0;

for (const [slug, { fn, src }] of slugToPage) {
  const body = findFunctionBody(src, fn);
  if (!body) throw new Error(`Missing ${fn} function body for ${slug}`);
  const m = pageMeta[slug];

  // page-level record
  const leads = extractTagged(body, "Lead").join(" ");
  const ps = extractTagged(body, "P").join(" ");
  const h2s = extractTagged(body, "H2").join(" ");
  records.push({
    id: String(docId++),
    slug,
    hash: "",
    title: m.title,
    kind: "page",
    desc: m.desc,
    body: [leads, ps, h2s].filter(Boolean).join(" ").slice(0, 2000),
  });

  // heading-level records (jump to anchor)
  for (const h of extractHeadings(body)) {
    records.push({
      id: String(docId++),
      slug,
      hash: `#${h.id}`,
      title: `${m.title} · ${h.text}`,
      kind: h.level,
      desc: m.title,
      body: h.text,
    });
  }
}

// Add landing page record
records.unshift({
  id: String(docId++),
  slug: "",
  hash: "",
  title: "Monoset",
  kind: "home",
  desc: "A minimal, monotone, unopinionated design system.",
  body:
    "Monoset design system. Tokens and React components. One neutral ramp. One typeface. Radix-backed components. Monotone. Minimal. Unopinionated.",
});

mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, JSON.stringify(records));
console.log(`wrote ${records.length} records to ${out}`);
