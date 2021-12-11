/* eslint-disable indent */
import type { LiveStatus } from "src/types";

type ColorType = "green" | "orange" | "gray";

type ReturnType = {
  color: ColorType;
  label: string;
};

export const statusCheck = (status?: LiveStatus): ReturnType => {
  switch (status) {
    case "live":
      return { color: "green", label: "放送中" };
    case "upcoming":
      return { color: "orange", label: "放送前・エンジビア募集中" };
    case "ended":
      return { color: "gray", label: "放送済み" };
    default:
      return { color: "gray", label: "放送済み" };
  }
};
