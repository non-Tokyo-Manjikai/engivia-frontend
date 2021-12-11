/* eslint-disable @typescript-eslint/naming-convention */
export type LiveStatus = "upcoming" | "live" | "ended";

export type User = {
  id: string;
  name: string;
  image: string;
  token: string;
  isAdmin: boolean;
};

export type Trivia = {
  id: number;
  userId: string;
  content: string;
  featured: boolean;
  hee: number | null;
  statusCode?: number;

  User: User;
};

export type Broadcast = {
  id: number;
  title: string;
  scheduledStartTime: string;
  status: LiveStatus;
  _count: {
    Trivia: number;
  };
};

export type BroadcastLive = {
  id: number;
  title: string;
  status: LiveStatus;
  scheduledStartTime: Date;
  archiveUrl: string | null;

  Trivia: Trivia[];
};

export type ViewEngivia = {
  id: number;
  name: string;
  image: string;
  content: string;
  engiviaNumber: number;
};

export type ConnectUser = {
  id: string;
  name: string;
  image: string;
  heeCount: number;
  isAdmin: boolean;
};
