import { Layout } from "src/components/Layout";
import { OnAirList } from "src/components/OnAirLIst";
import { styled } from "src/utils";

const BroadcastList = () => {
  return (
    <Layout>
      <Title>
        <H1>放送一覧</H1>
      </Title>
      <OnAirList />
    </Layout>
  );
};

// eslint-disable-next-line import/no-default-export
export default BroadcastList;

const Title = styled("div", {
  paddingTop: "106px",
  marginBottom: "20px",
  display: "flex",
  justifyContent: "center",
});
const H1 = styled("h1", {
  fontSize: "30px",
  fontWeight: "600",
  width: "704px",
});
