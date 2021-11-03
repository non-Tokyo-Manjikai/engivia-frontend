import type { NextPage } from "next";
import { BroadcastHeader } from "src/components/BroadcastHeader";
import { Button } from "src/components/Button";
import { Multicontainers } from "src/components/Multicontainers";
import { styled } from "src/utils";

const LiveAutherPage: NextPage = () => {
	const status: "upcoming" | "live" | "ended" = "live";

	return (
		<Container>
			<Top>
				<Title>
					<BroadcastHeader title="第1回エンジビアの泉" status={status} />
				</Title>
				<ButtonWrap>
					{status === "upcoming" ? (
						<UpcommingButtonWrap>
							<Button color="quaternary">放送を開始する</Button>
							<Button color="secondary">編集する</Button>
						</UpcommingButtonWrap>
					) : (
						<Button color="secondary">放送を終了する</Button>
					)}
				</ButtonWrap>
			</Top>

			<Multicontainers status={status} />
		</Container>
	);
};

// eslint-disable-next-line import/no-default-export
export default LiveAutherPage;

const Top = styled("div", {
	display: "grid",
	gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
	justifyContent: "center",
	padding: "10px",
	marginY: "20px",
});

const Container = styled("div", {
	margin: "auto",
	width: "130vh",
	userSelect: "none",
});

const Title = styled("div", {
	gridColumnStart: 2,
	gridColumnEnd: 3,
});

const ButtonWrap = styled("div", {
	gridColumnStart: 3,
	gridColumnEnd: 4,
	display: "inline-block",
	alignSelf: "center",
	justifySelf: "end",
});

const UpcommingButtonWrap = styled("div", {
	display: "flex",
	gap: "10px",
});
