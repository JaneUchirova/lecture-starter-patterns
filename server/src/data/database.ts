import { List } from "./models/list";
import { Card } from "./models/card";

class DatabaseMemento {
  public constructor(private readonly state: List[]) {}

  public getState(): List[] {
    return cloneLists(this.state);
  }
}

const cloneCard = (card: Card): Card => {
  const clone = new Card(card.name, card.description);
  clone.id = card.id;
  clone.createdAt = new Date(card.createdAt);
  return clone;
};

const cloneLists = (lists: List[]): List[] =>
  lists.map((list) => {
    const clone = new List(list.name);
    clone.id = list.id;
    return clone.setCards(list.cards.map(cloneCard));
  });

class Database {
  private static instance: Database | null = null;

  private data: List[];

  private constructor() {
    this.data = [];
  }

  public static get Instance(): Database {
    if (!this.instance) {
      this.instance = new Database();
    }

    return this.instance;
  }

  public setData(data: List[]): void {
    this.data = data;
  }

  public getData(): List[] {
    return this.data;
  }

  // PATTERN:Memento
  public createMemento(): DatabaseMemento {
    return new DatabaseMemento(cloneLists(this.data));
  }

  // PATTERN:Memento
  public restore(memento: DatabaseMemento): void {
    this.data = memento.getState();
  }
}

export { Database, DatabaseMemento };
