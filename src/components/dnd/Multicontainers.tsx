import { closestCorners, DndContext, DragOverlay } from "@dnd-kit/core";
import type { VFC } from "react";
import { memo } from "react";
import { Item, SortableContainer } from "src/components/dnd";
import { Button } from "src/components/styled";
import { useDndTrivia } from "src/hooks/useDndTrivia";
import type { TriviaType } from "src/types";
import { styled } from "src/utils";

type Props = {
  totalHeeCount: number;
  onTitleCall: (trivia: TriviaType) => void;
  onWaitTitleCall: () => void;
};

export const Multicontainers: VFC<Props> = memo((props) => {
  const { sensors, handleDragStart, handleDragOver, handleDragEnd, handleTitleCall, items, broadcast, activeId } =
    useDndTrivia(props);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
          padding: "10px",
          justifyContent: "center",
          width: "full",
          gap: "1rem",
        }}
      >
        <SortableContainer id="root" items={items.root} title="フィーチャー前" />

        <div>
          <SortableContainer id="container1" items={items.container1} title="フィーチャー中" />
          {broadcast?.status === "live" ? (
            items.container1.length === 0 ? (
              <Feature>
                <div>フィーチャーする</div>
              </Feature>
            ) : (
              <div className=" w-full h-10 text-center ">
                <Button color="primary" onClick={() => handleTitleCall(items.container1[0])}>
                  タイトルコールする
                </Button>
              </div>
            )
          ) : null}
        </div>

        <div>
          <SortableContainer id="container2" items={items.container2} title="フィーチャー済み" />
          {broadcast?.status === "live" && items.container1.length === 1 ? (
            <Feature>
              <div>フィーチャーを終える</div>
            </Feature>
          ) : null}
        </div>
        <DragOverlay>{activeId ? <Item id={activeId} /> : null}</DragOverlay>
      </div>
    </DndContext>
  );
});

const Feature = styled("div", {
  paddingY: "2.5rem",
  marginY: "1.5rem",
  width: "full",
  textAlign: "center",
  color: "$slate8",
  border: "dashed 2px $slate7",
});
