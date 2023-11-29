await Bun.build({
  entrypoints: ["./index.ts"],
  outdir: "./build",
  splitting: true,
  target: "browser",
  external: ["react", "react-dom"],
  sourcemap: "external",
});
