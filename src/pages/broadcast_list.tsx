import type { NextPage } from "next";
import { BroadcastItem } from "src/components/BroadcastItem";
import { PageRoot } from "src/components/PageRoot";
import { Title } from "src/components/Title";
import { styled } from "src/utils";

const BroadcastListPage: NextPage = () => {
	return (
		<PageRoot>
			<Title>放送一覧</Title>
			<BroadcastItemWrap>
				{BROADCAST_DATA.map((item) => (
					<BroadcastItem key={item.id} {...item} />
				))}
			</BroadcastItemWrap>
		</PageRoot>
	);
};

// eslint-disable-next-line import/no-default-export
export default BroadcastListPage;

const BroadcastItemWrap = styled("ul", {
	display: "flex",
	flexDirection: "column",
	justifyContent: "center",
	alignItems: "center",

	borderRadius: 5,

	boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06)",
	listStyle: "none",
});

/* 機能実装後、以下のコード削除 */
type BroadcastListType = {
	id: number;
	title: string;
	scheduledStartTime: string;
	status: "live" | "upcoming" | "ended";
	count: number;
};

const BROADCAST_DATA: BroadcastListType[] = [
	{
		id: 3,
		title: "第３回エンジビアの泉",
		scheduledStartTime: "2021-10-20T20:00:00.000Z",
		status: "upcoming",
		count: 0,
	},
	{
		id: 2,
		title: "第２回エンジビアの泉",
		scheduledStartTime: "2021-10-10T12:00:00.000Z",
		status: "live",
		count: 0,
	},
	{
		id: 1,
		title: "第１回エンジビアの泉",
		scheduledStartTime: "2021-10-01T19:00:00.000Z",
		status: "ended",
		count: 0,
	},
];
