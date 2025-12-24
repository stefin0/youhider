import { Setting, SettingCategory, settings } from "@/utils/settings";
import { Actions, ExtensionMessage } from "@/utils/types";

function createSettingsRow(
  setting: Setting,
  initialValue: boolean,
): HTMLLabelElement {
  const label = document.createElement("label");
  label.title = setting.tooltip;

  const input = document.createElement("input");
  input.type = "checkbox";
  input.id = `checkbox-${setting.key}`;
  input.checked = initialValue;

  input.addEventListener("change", async () => {
    const state = input.checked;
    await browser.storage.local.set({ [setting.key]: state });

    try {
      await browser.runtime.sendMessage<ExtensionMessage>({
        action: Actions.SYNC_SETTING,
        key: setting.key,
        state: state,
      });
    } catch (error) {
      console.error("Failed to sync setting:", error);
    }
  });

  label.appendChild(input);
  label.appendChild(document.createTextNode(` ${setting.label}`));

  return label;
}

(async () => {
  const form = document.getElementById("settings-form");
  if (!form) return;

  const keys = settings.map((setting) => setting.key);
  const stored = await browser.storage.local.get(keys);

  const categories: Record<SettingCategory, Setting[]> = {
    Metrics: [],
    Content: [],
  };

  settings.forEach((setting) => {
    if (categories[setting.category]) {
      categories[setting.category].push(setting);
    }
  });

  const fragment = document.createDocumentFragment();

  (Object.entries(categories) as [SettingCategory, Setting[]][]).forEach(
    ([catName, catSettings]) => {
      if (catSettings.length === 0) return;

      const fieldset = document.createElement("fieldset");
      const legend = document.createElement("legend");
      legend.textContent = catName;
      fieldset.appendChild(legend);

      catSettings.forEach((setting) => {
        const isChecked = !!stored[setting.key];
        const row = createSettingsRow(setting, isChecked);
        fieldset.appendChild(row);
      });

      fragment.appendChild(fieldset);
    },
  );

  form.appendChild(fragment);
})();
