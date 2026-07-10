import { createServer } from "http";
import { Server, Socket } from "socket.io";

import { lists } from "./assets/mock-data";
import { Database } from "./data/database";
import { CardHandler, ListHandler } from "./handlers/handlers";
import { ReorderService } from "./services/reorder.service";
import {
  ConsoleErrorSubscriber,
  FileLogSubscriber,
  Logger,
} from "./services/logger.service";
import { createReorderServiceProxy } from "./services/reorder.proxy";
import { HistoryService } from "./services/history.service";

const PORT = 3006;

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const db = Database.Instance;
const logger = new Logger();
logger.subscribe(new FileLogSubscriber());
logger.subscribe(new ConsoleErrorSubscriber());
const reorderService = createReorderServiceProxy(new ReorderService(), logger);
const history = new HistoryService();

if (process.env.NODE_ENV !== "production") {
  db.setData(lists);
}

const onConnection = (socket: Socket): void => {
  new ListHandler(io, db, reorderService, logger, history).handleConnection(
    socket
  );
  new CardHandler(io, db, reorderService, logger, history).handleConnection(
    socket
  );
};

io.on("connection", onConnection);

httpServer.listen(PORT, () => console.log(`Listening on port: ${PORT}`));

export { httpServer };
