/* eslint-disable @typescript-eslint/naming-convention */
export type LiveStatus = "upcoming" | "live" | "ended";

export type User = {
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
  User: User;
  statusCode?: number;
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
  count: number;
};
