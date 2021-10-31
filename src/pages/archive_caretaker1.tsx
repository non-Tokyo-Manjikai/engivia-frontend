import { BroadcastHeader } from "src/components/BroadcastHeader";
import { Button } from "src/components/Button";
import { Input } from "src/components/Input";
import { Layout } from "src/components/Layout";
import { Result } from "src/components/Result";
import { styled } from "src/utils";

const ArchiveCaretaker1 = () => {
	const Items = ["1", "2", "3"];

	return (
		<>
			<Layout>
				<Container>
					<BroadcastHeader />

					<URL>
						<Input placeholder="URLを入力" />
						<div>
							<Button color="primary">保存する</Button>
						</div>
					</URL>

					{Items.map((id) => {
						return <Result key={id} />;
					})}
				</Container>
			</Layout>
		</>
	);
};

const URL = styled("div", {
	display: "flex",
	flexDirection: "column",
	gap: "0.75rem",
	marginY: "0.75rem",
});

const Container = styled("div", {
	marginX: "auto",
	width: "50%",
	textAlign: "center",
});

// eslint-disable-next-line import/no-default-export
export default ArchiveCaretaker1;
