import type { Socket } from "socket.io";

import { CardEvent } from "../common/enums/enums";
import { Card } from "../data/models/card";
import { SocketHandler } from "./socket.handler";

class CardHandler extends SocketHandler {
  public handleConnection(socket: Socket): void {
    socket.on(CardEvent.CREATE, this.createCard.bind(this));
    socket.on(CardEvent.REORDER, this.reorderCards.bind(this));
    socket.on(CardEvent.RENAME, this.renameCard.bind(this));
    socket.on(CardEvent.CHANGE_DESCRIPTION, this.changeDescription.bind(this));
    socket.on(CardEvent.DELETE, this.deleteCard.bind(this));
    socket.on(CardEvent.DUPLICATE, this.duplicateCard.bind(this));
  }

  public createCard(listId: string, cardName: string): void {
    this.saveState();
    const newCard = new Card(cardName, "");
    const allLists = this.db.getData();

    const updatedLists = allLists.map((list) =>
      list.id === listId ? list.setCards(list.cards.concat(newCard)) : list
    );

    this.db.setData(updatedLists);
    this.logger.log("info", "Card created", {
      listId,
      cardId: newCard.id,
      cardName,
    });
    this.updateLists();
  }

  private updateCard(
    listId: string,
    cardId: string,
    update: (card: Card) => void
  ): void {
    const lists = this.db.getData().map((list) => {
      if (list.id === listId) {
        list.cards.forEach((card) => card.id === cardId && update(card));
      }
      return list;
    });
    this.db.setData(lists);
  }

  private renameCard(listId: string, cardId: string, name: string): void {
    this.saveState();
    this.updateCard(listId, cardId, (card) => {
      card.name = name;
    });
    this.logger.log("info", "Card renamed", { listId, cardId, name });
    this.updateLists();
  }

  private changeDescription(
    listId: string,
    cardId: string,
    description: string
  ): void {
    this.saveState();
    this.updateCard(listId, cardId, (card) => {
      card.description = description;
    });
    this.logger.log("info", "Card description changed", { listId, cardId });
    this.updateLists();
  }

  private deleteCard(listId: string, cardId: string): void {
    this.saveState();
    const lists = this.db
      .getData()
      .map((list) =>
        list.id === listId
          ? list.setCards(list.cards.filter((card) => card.id !== cardId))
          : list
      );
    this.db.setData(lists);
    this.logger.log("warning", "Card deleted", { listId, cardId });
    this.updateLists();
  }

  private duplicateCard(listId: string, cardId: string): void {
    this.saveState();
    const lists = this.db.getData().map((list) => {
      if (list.id !== listId) return list;
      const index = list.cards.findIndex((card) => card.id === cardId);
      if (index === -1) return list;
      const copy = list.cards[index].clone();
      return list.setCards([
        ...list.cards.slice(0, index + 1),
        copy,
        ...list.cards.slice(index + 1),
      ]);
    });
    this.db.setData(lists);
    this.logger.log("info", "Card duplicated", { listId, cardId });
    this.updateLists();
  }

  private reorderCards({
    sourceIndex,
    destinationIndex,
    sourceListId,
    destinationListId,
  }: {
    sourceIndex: number;
    destinationIndex: number;
    sourceListId: string;
    destinationListId: string;
  }): void {
    this.saveState();
    const allLists = this.db.getData();
    const reordered = this.reorderService.reorderCards({
      lists: allLists,
      sourceIndex,
      destinationIndex,
      sourceListId,
      destinationListId,
    });
    this.db.setData(reordered);
    this.logger.log("info", "Cards reordered", {
      sourceIndex,
      destinationIndex,
      sourceListId,
      destinationListId,
    });
    this.updateLists();
  }
}

export { CardHandler };
