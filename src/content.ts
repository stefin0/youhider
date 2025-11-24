export const Actions = {
  SYNC_SETTING: "syncSetting",
  GET_INITIAL_CSS: "getInitialCss",
  UPDATE_CSS: "updateCss",
} as const;

export interface ExtensionMessage {
  action: (typeof Actions)[keyof typeof Actions];
  css?: string;
  key?: string;
  state?: boolean;
}

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

chrome.runtime.onMessage.addListener((message: ExtensionMessage) => {
  if (
    message.action === Actions.UPDATE_CSS &&
    typeof message.css === "string"
  ) {
    updateStyles(message.css);
  }
});

chrome.runtime.sendMessage({ action: "getInitialCss" }, (response) => {
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
