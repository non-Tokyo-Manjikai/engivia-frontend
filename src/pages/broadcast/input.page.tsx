import type { NextPage } from "next";
import { Button } from "src/components/Button";
import { Input } from "src/components/Input";
import { PageRoot } from "src/components/PageRoot";
import { Title } from "src/components/Title";
import { styled } from "src/utils";

const BroadcastInputPage: NextPage = () => {
	return (
		<PageRoot>
			<Title>放送を作成</Title>
			<Input type="text" placeholder="タイトルを入力する" />
			<Input type="date" placeholder="2021/09/03" />
			<ButtonWrap>
				<Button color="primary">保存する</Button>
				<Button color="secondary">キャンセル</Button>
			</ButtonWrap>
		</PageRoot>
	);
};

// eslint-disable-next-line import/no-default-export
export default BroadcastInputPage;

const ButtonWrap = styled("div", {
	display: "flex",
	justifyContent: "center",
	gap: "2rem",
});
