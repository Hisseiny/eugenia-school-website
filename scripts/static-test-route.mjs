import { resolve, extname } from "node:path";
// Fulfil local build requests directly: no running preview server is needed for browser tests.
export async function serveBuild(route) {
  let path = new URL(route.request().url()).pathname;
  if (!extname(path)) path = path === "/" ? "/index.html" : `${path}.html`;
  const root = resolve("dist");
  const file = resolve(root, `.${decodeURIComponent(path)}`);
  if (!file.startsWith(`${root}/`)) return route.fulfill({ status: 403, body: "" });
  try {
    return await route.fulfill({ path: file });
  } catch {
    return route.fulfill({ status: 404, body: "Not found" });
  }
}
