import type { NextPage } from "next";
import { BroadcastItem } from "src/components";
import { PageRoot, Title } from "src/components/styled";
import { useBroadcastList } from "src/hooks/useBroadcastList.swr";
import { styled } from "src/utils";

const BroadcastPage: NextPage = () => {
	const { data, isError, isLoading, isEmpty } = useBroadcastList();

	return (
		<PageRoot>
			<Title>放送一覧</Title>

			{isLoading ? (
				"loading"
			) : isError ? (
				"error"
			) : isEmpty ? (
				"no data"
			) : (
				<BroadcastItemWrap>
					{data?.map((item) => (
						<BroadcastItem key={item.id} {...item} />
					))}
				</BroadcastItemWrap>
			)}
		</PageRoot>
	);
};

// eslint-disable-next-line import/no-default-export
export default BroadcastPage;

const BroadcastItemWrap = styled("ul", {
	display: "flex",
	flexDirection: "column",
	justifyContent: "center",
	alignItems: "center",

	borderRadius: 5,

	boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06)",
	listStyle: "none",
});
