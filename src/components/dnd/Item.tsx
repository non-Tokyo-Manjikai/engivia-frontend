import type { VFC } from "react";
import { memo, useMemo } from "react";
import { useRecoilValue } from "recoil";
import { broadcastLiveState } from "src/components/atoms";
import { styled } from "src/utils";

type Props = {
  id: number;
};

export const Item: VFC<Props> = memo((props) => {
  const broadcast = useRecoilValue(broadcastLiveState);

  const resultTrivia = useMemo(() => {
    return broadcast?.Trivia.filter((items) => {
      return items.id === props.id;
    })[0];
  }, [broadcast]);

  if (!resultTrivia) return null;
  return (
    <Container>
      <p>{resultTrivia.content}</p>
      <UserCard>
        <User>
          <Icon>{resultTrivia.User.image ? <Image src={resultTrivia.User.image} alt="superhero" /> : null}</Icon>
          <Name>{resultTrivia.User.name}</Name>
        </User>
        {resultTrivia.featured ? <div>{resultTrivia.hee}</div> : null}
      </UserCard>
    </Container>
  );
});

const Container = styled("div", {
  userSelect: "none",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  gap: "14px",

  padding: "20px",
  margin: "15px 0",
  background: "$slate1",
  borderRadius: "10px",
  boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06)",

  fontSize: "15px",
});

const UserCard = styled("div", {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});


const Icon = styled("div", {
  width: "2rem",
  height: "2rem",
  borderRadius: "9999px",
  backgroundColor: "$primary10",
});

const Image = styled("img", {
  width: "2rem",
  height: "2rem",
  borderRadius: "9999px",
});

const User = styled("div", {
  display: "flex",
  alignItems: "center",
});

const Name = styled("div", {
  paddingX: "1rem",

  fontSize: "0.75rem",
  lineHeight: "1rem",
});

const Img = styled("img", {
  borderRadius: 9999,
});
