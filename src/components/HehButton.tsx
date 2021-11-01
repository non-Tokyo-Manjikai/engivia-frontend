import { styled } from "src/utils";

export const HehButton = () => {
  const HehBottom = styled("div", {
    position: "absolute",
    top: "50px",
    left: "45px",
    transform: "rotateX( -50deg ) ",
    backgroundColor: "$blue10",
    width: "270px",
    height: "170px",
    borderRadius: "100%",
    zIndex: "3",
  });

  const HehShadow = styled("div", {
    position: "absolute",
    top: "90px",
    left: "45px",
    backgroundColor: "$blue10",
    width: "270px",
    height: "45px",
    zIndex: "3",
  });

  const Heh = styled("button", {
    position: "absolute",
    top: "5px",
    left: "45px",
    transform: "rotateX( -50deg )",
    backgroundColor: "$blue8",
    width: "270px",
    height: "170px",
    borderRadius: "100%",
    textAlign: "center",
    paddingBottom: "15px",
    fontSize: "4rem",
    color: "white",
    fontWeight: "bold",
    zIndex: "6",
  });

  const HehButton = styled("div", {
    "&:active": {
      [`& ${HehShadow}`]: {
        height: "15px",
        top: "80px",
        transform: "translateY(40px)",
      },
      [`& ${Heh}`]: {
        transform: "translateY(30px) rotateX( -50deg )",
      },
    },
  });

  const Foundation = styled("div", {
    position: "absolute",
    left: "15px",
    top: "75px",
    transform: "rotateX( -30deg )",
    backgroundColor: "$slate5",
    width: "330px",
    height: "170px",
    borderRadius: "100%",
    zIndex: "2",
  });

  const FoundationBottom = styled("div", {
    position: "absolute",
    left: "15px",
    top: "100px",
    transform: "rotateX( -40deg )",
    backgroundColor: "$slate8",
    width: "330px",
    height: "170px",
    borderRadius: "100%",
    zIndex: "1",
  });

  const FoundationShadow = styled("div", {
    position: "absolute",
    left: "15px",
    top: "160px",
    transform: "rotateX( -30deg ) ",
    backgroundColor: "$slate8",
    width: "330px",
    height: "25px",
    zIndex: "1",
  });

  const HehButtonWrap = styled("div", {
    position: "relative",
    height: "280px",
    width: "360px",
  });

  return (
    <>
      <HehButtonWrap>
        <HehButton>
          <Heh>へぇ</Heh>
          <HehShadow />
        </HehButton>
        <HehBottom />
        <Foundation />
        <FoundationShadow />
        <FoundationBottom />
      </HehButtonWrap>
    </>
  );
};
