import { defineBackground } from "#imports";
import { settings } from "@/utils/settings";

export default defineBackground(() => {
  async function syncRegisteredScripts() {
    const stored = await browser.storage.local.get(null);

    const activeSettings = settings.filter(
      (setting) => stored[setting.key] === true,
    );

    const newScripts = activeSettings.map((setting) => ({
      id: `css-${setting.key}`,
      js: [],
      css: [setting.cssFile],
      matches: ["*://*.youtube.com/*"],
      runAt: "document_start" as const,
    }));

    const existing = await browser.scripting.getRegisteredContentScripts();
    const existingIds = existing
      .map((script) => script.id)
      .filter((id) => id.startsWith("css-"));

    if (existingIds.length > 0) {
      await browser.scripting.unregisterContentScripts({ ids: existingIds });
    }

    if (newScripts.length > 0) {
      await browser.scripting.registerContentScripts(newScripts);
    }
  }

  browser.runtime.onInstalled.addListener(syncRegisteredScripts);
  browser.runtime.onStartup.addListener(syncRegisteredScripts);

  browser.storage.onChanged.addListener(async (changes, area) => {
    if (area !== "local") return;

    await syncRegisteredScripts();

    const tabs = await browser.tabs.query({ url: "*://*.youtube.com/*" });
    for (const tab of tabs) {
      if (!tab.id) continue;

      for (const [key, change] of Object.entries(changes)) {
        const setting = settings.find((setting) => setting.key === key);
        if (!setting) continue;

        if (change.newValue === true) {
          browser.scripting
            .insertCSS({
              target: { tabId: tab.id },
              files: [setting.cssFile],
            })
            .catch(console.error);
        } else {
          browser.scripting
            .removeCSS({
              target: { tabId: tab.id },
              files: [setting.cssFile],
            })
            .catch(console.error);
        }
      }
    }
  });
});
