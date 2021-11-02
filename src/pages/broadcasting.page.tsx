import type { NextPage } from "next";
import { BroadcastHeader } from "src/components/BroadcastHeader";
import { EngiviaCard } from "src/components/EngiviaCard";
import { HeeList } from "src/components/HeeList";
import { PageRoot } from "src/components/PageRoot";
import { styled } from "src/utils";

const EngiviaEditPage: NextPage = () => {
  return (
    <PageRoot>
      <Wrapper>
        <ListWrapper>
          <HeeList />
        </ListWrapper>
        <Main>
          <BroadcastHeader status="live" title="第1回エンジビアの泉" />
          <EngiviaCardWrap>
            <EngiviaCard
              content="ああああああああああああああああああああああああああああああああああああああああああああ"
              name="よりまる"
            />
          </EngiviaCardWrap>
        </Main>
      </Wrapper>
    </PageRoot>
  );
};

// eslint-disable-next-line import/no-default-export
export default EngiviaEditPage;

const Wrapper = styled("div", {
  display: "flex",
  justifyContent: "center",
  position: "relative",
});

const Main = styled("div", {
  flex: "auto",
});

const ListWrapper = styled("aside", {
  width: "300px",
  display: "flex",
  justifyContent: "flex-end",
  position: "fixed",
  right: 0,
  top: 65,
});

const EngiviaCardWrap = styled("aside", {
  display: "flex",
  justifyContent: "center",
});
