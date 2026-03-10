export const Platform = {
  IOS: "ios",
  ANDROID: "android",
  TDESKTOP: "tdesktop",
  WEB: "web",
} as const;

export const Advertising = {
  REWARD: "reward",
  INIT: "init",
} as const;

export type PlatformType = (typeof Platform)[keyof typeof Platform];

export type AdvertisingType = (typeof Advertising)[keyof typeof Advertising];
