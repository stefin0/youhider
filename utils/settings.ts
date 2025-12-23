import { PublicPath } from "wxt/browser";

export interface Setting {
  key: string;
  checkboxId: string;
  cssFile: PublicPath;
}

export const settings: Setting[] = [
  {
    key: "isHiddenCommentCount",
    checkboxId: "hide-commentcount-checkbox",
    cssFile: "/css/hide-commentcount.css",
  },
  {
    key: "isHiddenComments",
    checkboxId: "hide-comments-checkbox",
    cssFile: "/css/hide-comments.css",
  },
  {
    key: "isHiddenEndscreen",
    checkboxId: "hide-endscreen-checkbox",
    cssFile: "/css/hide-endscreen.css",
  },
  {
    key: "isHiddenHomeFeed",
    checkboxId: "hide-homefeed-checkbox",
    cssFile: "/css/hide-homefeed.css",
  },
  {
    key: "isHiddenLikes",
    checkboxId: "hide-likecount-checkbox",
    cssFile: "/css/hide-likecount.css",
  },
  // {
  //   key: "isHiddenLiveChat",
  //   checkboxId: "hide-livechat-checkbox",
  //   cssFile: "/css/hide-livechat.css",
  // },
  {
    key: "isHiddenMemberVideos",
    checkboxId: "hide-membervideos-checkbox",
    cssFile: "/css/hide-membervideos.css",
  },
  {
    key: "isHiddenMixes",
    checkboxId: "hide-mixes-checkbox",
    cssFile: "/css/hide-mixes.css",
  },
  {
    key: "isHiddenPlayables",
    checkboxId: "hide-playables-checkbox",
    cssFile: "/css/hide-playables.css",
  },
  {
    key: "isHiddenRelatedVideos",
    checkboxId: "hide-relatedvideos-checkbox",
    cssFile: "/css/hide-relatedvideos.css",
  },
  {
    key: "isHiddenShorts",
    checkboxId: "hide-shorts-checkbox",
    cssFile: "/css/hide-shorts.css",
  },
  {
    key: "isHiddenSubscriberCount",
    checkboxId: "hide-subscribercount-checkbox",
    cssFile: "/css/hide-subscribercount.css",
  },
  {
    key: "isHiddenUploadDate",
    checkboxId: "hide-uploaddate-checkbox",
    cssFile: "/css/hide-uploaddate.css",
  },
  {
    key: "isHiddenVideoDuration",
    checkboxId: "hide-videoduration-checkbox",
    cssFile: "/css/hide-videoduration.css",
  },
  {
    key: "isHiddenViews",
    checkboxId: "hide-viewcount-checkbox",
    cssFile: "/css/hide-viewcount.css",
  },
];
