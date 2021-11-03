import { useSortable } from "@dnd-kit/sortable";
import { memo } from "react";
import { Item } from "src/components/dnd";
import { styled } from "src/utils";

export const SortableItem = memo((props: any) => {
	const { attributes, listeners, setNodeRef, transition } = useSortable({
		id: props.id,
		data: { index: props.index },
	});

	const Itemwrap = styled("div", {
		transform: " CSS.Transform.toString(transform)",
		transition,
	});

	return (
		<Itemwrap ref={setNodeRef} {...attributes} {...listeners}>
			<Item id={props.id} featured={props.featured} />
		</Itemwrap>
	);
});
