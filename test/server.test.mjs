import assert from "node:assert/strict";
import { once } from "node:events";
import test from "node:test";

import { createDemoServer } from "../server.mjs";

test("preview server exposes only the static demo files", async (context) => {
  const server = createDemoServer();
  server.listen(0, "127.0.0.1");
  await once(server, "listening");
  context.after(() => server.close());

  const address = server.address();
  assert.notEqual(typeof address, "string");
  assert.ok(address);
  const origin = `http://127.0.0.1:${address.port}`;

  const page = await fetch(`${origin}/`);
  assert.equal(page.status, 200);
  assert.match(page.headers.get("content-type") ?? "", /^text\/html/);
  assert.match(await page.text(), /fake-ui-static-v1/);

  const stylesheet = await fetch(`${origin}/styles.css`);
  assert.equal(stylesheet.status, 200);
  assert.match(stylesheet.headers.get("content-type") ?? "", /^text\/css/);

  const missing = await fetch(`${origin}/missing`);
  assert.equal(missing.status, 404);
});
