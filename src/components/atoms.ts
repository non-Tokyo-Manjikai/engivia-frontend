import { atom } from "recoil";
import type { BroadcastLive, User } from "src/types";

export const userInfoState = atom<User>({
  key: "userInfoState",
  default: {
    id: "user2",
    name: "テストユーザー2",
    isAdmin: true,
    image: "/defaultIcon.png",
    token: "token2",
  },
});

export const broadcastLiveState = atom<BroadcastLive | null>({
  key: "broadcastLiveState",
  default: null,
});
