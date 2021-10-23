import { styled } from "@stitches/react";
import Image from "next/image";
import { StitchesButton } from "src/components/sample";

export const HehList = () => {
  const handleClick = () => {
    console.info("click!!");
  };
  return (
    <HehListsContainer>
      <HehListContainer>
        <HehUser>
          <Image className="rounded-full" src="/wow.jpg" width="40px" height="40px" alt="ユーザーネーム" />
          <UserName>ファンキー加藤</UserName>
        </HehUser>
        <StitchesButton isOutline="slate" isGhost="slate" onClick={handleClick}>
          18へぇ
        </StitchesButton>
      </HehListContainer>

      <HehListContainer>
        <HehUser>
          <Image className="rounded-full" src="/wow.jpg" width="40px" height="40px" alt="ユーザーネーム" />
          <UserName>ファンキー加藤</UserName>
        </HehUser>
        <StitchesButton isOutline="slate" isGhost="slate" onClick={handleClick}>
          18へぇ
        </StitchesButton>
      </HehListContainer>

      <HehListContainer>
        <HehUser>
          <Image className="rounded-full" src="/wow.jpg" width="40px" height="40px" alt="ユーザーネーム" />
          <UserName>ファンキー加藤</UserName>
        </HehUser>
        <StitchesButton isOutline="slate" isGhost="slate" onClick={handleClick}>
          18へぇ
        </StitchesButton>
      </HehListContainer>

      <HehListContainer>
        <HehUser>
          <Image className="rounded-full" src="/wow.jpg" width="40px" height="40px" alt="ユーザーネーム" />
          <UserName>ファンキー加藤</UserName>
        </HehUser>
        <StitchesButton isOutline="slate" isGhost="slate" onClick={handleClick}>
          18へぇ
        </StitchesButton>
      </HehListContainer>
    </HehListsContainer>
  );
};

const HehListsContainer = styled("div", {
  width: "350px",
});

const HehListContainer = styled("div", {
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

const HehUser = styled("div", {
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

export default HehList;
