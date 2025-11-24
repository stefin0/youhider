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
