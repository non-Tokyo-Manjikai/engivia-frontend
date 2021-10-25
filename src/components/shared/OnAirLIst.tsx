import { styled } from "src/utils";

const Outline = styled("ul", {
  backgroundColor: "#C7D0D3",
  width: "70%",
  padding: "10px 0",
  margin: "0 auto",
});

const Card = styled("li", {
  backgroundColor: "white",
  width: "90%",
  padding: "20px",
  margin: "3px auto",
  textAlign: "center",
  cursor: "pointer",
  "&:hover": { boxShadow: `0 0 0 2px darkgray` },
  "&:first-child": { borderRadius: `10px 10px 0px 0px` },
  "&:last-child": { borderRadius: `0px 0px 10px 10px` },
});

const Upper = styled("div", {
  display: "flex",
  justifyContent: "space-between",
});

const Title = styled("div", {
  color: "#59ADC8",
  fontWeight: "bold",
  fontSize: "1.2rem",
  padding: "10px 0",
});

const Air = styled("p", {
  borderRadius: "50px",
  fontSize: "1.0rem",
  padding: "4px 12px",
  margin: "10px",
  textAlign: "center",

  variants: {
    color: {
      on: {
        backgroundColor: "lightgreen",
        color: "green",
      },
      off: {
        backgroundColor: "#D7DBDF",
        color: "gray",
      },
    },
  },
});

const Lower = styled("div", {
  display: "flex",
  justifyContent: "space-between",
});

const Div = styled("div", {
  display: "flex",
});

const Date = styled("div", {
  color: "#677075",
  fontSize: "1.3rem",
  padding: "0 0 0 3px",
  textAlign: "left",
});

const Number = styled("p", {
  fontSize: "1.2rem",
  color: "#677075",
  padding: "2px 0 0 0",
});

const Icon = styled("svg", {
  color: "#677075",
  height: "1.5rem",
  weight: "1.25rem",
  marginTop: "0.2rem",
  marginRight: "0.25rem",
});

const OnAirList = () => {
  return (
    <Outline>
      <Card>
        <Upper>
          <Title>第１回エンジビアの泉</Title>
          <Air color="on">放送中</Air>
        </Upper>
        <Lower>
          <Div>
            <Icon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path
                fill-rule="evenodd"
                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                clip-rule="evenodd"
              />
            </Icon>
            <Date>2021年5月24日</Date>
          </Div>
          <Div>
            <Icon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
            </Icon>
            <Number>エンジビア数10</Number>
          </Div>
        </Lower>
      </Card>
      <Card>
        <Upper>
          <Title>第１回エンジビアの泉</Title>
          <Air color="off">放送済み</Air>
        </Upper>
        <Lower>
          <div className="flex">
            <Icon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path
                fill-rule="evenodd"
                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                clip-rule="evenodd"
              />
            </Icon>
            <Date>2021年5月24日</Date>
          </div>
          <div className="flex">
            <Icon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
            </Icon>
            <Number>エンジビア数10</Number>
          </div>
        </Lower>
      </Card>
      <Card>
        <Upper>
          <Title>第１回エンジビアの泉</Title>
          <Air color="off">放送済み</Air>
        </Upper>
        <Lower>
          <div className="flex">
            <Icon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path
                fill-rule="evenodd"
                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                clip-rule="evenodd"
              />
            </Icon>
            <Date>2021年5月24日</Date>
          </div>
          <div className="flex">
            <Icon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
            </Icon>
            <Number>エンジビア数10</Number>
          </div>
        </Lower>
      </Card>
      <Card>
        <Upper>
          <Title>第１回エンジビアの泉</Title>
          <Air color="off">放送済み</Air>
        </Upper>
        <Lower>
          <div className="flex">
            <Icon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path
                fill-rule="evenodd"
                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                clip-rule="evenodd"
              />
            </Icon>
            <Date>2021年5月24日</Date>
          </div>
          <div className="flex">
            <Icon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
            </Icon>
            <Number>エンジビア数10</Number>
          </div>
        </Lower>
      </Card>
    </Outline>
  );
};

export default OnAirList;
