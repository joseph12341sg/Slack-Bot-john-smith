/**
 * Render script — run with:
 *   npx ts-node src/render.ts [configPath] [compositionId]
 *
 * Examples:
 *   npx ts-node src/render.ts                              # default config, landscape
 *   npx ts-node src/render.ts ./clients/acme.json          # custom config, landscape
 *   npx ts-node src/render.ts ./clients/acme.json CaseStudy-Square  # custom config, square
 */
import path from "path";
import { bundle } from "@remotion/bundler";
import { renderMedia, selectComposition } from "@remotion/renderer";
import { CaseStudyConfig } from "./types";
import { defaultConfig } from "./config";

async function main() {
  const configPath = process.argv[2];
  const compositionId = process.argv[3] || "CaseStudy-Landscape";

  let config: CaseStudyConfig = defaultConfig;

  if (configPath) {
    const absolutePath = path.resolve(configPath);
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    config = require(absolutePath) as CaseStudyConfig;
    console.log(`Loaded config from ${absolutePath}`);
  }

  console.log(`Bundling...`);
  const bundleLocation = await bundle({
    entryPoint: path.resolve(__dirname, "./index.ts"),
  });

  const landscape = compositionId.includes("Landscape");

  const composition = await selectComposition({
    serveUrl: bundleLocation,
    id: compositionId,
    inputProps: { config, landscape },
  });

  const outputPath = path.resolve(
    __dirname,
    `../out/${config.clientName.replace(/\s+/g, "-").toLowerCase()}-${
      landscape ? "landscape" : "square"
    }.mp4`
  );

  console.log(`Rendering ${compositionId} → ${outputPath}`);
  await renderMedia({
    composition,
    serveUrl: bundleLocation,
    codec: "h264",
    outputLocation: outputPath,
    inputProps: { config, landscape },
  });

  console.log(`Done! Output: ${outputPath}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
