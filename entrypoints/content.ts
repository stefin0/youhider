import { defineContentScript } from "#imports";
import { Actions, ExtensionMessage } from "@/utils/types";

export default defineContentScript({
  matches: ["*://*.youtube.com/*"],
  runAt: "document_start",

  main() {
    let styleElement: HTMLStyleElement | null = null;
    let lastAppliedCss = "";

    function updateStyles(css: string) {
      lastAppliedCss = css;

      if (!styleElement) {
        styleElement = document.createElement("style");
        styleElement.id = "youhider-styles";
      }

      styleElement.textContent = css;

      const elementToAppend = styleElement;

      if (document.head && !document.head.contains(elementToAppend)) {
        const append = () => document.head?.appendChild(elementToAppend);

        if (document.head) {
          append();
        } else {
          const observer = new MutationObserver(() => {
            if (document.head) {
              append();
              observer.disconnect();
            }
          });
          observer.observe(document.documentElement, { childList: true });
        }
      }
    }

    browser.runtime.onMessage.addListener((message: ExtensionMessage) => {
      if (
        message.action === Actions.UPDATE_CSS &&
        typeof message.css === "string"
      ) {
        updateStyles(message.css);
      }
    });

    browser.runtime
      .sendMessage({ action: Actions.GET_INITIAL_CSS })
      .then((response) => {
        updateStyles(response?.css || "");
      });

    document.addEventListener("yt-navigate-finish", () => {
      if (styleElement && !document.head.contains(styleElement)) {
        document.head.appendChild(styleElement);
      }

      if (styleElement) {
        styleElement.textContent = lastAppliedCss;
      }
    });
  },
});
