#!/usr/bin/env node
// Build-time search index for the Cmd+K palette.
// Reads website/src/pages/docs.jsx, pulls <Lead>, <H2 id="...">, <H3 id="...">,
// <P> text per page component, and emits website/public/search-index.json.

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const rootWebsite = resolve(here, "..");
const source = resolve(rootWebsite, "src/pages/docs.jsx");
const meta = resolve(rootWebsite, "src/pages/docs-meta.js");
const out = resolve(rootWebsite, "public/search-index.json");

const src = readFileSync(source, "utf8");
const metaSrc = readFileSync(meta, "utf8");

// ---- parse PAGE_META (title, desc) per slug ------------------------------
const pageMeta = {};
// match: <slug>: { title: "X", desc: "Y" },
const metaRe = /(\w+):\s*\{\s*title:\s*"((?:\\"|[^"])+)",\s*desc:\s*"((?:\\"|[^"])+)"/g;
for (const m of metaSrc.matchAll(metaRe)) {
  pageMeta[m[1]] = { title: m[2].replace(/\\"/g, '"'), desc: m[3].replace(/\\"/g, '"') };
}

// ---- map slug <-> Page component name via PAGES in docs.jsx --------------
const slugToFn = {};
// e.g.: `  introduction: PageIntroduction,`
const pagesBlock = src.match(/const PAGES\s*=\s*\{([\s\S]*?)\};/);
if (pagesBlock) {
  for (const line of pagesBlock[1].split("\n")) {
    const m = line.match(/(\w+):\s*(Page\w+)/);
    if (m) slugToFn[m[1]] = m[2];
  }
}

// ---- extract each Page* function body -----------------------------------
function findFunctionBody(name) {
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

for (const [slug, fn] of Object.entries(slugToFn)) {
  const body = findFunctionBody(fn);
  if (!body) continue;
  const m = pageMeta[slug] || { title: slug, desc: "" };

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
