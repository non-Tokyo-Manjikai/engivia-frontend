/* eslint-disable import/no-default-export */
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useRecoilState } from "recoil";
import { userInfoState } from "src/components/atoms";
import { InputFile } from "src/components/InputFile";
import { Button, Input, PageRoot, Title } from "src/components/styled";
import { requestFetcher } from "src/functions/requestFetcher";
import { styled } from "src/utils";

const ProfileEditPage = () => {
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const [text, setText] = useState("");
  const [image, setImage] = useState("");
  const [buttonDisabledState, setButtonDisabledState] = useState(false);

  useEffect(() => {
    if (userInfo) {
      setText(userInfo.name);
      setImage(userInfo.image);
    }
  }, [userInfo]);

  const handleText = (e: any) => {
    setText(e.target.value);
  };

  // イメージデータを変換する
  const handleToBase64Url = (url: string, callback: any) => {
    setButtonDisabledState(true);
    if (text === userInfo.name && image === userInfo.image) {
      toast.error("変更点がありません");
      setButtonDisabledState(false);
      return;
    }
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      const reader = new FileReader();
      reader.onloadend = function () {
        callback(reader.result);
      };
      reader.readAsDataURL(xhr.response);
    };
    xhr.open("GET", url);
    xhr.responseType = "blob";
    xhr.send();

    return xhr.responseURL;
  };

  // ユーザー情報を更新する
  const handleSendUrl = async (xhr: string) => {
    if (!text || !/\S/g.test(text)) {
      toast.error("名前を入力してください");
      setButtonDisabledState(false);
      return;
    }
    if (!image) {
      toast.error("画像を選択してください");
      setButtonDisabledState(false);
      return;
    }

    const PutBody = {
      name: text,
      base64Image: xhr.replace(/data:image\/png;base64,|data:image\/jpeg;base64,/, ""),
    };
    const { statusCode } = await requestFetcher("/user", PutBody, "PUT", userInfo.token);

    if (statusCode >= 400) {
      toast.error("保存できませんでした");
      setButtonDisabledState(false);
      return;
    }

    setUserInfo({
      ...userInfo,
      name: text,
      image: `${xhr}`,
    });
    setButtonDisabledState(false);
    toast.success("保存しました");
  };

  return (
    <>
      <PageRoot>
        <Root>
          <Title>プロフィールを編集する</Title>
        </Root>
        <InputFile name="プロフィール画像" defaultValue={image} value={image} setValue={setImage} />
        <Input width="small" type="text" value={text} onChange={handleText} />
        {/* eslint-disable-next-line react/jsx-handler-names */}
        <Button
          color="primary"
          disabled={buttonDisabledState}
          onClick={() => handleToBase64Url(image, (xhr: string) => handleSendUrl(xhr))}
        >
          保存
        </Button>
        <Toaster />
      </PageRoot>
    </>
  );
};

const Root = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginY: "20px",
  textAlign: "center",
});

export default ProfileEditPage;
