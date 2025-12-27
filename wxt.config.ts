import { defineConfig } from "wxt";
import packageJson from "./package.json";

// See https://wxt.dev/api/config.html
export default defineConfig({
  manifest: {
    name: "YouHider",
    description: "Hide YouTube distractions.",
    version: packageJson.version,
    permissions: ["storage"],
    host_permissions: ["*://*.youtube.com/*"],
    content_scripts: [
      {
        matches: ["*://*.youtube.com/*"],
        css: [
          "css/hide-commentcount.css",
          "css/hide-comments.css",
          "css/hide-endscreen.css",
          "css/hide-homefeed.css",
          "css/hide-likecount.css",
          // "css/hide-livechat.css",
          "css/hide-membervideos.css",
          "css/hide-mixes.css",
          "css/hide-playables.css",
          "css/hide-relatedvideos.css",
          "css/hide-shorts.css",
          "css/hide-subscribercount.css",
          "css/hide-uploaddate.css",
          "css/hide-videoduration.css",
          "css/hide-viewcount.css",
        ],
        run_at: "document_start",
      },
    ],
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
