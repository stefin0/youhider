import { Page } from "@playwright/test";
import {
  defineScenarios,
  seedHomeFeed,
  stabilizeMetadata,
  URLS,
} from "../helpers";

export const viewCountsScenarios = defineScenarios("hideviewcount", [
  {
    variant: "HOME>regular videos",
    skipOnCI: true,
    beforeTest: seedHomeFeed(),
    snapshotContainer: (page: Page) => {
      return page
        .locator("ytd-rich-item-renderer yt-content-metadata-view-model > div")
        .filter({ hasText: /(view|ago)/i })
        .first();
    },
    prepareElement: stabilizeMetadata(),
  },
  {
    variant: "WATCH>description",
    url: URLS.VIDEO.ME_AT_THE_ZOO,
    snapshotContainer: (page: Page) => {
      return page
        .locator("yt-formatted-string#info")
        .filter({ hasText: /view|ago/ })
        .first();
    },
    prepareElement: stabilizeMetadata(),
  },
  {
    variant: "WATCH>related",
    url: URLS.VIDEO.ME_AT_THE_ZOO,
    snapshotContainer: (page: Page) => {
      return page
        .locator(".ytContentMetadataViewModelMetadataRow")
        .filter({ hasText: /view|ago/ })
        .first();
    },
    prepareElement: stabilizeMetadata(),
  },
]);
