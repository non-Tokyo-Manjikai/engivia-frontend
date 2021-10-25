import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { SortableItem } from "src/components/sortable_item";

const containerStyle = {
  background: "#dadada",
  padding: 10,
  margin: 10,
  flex: 1,
};

export const Container = (props: any) => {
  const { setNodeRef } = useDroppable({
    id: props.id,
  });

  return (
    <SortableContext id={props.id} items={props.items} strategy={verticalListSortingStrategy}>
      <div ref={setNodeRef} style={containerStyle}>
        {props.items.map((id: number) => {
          return <SortableItem key={id} id={id} />;
        })}
      </div>
    </SortableContext>
  );
};
