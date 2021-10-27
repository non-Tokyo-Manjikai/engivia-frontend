import { styled } from "@stitches/react";
import Image from "next/image";
import { Label } from "src/components/Label";

export const HeeList = () => {
  return (
    <HeeListsContainer>
      <HeeListContainer>
        <HeeUser>
          <Image className="rounded-full" src="/wow.jpg" width="40px" height="40px" alt="ユーザーネーム" />
          <UserName>ファンキー加藤</UserName>
        </HeeUser>
        <Label isOutline="slate" isGhost="slate">
          18へぇ
        </Label>
      </HeeListContainer>
      <HeeListContainer>
        <HeeUser>
          <Image className="rounded-full" src="/wow.jpg" width="40px" height="40px" alt="ユーザーネーム" />
          <UserName>ファンキー加藤</UserName>
        </HeeUser>
        <Label isOutline="slate" isGhost="slate">
          18へぇ
        </Label>
      </HeeListContainer>
      <HeeListContainer>
        <HeeUser>
          <Image className="rounded-full" src="/wow.jpg" width="40px" height="40px" alt="ユーザーネーム" />
          <UserName>ファンキー加藤</UserName>
        </HeeUser>
        <Label isOutline="slate" isGhost="slate">
          18へぇ
        </Label>
      </HeeListContainer>
      <HeeListContainer>
        <HeeUser>
          <Image className="rounded-full" src="/wow.jpg" width="40px" height="40px" alt="ユーザーネーム" />
          <UserName>ファンキー加藤</UserName>
        </HeeUser>
        <Label isOutline="slate" isGhost="slate">
          18へぇ
        </Label>
      </HeeListContainer>
    </HeeListsContainer>
  );
};

const HeeListsContainer = styled("div", {
  width: "350px",
});

const HeeListContainer = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",

  "&:not(:first-child)": {
    paddingTop: "25px",
  },

  "&:not(:last-child)": {
    borderBottom: "1px solid #E5E7EB",
    paddingBottom: "25px",
  },
});

const HeeUser = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
});

const UserName = styled("p", {
  color: "#111827",
  marginLeft: "16px",
  fontSize: "14px",
  fontWeight: "500",
});
