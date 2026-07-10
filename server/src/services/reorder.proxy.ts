import { Logger } from "./logger.service";
import { ReorderService } from "./reorder.service";

const createReorderServiceProxy = (
  service: ReorderService,
  logger: Logger
): ReorderService => {
  // PATTERN:Proxy
  return new Proxy(service, {
    get(target, property, receiver) {
      const value = Reflect.get(target, property, receiver);

      if (typeof value !== "function") {
        return value;
      }

      return (...args: unknown[]) => {
        logger.log("info", `ReorderService.${String(property)} called`, {
          args,
        });
        return Reflect.apply(value, target, args);
      };
    },
  });
};

export { createReorderServiceProxy };
