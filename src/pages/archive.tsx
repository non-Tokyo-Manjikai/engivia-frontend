import { Button } from "src/components/Button";
import { BroadcastHeader } from "src/components/BroadcastHeader";
import { Input } from "src/components/Input";
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

          <URL>
            <Input placeholder="URLを入力" />
            <div>
              <Button color="blue">保存する</Button>
            </div>
          </URL>

          {Items.map((id) => {
            return <Result key={id} />;
          })}
        </Container>
      </Layout>
    </>
  );
};

const URL = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "0.75rem",
  marginY: "0.75rem",
});

const Container = styled("div", {
  marginX: "auto",
  width: "50%",
  textAlign: "center",
});

// eslint-disable-next-line import/no-default-export
export default Archive;
