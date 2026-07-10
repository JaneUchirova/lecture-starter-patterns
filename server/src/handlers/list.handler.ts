import type { Socket } from "socket.io";

import { ListEvent } from "../common/enums/enums";
import { List } from "../data/models/list";
import { SocketHandler } from "./socket.handler";

class ListHandler extends SocketHandler {
  public handleConnection(socket: Socket): void {
    socket.on(ListEvent.CREATE, this.createList.bind(this));
    socket.on(ListEvent.GET, this.getLists.bind(this));
    socket.on(ListEvent.REORDER, this.reorderLists.bind(this));
    socket.on(ListEvent.RENAME, this.renameList.bind(this));
    socket.on(ListEvent.DELETE, this.deleteList.bind(this));
    socket.on(ListEvent.UNDO, this.undo.bind(this));
    socket.on(ListEvent.REDO, this.redo.bind(this));
  }

  private getLists(callback: (cards: List[]) => void): void {
    callback(this.db.getData());
  }

  private reorderLists(sourceIndex: number, destinationIndex: number): void {
    this.saveState();
    const allLists = this.db.getData();
    const reorderedLists = this.reorderService.reorder(
      allLists,
      sourceIndex,
      destinationIndex
    );
    this.db.setData(reorderedLists);
    this.logger.log("info", "Lists reordered", {
      sourceIndex,
      destinationIndex,
    });
    this.updateLists();
  }

  private createList(name: string): void {
    this.saveState();
    const allLists = this.db.getData();
    const newList = new List(name);
    this.db.setData(allLists.concat(newList));
    this.logger.log("info", "List created", { listId: newList.id, name });
    this.updateLists();
  }

  private renameList(listId: string, name: string): void {
    this.saveState();
    const lists = this.db.getData().map((list) => {
      if (list.id === listId) {
        list.name = name;
      }
      return list;
    });
    this.db.setData(lists);
    this.logger.log("info", "List renamed", { listId, name });
    this.updateLists();
  }

  private deleteList(listId: string): void {
    this.saveState();
    this.db.setData(this.db.getData().filter((list) => list.id !== listId));
    this.logger.log("warning", "List deleted", { listId });
    this.updateLists();
  }

  private undo(): void {
    if (this.history.undo(this.db)) {
      this.logger.log("info", "Board change undone");
      this.updateLists();
    }
  }

  private redo(): void {
    if (this.history.redo(this.db)) {
      this.logger.log("info", "Board change redone");
      this.updateLists();
    }
  }
}

export { ListHandler };
