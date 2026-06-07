import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync, statSync } from "fs";
import { join } from "path";

const SRC = join(process.cwd(), "src");

function walk(dir: string, files: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    const s = statSync(p);
    if (s.isDirectory()) walk(p, files);
    else if (/\.(tsx?|jsx?)$/.test(entry) && !/\.test\./.test(entry)) files.push(p);
  }
  return files;
}

const FILES = walk(SRC).filter((f) => !f.endsWith("ExternalLink.tsx"));

// Match any <a ...> or <motion.a ...> opening tag (across newlines).
const ANCHOR_RE = /<(?:motion\.)?a\s+[^>]*?>/gs;

type Offender = { file: string; tag: string; reason: string };

describe("external link safety", () => {
  it("every <a>/<motion.a> with an http(s) href has target=_blank and rel='noopener noreferrer'", () => {
    const offenders: Offender[] = [];
    for (const file of FILES) {
      const text = readFileSync(file, "utf8");
      for (const tag of text.match(ANCHOR_RE) ?? []) {
        const hrefMatch = tag.match(/href=(?:["']([^"']+)["']|\{["'`]([^"'`]+)["'`]\})/);
        const href = hrefMatch?.[1] ?? hrefMatch?.[2];
        if (!href || !/^https?:\/\//.test(href)) continue;

        const target = /target=["']_blank["']/.test(tag);
        const relMatch = tag.match(/rel=["']([^"']+)["']/);
        const rel = relMatch?.[1] ?? "";
        const hasNoopener = /\bnoopener\b/.test(rel);
        const hasNoreferrer = /\bnoreferrer\b/.test(rel);

        if (!target) offenders.push({ file, tag, reason: "missing target=\"_blank\"" });
        if (!hasNoopener || !hasNoreferrer) {
          offenders.push({ file, tag, reason: `rel must include noopener and noreferrer (got "${rel}")` });
        }
      }
    }
    expect(
      offenders,
      `Unsafe external anchors found. Use <ExternalLink> instead:\n${JSON.stringify(offenders, null, 2)}`,
    ).toEqual([]);
  });
});
