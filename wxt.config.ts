import { defineConfig } from "wxt";

// See https://wxt.dev/api/config.html
export default defineConfig({
  manifest: {
    name: "YouHider",
    description: "Hide YouTube distractions.",
    version: "0.12.0",
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
