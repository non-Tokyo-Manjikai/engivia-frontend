export type BroadcastListType = {
  id: number;
  title: string;
  scheduledStartTime: string;
  status: "live" | "upcoming" | "ended";
  count: number;
  archiveUrl: string;
};
