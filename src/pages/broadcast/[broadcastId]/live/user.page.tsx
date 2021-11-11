import type { NextPage } from "next";
import { useState } from "react";
import { io } from "socket.io-client";
import { BroadcastHeader, EngiviaCard, HeeButtonKit, HeeList } from "src/components";
import { Button, PageRoot } from "src/components/styled";
import { styled } from "src/utils";

// ユーザー情報
const sampleUserInfo = {
	id: "ABCDE456",
	name: "みやさん",
	image:
		"https://secure.gravatar.com/avatar/e57b3678017c2e646e065d9803735508.jpg?s=24&d=https%3A%2F%2Fa.slack-edge.com%2Fdf10d%2Fimg%2Favatars%2Fava_0013-24.png",
	isAdmin: false,
	content: "HTMLにはポータルという要素がある",
};

const LiveUserPage: NextPage = () => {
	/* ------- user ------- */
	// ソケットの通信情報を保持する
	const [socket, setSoket] = useState<any>();
	// ログインユーザーのへぇカウント（ローカル管理）
	const [heeCount, setHeeCount] = useState<number>(0);
	// タイトルコール中のトリビア情報を保持する
	const [viewEngivia, setViewEngivia] = useState<any>();
	const [heeCountList, setHeeCountList] = useState<number>(0);
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
		// console.info("--- socket情報受信 ---");
		// console.info(socket);
		// 通信情報を保持する
		setSoket(socket);

		// ここはユーザーのみ
		socket.on("user_get_title_call", (data) => {
			// console.info("--- タイトルコール受信 ---");
			// console.info(data);
			setViewEngivia(data.engivia);

			// とりへぇカウントをリセット
			if (!data) {
				// console.log("リセット");
				setHeeCount(0);
				setHeeCountList(0);
			}
		});

		// ここはユーザーのみ
		socket.on("user_get_hee_count", (data) => {
			// console.info("--- へぇカウント受信 ---");
			// console.info(data);
			setHeeCountList(data.heeCount);
		});

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

	/* ------- user ------- */
	// 4.ユーザーがへぇボタンを押す
	const handleHeeClick = () => {
		// ログインユーザーのへぇカウントを送信する
		socket.emit("user_post_hee_count", {
			query: { heeCount: heeCount + 1 },
		});
		// ログインユーザーカウントを増やす（ローカル管理）
		setHeeCount((count) => count + 1);
	};

	return (
		<PageRoot>
			<ListWrapper>
				<HeeList data={HEE_LIST_DATA} />
			</ListWrapper>

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
				<div>
					<h1 className="text-xl font-bold">ユーザー</h1>
					<Button color="primary" onClick={handleHeeClick} disabled={!socket}>
						4.へぇ
					</Button>
				</div>
			</div>

			<BroadcastHeader status="live" title="第1回エンジビアの泉" />
			<EngiviaCard {...viewEngivia} heeCount={heeCountList} isResult />
			<HeeButtonKit />
		</PageRoot>
	);
};

// eslint-disable-next-line import/no-default-export
export default LiveUserPage;

const ListWrapper = styled("aside", {
	position: "fixed",
	top: "4.2rem",
	right: 0,

	display: "flex",
	justifyContent: "flex-end",

	paddingTop: "1rem",
	paddingRight: "1.5rem",
	height: "calc(100vh - 4.2rem)",
	overflowY: "auto",
});

const HEE_LIST_DATA = [
	{
		id: "1",
		name: "ぽんさん",
		image: "https://pbs.twimg.com/profile_images/12010782801/katan_normal.jpg",
		count: 1,
	},
	{
		id: "2",
		name: "みやさんさん",
		image: "https://pbs.twimg.com/profile_images/12010782801/katan_normal.jpg",
		count: 2,
	},
	{
		id: "3",
		name: "にんじゃんさん",
		image: "https://pbs.twimg.com/profile_images/12010782801/katan_normal.jpg",
		count: 9,
	},
	{
		id: "4",
		name: "みっっっつあんさん",
		image: "https://pbs.twimg.com/profile_images/12010782801/katan_normal.jpg",
		count: 3,
	},
	{
		id: "5",
		name: "よきまるさん",
		image: "https://pbs.twimg.com/profile_images/12010782801/katan_normal.jpg",
		count: 85,
	},
	{
		id: "6",
		name: "かたん",
		image: "https://pbs.twimg.com/profile_images/12010782801/katan_normal.jpg",
		count: 100,
	},
];
