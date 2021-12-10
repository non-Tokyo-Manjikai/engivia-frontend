/* eslint-disable @typescript-eslint/naming-convention */
export type LiveStatus = "upcoming" | "live" | "ended";

export type UserType = {
  id: string;
  name: string;
  image: string;
  isAdmin: boolean;
  token: string;
};

export type TriviaType = {
  id: number;
  content: string;
  featured: boolean;
  hee: number | null;
  userId: string;
  User: UserType;
};

export type BroadcastLiveType = {
  id: number;
  status: LiveStatus;
  title: string;
  scheduledStartTime: Date;
  Trivia: TriviaType[];
  archiveUrl: string;
};

export type BroadcastListType = {
  id: number;
  title: string;
  scheduledStartTime: string;
  status: LiveStatus;
  _count: {
    Trivia: number;
  }
};

export type FetchUserInfo = {
  id: string;
  name: string;
  image: string;
  isAdmin: boolean;
};
