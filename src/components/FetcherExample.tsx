/* eslint-disable camelcase */
import { getFetcherWithToken } from "src/functions/getFetcher";
import { requestFetcher } from "src/functions/requestFetcher";
import { useGetSWRWithToken } from "src/hooks/useGetSWR";
import type { UserType } from "src/types";

const broadcastId = 3;
const triviaId = 27;

const user_token = "token1";
const admin_token = "token3";

const TriviaPostBody = {
  content: "こんにちは",
  token: user_token,
  broadcastId: broadcastId,
};
const TriviaPutBody = {
  featured: true,
  hee: 100,
};

const BroadcastPostBody = {
  title: "新規放送タイトル",
  scheduledStartTime: "2020-01-01T00:00:00.000Z",
};
const BroadcastPutBody = {
  status: "live",
};

export const FetcherExample = () => {
  const { data, isError, isLoading } = useGetSWRWithToken<UserType>("/user", user_token);
  isLoading && console.info("取得中...");
  isError && console.error("失敗しました");
  !data && console.info("データがありません");
  data && console.info("ユーザー情報", data);

  const handleGetArcive = async (userToken: string) => {
    const result = await getFetcherWithToken(`/broadcast/${broadcastId}`, userToken);
    if (!result?.id) {
      console.error("失敗しました");
    } else {
      console.info("成功しました", result);
    }
  };

  const handlePostTrivia = async (userToken: string) => {
    const result = await requestFetcher("/trivia", TriviaPostBody, "POST", userToken);
    if (result >= 400) {
      console.error("失敗しました");
    } else {
      console.info("成功しました");
    }
  };

  const handlePutTrivia = async (userToken: string) => {
    const result = await requestFetcher(`/trivia/${triviaId}`, TriviaPutBody, "PUT", userToken);
    if (result >= 400) {
      console.error("失敗しました");
    } else {
      console.info("成功しました");
    }
  };

  const handleDeleteTrivia = async (userToken: string) => {
    const result = await requestFetcher(`/trivia/${triviaId}`, {}, "DELETE", userToken);
    if (result >= 400) {
      console.error("失敗しました");
    } else {
      console.info("成功しました");
    }
  };

  const handlePostBroadcast = async (userToken: string) => {
    const result = await requestFetcher("/broadcast", BroadcastPostBody, "POST", userToken);
    if (result >= 400) {
      console.error("失敗しました");
    } else {
      console.info("成功しました");
    }
  };

  const handlePutBroadcast = async (userToken: string) => {
    const result = await requestFetcher(`/broadcast/${broadcastId}`, BroadcastPutBody, "PUT", userToken);
    if (result >= 400) {
      console.error("失敗しました");
    } else {
      console.info("成功しました");
    }
  };

  const handleDeleteBroadcast = async (userToken: string) => {
    const result = await requestFetcher(`/broadcast/${broadcastId}`, {}, "DELETE", userToken);
    if (result >= 400) {
      console.error("失敗しました");
    } else {
      console.info("成功しました");
    }
  };

  return (
    <div className="flex flex-col gap-2 w-full px-40">
      <h1>管理者</h1>
      <button className="flex-1 bg-blue-100 p-2" onClick={() => handleGetArcive(admin_token)}>
        アーカイブ取得（イベントハンドラでリクエストしないけど一応）
      </button>
      <div className="flex gap-2">
        <button className="flex-1 bg-yellow-100 p-2" onClick={() => handlePostTrivia(admin_token)}>
          トリビア作成
        </button>
        <button className="flex-1 bg-green-100 p-2" onClick={() => handlePutTrivia(admin_token)}>
          トリビア更新（タイトルコール）
        </button>
        <button className="flex-1 bg-red-100 p-2" onClick={() => handleDeleteTrivia(admin_token)}>
          トリビア削除
        </button>
      </div>

      <div className="flex gap-2">
        <button className="flex-1 bg-yellow-100 p-2" onClick={() => handlePostBroadcast(admin_token)}>
          放送作成
        </button>
        <button className="flex-1 bg-green-100 p-2" onClick={() => handlePutBroadcast(admin_token)}>
          放送更新（放送開始）
        </button>
        <button className="flex-1 bg-red-100 p-2" onClick={() => handleDeleteBroadcast(admin_token)}>
          放送削除
        </button>
      </div>

      <h1>ユーザー</h1>
      <button className="flex-1 bg-blue-100 p-2" onClick={() => handleGetArcive(user_token)}>
        アーカイブ取得（イベントハンドラでリクエストしないけど一応）
      </button>
      <div className="flex gap-2">
        <button className="flex-1 bg-yellow-100 p-2" onClick={() => handlePostTrivia(user_token)}>
          トリビア作成
        </button>
        <button className="flex-1 bg-green-100 p-2" onClick={() => handlePutTrivia(user_token)}>
          トリビア更新（タイトルコール）
        </button>
        <button className="flex-1 bg-red-100 p-2" onClick={() => handleDeleteTrivia(user_token)}>
          トリビア削除
        </button>
      </div>

      <div className="flex gap-2">
        <button className="flex-1 bg-yellow-100 p-2" onClick={() => handlePostBroadcast(user_token)}>
          放送作成
        </button>
        <button className="flex-1 bg-green-100 p-2" onClick={() => handlePutBroadcast(user_token)}>
          放送更新（放送開始）
        </button>
        <button className="flex-1 bg-red-100 p-2" onClick={() => handleDeleteBroadcast(user_token)}>
          放送削除
        </button>
      </div>
    </div>
  );
};
