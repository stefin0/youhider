import { PublicPath } from "wxt/browser";

export type SettingCategory = "Metrics" | "Content";

export interface Setting {
  key: string;
  label: string;
  tooltip: string;
  category: SettingCategory;
  cssFile: PublicPath;
}

export const settings: Setting[] = [
  {
    key: "isHiddenCommentCount",
    label: "Hide Comment Count",
    tooltip: "Hides comment count.",
    category: "Metrics",
    cssFile: "/css/hide-commentcount.css",
  },
  {
    key: "isHiddenComments",
    label: "Hide Comments",
    tooltip: "Hides comments.",
    category: "Content",
    cssFile: "/css/hide-comments.css",
  },
  {
    key: "isHiddenEndscreen",
    label: "Hide End Screen",
    tooltip: "Hides content shown near and at the end of videos.",
    category: "Content",
    cssFile: "/css/hide-endscreen.css",
  },
  {
    key: "isHiddenHomeFeed",
    label: "Hide Home Feed",
    tooltip: "Hides Home feed.",
    category: "Content",
    cssFile: "/css/hide-homefeed.css",
  },
  {
    key: "isHiddenLikes",
    label: "Hide Like Count",
    tooltip: "Hides like count.",
    category: "Metrics",
    cssFile: "/css/hide-likecount.css",
  },
  // {
  //   key: "isHiddenLiveChat",
  //   label: "Hide Live Chat",
  //   tooltip: "Hides live chat."
  //   category: "Content",
  //   cssFile: "/css/hide-livechat.css",
  // },
  {
    key: "isHiddenMemberVideos",
    label: "Hide Member Videos",
    tooltip: "Hides Member videos.",
    category: "Content",
    cssFile: "/css/hide-membervideos.css",
  },
  {
    key: "isHiddenMixes",
    label: "Hide Mixes",
    tooltip: "Hides Mixes.",
    category: "Content",
    cssFile: "/css/hide-mixes.css",
  },
  {
    key: "isHiddenPlayables",
    label: "Hide Playables",
    tooltip: "Hides Playables.",
    category: "Content",
    cssFile: "/css/hide-playables.css",
  },
  {
    key: "isHiddenRelatedVideos",
    label: "Hide Related Videos",
    tooltip: "Hides videos shown around the currently playing video.",
    category: "Content",
    cssFile: "/css/hide-relatedvideos.css",
  },
  {
    key: "isHiddenShorts",
    label: "Hide Shorts",
    tooltip: "Hides Shorts.",
    category: "Content",
    cssFile: "/css/hide-shorts.css",
  },
  {
    key: "isHiddenSubscriberCount",
    label: "Hide Subscriber Count",
    tooltip: "Hides subscriber count.",
    category: "Metrics",
    cssFile: "/css/hide-subscribercount.css",
  },
  {
    key: "isHiddenUploadDate",
    label: "Hide Upload Date",
    tooltip: "Hides upload date.",
    category: "Metrics",
    cssFile: "/css/hide-uploaddate.css",
  },
  {
    key: "isHiddenVideoDuration",
    label: "Hide Video Duration",
    tooltip: "Hides video duration.",
    category: "Metrics",
    cssFile: "/css/hide-videoduration.css",
  },
  {
    key: "isHiddenViews",
    label: "Hide View Count",
    tooltip: "Hides view, watching, and waiting count.",
    category: "Metrics",
    cssFile: "/css/hide-viewcount.css",
  },
];
