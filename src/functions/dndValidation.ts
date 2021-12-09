const findContainer = (id: any, items: any) => {
  if (id in items) return id;
  return Object.keys(items).find((key) => items[key].includes(id));
};

export const dndValidation = (broadcast: any, items: any, activeId: any, overId: any, isDragEnd: boolean) => {
  const activeEngivia = broadcast?.Trivia.filter((item: any) => item.id === activeId)[0];

  const activeContainer = findContainer(activeId, items);
  const overContainer = findContainer(overId, items);

  if (!activeEngivia || !activeContainer || !overContainer) {
    return [false, activeContainer, overContainer];
  }

  const notFeature = activeEngivia.featured === false;
  const isFeature = activeEngivia.featured === true;
  const isSingleItemContainer1 = items.container1.length === 1;
  const isActiveRoot = `${activeContainer}` === "root";
  const isActiveContainer1 = `${activeContainer}` === "container1";
  const isActiveContainer2 = `${activeContainer}` === "container2";
  const isOverRoot = `${overContainer}` === "root";
  const isOverContainer1 = `${overContainer}` === "container1";
  const isOverContainer2 = `${overContainer}` === "container2";

  if (isDragEnd) {
    // ドラッグ終了時、元々あった場所だった場合は動かせない
    const dragEndCheck = activeContainer !== overContainer;

    if (dragEndCheck) {
      return [true, activeContainer, overContainer];
    }
    return [false, activeContainer, activeContainer];
  }

  // ドラッグオーバー時、元々あった場所だった場合は動かせない
  const dragOverCheck = activeContainer === overContainer;
  if (dragOverCheck) {
    return [false, activeContainer, overContainer];
  }

  // container1にあったフィーチャー済みではないものはcontainer2に移動できない
  const check1 = isActiveContainer1 && isOverContainer2 && notFeature;
  // container2にあったフィーチャー済みではないものはcontainer2に移動できない
  const check2 = isActiveContainer2 && isOverContainer2 && notFeature;
  // container2にあったフィーチャー済みのものはcontainer1に移動できない
  const check3 = isActiveContainer2 && isOverContainer1 && isFeature;
  // container2にあったフィーチャー済みのものはrootに移動できない
  const check4 = isActiveContainer2 && isOverRoot && isFeature;
  // rootからcontainer1に複数個移動できない
  const check5 = isActiveRoot && isSingleItemContainer1;
  // container1にあったフィーチャー済みのものはcontainer1に移動できない
  const check6 = isActiveContainer1 && isOverRoot && isFeature;

  if (check1 || check2 || check3 || check4 || check5 || check6) {
    return [false, activeContainer, overContainer];
  }
  return [true, activeContainer, overContainer];
};
