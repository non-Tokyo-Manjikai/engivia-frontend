import { useDroppable } from "@dnd-kit/core";

export const Droppable = (props: any) => {
  const { isOver, setNodeRef } = useDroppable({
    id: props.id,
    data: {
      accepts: props.type,
    },
  });
  const style = {
    color: isOver ? "green" : undefined,
  };

  return (
    <div ref={setNodeRef} style={style}>
      {props.children}
    </div>
  );
};

export const Droppable1 = (props: any) => {
  const { isOver, setNodeRef } = useDroppable({
    id: "droppable1",
    data: {
      accepts: ["type2", "type3"],
    },
  });
  const style = {
    color: isOver ? "green" : undefined,
  };

  return (
    <div ref={setNodeRef} style={style}>
      {props.children}
    </div>
  );
};

export const Droppable2 = (props: any) => {
  const { isOver, setNodeRef } = useDroppable({
    id: "droppable2",
    data: {
      accepts: ["type1", "type3"],
    },
  });
  const style = {
    color: isOver ? "green" : undefined,
  };

  return (
    <div ref={setNodeRef} style={style}>
      {props.children}
    </div>
  );
};
export const Droppable3 = (props: any) => {
  const { isOver, setNodeRef } = useDroppable({
    id: "droppable3",
    data: {
      accepts: ["type1", "type2"],
    },
  });
  const style = {
    color: isOver ? "green" : undefined,
  };

  return (
    <div ref={setNodeRef} style={style}>
      {props.children}
    </div>
  );
};
