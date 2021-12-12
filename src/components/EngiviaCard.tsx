import type { VFC } from "react";
import { styled } from "src/utils";

type Props = {
  id?: number;
  name?: string;
  image?: string;
  content: string;
  isResult?: true;
  heeCount?: number | null;
  engiviaNumber?: number;
};

export const EngiviaCard: VFC<Props> = (props) => {
  return (
    <Root>
      {props.id === 0 ? (
        "次のエンジビアをお待ちください"
      ) : (
        <>
          {props.isResult ? <EngiviaNumber>エンジビア{props.engiviaNumber}</EngiviaNumber> : null}
          <EngiviaContent>{props.content}</EngiviaContent>
          <Content>
            <UserInfoWrap>
              <Icon>{props.image ? <Image src={props.image} alt="userIcon" /> : null}</Icon>
              <UserName>{props.name}</UserName>
            </UserInfoWrap>
            {props.isResult ? (
              <HeeWrap>
                <HeeCount>{props.heeCount}</HeeCount>へぇ
              </HeeWrap>
            ) : null}
          </Content>
        </>
      )}
    </Root>
  );
};

const Root = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "1rem",

  paddingY: "1.5rem",
  paddingX: "2rem",
  width: 700,

  borderRadius: 10,
  backgroundColor: "$slate2",
  boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06)",
});

const EngiviaNumber = styled("p", {
  textAlign: "center",
  fontWeight: "bold",
  fontSize: "1.5rem",

  color: "$primary9",
});

const EngiviaContent = styled("h3", {
  fontWeight: 500,
  fontSize: "2rem",
  lineHeight: "2.5rem",

  color: "$slate12",
});

const Content = styled("div", {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "end",
  gap: "0.5rem",
});

const Icon = styled("div", {
  width: "3rem",
  height: "3rem",
  borderRadius: "9999px",
  background: "$primary9",
});

const Image = styled("img", {
  width: "3rem",
  height: "3rem",
  borderRadius: "9999px",
});

const UserName = styled("span", {
  fontWeight: 500,
  fontSize: "1rem",
  color: "$slate11",
});

const UserInfoWrap = styled("div", {
  display: "flex",
  alignItems: "center",
  gap: "0.75rem",
});

const HeeWrap = styled("span", {
  paddingY: "0.75rem",
  paddingX: "2rem",

  textAlign: "center",
  fontWeight: "bold",
  fontSize: "1.5rem",

  borderRadius: 10,
  color: "$primary9",
  backgroundColor: "$slate5",
});

const HeeCount = styled("span", {
  fontSize: "2rem",
});
