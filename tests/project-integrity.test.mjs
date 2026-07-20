import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = path.resolve(fileURLToPath(new URL("..", import.meta.url)));

async function collectFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries
      .filter((entry) => !["node_modules", ".next", "dist", "work"].includes(entry.name))
      .map(async (entry) => {
        const fullPath = path.join(dir, entry.name);
        return entry.isDirectory() ? collectFiles(fullPath) : fullPath;
      }),
  );
  return files.flat();
}

test("project is JavaScript-only and contains the requested AAYAT structure", async () => {
  const files = await collectFiles(root);
  const relative = files.map((file) => path.relative(root, file).replaceAll("\\", "/"));

  const forbiddenExtensions = [".t" + "s", ".t" + "sx"];
  assert.equal(relative.some((file) => forbiddenExtensions.some((ext) => file.endsWith(ext))), false);
  assert.equal(relative.includes("ts" + "config.json"), false);
  assert.equal(relative.includes("next" + "-env.d." + "ts"), false);

  for (const required of [
    "app/page.jsx",
    "app/layout.jsx",
    "app/[slug]/page.jsx",
    "app/api/enquiries/route.js",
    "app/api/contact/route.js",
    "components/QuoteWizard.jsx",
    "components/HeroScene.jsx",
    "lib/server/models.js",
    "lib/siteData.js",
  ]) {
    assert.equal(relative.includes(required), true, `${required} should exist`);
  }

  const home = await readFile(path.join(root, "components", "HomePage.jsx"), "utf8");
  assert.match(home, /ISPM-15 Pallets, Export Packaging & Industrial Support/);
  assert.match(home, /Request Services/);
});
