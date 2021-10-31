import Image from "next/image";
import { styled } from "src/utils";

export const Result = () => {
	return (
		<Card>
			<Title>エンジビア１</Title>
			<Content>HTMLにはポータルという便利な要素がある</Content>
			<Footer>
				<Person>
					<Image src="/superhero.svg" width={40} height={40} alt="superhero" />
					<Name>松平 ケン</Name>
				</Person>
				<Hee>８５へぇ</Hee>
			</Footer>
		</Card>
	);
};

const Card = styled("div", {
	backgroundColor: "white",
	borderRadius: "5px",
	padding: "32px",
	margin: "10px auto",
	textAlign: "center",
	boxShadow: "0 2px 2px  gray",
});

const Title = styled("div", {
	color: "#59ADC8",
	fontWeight: "bold",
	fontSize: "1.2rem",
	padding: "10px 0",
});

const Content = styled("div", {
	fontWeight: "500",
	fontSize: "2rem",
	padding: "10px 0",
	textAlign: "left",
});

const Footer = styled("div", {
	display: "flex",
	justifyContent: "space-between",
});

const Person = styled("div", {
	display: "flex",
	flexDirection: "row",
});

const Name = styled("p", {
	padding: "20px",
	margin: "auto",
});

const Hee = styled("p", {
	borderRadius: "5px",
	color: "#59ADC8",
	fontWeight: "bold",
	fontSize: "1.5rem",
	padding: "15px",
	margin: "10px",
	textAlign: "center",
	backgroundColor: "#fef5e0",
});
