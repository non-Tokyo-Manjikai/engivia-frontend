import Image from "next/image";
import type { VFC } from "react";
import { memo } from "react";
import type { TriviaType } from "src/types";
import { styled } from "src/utils";

type Props = {
	id: number;
	triviaList: TriviaType[];
};

export const Item: VFC<Props> = memo((props) => {
	const resultUser = props.triviaList.filter((items) => {
		return items.id === props.id;
	})[0];

	return (
		<Container>
			<p>{resultUser.content}</p>
			<UserCard>
				<User>
					<ImageContainer>
						<Image src={resultUser.User.image} width={40} height={40} alt="superhero" />
					</ImageContainer>
					<Name>{resultUser.User.name}</Name>
				</User>
				{resultUser.featured ? <div>８７へぇ</div> : null}
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
