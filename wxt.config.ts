import { defineConfig } from "wxt";

// See https://wxt.dev/api/config.html
export default defineConfig({
  manifest: {
    name: "YouHider",
    description: "Hide YouTube distractions.",
    version: "0.12.0",
    permissions: ["scripting", "storage"],
    action: {
      default_icon: {
        "16": "icons/YouHider-16.png",
        "32": "icons/YouHider-32.png",
      },
      default_title: "YouHider",
    },
  },
});
