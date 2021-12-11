import type { VFC } from "react";
import { Label } from "src/components/styled";
import { styled } from "src/utils";
import type { ConnectUser } from "type";

type Props = {
  currentUserId: string;
  data: ConnectUser[];
};

export const HeeList: VFC<Props> = (props) => {
  const result = props.data.filter((user) => props.currentUserId === user.id)[0];
  return (
    <Root>
      <HeeListContainer key={result?.id}>
        <UserInfo>
          <img className="rounded-full" src="/wow.jpg" width={35} height={35} alt="ユーザーネーム" />
          <UserName>{result?.name}</UserName>
        </UserInfo>
        <Label isOutline="slate" isGhost="slate">
          <span>{result?.heeCount}</span>へぇ
        </Label>
      </HeeListContainer>

      {props.data.map((item) => {
        if (item.isAdmin || item.id === props.currentUserId) return null;
        return (
          <HeeListContainer key={item.id}>
            <UserInfo>
              <img className="rounded-full" src="/wow.jpg" width={35} height={35} alt="ユーザーネーム" />
              <UserName>{item.name}</UserName>
            </UserInfo>

            <Label isOutline="slate" isGhost="slate">
              <span>{item.heeCount}</span>へぇ
            </Label>
          </HeeListContainer>
        );
      })}
      <Spacer />
    </Root>
  );
};

const Root = styled("div", {
  width: "250px",
});

const HeeListContainer = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",

  "&:not(:first-child)": {
    paddingTop: "0.75rem",
  },

  "&:not(:last-child)": {
    paddingBottom: "0.75rem",
    borderBottom: "1px solid $slate6",
  },
});

const UserInfo = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
});

const UserName = styled("p", {
  marginLeft: "1rem",
  fontSize: "0.8rem",
  fontWeight: 500,
  color: "$slate12",
});

const Spacer = styled("div", {
  height: "10rem",
});
