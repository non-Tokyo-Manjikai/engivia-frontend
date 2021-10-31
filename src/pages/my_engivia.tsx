import type { NextPage } from "next";
import { BroadcastHeader } from "src/components/BroadcastHeader";
import { Button } from "src/components/Button";
import { EngiviaCard } from "src/components/EngiviaCard";
import { styled } from "src/utils";

const MyEngiviaPage: NextPage = () => {
	return (
		<Wrap>
			<BroadcastHeader status="ended" title="第1回エンジビアの泉" />

			<EngiviaCard content="ユーザー１が放送１に投稿したトリビアの内容" name="テストユーザー１" />

			<ButtonWrap>
				<Button color="primary">編集する</Button>
				<Button color="secondary">削除する</Button>
			</ButtonWrap>
		</Wrap>
	);
};

// eslint-disable-next-line import/no-default-export
export default MyEngiviaPage;

const Wrap = styled("div", {
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	gap: "2rem",
});

const ButtonWrap = styled("div", {
	display: "flex",
	justifyContent: "center",
	gap: "2rem",
});
