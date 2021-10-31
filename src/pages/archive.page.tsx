import type { NextPage } from "next";
import { BroadcastHeader } from "src/components/BroadcastHeader";
import { Button } from "src/components/Button";
import { EngiviaCard } from "src/components/EngiviaCard";
import { Input } from "src/components/Input";
import { PageRoot } from "src/components/PageRoot";
import { styled } from "src/utils";

const isArchive = true;
const isAdmnin = true;

const ArchivePage: NextPage = () => {
	return (
		<PageRoot>
			<BroadcastHeader status="live" title="第1回エンジビアの泉" />

			{isArchive ? (
				<Iframe
					src="https://www.youtube.com/embed/OWoKzNxZWw8"
					frameBorder="0"
					allow="autoplay; encrypted-media"
					allowFullScreen
				/>
			) : null}

			{isAdmnin ? (
				<>
					<Input type="text" placeholder="URLを入力" />
					<Button color="primary">保存する</Button>
				</>
			) : null}

			{DATA.Trivia.map((item, index) => (
				<EngiviaCard
					key={item.id}
					content={item.content}
					name={item.User.name}
					isResult
					hee={item.hee}
					engiviaNumber={index + 1}
				/>
			))}
		</PageRoot>
	);
};

const Iframe = styled("iframe", {
	width: 700,
	height: 450,
});

// eslint-disable-next-line import/no-default-export
export default ArchivePage;

/* 機能実装後、以下のコード削除 */
/* eslint-disable @typescript-eslint/naming-convention */
const DATA = {
	id: 1,
	title: "第１回エンジビアの泉",
	scheduledStartTime: "2021-10-01T19:00:00.000Z",
	status: "ended",
	archiveUrl: "https://www.youtube.com/watch?v=1Q6m_d8PTNQ",
	Trivia: [
		{
			id: 5,
			content: "ユーザー１が放送１に投稿したトリビアの内容",
			hee: 79,
			User: {
				name: "テストユーザー１",
				image:
					"https://secure.gravatar.com/avatar/e57b3678017c2e646e065d9803735508.jpg?s=512&d=https%3A%2F%2Fa.slack-edge.com%2Fdf10d%2Fimg%2Favatars%2Fava_0013-512.png",
			},
		},
		{
			id: 8,
			content: "ユーザー２が放送１に投稿したトリビアの内容",
			hee: 88,
			User: {
				name: "テストユーザー２",
				image:
					"https://secure.gravatar.com/avatar/e57b3678017c2e646e065d9803735508.jpg?s=512&d=https%3A%2F%2Fa.slack-edge.com%2Fdf10d%2Fimg%2Favatars%2Fava_0013-512.png",
			},
		},
		{
			id: 9,
			content: "ユーザー３が放送１に投稿したトリビアの内容",
			hee: 93,
			User: {
				name: "テストユーザー３",
				image:
					"https://secure.gravatar.com/avatar/e57b3678017c2e646e065d9803735508.jpg?s=512&d=https%3A%2F%2Fa.slack-edge.com%2Fdf10d%2Fimg%2Favatars%2Fava_0013-512.png",
			},
		},
	],
};
