import type { NextPage } from "next";
import { BroadcastHeader } from "src/components/BroadcastHeader";
import { EngiviaCard } from "src/components/EngiviaCard";
import { HeeButtonKit } from "src/components/HeeButtonKit";
import { HeeList } from "src/components/HeeList";
import { PageRoot } from "src/components/PageRoot";
import { styled } from "src/utils";

const EngiviaEditPage: NextPage = () => {
	return (
		<PageRoot>
			<ListWrapper>
				<HeeList data={HEE_LIST_DATA} />
			</ListWrapper>
			<BroadcastHeader status="live" title="第1回エンジビアの泉" />
			<EngiviaCard
				content="このボタンはカタンさんが作りました。ご本人はとても気に入ってるようです。へぇ〜〜〜ほぉ〜〜〜"
				name="よきまる"
			/>
			<HeeButtonKit />
		</PageRoot>
	);
};

// eslint-disable-next-line import/no-default-export
export default EngiviaEditPage;

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
		name: "カタンさん",
		image: "https://pbs.twimg.com/profile_images/12010782801/katan_normal.jpg",
		count: 1,
	},
	{
		id: "2",
		name: "カタンさん",
		image: "https://pbs.twimg.com/profile_images/12010782801/katan_normal.jpg",
		count: 2,
	},
	{
		id: "3",
		name: "カタンさん",
		image: "https://pbs.twimg.com/profile_images/12010782801/katan_normal.jpg",
		count: 9,
	},
	{
		id: "4",
		name: "カタンさん",
		image: "https://pbs.twimg.com/profile_images/12010782801/katan_normal.jpg",
		count: 3,
	},
	{
		id: "5",
		name: "かたんさん",
		image: "https://pbs.twimg.com/profile_images/12010782801/katan_normal.jpg",
		count: 85,
	},
];
