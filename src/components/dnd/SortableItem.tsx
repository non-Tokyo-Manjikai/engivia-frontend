import { useSortable } from "@dnd-kit/sortable";
import type { VFC } from "react";
import { memo } from "react";
import { Item } from "src/components/dnd";

type Props = {
  id: number;
};

export const SortableItem: VFC<Props> = memo((props: any) => {
  const { attributes, listeners, setNodeRef, transition } = useSortable({
    id: props.id,
  });
  return (
    <div
      ref={setNodeRef}
      style={{
        transform: " CSS.Transform.toString(transform)",
        transition,
      }}
      {...attributes}
      {...listeners}
    >
      <Item id={props.id} />
    </div>
  );
});
