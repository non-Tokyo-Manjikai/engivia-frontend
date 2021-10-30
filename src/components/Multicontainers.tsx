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
import { useState } from "react";
import { Button } from "src/components/Button";
import { styled } from "src/utils";

import { Item } from "./sortable_item";
import { Container } from "./SortableContainer";

export const Multicontainers = () => {
	const [items, setItems] = useState<{ [key: string]: string[] }>({
		root: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
		container1: [],
		container2: [],
	});
	const [activeId, setActiveId] = useState<string | null>();

	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates,
		})
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

		const activeContainer = findContainer(id);
		const overContainer = findContainer(overId);

		if (!activeContainer || !overContainer || activeContainer === overContainer) {
			return;
		}

		if (`${overContainer}` === "container1" && items.container1.length === 1) {
			return;
		}

		if (
			over &&
			(over.data.current.index || over.data.current.accept).includes(active.data.current.sortable.containerId)
		) {
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

	const handleDragEnd = (event: any) => {
		const { id } = event.active;
		const { id: overId } = event.over;
		const activeContainer = findContainer(id);
		const overContainer = findContainer(overId);

		if (!activeContainer || !overContainer || activeContainer !== overContainer) {
			return;
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

	const handleClick = () => {
		console.log("タイトルコール");
	};

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
				<Container id="root" items={items.root} title="フィーチャー前" index="container1" accept="container1" />

				<div>
					<Container
						id="container1"
						items={items.container1}
						title="フィーチャー中"
						index="root"
						accept={["root", "container2"]}
					/>
					{items.container1.length === 0 ? (
						<Feature>
							<div>フィーチャーする</div>
						</Feature>
					) : null}
					<div className=" w-full h-10 text-center ">
						<Button color="primary" onClick={handleClick}>
							タイトルコールする
						</Button>
					</div>
				</div>

				<div>
					<Container
						id="container2"
						items={items.container2}
						title="フィーチャー済み"
						index="container1"
						accept="container1"
						featured={true}
					/>
					<Feature>
						<div>フィーチャーを終える</div>
					</Feature>
				</div>
				<DragOverlay>{activeId ? <Item id={activeId} /> : null}</DragOverlay>
			</div>
		</DndContext>
	);
};

const Feature = styled("div", {
	paddingY: "2.5rem",
	marginY: "1.5rem",
	width: "full",
	textAlign: "center",
	color: "$slate8",
	border: "dashed 2px $slate7",
});
