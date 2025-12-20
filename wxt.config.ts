import { defineConfig } from "wxt";
import packageJson from "./package.json";

// See https://wxt.dev/api/config.html
export default defineConfig({
  manifest: {
    name: "YouHider",
    description: "Hide YouTube distractions.",
    version: packageJson.version,
    permissions: ["scripting", "storage"],
    host_permissions: ["*://*.youtube.com/*"],
    icons: {
      "16": "icon/YouHider-16.png",
      "32": "icon/YouHider-32.png",
    },
    action: {
      default_icon: {
        "16": "icon/YouHider-16.png",
        "32": "icon/YouHider-32.png",
      },
      default_title: "YouHider",
    },
  },
});
