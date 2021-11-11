import type { NextPage } from "next";
import { useState } from "react";
import { io } from "socket.io-client";
import { BroadcastHeader } from "src/components";
import { Multicontainers } from "src/components/dnd";
import { Button } from "src/components/styled";
import { styled } from "src/utils";

const status: "upcoming" | "live" | "ended" = "live";
// ユーザー情報
const sampleUserInfo = {
	id: "ABCDE123",
	name: "ぽんたん",
	image:
		"https://secure.gravatar.com/avatar/e57b3678017c2e646e065d9803735508.jpg?s=24&d=https%3A%2F%2Fa.slack-edge.com%2Fdf10d%2Fimg%2Favatars%2Fava_0013-24.png",
	isAdmin: false,
	content: "HTMLにはポータルという要素がある",
};

const LiveAutherPage: NextPage = () => {
	/* ------- user ------- */
	// ソケットの通信情報を保持する
	const [socket, setSoket] = useState<any>();
	// タイトルコール中のトリビア情報を保持する
	const [allUser, setAllUser] = useState<any>();

	/* ------- auther ------- */
	const [selectEngivia, setSelectEngivia] = useState<any>("null");

	/* ------- auther ------- */
	// 1.soket通信を開始する
	const handleClick = () => {
		const socket = io("http://localhost:8080", {
			path: "/live",
			query: {
				id: sampleUserInfo.id,
				name: sampleUserInfo.name,
				image: sampleUserInfo.image,
			},
		});
		console.info("--- socket情報受信 ---");
		console.info(socket);
		// 通信情報を保持する
		setSoket(socket);

		// ここはユーザーのみ
		socket.on("user_get_all_user", (data) => {
			console.info("--- 接続してる全てのユーザー情報受信 ---");
			console.info(data);
			setAllUser(data);
		});
	};

	// 2.管理者がエンジビアを選択する
	const handleSelect = (id: string) => {
		setSelectEngivia(id);
	};

	// 3.管理者がタイトルコールをして、エンジビア情報を送信する
	const handleTitleCall = () => {
		socket.emit("auther_post_title_call", {
			query: {
				id: sampleUserInfo.id,
				name: sampleUserInfo.name,
				image: sampleUserInfo.image,
				content: sampleUserInfo.content,
			},
		});
	};

	// 4.管理者が次のエンジビアを準備する
	const handleWaitTitleCall = () => {
		socket.emit("post_auther_wait_title_call", {});
		socket.emit("user_post_hee_count", {
			query: { heeCount: 0 },
		});
	};

	return (
		<Container>
			<div className="flex flex-col gap-4">
				<div>
					<h1 className="text-xl font-bold">管理者</h1>
					<Button color="primary" onClick={handleClick}>
						1.通信を始める
					</Button>

					<div>
						<select onChange={(e) => handleSelect(e.target.value)}>
							<option value="" disabled selected>
								2.選択してください
							</option>
							<option value="1">trivia1</option>
							<option value="2">trivia2</option>
							<option value="3">trivia1</option>
						</select>
						<div>{selectEngivia}</div>
					</div>

					<Button color="primary" onClick={handleTitleCall} disabled={!socket}>
						3.タイトルコール
					</Button>
					<Button color="secondary" onClick={handleWaitTitleCall} disabled={!socket}>
						5.次のエンジビアへ準備
					</Button>
				</div>
			</div>

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
