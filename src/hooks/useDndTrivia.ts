import type { DragEndEvent, DragOverEvent, DragStartEvent } from "@dnd-kit/core";
import { KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { broadcastLiveState, userInfoState } from "src/components/atoms";
import { dndValidation } from "src/functions/dndValidation";
import { handlePutTrivia } from "src/hooks/handlePutTrivia";
import type { TriviaType } from "src/types";

type Props = {
  totalHeeCount: number;
  onTitleCall: (trivia: TriviaType) => void;
  onWaitTitleCall: () => void;
};

export const useDndTrivia = (props: Props) => {
  const userInfo = useRecoilValue(userInfoState);
  const [isFeature, setIsFeature] = useState(false);
  const [broadcast, setBroadcast] = useRecoilState(broadcastLiveState);
  const [activeId, setActiveId] = useState<number | null>();
  const [startContainer, setStartContainer] = useState();
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

  const handleTitleCall = async (currentId: number) => {
    const PutBody = { featured: true };
    const result = await handlePutTrivia(`/trivia/${currentId}`, PutBody, userInfo.token);

    setBroadcast((prevState) => {
      if (prevState) {
        const resultTrivia = prevState.Trivia.map((trivia) => {
          return trivia.id === result.id ? { ...trivia, ...result } : trivia;
        });
        // eslint-disable-next-line @typescript-eslint/naming-convention
        return { ...prevState, Trivia: resultTrivia };
      }
      return prevState;
    });

    const engivia = broadcast?.Trivia.filter((item) => {
      return item.id === currentId;
    })[0];

    if (engivia) {
      props.onTitleCall(engivia);
    }
    setIsFeature(true);
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const activeId = Number(active.id);
    setActiveId(activeId);
    if (active.data.current) {
      setStartContainer(active.data.current.sortable.containerId);
    }
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    const activeId = Number(active.id);
    const overId = over?.id;

    const [result, activeContainer, overContainer] = dndValidation(
      broadcast,
      items,
      activeId,
      overId,
      false,
      startContainer,
    );
    if (!result) return;

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

    const [result, activeContainer, overContainer] = dndValidation(
      broadcast,
      items,
      activeId,
      overId,
      true,
      startContainer,
    );
    if (!result) return;

    if (overContainer === "container2") {
      const PutBody = { hee: props.totalHeeCount === 0 ? 0 : props.totalHeeCount };
      const result = await handlePutTrivia(`/trivia/${activeId}`, PutBody, userInfo.token);

      setBroadcast((prevState) => {
        if (prevState) {
          const resultTrivia = prevState.Trivia.map((trivia) => {
            return trivia.id === result.id ? { ...trivia, ...result } : trivia;
          });
          // eslint-disable-next-line @typescript-eslint/naming-convention
          return { ...prevState, Trivia: resultTrivia };
        }
        return prevState;
      });

      props.onWaitTitleCall();
      setIsFeature(false);
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
    isFeature,
  };
};
