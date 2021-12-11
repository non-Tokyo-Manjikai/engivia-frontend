import { closestCorners, DndContext, DragOverlay } from "@dnd-kit/core";
import type { VFC } from "react";
import { memo } from "react";
import { Item, SortableContainer } from "src/components/dnd";
import { Button } from "src/components/styled";
import { useDndTrivia } from "src/hooks/useDndTrivia";
import type { Trivia } from "src/types";
import { styled } from "src/utils";

type Props = {
  totalHeeCount: number;
  onTitleCall: (trivia: Trivia) => void;
  onWaitTitleCall: () => void;
};

export const Multicontainers: VFC<Props> = memo((props) => {
  const {
    sensors,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
    handleTitleCall,
    items,
    broadcast,
    activeId,
    isFeature,
  } = useDndTrivia(props);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <Grid>
        <SortableContainer id="root" items={items.root} title="フィーチャー前" />

        <div>
          <SortableContainer id="container1" items={items.container1} title="フィーチャー中" />
          {broadcast?.status === "live" ? (
            items.container1.length === 0 ? (
              <Feature>フィーチャーする</Feature>
            ) : (
              <ButtonWrap>
                <Button
                  disabled={isFeature}
                  color={isFeature ? "secondary" : "primary"}
                  onClick={() => handleTitleCall(items.container1[0])}
                >
                  {isFeature ? "フィーチャー中です" : "タイトルコールする"}
                </Button>
              </ButtonWrap>
            )
          ) : null}
        </div>

        <div>
          <SortableContainer id="container2" items={items.container2} title="フィーチャー済み" />
          {broadcast?.status === "live" && items.container1.length === 1 ? (
            <Feature>フィーチャーを終える</Feature>
          ) : null}
        </div>

        <DragOverlay>{activeId ? <Item id={activeId} /> : null}</DragOverlay>
      </Grid>
    </DndContext>
  );
});

const Feature = styled("div", {
  width: "full",
  paddingY: "2.5rem",
  marginY: "1rem",
  border: "dashed 2px $slate7",

  color: "$slate8",
  textAlign: "center",
});

const Grid = styled("div", {
  display: "grid",
  justifyContent: "center",
  gap: "1rem",
  gridTemplateColumns: "repeat(3, minmax(0, 1fr))",

  width: "full",
  padding: "10px",
});

const ButtonWrap = styled("div", {
  width: "100%",
  textAlign: "center",
});
