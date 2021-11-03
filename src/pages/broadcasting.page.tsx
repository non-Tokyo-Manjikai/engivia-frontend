import type { NextPage } from "next";
import { BroadcastHeader } from "src/components/BroadcastHeader";
import { EngiviaCard } from "src/components/EngiviaCard";
import { HeeButtonKit } from "src/components/HeeButtonKit";
import { HeeList } from "src/components/HeeList";
import { PageRoot } from "src/components/PageRoot";
import { styled } from "src/utils";

const LiveUserPage: NextPage = () => {
  return (
    <PageRoot>
      <ListWrapper>
        <HeeList data={HEE_LIST_DATA} />
      </ListWrapper>
      <BroadcastHeader status="live" title="第1回エンジビアの泉" />
      <EngiviaCard
        content="このボタンはカタンさんが作りました。ご本人はとても気に入ってるようです。へぇ〜〜〜ほぉ〜〜〜"
        name="よきまる"
      />
      <HeeButtonKit />
    </PageRoot>
  );
};

// eslint-disable-next-line import/no-default-export
export default LiveUserPage;

const ListWrapper = styled("aside", {
  position: "fixed",
  top: "4.2rem",
  right: 0,

  display: "flex",
  justifyContent: "flex-end",

  paddingTop: "1rem",
  paddingRight: "1.5rem",
  height: "calc(100vh - 4.2rem)",
  overflowY: "auto",
});

const HEE_LIST_DATA = [
  {
    id: "1",
    name: "ぽんさん",
    image: "https://pbs.twimg.com/profile_images/12010782801/katan_normal.jpg",
    count: 1,
  },
  {
    id: "2",
    name: "みやさんさん",
    image: "https://pbs.twimg.com/profile_images/12010782801/katan_normal.jpg",
    count: 2,
  },
  {
    id: "3",
    name: "にんじゃんさん",
    image: "https://pbs.twimg.com/profile_images/12010782801/katan_normal.jpg",
    count: 9,
  },
  {
    id: "4",
    name: "みっっっつあんさん",
    image: "https://pbs.twimg.com/profile_images/12010782801/katan_normal.jpg",
    count: 3,
  },
  {
    id: "5",
    name: "よきまるさん",
    image: "https://pbs.twimg.com/profile_images/12010782801/katan_normal.jpg",
    count: 85,
  },
  {
    id: "5",
    name: "かたん",
    image: "https://pbs.twimg.com/profile_images/12010782801/katan_normal.jpg",
    count: 100,
  },
];
