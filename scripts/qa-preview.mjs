// Isolated audit preview: sets the requested saved preferences before the app boots.
// This changes neither source data nor the normal preview at port 4188.
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { resolve, extname, sep } from "node:path";
import { gzipSync } from "node:zlib";

const directory = resolve("dist");
const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript",
  ".css": "text/css",
  ".woff2": "font/woff2",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
};
createServer(async (request, response) => {
  try {
    const url = new URL(request.url, "http://127.0.0.1:4288");
    if (url.pathname === "/api/content") {
      const upstream = await fetch("http://127.0.0.1:4188/api/content");
      response.writeHead(upstream.status, {
        "Content-Type": "application/json",
        "Cache-Control": "no-store",
      });
      return response.end(await upstream.text());
    }
    let file = resolve(directory, "." + decodeURIComponent(url.pathname));
    if (file !== directory && !file.startsWith(directory + sep))
      throw Error("Invalid path");
    if ((await stat(file)).isDirectory()) file = resolve(file, "index.html");
    let body = await readFile(file);
    if (extname(file) === ".html") {
      const theme =
        url.searchParams.get("theme") === "light" ? "light" : "dark";
      const lang = url.searchParams.get("lang") === "en" ? "en" : "fa";
      const setup = `<script>localStorage.setItem('raiban-theme','${theme}');localStorage.setItem('raiban-language','${lang}');</script>`;
      body = body.toString().replace("<head>", "<head>" + setup);
    }
    const mime = types[extname(file)] ?? "application/octet-stream";
    const headers = { "Content-Type": mime };
    if (
      /text\//.test(mime) &&
      request.headers["accept-encoding"]?.includes("gzip")
    ) {
      body = gzipSync(body);
      headers["Content-Encoding"] = "gzip";
      headers.Vary = "Accept-Encoding";
    }
    response.writeHead(200, headers);
    response.end(body);
  } catch {
    response.writeHead(404);
    response.end("Not found");
  }
}).listen(4288, "127.0.0.1", () =>
  console.log("Preference audit preview: http://127.0.0.1:4288"),
);
