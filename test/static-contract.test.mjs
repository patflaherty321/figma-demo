import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const readSource = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");

test("page exposes the approved static three-layer contract", async () => {
  const html = await readSource("index.html");

  assert.match(html, /data-demo-revision="fake-ui-static-v1"/);
  assert.match(html, /aria-label="Generic three-layer motion sandbox"/);
  assert.equal((html.match(/data-layer=/g) ?? []).length, 3);
  assert.match(html, /data-layer="backdrop"/);
  assert.match(html, /data-layer="panel"/);
  assert.match(html, /data-layer="dock"/);
});

test("stylesheet fixes the approved geometry and contains zero motion", async () => {
  const css = await readSource("styles.css");

  assert.match(css, /\.demo-stage\s*{[^}]*width:\s*1920px;[^}]*height:\s*1080px;/s);
  assert.match(css, /\.backdrop\s*{[^}]*inset:\s*0;/s);
  assert.match(css, /\.panel\s*{[^}]*left:\s*640px;[^}]*top:\s*280px;[^}]*width:\s*640px;[^}]*height:\s*720px;/s);
  assert.match(css, /\.dock\s*{[^}]*left:\s*0;[^}]*bottom:\s*0;[^}]*width:\s*1920px;[^}]*height:\s*64px;/s);
  assert.doesNotMatch(css, /@keyframes|animation(?:-\w+)?\s*:|transition(?:-\w+)?\s*:/i);
});
