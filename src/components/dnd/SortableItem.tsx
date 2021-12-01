import { useSortable } from "@dnd-kit/sortable";
import type { VFC } from "react";
import { memo } from "react";
import { Item } from "src/components/dnd";
import { styled } from "src/utils";

type Props = {
  id: number;
};

export const SortableItem: VFC<Props> = memo((props: any) => {
  const { attributes, listeners, setNodeRef, transition } = useSortable({
    id: props.id,
  });

  const Itemwrap = styled("div", {
    transform: " CSS.Transform.toString(transform)",
    transition,
  });

  return (
    <Itemwrap ref={setNodeRef} {...attributes} {...listeners}>
      <Item id={props.id} />
    </Itemwrap>
  );
});
