import type { DraggableLocation } from "@hello-pangea/dnd";

import type { Card, List } from "src/common/types/types";

const removeAt = <T>(items: T[], index: number): T[] => [
  ...items.slice(0, index),
  ...items.slice(index + 1),
];

const insertAt = <T>(items: T[], index: number, item: T): T[] => [
  ...items.slice(0, index),
  item,
  ...items.slice(index),
];

const reorder = <T>(items: T[], startIndex: number, endIndex: number): T[] =>
  insertAt(removeAt(items, startIndex), endIndex, items[startIndex]);

export const reorderLists = (
  items: List[],
  startIndex: number,
  endIndex: number
): List[] => reorder(items, startIndex, endIndex);

export const reorderCards = (
  lists: List[],
  source: DraggableLocation,
  destination: DraggableLocation
): List[] => {
  const currentCards: Card[] =
    lists.find((list) => list.id === source.droppableId)?.cards || [];
  const nextCards: Card[] =
    lists.find((list) => list.id === destination.droppableId)?.cards || [];
  const targetCard: Card = currentCards[source.index];

  const isMovingInSameList = source.droppableId === destination.droppableId;

  if (isMovingInSameList) {
    const reorderedCards = reorder(
      currentCards,
      source.index,
      destination.index
    );

    return lists.map((list) =>
      list.id === source.droppableId ? { ...list, cards: reorderedCards } : list
    );
  }

  const newLists = lists.map((list) => {
    if (list.id === source.droppableId) {
      return {
        ...list,
        cards: removeAt(currentCards, source.index),
      };
    }

    if (list.id === destination.droppableId) {
      return {
        ...list,
        cards: insertAt(nextCards, destination.index, targetCard),
      };
    }

    return list;
  });

  return newLists;
};
