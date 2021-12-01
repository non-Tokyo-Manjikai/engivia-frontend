import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import type { VFC } from "react";
import { SortableItem } from "src/components/dnd";
import { styled } from "src/utils";

type Props = {
  id: string;
  items: any;
  title: string;
};

export const SortableContainer: VFC<Props> = (props) => {
  const { setNodeRef } = useDroppable({
    id: props.id,
  });

  return (
    <SortableContext id={props.id} items={props.items} strategy={verticalListSortingStrategy}>
      <div ref={setNodeRef}>
        <Title>{props.title}</Title>
        {props.items.map((id: number) => {
          return <SortableItem key={id} id={id} />;
        })}
      </div>
    </SortableContext>
  );
};

const Title = styled("div", {
  padding: "1.25rem",

  fontSize: "0.875rem",
  lineHeight: "1.25rem",
  fontWeight: "bold",
  textAlign: "center",

  backgroundColor: "$slate7",
  borderRadius: "0.75rem",
});
