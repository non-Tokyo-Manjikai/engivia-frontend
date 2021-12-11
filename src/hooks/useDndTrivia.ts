/* eslint-disable @typescript-eslint/naming-convention */
import type { DragEndEvent, DragOverEvent, DragStartEvent } from "@dnd-kit/core";
import { KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { broadcastLiveState, userInfoState } from "src/components/atoms";
import { dndValidation } from "src/functions/dndValidation";
import { requestFetcher } from "src/functions/requestFetcher";
import type { Trivia } from "src/types";

type Props = {
  totalHeeCount: number;
  onTitleCall: (trivia: Trivia) => void;
  onWaitTitleCall: () => void;
};

type ItemList = Record<string, number[]>;

export const useDndTrivia = (props: Props) => {
  const userInfo = useRecoilValue(userInfoState);
  const [isFeature, setIsFeature] = useState(false);
  const [broadcast, setBroadcast] = useRecoilState(broadcastLiveState);
  const [activeId, setActiveId] = useState(0);
  const [startContainer, setStartContainer] = useState("");
  const [items, setItems] = useState<ItemList>({
    root: [],
    container1: [],
    container2: [],
  });

  useEffect(() => {
    const rootTriviaList = broadcast?.Trivia?.reduce((nonFeature: number[], current: Trivia) => {
      return !current.featured ? [...nonFeature, current.id] : nonFeature;
    }, []);
    const featuredTriviaList = broadcast?.Trivia?.reduce((nonFeature: number[], current: Trivia) => {
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
    const { response } = await requestFetcher<Trivia>(`/trivia/${currentId}`, PutBody, "PUT", userInfo.token);

    setBroadcast((prevState) => {
      if (prevState) {
        const resultTrivia = prevState.Trivia.map((trivia) => {
          return trivia.id === response.id ? { ...trivia, ...response } : trivia;
        });
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
    const overId = Number(over?.id);

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
      setItems((prev) => {
        const activeItems = prev[activeContainer];
        const overItems = prev[overContainer];
        const activeIndex = activeItems.indexOf(activeId);
        const overIndex = overItems.indexOf(overId);
        let newIndex;
        if (overId in prev) {
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
            ...prev[activeContainer].filter((item: number) => {
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
    const overId = Number(over?.id);

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
      const PutBody = { hee: props.totalHeeCount };
      const { response } = await requestFetcher<Trivia>(`/trivia/${activeId}`, PutBody, "PUT", userInfo.token);

      setBroadcast((prevState) => {
        if (prevState) {
          const resultTrivia = prevState.Trivia.map((trivia) => {
            return trivia.id === response.id ? { ...trivia, ...response } : trivia;
          });
          return { ...prevState, Trivia: resultTrivia };
        }
        return prevState;
      });

      props.onWaitTitleCall();
      setIsFeature(false);
    }

    const activeIndex = items[activeContainer].indexOf(activeId);
    const overIndex = items[overContainer].indexOf(overId);
    if (activeIndex !== overIndex) {
      setItems((items) => {
        return {
          ...items,
          [overContainer]: arrayMove(items[overContainer], activeIndex, overIndex),
        };
      });
    }
    setActiveId(0);
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
