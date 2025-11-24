import { settings } from "./settings";
import { ExtensionMessage } from "./types";

async function getCombinedCss(): Promise<string> {
  const keys = settings.map((s) => s.key);
  const stored = await chrome.storage.local.get(keys);

  const fetchPromises = settings
    .filter((setting) => stored[setting.key])
    .map(async (setting) => {
      try {
        const url = chrome.runtime.getURL(setting.cssFile);
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Failed to load ${setting.cssFile}`);
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
  const tabs = await chrome.tabs.query({ url: "*://*.youtube.com/*" });
  const css = await getCombinedCss();
  for (const tab of tabs) {
    if (tab.id) {
      chrome.tabs
        .sendMessage(tab.id, { action: "updateCss", css: css })
        .catch(() => {
          // Tab might be loading or closed; safe to ignore for this use case
        });
    }
  }
}

chrome.runtime.onMessage.addListener(
  (
    message: ExtensionMessage,
    _sender: chrome.runtime.MessageSender,
    sendResponse: (response?: any) => void,
  ) => {
    if (message.action === "syncSetting") {
      void pushCssToAllTabs();
      return false;
    }
    if (message.action === "getInitialCss") {
      getCombinedCss().then((css) => {
        sendResponse({ css: css });
      });
      return true;
    }
    return false;
  },
);

chrome.runtime.onInstalled.addListener(async (details) => {
  if (details.reason === "install") {
    const tabs = await chrome.tabs.query({ url: "*://*.youtube.com/*" });
    for (const tab of tabs) {
      if (tab.id) {
        try {
          await chrome.scripting.executeScript({
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
