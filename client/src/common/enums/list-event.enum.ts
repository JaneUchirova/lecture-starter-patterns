const ListEvent = {
  CREATE: "list:create",
  GET: "list:get",
  REORDER: "list:reorder",
  UPDATE: "list:update",
  RENAME: "list:rename",
  DELETE: "list:delete",
  UNDO: "history:undo",
  REDO: "history:redo",
} as const;

export { ListEvent };
