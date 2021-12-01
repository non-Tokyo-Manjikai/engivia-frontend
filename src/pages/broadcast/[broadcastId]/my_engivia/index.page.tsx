import type { NextPage } from "next";
import { BroadcastHeader, EngiviaCard } from "src/components";
import { Button, PageRoot } from "src/components/styled";
import { styled } from "src/utils";

const MyEngiviaPage: NextPage = () => {
  return (
    <PageRoot>
      <BroadcastHeader status="ended" title="第1回エンジビアの泉" />
      <EngiviaCard content="ユーザー１が放送１に投稿したトリビアの内容" name="テストユーザー１" />
      <ButtonWrap>
        <Button color="primary">編集する</Button>
        <Button color="secondary">削除する</Button>
      </ButtonWrap>
    </PageRoot>
  );
};

// eslint-disable-next-line import/no-default-export
export default MyEngiviaPage;

const ButtonWrap = styled("div", {
  display: "flex",
  justifyContent: "center",
  gap: "2rem",
});
