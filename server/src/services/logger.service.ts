import { appendFile } from "fs/promises";
import { join } from "path";

type LogLevel = "info" | "warning" | "error";

type LogEntry = {
  level: LogLevel;
  message: string;
  timestamp: Date;
  data?: unknown;
};

interface LogSubscriber {
  update(entry: LogEntry): void | Promise<void>;
}

// PATTERN:Observer
class Logger {
  private subscribers: LogSubscriber[] = [];

  public subscribe(subscriber: LogSubscriber): void {
    this.subscribers.push(subscriber);
  }

  public log(level: LogLevel, message: string, data?: unknown): void {
    const entry: LogEntry = { level, message, timestamp: new Date(), data };

    for (const subscriber of this.subscribers) {
      void Promise.resolve(subscriber.update(entry)).catch((error: unknown) => {
        console.error("Unable to write log", error);
      });
    }
  }
}

// PATTERN:Observer subscriber
class FileLogSubscriber implements LogSubscriber {
  public constructor(
    private readonly filePath = join(process.cwd(), "server.log")
  ) {}

  public async update(entry: LogEntry): Promise<void> {
    await appendFile(this.filePath, `${JSON.stringify(entry)}\n`, "utf8");
  }
}

// PATTERN:Observer subscriber
class ConsoleErrorSubscriber implements LogSubscriber {
  public update(entry: LogEntry): void {
    if (entry.level === "error") {
      console.error(
        `[${entry.timestamp.toISOString()}] ${entry.message}`,
        entry.data ?? ""
      );
    }
  }
}

export { ConsoleErrorSubscriber, FileLogSubscriber, Logger };
export type { LogEntry, LogLevel, LogSubscriber };
