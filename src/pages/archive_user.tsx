import { BroadcastHeader } from "src/components/BroadcastHeader";
import { Layout } from "src/components/Layout";
import { Result } from "src/components/Result";
import { styled } from "src/utils";

const Archive = () => {
  const Items = ["1", "2", "3"];

  return (
    <>
      <Layout>
        <Container>
          <BroadcastHeader />
          <iframe
            width="100%"
            height="450"
            src="https://www.youtube.com/embed/OWoKzNxZWw8"
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
          ></iframe>

          {Items.map((id) => {
            return <Result key={id} />;
          })}
        </Container>
      </Layout>
    </>
  );
};

const Container = styled("div", {
  marginX: "auto",
  width: "50%",
  textAlign: "center",
});

// eslint-disable-next-line import/no-default-export
export default Archive;
