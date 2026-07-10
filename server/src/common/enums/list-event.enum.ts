const ListEvent = {
  GET: "list:get",
  REORDER: "list:reorder",
  UPDATE: "list:update",
  CREATE: "list:create",
  RENAME: "list:rename",
  DELETE: "list:delete",
  UNDO: "history:undo",
  REDO: "history:redo",
} as const;

export { ListEvent };
