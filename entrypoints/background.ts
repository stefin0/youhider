import { defineBackground } from "#imports";
import { settings } from "@/utils/settings";

export default defineBackground(() => {
  browser.scripting
    .registerContentScripts([
      {
        id: "yh-global-styles",
        js: [],
        css: settings.map((setting) => setting.cssFile),
        matches: ["*://*.youtube.com/*"],
        runAt: "document_start",
      },
    ])
    .catch((error) => {
      console.debug(error);
    });
});
