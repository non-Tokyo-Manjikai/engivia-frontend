import type { VFC } from "react";
import { memo,useMemo } from "react";
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

  if (!resultTrivia) return <div></div>;

  return (
    <Container>
      <p>{resultTrivia.content}</p>
      <UserCard>
        <User>
          <ImageContainer>
            <img src={resultTrivia.User.image} width={40} height={40} alt="superhero" />
          </ImageContainer>
          <Name>{resultTrivia.User.name}</Name>
        </User>
        {resultTrivia.featured ? <div>{resultTrivia.hee}</div> : null}
      </UserCard>
    </Container>
  );
});

const Container = styled("div", {
  display: "flex",
  justifyContent: "center",
  padding: "20px",
  margin: "15px 0",
  background: "white",
  borderRadius: "10px",
  boxShadow: "0px 2px 2px gray",
  flexDirection: "column",
  gap: "14px",
  fontSize: "15px",
  userSelect: "none",
});

const UserCard = styled("div", {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

const ImageContainer = styled("div", {
  width: "2rem",
  height: "2rem",
  borderRadius: "9999px",
  display: "flex",
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
