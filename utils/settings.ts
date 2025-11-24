export interface Setting {
  key: string;
  checkboxId: string;
  cssFile: string;
}

export const settings: Setting[] = [
  {
    key: "isHiddenCommentCount",
    checkboxId: "hide-commentcount-checkbox",
    cssFile: "assets/hide-commentcount.css",
  },
  {
    key: "isHiddenComments",
    checkboxId: "hide-comments-checkbox",
    cssFile: "assets/hide-comments.css",
  },
  {
    key: "isHiddenEndscreen",
    checkboxId: "hide-endscreen-checkbox",
    cssFile: "assets/hide-endscreen.css",
  },
  {
    key: "isHiddenHomeFeed",
    checkboxId: "hide-homefeed-checkbox",
    cssFile: "assets/hide-homefeed.css",
  },
  {
    key: "isHiddenLikes",
    checkboxId: "hide-likecount-checkbox",
    cssFile: "assets/hide-likecount.css",
  },
  // {
  //   key: "isHiddenLiveChat",
  //   checkboxId: "hide-livechat-checkbox",
  //   cssFile: "assets/hide-livechat.css",
  // },
  {
    key: "isHiddenMemberVideos",
    checkboxId: "hide-membervideos-checkbox",
    cssFile: "assets/hide-membervideos.css",
  },
  {
    key: "isHiddenPlayables",
    checkboxId: "hide-playables-checkbox",
    cssFile: "assets/hide-playables.css",
  },
  {
    key: "isHiddenRelatedVideos",
    checkboxId: "hide-relatedvideos-checkbox",
    cssFile: "assets/hide-relatedvideos.css",
  },
  {
    key: "isHiddenShorts",
    checkboxId: "hide-shorts-checkbox",
    cssFile: "assets/hide-shorts.css",
  },
  {
    key: "isHiddenSubscriberCount",
    checkboxId: "hide-subscribercount-checkbox",
    cssFile: "assets/hide-subscribercount.css",
  },
  {
    key: "isHiddenUploadDate",
    checkboxId: "hide-uploaddate-checkbox",
    cssFile: "assets/hide-uploaddate.css",
  },
  {
    key: "isHiddenVideoDuration",
    checkboxId: "hide-videoduration-checkbox",
    cssFile: "assets/hide-videoduration.css",
  },
  {
    key: "isHiddenViews",
    checkboxId: "hide-viewcount-checkbox",
    cssFile: "assets/hide-viewcount.css",
  },
];
