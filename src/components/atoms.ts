import { atom } from "recoil";
import type { BroadcastLiveType } from "src/types";

export const userInfoState = atom({
  key: "userInfoState",
  default: {
    id: "user2",
    name: "テストユーザー2",
    isAdmin: true,
    image: "/defaultIcon.png",
    token: "token2",
  },
});

export const broadcastLiveState = atom<BroadcastLiveType | null>({
  key: "broadcastLiveState",
  default: null,
});
