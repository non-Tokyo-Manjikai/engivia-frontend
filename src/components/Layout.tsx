import type { FC } from "react";
import { styled } from "src/utils";
import { Header } from "src/components/Header";
// import { Header } from "src/components/Header";

export const Layout: FC = (props) => {
  return (
    <div>
      <Div>
        <Header />
      </Div>
      {props.children}
    </div>
  );
};

const Div = styled("div", {
  position: "fixed",
  width: "100%",
  minHeight: "100%",
  zIndex: "2",
});
