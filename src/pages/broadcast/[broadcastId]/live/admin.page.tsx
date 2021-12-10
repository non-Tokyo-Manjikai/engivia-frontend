import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { io } from "socket.io-client";
import { BroadcastHeader } from "src/components";
import { broadcastLiveState, userInfoState } from "src/components/atoms";
import { Multicontainers } from "src/components/dnd";
import { Button } from "src/components/styled";
import { totalCount } from "src/functions/totalCount";
import { handlePutBroadcast } from "src/hooks/handlePutBroadcast";
import { useGetEngiviaInfo } from "src/hooks/useGetEngiviaInfo";
import { styled } from "src/utils";

type ConnectUser = {
  id: string;
  name: string;
  image: string;
  heeCount: number;
};

const featurePutBody = { status: "live" };
const featuredPutBody = { status: "ended" };

const LiveAdminPage: NextPage = () => {
  const router = useRouter();
  const [socket, setSoket] = useState<any>(null);
  const userInfo = useRecoilValue(userInfoState);
  const [broadcast, setBroadcast] = useRecoilState(broadcastLiveState);
  const [connectUserList, setConnectUserList] = useState<ConnectUser[]>([]);
  const { data, isError, isLoading } = useGetEngiviaInfo(`/broadcast/${router.query.broadcastId}`, userInfo.token);

  const totalHeeCount = totalCount(connectUserList);

  // 放送開始
  const handleBeginLive = async () => {
    const result = await handlePutBroadcast(`/broadcast/${router.query.broadcastId}`, featurePutBody, userInfo.token);
    if (result.id) {
      setBroadcast((prevState) => {
        if (prevState) {
          return { ...prevState, status: "live" };
        }
        return prevState;
      });
    }

    const socket = io("http://localhost:8080", {
      path: "/live",
      query: {
        id: userInfo.id,
        name: userInfo.name,
        image: userInfo.image,
        isAdmin: "true",
      },
    });
    // console.info("通信情報取得", socket);
    setSoket(socket);

    socket.on("get_connect_user", (data) => {
      // console.info("すべての接続ユーザー取得", data);
      setConnectUserList(data);
    });

    socket.on("get_wait_engivia", () => {
      // console.info("エンジビア待ち状態");
      setConnectUserList((prev: any) => prev.map((user: any) => ({ ...user, heeCount: 0 })));
    });

    socket.on("get_hee_user", (data) => {
      // console.info("へぇしたユーザーID取得", data);
      setConnectUserList((prev: any) =>
        prev.map((user: any) => (user.id === data.heeUser.id ? { ...user, heeCount: data.heeUser.count } : user)),
      );
    });
  };

  // タイトルコール送信
  const handleTitleCall = (engivia: any) => {
    // console.info("タイトルコール送信", engivia);
    socket.emit("post_title_call", {
      query: {
        id: engivia.id,
        name: engivia.User.name,
        image: engivia.User.image,
        content: engivia.content,
        engiviaNumber: engivia.engiviaNumber,
      },
    });
  };
  // フィーチャー済み処理（ユーザー側で待ち状態にさせる）
  const handleWaitTitleCall = () => {
    socket.emit("post_wait_engivia");
  };
  // 放送終了
  const handleFinishLive = async () => {
    socket.disconnect();
    setSoket(null);

    const result = await handlePutBroadcast(`/broadcast/${router.query.broadcastId}`, featuredPutBody, userInfo.token);
    if (result.id) {
      setBroadcast((prevState) => {
        if (prevState) {
          return { ...prevState, status: "ended" };
        }
        return prevState;
      });
    }
  };

  useEffect(() => {
    if (!socket && broadcast?.status === "live") handleBeginLive();
  }, [broadcast]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error...</div>;
  if (!data) return <div>Empty...</div>;

  return (
    <Container>
      <Top>
        <Title>
          <BroadcastHeader title={`${data.title}：${totalHeeCount || 0}へぇ`} status={data.status} />
        </Title>

        <ButtonWrap>
          <UpcommingButtonWrap>
            {data?.status === "upcoming" ? (
              <Button color="primary" onClick={handleBeginLive}>
                放送を開始する
              </Button>
            ) : data?.status === "live" ? (
              <Button color="secondary" onClick={handleFinishLive}>
                放送を終了する
              </Button>
            ) : null}
          </UpcommingButtonWrap>
        </ButtonWrap>
      </Top>

      <Multicontainers
        totalHeeCount={totalHeeCount}
        onTitleCall={handleTitleCall}
        onWaitTitleCall={handleWaitTitleCall}
      />
    </Container>
  );
};

// eslint-disable-next-line import/no-default-export
export default LiveAdminPage;

const Top = styled("div", {
  display: "grid",
  gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
  justifyContent: "center",
  padding: "10px",
  marginY: "20px",
});

const Container = styled("div", {
  margin: "auto",
  width: "130vh",
  userSelect: "none",
});

const Title = styled("div", {
  gridColumnStart: 2,
  gridColumnEnd: 3,
});

const ButtonWrap = styled("div", {
  gridColumnStart: 3,
  gridColumnEnd: 4,
  display: "inline-block",
  alignSelf: "center",
  justifySelf: "end",
});

const UpcommingButtonWrap = styled("div", {
  display: "flex",
  gap: "10px",
});
