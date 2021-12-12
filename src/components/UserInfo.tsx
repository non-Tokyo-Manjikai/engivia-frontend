/* eslint-disable react/jsx-handler-names */
import { violet } from "@radix-ui/colors";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { useRecoilValue } from "recoil";
import { userInfoState } from "src/components/atoms";
import { Button } from "src/components/styled";
import { styled } from "src/utils";

export const UserInfo = () => {
  const userInfo = useRecoilValue(userInfoState);
  const router = useRouter();

  const handleToggleEdit = useCallback(() => {
    router.push("/profileEdit");
  }, [router]);

  return (
    <>
      <EditArea>
        <Button color="verySmallerPrimary" onClick={handleToggleEdit}>
          編集
        </Button>
      </EditArea>

      <Person>
        <Image className="rounded-full" src={userInfo.image} alt="userIcon" />
        <NameArea>
          <Nombre>{userInfo.name}</Nombre>
        </NameArea>
      </Person>
    </>
  );
};

const Image = styled("img", {
  width: "6rem",
  height: "6rem",
  borderRadius: "9999px",
});
const Person = styled("div", {
  margin: "auto",
  width: "100%",
  height: "90%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",

  gap: "10px",

  backgroundColor: "white",
  borderRadius: "50px",
});

const NameArea = styled("div", {
  all: "unset",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "90%",
});

const Nombre = styled("p", {
  width: "100%",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  fontSize: 18,
  fontWeight: 600,
  color: violet.violet11,
});

const EditArea = styled("div", {
  height: "15%",
  alignItems: "center",
  display: "flex",
  justifyContent: "right",
});
