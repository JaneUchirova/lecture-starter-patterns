import { Server, Socket } from "socket.io";

import { ListEvent } from "../common/enums/enums";
import { Database } from "../data/database";
import { ReorderService } from "../services/reorder.service";
import { Logger } from "../services/logger.service";
import { HistoryService } from "../services/history.service";

abstract class SocketHandler {
  protected db: Database;

  protected reorderService: ReorderService;

  protected io: Server;

  protected logger: Logger;

  protected history: HistoryService;

  public constructor(
    io: Server,
    db: Database,
    reorderService: ReorderService,
    logger: Logger,
    history: HistoryService
  ) {
    this.io = io;
    this.db = db;
    this.reorderService = reorderService;
    this.logger = logger;
    this.history = history;
  }

  public abstract handleConnection(socket: Socket): void;

  protected updateLists(): void {
    this.io.emit(ListEvent.UPDATE, this.db.getData());
  }

  protected saveState(): void {
    this.history.save(this.db);
  }
}

export { SocketHandler };
