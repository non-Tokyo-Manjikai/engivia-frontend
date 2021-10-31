import type { NextPage } from "next";
import { BroadcastHeader } from "src/components/BroadcastHeader";
import { Button } from "src/components/Button";
import { Textarea } from "src/components/Textarea";
import { styled } from "src/utils";

const EngiviaInputPage: NextPage = () => {
	return (
		<Wrap>
			<BroadcastHeader status="live" title="第1回エンジビアの泉" />

			<TextAreaWrap>
				<Textarea placeholder="エンビジアを入力する" />
			</TextAreaWrap>

			<Button color="primary">保存する</Button>
		</Wrap>
	);
};

// eslint-disable-next-line import/no-default-export
export default EngiviaInputPage;

const Wrap = styled("div", {
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	gap: "2rem",
});

const TextAreaWrap = styled("div", {
	display: "flex",
	justifyContent: "center",
	gap: "1rem",
});
