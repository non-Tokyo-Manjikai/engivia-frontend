import {
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { useCallback, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { broadcastLiveState } from "src/components/atoms";
import { handlePutTrivia } from "src/hooks/handlePutTrivia";
import type { TriviaType } from "src/types";

type Props = {
  totalHeeCount: number;
  onTitleCall: (trivia: TriviaType) => void;
  onWaitTitleCall: () => void;
};

export const useDndTrivia = (props: Props) => {
  const [broadcast, setBroadcast] = useRecoilState(broadcastLiveState);
  const [activeId, setActiveId] = useState<number | null>();
  const [items, setItems] = useState<{ [key: string]: number[] }>({
    root: [],
    container1: [],
    container2: [],
  });

  useEffect(() => {
    const rootTriviaList = broadcast?.Trivia?.reduce((nonFeature: number[], current: TriviaType) => {
      return !current.featured ? [...nonFeature, current.id] : nonFeature;
    }, []);
    const featuredTriviaList = broadcast?.Trivia?.reduce((nonFeature: number[], current: TriviaType) => {
      return current.featured ? [...nonFeature, current.id] : nonFeature;
    }, []);
    if (rootTriviaList && featuredTriviaList) {
      setItems((prev) => {
        if (prev.root.length === 0 && prev.container1.length === 0 && prev.container2.length === 0) {
          return {
            root: [...rootTriviaList],
            container1: [],
            container2: [...featuredTriviaList],
          };
        } else {
          return prev;
        }
      });
    }
  }, [broadcast]);

  const handleTitleCall = useCallback(
    (currentId) => {
      const engivia = broadcast?.Trivia.filter((item) => {
        return item.id === currentId;
      })[0];
      if (engivia) props.onTitleCall(engivia);
    },
    [props.onTitleCall],
  );

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const findContainer = useCallback(
    (id: any) => {
      if (id in items) return id;
      return Object.keys(items).find((key) => items[key].includes(id));
    },
    [items],
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const activeId = Number(active.id);
    setActiveId(activeId);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    const activeId = Number(active.id);
    const overId = over?.id;
    const activeEngivia = broadcast?.Trivia.filter((item) => item.id === activeId)[0];
    if (!activeEngivia) return;
    const activeContainer = findContainer(activeId);
    const overContainer = findContainer(overId);
    if (!activeContainer || !overContainer || activeContainer === overContainer) return;
    if (
      `${overContainer}` === "root" &&
      ((`${activeContainer}` === "container1" && activeEngivia.featured === true) ||
        `${activeContainer}` === "container2")
    )
      return;
    if (`${overContainer}` === "container1" && (items.container1.length === 1 || `${activeContainer}` === "container2"))
      return;

    // if (`${overContainer}` === "container2" && activeEngivia.featured === false) return;

    if (broadcast?.status === "live" && over) {
      setItems((prev: any) => {
        const activeItems = prev[activeContainer];
        const overItems = prev[overContainer];
        const activeIndex = activeItems.indexOf(activeId);
        const overIndex = overItems.indexOf(over.id);
        let newIndex;
        if (over.id in prev) {
          newIndex = overItems.length + 1;
        } else {
          const isBelowLastItem =
            over && overIndex === overItems.length - 1 && over.rect.offsetTop > over.rect.offsetTop + over.rect.height;
          const modifier = isBelowLastItem ? 1 : 0;
          newIndex = overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
        }
        return {
          ...prev,
          [activeContainer]: [
            ...prev[activeContainer].filter((item: any) => {
              return item !== activeId;
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

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    const activeId = Number(active.id);
    const overId = over?.id;
    const activeContainer = findContainer(activeId);
    const overContainer = findContainer(overId);
    if (!activeContainer || !overContainer || activeContainer !== overContainer) return;

    /* ============= 仮実装 ============= */
    if (overContainer === "container2") {
      console.info("フィーチャー済み");
      const PutBody = {
        hee: props.totalHeeCount,
        featured: true,
        token: "token3",
      };
      const result = await handlePutTrivia(`/trivia/${activeId}`, PutBody);
      setBroadcast((prevState) => {
        if (prevState) {
          const resultTrivia = prevState.Trivia.map((trivia) => {
            return trivia.id === result.id ? { ...trivia, ...result } : trivia;
          });
          return { ...prevState, Trivia: resultTrivia };
        }
        return prevState;
      });
      props.onWaitTitleCall();
    }
    const activeIndex = items[activeContainer].indexOf(activeId);
    const overIndex = items[overContainer].indexOf(Number(overId));
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

  return {
    sensors,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
    handleTitleCall,
    items,
    broadcast,
    activeId,
  };
};
