import Image from "next/image";
import type { VFC } from "react";
import { Label } from "src/components/Label";
import { styled } from "src/utils";

type Props = {
	data: {
		id: string;
		name: string;
		image: string;
		count: number;
	}[];
};

export const HeeList: VFC<Props> = (props) => {
	return (
		<Root>
			{props.data.map((item) => (
				<HeeListContainer key={item.id}>
					<UserInfo>
						<Image className="rounded-full" src="/wow.jpg" width={35} height={35} alt="ユーザーネーム" />
						<UserName>{item.name}</UserName>
					</UserInfo>

					<Label isOutline="slate" isGhost="slate">
						<span>{item.count}</span>へぇ
					</Label>
				</HeeListContainer>
			))}
			<Spacer />
		</Root>
	);
};

const Root = styled("div", {
	width: "250px",
});

const HeeListContainer = styled("div", {
	display: "flex",
	alignItems: "center",
	justifyContent: "space-between",

	"&:not(:first-child)": {
		paddingTop: "0.75rem",
	},

	"&:not(:last-child)": {
		paddingBottom: "0.75rem",
		borderBottom: "1px solid $slate6",
	},
});

const UserInfo = styled("div", {
	display: "flex",
	alignItems: "center",
	justifyContent: "flex-start",
});

const UserName = styled("p", {
	marginLeft: "1rem",
	fontSize: "0.8rem",
	fontWeight: 500,
	color: "$slate12",
});

const Spacer = styled("div", {
	height: "10rem",
});
