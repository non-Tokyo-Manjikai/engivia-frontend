import { DndContext } from "@dnd-kit/core";
import { useState } from "react";

import { Draggable } from "./Draggable";
import { Droppable} from "./Droppable";

export const Dropbox = () => {
  const [is1Dropped, setIs1Dropped] = useState(0);
  const draggableMarkup = (
    <>
      <Draggable index="type1" id="11">
        Drag me
      </Draggable>
    </>
  );
  const handleDragEnd = (event: any) => {
    // if (event.over && event.over.id === "droppable1") {
    //   setIs1Dropped(1);
    // }
    // if (event.over && event.over.id === "droppable2") {
    //   setIs1Dropped(2);
    // }
    if (event.over) {
      setIs1Dropped(event.over.id);
    }
  };

  return (
    <>
      <DndContext onDragEnd={handleDragEnd}>
        {is1Dropped === 0 ? draggableMarkup : null}
        <Droppable id={1} type="type1">
          {is1Dropped === 1 ? draggableMarkup : "ドロップする"}
        </Droppable>
        <Droppable id={2} type="type1">
          {is1Dropped === 2 ? draggableMarkup : "ドロップする"}
        </Droppable>
        <Droppable id={3} type="type1">
          {is1Dropped === 3 ? draggableMarkup : "ドロップする"}
        </Droppable>
      </DndContext>
    </>
  );
};
