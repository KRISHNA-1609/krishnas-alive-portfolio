import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync, statSync } from "fs";
import { join } from "path";

const SRC = join(process.cwd(), "src");

// Canonical social URLs that must appear consistently across the app.
const EXPECTED = {
  github: "https://github.com/KRISHNA-1609",
  linkedin: "https://www.linkedin.com/in/krishna-shonka-903a67358/?skipRedirect=true",
  codolio: "https://codolio.com/profile/Krishna_1609",
  instagram: "https://www.instagram.com/krishnaaa_1609?igsh=bmlqdXZ6cXZvaDYz",
};

function walk(dir: string, files: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    const s = statSync(p);
    if (s.isDirectory()) walk(p, files);
    else if (/\.(tsx?|jsx?)$/.test(entry) && !/\.test\./.test(entry)) files.push(p);
  }
  return files;
}

const FILES = walk(SRC);
const SOURCES = FILES.map((f) => ({ path: f, text: readFileSync(f, "utf8") }));

// Match http(s) URLs inside string/attribute literals.
const URL_RE = /https?:\/\/[^\s"'`<>)]+/g;

describe("social/profile URLs", () => {
  it("every URL in source is well-formed", () => {
    const bad: { file: string; url: string; reason: string }[] = [];
    for (const { path, text } of SOURCES) {
      for (const url of text.match(URL_RE) ?? []) {
        try {
          // eslint-disable-next-line no-new
          new URL(url);
        } catch (e) {
          bad.push({ file: path, url, reason: (e as Error).message });
        }
      }
    }
    expect(bad, JSON.stringify(bad, null, 2)).toEqual([]);
  });

  it.each(Object.entries(EXPECTED))(
    "%s URL uses the canonical form everywhere",
    (key, canonical) => {
      const canonicalUrl = new URL(canonical);
      const offenders: { file: string; url: string }[] = [];
      for (const { path, text } of SOURCES) {
        for (const raw of text.match(URL_RE) ?? []) {
          const url = raw.replace(/[)\].,]+$/, "");
          let parsed: URL;
          try {
            parsed = new URL(url);
          } catch {
            continue;
          }
          if (parsed.host !== canonicalUrl.host) continue;
          // For GitHub we allow repo sub-paths under the profile; only flag
          // profile-root variations or links to a different user.
          if (key === "github") {
            const seg = parsed.pathname.split("/").filter(Boolean);
            const isProfileRoot = seg.length <= 1;
            const wrongUser = seg[0] && seg[0].toLowerCase() !== "krishna-1609";
            if (!(isProfileRoot || wrongUser)) continue;
          }
          if (url !== canonical) offenders.push({ file: path, url });
        }
      }
      expect(
        offenders,
        `Non-canonical ${key} URL(s):\n${JSON.stringify(offenders, null, 2)}\nExpected: ${canonical}`,
      ).toEqual([]);
    },
  );

  it.each(Object.entries(EXPECTED))(
    "%s URL appears at least once in source",
    (_key, canonical) => {
      const found = SOURCES.some(({ text }) => text.includes(canonical));
      expect(found, `Missing canonical URL: ${canonical}`).toBe(true);
    },
  );
});
