import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

async function render(pathname = "/", init = {}, environment = {}) {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${pathname}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${pathname}`, {
      headers: { accept: "text/html", ...init.headers },
      ...init,
    }),
    {
      ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) },
      ...environment,
    },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the complete one-page Fold Theory experience", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Brand Identity &amp; Packaging Design Studio.*Fold Theory<\/title>/i);
  assert.match(html, /Brands people/);
  assert.match(html, /remember before/);
  assert.match(html, /they.*opened/);
  assert.match(html, /Independent Branding &amp; Packaging Studio/);
  assert.match(html, /Packaging systems designed to be remembered/);
  assert.match(html, /Selected Projects.*01.*06/);
  assert.match(html, /id="home"/);
  assert.match(html, /id="work"/);
  assert.match(html, /id="services"/);
  assert.match(html, /id="studio"/);
  assert.match(html, /id="process"/);
  assert.match(html, /id="about"/);
  assert.match(html, /id="faq"/);
  assert.match(html, /id="contact"/);
  assert.match(html, /href="#contact"/);
  assert.match(html, /Cecilia Pizzeria/);
  assert.match(html, /Soda Shop/);
  assert.match(html, /Ice Pop/);
  assert.match(html, /Bombaa/);
  assert.match(html, /Secret Ingredient/);
  assert.match(html, /Have something worth unfolding\?/);
  assert.match(html, /application\/ld\+json/);
  assert.match(html, /ProfessionalService/);
  assert.doesNotMatch(html, /Client perspective|Email to be confirmed|codex-preview|react-loading-skeleton/i);
});

test("keeps static page composition on the server and editable content in data files", async () => {
  const [page, home, chrome, projects, testimonials, hosting] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../components/home-experience.tsx", import.meta.url), "utf8"),
    readFile(new URL("../components/site-chrome.tsx", import.meta.url), "utf8"),
    readFile(new URL("../data/projects.ts", import.meta.url), "utf8"),
    readFile(new URL("../data/testimonials.ts", import.meta.url), "utf8"),
    readFile(new URL("../.openai/hosting.json", import.meta.url), "utf8"),
  ]);

  assert.doesNotMatch(page, /^\s*["']use client["']/m);
  assert.doesNotMatch(home, /^\s*["']use client["']/m);
  assert.match(chrome, /#work/);
  assert.match(chrome, /#faq/);
  assert.match(chrome, /IntersectionObserver/);
  assert.match(chrome, /scroll-progress/);
  assert.match(chrome, /persistent-project-cta/);
  assert.match(projects, /cecilia-pizzeria/);
  assert.match(projects, /soda-shop/);
  assert.match(projects, /bombaa/);
  assert.match(projects, /khoya/);
  assert.match(testimonials, /testimonials: readonly Testimonial\[\] = \[\]/);
  assert.match(hosting, /"d1": "DB"/);
  await access(new URL("../drizzle/0000_stale_prowler.sql", import.meta.url));
});

test("removed portfolio pages no longer resolve as separate routes", async () => {
  for (const pathname of ["/work", "/work/cecilia-pizzeria", "/about", "/services", "/contact"]) {
    const response = await render(pathname);
    assert.equal(response.status, 404, `${pathname} should be a one-page anchor, not a route`);
  }
});

test("enquiry handling validates input and stores accepted submissions in D1", async () => {
  const [route, store, migration] = await Promise.all([
    readFile(new URL("../app/api/enquiries/route.ts", import.meta.url), "utf8"),
    readFile(new URL("../db/enquiries.ts", import.meta.url), "utf8"),
    readFile(new URL("../drizzle/0000_stale_prowler.sql", import.meta.url), "utf8"),
  ]);

  assert.match(route, /validProjectTypes/);
  assert.match(route, /emailPattern/);
  assert.match(route, /website/);
  assert.match(route, /await import\("@\/db\/enquiries"\)/);
  assert.match(store, /CREATE TABLE IF NOT EXISTS enquiries/);
  assert.match(store, /INSERT INTO enquiries/);
  assert.match(migration, /CREATE TABLE `enquiries`/);
});
