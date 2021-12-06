import { useSortable } from "@dnd-kit/sortable";
import { useMemo, VFC } from "react";
import { memo } from "react";
import { Item } from "src/components/dnd";

type Props = {
  id: number;
};

export const SortableItem: VFC<Props> = memo((props: any) => {
  const { attributes, listeners, setNodeRef, transition } = useSortable({
    id: props.id,
  });

  const itemStyle = useMemo(() => {
    return {
      transform: " CSS.Transform.toString(transform)",
      transition,
    };
  }, []);

  return (
    <div style={{ ...itemStyle }} ref={setNodeRef} {...attributes} {...listeners}>
      <Item id={props.id} />
    </div>
  );
});
