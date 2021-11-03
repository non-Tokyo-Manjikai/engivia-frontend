import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { SortableItem } from "src/components/dnd";
import { styled } from "src/utils";

export const SortableContainer = (props: any) => {
	const { setNodeRef } = useDroppable({
		id: props.id,
		data: { accept: props.accept },
	});

	const Title = styled("div", {
		padding: "1.25rem",
		fontSize: "0.875rem",
		lineHeight: "1.25rem",
		fontWeight: "bold",
		textAlign: "center",
		backgroundColor: "$slate7",
		borderRadius: "0.75rem",
	});

	return (
		<>
			<SortableContext id={props.id} items={props.items} strategy={verticalListSortingStrategy}>
				<div ref={setNodeRef}>
					<Title>{props.title}</Title>
					{props.items.map((id: number) => {
						return <SortableItem key={id} id={id} index={props.index} featured={props.featured} />;
					})}
				</div>
			</SortableContext>
		</>
	);
};
