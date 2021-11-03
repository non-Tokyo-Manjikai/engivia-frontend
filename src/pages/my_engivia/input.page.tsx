import type { NextPage } from "next";
import { BroadcastHeader } from "src/components/BroadcastHeader";
import { Button } from "src/components/Button";
import { PageRoot } from "src/components/PageRoot";
import { Textarea } from "src/components/Textarea";

const EngiviaInputPage: NextPage = () => {
	return (
		<PageRoot>
			<BroadcastHeader status="live" title="第1回エンジビアの泉" />
			<Textarea placeholder="エンビジアを入力する" />
			<Button color="primary">保存する</Button>
		</PageRoot>
	);
};

// eslint-disable-next-line import/no-default-export
export default EngiviaInputPage;
