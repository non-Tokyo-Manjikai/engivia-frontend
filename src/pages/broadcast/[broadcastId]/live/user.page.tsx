import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { io } from "socket.io-client";
import { BroadcastHeader, EngiviaCard, HeeButtonKit, HeeList } from "src/components";
import { userInfoState } from "src/components/atoms";
import { PageRoot } from "src/components/styled";
import { API_URL } from "src/constants/API_URL";
import { HEE_SOUND } from "src/constants/HEE_SOUND";
import { INIT_ENGIVIA } from "src/constants/INIT_ENGIVIA";
import { totalCount } from "src/functions/totalCount";
import { useGetEngiviaInfo } from "src/hooks/useGetEngiviaInfo";
import type { ConnectUser, ViewEngivia } from "src/types";
import { styled } from "src/utils";

const LiveUserPage: NextPage = () => {
  const router = useRouter();
  const userInfo = useRecoilValue(userInfoState);
  const [heeSound, setHeeSound] = useState<HTMLAudioElement | null>(null);
  const [socket, setSoket] = useState<any>();
  const [heeCount, setHeeCount] = useState<number>(0);
  const [viewEngivia, setViewEngivia] = useState<ViewEngivia>(INIT_ENGIVIA);
  const [connectUserList, setConnectUserList] = useState<ConnectUser[]>([]);
  const { data, isError, isLoading } = useGetEngiviaInfo(`/broadcast/${router.query.broadcastId}`, userInfo.token);

  const totalHeeCount = totalCount(connectUserList);

  // へぇカウント送信
  const handleHeeClick = () => {
    if (heeCount === 20) return;
    if (viewEngivia.id === 0) return;
    socket.emit("post_hee_user", {
      query: { count: heeCount + 1 },
    });
    setHeeCount((prev: number) => prev + 1);
    if (heeSound) heeSound.play();
  };

  // 通信開始
  const handleLiveConnect = () => {
    const socket = io(API_URL, {
      path: "/live",
      query: {
        id: userInfo.id,
        name: userInfo.name,
        image: userInfo.image,
        isAdmin: "false",
      },
    });
    // console.info("通信情報取得", socket);
    setSoket(socket);

    socket.on("get_connect_user", (data) => {
      // console.info("すべての接続ユーザー取得", data);
      setConnectUserList(data);
    });

    socket.on("get_title_call", (data) => {
      // console.info("タイトルコール取得", data);
      setViewEngivia(data.engivia);
      const sound = new Audio(`data:audio/wav;base64, ${data.engivia.heeSound}`);
      sound.play();
    });

    socket.on("get_wait_engivia", () => {
      // console.info("エンジビア待ち状態");
      setConnectUserList((prev) => prev.map((user) => ({ ...user, heeCount: 0 })));
      setHeeCount(0);
      setViewEngivia(INIT_ENGIVIA);
    });

    socket.on("get_hee_user", (data) => {
      // console.info("へぇしたユーザーID取得", data);
      setConnectUserList((prev) =>
        prev.map((user) => (user.id === data.heeUser.id ? { ...user, heeCount: data.heeUser.count } : user)),
      );
    });

    socket.on("exit_user", (data) => {
      // console.info("すべての接続ユーザー取得", data);
      setConnectUserList(data);
    });
  };

  // 通信終了
  const handleLiveDisconnect = useCallback(() => {
    socket.disconnect();
  }, [socket]);

  useEffect(() => {
    handleLiveConnect();
    setHeeSound(new Audio(`data:audio/wav;base64, ${HEE_SOUND}`));
    return () => {
      handleLiveDisconnect();
    };
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error...</div>;
  if (!data) return <div>Empty...</div>;

  return (
    <PageRoot>
      <ListWrapper>
        <HeeList currentUserId={userInfo.id} data={connectUserList} />
      </ListWrapper>

      <BroadcastHeader status="live" title={data.title} />
      <EngiviaCard {...viewEngivia} heeCount={totalHeeCount} isResult />
      <HeeButtonKit onClick={handleHeeClick} isDied={heeCount === 20 || viewEngivia.id === 0} />
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
