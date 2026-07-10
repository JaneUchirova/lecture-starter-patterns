import { createServer, type IncomingMessage, type ServerResponse } from "http";
import { createReadStream, existsSync, statSync } from "fs";
import { extname, join, normalize } from "path";
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

const PORT = Number(process.env.PORT) || 3006;
const CLIENT_DIST = join(__dirname, "../../client/dist");

const contentTypes: Record<string, string> = {
  ".css": "text/css",
  ".html": "text/html",
  ".js": "text/javascript",
  ".svg": "image/svg+xml",
};

const serveClient = (
  request: IncomingMessage,
  response: ServerResponse
): void => {
  const requestPath = normalize(
    decodeURIComponent(request.url?.split("?")[0] ?? "/")
  )
    .replace(/^(\.\.[/\\])+/, "")
    .replace(/^[/\\]+/, "");
  const requestedFile = join(CLIENT_DIST, requestPath);
  const filePath =
    requestPath && existsSync(requestedFile) && statSync(requestedFile).isFile()
      ? requestedFile
      : join(CLIENT_DIST, "index.html");

  if (!existsSync(filePath)) {
    response.writeHead(404).end("Client build not found");
    return;
  }

  response.setHeader(
    "Content-Type",
    contentTypes[extname(filePath)] ?? "application/octet-stream"
  );
  createReadStream(filePath).pipe(response);
};

const httpServer = createServer(serveClient);
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

if (db.getData().length === 0) {
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
