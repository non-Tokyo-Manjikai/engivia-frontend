/* eslint-disable @typescript-eslint/naming-convention */
import {
  closestCorners,
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import type { VFC } from "react";
import { memo, useCallback, useEffect, useState } from "react";
import { Item, SortableContainer } from "src/components/dnd";
import { Button } from "src/components/styled";
import { postTrivia } from "src/hooks/postTrivia";
import type { LiveStatus, TriviaType } from "src/types";
import { styled } from "src/utils";

type Props = {
  status: LiveStatus;
  triviaList: TriviaType[];
  onTitleCall: (trivia: TriviaType) => void;
};

export const Multicontainers: VFC<Props> = memo((props) => {
  const [items, setItems] = useState<{ [key: string]: number[] }>({
    root: [],
    container1: [],
    container2: [],
  });

  useEffect(() => {
    const triviaList = props.triviaList?.map((trivia: TriviaType) => trivia.id);
    if (triviaList) {
      setItems({
        root: [...triviaList],
        container1: [],
        container2: [],
      });
    }
  }, [props.triviaList]);

  const [activeId, setActiveId] = useState<number | null>();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const findContainer = (id: any) => {
    if (id in items) {
      return id;
    }
    return Object.keys(items).find((key) => {
      return items[key].includes(id);
    });
  };

  const handleDragStart = (event: any) => {
    const { active } = event;
    const { id } = active;
    setActiveId(id);
  };

  const handleDragOver = (event: any) => {
    const { active, over, draggingRect } = event;
    const { id } = active;
    const { id: overId } = over;

    const activeEngivia = props.triviaList.filter((item) => {
      return item.id === id;
    })[0];

    const activeContainer = findContainer(id);
    const overContainer = findContainer(overId);

    if (!activeContainer || !overContainer || activeContainer === overContainer) {
      return;
    }

    if (
      `${overContainer}` === "root" &&
      ((`${activeContainer}` === "container1" && activeEngivia.featured === true) ||
        `${activeContainer}` === "container2")
    ) {
      return;
    }

    if (
      `${overContainer}` === "container1" &&
      (items.container1.length === 1 || `${activeContainer}` === "container2")
    ) {
      return;
    }

    // if (`${overContainer}` === "container2" && activeEngivia.featured === false) {
    // 	return;
    // }

    if (props.status === "live" && over) {
      setItems((prev: any) => {
        const activeItems = prev[activeContainer];
        const overItems = prev[overContainer];

        const activeIndex = activeItems.indexOf(id);
        const overIndex = overItems.indexOf(overId);

        let newIndex;
        if (overId in prev) {
          newIndex = overItems.length + 1;
        } else {
          const isBelowLastItem =
            over &&
            overIndex === overItems.length - 1 &&
            draggingRect?.offsetTop > over.rect.offsetTop + over.rect.height;

          const modifier = isBelowLastItem ? 1 : 0;

          newIndex = overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
        }

        return {
          ...prev,
          [activeContainer]: [
            ...prev[activeContainer].filter((item: any) => {
              return item !== active.id;
            }),
          ],
          [overContainer]: [
            ...prev[overContainer].slice(0, newIndex),
            items[activeContainer][activeIndex],
            ...prev[overContainer].slice(newIndex, prev[overContainer].length),
          ],
        };
      });
    }
  };

  const handleDragEnd = async (event: any) => {
    const { id } = event.active;
    const { id: overId } = event.over;
    const activeContainer = findContainer(id);
    const overContainer = findContainer(overId);

    if (!activeContainer || !overContainer || activeContainer !== overContainer) {
      return;
    }
    const body = {
      hee: 100,
      featured: true,
      token: "token3",
      content: "aaaa",
    };

    /* ============= 仮実装 ============= */
    if (overContainer === "container2") {
      console.info("フィーチャー済み");
      const result = await postTrivia("/trivia/1", body, body.token);
      console.info(result);
    }

    const activeIndex = items[activeContainer].indexOf(event.active.id);
    const overIndex = items[overContainer].indexOf(overId);

    if (activeIndex !== overIndex) {
      setItems((items: any) => {
        return {
          ...items,
          [overContainer]: arrayMove(items[overContainer], activeIndex, overIndex),
        };
      });
    }
    setActiveId(null);
  };

  const handleTitleCall = useCallback(
    (currentId) => {
      const engivia = props.triviaList.filter((item) => {
        return item.id === currentId;
      })[0];
      props.onTitleCall(engivia);
    },
    [props.onTitleCall],
  );

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
        <SortableContainer id="root" items={items.root} triviaList={props.triviaList} title="フィーチャー前" />

        <div>
          <SortableContainer
            id="container1"
            items={items.container1}
            triviaList={props.triviaList}
            title="フィーチャー中"
          />
          {props.status === "live" ? (
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
          <SortableContainer
            id="container2"
            items={items.container2}
            triviaList={props.triviaList}
            title="フィーチャー済み"
          />
          {props.status === "live" && items.container1.length === 1 ? (
            <Feature>
              <div>フィーチャーを終える</div>
            </Feature>
          ) : null}
        </div>
        <DragOverlay>{activeId ? <Item id={activeId} triviaList={props.triviaList} /> : null}</DragOverlay>
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
