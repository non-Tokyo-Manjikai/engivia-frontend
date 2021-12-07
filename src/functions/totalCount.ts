type ConnectUser = {
  id: string;
  name: string;
  image: string;
  heeCount: number;
};

export const totalCount = (connectUserList: ConnectUser[]) => {
  return connectUserList.reduce((total, current) => total + current.heeCount, 0);
};
