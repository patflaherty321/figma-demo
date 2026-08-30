import { readFile } from "node:fs/promises";
import { createServer } from "node:http";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));

const routes = new Map([
  ["/", { file: "index.html", type: "text/html; charset=utf-8" }],
  ["/styles.css", { file: "styles.css", type: "text/css; charset=utf-8" }],
]);

export function createDemoServer() {
  return createServer(async (request, response) => {
    const url = new URL(request.url ?? "/", "http://localhost");
    const route = routes.get(url.pathname);

    if (!route || !["GET", "HEAD"].includes(request.method ?? "GET")) {
      response.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
      response.end("Not found");
      return;
    }

    try {
      const body = await readFile(join(root, route.file));
      response.writeHead(200, {
        "cache-control": "no-store",
        "content-type": route.type,
      });
      response.end(request.method === "HEAD" ? undefined : body);
    } catch {
      response.writeHead(500, { "content-type": "text/plain; charset=utf-8" });
      response.end("Unable to load demo");
    }
  });
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const port = Number.parseInt(process.env.PORT ?? "3000", 10);
  const server = createDemoServer();
  server.listen(port, "0.0.0.0", () => {
    console.log(`Generic motion sandbox listening on http://localhost:${port}`);
  });
}
