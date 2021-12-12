import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import type { Socket } from "socket.io-client";
import { io } from "socket.io-client";
import { BroadcastHeader, EngiviaCard, HeeButtonKit, HeeList } from "src/components";
import { userInfoState } from "src/components/atoms";
import {
  // Button,
  PageRoot
} from "src/components/styled";
import { API_URL } from "src/constants/API_URL";
import { HEE_SOUND } from "src/constants/HEE_SOUND";
import { INIT_ENGIVIA } from "src/constants/INIT_ENGIVIA";
import { totalCount } from "src/functions/totalCount";
import { useGetEngiviaInfo } from "src/hooks/useGetEngiviaInfo";
import { styled } from "src/utils";

type Engivia = {
  id: number;
  name: string;
  image: string;
  content: string;
  engiviaNumber: number;
};

type ConnectUser = {
  id: string;
  name: string;
  image: string;
  heeCount: number;
  isAdmin: boolean;
};

const LiveUserPage: NextPage = () => {
  const router = useRouter();
  const userInfo = useRecoilValue(userInfoState);
  const [heeSound, setHeeSound] = useState<any>(null);
  const [socket, setSoket] = useState<Socket>();
  const [heeCount, setHeeCount] = useState<number>(0);
  const [viewEngivia, setViewEngivia] = useState<Engivia>(INIT_ENGIVIA);
  const [connectUserList, setConnectUserList] = useState<ConnectUser[]>([]);
  const { data, isError, isLoading } = useGetEngiviaInfo(`/broadcast/${router.query.broadcastId}`, userInfo.token);

  const totalHeeCount = totalCount(connectUserList);

  // 開発用
  /*
  const [selectUser, setSelectUser] = useState(0);
  const handleChange = (value: number) => {
    setSelectUser(value);
  };
  */

  // 通信開始
  const handleLiveConnect = () => {
    const socket = io(API_URL, {
      path: "/live",
      // 自動で接続しなくなる
      // autoConnect: false,
      // 自動で再接続しなくなる
      // reconnection: false,
      query: {
        // 開発用
        // id: sampleUserInfo[selectUser].id,
        // name: sampleUserInfo[selectUser].name,
        // image: sampleUserInfo[selectUser].image,
        // isAdmin: "false",
        // 本番用
        id: userInfo.id,
        name: userInfo.name,
        image: userInfo.image,
        isAdmin: "false",
      },
    });
    // console.info("通信情報取得", socket);
    setSoket(socket);

    socket.on("get_connect_user", (data: ConnectUser[]) => {
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
      setConnectUserList((prev: any) => prev.map((user: any) => ({ ...user, heeCount: 0 })));
      setHeeCount(0);
      setViewEngivia(INIT_ENGIVIA);
    });

    socket.on("get_hee_user", (data) => {
      // console.info("へぇしたユーザーID取得", data);
      setConnectUserList((prev) =>
        prev.map((user) => (user.id === data.heeUser.id ? { ...user, heeCount: data.heeUser.count } : user)),
      );
    });

    socket.on("exit_user", (data: ConnectUser[]) => {
      // console.info("すべての接続ユーザー取得", data);
      setConnectUserList(data);
    });

    // 放送が終了したとき
    socket.on("finish_live_to_client", () => {
      socket.disconnect();
      router.push("/broadcast");
    });

    // --------------- socket通信の確認のため --------------- //
    socket.on("connect", () => {
      console.info(`connected socket. id: ${socket.id}`);
    });

    socket.on("connect_error", () => {
      console.error("connect_error socket.");
      /*
      setTimeout(() => {
        socket.connect();
      }, 1000);
      */
    });

    socket.on("disconnect", (reason) => {
      console.error(`disconnected socket. reason: ${reason}`);
    });
    // -------------------------------------------------------- //
  };

  useEffect(() => {
    // 本番用
    handleLiveConnect();
    setHeeSound(new Audio(`data:audio/wav;base64, ${HEE_SOUND}`));
  }, []);

  // へぇカウント送信
  const handleHeeClick = () => {
    if (heeCount === 20) return;
    if (viewEngivia.id === 0) return;
    // socketがundefinedである場合があるため、? をつけた
    socket?.emit("post_hee_user", {
      query: { count: heeCount + 1 },
    });
    setHeeCount((prev: number) => prev + 1);
    heeSound.play();
  };

  // 通信終了
  const handleLiveDisconnect = useCallback(() => {
    // socketがundefinedである場合があるため、? をつけた
    socket?.disconnect();
  }, [socket]);

  useEffect(() => {
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

      {/* <select onChange={(e: any) => handleChange(e.target.value)}>
        <option value={0}>0</option>
        <option value={1}>1</option>
        <option value={2}>2</option>
      </select> */}

      { /* !socket ? (
        <Button color="primary" onClick={handleLiveConnect}>
          通信を始める
        </Button>
      ) : (
        <Button color="secondary" onClick={handleLiveDisconnect}>
          通信終了
        </Button>
      ) */}

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

// 開発用
/*
const sampleUserInfo = [
  {
    id: "ABCDE456",
    name: "みやさん",
    image:
      "https://secure.gravatar.com/avatar/e57b3678017c2e646e065d9803735508.jpg?s=24&d=https%3A%2F%2Fa.slack-edge.com%2Fdf10d%2Fimg%2Favatars%2Fava_0013-24.png",
    isAdmin: false,
    content: "HTMLにはポータルという要素がある",
  },
  {
    id: "ABCDE789",
    name: "カタンシャン",
    image:
      "https://secure.gravatar.com/avatar/e57b3678017c2e646e065d9803735508.jpg?s=24&d=https%3A%2F%2Fa.slack-edge.com%2Fdf10d%2Fimg%2Favatars%2Fava_0013-24.png",
    isAdmin: false,
    content: "HTMLにはポータルという要素がある",
  },
  {
    id: "ABCDE123",
    name: "カaaaaaンシャン",
    image:
      "https://secure.gravatar.com/avatar/e57b3678017c2e646e065d9803735508.jpg?s=24&d=https%3A%2F%2Fa.slack-edge.com%2Fdf10d%2Fimg%2Favatars%2Fava_0013-24.png",
    isAdmin: false,
    content: "HTMLにはポータルという要素がある",
  },
];
*/
