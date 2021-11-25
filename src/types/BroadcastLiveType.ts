/* eslint-disable @typescript-eslint/naming-convention */

export type User = {
  id: string;
  name: string;
  image: string;
};

export type TriviaType = {
  id: number;
  content: string;
  featured: boolean;
  hee: number | null;
  userId: string;
  User: User;
};

export type BroadcastLiveType = {
  id: number;
  status: "upcoming" | "live" | "ended";
  title: string;
  scheduleStartTime: Date;
  Trivia: TriviaType[];
  archiveUrl: string;
};
