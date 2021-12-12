import type { ConnectUser } from "src/types";

export const totalCount = (connectUserList: ConnectUser[]) => {
  const totalCount = connectUserList.reduce((total, current) => total + current.heeCount, 0);

  const result = Number(((totalCount / (connectUserList.length - 1)) * 5).toFixed(1));
  return result;
};
