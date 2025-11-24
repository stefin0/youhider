import { defineConfig } from "vite";
import { resolve } from "path";
import fs from "fs";

const copyStaticFiles = () => ({
  name: "copy-static-files",
  closeBundle: async () => {
    const packageJson = JSON.parse(fs.readFileSync("package.json", "utf-8"));
    const version = packageJson.version;

    const manifest = JSON.parse(fs.readFileSync("manifest.json", "utf-8"));

    manifest.version = version;

    fs.writeFileSync("dist/manifest.json", JSON.stringify(manifest, null, 2));

    fs.cpSync("src/icons", "dist/icons", { recursive: true });
    fs.cpSync("src/css", "dist/css", { recursive: true });

    console.log(`Synced manifest version to ${version}`);
  },
});

export default defineConfig({
  root: "src",
  build: {
    outDir: "../dist",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        background: resolve(__dirname, "src/background.ts"),
        content: resolve(__dirname, "src/content.ts"),
        popup: resolve(__dirname, "src/popup/youhider.html"),
      },
      output: {
        entryFileNames: "[name].js",
        chunkFileNames: "[name].js",
        assetFileNames: "[name].[ext]",
      },
    },
  },
  plugins: [copyStaticFiles()],
});
