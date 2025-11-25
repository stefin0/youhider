import { defineBackground } from "#imports";
import { settings } from "@/utils/settings";
import { ExtensionMessage } from "@/utils/types";

export default defineBackground(() => {
  async function getCombinedCss(): Promise<string> {
    const keys = settings.map((s) => s.key);
    const stored = await browser.storage.local.get(keys);

    const fetchPromises = settings
      .filter((setting) => stored[setting.key])
      .map(async (setting) => {
        try {
          const url = browser.runtime.getURL(setting.cssFile as any);
          const response = await fetch(url);
          if (!response.ok)
            throw new Error(`Failed to load ${setting.cssFile}`);
          return await response.text();
        } catch (e) {
          console.error(e);
          return ""; // Fail gracefully by returning empty string for this file
        }
      });

    const cssParts = await Promise.all(fetchPromises);
    return cssParts.join("\n");
  }

  async function pushCssToAllTabs() {
    const tabs = await browser.tabs.query({ url: "*://*.youtube.com/*" });
    const css = await getCombinedCss();
    for (const tab of tabs) {
      if (tab.id) {
        browser.tabs
          .sendMessage(tab.id, { action: "updateCss", css: css })
          .catch(() => {
            // Tab might be loading or closed; safe to ignore for this use case
          });
      }
    }
  }

  browser.runtime.onMessage.addListener(
    async (message: ExtensionMessage, _sender) => {
      if (message.action === "syncSetting") {
        await pushCssToAllTabs();
        return;
      }
      if (message.action === "getInitialCss") {
        const css = await getCombinedCss();
        return { css };
      }
    },
  );

  browser.runtime.onInstalled.addListener(async (details) => {
    if (details.reason === "install") {
      const tabs = await browser.tabs.query({ url: "*://*.youtube.com/*" });
      for (const tab of tabs) {
        if (tab.id) {
          try {
            await browser.scripting.executeScript({
              target: { tabId: tab.id },
              files: ["content.js"],
            });
          } catch (err) {
            console.error(`Failed to inject script in tab ${tab.id}: ${err}`);
          }
        }
      }
    }
  });
});
