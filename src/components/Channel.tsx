import Image from "next/image";
import { styled } from "src/utils";

const Card = styled("div", {
	backgroundColor: "white",
	borderRadius: "5px",
	width: "100%",
	paddingLeft: "20px",
	marginTop: "15px",
	textAlign: "center",
});

const Content = styled("div", {
	paddingTop: "10px",
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
	padding: "10px",
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

export const Channel = () => {
	return (
			<Card>
				<Content>HTMLにはポータルという便利な要素がある</Content>
				<Footer>
					<Person>
						<Image src="/superhero.svg" width={25} height={30} alt="superhero" />
						<Name>松平 ケン</Name>
					</Person>
				</Footer>
			</Card>
	);
};
