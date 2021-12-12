/* eslint-disable import/no-default-export */
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useRecoilState } from "recoil";
import { userInfoState } from "src/components/atoms";
import { Button, Input, PageRoot, Title } from "src/components/styled";
import { requestFetcher } from "src/functions/requestFetcher";
import { styled } from "src/utils";

const ProfileEditPage = () => {
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const [text, setText] = useState("");

  useEffect(() => {
    if (userInfo) {
      setText(userInfo.name);
    }
  }, [userInfo]);

  const handleSaveUserName = async () => {
    const body = {
      name: text,
    };
    const statusCode = await requestFetcher("/user", body, "PUT", userInfo.token);
    if (statusCode >= 400) {
      toast.error("保存に失敗しました");
      return;
    }
    setUserInfo({ ...userInfo, name: text });
    toast.success("保存しました");
  };

  const handleText = (e: any) => {
    setText(e.target.value);
  };

  return (
    <>
      <PageRoot>
        <Root>
          <Title>プロフィールを編集する</Title>
        </Root>

        <Image className="rounded-full" src={userInfo?.image} alt="userIcon" />
        <Input width="small" type="text" value={text} onChange={handleText} />
        <Button color="primary" onClick={handleSaveUserName}>
          保存
        </Button>
        <Toaster />
      </PageRoot>
    </>
  );
};

const Image = styled("img", {
  width: "300px",
  height: "300px",
  marginY: "20px",
  borderRadius: "9999px",
});

const Root = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginY: "20px",
  textAlign: "center",
});

export default ProfileEditPage;
