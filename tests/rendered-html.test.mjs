import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${pathname}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${pathname}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) },
    },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the finished Fold Theory homepage", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Bespoke Branding &amp; Packaging . Fold Theory<\/title>/i);
  assert.match(html, /We shape/);
  assert.match(html, /stories you/);
  assert.match(html, /Cecilia Pizzeria/);
  assert.match(html, /\/images\/projects\/cecilia-pasta-kit\.jpg/);
  assert.match(html, /aria-label="Primary navigation"/);
  assert.match(html, /Have something worth unfolding\?/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton|Your site is taking shape/i);
});

test("ships the multi-route portfolio system and real studio assets", async () => {
  const [page, layout, packageJson, projects] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
    readFile(new URL("../lib/projects.ts", import.meta.url), "utf8"),
  ]);

  assert.match(page, /HomeExperience/);
  assert.match(layout, /Fold Theory/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
  assert.match(packageJson, /framer-motion/);
  assert.match(packageJson, /"gsap"/);
  assert.match(packageJson, /"lenis"/);
  assert.match(projects, /cecilia-pizzeria/);
  assert.match(projects, /soda-shop/);
  assert.match(projects, /bombaa/);
  assert.match(projects, /khoya/);

  await Promise.all([
    access(new URL("../app/work/page.tsx", import.meta.url)),
    access(new URL("../app/work/[slug]/page.tsx", import.meta.url)),
    access(new URL("../app/about/page.tsx", import.meta.url)),
    access(new URL("../app/services/page.tsx", import.meta.url)),
    access(new URL("../app/contact/page.tsx", import.meta.url)),
    access(new URL("../public/images/projects/fold-theory-wordmark.jpg", import.meta.url)),
  ]);
});
