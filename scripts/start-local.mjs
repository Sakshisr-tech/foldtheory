import path from "node:path";

// vinext 0.0.50 builds its static-file cache from path.relative(). On Windows,
// that produces backslashes, while browser requests always use forward slashes.
// Normalize the cache keys before loading the production server.
if (process.platform === "win32") {
  const nativeRelative = path.relative.bind(path);
  path.relative = (from, to) => nativeRelative(from, to).replaceAll("\\", "/");
}

const readOption = (...names) => {
  for (const name of names) {
    const index = process.argv.indexOf(name);
    if (index !== -1 && process.argv[index + 1]) return process.argv[index + 1];
  }
  return undefined;
};

const port = Number(readOption("--port", "-p") ?? process.env.PORT ?? 3000);
const host = readOption("--host", "--hostname", "-H") ?? "0.0.0.0";

const { startProdServer } = await import("vinext/server/prod-server");

await startProdServer({
  port,
  host,
  outDir: path.resolve("dist"),
});
