import type { NextPage } from "next";
import { useState } from "react";
import { io } from "socket.io-client";
import { BroadcastHeader } from "src/components";
import { Multicontainers } from "src/components/dnd";
import { Button } from "src/components/styled";
import { totalCount } from "src/functions/totalCount";
import { useGetEngiviaInfo } from "src/hooks/useGetEngiviaInfo";
import { styled } from "src/utils";

// ユーザー情報
const sampleUserInfo = {
  id: "ABCDE123",
  name: "ぽんたん",
  image:
    "https://secure.gravatar.com/avatar/e57b3678017c2e646e065d9803735508.jpg?s=24&d=https%3A%2F%2Fa.slack-edge.com%2Fdf10d%2Fimg%2Favatars%2Fava_0013-24.png",
  isAdmin: true,
  content: "HTMLにはポータルという要素がある",
};

type ConnectUser = {
  id: string;
  name: string;
  image: string;
  heeCount: number;
};

const LiveAdminPage: NextPage = () => {
  const { data, isError, isLoading, isEmpty } = useGetEngiviaInfo("/broadcast/1", "token3");
  const [socket, setSoket] = useState<any>(null);
  const [connectUserList, setConnectUserList] = useState<ConnectUser[]>([]);

  // 放送開始
  const handleBeginLive = () => {
    const socket = io("http://localhost:8080", {
      path: "/live",
      query: {
        id: sampleUserInfo.id,
        name: sampleUserInfo.name,
        image: sampleUserInfo.image,
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
      },
    });
  };

  // フィーチャー済み処理（ユーザー側で待ち状態にさせる）
  const handleWaitTitleCall = () => {
    socket.emit("post_wait_engivia");
  };

  // 放送終了
  const handleFinishLive = () => {
    socket.disconnect();
    setSoket(null);
  };

  if (isLoading) <div>loading</div>;
  if (isEmpty) <div>isEmpty</div>;
  if (isError) <div>error</div>;
  return (
    <Container>
      <Top>
        <Title>
          <BroadcastHeader title={`${data?.title}：${totalCount(connectUserList)}へぇ`} status={data?.status} />
        </Title>

        <ButtonWrap>
          <UpcommingButtonWrap>
            {!socket ? (
              <Button color="primary" onClick={handleBeginLive}>
                放送を開始する
              </Button>
            ) : (
              <Button color="secondary" onClick={handleFinishLive}>
                放送を終了する
              </Button>
            )}
          </UpcommingButtonWrap>
        </ButtonWrap>
      </Top>

      {data ? (
        <Multicontainers
          status={data.status}
          triviaList={data.Trivia}
          totalHeeCount={totalCount(connectUserList)}
          onTitleCall={handleTitleCall}
          onWaitTitleCall={handleWaitTitleCall}
        />
      ) : null}
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
