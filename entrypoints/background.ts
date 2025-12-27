import { defineBackground } from "#imports";
import { settings } from "@/utils/settings";

export default defineBackground(() => {
  async function syncRegisteredScripts(): Promise<void> {
    try {
      const stored = await browser.storage.local.get(null);
      const desiredKeys = new Set(
        settings
          .filter((setting) => stored[setting.key] === true)
          .map((setting) => setting.key),
      );

      const existingScripts =
        await browser.scripting.getRegisteredContentScripts();
      const existingIds = new Set(
        existingScripts
          .map((script) => script.id)
          .filter((id) => id.startsWith("css-")),
      );

      const toUnregister = [...existingIds].filter((id) => {
        const key = id.replace("css-", "");
        return !desiredKeys.has(key);
      });

      const toRegister = settings
        .filter(
          (setting) =>
            desiredKeys.has(setting.key) &&
            !existingIds.has(`css-${setting.key}`),
        )
        .map((setting) => ({
          id: `css-${setting.key}`,
          js: [],
          css: [setting.cssFile],
          matches: ["*://*.youtube.com/*"],
          runAt: "document_start" as const,
        }));

      if (toUnregister.length > 0) {
        await browser.scripting.unregisterContentScripts({ ids: toUnregister });
      }

      if (toRegister.length > 0) {
        await browser.scripting.registerContentScripts(toRegister);
      }
    } catch (error) {
      console.error(error);
    }
  }

  browser.runtime.onInstalled.addListener(() => {
    syncRegisteredScripts().catch(console.error);
  });
  browser.runtime.onStartup.addListener(() => {
    syncRegisteredScripts().catch(console.error);
  });

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
