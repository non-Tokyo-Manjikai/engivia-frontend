import type { NextPage } from "next";
import { useState } from "react";
import { io } from "socket.io-client";
import { BroadcastHeader } from "src/components";
import { Multicontainers } from "src/components/dnd";
import { Button } from "src/components/styled";
import { useGetEngiviaInfo } from "src/hooks/useGetEngiviaInfo";
import { styled } from "src/utils";

// ユーザー情報
const sampleUserInfo = {
	id: "ABCDE123",
	name: "ぽんたん",
	image:
		"https://secure.gravatar.com/avatar/e57b3678017c2e646e065d9803735508.jpg?s=24&d=https%3A%2F%2Fa.slack-edge.com%2Fdf10d%2Fimg%2Favatars%2Fava_0013-24.png",
	isAdmin: true,
	content: "HTMLにはポータルという要素がある",
};

const LiveAdminPage: NextPage = () => {
	const { data, isError, isLoading, isEmpty } = useGetEngiviaInfo("/broadcast/1", "token3");

	/* ------- user ------- */
	// ソケットの通信情報を保持する
	const [socket, setSoket] = useState<any>();

	/* ------- admin ------- */
	// 1.soket通信を開始する2
	const handleBeginLive = () => {
		const socket = io("http://localhost:8080", {
			path: "/live",
			query: {
				id: sampleUserInfo.id,
				name: sampleUserInfo.name,
				image: sampleUserInfo.image,
			},
		});
		// 通信情報を保持する
		setSoket(socket);
	};

	// 3.管理者がタイトルコールをして、エンジビア情報を送信する
	const handleTitleCall = (engivia: any) => {
		socket.emit("admin_post_title_call", {
			query: {
				id: engivia.id,
				name: engivia.name,
				image: engivia.image,
				content: engivia.content,
			},
		});
	};

	// 4.管理者が次のエンジビアを準備する
	// const handleWaitTitleCall = () => {
	// 	socket.emit("post_admin_wait_title_call", {});
	// 	socket.emit("user_post_hee_count", {
	// 		query: { heeCount: 0 },
	// 	});
	// };

	if (isLoading) {
		<div>loading</div>;
	}
	if (isEmpty) {
		<div>isEmpty</div>;
	}
	if (isError) {
		<div>error</div>;
	}

	return (
		<Container>
			<Top>
				<Title>
					<BroadcastHeader title={data?.title} status={data?.status} />
				</Title>

				<ButtonWrap>
					<UpcommingButtonWrap>
						<Button color="quaternary" onClick={handleBeginLive}>
							放送を開始する
						</Button>
						<Button color="secondary">編集する</Button>
						<Button color="secondary">放送を終了する</Button>
					</UpcommingButtonWrap>
					{/* {status === "upcoming" ? (
						<UpcommingButtonWrap>
							<Button color="quaternary">放送を開始する</Button>
							<Button color="secondary">編集する</Button>
						</UpcommingButtonWrap>
					) : (
						<Button color="secondary">放送を終了する</Button>
					)} */}
				</ButtonWrap>
			</Top>

			{data ? <Multicontainers status={data.status} triviaList={data.Trivia} onTitleCall={handleTitleCall} /> : null}
		</Container>
	);
};

// eslint-disable-next-line import/no-default-export
export default LiveAdminPage;

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
