import { settings } from "@/utils/settings";
import { Actions, ExtensionMessage } from "@/utils/types";

(async () => {
  const keys = settings.map((s) => s.key);
  const stored = await browser.storage.local.get(keys);

  for (const setting of settings) {
    const checkbox = document.getElementById(setting.checkboxId);

    if (checkbox instanceof HTMLInputElement) {
      checkbox.checked = !!stored[setting.key];

      checkbox.addEventListener(
        "change",
        async function (this: HTMLInputElement) {
          const state = this.checked;

          await browser.storage.local.set({ [setting.key]: state });

          browser.runtime.sendMessage<ExtensionMessage>({
            action: Actions.SYNC_SETTING,
            key: setting.key,
            state: state,
          });
        },
      );
    } else {
      console.error(`Could not find checkbox with ID: ${setting.checkboxId}`);
    }
  }
})();
