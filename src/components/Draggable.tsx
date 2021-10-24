import { useDraggable } from "@dnd-kit/core";

export const Draggable = (props:any) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: props.id,
    data: {
      type: props.index,
    },
  });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <button ref={setNodeRef} style={style} {...listeners} {...attributes} className="w-20 h-8">
      {props.children}
    </button>
  );
};
