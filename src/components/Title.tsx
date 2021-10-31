import { BroadcastStatus } from "src/components/BroadcastStatus";
import { styled } from "src/utils";

export const EngibeerTitle = (props: any) => {
	return (
		<>
			<Div>
				{props.type === "before" ? <BroadcastStatus color="orange">放送前・エンジビア募集中</BroadcastStatus> : null}
				{props.type === "now" ? <BroadcastStatus color="green">放送中</BroadcastStatus> : null}
				{props.type === "after" ? <BroadcastStatus color="gray">放送済み</BroadcastStatus> : null}
			</Div>

			<H1>第{props.id}回エンビジアの泉</H1>
		</>
	);
};

export const H1 = styled("h1", {
	fontSize: "30px",
	fontWeight: "600",
});

export const Div = styled("div", {
	paddingTop: "106px",
	marginBottom: "16px",
});
