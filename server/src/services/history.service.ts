import { Database, DatabaseMemento } from "../data/database";

// PATTERN:Memento caretaker
class HistoryService {
  private undoStack: DatabaseMemento[] = [];
  private redoStack: DatabaseMemento[] = [];

  public save(database: Database): void {
    this.undoStack.push(database.createMemento());
    this.redoStack = [];
  }

  public undo(database: Database): boolean {
    const previous = this.undoStack.pop();
    if (!previous) return false;

    this.redoStack.push(database.createMemento());
    database.restore(previous);
    return true;
  }

  public redo(database: Database): boolean {
    const next = this.redoStack.pop();
    if (!next) return false;

    this.undoStack.push(database.createMemento());
    database.restore(next);
    return true;
  }
}

export { HistoryService };
