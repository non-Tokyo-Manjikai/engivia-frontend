import type { NextPage } from "next";
import { BroadcastHeader } from "src/components/BroadcastHeader";
import { Button } from "src/components/Button";
import { Textarea } from "src/components/Textarea";
import { styled } from "src/utils";

const EngiviaEditPage: NextPage = () => {
	return (
		<Wrap>
			<BroadcastHeader status="live" title="第1回エンジビアの泉" />

			<TextAreaWrap>
				<Textarea placeholder="エンビジアを入力する" />
			</TextAreaWrap>

			<ButtonWrap>
				<Button color="primary">する</Button>
				<Button color="secondary">削除する</Button>
			</ButtonWrap>
		</Wrap>
	);
};

// eslint-disable-next-line import/no-default-export
export default EngiviaEditPage;

const Wrap = styled("div", {
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	gap: "2rem",
});

const TextAreaWrap = styled("div", {
	display: "block",
	textAlign: "center",
	marginX: "auto",
});

const ButtonWrap = styled("div", {
	display: "flex",
	justifyContent: "center",
	gap: "2rem",
});
